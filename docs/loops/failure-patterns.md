# Failure Patterns

Case: `.next` build collision
Symptom: build or dev validation stalls, stale routes show up, or cleanup keeps logging `cleanup: removed .next`.
Root cause: build and dev/start were touching the same `.next` tree at the same time.
Fix: gate build with `.next-build-lock`, remove `.next` before build, and keep validation serial.
Prevention rule: never run overlapping build and dev validation in the same workspace without a lock.

Case: `npm_config_*` env pollution
Symptom: child validation commands inherit unexpected npm behavior or stray config state.
Root cause: raw `process.env` leaked npm-specific variables into spawned commands.
Fix: use `sanitizedEnv()` and strip every `npm_config_*` key before spawn/exec.
Prevention rule: every spawned validation command must go through the sanitized env helper.

Case: act container browser missing
Symptom: local GitHub Actions emulation cannot complete browser-open or browser-dependent validation.
Root cause: the act container does not provide a reliable desktop browser surface.
Fix: move browser checks to host-based validation instead of relying on act for that step.
Prevention rule: browser validation must run on a proven host/browser path, never on an unverified act container.

Case: act / Docker / Colima socket failure
Symptom: `act` cannot start jobs or reach the container runtime socket.
Root cause: local Docker host and socket path did not match the Colima-backed environment.
Fix: point act at the verified socket path when it is known, or skip act and use host-sequence validation.
Prevention rule: do not default to act unless the Docker socket path is proven in the current machine state.

Case: batch-target drift
Symptom: validation opens the wrong artifact page or repeats the fallback `local-first-ai-executor-loop` target.
Root cause: scripts relied on a single fallback slug and did not dedupe route targets.
Fix: accept `BATCH_TARGET_SLUGS`, derive all batch URLs from that list, and dedupe routes before validation.
Prevention rule: every batch run must set explicit target slugs and verify the exact pages it intends to check.

Case: mobile responsive validation error
Symptom: viewport runs can pass while the layout still overflows or console errors are hidden.
Root cause: validation did not always pass viewport dimensions into Playwright.
Fix: pass `VIEWPORT_WIDTH` and `VIEWPORT_HEIGHT`, run all viewport sizes, and fail on console errors or overflow.
Prevention rule: responsive validation must exercise multiple viewports with explicit width and height inputs.

Case: production smoke capture mismatch
Symptom: smoke checks fail on a missing capture URL even though the artifact exists.
Root cause: the smoke list pointed at the wrong file extension for the published capture.
Fix: smoke the actual published asset path, such as the `.svg` capture URL.
Prevention rule: every smoke URL must match the exact published artifact path before the run starts.
