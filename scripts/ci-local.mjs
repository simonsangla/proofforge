#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const logDir = ".artifacts/logs";
const logPath = resolve(logDir, "ci-local.log");
const defaultColimaSocket = `unix://${process.env.HOME}/.colima/default/docker.sock`;

function runUtf8(command, args) {
  try {
    return execFileSync(command, args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
  } catch {
    return "";
  }
}

function detectDockerHost() {
  const contextHost = runUtf8("docker", ["context", "inspect", "colima", "--format", "{{.Endpoints.docker.Host}}"]);
  if (contextHost) return contextHost;
  return process.env.DOCKER_HOST || defaultColimaSocket;
}

const actArgs = [
  "pull_request",
  "-j",
  "validate",
  "-W",
  ".github/workflows/ci.yml",
  "--container-architecture",
  "linux/arm64",
  "--container-daemon-socket",
  "unix:///var/run/docker.sock",
  "-P",
  "ubuntu-latest=ghcr.io/catthehacker/ubuntu:act-22.04"
];

try {
  execFileSync("act", ["--version"], { stdio: "pipe" });
} catch (error) {
  mkdirSync(logDir, { recursive: true });
  writeFileSync(
    logPath,
    [
      "act=missing",
      "blocker=install act to run local GitHub Actions emulation",
      "expected=act --version"
    ].join("\n") + "\n"
  );
  console.error("act not installed. Install act to run local GitHub Actions emulation.");
  process.exit(1);
}

mkdirSync(logDir, { recursive: true });
const dockerHost = detectDockerHost();
const colimaStatus = runUtf8("colima", ["status"]);
const dockerContext = runUtf8("docker", ["context", "show"]);
writeFileSync(
  logPath,
  [
    "act=present",
    "workflow=.github/workflows/ci.yml",
    `colima_running=${colimaStatus ? "yes" : "no"}`,
    `docker_context=${dockerContext || "unknown"}`,
    `docker_host=${dockerHost}`,
    "socket_path=/var/run/docker.sock"
  ].join("\n") + "\n"
);
execFileSync("act", actArgs, {
  stdio: "inherit",
  env: {
    ...process.env,
    DOCKER_HOST: dockerHost
  }
});
