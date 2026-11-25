import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as RippleDistortion } from "../../src/components/ripple-distortion/RippleDistortion.jsx";

/* The demo plus a live customize panel — every control is a real option.
   The photo is an inline SVG scene, so the water works with zero network.
   Sweep the pointer for a wake; switch to click mode for heavy drops. */

const PHOTO = `./assets/demo-photos/photo-01.jpg`;

const DEFAULTS = {
  brushSize: 150,
  strength: 0.2,
  swirl: 1,
  rings: 4,
  spread: 5,
  fade: 3,
  spacing: 15,
  dispersion: 0,
  glint: 0,
  tint: "#a855f7",
  tintAmount: 0.1,
  grayscale: true,
  highlightColor: "#ffffff",
  trigger: "hover",
  clickStrength: 2,
  quality: "low",
  enabled: true,
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

function Tabs({ options, value, onChange, label }) {
  return (
    <ControlRow label={label}>
      <div className="view-tabs">
        {options.map(([id, text]) => (
          <button key={id} type="button" className={value === id ? "active" : undefined} onClick={() => onChange(id)}>
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
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", height: 340 }}>
            <RippleDistortion src={PHOTO} {...opts} />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./ripple-distortion-preview.html">
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
          <Tabs
            label="触发"
            value={opts.trigger}
            onChange={(trigger) => set({ trigger })}
            options={[
              ["hover", "悬停"],
              ["click", "点击"],
            ]}
          />
          <Slider label="水波大小" value={opts.brushSize} min={40} max={400} step={10} format={(v) => `${v}px`} onChange={(brushSize) => set({ brushSize })} />
          <Slider label="推移强度" value={opts.strength} min={0} max={0.6} step={0.01} format={(v) => v.toFixed(2)} onChange={(strength) => set({ strength })} />
          <Slider label="旋度" value={opts.swirl} min={0} max={4} step={0.1} format={(v) => v.toFixed(1)} onChange={(swirl) => set({ swirl })} />
          <Slider label="波脊数" value={opts.rings} min={1} max={10} step={1} format={(v) => String(v)} onChange={(rings) => set({ rings })} />
          <Slider label="扩张" value={opts.spread} min={1} max={12} step={0.5} format={(v) => v.toFixed(1)} onChange={(spread) => set({ spread })} />
          <Slider label="衰减" value={opts.fade} min={0.5} max={8} step={0.1} format={(v) => `${v.toFixed(1)}s`} onChange={(fade) => set({ fade })} />
          <Slider label="落点间距" value={opts.spacing} min={2} max={80} step={1} format={(v) => `${v}px`} onChange={(spacing) => set({ spacing })} />
          <Slider label="色散" value={opts.dispersion} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(dispersion) => set({ dispersion })} />
          <Slider label="高光" value={opts.glint} min={0} max={1.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(glint) => set({ glint })} />
          <Color label="渗色" value={opts.tint} onChange={(tint) => set({ tint })} />
          <Slider label="渗色强度" value={opts.tintAmount} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(tintAmount) => set({ tintAmount })} />
          <Slider label="点击倍率" value={opts.clickStrength} min={1} max={4} step={0.5} format={(v) => v.toFixed(1)} onChange={(clickStrength) => set({ clickStrength })} />
          <Tabs
            label="画质"
            value={opts.quality}
            onChange={(quality) => set({ quality })}
            options={[
              ["low", "低"],
              ["medium", "中"],
              ["high", "高"],
            ]}
          />
          <ControlRow label="保持灰度">
            <Switch checked={opts.grayscale} onChange={(grayscale) => set({ grayscale })} label="保持灰度" />
          </ControlRow>
          <ControlRow label="启用落波">
            <Switch checked={opts.enabled} onChange={(enabled) => set({ enabled })} label="启用落波" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the lake mid-ripple on the dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 190, background: "#101014" }}>
        <RippleDistortion src={PHOTO} brushSize={120} strength={0.16} glint={0.5} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
