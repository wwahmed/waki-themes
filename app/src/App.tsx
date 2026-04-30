import { useEffect, useMemo, useState } from "react";
import { Github, Moon, Palette, Sun } from "lucide-react";
import { loadBundle, bundleToStudioThemes } from "./lib/loader";
import type { OverrideTokens, StudioTheme, ThemeBundle } from "./lib/types";
import { Gallery } from "./components/Gallery";
import { PreviewPane } from "./components/PreviewPane";
import { Editor } from "./components/Editor";
import { DEFAULT_OVERRIDES, getOverridesForTheme } from "./lib/defaults";
import { buildStandaloneThemeCss } from "./lib/overrideCss";

type Screen = { kind: "gallery" } | { kind: "preview"; id: string } | { kind: "edit"; id: string; isNew: boolean };

const MODE_KEY = "studio:mode";
const SESSION_THEMES_KEY = "studio:session-themes";

export function App() {
  const [bundle, setBundle] = useState<ThemeBundle | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sessionThemes, setSessionThemes] = useState<StudioTheme[]>(() => {
    try {
      const raw = localStorage.getItem(SESSION_THEMES_KEY);
      if (raw) return JSON.parse(raw) as StudioTheme[];
    } catch {
      /* ignore */
    }
    return [];
  });
  const [screen, setScreen] = useState<Screen>({ kind: "gallery" });
  const [mode, setMode] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem(MODE_KEY);
    if (saved === "dark" || saved === "light") return saved;
    return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(mode);
    localStorage.setItem(MODE_KEY, mode);
  }, [mode]);

  useEffect(() => {
    let cancelled = false;
    loadBundle()
      .then((b) => {
        if (!cancelled) setBundle(b);
      })
      .catch((e: unknown) => {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(SESSION_THEMES_KEY, JSON.stringify(sessionThemes));
  }, [sessionThemes]);

  const builtInThemes = useMemo(
    () => (bundle ? bundleToStudioThemes(bundle) : []),
    [bundle],
  );
  const allThemes = useMemo(
    () => [...sessionThemes, ...builtInThemes],
    [sessionThemes, builtInThemes],
  );

  const findTheme = (id: string): StudioTheme | undefined => allThemes.find((t) => t.id === id);

  const handleSaveTheme = (
    id: string,
    name: string,
    description: string,
    overrides: OverrideTokens,
  ) => {
    const baseExisting = builtInThemes.find((t) => t.id === id);
    const baseCss = baseExisting
      ? baseExisting.baseCss
      : (bundle?.base ?? "") + "\n" + buildStandaloneThemeCss(overrides, name);

    const next: StudioTheme = {
      id,
      name,
      description,
      vibe: baseExisting?.vibe ?? "custom",
      baseCss,
      builtIn: false,
      overrides,
    };
    setSessionThemes((prev) => {
      const without = prev.filter((t) => t.id !== id);
      return [next, ...without];
    });
  };

  const handleNewTheme = () => {
    const id = `untitled-${Date.now().toString(36)}`;
    const blank: StudioTheme = {
      id,
      name: "Untitled",
      description: "A blank theme starting from defaults",
      vibe: "custom",
      baseCss: bundle?.base ?? "",
      builtIn: false,
      overrides: DEFAULT_OVERRIDES,
    };
    setSessionThemes((prev) => [blank, ...prev]);
    setScreen({ kind: "edit", id, isNew: true });
  };

  if (error) {
    return (
      <div className="studio-bg min-h-screen flex items-center justify-center p-6">
        <div className="studio-panel p-8 max-w-md text-center">
          <h1 className="text-xl font-bold mb-2">Could not load themes</h1>
          <p className="text-sm opacity-75 mb-4">{error}</p>
          <p className="text-xs opacity-65">
            Make sure dist/themes.json is committed and reachable. The studio falls back to
            raw.githubusercontent.com if the local copy isn't found.
          </p>
        </div>
      </div>
    );
  }

  if (!bundle) {
    return (
      <div className="studio-bg min-h-screen flex items-center justify-center">
        <div className="studio-panel p-8">
          <p className="text-sm opacity-75">Loading themes bundle...</p>
        </div>
      </div>
    );
  }

  const headerMeta = (
    <div className="text-xs opacity-65 hidden md:flex items-center gap-2">
      <span>v{bundle.pkgVersion}</span>
      <span>·</span>
      <span className="font-mono">{bundle.gitSha.slice(0, 7)}</span>
      <span>·</span>
      <span>{Object.keys(bundle.themes).length} built-in</span>
      {sessionThemes.length > 0 && (
        <>
          <span>·</span>
          <span>{sessionThemes.length} custom</span>
        </>
      )}
    </div>
  );

  return (
    <div className="studio-bg min-h-screen flex flex-col">
      <header className="studio-bar sticky top-0 z-20 px-4 py-3 flex items-center justify-between gap-4">
        <button
          onClick={() => setScreen({ kind: "gallery" })}
          className="flex items-center gap-2.5 group min-w-0"
          aria-label="Theme Studio home"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-extrabold flex-shrink-0">
            <Palette className="w-4 h-4" />
          </div>
          <div className="text-left min-w-0">
            <div className="font-bold text-sm leading-tight">Theme Studio</div>
            <div className="text-[11px] opacity-65 leading-tight">waki-themes</div>
          </div>
        </button>

        {headerMeta}

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setMode(mode === "light" ? "dark" : "light")}
            className="studio-button text-xs"
            aria-label="Toggle dark mode"
          >
            {mode === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            <span className="hidden sm:inline">{mode === "light" ? "Dark" : "Light"}</span>
          </button>
          <a
            href="https://github.com/wwahmed/waki-themes"
            target="_blank"
            rel="noopener noreferrer"
            className="studio-button text-xs"
            aria-label="GitHub repository"
          >
            <Github className="w-4 h-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </header>

      <main className="flex-1 px-4 py-4 max-w-[1400px] w-full mx-auto">
        {screen.kind === "gallery" && (
          <Gallery
            themes={allThemes}
            mode={mode}
            activeId={null}
            onPick={(id) => setScreen({ kind: "preview", id })}
            onEdit={(id) => setScreen({ kind: "edit", id, isNew: false })}
            onNewTheme={handleNewTheme}
          />
        )}

        {screen.kind === "preview" && (() => {
          const theme = findTheme(screen.id);
          if (!theme) {
            return (
              <div className="studio-panel p-6">Theme not found. <button className="studio-button" onClick={() => setScreen({ kind: "gallery" })}>Back</button></div>
            );
          }
          return (
            <div className="space-y-3">
              <button onClick={() => setScreen({ kind: "gallery" })} className="studio-button text-xs">
                ← Back to gallery
              </button>
              <PreviewPane
                theme={theme}
                mode={mode}
                onEdit={() => setScreen({ kind: "edit", id: theme.id, isNew: false })}
                onModeChange={setMode}
              />
            </div>
          );
        })()}

        {screen.kind === "edit" && (() => {
          const theme = findTheme(screen.id);
          if (!theme) {
            return (
              <div className="studio-panel p-6">Theme not found. <button className="studio-button" onClick={() => setScreen({ kind: "gallery" })}>Back</button></div>
            );
          }
          const initialOverrides = theme.overrides ?? getOverridesForTheme(theme.id);
          return (
            <Editor
              theme={theme}
              initialOverrides={initialOverrides}
              mode={mode}
              isNew={screen.isNew}
              defaultName={screen.isNew ? theme.name : undefined}
              onModeChange={setMode}
              onBack={() => setScreen({ kind: "gallery" })}
              onSave={handleSaveTheme}
            />
          );
        })()}
      </main>

      <footer className="px-4 py-3 text-center text-[11px] opacity-65">
        Theme Studio · MIT · built on waki-themes ·{" "}
        <a href="https://github.com/wwahmed/waki-themes" className="underline">
          source
        </a>
      </footer>
    </div>
  );
}
