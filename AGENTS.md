# AI AGENT PROTOCOL

## Context Recovery Order
1. Read [AGENT_HANDOFF.md](./AGENT_HANDOFF.md) first.
2. Read this file second.
3. Read only task-relevant files next.
4. Prefer changed-files-first validation.
5. Do not run broad repo scans unless blocked or explicitly asked.

## Rule 1 — ARCH-FIRST
Never write implementation code before validating the architectural pattern.
Do not invent product layers or technical subsystems not present in the repo.

## Rule 2 — Strict Determinism
Use only provided facts, existing files, and real repo structure.
No fake APIs, no invented schemas, no fabricated runtime assumptions.

## Rule 3 — Anti-Drift
Do not expand beyond the current approved phase.
For Phase 1, do not add backend services, auth, database, CMS, or complex feature layers.

## Rule 4 — Public/Private Boundary
This repo is public by design.
Do not place proprietary logic, secrets, internal tools, or private engine code in this repository.

## Rule 5 — Minimal Change Surface
Prefer the smallest viable correct change.
Avoid broad refactors, unnecessary file churn, or speculative abstraction.

## Rule 5.1 — Branch Discipline
- One meaningful batch = one branch.
- Default branch naming pattern: `codex/<batch-name>`.
- Never work on `main` by default.

## Rule 5.2 — Dirty-Tree Guard
- Check current branch before work.
- Check dirty state before work.
- If unrelated dirt exists, report it clearly before editing.

## Anti-Waste Rules
- No broad recursive scans by default.
- Do not reread stable context if AGENT_HANDOFF already covers it.
- No repo-wide grep/find unless justified.
- If expanded scan is needed, state why before doing it.

## Rule 6 — Validation Before Claim
Do not claim success without running relevant validation.
When code changes affect build behavior, run the project build before reporting completion.

## Rule 7 — UI Discipline
UI must remain minimal, restrained, mobile-first, and non-blue.
Typography and information hierarchy should do most of the work.
Do not introduce visual noise or dashboard bloat.

# LOCAL-FIRST VALIDATION PROTOCOL

1. No blind UI delivery
Any UI, UX, or product-facing change must run locally before it is claimed complete.
A successful build alone is not enough.

2. Human preview gate
After any meaningful visible change, provide:
- exact local run command
- exact preview URL
- exact thing the human must verify
Stop for human validation before the next meaningful phase unless told otherwise.
Human check is valid only after preview is live, browser smoke passed, and final review pages opened for human.

3. Reproducible state testing
When relevant, use deterministic fixtures, seed data, debug routes, or stable local states so the UI can be inspected reliably.

4. Built-in observability
When relevant, include enough debug visibility to reduce blind iteration.
Prefer visible runtime errors, explicit loading/empty/error states, debug sections, request/response state visibility, and environment sanity indicators.

5. Tail logs, not guessing
Prefer foreground logs or clearly tailable logs over silent background execution when local inspection matters.

6. Environment sanity check
When env vars or runtime config matter, add or require a minimal sanity-check path so misconfiguration is easy to detect.

7. Validation before progression
For UI/product work, executor output must include:
- run command
- preview URL
- manual validation checklist
- logs to watch
Do not claim completion of the next phase before human local review.

## Executor Handoff
For meaningful UI, UX, product, or local-validation batches:
- executor runs commands
- executor handles runtime hygiene
- executor starts live preview
- executor verifies required routes
- executor runs browser-open validation
- executor opens final review pages for human
- human only does visual review on live preview
- human gets blocker only if safe preview cannot start
- use `pnpm dev:validate` for full local handoff

## Freeze-State Discipline
- After accepted batch, freeze current truth.
- Update [AGENT_HANDOFF.md](./AGENT_HANDOFF.md) with accepted state.
- Next batch starts from frozen truth, not repo scan.
- Frozen truth means current public URL, required validation flow, required PR checks, shipped artifacts count, and next likely batch.
- Batch scope stays narrow.
- No unrelated carryover.
- Merge only after accepted report and passing validation.

## Executor Report Contract
Every meaningful batch report must include:
- BROWSER VALIDATION
- HUMAN HANDOFF
- CONTEXT RECOVERY PATH
- extra_scan_needed
- reason_if_yes
- LOG AUDIT
- DEPLOY PATH
- FREEZE STATUS
- branch_name
- started_from_main
- dirty_tree_before
- unrelated_dirt_detected
- rollback_path_clear
