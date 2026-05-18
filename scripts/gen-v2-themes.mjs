#!/usr/bin/env node
/**
 * Generate the V2 theme set. V2 themes are intentionally additive:
 * they use new `v2-*` ids so existing apps pinned to the original
 * catalog keep rendering exactly as before.
 */
import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const stylesDir = resolve(__dirname, "..", "styles");

const THEMES = [
  {
    id: "v2-frost-prism",
    name: "Frost Prism",
    radius: 20,
    blur: 28,
    light: {
      bg1: "#edf7ff",
      bg2: "#f8eefc",
      bg3: "#f7fbff",
      blob1: "rgba(109, 93, 252, 0.24)",
      blob2: "rgba(45, 212, 191, 0.18)",
      blob3: "rgba(236, 72, 153, 0.14)",
      panel: "rgba(255, 255, 255, 0.62)",
      panel2: "rgba(255, 255, 255, 0.78)",
      panel3: "rgba(241, 245, 255, 0.76)",
      bar: "rgba(255, 255, 255, 0.72)",
      border: "rgba(125, 92, 255, 0.22)",
      border2: "rgba(45, 212, 191, 0.24)",
      text: "#102033",
      muted: "#52657d",
      accent: "#6d5dfc",
      accent2: "#14b8a6",
      focus: "rgba(109, 93, 252, 0.26)",
      shadow: "rgba(67, 56, 202, 0.18)",
    },
    dark: {
      bg1: "#080b20",
      bg2: "#1b0f32",
      bg3: "#071b28",
      blob1: "rgba(139, 124, 255, 0.28)",
      blob2: "rgba(103, 232, 249, 0.2)",
      blob3: "rgba(244, 114, 182, 0.18)",
      panel: "rgba(119, 92, 255, 0.16)",
      panel2: "rgba(14, 24, 58, 0.72)",
      panel3: "rgba(10, 30, 49, 0.72)",
      bar: "rgba(8, 11, 32, 0.74)",
      border: "rgba(103, 232, 249, 0.28)",
      border2: "rgba(196, 181, 253, 0.25)",
      text: "#eef7ff",
      muted: "#a9bad1",
      accent: "#8b7cff",
      accent2: "#67e8f9",
      focus: "rgba(103, 232, 249, 0.24)",
      shadow: "rgba(0, 0, 0, 0.45)",
    },
  },
  {
    id: "v2-frost-opal",
    name: "Frost Opal",
    radius: 22,
    blur: 30,
    light: {
      bg1: "#e7fff8",
      bg2: "#f5fbff",
      bg3: "#eefcff",
      blob1: "rgba(20, 184, 166, 0.24)",
      blob2: "rgba(125, 211, 252, 0.18)",
      blob3: "rgba(190, 242, 100, 0.12)",
      panel: "rgba(255, 255, 255, 0.66)",
      panel2: "rgba(255, 255, 255, 0.8)",
      panel3: "rgba(232, 255, 249, 0.76)",
      bar: "rgba(255, 255, 255, 0.72)",
      border: "rgba(20, 184, 166, 0.24)",
      border2: "rgba(125, 211, 252, 0.24)",
      text: "#07333a",
      muted: "#47646a",
      accent: "#0f9f9a",
      accent2: "#38bdf8",
      focus: "rgba(20, 184, 166, 0.24)",
      shadow: "rgba(13, 148, 136, 0.16)",
    },
    dark: {
      bg1: "#03191d",
      bg2: "#082c35",
      bg3: "#05251b",
      blob1: "rgba(94, 234, 212, 0.25)",
      blob2: "rgba(56, 189, 248, 0.18)",
      blob3: "rgba(132, 204, 22, 0.16)",
      panel: "rgba(45, 212, 191, 0.13)",
      panel2: "rgba(6, 43, 52, 0.76)",
      panel3: "rgba(5, 54, 43, 0.72)",
      bar: "rgba(3, 25, 29, 0.78)",
      border: "rgba(153, 246, 228, 0.26)",
      border2: "rgba(125, 211, 252, 0.22)",
      text: "#dffcf8",
      muted: "#9accc7",
      accent: "#5eead4",
      accent2: "#7dd3fc",
      focus: "rgba(94, 234, 212, 0.22)",
      shadow: "rgba(0, 0, 0, 0.44)",
    },
  },
  {
    id: "v2-glass-civic",
    name: "Glass Civic",
    radius: 16,
    blur: 22,
    light: {
      bg1: "#eef4ff",
      bg2: "#fff8ea",
      bg3: "#f8fbff",
      blob1: "rgba(37, 99, 235, 0.2)",
      blob2: "rgba(251, 191, 36, 0.18)",
      blob3: "rgba(14, 165, 233, 0.12)",
      panel: "rgba(255, 255, 255, 0.68)",
      panel2: "rgba(255, 255, 255, 0.84)",
      panel3: "rgba(238, 244, 255, 0.76)",
      bar: "rgba(255, 255, 255, 0.76)",
      border: "rgba(37, 99, 235, 0.22)",
      border2: "rgba(251, 191, 36, 0.28)",
      text: "#12213d",
      muted: "#56667c",
      accent: "#2563eb",
      accent2: "#d97706",
      focus: "rgba(37, 99, 235, 0.22)",
      shadow: "rgba(30, 64, 175, 0.16)",
    },
    dark: {
      bg1: "#061329",
      bg2: "#24180a",
      bg3: "#071b2b",
      blob1: "rgba(96, 165, 250, 0.26)",
      blob2: "rgba(251, 191, 36, 0.22)",
      blob3: "rgba(14, 165, 233, 0.18)",
      panel: "rgba(37, 99, 235, 0.14)",
      panel2: "rgba(10, 27, 57, 0.78)",
      panel3: "rgba(33, 25, 13, 0.74)",
      bar: "rgba(6, 19, 41, 0.78)",
      border: "rgba(251, 191, 36, 0.26)",
      border2: "rgba(96, 165, 250, 0.24)",
      text: "#edf4ff",
      muted: "#b6c4d9",
      accent: "#60a5fa",
      accent2: "#fbbf24",
      focus: "rgba(251, 191, 36, 0.22)",
      shadow: "rgba(0, 0, 0, 0.45)",
    },
  },
  {
    id: "v2-glass-obsidian",
    name: "Glass Obsidian",
    radius: 18,
    blur: 24,
    light: {
      bg1: "#fff1ed",
      bg2: "#f8fafc",
      bg3: "#fff7ed",
      blob1: "rgba(244, 63, 94, 0.2)",
      blob2: "rgba(249, 115, 22, 0.16)",
      blob3: "rgba(15, 23, 42, 0.08)",
      panel: "rgba(255, 255, 255, 0.7)",
      panel2: "rgba(255, 255, 255, 0.84)",
      panel3: "rgba(255, 241, 237, 0.78)",
      bar: "rgba(255, 255, 255, 0.76)",
      border: "rgba(244, 63, 94, 0.24)",
      border2: "rgba(249, 115, 22, 0.24)",
      text: "#221316",
      muted: "#73575c",
      accent: "#e11d48",
      accent2: "#f97316",
      focus: "rgba(225, 29, 72, 0.22)",
      shadow: "rgba(136, 19, 55, 0.16)",
    },
    dark: {
      bg1: "#050307",
      bg2: "#24100c",
      bg3: "#160516",
      blob1: "rgba(251, 113, 133, 0.25)",
      blob2: "rgba(249, 115, 22, 0.2)",
      blob3: "rgba(217, 70, 239, 0.14)",
      panel: "rgba(255, 255, 255, 0.08)",
      panel2: "rgba(28, 15, 20, 0.8)",
      panel3: "rgba(39, 18, 13, 0.76)",
      bar: "rgba(5, 3, 7, 0.82)",
      border: "rgba(251, 113, 133, 0.3)",
      border2: "rgba(253, 186, 116, 0.23)",
      text: "#fff3f2",
      muted: "#d4aaa8",
      accent: "#fb7185",
      accent2: "#fb923c",
      focus: "rgba(251, 113, 133, 0.24)",
      shadow: "rgba(0, 0, 0, 0.52)",
    },
  },
  {
    id: "v2-desktop-graphite",
    name: "Desktop Graphite",
    radius: 12,
    blur: 14,
    light: {
      bg1: "#f4f6f8",
      bg2: "#e8edf3",
      bg3: "#ffffff",
      blob1: "rgba(37, 99, 235, 0.12)",
      blob2: "rgba(71, 85, 105, 0.1)",
      blob3: "rgba(14, 165, 233, 0.1)",
      panel: "rgba(255, 255, 255, 0.82)",
      panel2: "rgba(255, 255, 255, 0.92)",
      panel3: "rgba(241, 245, 249, 0.86)",
      bar: "rgba(248, 250, 252, 0.86)",
      border: "rgba(71, 85, 105, 0.22)",
      border2: "rgba(37, 99, 235, 0.22)",
      text: "#111827",
      muted: "#5b6573",
      accent: "#2563eb",
      accent2: "#0891b2",
      focus: "rgba(37, 99, 235, 0.2)",
      shadow: "rgba(15, 23, 42, 0.12)",
    },
    dark: {
      bg1: "#111419",
      bg2: "#232a35",
      bg3: "#161d27",
      blob1: "rgba(56, 189, 248, 0.18)",
      blob2: "rgba(148, 163, 184, 0.1)",
      blob3: "rgba(59, 130, 246, 0.14)",
      panel: "rgba(45, 52, 64, 0.74)",
      panel2: "rgba(29, 35, 45, 0.9)",
      panel3: "rgba(38, 46, 58, 0.86)",
      bar: "rgba(17, 20, 25, 0.88)",
      border: "rgba(125, 211, 252, 0.24)",
      border2: "rgba(148, 163, 184, 0.2)",
      text: "#f3f7fb",
      muted: "#b8c2cf",
      accent: "#38bdf8",
      accent2: "#93c5fd",
      focus: "rgba(56, 189, 248, 0.22)",
      shadow: "rgba(0, 0, 0, 0.46)",
    },
  },
  {
    id: "v2-desktop-nova",
    name: "Desktop Nova",
    radius: 14,
    blur: 18,
    light: {
      bg1: "#f4f0ff",
      bg2: "#fff4fb",
      bg3: "#f9f7ff",
      blob1: "rgba(147, 51, 234, 0.2)",
      blob2: "rgba(236, 72, 153, 0.16)",
      blob3: "rgba(99, 102, 241, 0.12)",
      panel: "rgba(255, 255, 255, 0.78)",
      panel2: "rgba(255, 255, 255, 0.9)",
      panel3: "rgba(250, 245, 255, 0.82)",
      bar: "rgba(255, 255, 255, 0.8)",
      border: "rgba(147, 51, 234, 0.24)",
      border2: "rgba(236, 72, 153, 0.22)",
      text: "#241239",
      muted: "#6a5878",
      accent: "#9333ea",
      accent2: "#db2777",
      focus: "rgba(147, 51, 234, 0.22)",
      shadow: "rgba(88, 28, 135, 0.16)",
    },
    dark: {
      bg1: "#10091f",
      bg2: "#2c1235",
      bg3: "#171036",
      blob1: "rgba(217, 70, 239, 0.24)",
      blob2: "rgba(244, 114, 182, 0.2)",
      blob3: "rgba(129, 140, 248, 0.16)",
      panel: "rgba(147, 51, 234, 0.16)",
      panel2: "rgba(29, 16, 58, 0.78)",
      panel3: "rgba(47, 18, 61, 0.74)",
      bar: "rgba(16, 9, 31, 0.82)",
      border: "rgba(244, 114, 182, 0.28)",
      border2: "rgba(196, 181, 253, 0.23)",
      text: "#fbf1ff",
      muted: "#cfb8da",
      accent: "#d946ef",
      accent2: "#f472b6",
      focus: "rgba(217, 70, 239, 0.24)",
      shadow: "rgba(0, 0, 0, 0.48)",
    },
  },
  {
    id: "v2-mobile-orchid",
    name: "Mobile Orchid",
    radius: 26,
    blur: 26,
    light: {
      bg1: "#fff1fb",
      bg2: "#f1f5ff",
      bg3: "#fff7fd",
      blob1: "rgba(217, 70, 239, 0.2)",
      blob2: "rgba(129, 140, 248, 0.16)",
      blob3: "rgba(251, 207, 232, 0.2)",
      panel: "rgba(255, 255, 255, 0.72)",
      panel2: "rgba(255, 255, 255, 0.88)",
      panel3: "rgba(253, 232, 255, 0.78)",
      bar: "rgba(255, 255, 255, 0.76)",
      border: "rgba(217, 70, 239, 0.22)",
      border2: "rgba(129, 140, 248, 0.2)",
      text: "#35133c",
      muted: "#76587d",
      accent: "#c026d3",
      accent2: "#6366f1",
      focus: "rgba(192, 38, 211, 0.22)",
      shadow: "rgba(162, 28, 175, 0.15)",
    },
    dark: {
      bg1: "#21081f",
      bg2: "#351249",
      bg3: "#11194a",
      blob1: "rgba(240, 171, 252, 0.22)",
      blob2: "rgba(129, 140, 248, 0.2)",
      blob3: "rgba(244, 114, 182, 0.16)",
      panel: "rgba(217, 70, 239, 0.15)",
      panel2: "rgba(48, 18, 62, 0.78)",
      panel3: "rgba(26, 31, 81, 0.72)",
      bar: "rgba(33, 8, 31, 0.78)",
      border: "rgba(251, 207, 232, 0.26)",
      border2: "rgba(165, 180, 252, 0.24)",
      text: "#fff0fb",
      muted: "#dfbfdf",
      accent: "#f0abfc",
      accent2: "#a5b4fc",
      focus: "rgba(240, 171, 252, 0.22)",
      shadow: "rgba(0, 0, 0, 0.46)",
    },
  },
  {
    id: "v2-mobile-mint",
    name: "Mobile Mint",
    radius: 26,
    blur: 26,
    light: {
      bg1: "#effff4",
      bg2: "#edfaff",
      bg3: "#f8fff1",
      blob1: "rgba(34, 197, 94, 0.2)",
      blob2: "rgba(45, 212, 191, 0.16)",
      blob3: "rgba(132, 204, 22, 0.14)",
      panel: "rgba(255, 255, 255, 0.72)",
      panel2: "rgba(255, 255, 255, 0.88)",
      panel3: "rgba(236, 253, 245, 0.78)",
      bar: "rgba(255, 255, 255, 0.76)",
      border: "rgba(34, 197, 94, 0.22)",
      border2: "rgba(45, 212, 191, 0.22)",
      text: "#0b3224",
      muted: "#557064",
      accent: "#16a34a",
      accent2: "#14b8a6",
      focus: "rgba(34, 197, 94, 0.22)",
      shadow: "rgba(21, 128, 61, 0.14)",
    },
    dark: {
      bg1: "#03170d",
      bg2: "#12301f",
      bg3: "#05272b",
      blob1: "rgba(134, 239, 172, 0.22)",
      blob2: "rgba(45, 212, 191, 0.18)",
      blob3: "rgba(163, 230, 53, 0.14)",
      panel: "rgba(34, 197, 94, 0.13)",
      panel2: "rgba(13, 52, 31, 0.78)",
      panel3: "rgba(6, 48, 52, 0.72)",
      bar: "rgba(3, 23, 13, 0.78)",
      border: "rgba(134, 239, 172, 0.26)",
      border2: "rgba(94, 234, 212, 0.22)",
      text: "#e9fff2",
      muted: "#acd5bc",
      accent: "#86efac",
      accent2: "#5eead4",
      focus: "rgba(134, 239, 172, 0.22)",
      shadow: "rgba(0, 0, 0, 0.44)",
    },
  },
  {
    id: "v2-web-signal",
    name: "Web Signal",
    radius: 14,
    blur: 18,
    light: {
      bg1: "#f8fbff",
      bg2: "#eef5ff",
      bg3: "#ffffff",
      blob1: "rgba(14, 165, 233, 0.18)",
      blob2: "rgba(37, 99, 235, 0.12)",
      blob3: "rgba(45, 212, 191, 0.1)",
      panel: "rgba(255, 255, 255, 0.84)",
      panel2: "rgba(255, 255, 255, 0.94)",
      panel3: "rgba(239, 246, 255, 0.86)",
      bar: "rgba(255, 255, 255, 0.84)",
      border: "rgba(59, 130, 246, 0.2)",
      border2: "rgba(14, 165, 233, 0.22)",
      text: "#0f1f3a",
      muted: "#52627a",
      accent: "#0ea5e9",
      accent2: "#2563eb",
      focus: "rgba(14, 165, 233, 0.22)",
      shadow: "rgba(37, 99, 235, 0.12)",
    },
    dark: {
      bg1: "#07111f",
      bg2: "#092a3f",
      bg3: "#061d32",
      blob1: "rgba(56, 189, 248, 0.23)",
      blob2: "rgba(96, 165, 250, 0.18)",
      blob3: "rgba(45, 212, 191, 0.14)",
      panel: "rgba(14, 165, 233, 0.12)",
      panel2: "rgba(9, 32, 54, 0.82)",
      panel3: "rgba(7, 42, 63, 0.76)",
      bar: "rgba(7, 17, 31, 0.82)",
      border: "rgba(56, 189, 248, 0.27)",
      border2: "rgba(96, 165, 250, 0.22)",
      text: "#e7f7ff",
      muted: "#aac6d8",
      accent: "#38bdf8",
      accent2: "#60a5fa",
      focus: "rgba(56, 189, 248, 0.22)",
      shadow: "rgba(0, 0, 0, 0.44)",
    },
  },
  {
    id: "v2-web-ember",
    name: "Web Ember",
    radius: 16,
    blur: 20,
    light: {
      bg1: "#fff8ed",
      bg2: "#fff1f2",
      bg3: "#fffdf7",
      blob1: "rgba(217, 119, 6, 0.18)",
      blob2: "rgba(244, 63, 94, 0.13)",
      blob3: "rgba(251, 191, 36, 0.16)",
      panel: "rgba(255, 255, 255, 0.78)",
      panel2: "rgba(255, 255, 255, 0.92)",
      panel3: "rgba(255, 247, 237, 0.84)",
      bar: "rgba(255, 255, 255, 0.82)",
      border: "rgba(217, 119, 6, 0.22)",
      border2: "rgba(244, 63, 94, 0.18)",
      text: "#3a1d0b",
      muted: "#775c45",
      accent: "#d97706",
      accent2: "#e11d48",
      focus: "rgba(217, 119, 6, 0.22)",
      shadow: "rgba(146, 64, 14, 0.15)",
    },
    dark: {
      bg1: "#1b0b06",
      bg2: "#32130f",
      bg3: "#2c101c",
      blob1: "rgba(251, 146, 60, 0.24)",
      blob2: "rgba(251, 113, 133, 0.16)",
      blob3: "rgba(245, 158, 11, 0.14)",
      panel: "rgba(251, 146, 60, 0.13)",
      panel2: "rgba(48, 22, 14, 0.8)",
      panel3: "rgba(51, 18, 31, 0.74)",
      bar: "rgba(27, 11, 6, 0.82)",
      border: "rgba(253, 186, 116, 0.26)",
      border2: "rgba(251, 113, 133, 0.22)",
      text: "#fff2df",
      muted: "#d7b89c",
      accent: "#fb923c",
      accent2: "#fb7185",
      focus: "rgba(251, 146, 60, 0.22)",
      shadow: "rgba(0, 0, 0, 0.46)",
    },
  },
];

