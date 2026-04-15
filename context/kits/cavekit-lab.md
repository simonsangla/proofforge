---
created: "2026-04-15"
last_edited: "2026-04-15"
---

# Cavekit: Lab

## Scope
Lab index route, per-artifact detail route, artifact card component, capture asset rendering. The public proof surface.

## Requirements

### R1: Lab index route
**Description:** `/lab` lists all artifacts with a 3-up featured "selling pack" above a full archive grid.
**Acceptance Criteria:**
- [ ] First 3 artifacts render as featured cards in a 3-column grid on desktop
- [ ] Remaining artifacts render in a single-column archive grid below
- [ ] Mobile: cards stack single-column
- [ ] Page renders no console errors across verified viewports
**Dependencies:** `cavekit-content.md` R2

### R2: Artifact card
**Description:** Compact card summarising one artifact with category, name, status badge, promise, business value, tech stack peek, and "Open Proof" CTA.
**Acceptance Criteria:**
- [ ] Status badge color matches status: `live_demo` emerald, `internal_harness` amber, `spec_only` zinc, `protected` rose
- [ ] Unknown status falls back to `spec_only` styling
- [ ] Shows first 2 tech stack items (rest truncated)
- [ ] "Open Proof" link uses `TrackedLink` (emits `open_proof_click` event)
**Dependencies:** `cavekit-content.md` R1, `cavekit-analytics.md` R1

### R3: Artifact detail route
**Description:** `/lab/[slug]` renders a full proof page for a single artifact.
**Acceptance Criteria:**
- [ ] Missing slug returns 404 via `notFound()`
- [ ] Renders header (category, date, name, business value)
- [ ] Renders capture image via `next/image` at 1200×800 with `priority`
- [ ] Renders Promise, Governance (status/protection/reference), Stack aside blocks
- [ ] Renders Audience + Demo Integrity + Public/Private sections from detail copy
- [ ] `protection_level` of `protected` or `private` renders a gated CTA block with `request_proof_access` event; `limited` or other does not
**Dependencies:** `cavekit-content.md` R2/R3/R5, `cavekit-analytics.md` R1

### R4: Capture assets
**Description:** Every artifact references a capture asset (SVG or PNG) at the path in its `capture` field.
**Acceptance Criteria:**
- [ ] Capture file exists at `public{capture}` for every artifact
- [ ] Image loads with `naturalWidth > 0` on the detail route
- [ ] Missing capture is flagged by validation harness, not silently broken
**Dependencies:** none (asset files)

### R5: Dynamic route metadata
**Description:** `generateMetadata` on the detail route supplies per-artifact `title`, `description`, and OG `images`.
**Acceptance Criteria:**
- [ ] `title` is `${artifact.name} | ProofForge`
- [ ] `description` is `artifact.promise`
- [ ] OG image URL equals `artifact.capture`
- [ ] Missing slug returns `{ title: "Not Found" }`
**Dependencies:** `cavekit-content.md` R5

## Out of Scope
- Search, filtering, sorting UI
- Tagging system beyond `category`
- Comments, likes, social interactions
- Per-artifact bespoke layouts (all detail pages share one template)

## Cross-References
- `cavekit-content.md` — data source
- `cavekit-analytics.md` — tracked events
- `cavekit-seo.md` — metadata/sitemap for lab routes
- `cavekit-shell.md` — wraps every lab page

## Source Traceability
- `app/lab/page.tsx` — R1
- `app/lab/[slug]/page.tsx` — R3, R5
- `components/artifact-card.tsx` — R2
- `public/captures/*` — R4

## Changelog
- 2026-04-15: Initial draft from brownfield Phase 3 state
