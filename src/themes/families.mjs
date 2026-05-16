// ============================================================================
// waki-themes / families.mjs
// ----------------------------------------------------------------------------
// Family / variant taxonomy. v0.4.0 curated catalog: 5 families x 4 variants
// each = 20 themes. Each variant's flat themeId is the canonical id existing
// consumers pin to.
//
// Shape:
//
//   FAMILIES[familyId] = {
//     name, description,
//     structure: { radius, blur, shadow, surface, iconography, density },
//     variants: [
//       { slot, themeId, name, description, palette: { light, dark } }
//     ]
//   }
//
// `structure` carries the family's structural identity. These are the knobs
// the studio's family-level tab edits, and a family-level edit propagates to
// every variant in the family.
//
// `palette` is purely advisory hint values. The hand-authored / generated
// CSS in styles/ remains the rendered truth; palette here lets the studio
// render miniature previews and seed the variant editor's sliders without
// parsing CSS.
// ============================================================================

export const FAMILIES = {
  glass: {
    name: "Glass",
    description: "Layered translucent panels with backdrop blur. Apple iOS / Windows 11 glassmorphism.",
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
        themeId: "glass-v2",
        name: "Default",
        description: "Frosted glass + drift, calm neutral baseline",
        palette: {
          light: { bgFrom: "#e8eef5", bgTo: "#eef2f8", panel: "rgba(255, 255, 255, 0.6)", border: "rgba(15, 23, 42, 0.08)", text: "#0f172a", accent: "#6366f1" },
          dark:  { bgFrom: "#0c1220", bgTo: "#0f1a2e", panel: "rgba(255, 255, 255, 0.06)", border: "rgba(255, 255, 255, 0.1)", text: "#f1f5f9", accent: "#6366f1" },
        },
      },
      {
        slot: "plus",
        themeId: "glass-plus",
        name: "Plus",
        description: "Richer accents and violet wash. Universal default.",
        palette: {
          light: { bgFrom: "#eef0fb", bgTo: "#f3eaf8", panel: "rgba(243, 235, 255, 0.72)", border: "rgba(168, 85, 247, 0.22)", text: "#0f172a", accent: "#a855f7" },
          dark:  { bgFrom: "#100b24", bgTo: "#1a1640", panel: "rgba(168, 85, 247, 0.1)", border: "rgba(168, 85, 247, 0.26)", text: "#f1f5f9", accent: "#a855f7" },
        },
      },
      {
        slot: "lite",
        themeId: "glass-v1",
        name: "Lite",
        description: "Softer, no glints, calmer alternative",
        palette: {
          light: { bgFrom: "#e8eef5", bgTo: "#eef2f8", panel: "rgba(255, 255, 255, 0.55)", border: "rgba(15, 23, 42, 0.06)", text: "#0f172a", accent: "#8b5cf6" },
          dark:  { bgFrom: "#0c1220", bgTo: "#0f1a2e", panel: "rgba(255, 255, 255, 0.04)", border: "rgba(255, 255, 255, 0.08)", text: "#f1f5f9", accent: "#8b5cf6" },
        },
      },
      {
        slot: "frosted",
        themeId: "frosted-glass",
        name: "Frosted",
        description: "High-contrast teal frost, heavier blur",
        palette: {
          light: { bgFrom: "#cffafe", bgTo: "#a5f3fc", panel: "rgba(255, 255, 255, 0.55)", border: "rgba(14, 165, 233, 0.2)", text: "#0f172a", accent: "#06b6d4" },
          dark:  { bgFrom: "#082f49", bgTo: "#0c4a6e", panel: "rgba(14, 165, 233, 0.12)", border: "rgba(14, 165, 233, 0.26)", text: "#f1f5f9", accent: "#06b6d4" },
        },
      },
    ],
  },

  aurora: {
    name: "Aurora",
    description: "Vibrant gradient accents over radial-blob bg with gradient-ribbon borders. Stripe / Substack marketing-page energy.",
    structure: {
      radius: 16,
      blur: 22,
      shadow: "aurora-glow",
      surface: "tinted-translucent",
      iconography: "regular",
      density: "comfortable",
    },
    variants: [
      {
        slot: "twilight",
        themeId: "aurora-twilight",
        name: "Twilight",
        description: "Violet, cyan, pink. Original Aurora.",
        palette: {
          light: { bgFrom: "#f4ecff", bgTo: "#fff5fb", panel: "rgba(168, 85, 247, 0.08)", border: "rgba(168, 85, 247, 0.45)", text: "#1e1b4b", accent: "#8b5cf6" },
          dark:  { bgFrom: "#0a0517", bgTo: "#110820", panel: "rgba(168, 85, 247, 0.07)", border: "rgba(167, 139, 250, 0.4)", text: "#ede9fe", accent: "#a78bfa" },
        },
      },
      {
        slot: "sunrise",
        themeId: "aurora-sunrise",
        name: "Sunrise",
        description: "Gold, peach, pink",
        palette: {
          light: { bgFrom: "#fff7ed", bgTo: "#fef3c7", panel: "rgba(251, 191, 36, 0.08)", border: "rgba(251, 146, 60, 0.45)", text: "#451a03", accent: "#ea580c" },
          dark:  { bgFrom: "#1a0d05", bgTo: "#1a0e0a", panel: "rgba(251, 191, 36, 0.08)", border: "rgba(253, 186, 116, 0.4)", text: "#fed7aa", accent: "#fb923c" },
        },
      },
      {
        slot: "ocean",
        themeId: "aurora-ocean",
        name: "Ocean",
        description: "Teal, sky, blue",
        palette: {
          light: { bgFrom: "#f0fdfa", bgTo: "#eff6ff", panel: "rgba(14, 165, 233, 0.08)", border: "rgba(14, 165, 233, 0.45)", text: "#082f49", accent: "#0284c7" },
          dark:  { bgFrom: "#021818", bgTo: "#07142a", panel: "rgba(14, 165, 233, 0.08)", border: "rgba(56, 189, 248, 0.4)", text: "#e0f2fe", accent: "#38bdf8" },
        },
      },
      {
        slot: "forest",
        themeId: "aurora-forest",
        name: "Forest",
        description: "Emerald, lime, teal",
        palette: {
          light: { bgFrom: "#ecfdf5", bgTo: "#f0fdfa", panel: "rgba(16, 185, 129, 0.08)", border: "rgba(16, 185, 129, 0.45)", text: "#064e3b", accent: "#059669" },
          dark:  { bgFrom: "#02180e", bgTo: "#021818", panel: "rgba(16, 185, 129, 0.08)", border: "rgba(52, 211, 153, 0.4)", text: "#d1fae5", accent: "#34d399" },
        },
      },
    ],
  },

  clean: {
    name: "Clean",
    description: "Modern minimal. Whitespace-heavy, hairline borders, no blur. Linear / Notion / Vercel restraint.",
    structure: {
      radius: 8,
      blur: 0,
      shadow: "subtle",
      surface: "solid-white",
      iconography: "regular",
      density: "spacious",
    },
    variants: [
      {
        slot: "light",
        themeId: "clean-light",
        name: "Light",
        description: "Pure white canvas, near-black ink",
        palette: {
          light: { bgFrom: "#ffffff", bgTo: "#ffffff", panel: "#ffffff", border: "#e5e7eb", text: "#0f172a", accent: "#0f172a" },
          dark:  { bgFrom: "#050505", bgTo: "#050505", panel: "#111111", border: "#2a2a2a", text: "#fafafa", accent: "#ffffff" },
        },
      },
      {
        slot: "dim",
        themeId: "clean-dim",
        name: "Dim",
        description: "Slate canvas with blue accent",
        palette: {
          light: { bgFrom: "#f8fafc", bgTo: "#f8fafc", panel: "#ffffff", border: "#e2e8f0", text: "#1e293b", accent: "#3b82f6" },
          dark:  { bgFrom: "#0a1020", bgTo: "#0a1020", panel: "#131c33", border: "#29395f", text: "#dbeafe", accent: "#7dd3fc" },
        },
      },
      {
        slot: "warm",
        themeId: "clean-warm",
        name: "Warm",
        description: "Stone canvas, amber accent",
        palette: {
          light: { bgFrom: "#fafaf9", bgTo: "#fafaf9", panel: "#ffffff", border: "#e7e5e4", text: "#292524", accent: "#b45309" },
          dark:  { bgFrom: "#21130c", bgTo: "#21130c", panel: "#302016", border: "#6b3f21", text: "#f8dfc6", accent: "#f59e0b" },
        },
      },
      {
        slot: "cool",
        themeId: "clean-cool",
        name: "Cool",
        description: "Sky canvas, cyan accent",
        palette: {
          light: { bgFrom: "#f0f9ff", bgTo: "#f0f9ff", panel: "#ffffff", border: "#e0f2fe", text: "#0c4a6e", accent: "#0891b2" },
          dark:  { bgFrom: "#061823", bgTo: "#061823", panel: "#0c2733", border: "#145066", text: "#cffafe", accent: "#22d3ee" },
        },
      },
    ],
  },

  editorial: {
    name: "Editorial",
    description: "Refined typography, hairline borders, paper feel. Stripe / Substack / Mirror publication aesthetic.",
    structure: {
      radius: 4,
      blur: 0,
      shadow: "hairline",
      surface: "paper",
      iconography: "thin",
      density: "comfortable",
    },
    variants: [
      {
        slot: "academic",
        themeId: "editorial-academic",
        name: "Academic",
        description: "Stone-paper canvas, royal-blue ink",
        palette: {
          light: { bgFrom: "#fafaf9", bgTo: "#fafaf9", panel: "#ffffff", border: "#d6d3d1", text: "#1c1917", accent: "#1d4ed8" },
          dark:  { bgFrom: "#101624", bgTo: "#101624", panel: "#182033", border: "#3b4b6a", text: "#eef2ff", accent: "#93c5fd" },
        },
      },
      {
        slot: "noir",
        themeId: "editorial-noir",
        name: "Noir",
        description: "High-contrast black-on-stone with crimson accent",
        palette: {
          light: { bgFrom: "#f5f5f4", bgTo: "#f5f5f4", panel: "#fafaf9", border: "#262626", text: "#0a0a0a", accent: "#dc2626" },
          dark:  { bgFrom: "#050303", bgTo: "#050303", panel: "#12090a", border: "#3f171c", text: "#fff1f2", accent: "#fca5a5" },
        },
      },
      {
        slot: "warm",
        themeId: "editorial-warm",
        name: "Warm",
        description: "Cream paper, sienna ink",
        palette: {
          light: { bgFrom: "#fff7ed", bgTo: "#fff7ed", panel: "#ffffff", border: "#fed7aa", text: "#451a03", accent: "#b45309" },
          dark:  { bgFrom: "#241207", bgTo: "#241207", panel: "#321d0f", border: "#7c3f12", text: "#ffedd5", accent: "#fdba74" },
        },
      },
      {
        slot: "technical",
        themeId: "editorial-technical",
        name: "Technical",
        description: "Slate canvas with engineering-doc restraint",
        palette: {
          light: { bgFrom: "#f8fafc", bgTo: "#f8fafc", panel: "#ffffff", border: "#cbd5e1", text: "#0f172a", accent: "#475569" },
          dark:  { bgFrom: "#06111f", bgTo: "#06111f", panel: "#0b1b2f", border: "#1d4a6d", text: "#dbeafe", accent: "#67e8f9" },
        },
      },
    ],
  },

  neon: {
    name: "Neon",
    description: "Dark canonical view with vibrant accent. Sharp corners, glow shadows. Vercel / Replicate dev-tool aesthetic.",
    structure: {
      radius: 6,
      blur: 0,
      shadow: "glow",
      surface: "dark-solid",
      iconography: "regular",
      density: "compact",
    },
    variants: [
      {
        slot: "cyan",
        themeId: "neon-cyan",
        name: "Cyan",
        description: "Cyber-cyan accent on charcoal",
        palette: {
          light: { bgFrom: "#fafafa", bgTo: "#fafafa", panel: "#ffffff", border: "#e5e5e5", text: "#0a0a0a", accent: "#06b6d4" },
          dark:  { bgFrom: "#041014", bgTo: "#041014", panel: "#071820", border: "#124655", text: "#dffaff", accent: "#06b6d4" },
        },
      },
      {
        slot: "pink",
        themeId: "neon-pink",
        name: "Pink",
        description: "Hot-pink accent on charcoal",
        palette: {
          light: { bgFrom: "#fafafa", bgTo: "#fafafa", panel: "#ffffff", border: "#e5e5e5", text: "#0a0a0a", accent: "#ec4899" },
          dark:  { bgFrom: "#160812", bgTo: "#160812", panel: "#210d1b", border: "#6d1d46", text: "#ffe4f1", accent: "#ec4899" },
        },
      },
      {
        slot: "lime",
        themeId: "neon-lime",
        name: "Lime",
        description: "Lime-green accent on charcoal",
        palette: {
          light: { bgFrom: "#fafafa", bgTo: "#fafafa", panel: "#ffffff", border: "#e5e5e5", text: "#0a0a0a", accent: "#84cc16" },
          dark:  { bgFrom: "#0c1404", bgTo: "#0c1404", panel: "#121d08", border: "#3f6212", text: "#ecfccb", accent: "#84cc16" },
        },
      },
      {
        slot: "plasma",
        themeId: "neon-plasma",
        name: "Plasma",
        description: "Plasma-orange + magenta two-tone",
        palette: {
          light: { bgFrom: "#fafafa", bgTo: "#fafafa", panel: "#ffffff", border: "#e5e5e5", text: "#0a0a0a", accent: "#f97316" },
          dark:  { bgFrom: "#190b05", bgTo: "#190b05", panel: "#241008", border: "#7c2d12", text: "#ffedd5", accent: "#f97316" },
        },
      },
    ],
  },
};

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
