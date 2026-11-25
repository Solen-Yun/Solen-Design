import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as PatternWaves } from "../../src/components/pattern-waves/PatternWaves.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Drag across the surface to punch water ripples through the marks, click
   for a burst, and switch presets/patterns for totally different cloths. */

const DEFAULTS = {
  preset: "silk",
  pattern: "dot",
  wave: "silk",
  spacing: 9,
  markSize: 0.95,
  depth: 0.95,
  shine: 0.8,
  contrast: 1.2,
  speed: 0.35,
  scale: 1,
  direction: 20,
  color: "#ffffff",
  fade: "edges",
  fadeSize: 0.5,
  cursorSize: 50,
  cursorStrength: 0.6,
  interactive: true,
  paused: false,
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

const PRESETS = [
  ["silk", "绸缎"],
  ["ocean", "海面"],
  ["pond", "池塘"],
  ["lines", "线纹"],
  ["terminal", "终端"],
  ["mesh", "网格"],
];

const PATTERNS = [
  ["dot", "圆点"],
  ["square", "方块"],
  ["plus", "十字"],
  ["line", "连线"],
  ["glyph", "字符"],
];

const WAVES = [
  ["silk", "绸褶"],
  ["swell", "涌浪"],
  ["ripple", "圆环"],
];

const FADES = [
  ["none", "无"],
  ["edges", "边缘"],
  ["center", "中心"],
  ["bottom", "底边"],
  ["top", "顶边"],
];

function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => setOpts(DEFAULTS);

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", maxWidth: 760, height: 340 }}>
            <PatternWaves
              preset={opts.preset}
              pattern={opts.pattern}
              wave={opts.wave}
              spacing={opts.spacing}
              markSize={opts.markSize}
              depth={opts.depth}
              shine={opts.shine}
              contrast={opts.contrast}
              speed={opts.speed}
              scale={opts.scale}
              direction={opts.direction}
              color={opts.color}
              fade={opts.fade}
              fadeSize={opts.fadeSize}
              cursorSize={opts.cursorSize}
              cursorStrength={opts.cursorStrength}
              interactive={opts.interactive}
              paused={opts.paused}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./pattern-waves-preview.html">
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
          <Color label="记号色" value={opts.color} onChange={(color) => set({ color })} />
          <Slider label="间距" value={opts.spacing} min={4} max={40} step={1} format={(v) => `${v}px`} onChange={(spacing) => set({ spacing })} />
          <Slider label="记号大小" value={opts.markSize} min={0.1} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(markSize) => set({ markSize })} />
          <Slider label="深度" value={opts.depth} min={0} max={1.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(depth) => set({ depth })} />
          <Slider label="高光" value={opts.shine} min={0} max={2} step={0.1} format={(v) => v.toFixed(1)} onChange={(shine) => set({ shine })} />
          <Slider label="对比" value={opts.contrast} min={0.3} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(contrast) => set({ contrast })} />
          <Slider label="速度" value={opts.speed} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(speed) => set({ speed })} />
          <Slider label="浪尺度" value={opts.scale} min={0.2} max={5} step={0.1} format={(v) => v.toFixed(1)} onChange={(scale) => set({ scale })} />
          <Slider label="方向" value={opts.direction} min={0} max={360} step={5} format={(v) => `${v}°`} onChange={(direction) => set({ direction })} />
          <Slider label="消隐带" value={opts.fadeSize} min={0.05} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(fadeSize) => set({ fadeSize })} />
          <Slider label="水波半径" value={opts.cursorSize} min={10} max={200} step={5} format={(v) => `${v}px`} onChange={(cursorSize) => set({ cursorSize })} />
          <Slider label="水波强度" value={opts.cursorStrength} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(cursorStrength) => set({ cursorStrength })} />
          <ControlRow label="预设外观">
            <div className="view-tabs">
              {PRESETS.map(([id, label]) => (
                <button key={id} type="button" className={opts.preset === id ? "active" : ""} onClick={() => set({ preset: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="记号形状">
            <div className="view-tabs">
              {PATTERNS.map(([id, label]) => (
                <button key={id} type="button" className={opts.pattern === id ? "active" : ""} onClick={() => set({ pattern: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="波浪模型">
            <div className="view-tabs">
              {WAVES.map(([id, label]) => (
                <button key={id} type="button" className={opts.wave === id ? "active" : ""} onClick={() => set({ wave: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="消隐">
            <div className="view-tabs">
              {FADES.map(([id, label]) => (
                <button key={id} type="button" className={opts.fade === id ? "active" : ""} onClick={() => set({ fade: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="水波交互">
            <Switch checked={opts.interactive} onChange={(interactive) => set({ interactive })} label="水波交互" />
          </ControlRow>
          <ControlRow label="定格">
            <Switch checked={opts.paused} onChange={(paused) => set({ paused })} label="定格" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the default silk halftone on the dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 170, background: "#101014" }}>
        <PatternWaves spacing={10} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
