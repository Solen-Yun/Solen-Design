import { useState } from "react";
import { DemoFit } from "../demo-fit";
import GradientASCII from "../../src/components/gradient-ascii/GradientASCII.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Sweep the cursor to scramble glyphs; click for a wave or a burst. */

const DEFAULTS = {
  shape: "horizon",
  cellSize: 18,
  density: 0.8,
  glow: 0.2,
  depthOfField: 0,
  flicker: 0.2,
  softness: 0.5,
  scale: 1,
  flow: 0.5,
  gradientOpacity: 0.9,
  grain: 0.08,
  variation: 0,
  scrambleRadius: 0.1,
  clickEffect: "wave",
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

function Tabs({ label, value, options, onChange }) {
  return (
    <ControlRow label={label}>
      <div className="view-tabs">
        {options.map(([id, text]) => (
          <button key={id} type="button" className={value === id ? "active" : ""} onClick={() => onChange(id)}>
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
      <div className="demo-stage" style={{ background: opts.lightMode ? "#f4f4f5" : "#08090c", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", height: 340 }}>
            <GradientASCII {...opts} />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./gradient-ascii-preview.html">
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
            label="构图"
            value={opts.shape}
            options={[["horizon", "地平线"], ["pinch", "光带"], ["rise", "升起"], ["eclipse", "日食"]]}
            onChange={(shape) => set({ shape })}
          />
          <Tabs
            label="点击效果"
            value={opts.clickEffect}
            options={[["none", "无"], ["wave", "波纹"], ["burst", "爆点"]]}
            onChange={(clickEffect) => set({ clickEffect })}
          />
          <Slider label="字符格" value={opts.cellSize} min={6} max={64} step={1} format={(v) => `${v}px`} onChange={(cellSize) => set({ cellSize })} />
          <Slider label="密度" value={opts.density} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(density) => set({ density })} />
          <Slider label="光晕" value={opts.glow} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(glow) => set({ glow })} />
          <Slider label="闪烁" value={opts.flicker} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(flicker) => set({ flicker })} />
          <Slider label="柔化" value={opts.softness} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(softness) => set({ softness })} />
          <Slider label="缩放" value={opts.scale} min={0.4} max={2.5} step={0.05} format={(v) => `${v.toFixed(2)}×`} onChange={(scale) => set({ scale })} />
          <Slider label="流动" value={opts.flow} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(flow) => set({ flow })} />
          <Slider label="乱码半径" value={opts.scrambleRadius} min={0.02} max={0.4} step={0.01} format={(v) => v.toFixed(2)} onChange={(scrambleRadius) => set({ scrambleRadius })} />
          <Slider label="种子" value={opts.variation} min={0} max={99} step={1} format={(v) => String(v)} onChange={(variation) => set({ variation })} />
          <Slider label="颗粒" value={opts.grain} min={0} max={0.4} step={0.01} format={(v) => v.toFixed(2)} onChange={(grain) => set({ grain })} />
          <ControlRow label="白纸墨字">
            <Switch checked={opts.lightMode} onChange={(lightMode) => set({ lightMode })} label="白纸墨字" />
          </ControlRow>
          <ControlRow label="指针交互">
            <Switch checked={opts.mouseInteraction} onChange={(mouseInteraction) => set({ mouseInteraction })} label="指针交互" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the blue horizon arch spelled out in characters. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 170, background: "#08090c" }}>
        <GradientASCII shape="horizon" speed={0.4} flicker={0.3} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
