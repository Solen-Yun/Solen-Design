import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as Iridescence } from "../../src/components/iridescence/Iridescence.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Drag across the surface to stir the folds, click to spin a vortex. */

const DEFAULTS = {
  color: "#ffffff",
  speed: 1,
  amplitude: 0.1,
  scale: 1,
  detail: 8,
  warp: 1,
  hueShift: 0,
  brightness: 1.5,
  stir: 0.5,
  sheen: 0.3,
  clickSwirl: true,
  grain: 0,
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
          <div style={{ position: "relative", width: "100%", height: 420 }}>
            <Iridescence
              color={opts.color}
              speed={opts.speed}
              amplitude={opts.amplitude}
              scale={opts.scale}
              detail={opts.detail}
              warp={opts.warp}
              hueShift={opts.hueShift}
              brightness={opts.brightness}
              stir={opts.stir}
              sheen={opts.sheen}
              clickSwirl={opts.clickSwirl}
              grain={opts.grain}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./iridescence-preview.html">
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
          <Color label="染色" value={opts.color} onChange={(color) => set({ color })} />
          <Slider label="流速" value={opts.speed} min={0} max={3} step={0.1} format={(v) => `${v.toFixed(1)}×`} onChange={(speed) => set({ speed })} />
          <Slider label="视差" value={opts.amplitude} min={0} max={0.5} step={0.01} format={(v) => v.toFixed(2)} onChange={(amplitude) => set({ amplitude })} />
          <Slider label="密度" value={opts.scale} min={0.2} max={3} step={0.05} format={(v) => `${v.toFixed(2)}×`} onChange={(scale) => set({ scale })} />
          <Slider label="细节" value={opts.detail} min={1} max={24} step={1} format={(v) => String(v)} onChange={(detail) => set({ detail })} />
          <Slider label="褶皱" value={opts.warp} min={0.2} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(warp) => set({ warp })} />
          <Slider label="色相" value={opts.hueShift} min={0} max={360} step={5} format={(v) => `${v}°`} onChange={(hueShift) => set({ hueShift })} />
          <Slider label="亮度" value={opts.brightness} min={0.2} max={2.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(brightness) => set({ brightness })} />
          <Slider label="搅动" value={opts.stir} min={0} max={1.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(stir) => set({ stir })} />
          <Slider label="光晕" value={opts.sheen} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(sheen) => set({ sheen })} />
          <Slider label="颗粒" value={opts.grain} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(grain) => set({ grain })} />
          <ControlRow label="点击涡旋">
            <Switch checked={opts.clickSwirl} onChange={(clickSwirl) => set({ clickSwirl })} label="点击涡旋" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the liquid surface resting in a small dark stage, mouse
   reactions off so the card stays calm while the cursor passes over the gallery. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 200, background: "#101014" }}>
        <Iridescence speed={0.6} mouseReact={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
