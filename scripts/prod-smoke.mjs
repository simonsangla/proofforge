#!/usr/bin/env node
import { execFileSync } from "node:child_process";

const baseURL = process.env.PROD_URL || "https://proofforge-sooty.vercel.app";
function getBatchTargetSlugs() {
  const raw = process.env.BATCH_TARGET_SLUGS || process.env.BATCH_TARGET_SLUG || "local-first-ai-executor-loop";
  return raw
    .split(",")
    .map((slug) => slug.trim())
    .filter(Boolean);
}

const urls = Array.from(
  new Set([
    `${baseURL}/`,
    `${baseURL}/lab`,
    `${baseURL}/lab/metricpilot-kpi-drop-analyzer`,
    `${baseURL}/lab/local-first-ai-executor-loop`,
    `${baseURL}/lab/publishing-principles`,
    ...getBatchTargetSlugs().map((slug) => `${baseURL}/lab/${slug}`),
    `${baseURL}/captures/metricpilot-kpi-drop-analyzer.png`,
    `${baseURL}/captures/prompt-optimizer-chatgpt-like-prompt-refiner.svg`,
    `${baseURL}/captures/shortcut-factory-prompt-shortcut-builder.svg`,
    `${baseURL}/captures/visual-qa-control-tower-stepwise-qa-workspace.svg`
  ])
);

for (const url of urls) {
  const response = execFileSync("curl", ["-fsS", "-o", "/dev/null", "-D", "-", url], { encoding: "utf8" }).trim();
  console.log(`ok: ${url}`);
  if (!response) {
    console.log("");
  }
}
