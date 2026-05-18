# Changelog

## v1.0.0 (2026-05-17)

### Breaking catalog overhaul

Replaces the legacy v1/v2 split with one coherent material-family catalog:

| Family | Variants |
|---|---|
| Waki Glass | Prism, Opal, Civic, Obsidian |
| Waki Frost | Arctic, Rose, Mint, Violet |
| Waki Academic | Ivory, Oxford, Slate, Sepia |
| Waki Desktop | Graphite, Cobalt, Nova, Olive |
| Waki Mobile | Orchid, Mint, Sunrise, Ocean |
| Waki Command | Cyan, Lime, Magenta, Amber |

All published theme ids now use `waki-{family}-{hue}`. Old ids (`glass-v2`, `frosted-glass`, `editorial-academic`, `v2-*`, etc.) are removed from the bundle, so downstream apps should migrate deliberately.

### Material families

Variants inside a family now share the same shape, density, blur, typography, shadow, hover behavior, and shell treatment. Hue variants are clearly named as colorways, e.g. `Waki Glass - Prism` and `Waki Glass - Opal`.

### Studio overhaul

- Reworks the landing page around material families instead of nested previews.
- Keeps glass and academic styles as first-class families.
- Shows clearer family cards, hue swatches, and full shell previews.
- Dark modes are distinct colorways per variant, not a shared charcoal repaint.

## v0.5.0 (2026-05-17)

### Additive V2 theme set

Adds 10 opt-in `v2-*` themes under the new **V2 Polished** family. Existing theme IDs and CSS files are left in place for compatibility.

- `v2-frost-prism`
- `v2-frost-opal`
- `v2-glass-civic`
- `v2-glass-obsidian`
- `v2-desktop-graphite`
- `v2-desktop-nova`
- `v2-mobile-orchid`
- `v2-mobile-mint`
- `v2-web-signal`
- `v2-web-ember`

The V2 set treats dark mode as a separate colorway for each theme. Dark palettes differ materially by hue, panel tint, border language, accent pair, and background mass rather than sharing one charcoal baseline.

### Theme Studio preview upgrade

- Replaces the simple dashboard preview with a shell-style sample app covering sidebars, nested panels, toolbar chrome, cards, forms, statuses, mobile surfaces, and action buttons.
- Adds a compact **Look** switcher with current-theme miniature, theme picker, and light/dark control.
- Adds optional shell/demo primitives in `base.css` so the richer preview remains readable under older themes while V2 themes provide the polished overrides.

## v0.4.1 (2026-05-16)

### Dark-mode palette differentiation

Dark variants now carry stronger family and variant identity instead of collapsing into the same charcoal/slate baseline.

- Clean dark modes now separate into neutral black (`clean-light`), midnight indigo (`clean-dim`), sepia umber (`clean-warm`), and cyan-blue (`clean-cool`).
- Editorial dark modes now separate into academic blue-paper, crimson noir, warm print, and technical blueprint palettes.
- Neon dark modes now tint the page, panels, borders, secondary controls, and inputs by variant, not just the accent color.

Theme IDs and schema shape are unchanged. `pkgVersion` bumps so cache-aware consumers can invalidate older CSS while continuing to read the same `themes` and `families` fields.

## v0.4.0 (2026-04-30)

### Theme catalog rewritten: 5 families x 4 variants = 20 themes

Replaces the prior flat list of 21 only-superficially-different themes with a curated catalog organised under five structural families. See [CURATION.md](CURATION.md) for the full audit + reasoning.

| Family | Variants |
|---|---|
| **Glass** | Default (`glass-v2`), Plus (`glass-plus`), Lite (`glass-v1`), Frosted (`frosted-glass`) |
| **Aurora** | Twilight (`aurora-twilight`), Sunrise (`aurora-sunrise`), Ocean (`aurora-ocean`), Forest (`aurora-forest`) |
| **Clean** | Light (`clean-light`), Dim (`clean-dim`), Warm (`clean-warm`), Cool (`clean-cool`) |
| **Editorial** | Academic (`editorial-academic`), Noir (`editorial-noir`), Warm (`editorial-warm`), Technical (`editorial-technical`) |
| **Neon** | Cyan (`neon-cyan`), Pink (`neon-pink`), Lime (`neon-lime`), Plasma (`neon-plasma`) |

