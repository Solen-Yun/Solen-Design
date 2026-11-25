import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as LiquidChrome } from "../../src/components/liquid-chrome/LiquidChrome.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Drag across the chrome to carve ripples into the reflections. */

const DEFAULTS = {
  lightMode: false,
  color: "#ffffff",
  speed: 0.2,
  amplitude: 0.3,
  frequencyX: 3,
  frequencyY: 3,
  detail: 4,
  thickness: 1,
  depth: 1,
  roughness: 0.3,
  exposure: 1,
  rippleStrength: 1,
  tilt: 1,
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
  const dark = !opts.lightMode;

  return (
    <>
      <div className="demo-stage" style={{ background: dark ? "#050507" : "#e6e6ea", colorScheme: dark ? "dark" : "light" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", height: 440 }}>
            <LiquidChrome
              lightMode={opts.lightMode}
              color={opts.color}
              speed={opts.speed}
              amplitude={opts.amplitude}
              frequencyX={opts.frequencyX}
              frequencyY={opts.frequencyY}
              detail={opts.detail}
              thickness={opts.thickness}
              depth={opts.depth}
              roughness={opts.roughness}
              exposure={opts.exposure}
              rippleStrength={opts.rippleStrength}
              tilt={opts.tilt}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./liquid-chrome-preview.html">
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
          <ControlRow label="浅色模式">
            <Switch checked={opts.lightMode} onChange={(lightMode) => set({ lightMode })} label="浅色模式" />
          </ControlRow>
          <Color label="染色" value={opts.color} onChange={(color) => set({ color })} />
          <Slider label="流速" value={opts.speed} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(speed) => set({ speed })} />
          <Slider label="褶皱高度" value={opts.amplitude} min={0.05} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(amplitude) => set({ amplitude })} />
          <Slider label="横向频率" value={opts.frequencyX} min={0.5} max={8} step={0.1} format={(v) => v.toFixed(1)} onChange={(frequencyX) => set({ frequencyX })} />
          <Slider label="纵向频率" value={opts.frequencyY} min={0.5} max={8} step={0.1} format={(v) => v.toFixed(1)} onChange={(frequencyY) => set({ frequencyY })} />
          <Slider label="层数" value={opts.detail} min={1} max={8} step={1} format={(v) => String(v)} onChange={(detail) => set({ detail })} />
          <Slider label="锐度" value={opts.thickness} min={0.25} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(thickness) => set({ thickness })} />
          <Slider label="坡度" value={opts.depth} min={0.2} max={2.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(depth) => set({ depth })} />
          <Slider label="粗糙度" value={opts.roughness} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(roughness) => set({ roughness })} />
          <Slider label="曝光" value={opts.exposure} min={0.2} max={2.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(exposure) => set({ exposure })} />
          <Slider label="波纹强度" value={opts.rippleStrength} min={0} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(rippleStrength) => set({ rippleStrength })} />
          <Slider label="倾转" value={opts.tilt} min={0} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(tilt) => set({ tilt })} />
        </div>
      </div>
    </>
  );
}

/* Gallery card — the chrome pool resting in a small dark stage; strokes and
   tilt off so the card stays calm while the cursor passes over the gallery. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 200, background: "#050507" }}>
        <LiquidChrome speed={0.15} interactive={false} intro={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
