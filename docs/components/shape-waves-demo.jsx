import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as ShapeWaves } from "../../src/components/shape-waves/ShapeWaves.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Sweep the cursor across the field quickly to launch a ripple that
   travels cell by cell; that is the core of the component. */

const DEFAULTS = {
  text: "",
  shapes: "mixed",
  cellSize: 10,
  dotSize: 0.75,
  color: "#929292",
  hoverColor: "#ffffff",
  backgroundColor: "#000000",
  speed: 1,
  glow: 0.35,
  splashRadius: 40,
  splashStrength: 0.4,
  fade: 0.25,
  intro: true,
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
          <div style={{ position: "relative", width: "100%", height: 420 }}>
            <ShapeWaves
              text={opts.text}
              shapes={opts.shapes}
              cellSize={opts.cellSize}
              dotSize={opts.dotSize}
              color={opts.color}
              hoverColor={opts.hoverColor}
              backgroundColor={opts.backgroundColor}
              speed={opts.speed}
              glow={opts.glow}
              splashRadius={opts.splashRadius}
              splashStrength={opts.splashStrength}
              fade={opts.fade}
              intro={opts.intro}
              introKey={opts.intro ? 1 : 0}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./shape-waves-preview.html">
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
          <ControlRow label="文字遮罩">
            <input
              type="text"
              value={opts.text}
              placeholder="留空关闭"
              onChange={(event) => set({ text: event.target.value })}
              aria-label="文字遮罩"
              style={{ width: "100%", background: "transparent", color: "inherit", border: "1px solid currentColor", borderRadius: 6, padding: "4px 8px", font: "inherit" }}
            />
          </ControlRow>
          <ControlRow label="形状">
            <div className="view-tabs">
              {[["mixed", "混合"], ["squares", "方"], ["circles", "圆"], ["triangles", "三角"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.shapes === id ? "active" : ""} onClick={() => set({ shapes: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Color label="静息色" value={opts.color} onChange={(color) => set({ color })} />
          <Color label="波峰色" value={opts.hoverColor} onChange={(hoverColor) => set({ hoverColor })} />
          <Color label="底色" value={opts.backgroundColor} onChange={(backgroundColor) => set({ backgroundColor })} />
          <Slider label="格距" value={opts.cellSize} min={4} max={24} step={1} format={(v) => `${v}px`} onChange={(cellSize) => set({ cellSize })} />
          <Slider label="形状大小" value={opts.dotSize} min={0.2} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(dotSize) => set({ dotSize })} />
          <Slider label="波速" value={opts.speed} min={0} max={3} step={0.1} format={(v) => `${v.toFixed(1)}×`} onChange={(speed) => set({ speed })} />
          <Slider label="辉光" value={opts.glow} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(glow) => set({ glow })} />
          <Slider label="水花半径" value={opts.splashRadius} min={10} max={120} step={2} format={(v) => `${v}px`} onChange={(splashRadius) => set({ splashRadius })} />
          <Slider label="水花强度" value={opts.splashStrength} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(splashStrength) => set({ splashStrength })} />
          <Slider label="边缘衰减" value={opts.fade} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(fade) => set({ fade })} />
          <ControlRow label="扫入动画">
            <Switch checked={opts.intro} onChange={(intro) => set({ intro })} label="扫入动画" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the field resting on a dark stage, cursor reactions off
   so the card stays calm while the cursor passes over the gallery. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 220, background: "#101014" }}>
        <ShapeWaves speed={0.6} glow={0.35} interactive={false} intro={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
