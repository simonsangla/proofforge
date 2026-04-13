# Repo Boundary

## Public Repo
The public ProofForge repo contains the portfolio shell that visitors can inspect directly.

Acceptable public content includes:
- route shells for the public PWA
- artifact metadata that follows the canonical contract
- notes, principles, and decision records
- preview captures or placeholder captures for public proof
- minimal UI code that renders the public surface

## Private Repo or Service
Anything that would expose the implementation moat belongs outside this repo.

Must stay private:
- private engine logic
- proprietary prompt systems
- internal evaluation scripts
- credentials, tokens, secrets, and environment-specific config
- backend services, databases, auth systems, or sync jobs not required for the public shell

## When To Move Logic Out
Move logic to a private repo or service when it:
- creates reusable internal advantage rather than public proof
- handles sensitive data, privileged workflows, or operational controls
- introduces stateful behavior that is not required for public browsing
- expands beyond the Phase 1 portfolio shell

## Public Proof vs Moat Leakage
Acceptable public proof:
- a rendered artifact card with promise, business value, and proof
- a public note explaining publishing principles
- a capture image that demonstrates the artifact outcome
- a limited status label that explains public visibility

Unacceptable moat leakage:
- full private prompt libraries
- internal agent orchestration code
- hidden evaluation datasets
- unreleased automation logic
- private implementation details disguised as public content
