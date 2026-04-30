// HTML strings used inside iframes for theme preview. The classes
// (.glass, .glass-bar, .chip, etc.) match what every theme expects.

// A tiny tile used by the gallery. Renders one panel + a chip + a
// sample button so the theme's signature reads at a glance.
export const MINIATURE_HTML = `
<div class="root">
  <div class="glass-bar" style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-radius:8px 8px 0 0;font-size:11px;font-weight:700;">
    <span>Studio</span>
    <span class="studio-accent-fg">●</span>
  </div>
  <div class="glass" style="margin:8px;padding:10px;font-size:11px;">
    <div style="font-weight:700;margin-bottom:4px;">Card title</div>
    <div style="opacity:0.75;font-size:10px;line-height:1.3;">A short snippet of body copy lives here.</div>
    <div style="display:flex;gap:6px;margin-top:8px;align-items:center;">
      <span class="chip" style="font-size:9px;padding:2px 6px;">tag</span>
      <span class="studio-accent-bg" style="margin-left:auto;height:6px;width:24px;border-radius:9999px;display:inline-block;"></span>
    </div>
  </div>
</div>
`;

// The big preview shown in the editor. A small sample dashboard with
// a header, tiles, a list, a form, and typography. Wide enough to
// look like a real app.
export const PREVIEW_HTML = `
<div style="min-height:100vh;display:flex;flex-direction:column;">
  <header class="glass-bar" style="display:flex;align-items:center;justify-content:space-between;padding:14px 22px;position:sticky;top:0;z-index:10;">
    <div style="display:flex;align-items:center;gap:12px;">
      <div class="studio-accent-bg" style="width:28px;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:800;color:white;font-size:13px;">W</div>
      <div>
        <div style="font-weight:700;font-size:14px;">Sample Dashboard</div>
        <div style="font-size:11px;opacity:0.65;">Live theme preview</div>
      </div>
    </div>
    <div style="display:flex;align-items:center;gap:8px;">
      <span class="chip">v1.0</span>
      <span class="chip">stable</span>
      <button class="studio-accent-button" style="padding:6px 12px;font-weight:600;font-size:13px;border:0;cursor:pointer;">Action</button>
    </div>
  </header>

  <main style="padding:24px;display:flex;flex-direction:column;gap:20px;flex:1;">

    <section style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;">
      <div class="glass" style="padding:16px;">
        <div style="font-size:11px;font-weight:600;opacity:0.7;text-transform:uppercase;letter-spacing:0.05em;">Revenue</div>
        <div style="font-size:24px;font-weight:800;margin-top:4px;">$24,580</div>
        <div style="font-size:11px;opacity:0.6;margin-top:2px;">+12.4% this week</div>
      </div>
      <div class="glass" style="padding:16px;">
        <div style="font-size:11px;font-weight:600;opacity:0.7;text-transform:uppercase;letter-spacing:0.05em;">Orders</div>
        <div style="font-size:24px;font-weight:800;margin-top:4px;">312</div>
        <div style="font-size:11px;opacity:0.6;margin-top:2px;">+5.1% this week</div>
      </div>
      <div class="glass" style="padding:16px;">
        <div style="font-size:11px;font-weight:600;opacity:0.7;text-transform:uppercase;letter-spacing:0.05em;">Customers</div>
        <div style="font-size:24px;font-weight:800;margin-top:4px;">1,847</div>
        <div style="font-size:11px;opacity:0.6;margin-top:2px;">+2.0% this week</div>
      </div>
    </section>

    <section style="display:grid;grid-template-columns:1fr 320px;gap:14px;">
      <div class="glass-elevated" style="padding:20px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
          <h2 style="font-size:16px;font-weight:700;margin:0;">Activity</h2>
          <span class="chip">today</span>
        </div>

        <ul style="margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:10px;">
          <li style="display:flex;gap:12px;align-items:center;padding:10px;border-bottom:1px solid;" class="divider-soft">
            <div class="studio-accent-bg" style="width:32px;height:32px;border-radius:9999px;flex-shrink:0;"></div>
            <div style="flex:1;min-width:0;">
              <div style="font-weight:600;font-size:13px;">Theme published</div>
              <div style="font-size:11px;opacity:0.65;">2 minutes ago</div>
            </div>
            <span class="chip">success</span>
          </li>
          <li style="display:flex;gap:12px;align-items:center;padding:10px;border-bottom:1px solid;" class="divider-soft">
            <div class="studio-accent-bg" style="width:32px;height:32px;border-radius:9999px;flex-shrink:0;opacity:0.6;"></div>
            <div style="flex:1;min-width:0;">
              <div style="font-weight:600;font-size:13px;">Build completed</div>
              <div style="font-size:11px;opacity:0.65;">14 minutes ago</div>
            </div>
            <span class="chip">12s</span>
          </li>
          <li style="display:flex;gap:12px;align-items:center;padding:10px;">
            <div class="studio-accent-bg" style="width:32px;height:32px;border-radius:9999px;flex-shrink:0;opacity:0.4;"></div>
            <div style="flex:1;min-width:0;">
              <div style="font-weight:600;font-size:13px;">Pushed to main</div>
              <div style="font-size:11px;opacity:0.65;">1 hour ago</div>
            </div>
            <span class="chip">main</span>
          </li>
        </ul>
      </div>

      <div class="glass" style="padding:18px;">
        <h2 style="font-size:14px;font-weight:700;margin:0 0 12px 0;">Quick form</h2>
        <label style="display:block;font-size:11px;font-weight:600;opacity:0.7;margin-bottom:4px;">Theme name</label>
        <input type="text" value="Untitled" style="width:100%;padding:8px 10px;border-radius:8px;border:1px solid currentColor;background:transparent;color:inherit;font-family:inherit;font-size:13px;opacity:0.9;" />
        <label style="display:block;font-size:11px;font-weight:600;opacity:0.7;margin:12px 0 4px 0;">Vibe</label>
        <select style="width:100%;padding:8px 10px;border-radius:8px;border:1px solid currentColor;background:transparent;color:inherit;font-family:inherit;font-size:13px;opacity:0.9;">
          <option>glass</option><option>matte</option><option>neon</option>
        </select>
        <button class="studio-accent-button" style="margin-top:14px;padding:9px 14px;font-weight:600;font-size:13px;border:0;cursor:pointer;width:100%;">Save theme</button>
      </div>
    </section>

    <section class="glass" style="padding:22px;">
      <h1 style="font-size:22px;font-weight:800;margin:0 0 6px 0;">Typography</h1>
      <h2 style="font-size:16px;font-weight:700;margin:0 0 4px 0;opacity:0.85;">A subhead in the same family</h2>
      <p style="font-size:14px;line-height:1.55;opacity:0.85;margin:8px 0 0 0;max-width:60ch;">
        The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.
        Every theme renders this paragraph the same way so you can compare body legibility
        across designs without distractions.
      </p>
      <div style="display:flex;gap:10px;margin-top:14px;flex-wrap:wrap;">
        <span class="chip">primary</span>
        <span class="chip">secondary</span>
        <span class="chip">tertiary</span>
        <span class="chip">accent</span>
      </div>
    </section>
  </main>
</div>
`;
