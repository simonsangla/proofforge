"use server";

import {
  slugify,
  validateDraft,
  type ArtifactDraft,
  type ValidationResult
} from "@/lib/artifact-contract";
import { storeDraft, type DraftStorage } from "@/lib/draft-store";

export type SaveDraftResult = {
  ok: boolean;
  slug?: string;
  path?: string;
  url?: string;
  storage?: DraftStorage;
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
    const stored = await storeDraft(slug, draft);
    return {
      ok: true,
      slug: stored.slug,
      path: stored.path,
      url: stored.url,
      storage: stored.storage,
      validation
    };
  } catch (err) {
    return {
      ok: false,
      validation,
      error: err instanceof Error ? err.message : String(err)
    };
  }
}
