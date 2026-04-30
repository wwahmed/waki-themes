# CHANGELOG-LIVE.md

Running log of in-flight changes since the last cut release. Tip
moves up; entries are append-only with newest at the top.

## v0.4.x (in flight, post-2026-04-30)

### Studio UX

- [`b5a4980`](https://github.com/wwahmed/waki-themes/commit/b5a4980) Studio gains:
  - **Clone-from-variant** in the variant gallery. Source variant's palette seeds a new custom theme inside the same family.
  - **Import-from-JSON** dialog (header button). Accepts the canonical `Download JSON` shape OR a partial `OverrideTokens` object. Missing keys fall back to defaults with a hint listing the filled keys.
  - **Contrast suggestions**: per-pair fix hints surface in the WCAG panel when a ratio fails AA. Different copy for accent-on-panel vs text-on-bg vs text-on-panel mismatches.
  - **AccessGate** (defense-in-depth): compiled-in passphrase via `VITE_STUDIO_PASSPHRASE`. SessionStorage unlock. Cloudflare Access at the hostname stays the primary gate; this is the in-app backup.

### Deployment plumbing

- [`b5a4980`](https://github.com/wwahmed/waki-themes/commit/b5a4980) `scripts/build-cdn.mjs` now mirrors `dist/themes.json` to `~/workspaces/wakilabs-cdn/waki-themes/{themes.json,dist/themes.json}` per the foundation-hosting-migration plan. The wakilabs-cdn Pages project picks up the bundle on its next deploy.
- [`b5a4980`](https://github.com/wwahmed/waki-themes/commit/b5a4980) `app/wrangler.toml`: Cloudflare Pages config for the Studio project.
- [`b5a4980`](https://github.com/wwahmed/waki-themes/commit/b5a4980) `scripts/deploy-studio.sh`: one-shot wrangler deploy for the Studio Pages project. Runs once `CLOUDFLARE_API_TOKEN` is set.

### Consumer migration

- [`printer-dashboard@3066cb5`](https://github.com/wwahmed/printer-dashboard/commit/3066cb5): `themeLoader.ts` defaults to `glass-plus`. Stored localStorage values that name a dropped v0.4.0 id auto-migrate to `glass-plus` on read, with the storage rewritten in place. Local CSS files for the dropped ids stay (no breakage); the full catalog refresh ships separately.
- [`brain-v2@f30d29f`](https://github.com/wwahmed/brain-v2/commit/f30d29f): same migration mirrored.

## v0.4.0 (2026-04-30)

Cut release. Curated 5x4 catalog (20 themes), token schema + build-time validation, urgent Frosted Glass button-style fix. Full notes in [CHANGELOG.md](CHANGELOG.md).

[`98e5319`](https://github.com/wwahmed/waki-themes/commit/98e5319) on waki-themes,
[`25f0676`](https://github.com/wwahmed/printer-dashboard/commit/25f0676) on printer-dashboard,
[`7585612`](https://github.com/wwahmed/brain-v2/commit/7585612) on brain-v2.

## Pending (overnight queue)

- Cloudflare Pages projects + DNS (blocked on `CLOUDFLARE_API_TOKEN`; see `MORNING_BRIEF.md`)
- Recommended-token coverage (`.btn-success`, `.status-*`, `.input`) across the 20 themes; validator currently warns, doesn't block.
- Full consumer catalog refresh: drop the local CSS files for dropped ids in printer-dashboard + brain-v2; sync the new aurora/clean/editorial/neon CSS files in.
- Studio in-app Google OAuth flow (Cloudflare Access at the hostname is the primary gate; in-app flow is fine-grained UX).
