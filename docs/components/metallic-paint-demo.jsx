import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as MetallicPaint } from "../../src/components/metallic-paint/MetallicPaint.jsx";

/* The demo plus a live customize panel — every control is a real option.
   The metal pours into the word once, then flows forever; drag the
   pointer to tilt the gradient. */

const DEFAULTS = {
  text: "SOLEN",
  fontFamily: "system-ui, sans-serif",
  fontWeight: 800,
  color: "#ffffff",
  backgroundColor: "transparent",
  density: 2,
  softness: 0.1,
  dispersion: 0.3,
  distortion: 0.07,
  edgeBend: 0.6,
  angle: 70,
  speed: 1,
  scale: 0.6,
  rotation: 0,
  mouseTilt: 0.5,
  lightMode: false,
  intro: true,
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

function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => setOpts(DEFAULTS);

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", height: 300 }}>
            <MetallicPaint {...opts} />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./metallic-paint-preview.html">
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
          <Color label="染色光泽" value={opts.color} onChange={(color) => set({ color })} />
          <Slider label="条纹密度" value={opts.density} min={0.5} max={12} step={0.5} format={(v) => v.toFixed(1)} onChange={(density) => set({ density })} />
          <Slider label="边缘柔化" value={opts.softness} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(softness) => set({ softness })} />
          <Slider label="色散" value={opts.dispersion} min={-1} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(dispersion) => set({ dispersion })} />
          <Slider label="噪声扰动" value={opts.distortion} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(distortion) => set({ distortion })} />
          <Slider label="轮廓弯折" value={opts.edgeBend} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(edgeBend) => set({ edgeBend })} />
          <Slider label="流向角度" value={opts.angle} min={0} max={360} step={5} format={(v) => `${v}°`} onChange={(angle) => set({ angle })} />
          <Slider label="流速" value={opts.speed} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(speed) => set({ speed })} />
          <Slider label="形状大小" value={opts.scale} min={0.1} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(scale) => set({ scale })} />
          <Slider label="旋转" value={opts.rotation} min={-45} max={45} step={1} format={(v) => `${v}°`} onChange={(rotation) => set({ rotation })} />
          <Slider label="指针倾斜" value={opts.mouseTilt} min={0} max={1.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(mouseTilt) => set({ mouseTilt })} />
          <ControlRow label="浅色模式">
            <Switch checked={opts.lightMode} onChange={(lightMode) => set({ lightMode })} label="浅色模式" />
          </ControlRow>
          <ControlRow label="暂停">
            <Switch checked={opts.paused} onChange={(paused) => set({ paused })} label="暂停" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the chrome word resting on the dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 190, background: "#101014" }}>
        <MetallicPaint text="SOLEN" scale={0.5} intro={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
