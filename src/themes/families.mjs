// ============================================================================
// waki-themes / families.mjs
// ----------------------------------------------------------------------------
// Family / variant taxonomy. Existing flat theme IDs (glass-v2, flat, etc.)
// stay the source of truth so consumers that pick by flat ID keep working
// untouched. This file groups them into a two-axis structure that the bundle
// builder + Theme Studio use for the new picker UX.
//
// Shape:
//
//   FAMILIES[familyId] = {
//     name, description,
//     structure: { radius, blur, shadow, surface, iconography, density },
//     variants: [
//       {
//         slot,       // local id within the family (e.g. "plus")
//         themeId,    // the canonical flat id consumers already use
//         name,       // display name within the family ("Plus")
//         description,
//         palette: { light: {...}, dark: {...} } // hint values, not authoritative
//       }
//     ]
//   }
//
// `structure` carries the family's structural identity: corner radius, blur,
// shadow language, surface treatment, iconography weight, layout density.
// These are the knobs the studio's family-level tab edits, and a family-level
// edit propagates to every variant in the family.
//
// `palette` is purely advisory hint values. The hand-authored CSS in styles/
// remains the rendered truth; palette here lets the studio render miniature
// previews and seed the variant editor's sliders without parsing CSS.
//
// All structural numerics here mirror what the corresponding CSS file
// actually paints. If you re-tune a CSS file, update the family hint here so
// the studio's family-level slider starts in the right neighbourhood.
// ============================================================================

