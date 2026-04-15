# ProofForge Agent Handoff

- Project role: public Phase 1 ProofForge portfolio shell
- Current phase: Phase 3 (Conversion & Reach) Locked. Architecture-locked, data-driven, and PWA-ready.
- Latest accepted batch: Phase 3 Final Integrity Sweep (PWA, conversion CTAs, dynamic metadata)
- Frozen truth date: 2026-04-14
- Current public URL: https://proofforge-sooty.vercel.app
- Current local validation commands: `pnpm build`, `pnpm lint`, `pnpm ci:local`, `pnpm dev:validate`, `pnpm preview:human`, `pnpm responsive:validate`, `pnpm prod:smoke`
- Current required validation flow: clean build -> local preview -> browser smoke -> human open -> responsive validation -> public smoke
- Current shipped artifacts: 9 (8 prior + Refinr added; MetricPilot updated in place; Prompto unchanged)
- Active workflow commands: `pnpm lint`, `pnpm dev:validate`, `pnpm preview:human`, `pnpm browser:validate`, `pnpm responsive:validate`, `pnpm prod:smoke`
- Current operational artifact root: `.artifacts/validation/{browser,responsive,smoke}` plus `.artifacts/logs`
- Local GitHub Actions emulation: `pnpm ci:local` uses act with Colima Docker host and `--container-daemon-socket unix:///var/run/docker.sock`
- Current merge/CI truth: GitHub Actions added (`ci`, `prod-smoke`); branch protection on `main` is applied; required PR check: `ci`; post-merge check: `prod-smoke`
- Branch discipline: one meaningful batch per branch; default branch name `codex/<batch-name>`; do not start on `main` by default
- Current execution branch: `codex/failure-patterns-log`
- Unrelated dirt: stashed for later recovery, branch scope kept narrow
- Key constraints: no backend/auth/db/CMS, no broad scans by default, keep changes minimal, public-only repo
- Next likely batch: Merge current branch (`codex/failure-patterns-log`) to main via PR — all 3 artifact records complete, all captures verified.

## Validation Batch: Local Preview Smoke (2026-04-15)

### Preview command
`pnpm dev` (via `.claude/launch.json` server `proofforge-dev`)

### Local URL
`http://localhost:3000`

### Routes verified
- `/` — loads, MetricPilot shows "LIVE DEMO" badge, Refinr visible in selling pack ✓
- `/lab` — loads, all artifacts listed with correct status badges ✓
- `/lab/metricpilot-kpi-drop-analyzer` — loads, name/copy/detail-copy/governance fields all render, SVG capture loads (`naturalWidth > 0`) ✓
- `/lab/refinr-local-first-prompt-workshop` — loads, all content fields render, detail copy correct ✓ — capture image broken (`naturalWidth: 0`, `/captures/refinr-local-first-prompt-workshop.svg` missing — expected known gap)
- `/lab/prompto-daily-prompt-trainer` — loads, all content correct, PNG capture loads (`naturalWidth: 195`) ✓

### Console errors
None across all routes.

### Fix needed
None. No implementation change required from runtime validation.

### Known visible issue
~~Refinr capture broken~~ — **Resolved.** `public/captures/refinr-local-first-prompt-workshop.svg` created. Verified: `naturalWidth: 1200`, `naturalHeight: 800`. No console errors.

## Asset Batch: Refinr Capture (2026-04-15)

### Files changed
- `public/captures/refinr-local-first-prompt-workshop.svg` — created (1200×800, warm palette, 4 feature cards: Clarify / Score / Diff / History)

### Preview command
`pnpm dev` via `.claude/launch.json` (server `proofforge-dev`, reused)

### Local URL
`http://localhost:3000`

### Route verified
- `/lab/refinr-local-first-prompt-workshop` — capture loads, `naturalWidth: 1200`, no console errors ✓

### Issue resolved
Refinr capture gap closed. All 3 first-wave artifacts now have valid capture assets.

## Batch: First-Wave Real Artifacts (2026-04-15)

### Objective completed
Added 3 credible first-wave proof records using only verified audit evidence.

### Files changed
- `content/artifacts/metricpilot-kpi-drop-analyzer.json` — updated: name → "MetricPilot — Public Demo", status → live_demo, protection_level → limited
- `content/artifacts/refinr-local-first-prompt-workshop.json` — created: new artifact record
- `lib/content.ts` — added detail-copy entries for `metricpilot-kpi-drop-analyzer` and `refinr-local-first-prompt-workshop`

### Verified evidence used
- MetricPilot: public README confirms DEMO_MODE=true by default, hosted demo exists, live Snowflake path not fully shipped
- Refinr: README defines BYOK + local-first workflow, tests cover persistence/migrations/tone provenance, no public deployment verified
- Prompto: existing entry already accurate — status live_demo, detail copy present, capture exists at `/captures/prompto-daily-prompt-trainer.png`

### Assumptions made
- `Mini App` category mapped to `Prompt Tool` (nearest existing category for Refinr; schema uses z.string() so either would pass Zod, but existing taxonomy was preferred)
- Refinr capture path `/captures/refinr-local-first-prompt-workshop.svg` set as placeholder — file does not exist; page will 404 on image load until asset is created

### Known gaps
- Repo status enum (`live_demo | internal_harness | spec_only | protected`) is out of sync with the canonical ProofForge docs which define a `replica` status. Schema refactor is deferred structural work — do not fix in the next content batch.

### Next bounded batch
Merge `codex/first-wave-artifacts` to main — all 3 artifact records complete, all captures verified and loading.
