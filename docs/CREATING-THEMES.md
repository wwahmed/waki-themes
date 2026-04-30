# Creating themes

Two ways to make a new theme: hand-written CSS in `styles/` (what every existing theme is), or Theme Studio at https://themes.3dbypixel.com.

## Option A: Theme Studio (no code)

1. Open https://themes.3dbypixel.com.
2. Click **New theme** in the gallery (top-right).
3. Tweak the sliders + colour pickers.
   - Page background gradient (light + dark)
   - Panel surface fill (rgba supported, so you get translucency)
   - Border colour
   - Text colour
   - Accent colour
   - Border radius and backdrop blur
4. Watch the live preview. Switch the preview between Light and Dark to verify both.
5. Watch the WCAG AA contrast panel. Anything below 4.5:1 (normal text) or 3:1 (large text) gets flagged. The studio never blocks save; it just nudges.
6. Click **Save in session** to keep it in the gallery for the rest of the browser session.
7. Click **CSS** to download a self-contained `<id>.css` file, OR **JSON** to download token-only metadata, OR **Copy** to copy the CSS to clipboard.
8. To make the theme an official built-in:
   - Drop the downloaded `<id>.css` into `styles/<id>.css`.
   - Add an entry for it to the `META` map in [scripts/build-bundle.mjs](../scripts/build-bundle.mjs).
   - Open a PR. The GH Action rebuilds `dist/themes.json` automatically on merge.

## Option B: Hand-written CSS

Each theme in `styles/` implements the same class contract. Copy an existing one (`glass-plus.css` is a good reference) and override the look:

| Class            | Where it shows up                         |
|------------------|-------------------------------------------|
| `.glass`         | Cards, panels, sidebars, list items       |
| `.glass-elevated`| Detail panes, modals, raised surfaces     |
| `.glass-bar`     | Sticky headers, bottom nav, breadcrumbs   |
| `.chip`          | Inline pills, tag chips                   |
| `.divider-soft`  | Hairline dividers                         |

Plus `body` for the page background, and `html.dark <selector>` for dark-mode variants. Every theme ships both modes.

### Steps

1. Create `styles/<id>.css`. Use kebab-case for the id.
2. Add an entry to the `META` map in `scripts/build-bundle.mjs`:
   ```js
   "<id>": { name: "Display Name", description: "One line", vibe: "<glass|matte|neon|nature|metal|soft>" },
   ```
3. Run `npm run build` from the repo root. Confirm `dist/themes.json` includes your theme.
4. (Optional) Preview side-by-side via the existing demo: `npm start` and open http://localhost:5500.
5. Commit and push to main. The GH Action rebuilds the bundle.
6. The Theme Studio picks the new theme up automatically (it reads from `dist/themes.json`).

## Style notes

- Keep colour mass in dark mode. Don't let every dark variant collapse to near-black or the gallery loses its variety. Pull a hint of the theme's chroma into the dark gradient stops.
- Honour `prefers-reduced-motion`. Glass-plus, glass-v2, glass-v3 all wrap their `gradientShift` keyframe in a `@media (prefers-reduced-motion: reduce)` guard.
- Inline assets. Fractal-noise grain, glints, sheens: all data-URI'd into the CSS. No external image hosting.
- No JavaScript. Themes are CSS only. Demo / studio JS is separate.
