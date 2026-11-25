import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as Plasma } from "../../src/components/plasma/Plasma.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Sweep the cursor to swing the fabric; it heats up under the pointer. */

const DEFAULTS = {
  color: "#a6a3b8",
  speed: 1,
  direction: "forward",
  scale: 1,
  twist: 1,
  wave: 1,
  softness: 0.5,
  shine: 1,
  brightness: 1,
  grain: 0.04,
  quality: 0.75,
  mouseInteractive: true,
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
            <Plasma
              color={opts.color}
              speed={opts.speed}
              direction={opts.direction}
              scale={opts.scale}
              twist={opts.twist}
              wave={opts.wave}
              softness={opts.softness}
              shine={opts.shine}
              brightness={opts.brightness}
              grain={opts.grain}
              quality={opts.quality}
              mouseInteractive={opts.mouseInteractive}
              lightMode={opts.lightMode}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./plasma-preview.html">
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
          <Color label="缎色" value={opts.color} onChange={(color) => set({ color })} />
          <Slider label="速度" value={opts.speed} min={0} max={3} step={0.1} format={(v) => `${v.toFixed(1)}×`} onChange={(speed) => set({ speed })} />
          <ControlRow label="时间方向">
            <div className="view-tabs">
              {[["forward", "正向"], ["reverse", "反向"], ["pingpong", "往返"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.direction === id ? "active" : ""} onClick={() => set({ direction: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="缩放" value={opts.scale} min={0.4} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(scale) => set({ scale })} />
          <Slider label="拧度" value={opts.twist} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(twist) => set({ twist })} />
          <Slider label="起伏" value={opts.wave} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(wave) => set({ wave })} />
          <Slider label="丝滑" value={opts.softness} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(softness) => set({ softness })} />
          <Slider label="高光" value={opts.shine} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(shine) => set({ shine })} />
          <Slider label="亮度" value={opts.brightness} min={0.2} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(brightness) => set({ brightness })} />
          <Slider label="颗粒" value={opts.grain} min={0} max={0.2} step={0.005} format={(v) => v.toFixed(3)} onChange={(grain) => set({ grain })} />
          <Slider label="渲染精度" value={opts.quality} min={0.25} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(quality) => set({ quality })} />
          <ControlRow label="鼠标交互">
            <Switch checked={opts.mouseInteractive} onChange={(mouseInteractive) => set({ mouseInteractive })} label="鼠标交互" />
          </ControlRow>
          <ControlRow label="浅色模式">
            <Switch checked={opts.lightMode} onChange={(lightMode) => set({ lightMode })} label="浅色模式" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the fabric drifting on its own; the cursor passing over
   the gallery must not swing it, so mouse interaction stays off. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 220, position: "relative", background: "#101014" }}>
        <Plasma speed={0.7} mouseInteractive={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
