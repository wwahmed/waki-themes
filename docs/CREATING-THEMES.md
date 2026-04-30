# Creating themes

Two ways to make a new theme: hand-written CSS in `styles/` (what every existing theme is), or Theme Studio at https://themes.3dbypixel.com.

Read [families schema](#families-schema) first if you're adding a new theme since v0.3.0; the registry lives at [`src/themes/families.mjs`](../src/themes/families.mjs).

## Option A: Theme Studio (no code)

1. Open https://themes.3dbypixel.com.
2. The home screen is the **Family gallery**: pick which structural family the theme belongs to (Glass, Flat, Soft, Bold, Organic), or click **New theme** for a blank start.
3. Inside a family, you see its **Variant gallery** (the colour variants) plus an **Edit family structure** button.
4. **Variant edits**: click a variant tile, hit Edit. Tweak colours / radius / blur / accent. Live preview updates per drag.
5. **Family edits**: click "Edit family structure" inside a family. The Family tab lets you set radius + blur for the whole family at once. Click "Apply to all variants" to propagate.
6. WCAG AA contrast panel surfaces warnings on insufficient pairs. Never blocks save.
7. Save flow: **Save in session** keeps it in the browser. **CSS** / **JSON** / **Copy** export it for permanent commit.
8. To make a saved theme an official built-in:
   - Drop the downloaded `<id>.css` into `styles/<id>.css`.
   - Add an entry to the META map in [scripts/build-bundle.mjs](../scripts/build-bundle.mjs).
   - Add it to a family in [`src/themes/families.mjs`](../src/themes/families.mjs).
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
3. Slot it into a family in `src/themes/families.mjs` (see [families schema](#families-schema) below).
4. Run `npm run build` from the repo root. Confirm `dist/themes.json` includes your theme in both `themes` (flat map) and `families[<familyId>].variants` (grouped).
5. (Optional) Preview side-by-side via the existing demo: `npm start` and open http://localhost:5500.
6. Commit and push to main. The GH Action rebuilds the bundle.
7. The Theme Studio picks the new theme up automatically (it reads from `dist/themes.json`).

## Families schema

Themes are grouped along two axes since v0.3.0:

- **Family** = structural look-and-feel: corner radius, blur, shadow language, surface treatment, iconography weight, layout density. Shared by every variant in the family.
- **Variant** = colour palette + tint within the family.

A theme's flat ID stays the source of truth for consumers (printer-dashboard, brain-v2, waki-shell pick by `glass-v2`, `flat`, etc.). The grouping is **additive metadata** layered on top.

The registry is [`src/themes/families.mjs`](../src/themes/families.mjs):

```js
export const FAMILIES = {
  glass: {
    name: "Glass",
    description: "Layered translucent panels with backdrop blur ...",
    structure: {
      radius: 14,
      blur: 14,
      shadow: "soft-glow",
      surface: "translucent",
      iconography: "regular",
      density: "comfortable",
    },
    variants: [
      {
        slot: "default",
        themeId: "glass-v2",      // canonical flat id consumers use
        name: "Default",
        description: "Frosted glass + drift, calmer alternative",
        palette: {
          light: { bgFrom, bgTo, panel, border, text, accent },
          dark:  { bgFrom, bgTo, panel, border, text, accent },
        },
      },
      // ...
    ],
  },
};
```

### Adding a new variant to an existing family

1. Author the CSS at `styles/<id>.css` (Option B step 1).
2. Add to META in `scripts/build-bundle.mjs`.
3. Add a new entry to the family's `variants` array in `families.mjs`. Pick a `slot` that's unique inside the family (e.g. `"twilight"`). Set `themeId` to the same kebab id as the CSS file.
4. Fill in `palette.light` and `palette.dark` with hint values matching the CSS. These are advisory (the CSS still paints the truth) but the studio uses them to seed the variant editor's sliders.
5. `npm run build`, verify, commit, push.

### Adding a new family

1. Decide its structure: radius, blur, shadow language, surface treatment.
2. Add a new key to `FAMILIES` in `families.mjs` with at least one variant entry.
3. For each variant, follow the per-variant flow above.
4. Studio's family gallery picks up the new family on next reload.

## Style notes

- Keep colour mass in dark mode. Don't let every dark variant collapse to near-black or the gallery loses its variety. Pull a hint of the theme's chroma into the dark gradient stops.
- Honour `prefers-reduced-motion`. Glass-plus, glass-v2, glass-v3 all wrap their `gradientShift` keyframe in a `@media (prefers-reduced-motion: reduce)` guard.
- Inline assets. Fractal-noise grain, glints, sheens: all data-URI'd into the CSS. No external image hosting.
- No JavaScript. Themes are CSS only. Demo / studio JS is separate.
- A new variant should genuinely belong to its family's structure. If your "new variant" needs a different radius / blur / shadow language than the family, that's a signal it's a new family, not a variant.
