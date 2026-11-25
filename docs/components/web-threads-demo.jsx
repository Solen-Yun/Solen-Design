import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as WebThreads } from "../../src/components/web-threads/WebThreads.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Hover a thread to lift it, click to send a surge racing along the
   weave; bump nodes to regather the threads at multiple pinches. */

const DEFAULTS = {
  colorA: "#5227FF",
  colorB: "#FF9FFC",
  coreColor: "#FFFFFF",
  lightMode: false,
  threadCount: 6,
  speed: 0.2,
  frequency: 5,
  spread: 0.18,
  taper: 1,
  position: 0.5,
  pinch: 0.5,
  nodes: 1,
  angle: 0,
  glow: 0.02,
  thickness: 1.1,
  brightness: 0.6,
  depth: 0,
  pulses: 0,
  mirror: true,
  shimmer: false,
  mouseStrength: 0.5,
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

/* A background component: the host owns the size, so the demo hands it a
   100%-wide, fixed-height box exactly like the usage example does. */
function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => setOpts(DEFAULTS);

  return (
    <>
      <div className="demo-stage" style={{ background: opts.lightMode ? "#f4f4f5" : "#101014", colorScheme: opts.lightMode ? "light" : "dark" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", height: 420 }}>
            <WebThreads
              colors={[opts.colorA, opts.colorB]}
              coreColor={opts.coreColor}
              lightMode={opts.lightMode}
              threadCount={opts.threadCount}
              speed={opts.speed}
              frequency={opts.frequency}
              spread={opts.spread}
              taper={opts.taper}
              position={opts.position}
              pinch={opts.pinch}
              nodes={opts.nodes}
              angle={opts.angle}
              glow={opts.glow}
              thickness={opts.thickness}
              brightness={opts.brightness}
              depth={opts.depth}
              pulses={opts.pulses}
              mirror={opts.mirror}
              shimmer={opts.shimmer}
              mouseStrength={opts.mouseStrength}
              pulseOnClick={opts.pulseOnClick}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./web-threads-preview.html">
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
          <ControlRow label="浅色模式">
            <Switch checked={opts.lightMode} onChange={(lightMode) => set({ lightMode })} label="浅色模式" />
          </ControlRow>
          <Color label="线色 A" value={opts.colorA} onChange={(colorA) => set({ colorA })} />
          <Color label="线色 B" value={opts.colorB} onChange={(colorB) => set({ colorB })} />
          <Color label="热芯色" value={opts.coreColor} onChange={(coreColor) => set({ coreColor })} />
          <Slider label="线数" value={opts.threadCount} min={2} max={24} step={1} format={(v) => String(v)} onChange={(threadCount) => set({ threadCount })} />
          <Slider label="束点数" value={opts.nodes} min={1} max={6} step={1} format={(v) => String(v)} onChange={(nodes) => set({ nodes })} />
          <Slider label="束点位置" value={opts.pinch} min={0.1} max={0.9} step={0.01} format={(v) => v.toFixed(2)} onChange={(pinch) => set({ pinch })} />
          <Slider label="散开幅度" value={opts.spread} min={0.05} max={0.4} step={0.01} format={(v) => v.toFixed(2)} onChange={(spread) => set({ spread })} />
          <Slider label="波数" value={opts.frequency} min={1} max={12} step={0.5} format={(v) => v.toFixed(1)} onChange={(frequency) => set({ frequency })} />
          <Slider label="编织速度" value={opts.speed} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(speed) => set({ speed })} />
          <Slider label="纵向位置" value={opts.position} min={0.2} max={0.8} step={0.01} format={(v) => v.toFixed(2)} onChange={(position) => set({ position })} />
          <Slider label="旋转" value={opts.angle} min={-45} max={45} step={1} format={(v) => `${v}°`} onChange={(angle) => set({ angle })} />
          <Slider label="辉光" value={opts.glow} min={0} max={0.08} step={0.002} format={(v) => v.toFixed(3)} onChange={(glow) => set({ glow })} />
          <Slider label="线宽" value={opts.thickness} min={0.4} max={2.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(thickness) => set({ thickness })} />
          <Slider label="亮度" value={opts.brightness} min={0.2} max={1.2} step={0.05} format={(v) => v.toFixed(2)} onChange={(brightness) => set({ brightness })} />
          <Slider label="束点层次" value={opts.depth} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(depth) => set({ depth })} />
          <Slider label="流动亮珠" value={opts.pulses} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(pulses) => set({ pulses })} />
          <Slider label="悬停强度" value={opts.mouseStrength} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(mouseStrength) => set({ mouseStrength })} />
          <ControlRow label="相位交替">
            <Switch checked={opts.mirror} onChange={(mirror) => set({ mirror })} label="相位交替" />
          </ControlRow>
          <ControlRow label="微颤">
            <Switch checked={opts.shimmer} onChange={(shimmer) => set({ shimmer })} label="微颤" />
          </ControlRow>
          <ControlRow label="点击光涌">
            <Switch checked={opts.pulseOnClick} onChange={(pulseOnClick) => set({ pulseOnClick })} label="点击光涌" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the weave resting in a small dark stage, cursor
   reactions off so the card stays calm while the cursor passes over the
   gallery. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 220, background: "#101014" }}>
        <WebThreads threadCount={5} speed={0.12} mouseInteraction={false} pulseOnClick={false} intro={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
