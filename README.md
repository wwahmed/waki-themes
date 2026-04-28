# waki-themes

Three swappable web themes — **flat**, **glass-v1**, **glass-v2** — bundled with a single-page email-inbox demo (WakiMail) so you can compare them side by side and drop the one you like into any project.

Extracted from the 3dByPixel printer-shop dashboard's themes (commit history at the printer-dashboard repo, tagged `flat-v1` / `glass-v1` / `glass-v2`).

## Quick start

The demo is a static HTML page — no build step:

```bash
# any static server works; here's the simplest one:
cd waki-themes
python3 -m http.server 5500
# then open http://localhost:5500
```

Or just double-click `index.html` to open it directly in a browser.

The floating pill in the top-right of the demo flips between the three themes (and between light / dark mode). Both choices are persisted in `localStorage` so a refresh keeps the look.

## The three themes

### `styles/flat.css` — Flat
Solid colours, visible borders, real drop shadows. No `backdrop-filter`, no glints, no animation. Reads as a clean, functional dashboard / inbox / admin UI. Use this when:
- the design needs to feel anchored and unambiguous
- target browsers may not support `backdrop-filter`
- glass would be too fancy for the brand

### `styles/glass-v1.css` — Glass v1
Frosted glass surfaces over a soft gradient page. Translucent backgrounds with `backdrop-filter` blur so layered cards compose visible depth. **No texture, no glints, no motion** — just clean frosted panels.

Light mode: cool-grey gradient (`#e8eef5` → `#eef2f8`) under translucent white cards.
Dark mode: deep navy gradient (`#0c1220` → `#0f1a2e`) under translucent white-on-dark cards.

### `styles/glass-v2.css` — Glass v2
Everything from v1, plus four polish layers:
1. **SVG fractal-noise grain** overlay on the page bg so the blur has real texture to refract
2. **`::after` light glint** on each glass card — top-left highlight that traces the card outline like a light source catching real glass
3. **Hover treatment** — cards become slightly more opaque + deeper shadow on hover, with a 200 ms transition so the swap feels like glass brightening
4. **Slow `gradientShift` animation** on `body` — 30 s oscillation of `background-position` so the gradient drifts under the glass surfaces. Disabled under `prefers-reduced-motion`.

## Use in your own project

All three themes share the same class contract — drop the theme stylesheet in and apply these classes to your own markup:

| Class            | Where to use it                                                |
|------------------|----------------------------------------------------------------|
| `.glass`         | Cards, panels, sidebars, list items                            |
| `.glass-elevated`| Detail panes / modals / surfaces that should sit above `.glass`|
| `.glass-bar`     | Fixed top headers / bottom nav / breadcrumbs                   |
| `.chip`          | Inline pills, tag chips, small action buttons                  |
| `.divider-soft`  | Hairline dividers (use as `border-color`)                      |

Plus the `dark` / `light` class on `<html>` toggles colour schemes — see `demo.js` and the inline `<script>` in `index.html` for the bootstrap pattern that picks the right class before first paint.

```html
<link rel="stylesheet" href="path/to/glass-v2.css" />
…
<header class="glass-bar fixed top-0 left-0 right-0 …">…</header>
<aside class="glass …">…</aside>
<article class="glass-elevated p-6">…</article>
```

The CSS files have **no dependencies**. No Tailwind, no preprocessor, no build. Tailwind is used only by the demo HTML for layout utilities — it's pulled from a CDN.

## File map

```
waki-themes/
├── index.html          single-page WakiMail demo
├── demo.js             theme switcher + email-row interaction
├── package.json        npm metadata + `start` script
├── styles/
│   ├── base.css        typography reset, switcher chrome (shared)
│   ├── flat.css        flat theme (solid colours)
│   ├── glass-v1.css    glass v1 (frosted, no texture)
│   └── glass-v2.css    glass v2 (full polish: noise, glint, hover, drift)
└── README.md           this file
```

## Browser support

- `flat.css` — works everywhere
- `glass-v1.css` / `glass-v2.css` — needs `backdrop-filter`; falls back gracefully on older browsers (you'll see the translucent rgba backgrounds without the blur, which still looks acceptable)
- The fractal-noise SVG in `glass-v2.css` is inlined as a data URI — no separate asset to host
- Motion in `glass-v2.css` honours `prefers-reduced-motion: reduce` and disables the gradient drift

## License

MIT. Use it however you like.

## Credits

The three themes were lifted out of the [3dByPixel](https://3dbypixel.com) printer-shop dashboard project. WakiMail demo content is fictional.
