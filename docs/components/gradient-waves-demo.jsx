import { useState } from "react";
import { DemoFit } from "../demo-fit";
import GradientWaves from "../../src/components/gradient-waves/GradientWaves.jsx";

/* The demo plus a live customize panel — every control is a real option.
   The sun follows the cursor; clicking the sea raises a rolling swell. */

const DEFAULTS = {
  horizonColor: "#5227FF",
  waveColor: "#FF9FFC",
  crestColor: "#FFFFFF",
  lightMode: false,
  speed: 0.4,
  amplitude: 2.5,
  waveScale: 0.6,
  waveRatio: 0.9,
  swell: 35,
  turbulence: 20,
  tilt: 64,
  zoom: 1,
  height: 5.5,
  fogDepth: 15,
  relief: 1,
  lightAngle: 120,
  sheen: 0,
  brightness: 1,
  grain: 0.2,
  quality: "medium",
  mouseInteraction: true,
  parallaxStrength: 0.5,
  mouseStrength: 0.6,
  swellOnClick: true,
  paused: false,
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

function Tabs({ label, value, options, onChange }) {
  return (
    <ControlRow label={label}>
      <div className="view-tabs">
        {options.map(([id, text]) => (
          <button key={id} type="button" className={value === id ? "active" : ""} onClick={() => onChange(id)}>
            {text}
          </button>
        ))}
      </div>
    </ControlRow>
  );
}

function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => setOpts(DEFAULTS);

  return (
    <>
      <div className="demo-stage" style={{ background: opts.lightMode ? "#f4f4f5" : "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", height: 340 }}>
            <GradientWaves {...opts} />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./gradient-waves-preview.html">
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
          <Color label="地平线色" value={opts.horizonColor} onChange={(horizonColor) => set({ horizonColor })} />
          <Color label="浪面色" value={opts.waveColor} onChange={(waveColor) => set({ waveColor })} />
          <Tabs label="质量" value={opts.quality} options={[["low", "低"], ["medium", "中"], ["high", "高"]]} onChange={(quality) => set({ quality })} />
          <Slider label="速度" value={opts.speed} min={0} max={1.5} step={0.05} format={(v) => `${v.toFixed(2)}×`} onChange={(speed) => set({ speed })} />
          <Slider label="浪高" value={opts.amplitude} min={0} max={6} step={0.1} format={(v) => v.toFixed(1)} onChange={(amplitude) => set({ amplitude })} />
          <Slider label="波长" value={opts.waveScale} min={0.1} max={1.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(waveScale) => set({ waveScale })} />
          <Slider label="涌浪" value={opts.swell} min={0} max={80} step={1} format={(v) => String(v)} onChange={(swell) => set({ swell })} />
          <Slider label="碎浪" value={opts.turbulence} min={0} max={60} step={1} format={(v) => String(v)} onChange={(turbulence) => set({ turbulence })} />
          <Slider label="俯角" value={opts.tilt} min={10} max={85} step={1} format={(v) => `${v}°`} onChange={(tilt) => set({ tilt })} />
          <Slider label="变焦" value={opts.zoom} min={0.5} max={2} step={0.05} format={(v) => `${v.toFixed(2)}×`} onChange={(zoom) => set({ zoom })} />
          <Slider label="雾深" value={opts.fogDepth} min={3} max={40} step={1} format={(v) => String(v)} onChange={(fogDepth) => set({ fogDepth })} />
          <Slider label="坡面光" value={opts.relief} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(relief) => set({ relief })} />
          <Slider label="闪光" value={opts.sheen} min={0} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(sheen) => set({ sheen })} />
          <Slider label="颗粒" value={opts.grain} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(grain) => set({ grain })} />
          <ControlRow label="白纸墨色">
            <Switch checked={opts.lightMode} onChange={(lightMode) => set({ lightMode })} label="白纸墨色" />
          </ControlRow>
          <ControlRow label="点击起浪">
            <Switch checked={opts.swellOnClick} onChange={(swellOnClick) => set({ swellOnClick })} label="点击起浪" />
          </ControlRow>
          <ControlRow label="指针交互">
            <Switch checked={opts.mouseInteraction} onChange={(mouseInteraction) => set({ mouseInteraction })} label="指针交互" />
          </ControlRow>
          <ControlRow label="暂停海面">
            <Switch checked={opts.paused} onChange={(paused) => set({ paused })} label="暂停海面" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the violet horizon with pink satin waves rolling in. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 170, background: "#101014" }}>
        <GradientWaves speed={0.3} intro={false} dpr={1.5} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
