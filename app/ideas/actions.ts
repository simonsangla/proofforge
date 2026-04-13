"use server";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  slugify,
  validateDraft,
  type ArtifactDraft,
  type ValidationResult
} from "@/lib/artifact-contract";

export type SaveDraftResult = {
  ok: boolean;
  path?: string;
  validation: ValidationResult;
  error?: string;
};

export async function saveDraft(
  draft: ArtifactDraft
): Promise<SaveDraftResult> {
  const validation = validateDraft(draft);

  const baseSlug = draft.name ? slugify(draft.name) : "";
  const slug = baseSlug || `draft-${Date.now()}`;

  try {
    const dir = path.join(process.cwd(), "content", "artifact-drafts");
    await mkdir(dir, { recursive: true });
    const filePath = path.join(dir, `${slug}.json`);
    const relPath = `content/artifact-drafts/${slug}.json`;
    await writeFile(filePath, JSON.stringify(draft, null, 2) + "\n", "utf8");
    return { ok: true, path: relPath, validation };
  } catch (err) {
    return {
      ok: false,
      validation,
      error: err instanceof Error ? err.message : String(err)
    };
  }
}
