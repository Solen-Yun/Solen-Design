import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as Lightfall } from "../../src/components/lightfall/Lightfall.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Hold the stage to warp: travel rushes and every tail stretches. */

const DEFAULTS = {
  lightMode: false,
  color: "#ffffff",
  speed: 0.3,
  streakCount: 2,
  streakWidth: 0.8,
  streakLength: 1,
  density: 0.6,
  twinkle: 0.3,
  zoom: 3,
  glow: 1,
  bloom: 0.35,
  mouseStrength: 0.4,
  holdToWarp: true,
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
      <div className="demo-stage" style={{ background: dark ? "#101014" : "#e6e6ea", colorScheme: dark ? "dark" : "light" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", height: 440 }}>
            <Lightfall
              lightMode={opts.lightMode}
              colors={[opts.color]}
              speed={opts.speed}
              streakCount={opts.streakCount}
              streakWidth={opts.streakWidth}
              streakLength={opts.streakLength}
              density={opts.density}
              twinkle={opts.twinkle}
              zoom={opts.zoom}
              glow={opts.glow}
              bloom={opts.bloom}
              mouseStrength={opts.mouseStrength}
              holdToWarp={opts.holdToWarp}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./lightfall-preview.html">
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
          <Color label="光色" value={opts.color} onChange={(color) => set({ color })} />
          <Slider label="流速" value={opts.speed} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(speed) => set({ speed })} />
          <Slider label="层数" value={opts.streakCount} min={1} max={8} step={1} format={(v) => String(v)} onChange={(streakCount) => set({ streakCount })} />
          <Slider label="宽度" value={opts.streakWidth} min={0.2} max={2} step={0.05} format={(v) => `${v.toFixed(2)}×`} onChange={(streakWidth) => set({ streakWidth })} />
          <Slider label="尾长" value={opts.streakLength} min={0.1} max={3} step={0.1} format={(v) => `${v.toFixed(1)}×`} onChange={(streakLength) => set({ streakLength })} />
          <Slider label="密度" value={opts.density} min={0.1} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(density) => set({ density })} />
          <Slider label="闪烁" value={opts.twinkle} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(twinkle) => set({ twinkle })} />
          <Slider label="纵深" value={opts.zoom} min={0.5} max={8} step={0.1} format={(v) => v.toFixed(1)} onChange={(zoom) => set({ zoom })} />
          <Slider label="亮度" value={opts.glow} min={0.2} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(glow) => set({ glow })} />
          <Slider label="泛光" value={opts.bloom} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(bloom) => set({ bloom })} />
          <Slider label="鼠标增亮" value={opts.mouseStrength} min={0} max={1.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(mouseStrength) => set({ mouseStrength })} />
          <ControlRow label="按住冲刺">
            <Switch checked={opts.holdToWarp} onChange={(holdToWarp) => set({ holdToWarp })} label="按住冲刺" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the tunnel resting in a small dark stage; pointer effects
   off so the card stays calm while the cursor passes over the gallery. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 200, background: "#101014" }}>
        <Lightfall speed={0.2} mouseInteraction={false} holdToWarp={false} intro={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
