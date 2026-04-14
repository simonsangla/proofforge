import fs from "fs";
import path from "path";
import { ArtifactSchema, type Artifact } from "./schema";
export type { Artifact };

const artifactsDir = path.join(process.cwd(), "content/artifacts");

export const artifacts: Artifact[] = fs.readdirSync(artifactsDir)
  .filter(f => f.endsWith(".json"))
  .map(file => {
    const filePath = path.join(artifactsDir, file);
    const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    return ArtifactSchema.parse(content);
  });

const artifactDetailCopy: Record<string, { audience: string; publicPrivate: string; demo: string }> = {
  "prompt-optimizer-chatgpt-like-prompt-refiner": {
    audience: "Operators, consultants, and teams polishing prompts before they ship or get reused.",
    publicPrivate:
      "Public surface: ProofForge proof page and public capture. Private surface: Firebase backend layers, secrets, and memory stay in the source repo.",
    demo: "Real demo attempted on the deployed frontend at https://prompt-optimizer-prod.web.app. Status stays live_demo because the frontend is live, while backend deployment remains gated."
  },
  "shortcut-factory-prompt-shortcut-builder": {
    audience: "Teams turning rough prompt backlogs into reusable operator shortcuts.",
    publicPrivate:
      "Public surface: the proof page and capture. Private surface: internal working notes and any non-public prompt library stay outside this repo.",
    demo: "Real demo attempted against the source artifact and its live proof page. The shortcut pack is concrete enough to sell as a reusable prompt product."
  },
  "visual-qa-control-tower-stepwise-qa-workspace": {
    audience: "Operators and developers who need a stepwise QA surface for deterministic harness work.",
    publicPrivate:
      "Public surface: proof page, capture, and short spec summary. Private surface: harness runtime, fixtures, and CLI workflow stay in the source repos.",
    demo: "Real demo attempted on the local harness surface and spec-backed flow. The proof page documents an actual QA workspace, not a mock dashboard."
  },
  "prompto-daily-prompt-trainer": {
    audience: "Founders, operators, and L&D leads who want a deployable prompt-training product they can ship or license — not a course, a tool.",
    publicPrivate:
      "Public surface: live app at https://prompto-iota.vercel.app and this proof page. Private surface: scoring rubric weights and future AI critique seam stay in the source repo.",
    demo: "Live at https://prompto-iota.vercel.app — mobile-first, runs fully in browser, no auth, no backend. Complete a mission, see deterministic scoring across 6 criteria, retry to improve."
  }
};

export const notes = [
  {
    slug: "publishing-principles",
    title: "Publishing Principles",
    excerpt: "Ship meaningful proofs, not filler."
  }
];

export function getArtifactBySlug(slug: string) {
  return artifacts.find((item) => item.link.split("/").pop() === slug);
}

export function getArtifactDetailCopy(slug: string) {
  return artifactDetailCopy[slug] ?? {
    audience: "Public visitors who need a compact proof page.",
    publicPrivate: "Public surface: proof page and capture. Private surface: implementation and secrets stay outside this repo.",
    demo: "Real demo status not expanded on this page."
  };
}

