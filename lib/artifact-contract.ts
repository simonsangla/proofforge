// Canonical 10-field artifact contract.
// Source of truth: docs/archive/proofforge_project_starter/04_ARTIFACT_CONTRACT.json
// Kept dependency-free (no zod) to avoid inflating the POC.

export const CATEGORIES = [
  "Mini App",
  "Prompt Dojo",
  "Prompt Forge",
  "Code Pattern",
  "Best Practice",
  "UI Pattern",
  "Product Experiment",
  "Data Tool",
  "Playbook",
  "Micro Utility"
] as const;

export const STATUSES = [
  "concept",
  "live_demo",
  "replica",
  "private_engine",
  "archived"
] as const;

export const PROTECTION_LEVELS = ["public", "limited", "private"] as const;

export type Category = (typeof CATEGORIES)[number];
export type Status = (typeof STATUSES)[number];
export type ProtectionLevel = (typeof PROTECTION_LEVELS)[number];

export const ARTIFACT_FIELDS = [
  "name",
  "category",
  "promise",
  "business_value",
  "status",
  "protection_level",
  "link",
  "capture",
  "tech_stack",
  "date"
] as const;

export type ArtifactField = (typeof ARTIFACT_FIELDS)[number];

export type ArtifactDraft = {
  name?: string;
  category?: string;
  promise?: string;
  business_value?: string;
  status?: string;
  protection_level?: string;
  link?: string;
  capture?: string;
  tech_stack?: string[];
  date?: string;
};

export type Artifact = {
  name: string;
  category: Category;
  promise: string;
  business_value: string;
  status: Status;
  protection_level: ProtectionLevel;
  link: string;
  capture: string;
  tech_stack: string[];
  date: string;
};

export type ValidationError = { field: ArtifactField; reason: string };

export type ValidationResult = {
  ok: boolean;
  missing: ArtifactField[];
  errors: ValidationError[];
};

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

export function validateDraft(draft: ArtifactDraft): ValidationResult {
  const missing: ArtifactField[] = [];
  const errors: ValidationError[] = [];

  if (!isNonEmptyString(draft.name)) missing.push("name");
  if (!isNonEmptyString(draft.promise)) missing.push("promise");
  if (!isNonEmptyString(draft.business_value)) missing.push("business_value");
  if (!isNonEmptyString(draft.link)) missing.push("link");
  if (!isNonEmptyString(draft.capture)) missing.push("capture");

  if (!isNonEmptyString(draft.category)) {
    missing.push("category");
  } else if (!(CATEGORIES as readonly string[]).includes(draft.category)) {
    errors.push({
      field: "category",
      reason: `must be one of: ${CATEGORIES.join(", ")}`
    });
  }

  if (!isNonEmptyString(draft.status)) {
    missing.push("status");
  } else if (!(STATUSES as readonly string[]).includes(draft.status)) {
    errors.push({
      field: "status",
      reason: `must be one of: ${STATUSES.join(", ")}`
    });
  }

  if (!isNonEmptyString(draft.protection_level)) {
    missing.push("protection_level");
  } else if (
    !(PROTECTION_LEVELS as readonly string[]).includes(draft.protection_level)
  ) {
    errors.push({
      field: "protection_level",
      reason: `must be one of: ${PROTECTION_LEVELS.join(", ")}`
    });
  }

  if (!draft.tech_stack || draft.tech_stack.length === 0) {
    missing.push("tech_stack");
  } else if (draft.tech_stack.some((t) => !isNonEmptyString(t))) {
    errors.push({
      field: "tech_stack",
      reason: "entries must be non-empty strings"
    });
  }

  if (!isNonEmptyString(draft.date)) {
    missing.push("date");
  } else if (!DATE_RE.test(draft.date)) {
    errors.push({ field: "date", reason: "must match YYYY-MM-DD" });
  }

  return { ok: missing.length === 0 && errors.length === 0, missing, errors };
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
