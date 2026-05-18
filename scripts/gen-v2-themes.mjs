#!/usr/bin/env node
/**
 * Generate the Waki theme catalog.
 *
 * The catalog is organized as material families plus hue variants:
 *   Waki Glass - Prism
 *   Waki Glass - Opal
 *
 * Variants inside a family intentionally share geometry, motion, density,
 * blur, and shadow behavior. The variant name is the hue/colorway.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");
const stylesDir = resolve(repoRoot, "styles");
const familiesFile = resolve(repoRoot, "src", "themes", "families.mjs");

const materials = {
  glass: {
    id: "glass",
    name: "Waki Glass",
    description: "Luminous translucent app chrome with crisp layered depth. Best for polished dashboards and creative tools.",
    structure: {
      radius: 20,
      blur: 26,
      shadow: "luminous-glass",
      surface: "translucent",
      iconography: "regular",
      density: "comfortable",
    },
    tokens: {
      radius: 20,
      blur: 26,
      density: "0.58rem 0.88rem",
      hover: "-4px",
      elevatedHover: "-5px",
      navShift: "2px",
      borderWidth: "1px",
      saturation: "210%",
      elevatedSaturation: "235%",
      sidebarBlend: "84%",
      mainBlend: "62%",
      mobileExtra: 6,
      buttonRadius: "calc(var(--waki-radius-sm) + 2px)",
      fontBody: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif",
      fontDisplay: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif",
      shadow: "0 22px 58px var(--waki-shadow), 0 0 36px color-mix(in srgb, var(--waki-accent) 18%, transparent)",
      elevatedShadow: "0 36px 96px var(--waki-shadow), 0 0 50px color-mix(in srgb, var(--waki-accent-2) 20%, transparent), inset 0 1px 0 rgba(255,255,255,.28)",
      panelInset: "inset 0 1px 0 rgba(255,255,255,.24), 0 10px 28px rgba(0,0,0,.08)",
      bodyOverlay: "radial-gradient(circle at 52% 18%, color-mix(in srgb, var(--waki-accent) 12%, transparent), transparent 30%),",
      extraCss: `
.glass::before,
.glass-elevated::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(135deg, rgba(255,255,255,.24), transparent 42%, color-mix(in srgb, var(--waki-accent-2) 12%, transparent));
  pointer-events: none;
}
.glass-bar,
.glass-elevated {
  border-top: 1px solid color-mix(in srgb, white 32%, var(--waki-border));
}
`,
    },
    variants: [
      colorway("prism", "Prism", "Violet, cyan, and pearl glass for premium web apps.", {
        light: palette("#edf7ff", "#f8eefc", "#f7fbff", "#6d5dfc", "#14b8a6", "#102033", "#52657d", "rgba(255,255,255,.62)", "rgba(255,255,255,.78)", "rgba(241,245,255,.76)", "rgba(125,92,255,.22)", "rgba(45,212,191,.24)", "rgba(67,56,202,.18)", "rgba(109,93,252,.24)", "rgba(45,212,191,.18)", "rgba(236,72,153,.14)"),
        dark: palette("#080b20", "#1b0f32", "#071b28", "#8b7cff", "#67e8f9", "#eef7ff", "#a9bad1", "rgba(119,92,255,.16)", "rgba(14,24,58,.72)", "rgba(10,30,49,.72)", "rgba(103,232,249,.28)", "rgba(196,181,253,.25)", "rgba(0,0,0,.45)", "rgba(139,124,255,.28)", "rgba(103,232,249,.2)", "rgba(244,114,182,.18)"),
      }),
      colorway("opal", "Opal", "Teal, sky, and soft green glass for calm personal tools.", {
        light: palette("#e7fff8", "#f5fbff", "#eefcff", "#0f9f9a", "#38bdf8", "#07333a", "#47646a", "rgba(255,255,255,.66)", "rgba(255,255,255,.8)", "rgba(232,255,249,.76)", "rgba(20,184,166,.24)", "rgba(125,211,252,.24)", "rgba(13,148,136,.16)", "rgba(20,184,166,.24)", "rgba(125,211,252,.18)", "rgba(190,242,100,.12)"),
        dark: palette("#03191d", "#082c35", "#05251b", "#5eead4", "#7dd3fc", "#dffcf8", "#9accc7", "rgba(45,212,191,.13)", "rgba(6,43,52,.76)", "rgba(5,54,43,.72)", "rgba(153,246,228,.26)", "rgba(125,211,252,.22)", "rgba(0,0,0,.44)", "rgba(94,234,212,.25)", "rgba(56,189,248,.18)", "rgba(132,204,22,.16)"),
      }),
      colorway("civic", "Civic", "Cobalt and amber glass for operational dashboards.", {
        light: palette("#eef4ff", "#fff8ea", "#f8fbff", "#2563eb", "#d97706", "#12213d", "#56667c", "rgba(255,255,255,.68)", "rgba(255,255,255,.84)", "rgba(238,244,255,.76)", "rgba(37,99,235,.22)", "rgba(251,191,36,.28)", "rgba(30,64,175,.16)", "rgba(37,99,235,.2)", "rgba(251,191,36,.18)", "rgba(14,165,233,.12)"),
        dark: palette("#061329", "#24180a", "#071b2b", "#60a5fa", "#fbbf24", "#edf4ff", "#b6c4d9", "rgba(37,99,235,.14)", "rgba(10,27,57,.78)", "rgba(33,25,13,.74)", "rgba(251,191,36,.26)", "rgba(96,165,250,.24)", "rgba(0,0,0,.45)", "rgba(96,165,250,.26)", "rgba(251,191,36,.22)", "rgba(14,165,233,.18)"),
      }),
      colorway("obsidian", "Obsidian", "Black glass with coral glow for media and creative tools.", {
        light: palette("#fff1ed", "#f8fafc", "#fff7ed", "#e11d48", "#f97316", "#221316", "#73575c", "rgba(255,255,255,.7)", "rgba(255,255,255,.84)", "rgba(255,241,237,.78)", "rgba(244,63,94,.24)", "rgba(249,115,22,.24)", "rgba(136,19,55,.16)", "rgba(244,63,94,.2)", "rgba(249,115,22,.16)", "rgba(15,23,42,.08)"),
        dark: palette("#050307", "#24100c", "#160516", "#fb7185", "#fb923c", "#fff3f2", "#d4aaa8", "rgba(255,255,255,.08)", "rgba(28,15,20,.8)", "rgba(39,18,13,.76)", "rgba(251,113,133,.3)", "rgba(253,186,116,.23)", "rgba(0,0,0,.52)", "rgba(251,113,133,.25)", "rgba(249,115,22,.2)", "rgba(217,70,239,.14)"),
      }),
    ],
  },

  frost: {
    id: "frost",
    name: "Waki Frost",
    description: "Soft high-blur frosted panes with misty depth and gentle hover shimmer.",
    structure: {
      radius: 26,
      blur: 34,
      shadow: "mist-depth",
      surface: "frosted",
      iconography: "regular",
      density: "comfortable",
    },
    tokens: {
      radius: 26,
      blur: 34,
      density: "0.64rem 0.95rem",
      hover: "-3px",
      elevatedHover: "-4px",
      navShift: "1px",
      borderWidth: "1px",
      saturation: "230%",
      elevatedSaturation: "255%",
      sidebarBlend: "78%",
      mainBlend: "56%",
      mobileExtra: 10,
      buttonRadius: "999px",
      fontBody: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif",
      fontDisplay: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif",
      shadow: "0 18px 54px var(--waki-shadow), inset 0 0 34px color-mix(in srgb, var(--waki-accent) 9%, transparent)",
      elevatedShadow: "0 30px 86px var(--waki-shadow), inset 0 0 42px color-mix(in srgb, var(--waki-accent-2) 10%, transparent), inset 0 1px 0 rgba(255,255,255,.3)",
      panelInset: "inset 0 1px 22px color-mix(in srgb, var(--waki-accent) 11%, transparent), 0 8px 22px rgba(0,0,0,.07)",
      bodyOverlay: "linear-gradient(115deg, transparent 0 33%, color-mix(in srgb, var(--waki-accent-2) 9%, transparent) 46%, transparent 60%),",
      extraCss: `
.glass,
.glass-elevated,
.glass-bar,
.mobile-card {
  border-color: color-mix(in srgb, var(--waki-border) 72%, white);
}
.glass-elevated {
  outline: 1px solid color-mix(in srgb, white 18%, transparent);
  outline-offset: -5px;
}
`,
    },
    variants: [
      colorway("arctic", "Arctic", "Blue-white frost for focused utility apps.", {
        light: palette("#eef8ff", "#f8fcff", "#e7f5ff", "#0284c7", "#7dd3fc", "#082f49", "#557085", "rgba(255,255,255,.68)", "rgba(255,255,255,.84)", "rgba(232,246,255,.8)", "rgba(14,165,233,.22)", "rgba(125,211,252,.28)", "rgba(2,132,199,.16)", "rgba(14,165,233,.2)", "rgba(125,211,252,.18)", "rgba(186,230,253,.16)"),
        dark: palette("#041623", "#082f49", "#061e32", "#7dd3fc", "#38bdf8", "#e0f7ff", "#a8cbe0", "rgba(14,165,233,.14)", "rgba(8,47,73,.78)", "rgba(6,30,50,.76)", "rgba(125,211,252,.28)", "rgba(56,189,248,.24)", "rgba(0,0,0,.46)", "rgba(56,189,248,.26)", "rgba(125,211,252,.18)", "rgba(14,165,233,.14)"),
      }),
      colorway("rose", "Rose", "Blush frost for warm editorial and lifestyle tools.", {
        light: palette("#fff1f5", "#fff7ed", "#fffafd", "#e11d48", "#fb7185", "#451a2b", "#7f5666", "rgba(255,255,255,.7)", "rgba(255,255,255,.86)", "rgba(255,241,245,.8)", "rgba(244,63,94,.22)", "rgba(251,113,133,.24)", "rgba(190,18,60,.15)", "rgba(244,63,94,.2)", "rgba(251,113,133,.16)", "rgba(253,186,116,.14)"),
        dark: palette("#220712", "#3a1020", "#2d0c16", "#fb7185", "#fda4af", "#fff1f5", "#e7bdc9", "rgba(244,63,94,.14)", "rgba(58,16,32,.78)", "rgba(45,12,22,.74)", "rgba(251,113,133,.28)", "rgba(253,164,175,.22)", "rgba(0,0,0,.48)", "rgba(251,113,133,.24)", "rgba(244,114,182,.18)", "rgba(251,146,60,.12)"),
      }),
      colorway("mint", "Mint", "Fresh mint frost for wellness, finance, and note apps.", {
        light: palette("#effff4", "#edfffb", "#f7fff0", "#16a34a", "#14b8a6", "#0b3224", "#557064", "rgba(255,255,255,.7)", "rgba(255,255,255,.86)", "rgba(236,253,245,.8)", "rgba(34,197,94,.22)", "rgba(45,212,191,.22)", "rgba(21,128,61,.14)", "rgba(34,197,94,.2)", "rgba(45,212,191,.16)", "rgba(132,204,22,.14)"),
        dark: palette("#03170d", "#12301f", "#05272b", "#86efac", "#5eead4", "#e9fff2", "#acd5bc", "rgba(34,197,94,.13)", "rgba(13,52,31,.78)", "rgba(6,48,52,.72)", "rgba(134,239,172,.26)", "rgba(94,234,212,.22)", "rgba(0,0,0,.44)", "rgba(134,239,172,.22)", "rgba(45,212,191,.18)", "rgba(163,230,53,.14)"),
      }),
      colorway("violet", "Violet", "Lavender frost for AI, design, and personal workspace apps.", {
        light: palette("#f5f0ff", "#fff4fb", "#f9f7ff", "#8b5cf6", "#d946ef", "#271244", "#6d5c7c", "rgba(255,255,255,.69)", "rgba(255,255,255,.86)", "rgba(250,245,255,.8)", "rgba(139,92,246,.22)", "rgba(217,70,239,.22)", "rgba(109,40,217,.15)", "rgba(139,92,246,.2)", "rgba(217,70,239,.16)", "rgba(129,140,248,.13)"),
        dark: palette("#10091f", "#2b1238", "#171036", "#c084fc", "#f0abfc", "#fbf1ff", "#cfb8da", "rgba(147,51,234,.15)", "rgba(29,16,58,.78)", "rgba(47,18,61,.74)", "rgba(216,180,254,.28)", "rgba(240,171,252,.22)", "rgba(0,0,0,.48)", "rgba(217,70,239,.24)", "rgba(244,114,182,.18)", "rgba(129,140,248,.14)"),
      }),
    ],
  },

  academic: {
    id: "academic",
    name: "Waki Academic",
    description: "Readable paper surfaces, restrained borders, and serif-inflected typography for research, writing, and documentation.",
    structure: {
      radius: 6,
      blur: 0,
      shadow: "paper-hairline",
      surface: "paper",
      iconography: "thin",
      density: "spacious",
    },
    tokens: {
      radius: 6,
      blur: 0,
      density: "0.55rem 0.78rem",
      hover: "-1px",
      elevatedHover: "-1px",
      navShift: "0px",
      borderWidth: "1px",
      saturation: "100%",
      elevatedSaturation: "100%",
      sidebarBlend: "96%",
      mainBlend: "90%",
      mobileExtra: 0,
      buttonRadius: "4px",
      fontBody: "ui-serif, Georgia, Cambria, \"Times New Roman\", Times, serif",
      fontDisplay: "ui-serif, Georgia, Cambria, \"Times New Roman\", Times, serif",
      shadow: "0 2px 10px var(--waki-shadow)",
      elevatedShadow: "0 8px 24px var(--waki-shadow)",
      panelInset: "inset 0 1px 0 rgba(255,255,255,.55)",
      bodyOverlay: "linear-gradient(90deg, color-mix(in srgb, var(--waki-border) 20%, transparent) 1px, transparent 1px), linear-gradient(0deg, color-mix(in srgb, var(--waki-border) 18%, transparent) 1px, transparent 1px),",
      extraCss: `
body {
  background-size: auto, 24px 24px, 24px 24px, auto, auto, auto, auto;
}
.glass,
.glass-elevated,
.glass-bar,
.shell-main,
.mobile-card {
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}
.chip {
  border-radius: 4px;
  letter-spacing: .01em;
}
`,
    },
    variants: [
      colorway("ivory", "Ivory", "Warm ivory paper with ink-blue accents.", {
        light: palette("#fbfaf4", "#f7f2e8", "#fffdf7", "#1d4ed8", "#92400e", "#1c1917", "#63584e", "#fffdf7", "#ffffff", "#f8f2e8", "#d8d0c2", "#b8a996", "rgba(92,64,35,.1)", "rgba(29,78,216,.08)", "rgba(146,64,14,.05)", "rgba(120,113,108,.04)"),
        dark: palette("#101624", "#1a2030", "#121826", "#93c5fd", "#fbbf24", "#eef2ff", "#b7c2d9", "#182033", "#101827", "#20283a", "#3b4b6a", "#8a6d3d", "rgba(0,0,0,.34)", "rgba(147,197,253,.14)", "rgba(251,191,36,.1)", "rgba(148,163,184,.08)"),
      }),
      colorway("oxford", "Oxford", "Deep blue academic paper for serious research tools.", {
        light: palette("#f7fbff", "#edf4ff", "#ffffff", "#1e40af", "#0f766e", "#102033", "#516176", "#ffffff", "#f8fbff", "#eef4ff", "#bfcee5", "#8fb2d9", "rgba(30,64,175,.11)", "rgba(30,64,175,.08)", "rgba(15,118,110,.05)", "rgba(148,163,184,.05)"),
        dark: palette("#07111f", "#0d1b31", "#091524", "#93c5fd", "#5eead4", "#e7f0ff", "#a9bdd4", "#111d31", "#0b1728", "#17243a", "#315076", "#24706a", "rgba(0,0,0,.36)", "rgba(96,165,250,.16)", "rgba(94,234,212,.1)", "rgba(148,163,184,.08)"),
      }),
      colorway("slate", "Slate", "Cool gray reference surfaces for documentation and specs.", {
        light: palette("#f8fafc", "#eef2f7", "#ffffff", "#475569", "#0ea5e9", "#111827", "#5b6573", "#ffffff", "#f8fafc", "#f1f5f9", "#cbd5e1", "#94a3b8", "rgba(15,23,42,.09)", "rgba(71,85,105,.08)", "rgba(14,165,233,.05)", "rgba(148,163,184,.05)"),
        dark: palette("#111419", "#232a35", "#161d27", "#cbd5e1", "#38bdf8", "#f3f7fb", "#b8c2cf", "#1d232d", "#151b24", "#262e3a", "#475569", "#12556f", "rgba(0,0,0,.4)", "rgba(148,163,184,.12)", "rgba(56,189,248,.1)", "rgba(71,85,105,.08)"),
      }),
      colorway("sepia", "Sepia", "Sepia study mode with sienna accents.", {
        light: palette("#fff7ed", "#f8ead8", "#fffaf3", "#b45309", "#dc2626", "#3b2111", "#71533f", "#fffaf3", "#ffffff", "#f7eadb", "#dfc6a7", "#c29a72", "rgba(146,64,14,.12)", "rgba(180,83,9,.08)", "rgba(220,38,38,.05)", "rgba(120,53,15,.05)"),
        dark: palette("#1d1008", "#2b190d", "#23140b", "#fdba74", "#f87171", "#ffedd5", "#d7b89c", "#302016", "#24170d", "#3a2515", "#7c4a24", "#7f1d1d", "rgba(0,0,0,.38)", "rgba(251,146,60,.14)", "rgba(248,113,113,.1)", "rgba(120,53,15,.08)"),
      }),
    ],
  },

  desktop: {
    id: "desktop",
    name: "Waki Desktop",
    description: "Dense native-app surfaces with compact controls, firm borders, and low-glare depth.",
    structure: {
      radius: 10,
      blur: 12,
      shadow: "compact-native",
      surface: "solid-translucent",
      iconography: "regular",
      density: "compact",
    },
    tokens: {
      radius: 10,
      blur: 12,
      density: "0.46rem 0.7rem",
      hover: "-1px",
      elevatedHover: "-1px",
      navShift: "0px",
      borderWidth: "1px",
      saturation: "125%",
      elevatedSaturation: "135%",
      sidebarBlend: "94%",
      mainBlend: "78%",
      mobileExtra: 0,
      buttonRadius: "7px",
      fontBody: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif",
      fontDisplay: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif",
      shadow: "0 8px 22px var(--waki-shadow)",
      elevatedShadow: "0 16px 38px var(--waki-shadow), inset 0 1px 0 rgba(255,255,255,.12)",
      panelInset: "inset 0 1px 0 rgba(255,255,255,.12)",
      bodyOverlay: "",
      extraCss: `
.glass,
.glass-elevated,
.shell-main,
.mobile-card {
  backdrop-filter: blur(calc(var(--waki-blur) * .72)) saturate(125%);
  -webkit-backdrop-filter: blur(calc(var(--waki-blur) * .72)) saturate(125%);
}
.nav-item.active,
.glass-bar {
  box-shadow: inset 3px 0 0 color-mix(in srgb, var(--waki-accent-2) 65%, transparent);
}
`,
    },
    variants: [
      colorway("graphite", "Graphite", "Graphite desktop chrome with electric blue focus.", {
        light: palette("#f4f6f8", "#e8edf3", "#ffffff", "#2563eb", "#0891b2", "#111827", "#5b6573", "rgba(255,255,255,.82)", "rgba(255,255,255,.92)", "rgba(241,245,249,.86)", "rgba(71,85,105,.22)", "rgba(37,99,235,.22)", "rgba(15,23,42,.12)", "rgba(37,99,235,.12)", "rgba(71,85,105,.1)", "rgba(14,165,233,.1)"),
        dark: palette("#111419", "#232a35", "#161d27", "#38bdf8", "#93c5fd", "#f3f7fb", "#b8c2cf", "rgba(45,52,64,.74)", "rgba(29,35,45,.9)", "rgba(38,46,58,.86)", "rgba(125,211,252,.24)", "rgba(148,163,184,.2)", "rgba(0,0,0,.46)", "rgba(56,189,248,.18)", "rgba(148,163,184,.1)", "rgba(59,130,246,.14)"),
      }),
      colorway("cobalt", "Cobalt", "Cobalt desktop shell for product and admin apps.", {
        light: palette("#eef5ff", "#f8fbff", "#ffffff", "#1d4ed8", "#0ea5e9", "#10213f", "#52657d", "rgba(255,255,255,.84)", "rgba(255,255,255,.94)", "rgba(239,246,255,.88)", "rgba(59,130,246,.2)", "rgba(14,165,233,.22)", "rgba(37,99,235,.12)", "rgba(14,165,233,.18)", "rgba(37,99,235,.12)", "rgba(45,212,191,.1)"),
        dark: palette("#07111f", "#092a3f", "#061d32", "#38bdf8", "#60a5fa", "#e7f7ff", "#aac6d8", "rgba(14,165,233,.12)", "rgba(9,32,54,.82)", "rgba(7,42,63,.76)", "rgba(56,189,248,.27)", "rgba(96,165,250,.22)", "rgba(0,0,0,.44)", "rgba(56,189,248,.23)", "rgba(96,165,250,.18)", "rgba(45,212,191,.14)"),
      }),
      colorway("nova", "Nova", "Violet command-center chrome with luminous accents.", {
        light: palette("#f4f0ff", "#fff4fb", "#f9f7ff", "#9333ea", "#db2777", "#241239", "#6a5878", "rgba(255,255,255,.78)", "rgba(255,255,255,.9)", "rgba(250,245,255,.82)", "rgba(147,51,234,.24)", "rgba(236,72,153,.22)", "rgba(88,28,135,.16)", "rgba(147,51,234,.2)", "rgba(236,72,153,.16)", "rgba(99,102,241,.12)"),
        dark: palette("#10091f", "#2c1235", "#171036", "#d946ef", "#f472b6", "#fbf1ff", "#cfb8da", "rgba(147,51,234,.16)", "rgba(29,16,58,.78)", "rgba(47,18,61,.74)", "rgba(244,114,182,.28)", "rgba(196,181,253,.23)", "rgba(0,0,0,.48)", "rgba(217,70,239,.24)", "rgba(244,114,182,.2)", "rgba(129,140,248,.16)"),
      }),
      colorway("olive", "Olive", "Muted green desktop shell for workbench and maker tools.", {
        light: palette("#f4f7ed", "#eef5e8", "#ffffff", "#4d7c0f", "#0f766e", "#1f2a12", "#5f6f4a", "rgba(255,255,255,.82)", "rgba(255,255,255,.92)", "rgba(241,248,232,.86)", "rgba(101,163,13,.22)", "rgba(15,118,110,.2)", "rgba(77,124,15,.12)", "rgba(101,163,13,.14)", "rgba(15,118,110,.1)", "rgba(132,204,22,.1)"),
        dark: palette("#0e1608", "#1b2912", "#111f15", "#a3e635", "#5eead4", "#efffd8", "#bfd2a1", "rgba(101,163,13,.14)", "rgba(25,43,18,.84)", "rgba(18,38,22,.76)", "rgba(163,230,53,.24)", "rgba(94,234,212,.18)", "rgba(0,0,0,.44)", "rgba(163,230,53,.18)", "rgba(45,212,191,.12)", "rgba(132,204,22,.12)"),
      }),
    ],
  },

  mobile: {
    id: "mobile",
    name: "Waki Mobile",
    description: "Large-radius touch surfaces, pill controls, and friendly depth for mobile-first apps.",
    structure: {
      radius: 30,
      blur: 24,
      shadow: "soft-touch",
      surface: "rounded-glass",
      iconography: "regular",
      density: "touch",
    },
    tokens: {
      radius: 30,
      blur: 24,
      density: "0.72rem 1.05rem",
      hover: "-3px",
      elevatedHover: "-4px",
      navShift: "0px",
      borderWidth: "1px",
      saturation: "185%",
      elevatedSaturation: "205%",
      sidebarBlend: "82%",
      mainBlend: "64%",
      mobileExtra: 18,
      buttonRadius: "999px",
      fontBody: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif",
      fontDisplay: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif",
      shadow: "0 20px 56px var(--waki-shadow)",
      elevatedShadow: "0 30px 86px var(--waki-shadow), inset 0 1px 0 rgba(255,255,255,.24)",
      panelInset: "inset 0 1px 0 rgba(255,255,255,.22), 0 12px 30px rgba(0,0,0,.08)",
      bodyOverlay: "radial-gradient(circle at 70% 18%, color-mix(in srgb, var(--waki-accent) 10%, transparent), transparent 28%),",
      extraCss: `
.mobile-card {
  transform: translateY(-1px);
}
.theme-switcher,
.btn-primary,
.btn-secondary,
.btn-ghost,
.btn-success,
.btn-warning,
.btn-danger {
  border-radius: 999px;
}
`,
    },
    variants: [
      colorway("orchid", "Orchid", "Soft orchid mobile glass for expressive apps.", {
        light: palette("#fff1fb", "#f1f5ff", "#fff7fd", "#c026d3", "#6366f1", "#35133c", "#76587d", "rgba(255,255,255,.72)", "rgba(255,255,255,.88)", "rgba(253,232,255,.78)", "rgba(217,70,239,.22)", "rgba(129,140,248,.2)", "rgba(162,28,175,.15)", "rgba(217,70,239,.2)", "rgba(129,140,248,.16)", "rgba(251,207,232,.2)"),
        dark: palette("#21081f", "#351249", "#11194a", "#f0abfc", "#a5b4fc", "#fff0fb", "#dfbfdf", "rgba(217,70,239,.15)", "rgba(48,18,62,.78)", "rgba(26,31,81,.72)", "rgba(251,207,232,.26)", "rgba(165,180,252,.24)", "rgba(0,0,0,.46)", "rgba(240,171,252,.22)", "rgba(129,140,248,.2)", "rgba(244,114,182,.16)"),
      }),
      colorway("mint", "Mint", "Friendly mint mobile theme with readable dark mode.", {
        light: palette("#effff4", "#edfaff", "#f8fff1", "#16a34a", "#14b8a6", "#0b3224", "#557064", "rgba(255,255,255,.72)", "rgba(255,255,255,.88)", "rgba(236,253,245,.78)", "rgba(34,197,94,.22)", "rgba(45,212,191,.22)", "rgba(21,128,61,.14)", "rgba(34,197,94,.2)", "rgba(45,212,191,.16)", "rgba(132,204,22,.14)"),
        dark: palette("#03170d", "#12301f", "#05272b", "#86efac", "#5eead4", "#e9fff2", "#acd5bc", "rgba(34,197,94,.13)", "rgba(13,52,31,.78)", "rgba(6,48,52,.72)", "rgba(134,239,172,.26)", "rgba(94,234,212,.22)", "rgba(0,0,0,.44)", "rgba(134,239,172,.22)", "rgba(45,212,191,.18)", "rgba(163,230,53,.14)"),
      }),
      colorway("sunrise", "Sunrise", "Warm mobile surfaces for habit, food, and lifestyle apps.", {
        light: palette("#fff8ed", "#fff1f2", "#fffdf7", "#d97706", "#e11d48", "#3a1d0b", "#775c45", "rgba(255,255,255,.78)", "rgba(255,255,255,.92)", "rgba(255,247,237,.84)", "rgba(217,119,6,.22)", "rgba(244,63,94,.18)", "rgba(146,64,14,.15)", "rgba(217,119,6,.18)", "rgba(244,63,94,.13)", "rgba(251,191,36,.16)"),
        dark: palette("#1b0b06", "#32130f", "#2c101c", "#fb923c", "#fb7185", "#fff2df", "#d7b89c", "rgba(251,146,60,.13)", "rgba(48,22,14,.8)", "rgba(51,18,31,.74)", "rgba(253,186,116,.26)", "rgba(251,113,133,.22)", "rgba(0,0,0,.46)", "rgba(251,146,60,.24)", "rgba(251,113,133,.16)", "rgba(245,158,11,.14)"),
      }),
      colorway("ocean", "Ocean", "Blue-green touch surfaces for travel, media, and maps.", {
        light: palette("#edfaff", "#e6fff9", "#f7fbff", "#0284c7", "#0d9488", "#073349", "#527282", "rgba(255,255,255,.74)", "rgba(255,255,255,.9)", "rgba(230,252,255,.8)", "rgba(14,165,233,.22)", "rgba(13,148,136,.22)", "rgba(2,132,199,.14)", "rgba(14,165,233,.2)", "rgba(45,212,191,.16)", "rgba(125,211,252,.14)"),
        dark: palette("#031923", "#063242", "#052b33", "#67e8f9", "#5eead4", "#e5fbff", "#abd2d8", "rgba(14,165,233,.13)", "rgba(8,50,66,.78)", "rgba(6,43,51,.72)", "rgba(103,232,249,.26)", "rgba(94,234,212,.22)", "rgba(0,0,0,.44)", "rgba(103,232,249,.22)", "rgba(45,212,191,.18)", "rgba(14,165,233,.14)"),
      }),
    ],
  },

  command: {
    id: "command",
    name: "Waki Command",
    description: "Sharp dark-tooling surfaces with bright signals, firm edges, and terminal-like focus.",
    structure: {
      radius: 8,
      blur: 6,
      shadow: "signal-glow",
      surface: "dark-tooling",
      iconography: "regular",
      density: "compact",
    },
    tokens: {
      radius: 8,
      blur: 6,
      density: "0.48rem 0.72rem",
      hover: "-1px",
      elevatedHover: "-2px",
      navShift: "2px",
      borderWidth: "1px",
      saturation: "150%",
      elevatedSaturation: "165%",
      sidebarBlend: "92%",
      mainBlend: "78%",
      mobileExtra: 0,
      buttonRadius: "5px",
      fontBody: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif",
      fontDisplay: "\"SF Mono\", \"Cascadia Code\", \"Roboto Mono\", ui-monospace, monospace",
      shadow: "0 16px 40px var(--waki-shadow), 0 0 24px color-mix(in srgb, var(--waki-accent) 18%, transparent)",
      elevatedShadow: "0 26px 70px var(--waki-shadow), 0 0 38px color-mix(in srgb, var(--waki-accent-2) 18%, transparent)",
      panelInset: "inset 0 1px 0 color-mix(in srgb, var(--waki-accent) 16%, transparent)",
      bodyOverlay: "linear-gradient(90deg, color-mix(in srgb, var(--waki-accent) 8%, transparent) 1px, transparent 1px), linear-gradient(0deg, color-mix(in srgb, var(--waki-accent) 6%, transparent) 1px, transparent 1px),",
      extraCss: `
body {
  background-size: auto, 28px 28px, 28px 28px, auto, auto, auto, auto;
}
.glass,
.glass-elevated,
.glass-bar {
  border-color: color-mix(in srgb, var(--waki-accent) 36%, var(--waki-border));
}
.chip {
  border-radius: 5px;
  font-family: var(--waki-font-display);
  text-transform: uppercase;
}
`,
    },
    variants: [
      colorway("cyan", "Cyan", "Cyan command surfaces for developer tools.", {
        light: palette("#f8fdff", "#eefaff", "#ffffff", "#0891b2", "#2563eb", "#0b2330", "#526b77", "rgba(255,255,255,.84)", "rgba(255,255,255,.94)", "rgba(239,250,255,.86)", "rgba(14,165,233,.24)", "rgba(37,99,235,.2)", "rgba(8,145,178,.13)", "rgba(14,165,233,.16)", "rgba(37,99,235,.1)", "rgba(45,212,191,.1)"),
        dark: palette("#041014", "#071820", "#05131d", "#06b6d4", "#60a5fa", "#dffaff", "#a8d5df", "rgba(6,182,212,.12)", "rgba(7,24,32,.86)", "rgba(9,31,45,.8)", "#124655", "rgba(96,165,250,.2)", "rgba(0,0,0,.52)", "rgba(6,182,212,.24)", "rgba(96,165,250,.16)", "rgba(45,212,191,.12)"),
      }),
      colorway("lime", "Lime", "Lime signal dark tools for monitoring and automation.", {
        light: palette("#fbfff4", "#f4fce8", "#ffffff", "#65a30d", "#16a34a", "#1d2b0f", "#63724e", "rgba(255,255,255,.84)", "rgba(255,255,255,.94)", "rgba(247,254,231,.86)", "rgba(132,204,22,.24)", "rgba(22,163,74,.2)", "rgba(101,163,13,.13)", "rgba(132,204,22,.16)", "rgba(22,163,74,.1)", "rgba(163,230,53,.1)"),
        dark: palette("#0c1404", "#121d08", "#0e1806", "#84cc16", "#22c55e", "#ecfccb", "#bed993", "rgba(132,204,22,.12)", "rgba(18,29,8,.86)", "rgba(23,38,11,.8)", "#3f6212", "rgba(34,197,94,.2)", "rgba(0,0,0,.52)", "rgba(132,204,22,.24)", "rgba(34,197,94,.16)", "rgba(163,230,53,.12)"),
      }),
      colorway("magenta", "Magenta", "Hot magenta command surfaces for creative technical apps.", {
        light: palette("#fff7fd", "#fdf2ff", "#ffffff", "#db2777", "#9333ea", "#321125", "#75586d", "rgba(255,255,255,.84)", "rgba(255,255,255,.94)", "rgba(253,242,248,.86)", "rgba(219,39,119,.24)", "rgba(147,51,234,.2)", "rgba(190,24,93,.13)", "rgba(219,39,119,.16)", "rgba(147,51,234,.1)", "rgba(244,114,182,.1)"),
        dark: palette("#160812", "#210d1b", "#180b21", "#ec4899", "#c084fc", "#ffe4f1", "#ddb4ce", "rgba(236,72,153,.12)", "rgba(33,13,27,.86)", "rgba(31,16,42,.8)", "#6d1d46", "rgba(192,132,252,.2)", "rgba(0,0,0,.52)", "rgba(236,72,153,.24)", "rgba(192,132,252,.16)", "rgba(244,114,182,.12)"),
      }),
      colorway("amber", "Amber", "Amber terminal warmth for ops and maker tools.", {
        light: palette("#fffaf0", "#fff7ed", "#ffffff", "#d97706", "#e11d48", "#351c09", "#755c43", "rgba(255,255,255,.84)", "rgba(255,255,255,.94)", "rgba(255,247,237,.86)", "rgba(217,119,6,.24)", "rgba(225,29,72,.18)", "rgba(146,64,14,.13)", "rgba(217,119,6,.16)", "rgba(225,29,72,.1)", "rgba(251,191,36,.12)"),
        dark: palette("#190b05", "#241008", "#1d0d07", "#f97316", "#fb7185", "#ffedd5", "#d7b89c", "rgba(249,115,22,.12)", "rgba(36,16,8,.86)", "rgba(42,19,9,.8)", "#7c2d12", "rgba(251,113,133,.2)", "rgba(0,0,0,.52)", "rgba(249,115,22,.24)", "rgba(251,113,133,.16)", "rgba(245,158,11,.12)"),
      }),
    ],
  },
};

function palette(bg1, bg2, bg3, accent, accent2, text, muted, panel, panel2, panel3, border, border2, shadow, blob1, blob2, blob3) {
  return { bg1, bg2, bg3, accent, accent2, text, muted, panel, panel2, panel3, border, border2, shadow, blob1, blob2, blob3 };
}

function colorway(slot, name, description, modes) {
  return { slot, name, description, modes };
}

function modeVars(mode, variant) {
  const p = variant.modes[mode];
  return `
  --waki-bg-1: ${p.bg1};
  --waki-bg-2: ${p.bg2};
  --waki-bg-3: ${p.bg3};
  --waki-blob-1: ${p.blob1};
  --waki-blob-2: ${p.blob2};
  --waki-blob-3: ${p.blob3};
  --waki-panel: ${p.panel};
  --waki-panel-2: ${p.panel2};
  --waki-panel-3: ${p.panel3};
  --waki-bar: ${p.panel2};
  --waki-border: ${p.border};
  --waki-border-2: ${p.border2};
  --waki-text: ${p.text};
  --waki-muted: ${p.muted};
  --waki-accent: ${p.accent};
  --waki-accent-2: ${p.accent2};
  --waki-focus: color-mix(in srgb, ${p.accent} 24%, transparent);
  --waki-shadow: ${p.shadow};`;
}

function themeId(family, variant) {
  return `waki-${family.id}-${variant.slot}`;
}

function cssForTheme(family, variant) {
  const t = family.tokens;
  const id = themeId(family, variant);
  return `/* ============================================================================
 * Theme: ${id} (${family.name} - ${variant.name})
 * ----------------------------------------------------------------------------
 * Material family: ${family.name}
 * Hue variant: ${variant.name}
 * Generated by scripts/gen-v2-themes.mjs.
 * ============================================================================ */

