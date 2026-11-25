import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as HalftoneReveal } from "../../src/components/halftone-reveal/HalftoneReveal.jsx";

/* The demo plus a live customize panel — every control is a real option.
   The photo is an inline SVG scene, so the press works with zero network.
   Sweep the pointer to develop the real photo; click for shockwaves. */

const PHOTO = `./assets/demo-photos/photo-01.jpg`;

const DEFAULTS = {
  fit: "cover",
  mode: "mono",
  shape: "dot",
  cellSize: 6,
  angle: 45,
  dotScale: 1,
  inkColor: "#120f17",
  accentColor: "#ff4f2a",
  paperColor: "#ffffff",
  contrast: 1.1,
  brightness: 0,
  invert: false,
  roughness: 0,
  misregistration: 0,
  revealRadius: 160,
  softness: 0.6,
  linger: 1.2,
  reverse: false,
  wander: false,
  clickBurst: true,
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

function Tabs({ options, value, onChange, label }) {
  return (
    <ControlRow label={label}>
      <div className="view-tabs">
        {options.map(([id, text]) => (
          <button key={id} type="button" className={value === id ? "active" : undefined} onClick={() => onChange(id)}>
            {text}
          </button>
        ))}
      </div>
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
          <div style={{ position: "relative", width: "100%", height: 340 }}>
            <HalftoneReveal src={PHOTO} {...opts} />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./halftone-reveal-preview.html">
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
          <Tabs
            label="印刷模式"
            value={opts.mode}
            onChange={(mode) => set({ mode })}
            options={[
              ["mono", "单版"],
              ["duotone", "双版"],
              ["color", "四色"],
            ]}
          />
          <Tabs
            label="网点"
            value={opts.shape}
            onChange={(shape) => set({ shape })}
            options={[
              ["dot", "圆点"],
              ["ellipse", "椭圆"],
              ["square", "方点"],
              ["diamond", "菱形"],
              ["line", "横线"],
              ["cross", "十字"],
            ]}
          />
          <Tabs
            label="填充"
            value={opts.fit}
            onChange={(fit) => set({ fit })}
            options={[
              ["cover", "裁满"],
              ["contain", "包含"],
            ]}
          />
          <Slider label="格子大小" value={opts.cellSize} min={2} max={24} step={1} format={(v) => `${v}px`} onChange={(cellSize) => set({ cellSize })} />
          <Slider label="网屏角度" value={opts.angle} min={0} max={90} step={1} format={(v) => `${v}°`} onChange={(angle) => set({ angle })} />
          <Slider label="点径" value={opts.dotScale} min={0.2} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(dotScale) => set({ dotScale })} />
          <Color label="主墨" value={opts.inkColor} onChange={(inkColor) => set({ inkColor })} />
          <Color label="强调墨" value={opts.accentColor} onChange={(accentColor) => set({ accentColor })} />
          <Color label="纸面" value={opts.paperColor} onChange={(paperColor) => set({ paperColor })} />
          <Slider label="对比" value={opts.contrast} min={0.5} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(contrast) => set({ contrast })} />
          <Slider label="抖动" value={opts.roughness} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(roughness) => set({ roughness })} />
          <Slider label="套印错位" value={opts.misregistration} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(misregistration) => set({ misregistration })} />
          <Slider label="显影半径" value={opts.revealRadius} min={40} max={380} step={10} format={(v) => `${v}px`} onChange={(revealRadius) => set({ revealRadius })} />
          <Slider label="织回时长" value={opts.linger} min={0} max={4} step={0.1} format={(v) => `${v.toFixed(1)}s`} onChange={(linger) => set({ linger })} />
          <ControlRow label="反转色调">
            <Switch checked={opts.invert} onChange={(invert) => set({ invert })} label="反转色调" />
          </ControlRow>
          <ControlRow label="反转显影">
            <Switch checked={opts.reverse} onChange={(reverse) => set({ reverse })} label="反转显影" />
          </ControlRow>
          <ControlRow label="自动游走">
            <Switch checked={opts.wander} onChange={(wander) => set({ wander })} label="自动游走" />
          </ControlRow>
          <ControlRow label="点击冲击波">
            <Switch checked={opts.clickBurst} onChange={(clickBurst) => set({ clickBurst })} label="点击冲击波" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the halftone print mid-develop on the dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 190, background: "#101014" }}>
        <HalftoneReveal src={PHOTO} mode="duotone" cellSize={8} wander />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
