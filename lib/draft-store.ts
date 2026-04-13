// Draft persistence with two backends:
// - Vercel Blob when BLOB_READ_WRITE_TOKEN is present (prod / preview)
// - Local filesystem otherwise (local dev)
//
// NOTE: Vercel Blob public access means anyone with the returned URL can
// read the draft. The pathname is deterministic (slug-based) so do not
// put secrets in drafts.

import { put, type PutBlobResult } from "@vercel/blob";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { ArtifactDraft } from "@/lib/artifact-contract";

export type DraftStorage = "blob" | "fs";

export type StoredDraft = {
  slug: string;
  storage: DraftStorage;
  path: string;
  url?: string;
};

function serialize(draft: ArtifactDraft): string {
  return JSON.stringify(draft, null, 2) + "\n";
}

export async function storeDraft(
  slug: string,
  draft: ArtifactDraft
): Promise<StoredDraft> {
  const payload = serialize(draft);
  const key = `artifact-drafts/${slug}.json`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const result: PutBlobResult = await put(key, payload, {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true
    });
    return { slug, storage: "blob", path: key, url: result.url };
  }

  const dir = path.join(process.cwd(), "content", "artifact-drafts");
  await mkdir(dir, { recursive: true });
  const filePath = path.join(dir, `${slug}.json`);
  await writeFile(filePath, payload, "utf8");
  return { slug, storage: "fs", path: `content/artifact-drafts/${slug}.json` };
}
