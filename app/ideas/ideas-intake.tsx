"use client";

import { useMemo, useState, useTransition } from "react";
import {
  ARTIFACT_FIELDS,
  CATEGORIES,
  PROTECTION_LEVELS,
  STATUSES,
  validateDraft,
  type ArtifactDraft,
  type ArtifactField
} from "@/lib/artifact-contract";
import { parseIdea } from "@/lib/parse-idea";
import { saveDraft, type SaveDraftResult } from "./actions";

const PLACEHOLDER = `Rough idea — type or paste.

You can use key: value lines, one per line:
name: Prompt Forge Starter
category: Prompt Forge
promise: Gives a team a working prompt scaffold in minutes.
business_value: Cuts prompt iteration cost.
link: /lab/prompt-forge-starter
capture: /captures/prompt-forge-starter.png
tech_stack: Prompt Engineering, PWA

Lines without a known key become part of the promise.`;

function fieldLabel(field: ArtifactField): string {
  return field.replace(/_/g, " ");
}

function renderValue(field: ArtifactField, draft: ArtifactDraft): string {
  const v = draft[field];
  if (v === undefined || v === null) return "—";
  if (Array.isArray(v)) return v.length ? v.join(", ") : "—";
  if (typeof v === "string") return v.trim() ? v : "—";
  return String(v);
}

export function IdeasIntake() {
  const [text, setText] = useState("");
  const [saveResult, setSaveResult] = useState<SaveDraftResult | null>(null);
  const [isSaving, startSave] = useTransition();

  const parsed = useMemo(() => parseIdea(text), [text]);
  const validation = useMemo(() => validateDraft(parsed.draft), [parsed.draft]);
  const issuesCount = validation.missing.length + validation.errors.length;

  const defaultsSet = new Set(parsed.appliedDefaults);

  function onSave() {
    setSaveResult(null);
    const draft = parsed.draft;
    startSave(async () => {
      const res = await saveDraft(draft);
      setSaveResult(res);
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Ideas</p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Capture a rough proof idea.
        </h1>
        <p className="text-sm text-muted">
          Type on phone. We parse it into the 10-field artifact shape, show what is
          missing, and save a draft. Drafts never touch the public artifact list.
        </p>
      </header>

      <section className="flex flex-col gap-2">
        <label
          htmlFor="idea"
          className="text-xs uppercase tracking-[0.3em] text-muted"
        >
          Idea
        </label>
        <textarea
          id="idea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          placeholder={PLACEHOLDER}
          inputMode="text"
          className="w-full resize-y rounded-sm border border-line bg-[#fbf8f3] p-4 text-base leading-relaxed text-ink placeholder:text-muted/70 focus:outline-none focus:ring-1 focus:ring-ink/20"
        />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs uppercase tracking-[0.3em] text-muted">
          Parsed draft
        </h2>
        <dl className="grid grid-cols-1 gap-2 rounded-sm border border-line bg-[#fbf8f3] p-4 text-sm">
          {ARTIFACT_FIELDS.map((field) => {
            const isDefault = defaultsSet.has(field);
            const v = renderValue(field, parsed.draft);
            const empty = v === "—";
            return (
              <div
                key={field}
                className="grid grid-cols-[7.5rem_1fr] items-baseline gap-3"
              >
                <dt className="text-xs uppercase tracking-[0.2em] text-muted">
                  {fieldLabel(field)}
                </dt>
                <dd
                  className={
                    empty
                      ? "text-muted"
                      : isDefault
                        ? "text-ink"
                        : "text-ink"
                  }
                >
                  {v}
                  {isDefault && !empty ? (
                    <span className="ml-2 text-xs text-muted">(default)</span>
                  ) : null}
                </dd>
              </div>
            );
          })}
        </dl>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-xs uppercase tracking-[0.3em] text-muted">
          Missing fields
        </h2>
        {validation.missing.length === 0 ? (
          <p className="text-sm text-muted">None.</p>
        ) : (
          <ul className="flex flex-wrap gap-2 text-sm">
            {validation.missing.map((f) => (
              <li
                key={f}
                className="rounded-sm border border-line bg-[#fbf8f3] px-2 py-1 text-xs uppercase tracking-[0.2em] text-muted"
              >
                {fieldLabel(f)}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-xs uppercase tracking-[0.3em] text-muted">
          Validation
        </h2>
        {validation.ok ? (
          <p className="text-sm">Draft matches the 10-field contract.</p>
        ) : (
          <div className="flex flex-col gap-2 text-sm">
            <p className="text-muted">
              {issuesCount} {issuesCount === 1 ? "issue" : "issues"}.
            </p>
            {validation.errors.length > 0 ? (
              <ul className="flex flex-col gap-1">
                {validation.errors.map((e, i) => (
                  <li key={i} className="text-ink">
                    <span className="uppercase tracking-[0.2em] text-xs text-muted">
                      {fieldLabel(e.field)}
                    </span>
                    <span className="ml-2">{e.reason}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        )}
      </section>

      <section className="flex flex-col gap-3">
        <button
          type="button"
          onClick={onSave}
          disabled={isSaving || text.trim().length === 0}
          className="w-full rounded-sm border border-ink bg-ink px-4 py-3 text-sm font-medium tracking-wide text-paper transition disabled:opacity-40"
        >
          {isSaving
            ? "Saving…"
            : validation.ok
              ? "Save draft"
              : `Save draft (${issuesCount} ${issuesCount === 1 ? "issue" : "issues"})`}
        </button>
        {saveResult ? (
          <div className="rounded-sm border border-line bg-[#fbf8f3] p-3 text-sm text-ink">
            {saveResult.ok ? (
              <div className="flex flex-col gap-1">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-muted">
                    Saved
                  </span>
                  <span className="ml-2 text-xs uppercase tracking-[0.2em] text-muted">
                    {saveResult.storage === "blob"
                      ? "vercel blob"
                      : "local filesystem"}
                  </span>
                </div>
                <code className="break-all text-muted">{saveResult.path}</code>
                {saveResult.url ? (
                  <a
                    href={saveResult.url}
                    target="_blank"
                    rel="noreferrer"
                    className="break-all underline"
                  >
                    {saveResult.url}
                  </a>
                ) : null}
              </div>
            ) : (
              <>Failed: {saveResult.error ?? "unknown error"}</>
            )}
          </div>
        ) : null}
        <p className="text-xs text-muted">
          Promotion to <code>content/artifacts/</code> requires a clean validation
          pass. Not available in this batch.
        </p>
      </section>

      <footer className="flex flex-col gap-1 border-t border-line pt-4 text-xs text-muted">
        <p>
          Allowed categories: {CATEGORIES.join(" · ")}
        </p>
        <p>Statuses: {STATUSES.join(" · ")}</p>
        <p>Protection levels: {PROTECTION_LEVELS.join(" · ")}</p>
      </footer>
    </div>
  );
}
