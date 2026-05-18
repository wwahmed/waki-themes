// HTML strings used inside iframes for theme preview. The classes
// (.glass, .glass-bar, .chip, .btn-*, .input, shell-* etc.) match the
// shared Waki theme contract plus the V2 shell demonstration layer.

export const MINIATURE_HTML = `
<div style="min-height:100vh;padding:10px;">
  <div class="glass-bar" style="height:28px;display:flex;align-items:center;justify-content:space-between;padding:0 10px;border-radius:12px;font-size:10px;font-weight:800;">
    <span>Waki</span>
    <span class="theme-swatch" style="width:34px;height:10px;border-radius:999px;display:inline-block;"></span>
  </div>
  <div class="glass" style="margin-top:8px;padding:10px;font-size:11px;">
    <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
      <strong>Panel</strong>
      <span class="chip" style="font-size:9px;padding:3px 7px;">V2</span>
    </div>
    <div class="panel-nested" style="margin-top:8px;padding:8px;border-radius:10px;">
      <div style="height:6px;width:70%;border-radius:999px;background:currentColor;opacity:.38;"></div>
      <div style="height:6px;width:44%;border-radius:999px;background:currentColor;opacity:.22;margin-top:6px;"></div>
    </div>
    <button class="btn-primary" style="margin-top:8px;padding:5px 9px;font-size:10px;">Open</button>
  </div>
</div>
`;

