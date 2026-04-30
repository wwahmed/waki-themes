import { useMemo, useState } from "react";
import { ArrowLeft, Copy, Download, Save, Sun, Moon, FileCode } from "lucide-react";
import type { OverrideTokens, StudioTheme } from "../lib/types";
import { buildOverrideCss, buildStandaloneThemeCss } from "../lib/overrideCss";
import { reportContrasts } from "../lib/contrast";
import { PREVIEW_HTML } from "../lib/sample";
import { PreviewFrame } from "./PreviewFrame";
import { ContrastReport } from "./ContrastReport";

interface EditorProps {
  theme: StudioTheme;
  initialOverrides: OverrideTokens;
  mode: "light" | "dark";
  onBack: () => void;
  onSave: (id: string, name: string, description: string, overrides: OverrideTokens) => void;
  onModeChange: (m: "light" | "dark") => void;
  defaultName?: string;
  isNew?: boolean;
}

const COLOR_FIELDS: Array<{ key: keyof OverrideTokens; label: string; group: "Light" | "Dark" | "Accent" }> = [
  { key: "bgFromLight", label: "Page bg from", group: "Light" },
  { key: "bgToLight", label: "Page bg to", group: "Light" },
  { key: "panelLight", label: "Panel surface", group: "Light" },
  { key: "borderLight", label: "Border", group: "Light" },
  { key: "textLight", label: "Text", group: "Light" },
  { key: "bgFromDark", label: "Page bg from", group: "Dark" },
  { key: "bgToDark", label: "Page bg to", group: "Dark" },
  { key: "panelDark", label: "Panel surface", group: "Dark" },
  { key: "borderDark", label: "Border", group: "Dark" },
  { key: "textDark", label: "Text", group: "Dark" },
  { key: "accent", label: "Accent", group: "Accent" },
];

