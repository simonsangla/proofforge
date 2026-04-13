import artifact from "@/content/artifacts/prompt-dojo-module-01.json";

export type Artifact = typeof artifact;

export const artifacts: Artifact[] = [artifact];

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
