// Deterministic text -> ArtifactDraft parser.
// No LLM, no inference. Recognises simple "key: value" lines for the 10 canonical fields.
// If no recognised keys appear, the full text seeds `promise` and the rest stays empty.

import type { ArtifactDraft, ArtifactField } from "@/lib/artifact-contract";

const TODAY = "2026-04-13";

const KEY_ALIASES: Record<string, ArtifactField> = {
  name: "name",
  title: "name",
  category: "category",
  promise: "promise",
  business_value: "business_value",
  "business value": "business_value",
  value: "business_value",
  status: "status",
  protection: "protection_level",
  protection_level: "protection_level",
  "protection level": "protection_level",
  link: "link",
  url: "link",
  capture: "capture",
  screenshot: "capture",
  tech: "tech_stack",
  tech_stack: "tech_stack",
  "tech stack": "tech_stack",
  stack: "tech_stack",
  date: "date"
};

export type ParseResult = {
  draft: ArtifactDraft;
  appliedDefaults: ArtifactField[];
  usedKeyedLines: boolean;
};

export function parseIdea(raw: string): ParseResult {
  const draft: ArtifactDraft = {};
  let usedKeyedLines = false;

  const lines = raw.split(/\r?\n/);
  const remainder: string[] = [];

  for (const line of lines) {
    const match = line.match(/^\s*([A-Za-z][A-Za-z _]*?)\s*:\s*(.+?)\s*$/);
    if (!match) {
      remainder.push(line);
      continue;
    }
    const rawKey = match[1].trim().toLowerCase().replace(/\s+/g, " ");
    const field = KEY_ALIASES[rawKey];
    if (!field) {
      remainder.push(line);
      continue;
    }
    const value = match[2].trim();
    if (!value) continue;
    usedKeyedLines = true;

    if (field === "tech_stack") {
      draft.tech_stack = value
        .split(/[,;]/)
        .map((s) => s.trim())
        .filter(Boolean);
    } else {
      draft[field] = value;
    }
  }

  // If no keys recognised at all, seed `promise` with the whole input.
  if (!usedKeyedLines) {
    const seed = raw.trim();
    if (seed && !draft.promise) draft.promise = seed;
  } else {
    // If keyed lines were used but extra freeform text remains and no promise was set, use it.
    const leftover = remainder.join("\n").trim();
    if (leftover && !draft.promise) draft.promise = leftover;
  }

  // Safe POC defaults — flagged so the UI can mark them.
  const appliedDefaults: ArtifactField[] = [];
  if (!draft.date) {
    draft.date = TODAY;
    appliedDefaults.push("date");
  }
  if (!draft.status) {
    draft.status = "concept";
    appliedDefaults.push("status");
  }
  if (!draft.protection_level) {
    draft.protection_level = "limited";
    appliedDefaults.push("protection_level");
  }

  return { draft, appliedDefaults, usedKeyedLines };
}
