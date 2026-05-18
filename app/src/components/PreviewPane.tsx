import { Edit3, Copy, Download, Moon, Sun } from "lucide-react";
import { MINIATURE_HTML, PREVIEW_HTML } from "../lib/sample";
import { PreviewFrame } from "./PreviewFrame";
import type { StudioTheme } from "../lib/types";

interface PreviewPaneProps {
  theme: StudioTheme;
  themes: StudioTheme[];
  mode: "light" | "dark";
  onEdit: () => void;
  onModeChange: (m: "light" | "dark") => void;
  onThemeChange: (id: string) => void;
}

export function PreviewPane({
  theme,
  themes,
  mode,
  onEdit,
  onModeChange,
  onThemeChange,
}: PreviewPaneProps) {
  const copyEmbed = async () => {
    const snippet = `<link rel="stylesheet" href="https://raw.githubusercontent.com/wwahmed/waki-themes/main/styles/base.css" />
<link rel="stylesheet" href="https://raw.githubusercontent.com/wwahmed/waki-themes/main/styles/${theme.id}.css" />`;
    await navigator.clipboard.writeText(snippet);
  };

  const downloadCss = () => {
    const blob = new Blob([theme.baseCss], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${theme.id}.css`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  };

  return (
    <div className="studio-panel overflow-hidden flex flex-col h-[calc(100vh-92px)]">
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-violet-500/15 flex-wrap">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-base truncate">{theme.name}</h2>
            <span className="studio-chip">{theme.vibe}</span>
            {!theme.builtIn && <span className="studio-chip">custom</span>}
          </div>
          <div className="text-xs opacity-65 truncate">{theme.description}</div>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <LookSwitch
            theme={theme}
            themes={themes}
            mode={mode}
            onThemeChange={onThemeChange}
            onModeChange={onModeChange}
          />
          <span className="w-px h-5 bg-violet-500/20 mx-1" />
          <button onClick={copyEmbed} className="studio-button text-xs" title="Copy embed snippet">
            <Copy className="w-3.5 h-3.5" />
            Embed
          </button>
          <button onClick={downloadCss} className="studio-button text-xs" title="Download CSS">
            <Download className="w-3.5 h-3.5" />
            CSS
          </button>
          <button onClick={onEdit} className="studio-button studio-button-primary text-xs">
            <Edit3 className="w-3.5 h-3.5" />
            Edit
          </button>
        </div>
      </div>
      <div className="flex-1">
        <PreviewFrame
          baseCss={theme.baseCss}
          html={PREVIEW_HTML}
          mode={mode}
          ariaLabel={`Live preview of ${theme.name}`}
        />
      </div>
    </div>
  );
}

function LookSwitch({
  theme,
  themes,
  mode,
  onThemeChange,
  onModeChange,
}: {
  theme: StudioTheme;
  themes: StudioTheme[];
  mode: "light" | "dark";
  onThemeChange: (id: string) => void;
  onModeChange: (m: "light" | "dark") => void;
}) {
  return (
    <div className="look-switch">
      <div className="look-switch-preview" aria-hidden="true">
        <PreviewFrame
          baseCss={theme.baseCss}
          html={MINIATURE_HTML}
          mode={mode}
          scale={0.2}
          ariaLabel={`${theme.name} miniature`}
        />
      </div>
      <label className="look-switch-select">
        <span>Look</span>
        <select value={theme.id} onChange={(event) => onThemeChange(event.target.value)}>
          {themes.map((candidate) => (
            <option key={candidate.id} value={candidate.id}>
              {candidate.name}
            </option>
          ))}
        </select>
      </label>
      <div className="look-mode" aria-label="Color mode">
        <button
          onClick={() => onModeChange("light")}
          className={mode === "light" ? "active" : ""}
          aria-label="Use light mode"
          title="Light"
        >
          <Sun className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onModeChange("dark")}
          className={mode === "dark" ? "active" : ""}
          aria-label="Use dark mode"
          title="Dark"
        >
          <Moon className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
