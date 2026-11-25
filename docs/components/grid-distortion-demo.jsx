import { useState } from "react";
import { DemoFit } from "../demo-fit";
import GridDistortion from "../../src/components/grid-distortion/GridDistortion.jsx";

/* The demo plus a live customize panel — every control is a real option.
   The image is an inline SVG data URI; drag fast to shatter the blocks. */

const SCENE = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="640">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#2b1a4e"/>
      <stop offset="0.45" stop-color="#7c3aed"/>
      <stop offset="0.78" stop-color="#f472b6"/>
      <stop offset="1" stop-color="#fde68a"/>
    </linearGradient>
    <radialGradient id="sun" cx="0.68" cy="0.32" r="0.28">
      <stop offset="0" stop-color="#fff7ed"/>
      <stop offset="0.55" stop-color="#fdba74" stop-opacity="0.9"/>
      <stop offset="1" stop-color="#fdba74" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="960" height="640" fill="url(#sky)"/>
  <rect width="960" height="640" fill="url(#sun)"/>
  <circle cx="653" cy="205" r="74" fill="#fff7ed"/>
  <path d="M0 470 L240 380 L430 452 L620 368 L810 448 L960 400 L960 640 L0 640 Z" fill="#1e1040" opacity="0.85"/>
  <path d="M0 540 L200 480 L420 540 L640 472 L840 536 L960 500 L960 640 L0 640 Z" fill="#120a28"/>
  <text x="52" y="118" font-family="Georgia, serif" font-size="56" fill="#fff7ed" opacity="0.92">Dusk Grid</text>
</svg>`,
);
const IMAGE = `./assets/demo-photos/photo-01.jpg`;

const DEFAULTS = {
  imageSrc: IMAGE,
  grid: 15,
  radius: 0.18,
  strength: 0.15,
  relaxation: 0.96,
  mode: "drag",
  softness: 0,
  chroma: 0,
  idle: 0.3,
  clickRipple: true,
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

function Tabs({ label, value, options, onChange }) {
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
            <GridDistortion {...opts} />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./grid-distortion-preview.html">
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
          <Tabs label="笔刷" value={opts.mode} options={[["drag", "拖拽"], ["push", "推开"], ["swirl", "拧转"]]} onChange={(mode) => set({ mode })} />
          <Slider label="网格" value={opts.grid} min={4} max={60} step={1} format={(v) => String(v)} onChange={(grid) => set({ grid })} />
          <Slider label="笔刷半径" value={opts.radius} min={0.02} max={0.5} step={0.01} format={(v) => v.toFixed(2)} onChange={(radius) => set({ radius })} />
          <Slider label="力度" value={opts.strength} min={0} max={0.6} step={0.01} format={(v) => v.toFixed(2)} onChange={(strength) => set({ strength })} />
          <Slider label="回弹" value={opts.relaxation} min={0.8} max={0.99} step={0.01} format={(v) => v.toFixed(2)} onChange={(relaxation) => set({ relaxation })} />
          <Slider label="平滑" value={opts.softness} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(softness) => set({ softness })} />
          <Slider label="色差" value={opts.chroma} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(chroma) => set({ chroma })} />
          <Slider label="幽灵光标" value={opts.idle} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(idle) => set({ idle })} />
          <ControlRow label="点击波纹">
            <Switch checked={opts.clickRipple} onChange={(clickRipple) => set({ clickRipple })} label="点击波纹" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the dusk artwork settling back after a hard drag. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 170, background: "#101014" }}>
        <GridDistortion imageSrc={IMAGE} grid={18} strength={0.18} intro={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
