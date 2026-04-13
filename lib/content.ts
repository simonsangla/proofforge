import promptDojo from "@/content/artifacts/prompt-dojo-module-01.json";
import artifactContract10FieldCanonicalSystem from "@/content/artifacts/artifact-contract-10-field-canonical-system.json";
import localFirstAiExecutorLoop from "@/content/artifacts/local-first-ai-executor-loop.json";
import metricpilotKpiDropAnalyzer from "@/content/artifacts/metricpilot-kpi-drop-analyzer.json";
import publishingPrinciples from "@/content/artifacts/publishing-principles.json";
import shortcutFactory from "@/content/artifacts/shortcut-factory-prompt-shortcut-builder.json";

export type Artifact = typeof promptDojo;

export const artifacts: Artifact[] = [
  metricpilotKpiDropAnalyzer,
  artifactContract10FieldCanonicalSystem,
  localFirstAiExecutorLoop,
  publishingPrinciples,
  promptDojo,
  shortcutFactory
];

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