export const PREVIEW_HTML = `
<div style="min-height:100vh;display:flex;flex-direction:column;">
  <header class="glass-bar" style="position:sticky;top:0;z-index:20;display:flex;align-items:center;justify-content:space-between;gap:14px;padding:12px 18px;">
    <div style="display:flex;align-items:center;gap:12px;min-width:0;">
      <div class="theme-swatch" style="width:34px;height:34px;border-radius:12px;box-shadow:0 10px 26px rgba(0,0,0,.18);flex:0 0 auto;"></div>
      <div style="min-width:0;">
        <div style="font-size:14px;font-weight:900;line-height:1.1;">Waki Shell</div>
        <div style="font-size:11px;opacity:.66;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">foundation app preview</div>
      </div>
    </div>

    <div class="theme-switcher" style="display:flex;align-items:center;gap:4px;padding:4px;">
      <span style="font-size:11px;font-weight:800;padding:0 8px;opacity:.74;">Look</span>
      <span class="theme-swatch" style="width:24px;height:24px;border-radius:999px;display:inline-block;"></span>
      <button class="active" style="border:0;border-radius:999px;padding:6px 10px;font:inherit;font-size:11px;font-weight:800;">Theme</button>
      <button style="border:0;background:transparent;color:inherit;border-radius:999px;padding:6px 9px;font:inherit;font-size:11px;font-weight:800;opacity:.72;">Dark</button>
    </div>
  </header>

  <main style="display:grid;grid-template-columns:240px minmax(0,1fr);gap:18px;padding:18px;flex:1;">
    <aside class="shell-sidebar" style="border-radius:22px;padding:14px;display:flex;flex-direction:column;gap:12px;">
      <div class="glass" style="padding:12px;">
        <div style="font-size:11px;font-weight:800;opacity:.68;text-transform:uppercase;">Workspace</div>
        <div style="font-size:18px;font-weight:900;margin-top:4px;">Recorder Lab</div>
      </div>
      <nav style="display:flex;flex-direction:column;gap:6px;">
        <div class="nav-item active" style="padding:10px 11px;font-weight:800;">Overview</div>
        <div class="nav-item" style="padding:10px 11px;font-weight:800;">Sessions</div>
        <div class="nav-item" style="padding:10px 11px;font-weight:800;">Artifacts</div>
        <div class="nav-item" style="padding:10px 11px;font-weight:800;">Settings</div>
      </nav>
      <div class="panel-nested" style="margin-top:auto;padding:12px;border-radius:16px;">
        <div style="font-size:12px;font-weight:900;">Sync health</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px;">
          <span class="status-success">online</span>
          <span class="status-info">v2</span>
        </div>
      </div>
    </aside>

    <section class="shell-main" style="padding:18px;display:flex;flex-direction:column;gap:16px;min-width:0;">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:14px;flex-wrap:wrap;">
        <div>
          <div class="chip">today</div>
          <h1 style="font-size:30px;line-height:1.04;margin:10px 0 6px 0;font-weight:950;letter-spacing:0;">Capture command center</h1>
          <p style="margin:0;max-width:64ch;line-height:1.55;opacity:.76;">A realistic app shell with nested frosted panels, desktop density, mobile surfaces, action states, and form controls.</p>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <button class="btn-ghost">Dismiss</button>
          <button class="btn-secondary">Schedule</button>
          <button class="btn-primary">Start session</button>
        </div>
      </div>

      <section style="display:grid;grid-template-columns:repeat(4,minmax(130px,1fr));gap:12px;">
        <div class="glass" style="padding:14px;">
          <div style="font-size:11px;font-weight:800;opacity:.64;text-transform:uppercase;">Recordings</div>
          <div style="font-size:26px;font-weight:950;margin-top:5px;">128</div>
          <span class="status-success">+18%</span>
        </div>
        <div class="glass" style="padding:14px;">
          <div style="font-size:11px;font-weight:800;opacity:.64;text-transform:uppercase;">Processing</div>
          <div style="font-size:26px;font-weight:950;margin-top:5px;">12</div>
          <span class="status-warning">queued</span>
        </div>
        <div class="glass" style="padding:14px;">
          <div style="font-size:11px;font-weight:800;opacity:.64;text-transform:uppercase;">Storage</div>
          <div style="font-size:26px;font-weight:950;margin-top:5px;">74%</div>
          <span class="status-info">healthy</span>
        </div>
        <div class="glass" style="padding:14px;">
          <div style="font-size:11px;font-weight:800;opacity:.64;text-transform:uppercase;">Alerts</div>
          <div style="font-size:26px;font-weight:950;margin-top:5px;">2</div>
          <span class="status-error">review</span>
        </div>
      </section>

      <section style="display:grid;grid-template-columns:minmax(0,1.35fr) minmax(280px,.65fr);gap:14px;">
        <div class="glass-elevated" style="padding:16px;min-width:0;">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px;">
            <h2 style="font-size:16px;margin:0;font-weight:950;">Session timeline</h2>
            <div style="display:flex;gap:6px;">
              <span class="chip">live</span>
              <span class="chip">3 tracks</span>
            </div>
          </div>
          <div class="panel-nested" style="padding:12px;border-radius:18px;margin-bottom:10px;">
            <div style="display:grid;grid-template-columns:80px 1fr 72px;gap:10px;align-items:center;">
              <strong style="font-size:12px;">09:42</strong>
              <div>
                <div style="font-weight:850;">Transcript ready</div>
                <div style="font-size:12px;opacity:.68;">Speaker labels and summary generated</div>
              </div>
              <span class="status-success">done</span>
            </div>
          </div>
          <div class="panel-nested" style="padding:12px;border-radius:18px;margin-bottom:10px;">
            <div style="display:grid;grid-template-columns:80px 1fr 72px;gap:10px;align-items:center;">
              <strong style="font-size:12px;">10:08</strong>
              <div>
                <div style="font-weight:850;">Noise cleanup</div>
                <div style="font-size:12px;opacity:.68;">Adaptive denoise running on local queue</div>
              </div>
              <span class="status-warning">run</span>
            </div>
          </div>
          <div class="panel-nested" style="padding:12px;border-radius:18px;">
            <div style="display:grid;grid-template-columns:80px 1fr 72px;gap:10px;align-items:center;">
              <strong style="font-size:12px;">10:24</strong>
              <div>
                <div style="font-weight:850;">Cloud sync paused</div>
                <div style="font-size:12px;opacity:.68;">Waiting for authenticated session</div>
              </div>
              <span class="status-error">hold</span>
            </div>
          </div>
        </div>

        <div class="glass" style="padding:16px;">
          <h2 style="font-size:16px;margin:0 0 12px 0;font-weight:950;">Controls</h2>
          <label style="display:block;font-size:12px;font-weight:800;opacity:.68;margin-bottom:5px;">Project</label>
          <input class="input" value="WakiRecorder" style="width:100%;margin-bottom:10px;" />
          <label style="display:block;font-size:12px;font-weight:800;opacity:.68;margin-bottom:5px;">Mode</label>
          <select class="input" style="width:100%;margin-bottom:12px;">
            <option>High fidelity</option>
            <option>Fast notes</option>
            <option>Meeting mode</option>
          </select>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <button class="btn-success">Approve</button>
            <button class="btn-danger">Stop</button>
          </div>
        </div>
      </section>

      <section style="display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:14px;align-items:stretch;">
        <div class="glass" style="padding:16px;">
          <h2 style="font-size:16px;margin:0 0 12px 0;font-weight:950;">Component matrix</h2>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;">
            <button class="btn-primary">Primary</button>
            <button class="btn-secondary">Secondary</button>
            <button class="btn-ghost">Ghost</button>
            <button class="btn-warning">Warning</button>
            <button class="btn-danger">Danger</button>
          </div>
          <div class="panel-nested" style="padding:12px;border-radius:18px;">
            <p style="margin:0;line-height:1.55;opacity:.78;">This nested panel should clearly differ from its parent in both light and dark modes. Hover the outer panels to check lift, glow, and border response.</p>
          </div>
        </div>

        <div class="mobile-card" style="padding:14px;">
          <div style="height:5px;width:54px;border-radius:999px;background:currentColor;opacity:.28;margin:0 auto 14px;"></div>
          <div class="panel-nested" style="padding:14px;border-radius:24px;">
            <div style="font-size:12px;font-weight:800;opacity:.68;">Mobile companion</div>
            <div style="font-size:24px;font-weight:950;margin:6px 0;">02:18:44</div>
            <div style="height:42px;border-radius:18px;background:linear-gradient(90deg,currentColor 10%,transparent 10% 18%,currentColor 18% 28%,transparent 28% 40%,currentColor 40% 52%,transparent 52% 62%,currentColor 62% 80%,transparent 80%);opacity:.22;"></div>
            <button class="btn-primary" style="width:100%;margin-top:12px;">Capture</button>
          </div>
        </div>
      </section>
    </section>
  </main>
</div>

<style>
@media (max-width: 900px) {
  main { grid-template-columns: 1fr !important; }
  aside { flex-direction: row !important; overflow-x: auto; }
  section[style*="grid-template-columns:repeat(4"] { grid-template-columns: repeat(2, minmax(130px, 1fr)) !important; }
  section[style*="1.35fr"], section[style*="300px"] { grid-template-columns: 1fr !important; }
}
@media (max-width: 560px) {
  header { align-items:flex-start !important; flex-direction:column !important; }
  section[style*="grid-template-columns:repeat(4"] { grid-template-columns: 1fr !important; }
}
</style>
`;
