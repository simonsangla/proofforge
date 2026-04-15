---
created: "2026-04-15"
last_edited: "2026-04-15"
---

# Cavekit Overview

## Project
proofforge-public — a public portfolio PWA shell (Next.js 14 app router) that publishes compact "proof" artifacts. Phase 3 shipped: 13 artifacts, validation harness, GitHub Actions CI, PWA, dynamic metadata, conversion CTAs.

## Domain Index
| Domain | File | Requirements | Status | Description |
|--------|------|-------------|--------|-------------|
| content | `cavekit-content.md` | 5 | DRAFT | Artifact schema, JSON records, detail copy, notes, loader |
| lab | `cavekit-lab.md` | 5 | DRAFT | Lab index, artifact detail route, artifact card, captures |
| shell | `cavekit-shell.md` | 5 | DRAFT | Root layout, site shell, home, about, notes |
| pwa | `cavekit-pwa.md` | 4 | DRAFT | Manifest, service worker, install CTA, icons |
| seo | `cavekit-seo.md` | 4 | DRAFT | Sitemap, robots, root + dynamic metadata, OG |
| analytics | `cavekit-analytics.md` | 3 | DRAFT | Tracked primitives, env-gated mount, event catalog |
| harness | `cavekit-harness.md` | 7 | DRAFT | Local validation scripts + artifacts outputs |
| ci | `cavekit-ci.md` | 4 | DRAFT | GitHub Actions workflows + branch protection |
| governance | `cavekit-governance.md` | 8 | DRAFT | Agent protocol, branch discipline, freeze-state |

**Totals:** 9 domains, 45 requirements.

## Cross-Reference Map
| Domain A | Interacts With | Interaction Type |
|----------|---------------|-----------------|
| content | lab, shell, seo, harness | provides artifact data + loaders |
| lab | content, analytics, shell, seo | consumes artifacts, renders pages, emits events |
| shell | content, lab, analytics, pwa, seo | wraps every page, hosts install CTA + root metadata |
| pwa | shell, analytics, harness | install CTA in shell, SW built by harness |
| seo | content, shell, lab | derives sitemap + metadata from artifacts/routes |
| analytics | shell, lab, pwa | tracked primitives consumed across UI |
| harness | content, lab, shell, ci, governance | runs validation; CI invokes same scripts |
| ci | harness, governance | wraps harness for remote PR + post-merge checks |
| governance | content, shell, harness, ci | codifies protocol around all other domains |

## Dependency Graph
Implement order (bottom-up, leaf first):

```
content ─┬─> lab ───┐
         ├─> seo ───┤
         ├─> shell ─┼─> pwa
         └─> harness ─> ci
analytics ─┬─> shell, lab, pwa
governance (meta) ─ cross-cuts all
```

- **No dependencies:** `content`, `analytics`, `governance` (leaf / meta)
- **Depends on content:** `lab`, `seo`, `shell`, `harness`
- **Depends on shell:** `pwa`
- **Depends on harness:** `ci`

## Gaps Flagged
- `cavekit-content.md` R1 — repo status enum omits `replica` from canonical docs (`AGENT_HANDOFF.md:82`)
- `cavekit-harness.md` R2 — schema duplicated between `lib/schema.ts` and `scripts/validate-artifacts.mjs`

## Status
DRAFT — first retroactive brownfield sweep of Phase 3 shipped state. Frozen truth date: 2026-04-14.