function modeVars(mode, t) {
  return `
  --waki-bg-1: ${t[mode].bg1};
  --waki-bg-2: ${t[mode].bg2};
  --waki-bg-3: ${t[mode].bg3};
  --waki-blob-1: ${t[mode].blob1};
  --waki-blob-2: ${t[mode].blob2};
  --waki-blob-3: ${t[mode].blob3};
  --waki-panel: ${t[mode].panel};
  --waki-panel-2: ${t[mode].panel2};
  --waki-panel-3: ${t[mode].panel3};
  --waki-bar: ${t[mode].bar};
  --waki-border: ${t[mode].border};
  --waki-border-2: ${t[mode].border2};
  --waki-text: ${t[mode].text};
  --waki-muted: ${t[mode].muted};
  --waki-accent: ${t[mode].accent};
  --waki-accent-2: ${t[mode].accent2};
  --waki-focus: ${t[mode].focus};
  --waki-shadow: ${t[mode].shadow};`;
}

function v2Css(t) {
  return `/* ============================================================================
 * Theme: ${t.id} (${t.name})
 * ----------------------------------------------------------------------------
 * V2 additive theme. Existing theme ids are intentionally untouched.
 * Dark mode is a distinct colorway, not a charcoal repaint.
 * Generated by scripts/gen-v2-themes.mjs.
 * ============================================================================ */

:root {
  --waki-radius: ${t.radius}px;
  --waki-radius-sm: ${Math.max(8, t.radius - 8)}px;
  --waki-radius-lg: ${t.radius + 8}px;
  --waki-blur: ${t.blur}px;${modeVars("light", t)}
}
html.dark {
${modeVars("dark", t)}
}

body {
  background:
    radial-gradient(circle at 8% 10%, var(--waki-blob-1), transparent 32%),
    radial-gradient(circle at 92% 4%, var(--waki-blob-2), transparent 30%),
    radial-gradient(circle at 50% 110%, var(--waki-blob-3), transparent 45%),
    linear-gradient(135deg, var(--waki-bg-1) 0%, var(--waki-bg-2) 48%, var(--waki-bg-3) 100%);
  background-attachment: fixed;
  color: var(--waki-text);
}
html.dark body {
  color: var(--waki-text);
}

.glass,
.glass-elevated,
.glass-bar,
.panel-nested,
.shell-sidebar,
.shell-main,
.mobile-card,
.theme-switcher {
  color: var(--waki-text);
}

.glass {
  background: var(--waki-panel);
  border: 1px solid var(--waki-border);
  border-radius: var(--waki-radius);
  box-shadow: 0 18px 46px var(--waki-shadow);
  backdrop-filter: blur(var(--waki-blur)) saturate(170%);
  -webkit-backdrop-filter: blur(var(--waki-blur)) saturate(170%);
  transition: transform 180ms ease, border-color 180ms ease, background-color 180ms ease, box-shadow 180ms ease;
}
.glass:hover {
  transform: translateY(-2px);
  border-color: var(--waki-border-2);
  box-shadow: 0 24px 60px var(--waki-shadow), 0 0 0 1px var(--waki-focus);
}

.glass-elevated {
  background: var(--waki-panel-2);
  border: 1px solid var(--waki-border-2);
  border-radius: var(--waki-radius-lg);
  box-shadow: 0 28px 76px var(--waki-shadow), inset 0 1px 0 rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(calc(var(--waki-blur) + 8px)) saturate(185%);
  -webkit-backdrop-filter: blur(calc(var(--waki-blur) + 8px)) saturate(185%);
  transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
}
.glass-elevated:hover {
  transform: translateY(-3px);
  border-color: var(--waki-accent);
  box-shadow: 0 34px 86px var(--waki-shadow), 0 0 0 1px var(--waki-focus);
}
.glass .glass,
.glass-elevated .glass,
.panel-nested {
  background: var(--waki-panel-3);
  border-color: var(--waki-border-2);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18), 0 10px 24px rgba(0, 0, 0, 0.08);
}

.glass-bar {
  background: var(--waki-bar);
  border-bottom: 1px solid var(--waki-border);
  box-shadow: 0 12px 34px var(--waki-shadow);
  backdrop-filter: blur(calc(var(--waki-blur) + 4px)) saturate(180%);
  -webkit-backdrop-filter: blur(calc(var(--waki-blur) + 4px)) saturate(180%);
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
  font-weight: 700;
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
  border-radius: var(--waki-radius-sm);
  padding: 0.58rem 0.88rem;
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
  background: color-mix(in srgb, var(--waki-panel-2) 84%, transparent);
  border-right: 1px solid var(--waki-border);
  backdrop-filter: blur(calc(var(--waki-blur) + 2px)) saturate(170%);
  -webkit-backdrop-filter: blur(calc(var(--waki-blur) + 2px)) saturate(170%);
}
.shell-main {
  background: color-mix(in srgb, var(--waki-panel) 62%, transparent);
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
  transform: translateX(2px);
}
.mobile-card {
  background: linear-gradient(145deg, var(--waki-panel-2), var(--waki-panel-3));
  border: 1px solid var(--waki-border-2);
  border-radius: calc(var(--waki-radius-lg) + 8px);
  box-shadow: 0 24px 70px var(--waki-shadow);
}
.theme-switcher {
  background: var(--waki-panel-2);
  border: 1px solid var(--waki-border-2);
  border-radius: 999px;
  box-shadow: 0 18px 42px var(--waki-shadow);
  backdrop-filter: blur(var(--waki-blur)) saturate(175%);
  -webkit-backdrop-filter: blur(var(--waki-blur)) saturate(175%);
}
.theme-swatch {
  background: linear-gradient(135deg, var(--waki-bg-1), var(--waki-accent), var(--waki-accent-2));
}
.theme-switcher .active {
  background: linear-gradient(135deg, var(--waki-accent), var(--waki-accent-2));
  color: #ffffff;
}

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

for (const theme of THEMES) {
  const filename = `${theme.id}.css`;
  writeFileSync(resolve(stylesDir, filename), v2Css(theme));
  console.log(`[gen-v2] styles/${filename}`);
}
console.log(`[ok] generated ${THEMES.length} V2 theme CSS files`);
