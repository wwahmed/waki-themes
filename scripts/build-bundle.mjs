#!/usr/bin/env node
/**
 * Build dist/themes.json: a versioned bundle of every theme CSS in
 * styles/, plus a manifest of theme metadata. Consuming apps fetch
 * this URL on boot:
 *
 *   https://raw.githubusercontent.com/wwahmed/waki-themes/main/dist/themes.json
 *
 * Cache it locally, refresh periodically (default 6h), and apply the
 * latest version. The shape mirrors what frontend/src/lib/themeLoader
 * expects so consumers can map id -> css directly.
 *
 * Run:    node scripts/build-bundle.mjs
 * Output: dist/themes.json
 */

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { FAMILIES, VARIANT_BY_THEME_ID } from "../src/themes/families.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");

function gitSha() {
  try {
    return execFileSync("git", ["rev-parse", "HEAD"], {
      cwd: repoRoot,
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
  } catch {
    return "unknown";
  }
}

function pkgVersion() {
  try {
    const pkg = JSON.parse(readFileSync(resolve(repoRoot, "package.json"), "utf8"));
    return typeof pkg.version === "string" ? pkg.version : "0.0.0";
  } catch {
    return "0.0.0";
  }
}

// id -> { name, description, vibe }. Mirrors waki-brain's
// AVAILABLE_THEMES so consumers don't have to maintain a parallel
// metadata table. Edit this when adding a new theme file.
const META = {
  "glass-plus": { name: "Glass Plus", description: "Glass with the dial turned up - violet wash, default", vibe: "glass" },
  "glass-v2": { name: "Glass", description: "Frosted glass + drift, calmer alternative", vibe: "glass" },
  "glass-v1": { name: "Glass Lite", description: "Frosted glass with violet undertone in dark", vibe: "glass" },
  "glass-v3": { name: "Aurora", description: "Tinted glass on aurora blobs", vibe: "glass" },
  "glass-extreme": { name: "Glass Extreme", description: "Ultra-translucent iOS look", vibe: "glass" },
  "frosted-glass": { name: "Frosted", description: "Heavy teal/cyan frost", vibe: "glass" },
  midnight: { name: "Midnight", description: "Glowing-edge dark cards", vibe: "neon" },
  neon: { name: "Neon", description: "Cyberpunk neon outlines + glow", vibe: "neon" },
  ocean: { name: "Ocean", description: "Layered wave-crest cards", vibe: "matte" },
  sunset: { name: "Sunset", description: "Warm gradient cards", vibe: "matte" },
  forest: { name: "Forest", description: "Paper texture, organic edges", vibe: "nature" },
  sakura: { name: "Sakura", description: "Hand-drawn dashed borders", vibe: "nature" },
  arctic: { name: "Arctic", description: "Glacial hairlines, sky-cyan accent", vibe: "matte" },
  lavender: { name: "Lavender", description: "Soft mesh-gradient cards", vibe: "soft" },
  "rose-gold": { name: "Rose Gold", description: "Brushed-metal sheen", vibe: "metal" },
  copper: { name: "Copper", description: "Embossed bronze", vibe: "metal" },
  emerald: { name: "Emerald", description: "Floating-island cards", vibe: "soft" },
  neumorphism: { name: "Soft UI", description: "Extruded dual-shadow surfaces", vibe: "soft" },
  "slate-modern": { name: "Slate", description: "Sharp angular precision", vibe: "matte" },
  nord: { name: "Nord", description: "Muted Nordic, cozy", vibe: "matte" },
  flat: { name: "Flat", description: "Royal-blue solid panels", vibe: "matte" },
};

const stylesDir = resolve(repoRoot, "styles");
const baseCss = readFileSync(resolve(stylesDir, "base.css"), "utf8");

const themes = {};
for (const id of Object.keys(META)) {
  const filePath = resolve(stylesDir, `${id}.css`);
  try {
    const variantInfo = VARIANT_BY_THEME_ID[id];
    themes[id] = {
      ...META[id],
      css: readFileSync(filePath, "utf8"),
      // Each flat theme entry now carries family/variant cross-references
      // alongside its existing fields. Field set is additive: existing
      // consumers that read `name` / `description` / `vibe` / `css` keep
      // working; new consumers can read `family` / `variantSlot` to render
      // the grouped picker.
      family: variantInfo ? variantInfo.familyId : null,
      familyName: variantInfo ? variantInfo.familyName : null,
      variantSlot: variantInfo ? variantInfo.slot : null,
      variantName: variantInfo ? variantInfo.variantName : null,
    };
  } catch (err) {
    console.warn(`[skip] ${id}: ${err.message}`);
  }
}

// Build the grouped shape: families[familyId] -> { name, description,
// structure, variants: [...] }. Each variant references its flat themeId so
// the studio + future consumers can resolve a variant to its CSS without
// duplicating it in this section.
const families = {};
for (const [familyId, family] of Object.entries(FAMILIES)) {
  const variants = family.variants
    .filter((v) => themes[v.themeId])
    .map((v) => ({
      slot: v.slot,
      themeId: v.themeId,
      name: v.name,
      description: v.description,
      palette: v.palette,
    }));
  if (!variants.length) continue;
  families[familyId] = {
    name: family.name,
    description: family.description,
    structure: family.structure,
    variants,
  };
}

// schemaVersion stays 1 because the existing fields are unchanged. Any
// consumer can detect the new grouping by checking for the presence of
// `families` in the bundle. pkgVersion in package.json bumps on each
// schema-additive change so cache-aware consumers can refresh when the
// new fields land.
const bundle = {
  schemaVersion: 1,
  pkgVersion: pkgVersion(),
  gitSha: gitSha(),
  builtAt: new Date().toISOString(),
  base: baseCss,
  themes,
  families,
};

const out = resolve(repoRoot, "dist", "themes.json");
writeFileSync(out, JSON.stringify(bundle, null, 2));
console.log(
  `[ok] wrote ${out} (${Object.keys(themes).length} themes across ${Object.keys(families).length} families, ${(JSON.stringify(bundle).length / 1024).toFixed(1)} KB)`,
);