:root {
  --waki-radius: ${t.radius}px;
  --waki-radius-sm: ${Math.max(4, t.radius - 8)}px;
  --waki-radius-lg: ${t.radius + 8}px;
  --waki-blur: ${t.blur}px;
  --waki-density: ${t.density};
  --waki-hover-y: ${t.hover};
  --waki-elevated-hover-y: ${t.elevatedHover};
  --waki-nav-shift: ${t.navShift};
  --waki-shadow-stack: ${t.shadow};
  --waki-elevated-shadow-stack: ${t.elevatedShadow};
  --waki-inset-shadow: ${t.panelInset};
  --waki-glass-saturation: ${t.saturation};
  --waki-elevated-saturation: ${t.elevatedSaturation};
  --waki-sidebar-blend: ${t.sidebarBlend};
  --waki-main-blend: ${t.mainBlend};
  --waki-border-width: ${t.borderWidth};
  --waki-button-radius: ${t.buttonRadius};
  --waki-mobile-extra-radius: ${t.mobileExtra}px;
  --waki-font-body: ${t.fontBody};
  --waki-font-display: ${t.fontDisplay};${modeVars("light", variant)}
}
html.dark {
${modeVars("dark", variant)}
}

body {
  background:
    ${t.bodyOverlay}
    radial-gradient(circle at 8% 10%, var(--waki-blob-1), transparent 32%),
    radial-gradient(circle at 92% 4%, var(--waki-blob-2), transparent 30%),
    radial-gradient(circle at 50% 110%, var(--waki-blob-3), transparent 45%),
    linear-gradient(135deg, var(--waki-bg-1) 0%, var(--waki-bg-2) 48%, var(--waki-bg-3) 100%);
  background-attachment: fixed;
  color: var(--waki-text);
  font-family: var(--waki-font-body);
}
html.dark body {
  color: var(--waki-text);
}
h1,
h2,
h3,
.theme-title {
  font-family: var(--waki-font-display);
}

