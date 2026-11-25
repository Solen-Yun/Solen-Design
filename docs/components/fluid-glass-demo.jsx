import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as FluidGlass } from "../../src/components/fluid-glass/FluidGlass.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Click the glass to morph between shapes; switch interaction to drag and fling it. */

const SHAPES = ["torus", "lens", "blob", "cube", "pill", "prism", "diamond"];

const DEFAULTS = {
  shape: "torus",
  size: 260,
  refraction: 1,
  dispersion: 0.35,
  reflection: 1,
  frost: 0,
  color: "#ffffff",
  tint: 0,
  shadow: 0.5,
  elevation: 0.4,
  interaction: "follow",
  smoothness: 0.5,
  wobble: 0.5,
  spin: 0.3,
  idle: true,
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
          <div
            style={{
              position: "relative",
              width: "100%",
              height: 420,
              overflow: "hidden",
              borderRadius: 16,
              background: "radial-gradient(circle at 70% 25%, #3b2f63 0%, transparent 55%), linear-gradient(160deg, #191722, #101014)",
            }}
          >
            <FluidGlass
              text="Look closer."
              shape={opts.shape}
              size={opts.size}
              refraction={opts.refraction}
              dispersion={opts.dispersion}
              reflection={opts.reflection}
              frost={opts.frost}
              color={opts.color}
              tint={opts.tint}
              shadow={opts.shadow}
              elevation={opts.elevation}
              interaction={opts.interaction}
              smoothness={opts.smoothness}
              wobble={opts.wobble}
              spin={opts.spin}
              idle={opts.idle}
              onShapeChange={(shape) => console.log("morphed to", shape)}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./fluid-glass-preview.html">
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
          <ControlRow label="形状">
            <div className="view-tabs">
              {SHAPES.map((shape) => (
                <button key={shape} type="button" className={opts.shape === shape ? "active" : ""} onClick={() => set({ shape })}>
                  {shape}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="互动方式">
            <div className="view-tabs">
              {[["follow", "跟随"], ["static", "固定"], ["drag", "拖拽"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.interaction === id ? "active" : ""} onClick={() => set({ interaction: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Color label="玻璃染色" value={opts.color} onChange={(color) => set({ color })} />
          <Slider label="尺寸" value={opts.size} min={120} max={360} step={10} format={(v) => `${v}px`} onChange={(size) => set({ size })} />
          <Slider label="折射" value={opts.refraction} min={0} max={2} step={0.1} format={(v) => v.toFixed(1)} onChange={(refraction) => set({ refraction })} />
          <Slider label="色散" value={opts.dispersion} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(dispersion) => set({ dispersion })} />
          <Slider label="反射" value={opts.reflection} min={0} max={2} step={0.1} format={(v) => v.toFixed(1)} onChange={(reflection) => set({ reflection })} />
          <Slider label="磨砂" value={opts.frost} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(frost) => set({ frost })} />
          <Slider label="染色强度" value={opts.tint} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(tint) => set({ tint })} />
          <Slider label="投影" value={opts.shadow} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(shadow) => set({ shadow })} />
          <Slider label="悬浮高度" value={opts.elevation} min={0} max={2} step={0.1} format={(v) => v.toFixed(1)} onChange={(elevation) => set({ elevation })} />
          <Slider label="弹簧柔度" value={opts.smoothness} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(smoothness) => set({ smoothness })} />
          <Slider label="柔韧度" value={opts.wobble} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(wobble) => set({ wobble })} />
          <Slider label="自旋" value={opts.spin} min={-2} max={2} step={0.1} format={(v) => v.toFixed(1)} onChange={(spin) => set({ spin })} />
          <ControlRow label="闲置漂移">
            <Switch checked={opts.idle} onChange={(idle) => set({ idle })} label="闲置漂移" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — one glass torus refracting the headline. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 320,
          overflow: "hidden",
          background: "radial-gradient(circle at 70% 20%, #3b2f63 0%, transparent 55%), linear-gradient(160deg, #191722, #101014)",
        }}
      >
        <FluidGlass text="Look closer." size={200} intro={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
