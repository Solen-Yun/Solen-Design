import { useState } from "react";
import { DemoFit } from "../demo-fit";
import DotField from "../../src/components/dot-field/DotField.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Hold the pointer down on the stage: that is the lens zoom at full force. */

const DEFAULTS = {
  pattern: "grid",
  bulgeStrength: 0.6,
  twist: 0,
  cursorRadius: 240,
  glowIntensity: 0.8,
  baseOpacity: 0.55,
  waveAmplitude: 0,
  sparkle: true,
  holdToZoom: true,
};

const PATTERNS = [
  ["grid", "方格"],
  ["hex", "六边"],
  ["spiral", "螺旋"],
  ["scatter", "散点"],
];

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

function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => setOpts(DEFAULTS);

  return (
    <>
      <div className="demo-stage" style={{ background: "#0a0a0f", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", height: 340 }}>
            <DotField
              pattern={opts.pattern}
              bulgeStrength={opts.bulgeStrength}
              twist={opts.twist}
              cursorRadius={opts.cursorRadius}
              glowIntensity={opts.glowIntensity}
              baseOpacity={opts.baseOpacity}
              waveAmplitude={opts.waveAmplitude}
              sparkle={opts.sparkle}
              holdToZoom={opts.holdToZoom}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./dot-field-preview.html">
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
          <ControlRow label="排布">
            <div className="view-tabs">
              {PATTERNS.map(([id, label]) => (
                <button key={id} type="button" className={opts.pattern === id ? "active" : ""} onClick={() => set({ pattern: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="透镜强度" value={opts.bulgeStrength} min={-1} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(bulgeStrength) => set({ bulgeStrength })} />
          <Slider label="旋涡" value={opts.twist} min={-360} max={360} step={5} format={(v) => `${v}°`} onChange={(twist) => set({ twist })} />
          <Slider label="透镜半径" value={opts.cursorRadius} min={60} max={600} step={10} format={(v) => `${v}px`} onChange={(cursorRadius) => set({ cursorRadius })} />
          <Slider label="光池强度" value={opts.glowIntensity} min={0} max={2} step={0.1} format={(v) => v.toFixed(1)} onChange={(glowIntensity) => set({ glowIntensity })} />
          <Slider label="基础不透明度" value={opts.baseOpacity} min={0.1} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(baseOpacity) => set({ baseOpacity })} />
          <Slider label="波动振幅" value={opts.waveAmplitude} min={0} max={60} step={1} format={(v) => `${v}px`} onChange={(waveAmplitude) => set({ waveAmplitude })} />
          <ControlRow label="闪烁">
            <Switch checked={opts.sparkle} onChange={(sparkle) => set({ sparkle })} label="闪烁" />
          </ControlRow>
          <ControlRow label="按住放大">
            <Switch checked={opts.holdToZoom} onChange={(holdToZoom) => set({ holdToZoom })} label="按住放大" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the violet field with the lens magnifying on the left third. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 170, background: "#0a0a0f" }}>
        <DotField dotSpacing={12} sparkle={true} glowIntensity={1} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
