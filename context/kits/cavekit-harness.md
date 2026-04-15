---
created: "2026-04-15"
last_edited: "2026-04-15"
---

# Cavekit: Harness

## Scope
Local validation scripts: build lock, dev control, artifact schema validation, browser smoke (Playwright), responsive grid, production smoke, local CI emulation. All outputs land under `.artifacts/`.

## Requirements

### R1: Build with lock
**Description:** A `pnpm build` wrapper cleans `.next/`, guards against overlapping builds with a lockfile, and fails loudly.
**Acceptance Criteria:**
- [ ] Lockfile `.next-build-lock` created at start, removed at end
- [ ] Presence of existing lockfile fails fast with non-zero exit
- [ ] `.next/` removed before build
- [ ] Non-zero exit on `next build` failure
**Dependencies:** none

### R2: Artifact validation script
**Description:** `scripts/validate-artifacts.mjs` validates every `content/artifacts/*.json` against the canonical Zod schema.
**Acceptance Criteria:**
- [ ] Script exits non-zero if any record fails
- [ ] Error output names the failing file and field
- [ ] Schema matches `lib/schema.ts` (same 10 fields, same status enum)
- [ ] [GAP] Schema duplicated in script and lib — single source of truth is future work
**Dependencies:** `cavekit-content.md` R1

### R3: Dev control + browser smoke
**Description:** `pnpm dev:validate` starts a dev server, runs Playwright browser smoke (`scripts/browser-validate.spec.mjs`) against core routes, collects artifacts, tears down.
**Acceptance Criteria:**
- [ ] Routes validated: `/`, `/lab`, seed artifact detail pages, plus any `BATCH_TARGET_SLUGS` additions
- [ ] Target port honors `PORT`/`TARGET_PORT` env (default 3000)
- [ ] Browser artifacts written under `.artifacts/validation/browser/`
- [ ] Non-zero exit on any page load failure or console error
**Dependencies:** `cavekit-lab.md` R1/R3, `cavekit-shell.md` R3

### R4: Responsive validation
**Description:** `pnpm responsive:validate` runs the smoke suite across 4 viewports: 390×844, 768×1024, 1280×800, 1440×900.
**Acceptance Criteria:**
- [ ] Each viewport×route combination passes without console errors
- [ ] Port isolated (default 3100) so it does not collide with dev:validate
- [ ] Outputs written under `.artifacts/validation/responsive/`
**Dependencies:** R3

### R5: Production smoke
**Description:** `pnpm prod:smoke` hits the live deployment and verifies key routes + capture assets return 2xx.
**Acceptance Criteria:**
- [ ] Default base URL is the public production URL; overridable via `PROD_URL`
- [ ] Verifies `/`, `/lab`, seed artifact detail pages, seed capture assets
- [ ] Supports `BATCH_TARGET_SLUGS` for additional routes
- [ ] Non-zero exit on any non-2xx response
**Dependencies:** none

### R6: Local CI emulation
**Description:** `pnpm ci:local` runs the full validation chain locally: lint → build → dev:validate → responsive:validate.
**Acceptance Criteria:**
- [ ] Propagates `BATCH_TARGET_SLUGS` across all sub-steps
- [ ] Writes consolidated log to `.artifacts/logs/ci-local.log`
- [ ] Non-zero exit on any sub-step failure
**Dependencies:** R1, R3, R4

### R7: Human preview gate
**Description:** `pnpm preview:human` and `pnpm dev:validate` produce the artifacts needed for the validation-before-claim protocol.
**Acceptance Criteria:**
- [ ] Emits run command, preview URL, and route verification output for humans (per `AGENTS.md` Local-First Validation section)
- [ ] Logs tail-friendly to `.artifacts/logs/`
**Dependencies:** R3

## Out of Scope
- Unit test framework (none in project today)
- Coverage reporting
- Visual regression testing
- Load testing

## Cross-References
- `cavekit-content.md` — schema alignment with R2
- `cavekit-lab.md` — routes under smoke
- `cavekit-shell.md` — routes under smoke
- `cavekit-ci.md` — remote CI invokes these same scripts
- `cavekit-governance.md` — validation-before-claim rule is satisfied by R3/R4/R7

## Source Traceability
- `scripts/build.mjs` — R1
- `scripts/validate-artifacts.mjs` — R2
- `scripts/dev-control.mjs`, `scripts/browser-validate.spec.mjs` — R3, R7
- `scripts/responsive-validate.mjs` — R4
- `scripts/prod-smoke.mjs` — R5
- `scripts/ci-local.mjs` — R6
- `package.json` scripts — all

## Changelog
- 2026-04-15: Initial draft from brownfield Phase 3 state
