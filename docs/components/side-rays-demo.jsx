import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as SideRays } from "../../src/components/side-rays/SideRays.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Defaults mirror the component's own defaults. */

const DEFAULTS = {
  rayColor1: "#FFC46B",
  rayColor2: "#96c8ff",
  blend: 0.6,
  speed: 2.5,
  intensity: 2,
  spread: 2,
  density: 5,
  dust: 0,
  followMouse: true,
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
          <div style={{ width: "100%", height: 520 }}>
            <SideRays
              rayColor1={opts.rayColor1}
              rayColor2={opts.rayColor2}
              blend={opts.blend}
              origin="top-right"
              speed={opts.speed}
              intensity={opts.intensity}
              spread={opts.spread}
              density={opts.density}
              dust={opts.dust}
              followMouse={opts.followMouse}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./side-rays-preview.html">
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
          <Color label="光色 1" value={opts.rayColor1} onChange={(rayColor1) => set({ rayColor1 })} />
          <Color label="光色 2" value={opts.rayColor2} onChange={(rayColor2) => set({ rayColor2 })} />
          <Slider label="混合" value={opts.blend} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(blend) => set({ blend })} />
          <Slider label="流速" value={opts.speed} min={0} max={5} step={0.1} format={(v) => v.toFixed(1)} onChange={(speed) => set({ speed })} />
          <Slider label="亮度" value={opts.intensity} min={0} max={4} step={0.1} format={(v) => v.toFixed(1)} onChange={(intensity) => set({ intensity })} />
          <Slider label="张角" value={opts.spread} min={0.2} max={4} step={0.1} format={(v) => v.toFixed(1)} onChange={(spread) => set({ spread })} />
          <Slider label="密度" value={opts.density} min={1} max={40} step={1} format={(v) => String(v)} onChange={(density) => set({ density })} />
          <Slider label="尘埃" value={opts.dust} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(dust) => set({ dust })} />
          <ControlRow label="跟随鼠标">
            <Switch checked={opts.followMouse} onChange={(followMouse) => set({ followMouse })} label="跟随鼠标" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the fan resting in a small dark stage, mouse reactions
   off so the card stays calm while the cursor passes over the gallery. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 220, background: "#101014" }}>
        <SideRays followMouse={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
