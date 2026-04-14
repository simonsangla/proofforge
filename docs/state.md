# SYSTEM STATE: PROOFFORGE PUBLIC

- **Phase**: Phase 3 — Conversion & Reach (Locked)
- **Repo Role**: Public PWA proof surface and lead generation point
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
  6. Phase 3 must be locked before Phase 4 (Lead Gen Integration) begins.
- **Implementation Status**:
  - **PWA**: Implemented with Serwist and manifest.webmanifest.
  - **Analytics**: Client-side tracking wrappers active.
  - **SEO**: Dynamic metadata injection with metadataBase active.
  - **Conversion**: Protection-based CTA logic (Rose theme) active.
- **Public/Private Boundary**:
  - Public repo contains portfolio shell, public artifact metadata, notes, captures, and limited proof surfaces.
  - Private logic (Full Proof Engines) must live outside this repo.