export function Editor({
  theme,
  initialOverrides,
  mode,
  onBack,
  onSave,
  onModeChange,
  defaultName,
  isNew = false,
}: EditorProps) {
  const [overrides, setOverrides] = useState<OverrideTokens>(initialOverrides);
  const [name, setName] = useState(defaultName ?? `${theme.name}${isNew ? "" : " Custom"}`);
  const [description, setDescription] = useState(theme.description);
  const [savedHint, setSavedHint] = useState<string | null>(null);

  const overrideCss = useMemo(() => buildOverrideCss(overrides), [overrides]);
  const standaloneCss = useMemo(
    () => buildStandaloneThemeCss(overrides, name),
    [overrides, name],
  );

  const reports = useMemo(
    () =>
      reportContrasts({
        textLight: overrides.textLight,
        textDark: overrides.textDark,
        panelLight: overrides.panelLight,
        panelDark: overrides.panelDark,
        bgFromLight: overrides.bgFromLight,
        bgFromDark: overrides.bgFromDark,
        accent: overrides.accent,
      }),
    [overrides],
  );

  const update = <K extends keyof OverrideTokens>(k: K, v: OverrideTokens[K]) => {
    setOverrides((prev) => ({ ...prev, [k]: v }));
    setSavedHint(null);
  };

  const slugify = (s: string) =>
    s
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40);

  const handleSave = () => {
    const id = slugify(name) || `theme-${Date.now()}`;
    onSave(id, name, description, overrides);
    setSavedHint(`Saved as "${name}" in this session.`);
  };

  const downloadFile = (filename: string, content: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  };

  const exportCss = () => {
    const id = slugify(name) || "untitled";
    downloadFile(`${id}.css`, standaloneCss, "text/css");
  };

  const exportJson = () => {
    const id = slugify(name) || "untitled";
    const payload = {
      schemaVersion: 1,
      id,
      name,
      description,
      vibe: theme.vibe,
      overrides,
      generatedAt: new Date().toISOString(),
    };
    downloadFile(`${id}.theme.json`, JSON.stringify(payload, null, 2), "application/json");
  };

  const copyCss = async () => {
    await navigator.clipboard.writeText(standaloneCss);
    setSavedHint("Copied CSS to clipboard.");
  };

  const grouped = {
    Light: COLOR_FIELDS.filter((f) => f.group === "Light"),
    Dark: COLOR_FIELDS.filter((f) => f.group === "Dark"),
    Accent: COLOR_FIELDS.filter((f) => f.group === "Accent"),
  };

  // Compose the live preview CSS: base CSS for built-in themes,
  // standalone-generated CSS for new themes (since they have no base).
  const previewBase = isNew ? "" : theme.baseCss;
  const previewOverrides = isNew ? standaloneCss : overrideCss;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-4 h-[calc(100vh-92px)]">
      <aside className="studio-panel p-4 overflow-y-auto flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="studio-button text-xs px-2 py-1.5">
            <ArrowLeft className="w-3.5 h-3.5" />
            Gallery
          </button>
          <span className="text-xs opacity-60 ml-auto">{isNew ? "New" : "Edit"}</span>
        </div>

        <div>
          <label className="block text-[11px] font-semibold opacity-70 uppercase tracking-wider mb-1">
            Name
          </label>
          <input
            className="studio-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="block text-[11px] font-semibold opacity-70 uppercase tracking-wider mb-1 mt-3">
            Description
          </label>
          <input
            className="studio-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {(["Light", "Dark", "Accent"] as const).map((g) => (
          <section key={g}>
            <h3 className="text-xs font-semibold opacity-80 uppercase tracking-wider mb-2">
              {g}
            </h3>
            <div className="space-y-2">
              {grouped[g].map((field) => (
                <ColorField
                  key={field.key}
                  label={field.label}
                  value={overrides[field.key] as string}
                  onChange={(v) => update(field.key, v as OverrideTokens[typeof field.key])}
                />
              ))}
            </div>
          </section>
        ))}

        <section>
          <h3 className="text-xs font-semibold opacity-80 uppercase tracking-wider mb-2">
            Geometry
          </h3>
          <SliderField
            label="Radius"
            value={overrides.radiusPx}
            onChange={(v) => update("radiusPx", v)}
            min={0}
            max={32}
            unit="px"
          />
          <SliderField
            label="Backdrop blur"
            value={overrides.blurPx}
            onChange={(v) => update("blurPx", v)}
            min={0}
            max={40}
            unit="px"
          />
        </section>

        <section>
          <h3 className="text-xs font-semibold opacity-80 uppercase tracking-wider mb-2">
            Contrast (WCAG AA)
          </h3>
          <ContrastReport reports={reports} />
        </section>

        <div className="flex flex-wrap gap-2 pt-2 border-t border-violet-500/15">
          <button onClick={handleSave} className="studio-button studio-button-primary flex-1">
            <Save className="w-4 h-4" />
            Save in session
          </button>
          <button onClick={exportCss} className="studio-button" title="Download CSS">
            <FileCode className="w-4 h-4" />
            CSS
          </button>
          <button onClick={exportJson} className="studio-button" title="Download token JSON">
            <Download className="w-4 h-4" />
            JSON
          </button>
          <button onClick={copyCss} className="studio-button" title="Copy CSS to clipboard">
            <Copy className="w-4 h-4" />
            Copy
          </button>
        </div>
        {savedHint && <p className="text-xs opacity-70">{savedHint}</p>}
      </aside>

      <main className="studio-panel overflow-hidden flex flex-col">
        <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-violet-500/15">
          <div className="text-xs font-medium opacity-70">Live preview</div>
          <div className="flex gap-1">
            <button
              onClick={() => onModeChange("light")}
              className={`studio-button text-xs ${mode === "light" ? "studio-button-primary" : ""}`}
            >
              <Sun className="w-3.5 h-3.5" />
              Light
            </button>
            <button
              onClick={() => onModeChange("dark")}
              className={`studio-button text-xs ${mode === "dark" ? "studio-button-primary" : ""}`}
            >
              <Moon className="w-3.5 h-3.5" />
              Dark
            </button>
          </div>
        </div>
        <div className="flex-1">
          <PreviewFrame
            baseCss={previewBase}
            overrideCss={previewOverrides}
            html={PREVIEW_HTML}
            mode={mode}
            ariaLabel="Live preview"
          />
        </div>
      </main>
    </div>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  // Convert rgba(...) to its solid hex equivalent for the native
  // colour input, but let the user paste either form into the text
  // field. The visible swatch shows the actual (alpha-aware) colour.
  const hexForPicker = toHexish(value);
  return (
    <label className="flex items-center gap-2">
      <input
        type="color"
        value={hexForPicker}
        onChange={(e) => onChange(e.target.value)}
        className="h-7 w-9 rounded cursor-pointer border-0 p-0 bg-transparent"
        aria-label={`${label} colour picker`}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="studio-input flex-1 text-xs font-mono"
      />
      <span className="text-[10px] font-medium opacity-70 w-20 text-right truncate" title={label}>
        {label}
      </span>
    </label>
  );
}

function SliderField({
  label,
  value,
  onChange,
  min,
  max,
  unit,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  unit: string;
}) {
  return (
    <div className="mb-2">
      <div className="flex items-center justify-between text-xs mb-1">
        <span>{label}</span>
        <span className="font-mono opacity-70">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-violet-500"
      />
    </div>
  );
}

function toHexish(c: string): string {
  const trimmed = c.trim();
  if (/^#[0-9a-fA-F]{3,8}$/.test(trimmed)) {
    if (trimmed.length === 4) {
      return (
        "#" +
        trimmed[1] +
        trimmed[1] +
        trimmed[2] +
        trimmed[2] +
        trimmed[3] +
        trimmed[3]
      );
    }
    return trimmed.slice(0, 7);
  }
  const m = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/.exec(trimmed);
  if (m) {
    const toHex = (n: number) => Math.max(0, Math.min(255, n)).toString(16).padStart(2, "0");
    return `#${toHex(Number(m[1]))}${toHex(Number(m[2]))}${toHex(Number(m[3]))}`;
  }
  return "#000000";
}
