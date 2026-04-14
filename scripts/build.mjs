import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";

const lockFile = ".next-build-lock";

function build() {
  if (fs.existsSync(lockFile)) {
    console.error("❌ Build lock exists. Overlapping build detected.");
    process.exit(1);
  }

  fs.writeFileSync(lockFile, Date.now().toString());
  console.log("🔒 Build lock created.");

  try {
    console.log("🧹 Cleaning .next directory...");
    fs.rmSync(".next", { recursive: true, force: true });

    console.log("🚀 Starting next build...");
    const result = spawnSync("next", ["build"], { 
      stdio: "inherit",
      env: { ...process.env, PATH: `/opt/homebrew/bin:${process.env.PATH}` }
    });

    if (result.status !== 0) {
      console.error("❌ Build failed.");
      process.exit(result.status || 1);
    }

    console.log("✨ Build successful.");
  } finally {
    fs.unlinkSync(lockFile);
    console.log("🔓 Build lock removed.");
  }
}

build();
