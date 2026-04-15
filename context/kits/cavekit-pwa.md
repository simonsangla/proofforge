---
created: "2026-04-15"
last_edited: "2026-04-15"
---

# Cavekit: PWA

## Scope
Service worker, web manifest, app icons, installability, offline shell behavior.

## Requirements

### R1: Web manifest
**Description:** A valid web manifest at `/manifest.webmanifest` describes the installable app.
**Acceptance Criteria:**
- [ ] `name: "ProofForge"`, `short_name: "ProofForge"`
- [ ] `display: "standalone"`, `start_url: "/"`, `scope: "/"`
- [ ] `theme_color` and `background_color` match the paper token (`#f4efe8`)
- [ ] Icons: 192×192 PNG and 512×512 PNG at `/icon-192x192.png` and `/icon-512x512.png`
**Dependencies:** none

### R2: Service worker
**Description:** A Serwist-powered service worker precaches the app shell and enables offline navigation.
**Acceptance Criteria:**
- [ ] Worker registered from `app/sw.ts`, compiled to `public/sw.js`
- [ ] Uses `skipWaiting: true` and `clientsClaim: true`
- [ ] `navigationPreload: true`
- [ ] Precache manifest injected via `self.__SW_MANIFEST`
- [ ] Serves cached shell when network unavailable
**Dependencies:** none

### R3: Install CTA
**Description:** An "Install App" button in the site nav emits a telemetry event when clicked.
**Acceptance Criteria:**
- [ ] Button visible in header nav on every page
- [ ] Click emits `pwa_install_prompt_click` analytics event
**Dependencies:** `cavekit-shell.md` R2, `cavekit-analytics.md` R1

### R4: Apple touch icon
**Description:** An Apple touch icon is linked from the root layout metadata.
**Acceptance Criteria:**
- [ ] `/apple-touch-icon.png` exists in `public/`
- [ ] Linked via `metadata.icons.apple` in `app/layout.tsx`
**Dependencies:** `cavekit-shell.md` R1

## Out of Scope
- Push notifications
- Background sync
- Native install prompt intercepting (`beforeinstallprompt` handling)
- Offline-first data sync (content is read-only)

## Cross-References
- `cavekit-shell.md` — install CTA lives in site shell
- `cavekit-analytics.md` — install-click event
- `cavekit-harness.md` — build pipeline must emit `public/sw.js`

## Source Traceability
- `public/manifest.webmanifest` — R1
- `app/sw.ts`, `public/sw.js` — R2
- `components/site-shell.tsx` — R3
- `public/apple-touch-icon.png`, `app/layout.tsx` — R4

## Changelog
- 2026-04-15: Initial draft from brownfield Phase 3 state
