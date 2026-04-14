#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const logDir = ".artifacts/logs";
const logPath = resolve(logDir, "ci-local.log");
const batchTargetSlugs = process.env.BATCH_TARGET_SLUGS || process.env.BATCH_TARGET_SLUG || "local-first-ai-executor-loop";

function run(command, args, extraEnv = {}) {
  execFileSync(command, args, {
    encoding: "utf8",
    stdio: "inherit",
    env: {
      ...process.env,
      ...extraEnv,
      BATCH_TARGET_SLUGS: batchTargetSlugs
    }
  });
}

mkdirSync(logDir, { recursive: true });

try {
  run("pnpm", ["lint"]);
  run("pnpm", ["build"]);
  run("pnpm", ["dev:validate"], {
    PORT: "3200",
    TARGET_PORT: "3200"
  });
  run("pnpm", ["responsive:validate"], {
    PORT: "3201",
    TARGET_PORT: "3201",
    RESPONSIVE_PORT: "3201"
  });
  writeFileSync(
    logPath,
    [
      "mode=host-sequence",
      `batch_target_slugs=${batchTargetSlugs}`,
      "lint=ok",
      "build=ok",
      "dev_validate=ok",
      "responsive_validate=ok",
      "status=ok"
    ].join("\n") + "\n"
  );
} catch (error) {
  writeFileSync(
    logPath,
    [
      "mode=host-sequence",
      `batch_target_slugs=${batchTargetSlugs}`,
      "status=fail"
    ].join("\n") + "\n"
  );
  throw error;
}
