import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as MagicRings } from "../../src/components/magic-rings/MagicRings.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Click to fire a shock wave through the rings, park the pointer nearby
   to swell the family, and try the tilt/dispersion combos. */

const DEFAULTS = {
  color: "#A855F7",
  colorTwo: "#6366F1",
  ringCount: 6,
  motion: "pulse",
  speed: 1,
  lineThickness: 2,
  glow: 1,
  expansion: 0.1,
  taper: 1.5,
  tilt: 0,
  dispersion: 0,
  grain: 0,
  hoverScale: 1.2,
  followMouse: false,
  clickBurst: true,
  theme: "dark",
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
  const light = opts.theme === "light";

  return (
    <>
      <div className="demo-stage" style={{ background: light ? "#f4f4f5" : "#101014", colorScheme: opts.theme }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", maxWidth: 720, height: 340 }}>
            <MagicRings
              color={opts.color}
              colorTwo={opts.colorTwo}
              ringCount={opts.ringCount}
              motion={opts.motion}
              speed={opts.speed}
              lineThickness={opts.lineThickness}
              glow={opts.glow}
              expansion={opts.expansion}
              taper={opts.taper}
              tilt={opts.tilt}
              dispersion={opts.dispersion}
              grain={opts.grain}
              hoverScale={opts.hoverScale}
              followMouse={opts.followMouse}
              clickBurst={opts.clickBurst}
              theme={opts.theme}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./magic-rings-preview.html">
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
          <Color label="内环色" value={opts.color} onChange={(color) => set({ color })} />
          <Color label="外环色" value={opts.colorTwo} onChange={(colorTwo) => set({ colorTwo })} />
          <Slider label="环数" value={opts.ringCount} min={1} max={12} step={1} format={(v) => String(v)} onChange={(ringCount) => set({ ringCount })} />
          <Slider label="速度" value={opts.speed} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(speed) => set({ speed })} />
          <Slider label="线宽" value={opts.lineThickness} min={0.5} max={6} step={0.5} format={(v) => `${v}px`} onChange={(lineThickness) => set({ lineThickness })} />
          <Slider label="光晕" value={opts.glow} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(glow) => set({ glow })} />
          <Slider label="膨胀" value={opts.expansion} min={0} max={0.4} step={0.01} format={(v) => v.toFixed(2)} onChange={(expansion) => set({ expansion })} />
          <Slider label="衰减" value={opts.taper} min={0.5} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(taper) => set({ taper })} />
          <Slider label="倾角" value={opts.tilt} min={-80} max={80} step={1} format={(v) => `${v}°`} onChange={(tilt) => set({ tilt })} />
          <Slider label="色散" value={opts.dispersion} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(dispersion) => set({ dispersion })} />
          <Slider label="颗粒" value={opts.grain} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(grain) => set({ grain })} />
          <Slider label="悬停缩放" value={opts.hoverScale} min={0.5} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(hoverScale) => set({ hoverScale })} />
          <ControlRow label="运动模式">
            <div className="view-tabs">
              {[["pulse", "脉动"], ["ripple", "波前"], ["breathe", "呼吸"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.motion === id ? "active" : ""} onClick={() => set({ motion: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="明暗主题">
            <div className="view-tabs">
              {[["dark", "深色"], ["light", "浅色"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.theme === id ? "active" : ""} onClick={() => set({ theme: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="环心跟随">
            <Switch checked={opts.followMouse} onChange={(followMouse) => set({ followMouse })} label="环心跟随" />
          </ControlRow>
          <ControlRow label="点击冲击波">
            <Switch checked={opts.clickBurst} onChange={(clickBurst) => set({ clickBurst })} label="点击冲击波" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the default violet rings pulsing on the dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 170, background: "#101014" }}>
        <MagicRings />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
