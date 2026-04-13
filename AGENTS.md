# AI AGENT PROTOCOL

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

## Rule 6 — Validation Before Claim
Do not claim success without running relevant validation.
When code changes affect build behavior, run the project build before reporting completion.

## Rule 7 — UI Discipline
UI must remain minimal, restrained, mobile-first, and non-blue.
Typography and information hierarchy should do most of the work.
Do not introduce visual noise or dashboard bloat.
