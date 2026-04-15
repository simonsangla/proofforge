---
created: "2026-04-15"
last_edited: "2026-04-15"
---

# Cavekit: Governance

## Scope
The agent protocol that governs how work happens in this repo: context recovery, branch discipline, freeze-state, validation-before-claim, executor handoff, public/private boundary. Non-code requirements — codified behavior.

## Requirements

### R1: Context recovery order
**Description:** Every agent session reads `AGENT_HANDOFF.md` first, then `AGENTS.md`, then only task-relevant files.
**Acceptance Criteria:**
- [ ] `AGENT_HANDOFF.md` exists at project root and records frozen truth
- [ ] `AGENTS.md` exists at project root and declares the protocol
- [ ] No agent performs broad recursive scans by default
- [ ] Agents prefer changed-files-first validation
**Dependencies:** none

### R2: Arch-first + anti-drift
**Description:** Agents never write implementation code before validating the architectural pattern. No invented product layers, no expansion beyond the current approved phase.
**Acceptance Criteria:**
- [ ] No backend services, auth, database, or CMS added while the current phase forbids them
- [ ] No speculative abstraction or broad refactor without explicit approval
- [ ] Current phase + constraints are recorded in `AGENT_HANDOFF.md`
**Dependencies:** R1

### R3: Public/private boundary
**Description:** This repo is public by design. Proprietary logic, secrets, and internal tools stay out.
**Acceptance Criteria:**
- [ ] No credentials, API keys, or tokens committed
- [ ] No private engine code, internal playbooks, or proprietary prompt libraries in content
- [ ] Every artifact record declares its `protection_level` truthfully
**Dependencies:** `cavekit-content.md` R1

### R4: Branch discipline
**Description:** One meaningful batch per branch. Default pattern `codex/<batch-name>`. No work on `main`.
**Acceptance Criteria:**
- [ ] Current working branch recorded in `AGENT_HANDOFF.md` before edits start
- [ ] Dirty-tree state checked before edits; unrelated dirt reported before editing
- [ ] Each merged branch corresponds to exactly one accepted batch
**Dependencies:** `cavekit-ci.md` R3

### R5: Validation-before-claim
**Description:** Agents do not claim completion without running relevant validation. UI/product work requires human preview gate.
**Acceptance Criteria:**
- [ ] Build behavior changes trigger `pnpm build` before completion claim
- [ ] UI changes trigger `pnpm dev:validate` + browser smoke + responsive validation
- [ ] Executor reports include: run command, preview URL, manual validation checklist, logs to watch
- [ ] No "done" claim until the human has reviewed the live preview (for UI/product batches)
**Dependencies:** `cavekit-harness.md` R3/R4/R7

### R6: Freeze-state discipline
**Description:** After an accepted batch, truth is frozen: `AGENT_HANDOFF.md` is updated to record current state. Next batch starts from that frozen truth, not a fresh repo scan.
**Acceptance Criteria:**
- [ ] `AGENT_HANDOFF.md` updated with accepted state after every batch
- [ ] Frozen truth includes: current public URL, required validation flow, required PR checks, shipped artifact count, next likely batch
- [ ] No unrelated carryover between batches
**Dependencies:** R1

### R7: Executor report contract
**Description:** Every meaningful batch report includes a standard set of fields.
**Acceptance Criteria:**
- [ ] Report contains: BROWSER VALIDATION, HUMAN HANDOFF, CONTEXT RECOVERY PATH, `extra_scan_needed`, `reason_if_yes`, LOG AUDIT, DEPLOY PATH, FREEZE STATUS, `branch_name`, `started_from_main`, `dirty_tree_before`, `unrelated_dirt_detected`, `rollback_path_clear`
- [ ] Reports without these fields are considered incomplete
**Dependencies:** R5

### R8: UI discipline
**Description:** UI is minimal, restrained, mobile-first, non-blue. Typography and hierarchy do the work.
**Acceptance Criteria:**
- [ ] No blue primary colors in new UI
- [ ] No dashboard bloat
- [ ] Design tokens preferred over hardcoded values
**Dependencies:** `cavekit-shell.md` R5

## Out of Scope
- Code style formatting rules (covered by ESLint config)
- PR description templates
- Issue templates
- Code of conduct

## Cross-References
- `cavekit-content.md` — public/private boundary for artifact records
- `cavekit-shell.md` — UI discipline
- `cavekit-harness.md` — validation-before-claim tooling
- `cavekit-ci.md` — branch protection

## Source Traceability
- `AGENTS.md` — R1–R8 (canonical protocol document)
- `AGENT_HANDOFF.md` — R1, R6 (living frozen-state document)

## Changelog
- 2026-04-15: Initial draft from brownfield Phase 3 state
