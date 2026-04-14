import { test, expect } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const baseURL = process.env.PREVIEW_URL || `http://localhost:${process.env.TARGET_PORT || 3000}`;
function getBatchTargetSlugs() {
  const raw = process.env.BATCH_TARGET_SLUGS || process.env.BATCH_TARGET_SLUG || "local-first-ai-executor-loop";
  return raw
    .split(",")
    .map((slug) => slug.trim())
    .filter(Boolean);
}

const artifactRoot = process.env.VALIDATION_ARTIFACT_ROOT || ".artifacts/validation/browser";
const viewportWidth = Number(process.env.VIEWPORT_WIDTH || 0);
const viewportHeight = Number(process.env.VIEWPORT_HEIGHT || 0);
if (viewportWidth > 0 && viewportHeight > 0) {
  test.use({ viewport: { width: viewportWidth, height: viewportHeight } });
}
const pages = Array.from(
  new Set(
    process.env.VALIDATION_PAGES
      ? process.env.VALIDATION_PAGES.split(",")
      : [
          "/",
          "/lab",
          "/lab/metricpilot-kpi-drop-analyzer",
          "/lab/local-first-ai-executor-loop",
          "/lab/publishing-principles",
          ...getBatchTargetSlugs().map((slug) => `/lab/${slug}`)
        ]
  )
);
const viewportLabel = process.env.VIEWPORT_LABEL || "";
const artifactSlug = getBatchTargetSlugs().join(",");
const requireOverflowCheck = process.env.CHECK_OVERFLOW === "1";

function screenshotName(path) {
  const pageName = path === "/" ? "home" : path.slice(1).replaceAll("/", "-");
  return join(artifactRoot, viewportLabel ? `playwright-${pageName}-${viewportLabel}.png` : `playwright-${pageName}.png`);
}

for (const path of pages) {
  test(`open ${path}`, async ({ page }) => {
    mkdirSync(dirname(screenshotName(path)), { recursive: true });
    const errors = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", (error) => {
      errors.push(error.message);
    });

    const response = await page.goto(new URL(path, baseURL).toString(), { waitUntil: "networkidle" });
    expect(response, `no response for ${path}`).not.toBeNull();
    expect(response?.ok(), `bad status for ${path}`).toBeTruthy();
    await expect(page.locator("body")).toBeVisible();
    if (requireOverflowCheck) {
      const overflow = await page.evaluate(() => {
        const body = document.body;
        const html = document.documentElement;
        const maxWidth = Math.max(body.scrollWidth, html.scrollWidth);
        const viewportWidth = window.innerWidth;
        return { maxWidth, viewportWidth, overflow: maxWidth > viewportWidth + 1 };
      });
      expect(overflow.overflow, `layout overflow on ${path}`).toBeFalsy();
    }

    const title = await page.title();
    console.log(JSON.stringify({ path, status: response.status(), title, consoleErrors: errors.length, artifactSlug }, null, 2));

    await page.screenshot({ path: screenshotName(path), fullPage: true });
    expect(errors, `console/runtime errors on ${path}`).toEqual([]);
  });
}
