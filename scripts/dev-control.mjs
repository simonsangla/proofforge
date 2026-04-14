#!/usr/bin/env node
import { execFileSync, spawn } from "node:child_process";
import { appendFileSync, mkdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";
import process from "node:process";

const buildLockDir = ".next-build-lock";
const logDir = ".artifacts/logs";

const targetPort = Number(process.env.PORT || process.env.TARGET_PORT || 3000);
const command = process.argv[2];
function getBatchTargetSlugs() {
  const raw = process.env.BATCH_TARGET_SLUGS || process.env.BATCH_TARGET_SLUG || "local-first-ai-executor-loop";
  return raw
    .split(",")
    .map((slug) => slug.trim())
    .filter(Boolean);
}

function getBatchTargetPages() {
  return getBatchTargetSlugs().map((slug) => `/lab/${slug}`);
}

const routesToCheck = [
  "/",
  "/lab",
  "/lab/metricpilot-kpi-drop-analyzer",
  "/lab/local-first-ai-executor-loop",
  "/lab/publishing-principles",
  ...getBatchTargetPages(),
  "/manifest.webmanifest"
];

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
  mkdirSync(logDir, { recursive: true });
  appendFileSync(resolve(logDir, name), `${lines.join("\n")}\n`);
}

function getBatchTargetPage() {
  return getBatchTargetPages()[0] || "/lab/local-first-ai-executor-loop";
}

function run(cmd, args) {
  return execFileSync(cmd, args, { encoding: "utf8", env: sanitizedEnv() }).trim();
}

