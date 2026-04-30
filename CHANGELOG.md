# Changelog

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
