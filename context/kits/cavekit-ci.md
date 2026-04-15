---
created: "2026-04-15"
last_edited: "2026-04-15"
---

# Cavekit: CI

## Scope
GitHub Actions workflows, branch protection, required PR checks, post-merge smoke.

## Requirements

### R1: PR validation workflow
**Description:** A `ci` workflow runs on every pull request, push, and merge group, executing build + dev:validate + responsive:validate.
**Acceptance Criteria:**
- [ ] Workflow name: `ci`
- [ ] Triggers: `pull_request`, `push`, `merge_group`
- [ ] Runs on `ubuntu-latest` with Node 22 and pnpm 10 via corepack
- [ ] Installs dependencies via `pnpm install --frozen-lockfile`
- [ ] Installs Chromium via `pnpm exec playwright install chromium`
- [ ] Caches Playwright browsers by `pnpm-lock.yaml` hash
- [ ] Runs `pnpm build`, `pnpm dev:validate`, `pnpm responsive:validate`
- [ ] Non-zero exit on any step fails the check
**Dependencies:** `cavekit-harness.md` R1/R3/R4

### R2: Post-merge production smoke
**Description:** A `prod-smoke` workflow runs after merges to `main` and verifies the public deployment.
**Acceptance Criteria:**
- [ ] Workflow name: `prod-smoke`
- [ ] Triggers: `push` to `main` and `workflow_dispatch`
- [ ] Runs `pnpm prod:smoke`
- [ ] Non-zero exit on any non-2xx
**Dependencies:** `cavekit-harness.md` R5

### R3: Branch protection
**Description:** `main` is protected with a required PR check.
**Acceptance Criteria:**
- [ ] `main` cannot be pushed to directly
- [ ] PRs require `ci` to pass before merge
- [ ] Branch protection status recorded in `AGENT_HANDOFF.md`
**Dependencies:** R1

### R4: Minimal permissions
**Description:** All workflows declare `permissions: contents: read` (least privilege).
**Acceptance Criteria:**
- [ ] No workflow grants write access unless explicitly required
- [ ] Third-party actions pinned to major version at minimum
**Dependencies:** none

## Out of Scope
- Preview deployments via CI (handled by Vercel integration)
- Release automation, tagging, changelog bots
- Security scanning (dependabot beyond defaults, code scanning)
- Self-hosted runners

## Cross-References
- `cavekit-harness.md` — CI invokes the same scripts that run locally
- `cavekit-governance.md` — branch discipline + freeze-state rules

## Source Traceability
- `.github/workflows/ci.yml` — R1, R4
- `.github/workflows/prod-smoke.yml` — R2, R4
- Branch protection (GitHub settings, not in repo) — R3

## Changelog
- 2026-04-15: Initial draft from brownfield Phase 3 state
