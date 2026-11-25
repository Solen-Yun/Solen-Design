import { useState } from "react";
import { DemoFit } from "../demo-fit";
import GhostFibers from "../../src/components/ghost-fibers/GhostFibers.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Click the stage to fire a pulse that runs along the nearest ribbon;
   hover to feel the focus pull. */

const DEFAULTS = {
  glowColor: "#8b5cf6",
  gradient: "depth",
  fiberStyle: "dots",
  hoverEffect: "focus",
  speed: 0.5,
  scale: 1,
  twist: 1.2,
  threads: 72,
  waves: 1,
  density: 1,
  thickness: 1,
  sparkle: 0.5,
  glow: 0.8,
  vignette: 0.3,
  grain: 0.06,
  lightMode: false,
  paused: false,
  mouseInteraction: true,
  pulseOnClick: true,
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
      <div className="demo-stage" style={{ background: opts.lightMode ? "#f4f4f5" : "#0b0b10", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", height: 340 }}>
            <GhostFibers {...opts} />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./ghost-fibers-preview.html">
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
          <Color label="辉光主色" value={opts.glowColor} onChange={(glowColor) => set({ glowColor })} />
          <Tabs label="珠点形态" value={opts.fiberStyle} options={[["dots", "圆点"], ["dashes", "短划"], ["lines", "线段"]]} onChange={(fiberStyle) => set({ fiberStyle })} />
          <Tabs label="渐变轴" value={opts.gradient} options={[["depth", "景深"], ["along", "沿纤维"], ["across", "横向"]]} onChange={(gradient) => set({ gradient })} />
          <Tabs label="悬停效果" value={opts.hoverEffect} options={[["focus", "对焦"], ["part", "推开"], ["none", "无"]]} onChange={(hoverEffect) => set({ hoverEffect })} />
          <Slider label="速度" value={opts.speed} min={0} max={2} step={0.05} format={(v) => `${v.toFixed(2)}×`} onChange={(speed) => set({ speed })} />
          <Slider label="缩放" value={opts.scale} min={0.3} max={3} step={0.05} format={(v) => `${v.toFixed(2)}×`} onChange={(scale) => set({ scale })} />
          <Slider label="扭转" value={opts.twist} min={0} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(twist) => set({ twist })} />
          <Slider label="纤维数" value={opts.threads} min={12} max={180} step={4} format={(v) => String(v)} onChange={(threads) => set({ threads })} />
          <Slider label="波浪" value={opts.waves} min={0} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(waves) => set({ waves })} />
          <Slider label="密度" value={opts.density} min={0.2} max={3} step={0.05} format={(v) => `${v.toFixed(2)}×`} onChange={(density) => set({ density })} />
          <Slider label="粗细" value={opts.thickness} min={0.2} max={4} step={0.05} format={(v) => `${v.toFixed(2)}×`} onChange={(thickness) => set({ thickness })} />
          <Slider label="闪烁" value={opts.sparkle} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(sparkle) => set({ sparkle })} />
          <Slider label="泛光" value={opts.glow} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(glow) => set({ glow })} />
          <Slider label="暗角" value={opts.vignette} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(vignette) => set({ vignette })} />
          <Slider label="颗粒" value={opts.grain} min={0} max={0.3} step={0.01} format={(v) => v.toFixed(2)} onChange={(grain) => set({ grain })} />
          <ControlRow label="白底墨色">
            <Switch checked={opts.lightMode} onChange={(lightMode) => set({ lightMode })} label="白底墨色" />
          </ControlRow>
          <ControlRow label="指针交互">
            <Switch checked={opts.mouseInteraction} onChange={(mouseInteraction) => set({ mouseInteraction })} label="指针交互" />
          </ControlRow>
          <ControlRow label="点击脉冲">
            <Switch checked={opts.pulseOnClick} onChange={(pulseOnClick) => set({ pulseOnClick })} label="点击脉冲" />
          </ControlRow>
          <ControlRow label="暂停漂移">
            <Switch checked={opts.paused} onChange={(paused) => set({ paused })} label="暂停漂移" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the violet fiber weave resting on a dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 170, background: "#0b0b10" }}>
        <GhostFibers speed={0.3} sparkle={0.8} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
