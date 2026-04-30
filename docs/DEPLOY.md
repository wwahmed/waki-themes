# Deployment

Two surfaces ship from this repo:

1. **`dist/themes.json`** - the consumer bundle that printer-dashboard, brain-v2, and waki-shell consumers fetch at runtime. Auto-rebuilt by the existing `build-bundle.yml` GH Action on push to main.
2. **Theme Studio** - the React app under `app/` deployed to Cloudflare Pages at https://themes.3dbypixel.com.

The two pipelines do not interfere. The studio's Cloudflare build copies a snapshot of `dist/themes.json` into its own output for self-contained hosting; the canonical bundle stays committed at `dist/themes.json` so the existing consumers keep working.

## Cloudflare Pages setup (one-time)

Done once in the Cloudflare dashboard. The repo includes `.cloudflare-pages.toml` as a written record of the expected settings.

1. Cloudflare dashboard -> **Workers & Pages** -> **Create** -> **Pages** -> **Connect to Git**.
2. Pick `wwahmed/waki-themes`.
3. Production branch: `main`.
4. Build settings:
   - Framework preset: **None**
   - Build command: `cd app && npm install && npm run build`
   - Build output directory: `app/dist`
   - Root directory: `/`
5. Environment variables: none required.
6. After the first deploy succeeds, **Custom domains** -> add `themes.3dbypixel.com`. Cloudflare auto-creates the CNAME inside the same zone.

## Build behaviour

`app/scripts/sync-bundle.mjs` runs before `vite build`. It copies the repo-root `dist/themes.json` into `app/public/themes.json` and `app/public/dist/themes.json` so both URLs resolve on the deployed site:

- https://themes.3dbypixel.com/ - studio SPA
- https://themes.3dbypixel.com/themes.json - consumer bundle
- https://themes.3dbypixel.com/dist/themes.json - consumer bundle, `/dist/` path preserved
- https://themes.3dbypixel.com/build-info.json - studio metadata

`app/public/_headers` sets cache + CORS for the bundle. `app/public/_redirects` enables SPA fallback for unknown routes.

## Local development

```bash
cd app
npm install
npm run dev   # http://localhost:5173/
```

The dev script auto-runs `sync-bundle` first, so the studio finds `themes.json` at the same-origin URL it would in production.

## Migration window

During the migration window, both URLs serve the same bundle:

| Surface | URL | Status |
|---------|-----|--------|
| GitHub raw | `https://raw.githubusercontent.com/wwahmed/waki-themes/main/dist/themes.json` | active, current consumers |
| Cloudflare Pages | `https://themes.3dbypixel.com/dist/themes.json` | new, alongside |

Future plan: flip consumers to the Cloudflare URL, then deprecate the GH-raw path. Tracked in `~/workspaces/waki-homelab/projects/foundation-hosting-migration.md`.
