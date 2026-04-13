# ProofForge Agent Handoff

- Project role: public Phase 1 ProofForge portfolio shell
- Current phase: public proof units + validation hardening
- Latest accepted batch: Local GitHub Actions emulation parity fix
- Frozen truth date: 2026-04-13
- Current public URL: https://proofforge-sooty.vercel.app
- Current local validation commands: `pnpm build`, `pnpm lint`, `pnpm ci:local`, `pnpm dev:validate`, `pnpm preview:human`, `pnpm responsive:validate`, `pnpm prod:smoke`
- Current required validation flow: clean build -> local preview -> browser smoke -> human open -> responsive validation -> public smoke
- Current shipped artifacts: 5
- Active workflow commands: `pnpm lint`, `pnpm dev:validate`, `pnpm preview:human`, `pnpm browser:validate`, `pnpm responsive:validate`, `pnpm prod:smoke`
- Current operational artifact root: `.artifacts/validation/{browser,responsive,smoke}` plus `.artifacts/logs`
- Local GitHub Actions emulation: `pnpm ci:local` uses act with Colima Docker host and `--container-daemon-socket unix:///var/run/docker.sock`
- Current merge/CI truth: GitHub Actions added (`ci`, `prod-smoke`); branch protection on `main` is applied; required PR check: `ci`; post-merge check: `prod-smoke`
- Branch discipline: one meaningful batch per branch; default branch name `codex/<batch-name>`; do not start on `main` by default
- Current execution branch: `codex/execution-state`
- Unrelated dirt: stashed for later recovery, branch scope kept narrow
- Key constraints: no backend/auth/db/CMS, no broad scans by default, keep changes minimal, public-only repo
- Next likely batch: tighten proof quality or merge guardrails, only if requested