function openInBrowser(urls) {
  for (const url of urls) {
    try {
      run("open", [url]);
      console.log(`browser open ok: ${url}`);
    } catch (error) {
      throw new Error(`browser open failed: ${url}`);
    }
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getPortPids(port) {
  try {
    const output = run("lsof", ["-ti", `tcp:${port}`, "-sTCP:LISTEN"]);
    return output ? output.split("\n").filter(Boolean) : [];
  } catch {
    return [];
  }
}

function getProcessDetails(pid) {
  try {
    return run("ps", ["-p", pid, "-o", "pid=,user=,comm=,args="]);
  } catch {
    return `pid=${pid}`;
  }
}

function isSafeToKill(details, pid) {
  const user = process.env.USER || process.env.LOGNAME || "";
  const lower = details.toLowerCase();
  const userMatches = !user || lower.includes(user.toLowerCase());
  const looksLikeDev =
    lower.includes("next dev") ||
    lower.includes("next-server") ||
    lower.includes("pnpm dev") ||
    lower.includes("node") ||
    lower.includes("next/dist/server");
  const looksLocal =
    lower.includes("/users/") ||
    lower.includes("/private/var/") ||
    lower.includes("/var/folders/") ||
    lower.includes("proofforge") ||
    lower.includes("next-server") ||
    lower.includes("next dev");
  return {
    safe: userMatches && looksLikeDev && looksLocal,
    reasons: {
      userMatches,
      looksLikeDev,
      looksLocal
    }
  };
}

function printStatus(state, pids) {
  console.log(`target port: ${targetPort}`);
  console.log(`port state: ${state}`);
  if (pids.length) {
    for (const pid of pids) {
      const details = getProcessDetails(pid);
      const verdict = isSafeToKill(details, pid);
      console.log(`process found: ${details}`);
      console.log(
        `safe to kill: ${verdict.safe ? "yes" : "no"} (user=${verdict.reasons.userMatches} dev=${verdict.reasons.looksLikeDev} local=${verdict.reasons.looksLocal})`
      );
    }
  } else {
    console.log("process found: none");
  }
}

function cleanNextDir() {
  rmSync(".next", { recursive: true, force: true });
  console.log("cleanup: removed .next");
}

async function acquireBuildLock() {
  for (;;) {
    try {
      mkdirSync(buildLockDir);
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
  rmSync(buildLockDir, { recursive: true, force: true });
}

async function waitForServer() {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 1000);
      const response = await fetch(`http://localhost:${targetPort}`, { signal: controller.signal });
      clearTimeout(timeout);
      if (response.ok) return;
    } catch {
      await sleep(1000);
    }
  }
  throw new Error(`server not ready on http://localhost:${targetPort}`);
}

function verifyRoutes() {
  for (const route of routesToCheck) {
    const url = `http://localhost:${targetPort}${route}`;
    try {
      run("curl", ["-fsS", "-o", "/dev/null", "-D", "-", url]);
      console.log(`route ok: ${route}`);
    } catch (error) {
      console.error(`route failed: ${route}`);
      throw error;
    }
  }
}

function getHumanReviewUrls() {
  return [
    `http://localhost:${targetPort}/`,
    `http://localhost:${targetPort}/lab`,
    ...getBatchTargetPages().map((page) => `http://localhost:${targetPort}${page}`)
  ];
}

function preflight() {
  const pids = getPortPids(targetPort);
  if (pids.length) {
    printStatus("occupied", pids);
    process.exit(1);
  }
  printStatus("free", []);
}

function devSafe() {
  const pids = getPortPids(targetPort);
  if (pids.length) {
    printStatus("occupied", pids);
    process.exit(1);
  }
  printStatus("free", []);
  cleanNextDir();
  console.log(`final preview URL: http://localhost:${targetPort}`);
  const child = spawn("pnpm", ["dev"], {
    stdio: "inherit",
    env: sanitizedEnv({ PORT: String(targetPort) })
  });
  child.on("exit", (code) => process.exit(code ?? 0));
}

function devReset() {
  const pids = getPortPids(targetPort);
  if (!pids.length) {
    printStatus("free", []);
    cleanNextDir();
    console.log(`final preview URL: http://localhost:${targetPort}`);
    const child = spawn("pnpm", ["dev"], {
      stdio: "inherit",
      env: { ...process.env, PORT: String(targetPort) }
    });
    child.on("exit", (code) => process.exit(code ?? 0));
    return;
  }

  printStatus("occupied", pids);
  for (const pid of pids) {
    const details = getProcessDetails(pid);
    const verdict = isSafeToKill(details, pid);
    console.log(
      `kill check: pid ${pid} safe=${verdict.safe} (user=${verdict.reasons.userMatches} dev=${verdict.reasons.looksLikeDev} local=${verdict.reasons.looksLocal})`
    );
    if (!verdict.safe) {
      console.error(`refuse kill: pid ${pid} not safe`);
      process.exit(1);
    }
  }

  for (const pid of pids) {
    console.log(`kill command: kill ${pid}`);
    process.kill(Number(pid), "SIGTERM");
  }

  cleanNextDir();
  console.log(`final preview URL: http://localhost:${targetPort}`);
  const child = spawn("pnpm", ["dev"], {
    stdio: "inherit",
    env: sanitizedEnv({ PORT: String(targetPort) })
  });
  child.on("exit", (code) => process.exit(code ?? 0));
}

async function devValidate() {
  console.log("step: build");
  await acquireBuildLock();
  try {
    cleanNextDir();
    run("pnpm", ["build"]);
  } finally {
    releaseBuildLock();
  }
  const pids = getPortPids(targetPort);
  if (pids.length) {
    printStatus("occupied", pids);
    for (const pid of pids) {
      const details = getProcessDetails(pid);
      const verdict = isSafeToKill(details, pid);
      if (!verdict.safe) {
        console.error(`refuse kill: pid ${pid} not safe`);
        process.exit(1);
      }
      console.log(`kill command: kill ${pid}`);
      process.kill(Number(pid), "SIGTERM");
    }
  } else {
    printStatus("free", []);
  }

  cleanNextDir();
  console.log(`final preview URL: http://localhost:${targetPort}`);
  const child = spawn("pnpm", ["dev"], {
    stdio: "inherit",
    env: sanitizedEnv({ PORT: String(targetPort) })
  });
  const exitPromise = new Promise((resolve) => child.on("exit", resolve));
  await waitForServer();
  verifyRoutes();
  console.log(`routes verified: ${routesToCheck.join(", ")}`);
  console.log(`live preview URL: http://localhost:${targetPort}`);
  writeLog("dev-validate.log", [
    `targetPort=${targetPort}`,
    `routes=${routesToCheck.join(",")}`,
    `status=ok`
  ]);
  await exitPromise;
}

async function previewHuman() {
  console.log("step: build");
  await acquireBuildLock();
  try {
    cleanNextDir();
    run("pnpm", ["build"]);
  } finally {
    releaseBuildLock();
  }
  const pids = getPortPids(targetPort);
  if (pids.length) {
    printStatus("occupied", pids);
    for (const pid of pids) {
      const details = getProcessDetails(pid);
      const verdict = isSafeToKill(details, pid);
      if (!verdict.safe) {
        console.error(`refuse kill: pid ${pid} not safe`);
        process.exit(1);
      }
      console.log(`kill command: kill ${pid}`);
      process.kill(Number(pid), "SIGTERM");
    }
  } else {
    printStatus("free", []);
  }

  cleanNextDir();
  console.log(`final preview URL: http://localhost:${targetPort}`);
  const child = spawn("pnpm", ["dev"], {
    stdio: "inherit",
    env: sanitizedEnv({ PORT: String(targetPort) })
  });
  const exitPromise = new Promise((resolve) => child.on("exit", resolve));
  await waitForServer();
  verifyRoutes();
  console.log(`routes verified: ${routesToCheck.join(", ")}`);
  console.log("step: browser smoke");
  run("pnpm", ["browser:validate"]);
  console.log("step: human open");
  openInBrowser(getHumanReviewUrls());
  console.log(`live preview URL: http://localhost:${targetPort}`);
  writeLog("preview-human.log", [
    `targetPort=${targetPort}`,
    `previewUrl=http://localhost:${targetPort}`,
    `routes=${routesToCheck.join(",")}`,
    `status=ok`
  ]);
  await exitPromise;
}

if (command === "preflight") preflight();
else if (command === "dev:safe") devSafe();
else if (command === "dev:reset") devReset();
else if (command === "dev:validate") devValidate();
else if (command === "preview:human") previewHuman();
else {
  console.error("usage: dev-control.mjs preflight|dev:safe|dev:reset|dev:validate|preview:human");
  process.exit(1);
}
