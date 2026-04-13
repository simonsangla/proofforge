# SYSTEM STATE: PROOFFORGE PUBLIC

- **Phase**: Phase 1 — Portfolio Shell
- **Repo Role**: Public PWA proof surface only
- **Core Stack**: Next.js App Router, TypeScript, Tailwind CSS, local JSON content, Markdown content
- **Locked Routes**:
  - `/`
  - `/lab`
  - `/lab/[slug]`
  - `/notes`
  - `/about`
- **Canonical Artifact Contract**:
  1. `name`
  2. `category`
  3. `promise`
  4. `business_value`
  5. `status`
  6. `protection_level`
  7. `link`
  8. `capture`
  9. `tech_stack`
  10. `date`
- **Invariants**:
  1. This repo must remain public-surface only.
  2. No backend, auth, database, CMS, or private-engine logic may be introduced without explicit architectural approval.
  3. New artifacts must follow the canonical 10-field contract.
  4. Content and code must remain separated.
  5. Navigation must remain shallow.
  6. Phase 1 must not expand scope before Phase 2 content exists.
- **Known Gaps**:
  - placeholder capture may still exist until replaced by real proof
  - PWA manifest/service worker not yet implemented unless already present
  - filtering/sorting may still be basic Phase 1 logic
- **Public/Private Boundary**:
  - Public repo contains portfolio shell, public artifact metadata, notes, captures, and limited proof surfaces.
  - Private logic must live outside this repo.
