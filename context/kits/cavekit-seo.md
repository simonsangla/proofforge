---
created: "2026-04-15"
last_edited: "2026-04-15"
---

# Cavekit: SEO

## Scope
Sitemap, robots policy, static and dynamic metadata, OpenGraph, canonical URL resolution.

## Requirements

### R1: Sitemap
**Description:** `/sitemap.xml` lists all static routes plus every artifact detail route.
**Acceptance Criteria:**
- [ ] Static routes included: `/`, `/lab`, `/notes`, `/about`
- [ ] Homepage priority `1.0`, other static priority `0.5`, changeFrequency `monthly`
- [ ] One entry per artifact at `{siteUrl}{artifact.link}`, priority `0.8`, changeFrequency `weekly`
- [ ] `lastModified` uses `artifact.date` when present, else current timestamp
- [ ] `siteUrl` derived from `NEXT_PUBLIC_SITE_URL`, fallback `http://localhost:3000`
**Dependencies:** `cavekit-content.md` R2

### R2: Robots policy
**Description:** `/robots.txt` allows public routes, disallows internal paths, references the sitemap.
**Acceptance Criteria:**
- [ ] `userAgent: *`
- [ ] Allow: `/`, `/lab`, `/lab/`
- [ ] Disallow: `/api/`, `/.next/`
- [ ] `sitemap:` field points to `{siteUrl}/sitemap.xml`
**Dependencies:** none

### R3: Root metadata
**Description:** The root layout declares site-wide metadata.
**Acceptance Criteria:**
- [ ] `title: "ProofForge"`
- [ ] `description: "ProofForge public portfolio PWA shell"`
- [ ] `metadataBase` resolves from `NEXT_PUBLIC_SITE_URL`, fallback `http://localhost:3000`
**Dependencies:** `cavekit-shell.md` R1

### R4: Artifact detail metadata
**Description:** Each artifact detail route generates per-artifact title, description, and OG images.
**Acceptance Criteria:**
- [ ] Title: `${artifact.name} | ProofForge`
- [ ] Description: `artifact.promise`
- [ ] OpenGraph title: `artifact.name`, description: `artifact.promise`, image: `artifact.capture`
- [ ] Missing slug returns `{ title: "Not Found" }`
**Dependencies:** `cavekit-lab.md` R5, `cavekit-content.md` R5

## Out of Scope
- Twitter Cards beyond OG reuse
- Structured data (JSON-LD)
- Per-route canonical URL overrides
- hreflang (single-language site)

## Cross-References
- `cavekit-content.md` — artifact data drives sitemap + OG
- `cavekit-shell.md` — root metadata lives in root layout
- `cavekit-lab.md` — detail-route metadata

## Source Traceability
- `app/sitemap.ts` — R1
- `app/robots.ts` — R2
- `app/layout.tsx` — R3
- `app/lab/[slug]/page.tsx` — R4

## Changelog
- 2026-04-15: Initial draft from brownfield Phase 3 state
