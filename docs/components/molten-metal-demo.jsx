import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as MoltenMetal } from "../../src/components/molten-metal/MoltenMetal.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Drag to heat the filaments and leave a decaying trail, click for a
   flare, and switch colour modes to re-pivot the gradient. */

const DEFAULTS = {
  color1: "#5227FF",
  color2: "#FF9FFC",
  coreColor: "#FFFFFF",
  colorMode: "molten",
  speed: 0.35,
  scale: 4,
  detail: 3,
  glow: 1.6,
  thickness: 1,
  swirl: 1,
  turbulence: 0.2,
  haze: 0.75,
  brightness: 1.3,
  mouseStrength: 0.5,
  drift: 0.3,
  grain: 0.05,
  lightMode: false,
  mouseInteraction: true,
  flareOnClick: true,
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
      <div className="demo-stage" style={{ background: opts.lightMode ? "#f4f4f5" : "#101014", colorScheme: opts.lightMode ? "light" : "dark" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", maxWidth: 760, height: 320 }}>
            <MoltenMetal
              colors={[opts.color1, opts.color2]}
              coreColor={opts.coreColor}
              colorMode={opts.colorMode}
              speed={opts.speed}
              scale={opts.scale}
              detail={opts.detail}
              glow={opts.glow}
              thickness={opts.thickness}
              swirl={opts.swirl}
              turbulence={opts.turbulence}
              haze={opts.haze}
              brightness={opts.brightness}
              mouseStrength={opts.mouseStrength}
              drift={opts.drift}
              grain={opts.grain}
              lightMode={opts.lightMode}
              mouseInteraction={opts.mouseInteraction}
              flareOnClick={opts.flareOnClick}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./molten-metal-preview.html">
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
          <Color label="色带 1" value={opts.color1} onChange={(color1) => set({ color1 })} />
          <Color label="色带 2" value={opts.color2} onChange={(color2) => set({ color2 })} />
          <Color label="灯芯色" value={opts.coreColor} onChange={(coreColor) => set({ coreColor })} />
          <Slider label="速度" value={opts.speed} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(speed) => set({ speed })} />
          <Slider label="密度" value={opts.scale} min={1} max={10} step={0.5} format={(v) => v.toFixed(1)} onChange={(scale) => set({ scale })} />
          <Slider label="层数" value={opts.detail} min={1} max={8} step={1} format={(v) => String(v)} onChange={(detail) => set({ detail })} />
          <Slider label="亮度" value={opts.glow} min={0.2} max={4} step={0.1} format={(v) => v.toFixed(1)} onChange={(glow) => set({ glow })} />
          <Slider label="衰减" value={opts.thickness} min={0.2} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(thickness) => set({ thickness })} />
          <Slider label="扭转" value={opts.swirl} min={0} max={4} step={0.1} format={(v) => v.toFixed(1)} onChange={(swirl) => set({ swirl })} />
          <Slider label="湍流" value={opts.turbulence} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(turbulence) => set({ turbulence })} />
          <Slider label="雾霭" value={opts.haze} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(haze) => set({ haze })} />
          <Slider label="增益" value={opts.brightness} min={0.2} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(brightness) => set({ brightness })} />
          <Slider label="热迹强度" value={opts.mouseStrength} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(mouseStrength) => set({ mouseStrength })} />
          <Slider label="漂移" value={opts.drift} min={0} max={1.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(drift) => set({ drift })} />
          <Slider label="颗粒" value={opts.grain} min={0} max={0.3} step={0.01} format={(v) => v.toFixed(2)} onChange={(grain) => set({ grain })} />
          <ControlRow label="渐变枢轴">
            <div className="view-tabs">
              {[["molten", "熔融"], ["ember", "余烬"], ["frost", "霜白"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.colorMode === id ? "active" : ""} onClick={() => set({ colorMode: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="浅色墨水">
            <Switch checked={opts.lightMode} onChange={(lightMode) => set({ lightMode })} label="浅色墨水" />
          </ControlRow>
          <ControlRow label="热迹交互">
            <Switch checked={opts.mouseInteraction} onChange={(mouseInteraction) => set({ mouseInteraction })} label="热迹交互" />
          </ControlRow>
          <ControlRow label="点击亮斑">
            <Switch checked={opts.flareOnClick} onChange={(flareOnClick) => set({ flareOnClick })} label="点击亮斑" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the default molten field on the dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 170, background: "#101014" }}>
        <MoltenMetal />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
