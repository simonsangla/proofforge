#!/usr/bin/env node
import { execFileSync } from "node:child_process";

const baseURL = process.env.PROD_URL || "https://proofforge-sooty.vercel.app";
const urls = [
  `${baseURL}/`,
  `${baseURL}/lab`,
  `${baseURL}/lab/metricpilot-kpi-drop-analyzer`,
  `${baseURL}/lab/local-first-ai-executor-loop`,
  `${baseURL}/lab/publishing-principles`,
  `${baseURL}/captures/metricpilot-kpi-drop-analyzer.png`
];

for (const url of urls) {
  const response = execFileSync("curl", ["-fsS", "-o", "/dev/null", "-D", "-", url], { encoding: "utf8" }).trim();
  console.log(`ok: ${url}`);
  if (!response) {
    console.log("");
  }
}
