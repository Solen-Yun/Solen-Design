import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as Galaxy } from "../../src/components/galaxy/Galaxy.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Cursor repulsion and a click warp are the fastest way to feel the
   field; the layers slider shows the parallax rebuild. */

const DEFAULTS = {
  starColors: false,
  colorA: "#ffffff",
  colorB: "#9fd8ff",
  starSpeed: 0.5,
  speed: 1,
  density: 1,
  layers: 4,
  glowIntensity: 0.3,
  twinkleIntensity: 0.3,
  flareIntensity: 1,
  rotationSpeed: 0.1,
  repulsionStrength: 2,
  autoCenterRepulsion: 0,
  mouseInteraction: true,
  mouseRepulsion: true,
  clickWarp: true,
  direction: "forward",
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
      <div className="demo-stage" style={{ background: "#050507" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", height: 260 }}>
            <Galaxy
              starColors={opts.starColors ? [opts.colorA, opts.colorB] : undefined}
              starSpeed={opts.starSpeed}
              speed={opts.speed}
              density={opts.density}
              layers={opts.layers}
              glowIntensity={opts.glowIntensity}
              twinkleIntensity={opts.twinkleIntensity}
              flareIntensity={opts.flareIntensity}
              rotationSpeed={opts.rotationSpeed}
              repulsionStrength={opts.repulsionStrength}
              autoCenterRepulsion={opts.autoCenterRepulsion}
              mouseInteraction={opts.mouseInteraction}
              mouseRepulsion={opts.mouseRepulsion}
              clickWarp={opts.clickWarp}
              direction={opts.direction}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./galaxy-preview.html">
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
          <ControlRow label="显式星色">
            <Switch checked={opts.starColors} onChange={(starColors) => set({ starColors })} label="显式星色" />
          </ControlRow>
          {opts.starColors ? (
            <>
              <Color label="星色 A" value={opts.colorA} onChange={(colorA) => set({ colorA })} />
              <Color label="星色 B" value={opts.colorB} onChange={(colorB) => set({ colorB })} />
            </>
          ) : null}
          <Slider label="飞行速度" value={opts.starSpeed} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(starSpeed) => set({ starSpeed })} />
          <Slider label="深度倍率" value={opts.speed} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(speed) => set({ speed })} />
          <Slider label="密度" value={opts.density} min={0.2} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(density) => set({ density })} />
          <Slider label="层数" value={opts.layers} min={2} max={8} step={1} format={(v) => `${v} 层`} onChange={(layers) => set({ layers })} />
          <Slider label="辉光" value={opts.glowIntensity} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(glowIntensity) => set({ glowIntensity })} />
          <Slider label="闪烁" value={opts.twinkleIntensity} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(twinkleIntensity) => set({ twinkleIntensity })} />
          <Slider label="闪辉" value={opts.flareIntensity} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(flareIntensity) => set({ flareIntensity })} />
          <Slider label="旋转速度" value={opts.rotationSpeed} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(rotationSpeed) => set({ rotationSpeed })} />
          <Slider label="推斥强度" value={opts.repulsionStrength} min={0} max={6} step={0.1} format={(v) => v.toFixed(1)} onChange={(repulsionStrength) => set({ repulsionStrength })} />
          <Slider label="中心推斥" value={opts.autoCenterRepulsion} min={0} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(autoCenterRepulsion) => set({ autoCenterRepulsion })} />
          <ControlRow label="光标交互">
            <Switch checked={opts.mouseInteraction} onChange={(mouseInteraction) => set({ mouseInteraction })} label="光标交互" />
          </ControlRow>
          <ControlRow label="星点推斥">
            <Switch checked={opts.mouseRepulsion} onChange={(mouseRepulsion) => set({ mouseRepulsion })} label="星点推斥" />
          </ControlRow>
          <ControlRow label="点击跃迁">
            <Switch checked={opts.clickWarp} onChange={(clickWarp) => set({ clickWarp })} label="点击跃迁" />
          </ControlRow>
          <ControlRow label="反向飞行">
            <Switch
              checked={opts.direction === "backward"}
              onChange={(backward) => set({ direction: backward ? "backward" : "forward" })}
              label="反向飞行"
            />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 220, background: "#050507" }}>
        <Galaxy starSpeed={0.5} mouseInteraction={false} clickWarp={false} intro={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
