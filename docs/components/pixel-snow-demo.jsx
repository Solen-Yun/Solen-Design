import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as PixelSnow } from "../../src/components/pixel-snow/PixelSnow.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Sweep the cursor through the flakes, then let accumulate build a bank. */

const DEFAULTS = {
  color: "#ffffff",
  variant: "snowflake",
  density: 0.5,
  speed: 1,
  wind: 0.25,
  sway: 0.5,
  flakeSize: 1,
  pixelSize: 3,
  depth: 0.6,
  brightness: 1,
  glow: 0.8,
  twinkle: 0.35,
  accumulate: false,
  mouseInteraction: true,
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
            <PixelSnow
              color={opts.color}
              variant={opts.variant}
              density={opts.density}
              speed={opts.speed}
              wind={opts.wind}
              sway={opts.sway}
              flakeSize={opts.flakeSize}
              pixelSize={opts.pixelSize}
              depth={opts.depth}
              brightness={opts.brightness}
              glow={opts.glow}
              twinkle={opts.twinkle}
              accumulate={opts.accumulate}
              mouseInteraction={opts.mouseInteraction}
              lightMode={opts.lightMode}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./pixel-snow-preview.html">
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
          <Color label="雪色" value={opts.color} onChange={(color) => set({ color })} />
          <ControlRow label="形状">
            <div className="view-tabs">
              {[["square", "方糖"], ["round", "圆点"], ["snowflake", "雪花"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.variant === id ? "active" : ""} onClick={() => set({ variant: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="密度" value={opts.density} min={0.05} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(density) => set({ density })} />
          <Slider label="速度" value={opts.speed} min={0} max={3} step={0.1} format={(v) => `${v.toFixed(1)}×`} onChange={(speed) => set({ speed })} />
          <Slider label="风" value={opts.wind} min={-1} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(wind) => set({ wind })} />
          <Slider label="摆动" value={opts.sway} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(sway) => set({ sway })} />
          <Slider label="体型" value={opts.flakeSize} min={0.5} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(flakeSize) => set({ flakeSize })} />
          <Slider label="像素颗粒" value={opts.pixelSize} min={1} max={8} step={1} format={(v) => `${v}px`} onChange={(pixelSize) => set({ pixelSize })} />
          <Slider label="景深" value={opts.depth} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(depth) => set({ depth })} />
          <Slider label="辉光" value={opts.glow} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(glow) => set({ glow })} />
          <Slider label="闪烁" value={opts.twinkle} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(twinkle) => set({ twinkle })} />
          <ControlRow label="积雪">
            <Switch checked={opts.accumulate} onChange={(accumulate) => set({ accumulate })} label="积雪" />
          </ControlRow>
          <ControlRow label="鼠标拨雪">
            <Switch checked={opts.mouseInteraction} onChange={(mouseInteraction) => set({ mouseInteraction })} label="鼠标拨雪" />
          </ControlRow>
          <ControlRow label="浅色模式">
            <Switch checked={opts.lightMode} onChange={(lightMode) => set({ lightMode })} label="浅色模式" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — a calm field of snow; the cursor passing over the gallery
   must not carve into it, so mouse interaction stays off in the card. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 220, position: "relative", background: "#101014" }}>
        <PixelSnow variant="snowflake" density={0.4} pixelSize={3} glow={0.7} mouseInteraction={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
