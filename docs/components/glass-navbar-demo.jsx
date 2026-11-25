import { useState } from "react";
import { default as GlassNavbar } from "../../src/components/glass-navbar/GlassNavbar.jsx";

/* This component is a plain React + CSS pair — no motion engine, no shadow
   root, and no framework variants. The demo embeds the bar (pinned={false})
   in a small scrollable stage: scrolling the stage drives the shrink, the
   same way window scroll drives it when the bar is pinned. */

const DEFAULTS = {
  shrink: true,
  compactWidth: 520,
  glassOpacity: 0.72,
  blurRadius: 14,
};

/* Fake page content for the stage — something to scroll past. */
function StageBody() {
  const rows = Array.from({ length: 8 }, (_, i) => ({
    height: [110, 150, 90, 170, 120, 84, 140, 100][i],
    tint: i % 2 === 0 ? "#1d1f27" : "#171921",
  }));
  return (
    <div style={{ padding: "84px 24px 24px", display: "grid", gap: 16 }}>
      {rows.map((row, i) => (
        <div
          key={i}
          style={{
            height: row.height,
            borderRadius: 12,
            background: row.tint,
            border: "1px solid rgb(255 255 255 / 0.04)",
          }}
        />
      ))}
    </div>
  );
}

function ControlRow({ label, children }) {
  return (
    <div className="control">
      <span className="control-label">{label}</span>
      {children}
    </div>
  );
}

function Slider({ label, value, min, max, step, format, onChange }) {
  return (
    <ControlRow label={label}>
      <output className="control-value">{format(value)}</output>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-label={label}
      />
    </ControlRow>
  );
}

function Switch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={checked ? "switch on" : "switch"}
      onClick={() => onChange(!checked)}
    >
      <span className="switch-knob" />
    </button>
  );
}

function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => setOpts(DEFAULTS);

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        {/* The stage itself is the scroll container: scrolling it drives the
            bar's shrink, just like window scroll drives a pinned bar.
            The scrollbar itself stays invisible (see .gnb-stage). */}
        <div className="gnb-stage">
          <GlassNavbar pinned={false} {...opts} />
          <StageBody />
        </div>
      </div>
      <div className="demo-actions">
        <a href="./glass-navbar-preview.html">
          <span aria-hidden="true">⧉</span> 打开完整预览
        </a>
      </div>

      <div className="customize">
        <div className="customize-head">
          <p className="customize-title">自定义</p>
          <button type="button" className="customize-reset" onClick={reset}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            Reset
          </button>
        </div>
        <div className="customize-grid">
          <ControlRow label="滚动收短">
            <Switch checked={opts.shrink} onChange={(shrink) => set({ shrink })} label="滚动收短" />
          </ControlRow>
          <Slider label="收短宽度" value={opts.compactWidth} min={480} max={900} step={4} format={(v) => `${v}px`} onChange={(compactWidth) => set({ compactWidth })} />
          <Slider label="玻璃不透明度" value={opts.glassOpacity} min={0.3} max={1} step={0.02} format={(v) => v.toFixed(2)} onChange={(glassOpacity) => set({ glassOpacity })} />
          <Slider label="模糊半径" value={opts.blurRadius} min={0} max={28} step={1} format={(v) => `${v}px`} onChange={(blurRadius) => set({ blurRadius })} />
        </div>
      </div>
    </>
  );
}

/* Gallery card — the bar resting in a small dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div
        style={{
          padding: "18px 14px 0",
          background: "#101014",
          borderRadius: 12,
          height: 150,
          overflow: "hidden",
        }}
      >
        <GlassNavbar pinned={false} shrink={false} />
        <div style={{ display: "grid", gap: 10, padding: "18px 4px 0" }}>
          <div style={{ height: 34, borderRadius: 8, background: "#1d1f27" }} />
          <div style={{ height: 34, borderRadius: 8, background: "#171921" }} />
        </div>
      </div>
    </div>
  );
}

export { Demo, CardPreview };
