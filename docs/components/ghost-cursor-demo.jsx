import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as GhostCursor } from "../../src/components/ghost-cursor/GhostCursor.jsx";

/* The demo plus a live customize panel — every control is a real option.
   The ghost is an absolute overlay, so the demo hands it a positioned host
   box exactly like the usage example does. */

const DEFAULTS = {
  theme: "dark",
  color: "#B497CF",
  size: 80,
  trailLength: 50,
  inertia: 0.5,
  turbulence: 0.5,
  drift: 0.3,
  detail: 1,
  brightness: 1,
  bloomStrength: 0.6,
  grainIntensity: 0.05,
  clickPuff: true,
  intro: true,
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
      <div className="demo-stage" style={{ background: light ? "#f4f4f5" : "#101014", colorScheme: light ? "light" : "dark" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", height: 420 }}>
            <GhostCursor
              theme={opts.theme}
              color={opts.color}
              size={opts.size}
              trailLength={opts.trailLength}
              inertia={opts.inertia}
              turbulence={opts.turbulence}
              drift={opts.drift}
              detail={opts.detail}
              brightness={opts.brightness}
              bloomStrength={opts.bloomStrength}
              grainIntensity={opts.grainIntensity}
              clickPuff={opts.clickPuff}
              intro={opts.intro}
            />
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
              <p style={{ color: light ? "#a1a1aa" : "#52525b", fontSize: 13, letterSpacing: 2 }}>在区域内移动光标</p>
            </div>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./ghost-cursor-preview.html">
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
          <Color label="烟雾色" value={opts.color} onChange={(color) => set({ color })} />
          <ControlRow label="亮色主题">
            <Switch checked={light} onChange={(on) => set({ theme: on ? "light" : "dark" })} label="亮色主题" />
          </ControlRow>
          <Slider label="烟头尺寸" value={opts.size} min={20} max={160} step={4} format={(v) => `${v}px`} onChange={(size) => set({ size })} />
          <Slider label="烟迹残留" value={opts.trailLength} min={1} max={200} step={1} format={(v) => String(v)} onChange={(trailLength) => set({ trailLength })} />
          <Slider label="跟随惯性" value={opts.inertia} min={0} max={0.95} step={0.05} format={(v) => v.toFixed(2)} onChange={(inertia) => set({ inertia })} />
          <Slider label="湍流" value={opts.turbulence} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(turbulence) => set({ turbulence })} />
          <Slider label="上升漂移" value={opts.drift} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(drift) => set({ drift })} />
          <Slider label="细节撕扯" value={opts.detail} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(detail) => set({ detail })} />
          <Slider label="亮度" value={opts.brightness} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(brightness) => set({ brightness })} />
          <Slider label="泛光" value={opts.bloomStrength} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(bloomStrength) => set({ bloomStrength })} />
          <Slider label="颗粒" value={opts.grainIntensity} min={0} max={0.5} step={0.01} format={(v) => v.toFixed(2)} onChange={(grainIntensity) => set({ grainIntensity })} />
          <ControlRow label="点击烟团">
            <Switch checked={opts.clickPuff} onChange={(clickPuff) => set({ clickPuff })} label="点击烟团" />
          </ControlRow>
          <ControlRow label="开场巡游">
            <Switch checked={opts.intro} onChange={(intro) => set({ intro })} label="开场巡游" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — a teal ghost sweeping across a small dark stage; the
   intro glide keeps the card alive even before the cursor arrives. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 170, background: "#101014" }}>
        <GhostCursor color="#8ee6f2" size={56} trailLength={42} turbulence={0.7} brightness={1.1} bloomStrength={0.9} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
