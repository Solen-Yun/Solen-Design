import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as Prism } from "../../src/components/prism/Prism.jsx";

/* The demo plus a live customize panel — every control is a real option.
   The palette toggle swaps the built-in spectrum for a custom colour ring. */

const SPECTRUM = { hueShift: 0, saturation: 1.5, colorFrequency: 1, colors: undefined };
const PALETTE = { hueShift: 0, saturation: 1.5, colorFrequency: 1, colors: ["#8b5cf6", "#ec4899", "#f59e0b", "#22d3ee"] };

const DEFAULTS = {
  ...SPECTRUM,
  height: 3.5,
  baseWidth: 5.5,
  animationType: "rotate",
  glow: 1,
  noise: 0,
  scale: 3.6,
  timeScale: 0.5,
  interactive: true,
  hoverStrength: 2,
  inertia: 0.05,
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

/* A background component: the host owns the size, so the demo hands it a
   100%-wide, fixed-height box exactly like the usage example does. */
function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => setOpts(DEFAULTS);
  const customPalette = Array.isArray(opts.colors);

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ width: "100%", height: 520, position: "relative" }}>
            <Prism
              height={opts.height}
              baseWidth={opts.baseWidth}
              animationType={opts.animationType}
              glow={opts.glow}
              noise={opts.noise}
              scale={opts.scale}
              hueShift={opts.hueShift}
              colorFrequency={opts.colorFrequency}
              colors={opts.colors}
              saturation={opts.saturation}
              timeScale={opts.timeScale}
              interactive={opts.interactive}
              hoverStrength={opts.hoverStrength}
              inertia={opts.inertia}
              lightMode={opts.lightMode}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./prism-preview.html">
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
          <ControlRow label="自定义色板">
            <Switch
              checked={customPalette}
              onChange={(on) => set(on ? PALETTE : SPECTRUM)}
              label="自定义色板"
            />
          </ControlRow>
          <ControlRow label="动画姿态">
            <div className="view-tabs">
              {[["rotate", "摆旋"], ["rotate3d", "翻滚"], ["hover", "悬停"], ["static", "静止"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.animationType === id ? "active" : ""} onClick={() => set({ animationType: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="色相旋转" value={opts.hueShift} min={-180} max={180} step={1} format={(v) => `${v}°`} onChange={(hueShift) => set({ hueShift })} />
          <Slider label="光谱密度" value={opts.colorFrequency} min={0.2} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(colorFrequency) => set({ colorFrequency })} />
          <Slider label="饱和度" value={opts.saturation} min={0} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(saturation) => set({ saturation })} />
          <Slider label="辉光" value={opts.glow} min={0.2} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(glow) => set({ glow })} />
          <Slider label="高度" value={opts.height} min={1.5} max={6} step={0.1} format={(v) => v.toFixed(1)} onChange={(height) => set({ height })} />
          <Slider label="底宽" value={opts.baseWidth} min={2} max={9} step={0.1} format={(v) => v.toFixed(1)} onChange={(baseWidth) => set({ baseWidth })} />
          <Slider label="缩放" value={opts.scale} min={2} max={6} step={0.1} format={(v) => v.toFixed(1)} onChange={(scale) => set({ scale })} />
          <Slider label="动画速度" value={opts.timeScale} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(timeScale) => set({ timeScale })} />
          <Slider label="颗粒" value={opts.noise} min={0} max={0.5} step={0.01} format={(v) => v.toFixed(2)} onChange={(noise) => set({ noise })} />
          <Slider label="倾斜幅度" value={opts.hoverStrength} min={0.5} max={4} step={0.1} format={(v) => v.toFixed(1)} onChange={(hoverStrength) => set({ hoverStrength })} />
          <Slider label="惯性" value={opts.inertia} min={0.01} max={0.3} step={0.01} format={(v) => v.toFixed(2)} onChange={(inertia) => set({ inertia })} />
          <ControlRow label="鼠标跟随">
            <Switch checked={opts.interactive} onChange={(interactive) => set({ interactive })} label="鼠标跟随" />
          </ControlRow>
          <ControlRow label="浅色模式">
            <Switch checked={opts.lightMode} onChange={(lightMode) => set({ lightMode })} label="浅色模式" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — a calm rotating prism; the cursor passing over the gallery
   must not tilt it, so interactivity stays off in the card. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 220, position: "relative", background: "#101014" }}>
        <Prism animationType="rotate3d" timeScale={0.4} interactive={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
