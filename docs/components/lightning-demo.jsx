import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as Lightning } from "../../src/components/lightning/Lightning.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Click anywhere in the stage to call a strike to that point. */

const DEFAULTS = {
  lightMode: false,
  color: "#4d6bff",
  bolts: 1,
  spread: 0.6,
  branches: 0.5,
  flicker: 0.6,
  speed: 1,
  thickness: 1,
  glow: 1,
  intensity: 1,
  mouseStrength: 1,
  clickStrike: true,
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
      <div className="demo-stage" style={{ background: dark ? "#0a0a10" : "#e6e6ea", colorScheme: dark ? "dark" : "light" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", height: 440 }}>
            <Lightning
              lightMode={opts.lightMode}
              color={opts.color}
              bolts={opts.bolts}
              spread={opts.spread}
              branches={opts.branches}
              flicker={opts.flicker}
              speed={opts.speed}
              thickness={opts.thickness}
              glow={opts.glow}
              intensity={opts.intensity}
              mouseStrength={opts.mouseStrength}
              clickStrike={opts.clickStrike}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./lightning-preview.html">
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
          <Color label="电光色" value={opts.color} onChange={(color) => set({ color })} />
          <Slider label="道数" value={opts.bolts} min={1} max={4} step={1} format={(v) => String(v)} onChange={(bolts) => set({ bolts })} />
          <Slider label="间距" value={opts.spread} min={0} max={1.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(spread) => set({ spread })} />
          <Slider label="分叉" value={opts.branches} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(branches) => set({ branches })} />
          <Slider label="频闪" value={opts.flicker} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(flicker) => set({ flicker })} />
          <Slider label="流速" value={opts.speed} min={0} max={3} step={0.1} format={(v) => `${v.toFixed(1)}×`} onChange={(speed) => set({ speed })} />
          <Slider label="内芯" value={opts.thickness} min={0.2} max={3} step={0.1} format={(v) => `${v.toFixed(1)}×`} onChange={(thickness) => set({ thickness })} />
          <Slider label="光晕" value={opts.glow} min={0.2} max={3} step={0.1} format={(v) => `${v.toFixed(1)}×`} onChange={(glow) => set({ glow })} />
          <Slider label="亮度" value={opts.intensity} min={0.2} max={2.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(intensity) => set({ intensity })} />
          <Slider label="鼠标强度" value={opts.mouseStrength} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(mouseStrength) => set({ mouseStrength })} />
          <ControlRow label="点击落雷">
            <Switch checked={opts.clickStrike} onChange={(clickStrike) => set({ clickStrike })} label="点击落雷" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — one calm bolt in a small dark stage; pointer and clicks off
   so the card stays composed while the cursor passes over the gallery. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 200, background: "#0a0a10" }}>
        <Lightning mouseInteraction={false} clickStrike={false} flicker={0.4} intro={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
