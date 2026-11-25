import { useState } from "react";
import { DemoFit } from "../demo-fit";
import Grainient from "../../src/components/grainient/Grainient.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Drag across the field to stir the flow; click to spin a vortex. */

const DEFAULTS = {
  colors: ["#120f17", "#2a0f0a", "#9a3412", "#f97316", "#fed7aa"],
  type: "linear",
  angle: 55,
  bands: 1,
  speed: 1,
  flow: 0.8,
  scale: 1,
  softness: 1,
  silk: 0.35,
  grainAmount: 0.08,
  grainSize: 1.2,
  grainAnimated: true,
  contrast: 1,
  saturation: 1,
  variation: 0,
  interactive: true,
  stir: 1,
  clickSwirl: true,
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
  const setStop = (index, color) =>
    set({ colors: opts.colors.map((c, i) => (i === index ? color : c)) });

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", height: 340 }}>
            <Grainient {...opts} />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./grainient-preview.html">
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
          <Color label="色标 · 深" value={opts.colors[0]} onChange={(color) => setStop(0, color)} />
          <Color label="色标 · 中" value={opts.colors[2]} onChange={(color) => setStop(2, color)} />
          <Color label="色标 · 亮" value={opts.colors[4]} onChange={(color) => setStop(4, color)} />
          <Tabs label="类型" value={opts.type} options={[["linear", "线性"], ["radial", "径向"]]} onChange={(type) => set({ type })} />
          <Slider label="角度" value={opts.angle} min={0} max={180} step={1} format={(v) => `${v}°`} onChange={(angle) => set({ angle })} />
          <Slider label="色带数" value={opts.bands} min={1} max={8} step={1} format={(v) => String(v)} onChange={(bands) => set({ bands })} />
          <Slider label="速度" value={opts.speed} min={0} max={3} step={0.05} format={(v) => `${v.toFixed(2)}×`} onChange={(speed) => set({ speed })} />
          <Slider label="流动" value={opts.flow} min={0} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(flow) => set({ flow })} />
          <Slider label="缩放" value={opts.scale} min={0.25} max={3} step={0.05} format={(v) => `${v.toFixed(2)}×`} onChange={(scale) => set({ scale })} />
          <Slider label="柔化" value={opts.softness} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(softness) => set({ softness })} />
          <Slider label="缎面光" value={opts.silk} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(silk) => set({ silk })} />
          <Slider label="颗粒量" value={opts.grainAmount} min={0} max={0.5} step={0.01} format={(v) => v.toFixed(2)} onChange={(grainAmount) => set({ grainAmount })} />
          <Slider label="颗粒团" value={opts.grainSize} min={0.5} max={4} step={0.1} format={(v) => `${v.toFixed(1)}×`} onChange={(grainSize) => set({ grainSize })} />
          <Slider label="对比" value={opts.contrast} min={0.2} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(contrast) => set({ contrast })} />
          <Slider label="饱和" value={opts.saturation} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(saturation) => set({ saturation })} />
          <Slider label="搅动" value={opts.stir} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(stir) => set({ stir })} />
          <Slider label="种子" value={opts.variation} min={0} max={99} step={1} format={(v) => String(v)} onChange={(variation) => set({ variation })} />
          <ControlRow label="颗粒动画">
            <Switch checked={opts.grainAnimated} onChange={(grainAnimated) => set({ grainAnimated })} label="颗粒动画" />
          </ControlRow>
          <ControlRow label="白纸色板">
            <Switch checked={opts.lightMode} onChange={(lightMode) => set({ lightMode })} label="白纸色板" />
          </ControlRow>
          <ControlRow label="点击涡旋">
            <Switch checked={opts.clickSwirl} onChange={(clickSwirl) => set({ clickSwirl })} label="点击涡旋" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the ember palette flowing under live grain. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 170, background: "#101014" }}>
        <Grainient speed={0.6} grainAmount={0.12} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
