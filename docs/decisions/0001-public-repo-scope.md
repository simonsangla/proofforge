# Decision 0001: Public Repo Scope

## Status
Accepted

## Context
ProofForge Phase 1 is a public PWA portfolio shell. The repo is meant to publish high-signal artifacts and explain them clearly without exposing private engine logic.

## Decision
This repository is the public ProofForge shell.
The public/private split is mandatory.
No backend architecture is introduced in Phase 1.
Governance docs are the control layer against drift.

## Consequences
- Public content stays simple and auditable.
- Private implementation details remain outside this repo.
- Future expansion must be checked against the public-shell boundary before code is added.
