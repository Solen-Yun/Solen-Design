import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as FluxLines } from "../../src/components/flux-lines/FluxLines.jsx";

/* The demo plus a live customize panel — every control is a real option.
   The magnet bending nearby filaments and the click vortex are the
   fastest way to feel the field. */

const DEFAULTS = {
  colorA: "#ffffff",
  colorB: "#9fd8ff",
  colorC: "#3b6cff",
  speed: 0.5,
  scale: 1.6,
  turbulence: 1,
  fluidity: 0.1,
  rimWidth: 0.2,
  glow: 2,
  lineWidth: 1,
  mouseStrength: 1,
  mouseRadius: 0.35,
  mouseDampening: 0.15,
  mouseInteraction: true,
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

/* A background component: the host owns the size, so the demo hands it a
   positioned box and lets it fill. */
function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => setOpts(DEFAULTS);

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", height: 260 }}>
            <FluxLines
              colors={[opts.colorA, opts.colorB, opts.colorC]}
              speed={opts.speed}
              scale={opts.scale}
              turbulence={opts.turbulence}
              fluidity={opts.fluidity}
              rimWidth={opts.rimWidth}
              glow={opts.glow}
              lineWidth={opts.lineWidth}
              mouseStrength={opts.mouseStrength}
              mouseRadius={opts.mouseRadius}
              mouseDampening={opts.mouseDampening}
              mouseInteraction={opts.mouseInteraction}
              clickSwirl={opts.clickSwirl}
              lightMode={opts.lightMode}
              transparent={!opts.lightMode}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./flux-lines-preview.html">
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
          <Color label="灯丝色 A" value={opts.colorA} onChange={(colorA) => set({ colorA })} />
          <Color label="灯丝色 B" value={opts.colorB} onChange={(colorB) => set({ colorB })} />
          <Color label="灯丝色 C" value={opts.colorC} onChange={(colorC) => set({ colorC })} />
          <Slider label="流速" value={opts.speed} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(speed) => set({ speed })} />
          <Slider label="密度" value={opts.scale} min={0.5} max={4} step={0.1} format={(v) => v.toFixed(1)} onChange={(scale) => set({ scale })} />
          <Slider label="扰动" value={opts.turbulence} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(turbulence) => set({ turbulence })} />
          <Slider label="熔接度" value={opts.fluidity} min={0.01} max={0.6} step={0.01} format={(v) => v.toFixed(2)} onChange={(fluidity) => set({ fluidity })} />
          <Slider label="光带宽度" value={opts.rimWidth} min={0.02} max={0.8} step={0.02} format={(v) => v.toFixed(2)} onChange={(rimWidth) => set({ rimWidth })} />
          <Slider label="辉光" value={opts.glow} min={0} max={5} step={0.1} format={(v) => v.toFixed(1)} onChange={(glow) => set({ glow })} />
          <Slider label="芯线宽" value={opts.lineWidth} min={0} max={4} step={0.5} format={(v) => `${v}px`} onChange={(lineWidth) => set({ lineWidth })} />
          <Slider label="磁铁拉力" value={opts.mouseStrength} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(mouseStrength) => set({ mouseStrength })} />
          <Slider label="磁铁半径" value={opts.mouseRadius} min={0.05} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(mouseRadius) => set({ mouseRadius })} />
          <Slider label="跟随延迟" value={opts.mouseDampening} min={0} max={0.6} step={0.05} format={(v) => `${v.toFixed(2)}s`} onChange={(mouseDampening) => set({ mouseDampening })} />
          <ControlRow label="磁铁交互">
            <Switch checked={opts.mouseInteraction} onChange={(mouseInteraction) => set({ mouseInteraction })} label="磁铁交互" />
          </ControlRow>
          <ControlRow label="点击旋涡">
            <Switch checked={opts.clickSwirl} onChange={(clickSwirl) => set({ clickSwirl })} label="点击旋涡" />
          </ControlRow>
          <ControlRow label="浅色模式">
            <Switch checked={opts.lightMode} onChange={(lightMode) => set({ lightMode })} label="浅色模式" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 220, background: "#101014" }}>
        <FluxLines
          colors={["#ffffff", "#9fd8ff", "#3b6cff"]}
          speed={0.5}
          mouseInteraction={false}
          clickSwirl={false}
          intro={false}
        />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
