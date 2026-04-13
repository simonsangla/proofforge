#!/usr/bin/env node
import { execFileSync, spawn } from "node:child_process";
import { appendFileSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import process from "node:process";

const port = Number(process.env.RESPONSIVE_PORT || 3100);
const baseURL = `http://localhost:${port}`;
const batchTargetSlug = process.env.BATCH_TARGET_SLUG || "local-first-ai-executor-loop";
const viewports = [
  { label: "390x844", width: 390, height: 844 },
  { label: "768x1024", width: 768, height: 1024 },
  { label: "1280x800", width: 1280, height: 800 },
  { label: "1440x900", width: 1440, height: 900 }
];
const pages = [
  "/",
  "/lab",
  "/lab/metricpilot-kpi-drop-analyzer",
  `/lab/${batchTargetSlug}`,
  "/lab/publishing-principles"
];
const artifactRoot = ".artifacts/validation/responsive";
const logRoot = ".artifacts/logs";

function sanitizedEnv(extra = {}) {
  const env = { ...process.env, ...extra };
  for (const key of Object.keys(env)) {
    if (key.toLowerCase().startsWith("npm_config_")) delete env[key];
  }
  delete env.NO_COLOR;
  delete env.FORCE_COLOR;
  return env;
}

function writeLog(name, lines) {
  mkdirSync(logRoot, { recursive: true });
  appendFileSync(join(logRoot, name), `${lines.join("\n")}\n`);
}

function run(cmd, args, env) {
  return execFileSync(cmd, args, { encoding: "utf8", env: sanitizedEnv(env) }).trim();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer() {
  for (let attempt = 0; attempt < 45; attempt += 1) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 1000);
      const response = await fetch(`${baseURL}/`, { signal: controller.signal });
      clearTimeout(timeout);
      if (response.ok) return;
    } catch {
      await sleep(1000);
    }
  }
  throw new Error(`server not ready on ${baseURL}`);
}

function checkPortFree() {
  try {
    const pids = run("lsof", ["-ti", `tcp:${port}`, "-sTCP:LISTEN"]);
    if (pids) throw new Error(`port ${port} occupied by pid(s): ${pids}`);
  } catch (error) {
    if (String(error.message || error).includes("occupied")) throw error;
  }
}

async function acquireBuildLock() {
  for (;;) {
    try {
      mkdirSync(".next-build-lock");
      return;
    } catch (error) {
      if (error && error.code === "EEXIST") {
        await sleep(1000);
        continue;
      }
      throw error;
    }
  }
}

function releaseBuildLock() {
  rmSync(".next-build-lock", { recursive: true, force: true });
}

async function main() {
  checkPortFree();
  console.log("step: build");
  await acquireBuildLock();
  try {
    rmSync(".next", { recursive: true, force: true });
    run("pnpm", ["build"]);
  } finally {
    releaseBuildLock();
  }
  console.log("step: start");
  mkdirSync(artifactRoot, { recursive: true });
  mkdirSync(logRoot, { recursive: true });
  const child = spawn("pnpm", ["exec", "next", "start", "-p", String(port)], {
    stdio: "inherit",
    env: sanitizedEnv({ PORT: String(port) })
  });
  const exitPromise = new Promise((resolve) => child.on("exit", resolve));
  await waitForServer();

  for (const viewport of viewports) {
    const result = spawn("pnpm", ["exec", "playwright", "test", "scripts/browser-validate.spec.mjs", "--reporter=line", "--output", join(artifactRoot, "test-results")], {
      stdio: "inherit",
      env: {
        ...sanitizedEnv(),
        PREVIEW_URL: baseURL,
        VALIDATION_PAGES: pages.join(","),
        VIEWPORT_LABEL: viewport.label,
        CHECK_OVERFLOW: "1",
        VALIDATION_ARTIFACT_ROOT: artifactRoot,
        PORT: String(port),
        TARGET_PORT: String(port),
        PWDEBUG: "0"
      }
    });
    const code = await new Promise((resolve) => result.on("exit", resolve));
    if (code !== 0) {
      child.kill("SIGTERM");
      process.exit(code ?? 1);
    }
  }

  console.log(`responsive validation ok: ${baseURL}`);
  writeLog("responsive-validate.log", [
    `baseURL=${baseURL}`,
    `pages=${pages.join(",")}`,
    `viewports=${viewports.map((viewport) => viewport.label).join(",")}`,
    `status=ok`
  ]);
  child.kill("SIGTERM");
  await exitPromise;
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
