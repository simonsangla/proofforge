---
created: "2026-04-15"
last_edited: "2026-04-15"
---

# Cavekit: Shell

## Scope
Root layout, global styles, site shell chrome (header/nav/main), homepage, `/about`, `/notes` routes. The shared container around all content.

## Requirements

### R1: Root layout
**Description:** Single root layout sets language, global styles, and conditionally mounts analytics.
**Acceptance Criteria:**
- [ ] `<html lang="en">` with `suppressHydrationWarning`
- [ ] Global styles imported from `app/globals.css`
- [ ] Apple touch icon linked at `/apple-touch-icon.png`
- [ ] Analytics mounted only when `process.env.VERCEL === "1"` (see `cavekit-analytics.md`)
- [ ] `metadataBase` resolves from `NEXT_PUBLIC_SITE_URL` env var, falls back to `http://localhost:3000`
**Dependencies:** `cavekit-analytics.md` R2

### R2: Site shell component
**Description:** Shared chrome wrapping every page: header with brand, nav (Lab, Notes, About, Install App button), main content container.
**Acceptance Criteria:**
- [ ] Header brand links to `/`
- [ ] Nav links: `/lab`, `/notes`, `/about`
- [ ] "Install App" button uses `TrackedButton` (emits `pwa_install_prompt_click`)
- [ ] Main content max-width 5xl, horizontal padding 4, vertical padding 8
- [ ] Uses design tokens: `bg-paper`, `text-ink`, `border-line`
**Dependencies:** `cavekit-analytics.md` R1

### R3: Homepage
**Description:** `/` presents the public proof surface: hero, velocity tile, featured live-demo card, selling pack (limited-protection artifacts), full artifact grid, footer links, commercial-relevance + contact blocks.
**Acceptance Criteria:**
- [ ] Featured card = first artifact with `status === "live_demo"` (fallback: first artifact)
- [ ] Selling pack = all artifacts with `protection_level === "limited"`
- [ ] Full artifact grid renders every artifact
- [ ] Footer links to `/lab`, `/notes`, `/about` via `TrackedLink`
- [ ] "Contact Architect" CTA links to `/about` and emits `homepage_contact_click`
**Dependencies:** `cavekit-content.md` R2, `cavekit-lab.md` R2, `cavekit-analytics.md` R1

### R4: About and Notes routes
**Description:** Static routes exist at `/about` and `/notes`.
**Acceptance Criteria:**
- [ ] `/about` renders without error
- [ ] `/notes` lists all notes with title and excerpt (see `cavekit-content.md` R4)
- [ ] Both routes wrapped by `SiteShell`
**Dependencies:** `cavekit-content.md` R4

### R5: Visual discipline
**Description:** UI remains minimal, restrained, mobile-first, non-blue. Typography and hierarchy carry the weight.
**Acceptance Criteria:**
- [ ] No blue primary colors (per `AGENTS.md` Rule 7)
- [ ] All routes render correctly across viewports 390px, 768px, 1280px, 1440px
- [ ] No dashboard bloat or visual noise
- [ ] Design tokens centralized (no hardcoded hex sprinkled through components)
**Dependencies:** none

## Out of Scope
- Authentication UI
- User profile / account pages
- Theme switcher
- i18n / multi-language nav

## Cross-References
- `cavekit-content.md` — homepage consumes artifacts
- `cavekit-lab.md` — artifact card reused on homepage
- `cavekit-analytics.md` — `TrackedLink`/`TrackedButton`
- `cavekit-pwa.md` — manifest linked from layout
- `cavekit-seo.md` — root metadata

## Source Traceability
- `app/layout.tsx` — R1
- `components/site-shell.tsx` — R2
- `app/page.tsx` — R3
- `app/about/`, `app/notes/` — R4
- `app/globals.css`, `tailwind.config.ts` — R5

## Changelog
- 2026-04-15: Initial draft from brownfield Phase 3 state
