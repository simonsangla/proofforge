import promptDojo from "@/content/artifacts/prompt-dojo-module-01.json";
import artifactContract10FieldCanonicalSystem from "@/content/artifacts/artifact-contract-10-field-canonical-system.json";
import localFirstAiExecutorLoop from "@/content/artifacts/local-first-ai-executor-loop.json";
import metricpilotKpiDropAnalyzer from "@/content/artifacts/metricpilot-kpi-drop-analyzer.json";
import promptOptimizer from "@/content/artifacts/prompt-optimizer-chatgpt-like-prompt-refiner.json";
import publishingPrinciples from "@/content/artifacts/publishing-principles.json";
import shortcutFactory from "@/content/artifacts/shortcut-factory-prompt-shortcut-builder.json";
import visualQaControlTower from "@/content/artifacts/visual-qa-control-tower-stepwise-qa-workspace.json";

export type Artifact = typeof promptDojo;

export const artifacts: Artifact[] = [
  promptOptimizer,
  shortcutFactory,
  visualQaControlTower,
  metricpilotKpiDropAnalyzer,
  artifactContract10FieldCanonicalSystem,
  localFirstAiExecutorLoop,
  publishingPrinciples,
  promptDojo
];

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
