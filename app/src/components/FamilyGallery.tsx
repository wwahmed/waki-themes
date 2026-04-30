import { useMemo } from "react";
import { Plus, Trash2 } from "lucide-react";
import { PreviewFrame } from "./PreviewFrame";
import { MINIATURE_HTML } from "../lib/sample";
import type { BundleFamily, StudioTheme } from "../lib/types";

interface FamilyGalleryProps {
  families: Record<string, BundleFamily>;
  themesById: Record<string, StudioTheme>;
  customThemes: StudioTheme[];
  mode: "light" | "dark";
  onPickFamily: (familyId: string) => void;
  onPickCustom: (id: string) => void;
  onNewTheme: () => void;
  onDeleteCustom: (id: string) => void;
}

// Step 1 of the picker. Each family gets one large card showing a
// representative variant's preview plus the variant count. Click into
// it to open the variant gallery for that family.
//
// Custom (session-created) themes get their own row at the top; they
// don't slot into the built-in family taxonomy unless explicitly
// promoted by hand.
export function FamilyGallery({
  families,
  themesById,
  customThemes,
  mode,
  onPickFamily,
  onPickCustom,
  onNewTheme,
  onDeleteCustom,
}: FamilyGalleryProps) {
  const familyEntries = useMemo(
    () =>
      Object.entries(families).map(([id, family]) => {
        const repTheme = themesById[family.variants[0]?.themeId];
        return { id, family, repTheme };
      }),
    [families, themesById],
  );

  return (
    <div className="flex flex-col gap-6">
      {customThemes.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-base font-bold">Your custom themes</h2>
              <p className="text-xs opacity-65">
                Saved in this browser session. Export or commit to make them permanent.
              </p>
            </div>
            <button onClick={onNewTheme} className="studio-button studio-button-primary">
              <Plus className="w-4 h-4" />
              New theme
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {customThemes.map((t) => (
              <div key={t.id} className="relative group">
                <button
                  onClick={() => onPickCustom(t.id)}
                  className="w-full rounded-2xl overflow-hidden ring-1 ring-violet-500/15 hover:ring-violet-500/40 transition-all text-left"
                >
                  <div className="aspect-[4/3] w-full relative">
                    <PreviewFrame
                      baseCss={t.baseCss}
                      html={MINIATURE_HTML}
                      mode={mode}
                      scale={0.7}
                      ariaLabel={t.name}
                    />
                    <span className="absolute top-2 left-2 studio-chip">custom</span>
                  </div>
                  <div className="studio-panel rounded-none border-x-0 border-b-0 px-3 py-2">
                    <div className="font-semibold text-sm truncate">{t.name}</div>
                    <div className="text-[11px] opacity-65 truncate">{t.description}</div>
                  </div>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(`Delete "${t.name}" from this session?`)) {
                      onDeleteCustom(t.id);
                    }
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-500/15 text-red-700 dark:text-red-400 hover:bg-red-500/30 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                  title="Delete this custom theme"
                  aria-label={`Delete ${t.name}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-bold">Theme families</h2>
            <p className="text-xs opacity-65">
              Each family shares its structural identity. Pick one to see its colour variants.
            </p>
          </div>
          {customThemes.length === 0 && (
            <button onClick={onNewTheme} className="studio-button studio-button-primary">
              <Plus className="w-4 h-4" />
              New theme
            </button>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {familyEntries.map(({ id, family, repTheme }) => (
            <button
              key={id}
              onClick={() => onPickFamily(id)}
              className="group rounded-2xl overflow-hidden ring-1 ring-violet-500/15 hover:ring-violet-500/40 hover:-translate-y-0.5 transition-all text-left"
            >
              <div className="aspect-[16/9] w-full relative">
                {repTheme && (
                  <PreviewFrame
                    baseCss={repTheme.baseCss}
                    html={MINIATURE_HTML}
                    mode={mode}
                    scale={0.7}
                    ariaLabel={`Preview of ${family.name} family`}
                  />
                )}
                <div className="absolute top-2 right-2 studio-chip">
                  {family.variants.length} {family.variants.length === 1 ? "variant" : "variants"}
                </div>
              </div>
              <div className="studio-panel rounded-none border-x-0 border-b-0 px-4 py-3">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-base">{family.name}</h3>
                  <span className="text-[10px] opacity-60 font-mono">
                    r{family.structure.radius} · b{family.structure.blur}
                  </span>
                </div>
                <p className="text-xs opacity-70 line-clamp-2">{family.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {family.variants.slice(0, 6).map((v) => (
                    <span key={v.slot} className="studio-chip text-[9px]">
                      {v.name}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
