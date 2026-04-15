---
created: "2026-04-15"
last_edited: "2026-04-15"
---

# Cavekit: Content

## Scope
Artifact records, schema validation, status taxonomy, detail-copy map, MDX notes, content loader. Filesystem-backed, build-time loaded, no CMS.

## Requirements

### R1: Canonical artifact schema
**Description:** Every artifact record validates against a single Zod schema with 10 required fields: `name`, `category`, `promise`, `business_value`, `status`, `protection_level`, `link`, `capture`, `tech_stack`, `date`.
**Acceptance Criteria:**
- [ ] Schema rejects any record missing a required field
- [ ] Schema rejects `status` values outside the enum (`live_demo`, `internal_harness`, `spec_only`, `protected`)
- [ ] `tech_stack` must be an array of strings
- [ ] Build fails if any `content/artifacts/*.json` fails schema validation
- [ ] [GAP] Repo status enum omits `replica` noted in canonical docs per `AGENT_HANDOFF.md:82` — schema refactor deferred
**Dependencies:** none

### R2: JSON-per-artifact storage
**Description:** Each artifact lives in its own file under `content/artifacts/{slug}.json`. No central registry.
**Acceptance Criteria:**
- [ ] Adding an artifact = dropping one JSON file + one capture asset
- [ ] Filename slug matches the trailing segment of `link`
- [ ] Loader reads the directory at build time, validates all records, exposes a typed `artifacts` array
**Dependencies:** R1

### R3: Detail copy registry
**Description:** Each artifact may have an optional extended copy record with three fields: `audience`, `publicPrivate`, `demo`. Missing entries fall back to a generic default.
**Acceptance Criteria:**
- [ ] `getArtifactDetailCopy(slug)` never throws for any valid slug
- [ ] Fallback returns the three fields populated with generic defaults
- [ ] Populated entries render verbatim on the artifact detail route
**Dependencies:** R2

### R4: Notes MDX pipeline
**Description:** Notes are authored as markdown files under `content/notes/`, exposed through a `notes` collection with `slug`, `title`, `excerpt`.
**Acceptance Criteria:**
- [ ] Each note file has a corresponding entry in the `notes` array
- [ ] `/notes` route lists all notes with title and excerpt
**Dependencies:** none

### R5: Slug lookup
**Description:** A lookup function resolves an artifact from its URL slug.
**Acceptance Criteria:**
- [ ] `getArtifactBySlug(slug)` returns the matching artifact or `undefined`
- [ ] Used by the dynamic detail route
**Dependencies:** R2

## Out of Scope
- Database, CMS, API-backed content
- Runtime content mutation (read-only at build)
- Draft/preview workflows
- Content localization

## Cross-References
- `cavekit-lab.md` consumes `artifacts` + `getArtifactBySlug` + `getArtifactDetailCopy`
- `cavekit-harness.md` validates JSON records via `scripts/validate-artifacts.mjs`
- `cavekit-seo.md` uses `artifacts` for sitemap entries
- `cavekit-shell.md` reads `artifacts` on homepage

## Source Traceability
- `lib/schema.ts` — R1
- `lib/content.ts` — R2, R3, R4, R5
- `content/artifacts/*.json` (13 files) — R2
- `content/notes/*.md` — R4

## Changelog
- 2026-04-15: Initial draft from brownfield Phase 3 state