.glass,
.glass-elevated,
.glass-bar,
.shell-main,
.mobile-card {
  position: relative;
}
.glass {
  background: var(--waki-panel);
  border: var(--waki-border-width) solid var(--waki-border);
  border-radius: var(--waki-radius);
  color: var(--waki-text);
  box-shadow: var(--waki-shadow-stack), var(--waki-inset-shadow);
  backdrop-filter: blur(var(--waki-blur)) saturate(var(--waki-glass-saturation));
  -webkit-backdrop-filter: blur(var(--waki-blur)) saturate(var(--waki-glass-saturation));
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease, background-color 180ms ease;
}
.glass:hover {
  transform: translateY(var(--waki-hover-y));
  border-color: var(--waki-border-2);
}
.glass-elevated {
  background: linear-gradient(145deg, var(--waki-panel-2), var(--waki-panel-3));
  border: var(--waki-border-width) solid var(--waki-border-2);
  border-radius: var(--waki-radius-lg);
  color: var(--waki-text);
  box-shadow: var(--waki-elevated-shadow-stack);
  backdrop-filter: blur(calc(var(--waki-blur) + 4px)) saturate(var(--waki-elevated-saturation));
  -webkit-backdrop-filter: blur(calc(var(--waki-blur) + 4px)) saturate(var(--waki-elevated-saturation));
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
}
.glass-elevated:hover {
  transform: translateY(var(--waki-elevated-hover-y));
}
.glass-bar {
  background: var(--waki-bar);
  border: var(--waki-border-width) solid var(--waki-border);
  border-radius: var(--waki-radius);
  color: var(--waki-text);
  box-shadow: 0 16px 40px var(--waki-shadow);
  backdrop-filter: blur(calc(var(--waki-blur) + 2px)) saturate(var(--waki-glass-saturation));
  -webkit-backdrop-filter: blur(calc(var(--waki-blur) + 2px)) saturate(var(--waki-glass-saturation));
}
.panel-nested {
  background: color-mix(in srgb, var(--waki-panel-3) 78%, transparent);
  border: var(--waki-border-width) solid color-mix(in srgb, var(--waki-border-2) 78%, transparent);
  border-radius: var(--waki-radius-sm);
  box-shadow: inset 0 1px 0 color-mix(in srgb, white 12%, transparent), 0 8px 20px color-mix(in srgb, var(--waki-shadow) 48%, transparent);
}