export const FAMILIES = {
  glass: {
    name: "Glass",
    description: "Layered translucent panels with backdrop blur. Visible depth from stacked surfaces.",
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
        description: "Frosted glass + drift, calmer alternative",
        palette: {
          light: {
            bgFrom: "#e8eef5",
            bgTo: "#eef2f8",
            panel: "rgba(255, 255, 255, 0.6)",
            border: "rgba(15, 23, 42, 0.08)",
            text: "#0f172a",
            accent: "#6366f1",
          },
          dark: {
            bgFrom: "#0c1220",
            bgTo: "#0f1a2e",
            panel: "rgba(255, 255, 255, 0.06)",
            border: "rgba(255, 255, 255, 0.1)",
            text: "#f1f5f9",
            accent: "#6366f1",
          },
        },
      },
      {
        slot: "plus",
        themeId: "glass-plus",
        name: "Plus",
        description: "Glass with the dial turned up, violet wash, default",
        palette: {
          light: {
            bgFrom: "#eef0fb",
            bgTo: "#f3eaf8",
            panel: "rgba(243, 235, 255, 0.72)",
            border: "rgba(168, 85, 247, 0.22)",
            text: "#0f172a",
            accent: "#a855f7",
          },
          dark: {
            bgFrom: "#100b24",
            bgTo: "#1a1640",
            panel: "rgba(168, 85, 247, 0.1)",
            border: "rgba(168, 85, 247, 0.26)",
            text: "#f1f5f9",
            accent: "#a855f7",
          },
        },
      },
      {
        slot: "lite",
        themeId: "glass-v1",
        name: "Lite",
        description: "Frosted glass with violet undertone in dark",
        palette: {
          light: {
            bgFrom: "#e8eef5",
            bgTo: "#eef2f8",
            panel: "rgba(255, 255, 255, 0.55)",
            border: "rgba(15, 23, 42, 0.06)",
            text: "#0f172a",
            accent: "#8b5cf6",
          },
          dark: {
            bgFrom: "#0c1220",
            bgTo: "#0f1a2e",
            panel: "rgba(255, 255, 255, 0.04)",
            border: "rgba(255, 255, 255, 0.08)",
            text: "#f1f5f9",
            accent: "#8b5cf6",
          },
        },
      },
      {
        slot: "aurora",
        themeId: "glass-v3",
        name: "Aurora",
        description: "Tinted glass on aurora blobs",
        palette: {
          light: {
            bgFrom: "#e0eaff",
            bgTo: "#fce7f3",
            panel: "rgba(255, 255, 255, 0.55)",
            border: "rgba(99, 102, 241, 0.18)",
            text: "#0f172a",
            accent: "#6366f1",
          },
          dark: {
            bgFrom: "#0a1428",
            bgTo: "#1c1647",
            panel: "rgba(99, 102, 241, 0.1)",
            border: "rgba(99, 102, 241, 0.22)",
            text: "#f1f5f9",
            accent: "#6366f1",
          },
        },
      },
      {
        slot: "extreme",
        themeId: "glass-extreme",
        name: "Extreme",
        description: "Ultra-translucent iOS look",
        palette: {
          light: {
            bgFrom: "#dbeafe",
            bgTo: "#fce7f3",
            panel: "rgba(255, 255, 255, 0.4)",
            border: "rgba(255, 255, 255, 0.5)",
            text: "#0f172a",
            accent: "#0ea5e9",
          },
          dark: {
            bgFrom: "#0c1428",
            bgTo: "#1f1847",
            panel: "rgba(255, 255, 255, 0.06)",
            border: "rgba(255, 255, 255, 0.12)",
            text: "#f8fafc",
            accent: "#0ea5e9",
          },
        },
      },
      {
        slot: "frosted",
        themeId: "frosted-glass",
        name: "Frosted",
        description: "Heavy teal/cyan frost",
        palette: {
          light: {
            bgFrom: "#cffafe",
            bgTo: "#a5f3fc",
            panel: "rgba(255, 255, 255, 0.55)",
            border: "rgba(14, 165, 233, 0.2)",
            text: "#0f172a",
            accent: "#06b6d4",
          },
          dark: {
            bgFrom: "#082f49",
            bgTo: "#0c4a6e",
            panel: "rgba(14, 165, 233, 0.12)",
            border: "rgba(14, 165, 233, 0.26)",
            text: "#f1f5f9",
            accent: "#06b6d4",
          },
        },
      },
    ],
  },

  flat: {
    name: "Flat",
    description: "Solid panels with visible borders and real shadows. No blur, no glints.",
    structure: {
      radius: 6,
      blur: 0,
      shadow: "drop",
      surface: "solid",
      iconography: "regular",
      density: "compact",
    },
    variants: [
      {
        slot: "default",
        themeId: "flat",
        name: "Default",
        description: "Royal-blue solid panels",
        palette: {
          light: {
            bgFrom: "#f8fafc",
            bgTo: "#f1f5f9",
            panel: "#ffffff",
            border: "rgba(15, 23, 42, 0.12)",
            text: "#0f172a",
            accent: "#3b82f6",
          },
          dark: {
            bgFrom: "#0f172a",
            bgTo: "#1e293b",
            panel: "#1e293b",
            border: "rgba(148, 163, 184, 0.2)",
            text: "#f1f5f9",
            accent: "#3b82f6",
          },
        },
      },
      {
        slot: "slate",
        themeId: "slate-modern",
        name: "Slate",
        description: "Sharp angular precision",
        palette: {
          light: {
            bgFrom: "#f1f5f9",
            bgTo: "#e2e8f0",
            panel: "rgba(255, 255, 255, 0.96)",
            border: "rgba(15, 23, 42, 0.12)",
            text: "#0f172a",
            accent: "#64748b",
          },
          dark: {
            bgFrom: "#0f172a",
            bgTo: "#1e293b",
            panel: "rgba(30, 41, 59, 0.85)",
            border: "rgba(148, 163, 184, 0.18)",
            text: "#f1f5f9",
            accent: "#64748b",
          },
        },
      },
      {
        slot: "nord",
        themeId: "nord",
        name: "Nord",
        description: "Muted Nordic, cozy",
        palette: {
          light: {
            bgFrom: "#eceff4",
            bgTo: "#e5e9f0",
            panel: "rgba(255, 255, 255, 0.92)",
            border: "rgba(46, 52, 64, 0.12)",
            text: "#2e3440",
            accent: "#5e81ac",
          },
          dark: {
            bgFrom: "#2e3440",
            bgTo: "#3b4252",
            panel: "rgba(76, 86, 106, 0.6)",
            border: "rgba(216, 222, 233, 0.12)",
            text: "#eceff4",
            accent: "#5e81ac",
          },
        },
      },
      {
        slot: "arctic",
        themeId: "arctic",
        name: "Arctic",
        description: "Glacial hairlines, sky-cyan accent",
        palette: {
          light: {
            bgFrom: "#f0f9ff",
            bgTo: "#e0f2fe",
            panel: "rgba(255, 255, 255, 0.9)",
            border: "rgba(56, 189, 248, 0.2)",
            text: "#0c4a6e",
            accent: "#0ea5e9",
          },
          dark: {
            bgFrom: "#0c1426",
            bgTo: "#0a1f3a",
            panel: "rgba(56, 189, 248, 0.08)",
            border: "rgba(56, 189, 248, 0.22)",
            text: "#e0f2fe",
            accent: "#0ea5e9",
          },
        },
      },
    ],
  },

  soft: {
    name: "Soft",
    description: "Extruded surfaces with dual shadows. Cards feel like they rise out of the page.",
    structure: {
      radius: 16,
      blur: 4,
      shadow: "neumorphic",
      surface: "extruded",
      iconography: "rounded",
      density: "comfortable",
    },
    variants: [
      {
        slot: "ui",
        themeId: "neumorphism",
        name: "UI",
        description: "Extruded dual-shadow surfaces",
        palette: {
          light: {
            bgFrom: "#e0e5ec",
            bgTo: "#e0e5ec",
            panel: "#e0e5ec",
            border: "transparent",
            text: "#1e293b",
            accent: "#6366f1",
          },
          dark: {
            bgFrom: "#1e2228",
            bgTo: "#1e2228",
            panel: "#1e2228",
            border: "transparent",
            text: "#e2e8f0",
            accent: "#6366f1",
          },
        },
      },
      {
        slot: "lavender",
        themeId: "lavender",
        name: "Lavender",
        description: "Soft mesh-gradient cards",
        palette: {
          light: {
            bgFrom: "#ede9fe",
            bgTo: "#ddd6fe",
            panel: "rgba(255, 255, 255, 0.78)",
            border: "rgba(167, 139, 250, 0.22)",
            text: "#3b0764",
            accent: "#a78bfa",
          },
          dark: {
            bgFrom: "#1e1b3a",
            bgTo: "#2d1f4a",
            panel: "rgba(167, 139, 250, 0.14)",
            border: "rgba(167, 139, 250, 0.26)",
            text: "#ede9fe",
            accent: "#a78bfa",
          },
        },
      },
      {
        slot: "emerald",
        themeId: "emerald",
        name: "Emerald",
        description: "Floating-island cards",
        palette: {
          light: {
            bgFrom: "#d1fae5",
            bgTo: "#a7f3d0",
            panel: "rgba(255, 255, 255, 0.85)",
            border: "rgba(16, 185, 129, 0.24)",
            text: "#064e3b",
            accent: "#10b981",
          },
          dark: {
            bgFrom: "#022c22",
            bgTo: "#064e3b",
            panel: "rgba(16, 185, 129, 0.14)",
            border: "rgba(16, 185, 129, 0.28)",
            text: "#d1fae5",
            accent: "#10b981",
          },
        },
      },
      {
        slot: "rose-gold",
        themeId: "rose-gold",
        name: "Rose Gold",
        description: "Brushed-metal sheen",
        palette: {
          light: {
            bgFrom: "#ffe4e6",
            bgTo: "#fbcfe8",
            panel: "rgba(255, 245, 240, 0.85)",
            border: "rgba(244, 114, 182, 0.3)",
            text: "#881337",
            accent: "#fb7185",
          },
          dark: {
            bgFrom: "#3a1820",
            bgTo: "#581c30",
            panel: "rgba(251, 113, 133, 0.18)",
            border: "rgba(251, 113, 133, 0.32)",
            text: "#ffe4e6",
            accent: "#fb7185",
          },
        },
      },
      {
        slot: "copper",
        themeId: "copper",
        name: "Copper",
        description: "Embossed bronze",
        palette: {
          light: {
            bgFrom: "#fed7aa",
            bgTo: "#fbbf24",
            panel: "rgba(255, 247, 237, 0.88)",
            border: "rgba(217, 119, 6, 0.32)",
            text: "#7c2d12",
            accent: "#d97706",
          },
          dark: {
            bgFrom: "#3a1c0a",
            bgTo: "#581c0d",
            panel: "rgba(217, 119, 6, 0.18)",
            border: "rgba(217, 119, 6, 0.32)",
            text: "#fed7aa",
            accent: "#d97706",
          },
        },
      },
    ],
  },

  bold: {
    name: "Bold",
    description: "High-contrast colour statements. Glows, saturated gradients, vibrant accents.",
    structure: {
      radius: 12,
      blur: 0,
      shadow: "glow",
      surface: "saturated",
      iconography: "regular",
      density: "comfortable",
    },
    variants: [
      {
        slot: "neon",
        themeId: "neon",
        name: "Neon",
        description: "Cyberpunk neon outlines and glow",
        palette: {
          light: {
            bgFrom: "#0a0118",
            bgTo: "#1a0529",
            panel: "rgba(15, 23, 42, 0.6)",
            border: "rgba(236, 72, 153, 0.5)",
            text: "#f0abfc",
            accent: "#ec4899",
          },
          dark: {
            bgFrom: "#000000",
            bgTo: "#0a0118",
            panel: "rgba(0, 0, 0, 0.7)",
            border: "rgba(236, 72, 153, 0.5)",
            text: "#f0abfc",
            accent: "#ec4899",
          },
        },
      },
      {
        slot: "midnight",
        themeId: "midnight",
        name: "Midnight",
        description: "Glowing-edge dark cards",
        palette: {
          light: {
            bgFrom: "#0f172a",
            bgTo: "#1e293b",
            panel: "rgba(30, 41, 59, 0.85)",
            border: "rgba(99, 102, 241, 0.4)",
            text: "#f1f5f9",
            accent: "#6366f1",
          },
          dark: {
            bgFrom: "#020617",
            bgTo: "#0f172a",
            panel: "rgba(15, 23, 42, 0.85)",
            border: "rgba(99, 102, 241, 0.4)",
            text: "#f1f5f9",
            accent: "#6366f1",
          },
        },
      },
      {
        slot: "ocean",
        themeId: "ocean",
        name: "Ocean",
        description: "Layered wave-crest cards",
        palette: {
          light: {
            bgFrom: "#dbeafe",
            bgTo: "#bfdbfe",
            panel: "rgba(255, 255, 255, 0.85)",
            border: "rgba(59, 130, 246, 0.2)",
            text: "#0c4a6e",
            accent: "#0284c7",
          },
          dark: {
            bgFrom: "#0c4a6e",
            bgTo: "#082f49",
            panel: "rgba(14, 116, 144, 0.4)",
            border: "rgba(14, 165, 233, 0.3)",
            text: "#e0f2fe",
            accent: "#0284c7",
          },
        },
      },
      {
        slot: "sunset",
        themeId: "sunset",
        name: "Sunset",
        description: "Warm gradient cards",
        palette: {
          light: {
            bgFrom: "#fed7aa",
            bgTo: "#fbcfe8",
            panel: "rgba(255, 255, 255, 0.85)",
            border: "rgba(244, 114, 182, 0.3)",
            text: "#7c2d12",
            accent: "#f97316",
          },
          dark: {
            bgFrom: "#451a03",
            bgTo: "#581c87",
            panel: "rgba(244, 114, 182, 0.18)",
            border: "rgba(244, 114, 182, 0.4)",
            text: "#fce7f3",
            accent: "#f97316",
          },
        },
      },
    ],
  },

  organic: {
    name: "Organic",
    description: "Textured, paper-like surfaces. Hand-drawn edges, natural materials.",
    structure: {
      radius: 12,
      blur: 0,
      shadow: "paper",
      surface: "textured",
      iconography: "regular",
      density: "comfortable",
    },
    variants: [
      {
        slot: "forest",
        themeId: "forest",
        name: "Forest",
        description: "Paper texture, organic edges",
        palette: {
          light: {
            bgFrom: "#dcfce7",
            bgTo: "#d9f99d",
            panel: "rgba(255, 252, 240, 0.92)",
            border: "rgba(101, 163, 13, 0.25)",
            text: "#14532d",
            accent: "#65a30d",
          },
          dark: {
            bgFrom: "#0a1c0a",
            bgTo: "#1a3a1a",
            panel: "rgba(34, 84, 46, 0.4)",
            border: "rgba(132, 204, 22, 0.32)",
            text: "#dcfce7",
            accent: "#65a30d",
          },
        },
      },
      {
        slot: "sakura",
        themeId: "sakura",
        name: "Sakura",
        description: "Hand-drawn dashed borders",
        palette: {
          light: {
            bgFrom: "#fce7f3",
            bgTo: "#fbcfe8",
            panel: "rgba(255, 255, 255, 0.95)",
            border: "rgba(244, 114, 182, 0.4)",
            text: "#831843",
            accent: "#ec4899",
          },
          dark: {
            bgFrom: "#27182f",
            bgTo: "#3a1c4a",
            panel: "rgba(244, 114, 182, 0.18)",
            border: "rgba(244, 114, 182, 0.4)",
            text: "#fce7f3",
            accent: "#ec4899",
          },
        },
      },
    ],
  },
};

// Reverse lookup: flat themeId -> { familyId, slot, variant ref }. Built once
// at import time so consumers can resolve a flat id to its family without
// scanning. The studio uses this to render the family chip on each tile.
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
