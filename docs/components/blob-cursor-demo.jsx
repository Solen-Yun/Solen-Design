import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as BlobCursor } from "../../src/components/blob-cursor/BlobCursor.jsx";

/* The demo plus a live customize panel — every control is a real option.
   The blob is an absolute overlay with pointer events off, so the demo
   places a few buttons in the host box to show the hover swell. */

const DEFAULTS = {
  material: "chrome",
  color: "#3B82F6",
  size: 140,
  morph: 0.2,
  morphSpeed: 0.4,
  depth: 1,
  trail: 16,
  lag: 0.55,
  goo: 1,
  stretch: 0.6,
  wobble: 1,
  drip: 0,
  splash: true,
  splashCount: 6,
  splashGravity: 0,
  regrow: 0.5,
  shine: 1,
  shadow: false,
};

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

function Color({ label, value, onChange }) {
  return (
    <ControlRow label={label}>
      <input
        type="color"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={label}
      />
    </ControlRow>
  );
}

function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => setOpts(DEFAULTS);

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", height: 420 }}>
            <BlobCursor
              material={opts.material}
              color={opts.color}
              size={opts.size}
              morph={opts.morph}
              morphSpeed={opts.morphSpeed}
              depth={opts.depth}
              trail={opts.trail}
              lag={opts.lag}
              goo={opts.goo}
              stretch={opts.stretch}
              wobble={opts.wobble}
              drip={opts.drip}
              splash={opts.splash}
              splashCount={opts.splashCount}
              splashGravity={opts.splashGravity}
              regrow={opts.regrow}
              shine={opts.shine}
              shadow={opts.shadow}
            />
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
              <div className="view-tabs">
                <button type="button">膨胀我</button>
              </div>
              <div className="view-tabs">
                <button type="button">也膨胀</button>
              </div>
            </div>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./blob-cursor-preview.html">
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
          <ControlRow label="材质">
            <div className="view-tabs">
              {[["chrome", "铬"], ["jelly", "果冻"], ["pearl", "珍珠"], ["ink", "墨"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.material === id ? "active" : ""} onClick={() => set({ material: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Color label="基色" value={opts.color} onChange={(color) => set({ color })} />
          <Slider label="直径" value={opts.size} min={40} max={320} step={4} format={(v) => `${v}px`} onChange={(size) => set({ size })} />
          <Slider label="呼吸瓣形" value={opts.morph} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(morph) => set({ morph })} />
          <Slider label="瓣形节奏" value={opts.morphSpeed} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(morphSpeed) => set({ morphSpeed })} />
          <Slider label="穹顶高度" value={opts.depth} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(depth) => set({ depth })} />
          <Slider label="拖尾节数" value={opts.trail} min={0} max={16} step={1} format={(v) => String(v)} onChange={(trail) => set({ trail })} />
          <Slider label="迟滞" value={opts.lag} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(lag) => set({ lag })} />
          <Slider label="融合" value={opts.goo} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(goo) => set({ goo })} />
          <Slider label="链节软硬" value={opts.stretch} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(stretch) => set({ stretch })} />
          <Slider label="晃动" value={opts.wobble} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(wobble) => set({ wobble })} />
          <Slider label="甩滴" value={opts.drip} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(drip) => set({ drip })} />
          <ControlRow label="点击爆滴">
            <Switch checked={opts.splash} onChange={(splash) => set({ splash })} label="点击爆滴" />
          </ControlRow>
          <Slider label="液滴数" value={opts.splashCount} min={1} max={32} step={1} format={(v) => String(v)} onChange={(splashCount) => set({ splashCount })} />
          <Slider label="液滴重力" value={opts.splashGravity} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(splashGravity) => set({ splashGravity })} />
          <Slider label="回流速度" value={opts.regrow} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(regrow) => set({ regrow })} />
          <Slider label="抛光" value={opts.shine} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(shine) => set({ shine })} />
          <ControlRow label="投影">
            <Switch checked={opts.shadow} onChange={(shadow) => set({ shadow })} label="投影" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — a chrome blob resting in a small dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 170, background: "#101014" }}>
        <BlobCursor color="#9dd6ff" size={110} trail={10} lag={0.5} hideCursor={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