### Breaking: 16 themes dropped + 1 renamed

Dropped (CSS files removed from `styles/`, META entries removed): `flat`, `slate-modern`, `nord`, `arctic`, `neumorphism`, `lavender`, `emerald`, `rose-gold`, `copper`, `neon`, `midnight`, `ocean`, `sunset`, `forest`, `sakura`, `glass-extreme`.

Renamed: `glass-v3` -> `aurora-twilight` (it was structurally Aurora; now correctly named).

### Consumer migration

Every consumer that pinned to a dropped flat id should remap to `glass-plus` (the universal default) or to a Glass / Aurora variant of their choosing. Mapping recommendations:

| Dropped | Suggested replacement |
|---|---|
| `flat`, `slate-modern`, `nord`, `arctic` | `clean-light` (or `glass-plus` for richer feel) |
| `neumorphism`, `lavender`, `emerald`, `rose-gold`, `copper` | `glass-plus` |
| `neon`, `midnight` | `neon-cyan` / `neon-pink` |
| `ocean`, `sunset` | `aurora-ocean` / `aurora-sunrise` |
| `forest`, `sakura` | `aurora-forest` |
| `glass-extreme` | `frosted-glass` |
| `glass-v3` | `aurora-twilight` |

The `themes` flat map in `dist/themes.json` no longer contains entries for the dropped ids; consumer apps that reference them will fail to look up the CSS until they remap.

### Production fix: Frosted Glass buttons no longer invisible

The Frosted Glass theme rendered Pause and Stop buttons with no visible chrome on `manager.3dbypixel.com/dashboard`. Root cause: the existing theme contract only covered `.glass / .glass-elevated / .glass-bar / .chip / .divider-soft`, so themes had no say in how `.btn-*` classes rendered. waki-shell's `utilities.css` provided hard-coded Tailwind colour classes (`bg-sky-600`, `bg-slate-200`, `bg-amber-600`) that clashed with Frosted Glass's teal-tinted background.

### New: schema + build-time validation

The theme contract is now codified in [`src/schema.mjs`](src/schema.mjs) and enforced by [`scripts/validate-themes.mjs`](scripts/validate-themes.mjs), which runs as the first step of `npm run build`. A theme that misses any required selector fails the build with a clear error before `dist/themes.json` is regenerated.

Required selectors expanded with action button contract:
- `.btn-primary`, `.btn-secondary`, `.btn-warning`, `.btn-danger`, `.btn-ghost`

Recommended (warned, not blocked):
- `.btn-success`, `.status-success`, `.status-warning`, `.status-error`, `.status-info`, `.input`

See [SCHEMA.md](SCHEMA.md) for the full contract.

### Bundle schema

`themes` flat map and `families` grouped map both updated. Each `themes` entry retains `family`, `familyName`, `variantSlot`, `variantName` cross-references introduced in v0.3.0. Schema version stays at 1; `pkgVersion` bumps to 0.4.0 so cache-aware consumers refetch.

### Generator

The 15 new theme variants are generated from per-family templates in [`scripts/gen-themes.mjs`](scripts/gen-themes.mjs). To tune a generated variant, edit its palette spec and re-run the generator. To add a new variant, append to the appropriate `*_VARIANTS` array.

### Sync to consumers

The four retained Glass theme CSS files (`glass-plus`, `glass-v1`, `glass-v2`, `frosted-glass`) were copied into both `printer-dashboard/frontend/src/themes/` and `brain-v2/frontend/src/themes/` so the urgent button-style patch reaches production without consumers waiting on the broader migration to fetch from the foundation CDN.

## v0.3.0 (2026-04-29)

- Family / variant taxonomy added to bundle: each theme entry gains `family`, `familyName`, `variantSlot`, `variantName` cross-references; new `families` map groups themes structurally.
- Theme Studio gains two-step picker (Family then Variant) and family-level / variant-level editor tabs.
- See git log for the v0.3.0 commit.

## v0.2.0 (2026-04-29)

- Theme Studio web app launched at `app/`.
- `dist/themes.json` cross-app consumption contract published.
- Glass-Plus added as the new default; renamed from prior glass-v2-plus pattern.

## v0.1.0 (2026-04-28)

- Initial twenty-theme catalog extracted from the printer-dashboard.