.chip,
.status-success,
.status-warning,
.status-error,
.status-info {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  border-radius: 999px;
  padding: 0.22rem 0.62rem;
  font-size: 0.72rem;
  font-weight: 750;
  line-height: 1;
}
.chip {
  background: color-mix(in srgb, var(--waki-accent) 13%, transparent);
  border: 1px solid color-mix(in srgb, var(--waki-accent) 36%, transparent);
  color: var(--waki-accent);
}
.chip:hover {
  background: color-mix(in srgb, var(--waki-accent) 20%, transparent);
}
.divider-soft {
  border-color: var(--waki-border);
}

.btn-primary,
.btn-secondary,
.btn-warning,
.btn-danger,
.btn-ghost,
.btn-success {
  border-radius: var(--waki-button-radius);
  padding: var(--waki-density);
  font: inherit;
  font-size: 0.86rem;
  font-weight: 800;
  cursor: pointer;
  transition: transform 160ms ease, filter 160ms ease, box-shadow 160ms ease, border-color 160ms ease;
}
.btn-primary {
  background: linear-gradient(135deg, var(--waki-accent), var(--waki-accent-2));
  color: #ffffff;
  border: 1px solid color-mix(in srgb, var(--waki-accent) 70%, white);
  box-shadow: 0 14px 32px color-mix(in srgb, var(--waki-accent) 36%, transparent);
}
.btn-primary:hover,
.btn-success:hover {
  transform: translateY(-1px);
  filter: brightness(1.06) saturate(1.05);
}
.btn-secondary {
  background: var(--waki-panel-2);
  color: var(--waki-text);
  border: 1px solid var(--waki-border-2);
}
.btn-secondary:hover,
.btn-ghost:hover {
  transform: translateY(-1px);
  border-color: var(--waki-accent);
  box-shadow: 0 10px 24px var(--waki-shadow);
}
.btn-ghost {
  background: transparent;
  color: var(--waki-text);
  border: 1px solid transparent;
}
.btn-warning {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: #fff7ed;
  border: 1px solid rgba(217, 119, 6, 0.58);
  box-shadow: 0 12px 30px rgba(217, 119, 6, 0.26);
}
.btn-danger {
  background: linear-gradient(135deg, #f43f5e, #dc2626);
  color: #fff1f2;
  border: 1px solid rgba(220, 38, 38, 0.58);
  box-shadow: 0 12px 30px rgba(220, 38, 38, 0.26);
}
.btn-success {
  background: linear-gradient(135deg, #10b981, #059669);
  color: #ecfdf5;
  border: 1px solid rgba(5, 150, 105, 0.58);
  box-shadow: 0 12px 30px rgba(5, 150, 105, 0.24);
}

.status-success {
  background: rgba(16, 185, 129, 0.14);
  color: #059669;
  border: 1px solid rgba(16, 185, 129, 0.34);
}
html.dark .status-success {
  color: #6ee7b7;
}
.status-warning {
  background: rgba(245, 158, 11, 0.14);
  color: #b45309;
  border: 1px solid rgba(245, 158, 11, 0.34);
}
html.dark .status-warning {
  color: #fcd34d;
}
.status-error {
  background: rgba(244, 63, 94, 0.14);
  color: #be123c;
  border: 1px solid rgba(244, 63, 94, 0.34);
}
html.dark .status-error {
  color: #fda4af;
}
.status-info {
  background: color-mix(in srgb, var(--waki-accent-2) 14%, transparent);
  color: var(--waki-accent-2);
  border: 1px solid color-mix(in srgb, var(--waki-accent-2) 38%, transparent);
}

.input {
  background: var(--waki-panel-2);
  color: var(--waki-text);
  border: 1px solid var(--waki-border);
  border-radius: var(--waki-radius-sm);
  padding: 0.58rem 0.72rem;
  font: inherit;
  outline: none;
  transition: border-color 160ms ease, box-shadow 160ms ease, background-color 160ms ease;
}
.input:focus {
  border-color: var(--waki-accent);
  box-shadow: 0 0 0 4px var(--waki-focus);
}
.input::placeholder {
  color: var(--waki-muted);
}

.shell-sidebar {
  background: color-mix(in srgb, var(--waki-panel-2) var(--waki-sidebar-blend), transparent);
  border-right: 1px solid var(--waki-border);
  backdrop-filter: blur(calc(var(--waki-blur) + 2px)) saturate(var(--waki-glass-saturation));
  -webkit-backdrop-filter: blur(calc(var(--waki-blur) + 2px)) saturate(var(--waki-glass-saturation));
}
.shell-main {
  background: color-mix(in srgb, var(--waki-panel) var(--waki-main-blend), transparent);
  border: 1px solid var(--waki-border);
  border-radius: var(--waki-radius-lg);
  box-shadow: 0 22px 68px var(--waki-shadow);
}
.nav-item {
  color: var(--waki-muted);
  border-radius: var(--waki-radius-sm);
  transition: color 160ms ease, background-color 160ms ease, transform 160ms ease;
}
.nav-item:hover,
.nav-item.active {
  color: var(--waki-text);
  background: color-mix(in srgb, var(--waki-accent) 14%, transparent);
  transform: translateX(var(--waki-nav-shift));
}
.mobile-card {
  background: linear-gradient(145deg, var(--waki-panel-2), var(--waki-panel-3));
  border: 1px solid var(--waki-border-2);
  border-radius: calc(var(--waki-radius-lg) + var(--waki-mobile-extra-radius));
  box-shadow: 0 24px 70px var(--waki-shadow);
}
.theme-switcher {
  background: var(--waki-panel-2);
  border: 1px solid var(--waki-border-2);
  border-radius: 999px;
  box-shadow: 0 18px 42px var(--waki-shadow);
  backdrop-filter: blur(var(--waki-blur)) saturate(var(--waki-glass-saturation));
  -webkit-backdrop-filter: blur(var(--waki-blur)) saturate(var(--waki-glass-saturation));
}
.theme-swatch {
  background: linear-gradient(135deg, var(--waki-bg-1), var(--waki-accent), var(--waki-accent-2));
}
.theme-switcher .active {
  background: linear-gradient(135deg, var(--waki-accent), var(--waki-accent-2));
  color: #ffffff;
}

${t.extraCss}

@media (max-width: 760px) {
  .shell-sidebar {
    border-right: 0;
    border-bottom: 1px solid var(--waki-border);
  }
  .shell-main {
    border-radius: var(--waki-radius);
  }
}
`;
}

function familyModuleSource() {
  const families = {};
  for (const family of Object.values(materials)) {
    families[family.id] = {
      name: family.name,
      description: family.description,
      structure: family.structure,
      variants: family.variants.map((variant) => ({
        slot: variant.slot,
        themeId: themeId(family, variant),
        name: variant.name,
        description: variant.description,
        palette: {
          light: paletteHints(variant.modes.light),
          dark: paletteHints(variant.modes.dark),
        },
      })),
    };
  }

  return `// ============================================================================
// waki-themes / families.mjs
// ----------------------------------------------------------------------------
// Generated by scripts/gen-v2-themes.mjs.
// Material families define structure. Variants define hue/colorway.
// ============================================================================

export const FAMILIES = ${JSON.stringify(families, null, 2)};

export const VARIANT_BY_THEME_ID = (() => {
  const out = {};
  for (const [familyId, family] of Object.entries(FAMILIES)) {
    for (const variant of family.variants) {
      out[variant.themeId] = {
        familyId,
        familyName: family.name,
        slot: variant.slot,
        variantName: variant.name,
      };
    }
  }
  return out;
})();
`;
}

function paletteHints(p) {
  return {
    bgFrom: p.bg1,
    bgTo: p.bg2,
    panel: p.panel,
    border: p.border,
    text: p.text,
    accent: p.accent,
  };
}

mkdirSync(stylesDir, { recursive: true });
for (const family of Object.values(materials)) {
  for (const variant of family.variants) {
    const id = themeId(family, variant);
    writeFileSync(resolve(stylesDir, `${id}.css`), cssForTheme(family, variant));
    console.log(`[gen-catalog] styles/${id}.css`);
  }
}
writeFileSync(familiesFile, familyModuleSource());
console.log(`[ok] generated ${Object.values(materials).reduce((sum, family) => sum + family.variants.length, 0)} themes across ${Object.keys(materials).length} families`);
