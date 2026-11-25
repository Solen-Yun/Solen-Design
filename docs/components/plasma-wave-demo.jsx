import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as PlasmaWave } from "../../src/components/plasma-wave/PlasmaWave.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Sweep the cursor across the ribbons: they bulge where you point. */

const DEFAULTS = {
  color1: "#a855f7",
  color2: "#06b6d4",
  speed: 1,
  speed1: 0.05,
  speed2: 0.05,
  dir2: 1,
  bend1: 1,
  bend2: 0.5,
  thickness: 0.3,
  rotationDeg: 0,
  brightness: 1,
  glow: 1,
  core: 0.6,
  grain: 0.03,
  mouseInteraction: true,
  lightMode: false,
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

/* A background component: the host owns the size, so the demo hands it a
   100%-wide, fixed-height box exactly like the usage example does. */
function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => setOpts(DEFAULTS);

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ width: "100%", height: 520, position: "relative" }}>
            <PlasmaWave
              colors={[opts.color1, opts.color2]}
              speed={opts.speed}
              speed1={opts.speed1}
              speed2={opts.speed2}
              dir2={opts.dir2}
              bend1={opts.bend1}
              bend2={opts.bend2}
              thickness={opts.thickness}
              rotationDeg={opts.rotationDeg}
              brightness={opts.brightness}
              glow={opts.glow}
              core={opts.core}
              grain={opts.grain}
              mouseInteraction={opts.mouseInteraction}
              lightMode={opts.lightMode}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./plasma-wave-preview.html">
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
          <Color label="色带一" value={opts.color1} onChange={(color1) => set({ color1 })} />
          <Color label="色带二" value={opts.color2} onChange={(color2) => set({ color2 })} />
          <Slider label="总速度" value={opts.speed} min={0} max={3} step={0.1} format={(v) => `${v.toFixed(1)}×`} onChange={(speed) => set({ speed })} />
          <Slider label="带一速度" value={opts.speed1} min={0} max={0.3} step={0.005} format={(v) => v.toFixed(3)} onChange={(speed1) => set({ speed1 })} />
          <Slider label="带二速度" value={opts.speed2} min={0} max={0.3} step={0.005} format={(v) => v.toFixed(3)} onChange={(speed2) => set({ speed2 })} />
          <ControlRow label="带二逆向">
            <Switch checked={opts.dir2 === -1} onChange={(reverse) => set({ dir2: reverse ? -1 : 1 })} label="带二逆向" />
          </ControlRow>
          <Slider label="卷曲一" value={opts.bend1} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(bend1) => set({ bend1 })} />
          <Slider label="卷曲二" value={opts.bend2} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(bend2) => set({ bend2 })} />
          <Slider label="粗细" value={opts.thickness} min={0.05} max={1} step={0.01} format={(v) => v.toFixed(2)} onChange={(thickness) => set({ thickness })} />
          <Slider label="旋转" value={opts.rotationDeg} min={-90} max={90} step={1} format={(v) => `${v}°`} onChange={(rotationDeg) => set({ rotationDeg })} />
          <Slider label="亮度" value={opts.brightness} min={0.2} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(brightness) => set({ brightness })} />
          <Slider label="辉光" value={opts.glow} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(glow) => set({ glow })} />
          <Slider label="灯芯" value={opts.core} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(core) => set({ core })} />
          <ControlRow label="鼠标交互">
            <Switch checked={opts.mouseInteraction} onChange={(mouseInteraction) => set({ mouseInteraction })} label="鼠标交互" />
          </ControlRow>
          <ControlRow label="浅色模式">
            <Switch checked={opts.lightMode} onChange={(lightMode) => set({ lightMode })} label="浅色模式" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the ribbons drifting on their own; the cursor passing over
   the gallery must not swell them, so mouse interaction stays off. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 220, position: "relative", background: "#101014" }}>
        <PlasmaWave speed={0.7} bend1={1} bend2={0.5} mouseInteraction={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
