import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as Threads } from "../../src/components/threads/Threads.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Turn on mouse interaction and sweep the cursor through the bundle to
   part the strands; that is the signature moment. */

const DEFAULTS = {
  color: "#c8d8ff",
  accentColor: "#5b8cff",
  enableMouseInteraction: true,
  lineCount: 90,
  thickness: 0.6,
  softness: 1.3,
  speed: 0.6,
  amplitude: 1.7,
  distance: 0.4,
  waves: 1.05,
  split: 0.04,
  fray: 0.5,
  angle: 25,
  seed: 0,
  parting: 0.6,
  taper: 0.85,
  brightness: 1.4,
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
          <div style={{ position: "relative", width: "100%", height: 420, overflow: "hidden" }}>
            <Threads
              color={opts.color}
              accentColor={opts.accentColor}
              enableMouseInteraction={opts.enableMouseInteraction}
              lineCount={opts.lineCount}
              thickness={opts.thickness}
              softness={opts.softness}
              speed={opts.speed}
              amplitude={opts.amplitude}
              distance={opts.distance}
              waves={opts.waves}
              split={opts.split}
              fray={opts.fray}
              angle={opts.angle}
              seed={opts.seed}
              parting={opts.parting}
              taper={opts.taper}
              brightness={opts.brightness}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./threads-preview.html">
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
          <Color label="基色" value={opts.color} onChange={(color) => set({ color })} />
          <Color label="点缀色" value={opts.accentColor} onChange={(accentColor) => set({ accentColor })} />
          <ControlRow label="鼠标交互">
            <Switch checked={opts.enableMouseInteraction} onChange={(enableMouseInteraction) => set({ enableMouseInteraction })} label="鼠标交互" />
          </ControlRow>
          <Slider label="拨开强度" value={opts.parting} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(parting) => set({ parting })} />
          <Slider label="线数" value={opts.lineCount} min={10} max={300} step={5} format={(v) => String(v)} onChange={(lineCount) => set({ lineCount })} />
          <Slider label="线宽" value={opts.thickness} min={0.1} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(thickness) => set({ thickness })} />
          <Slider label="柔化" value={opts.softness} min={0} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(softness) => set({ softness })} />
          <Slider label="波高" value={opts.amplitude} min={0} max={4} step={0.1} format={(v) => v.toFixed(1)} onChange={(amplitude) => set({ amplitude })} />
          <Slider label="波数" value={opts.waves} min={0} max={4} step={0.05} format={(v) => v.toFixed(2)} onChange={(waves) => set({ waves })} />
          <Slider label="流速" value={opts.speed} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(speed) => set({ speed })} />
          <Slider label="起点分裂" value={opts.split} min={0} max={0.5} step={0.01} format={(v) => v.toFixed(2)} onChange={(split) => set({ split })} />
          <Slider label="散开量" value={opts.fray} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(fray) => set({ fray })} />
          <Slider label="束展幅" value={opts.distance} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(distance) => set({ distance })} />
          <Slider label="方向角" value={opts.angle} min={-90} max={90} step={1} format={(v) => `${v}°`} onChange={(angle) => set({ angle })} />
          <Slider label="种子" value={opts.seed} min={0} max={20} step={1} format={(v) => String(v)} onChange={(seed) => set({ seed })} />
          <Slider label="尾端淡出" value={opts.taper} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(taper) => set({ taper })} />
          <Slider label="密度" value={opts.brightness} min={0.25} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(brightness) => set({ brightness })} />
        </div>
      </div>
    </>
  );
}

/* Gallery card — the bundle resting in a small dark stage, cursor
   reactions off so the card stays calm while the cursor passes over the
   gallery. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 220, overflow: "hidden", background: "#101014" }}>
        <Threads color="#c8d8ff" accentColor="#5b8cff" speed={0.5} enableMouseInteraction={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
