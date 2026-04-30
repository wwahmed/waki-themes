// Shape of dist/themes.json. Mirrors scripts/build-bundle.mjs output.
export interface ThemeBundleEntry {
  name: string;
  description: string;
  vibe: string;
  css: string;
}

export interface ThemeBundle {
  schemaVersion: number;
  pkgVersion: string;
  gitSha: string;
  builtAt: string;
  base: string;
  themes: Record<string, ThemeBundleEntry>;
}

// Studio-side overlay tokens. Applied as a layer of CSS rules on top
// of the base theme CSS to let the user tweak high-impact knobs
// without forking the underlying stylesheet. See
// lib/overrideCss.ts for how these get serialised.
export interface OverrideTokens {
  // Page background gradient stops (light + dark variants).
  bgFromLight: string;
  bgToLight: string;
  bgFromDark: string;
  bgToDark: string;
  // Panel surface fill (rgba allowed). Light + dark.
  panelLight: string;
  panelDark: string;
  // Border colour on panels.
  borderLight: string;
  borderDark: string;
  // Text colour on body. Light + dark.
  textLight: string;
  textDark: string;
  // Accent colour. Used for the chip outline + the primary button.
  accent: string;
  // Numeric tokens.
  radiusPx: number;
  blurPx: number;
}

export interface StudioTheme {
  id: string;
  name: string;
  description: string;
  vibe: string;
  // The base CSS the studio renders. For built-in themes this is the
  // string from dist/themes.json. For user-created themes this is the
  // generated overlay CSS (since they have no hand-authored base).
  baseCss: string;
  // True if this is a hand-authored theme shipped in the repo. False
  // for themes the user invented in the studio session.
  builtIn: boolean;
  // Optional starting overrides for user-created themes.
  overrides?: OverrideTokens;
}
