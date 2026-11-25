import { useState } from "react";
import { DemoFit } from "../demo-fit";
import DarkVeil from "../../src/components/dark-veil/DarkVeil.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Fast pointer strokes shear the veil locally; that is the silk drag. */

const DEFAULTS = {
  color: "#6b12ff",
  speed: 0.5,
  scale: 1,
  rotation: 0,
  flow: 1,
  warp: 0,
  brightness: 1,
  sheen: 0,
  glow: 0.4,
  grain: 0.03,
  mouseInteraction: true,
  paused: false,
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

function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => setOpts(DEFAULTS);

  return (
    <>
      <div
        className="demo-stage"
        style={{ background: opts.lightMode ? "#f4f4f5" : "#0a0a0f", colorScheme: opts.lightMode ? "light" : "dark" }}
      >
        <DemoFit>
          <div style={{ position: "relative", width: "100%", height: 340 }}>
            <DarkVeil
              color={opts.color}
              speed={opts.speed}
              scale={opts.scale}
              rotation={opts.rotation}
              flow={opts.flow}
              warp={opts.warp}
              brightness={opts.brightness}
              sheen={opts.sheen}
              glow={opts.glow}
              grain={opts.grain}
              mouseInteraction={opts.mouseInteraction}
              paused={opts.paused}
              lightMode={opts.lightMode}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./dark-veil-preview.html">
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
          <Color label="色调" value={opts.color} onChange={(color) => set({ color })} />
          <Slider label="速度" value={opts.speed} min={0} max={2} step={0.05} format={(v) => `${v.toFixed(2)}×`} onChange={(speed) => set({ speed })} />
          <Slider label="缩放" value={opts.scale} min={0.2} max={3} step={0.1} format={(v) => `${v.toFixed(1)}×`} onChange={(scale) => set({ scale })} />
          <Slider label="旋转" value={opts.rotation} min={0} max={360} step={5} format={(v) => `${v}°`} onChange={(rotation) => set({ rotation })} />
          <Slider label="流动" value={opts.flow} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(flow) => set({ flow })} />
          <Slider label="扭曲" value={opts.warp} min={0} max={2} step={0.1} format={(v) => v.toFixed(1)} onChange={(warp) => set({ warp })} />
          <Slider label="亮度" value={opts.brightness} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(brightness) => set({ brightness })} />
          <Slider label="辉光" value={opts.glow} min={0} max={1.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(glow) => set({ glow })} />
          <Slider label="光泽" value={opts.sheen} min={0} max={1.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(sheen) => set({ sheen })} />
          <Slider label="颗粒" value={opts.grain} min={0} max={0.2} step={0.005} format={(v) => v.toFixed(3)} onChange={(grain) => set({ grain })} />
          <ControlRow label="指针互动">
            <Switch checked={opts.mouseInteraction} onChange={(mouseInteraction) => set({ mouseInteraction })} label="指针互动" />
          </ControlRow>
          <ControlRow label="暂停">
            <Switch checked={opts.paused} onChange={(paused) => set({ paused })} label="暂停" />
          </ControlRow>
          <ControlRow label="明色模式">
            <Switch checked={opts.lightMode} onChange={(lightMode) => set({ lightMode })} label="明色模式" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the canonical violet veil resting on a near-black stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 170, background: "#0a0a0f" }}>
        <DarkVeil color="#6b12ff" glow={0.5} sheen={0.4} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
