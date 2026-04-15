---
created: "2026-04-15"
last_edited: "2026-04-15"
---

# Cavekit: Analytics

## Scope
Vercel Analytics integration, environment-gated mount, tracked-link and tracked-button primitives, conversion-event catalog.

## Requirements

### R1: Tracked primitives
**Description:** Two client components wrap `Link` and `<button>` to emit a named event on click and pass through standard props.
**Acceptance Criteria:**
- [ ] `TrackedLink` accepts all `next/link` props plus `eventName`
- [ ] `TrackedButton` accepts all `<button>` props plus `eventName`
- [ ] Click fires `trackEvent(eventName, { href })` for links, `trackEvent(eventName)` for buttons
- [ ] Original `onClick` (if any) still fires on buttons
- [ ] Events also logged to `console.log` with `[ANALYTICS]` prefix and ISO timestamp
- [ ] If `@vercel/analytics` `track` throws or is unmounted, it is swallowed (non-fatal)
**Dependencies:** none

### R2: Environment-gated mount
**Description:** The Vercel `<Analytics />` component mounts only in Vercel deployments, not in local dev.
**Acceptance Criteria:**
- [ ] Mount condition: `process.env.VERCEL === "1"`
- [ ] Local dev does not render `<Analytics />` but tracked primitives still log to console
**Dependencies:** `cavekit-shell.md` R1

### R3: Event catalog
**Description:** The set of conversion events emitted by UI components is documented and stable.
**Acceptance Criteria:**
- [ ] `open_proof_click` — artifact card CTA (any artifact)
- [ ] `request_proof_access` — gated proof CTA on protected/private artifact detail page
- [ ] `homepage_lab_shortcut` — homepage "Browse Lab" link
- [ ] `homepage_contact_click` — homepage "Contact Architect" CTA
- [ ] `footer_link_lab`, `footer_link_notes`, `footer_link_about` — homepage footer links
- [ ] `pwa_install_prompt_click` — site-shell Install App button
- [ ] Event names are kebab-or-snake-case strings (consistency with the above)
**Dependencies:** none

## Out of Scope
- Custom analytics backend
- Server-side event tracking
- A/B testing framework
- Heatmaps / session recording

## Cross-References
- `cavekit-shell.md` — `TrackedLink`/`TrackedButton` used in nav + homepage
- `cavekit-lab.md` — artifact card + detail CTA emit events
- `cavekit-pwa.md` — install CTA emits `pwa_install_prompt_click`

## Source Traceability
- `components/analytics.tsx` — R1
- `app/layout.tsx` — R2
- `components/site-shell.tsx`, `components/artifact-card.tsx`, `app/page.tsx`, `app/lab/[slug]/page.tsx` — R3

## Changelog
- 2026-04-15: Initial draft from brownfield Phase 3 state
