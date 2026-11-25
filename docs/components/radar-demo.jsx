import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as Radar } from "../../src/components/radar/Radar.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Park the cursor on the beam's path and wait for it to paint you. */

const DEFAULTS = {
  color: "#3ef09a",
  mode: "sweep",
  speed: 1,
  trail: 0.35,
  scale: 0.9,
  ringCount: 6,
  spokeCount: 12,
  ticks: true,
  targets: 6,
  clutter: 0.35,
  glow: 1,
  brightness: 1,
  gridOpacity: 1,
  lineWidth: 1,
  tilt: 0,
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
            <Radar
              color={opts.color}
              mode={opts.mode}
              speed={opts.speed}
              trail={opts.trail}
              scale={opts.scale}
              ringCount={opts.ringCount}
              spokeCount={opts.spokeCount}
              ticks={opts.ticks}
              targets={opts.targets}
              clutter={opts.clutter}
              glow={opts.glow}
              brightness={opts.brightness}
              gridOpacity={opts.gridOpacity}
              lineWidth={opts.lineWidth}
              tilt={opts.tilt}
              mouseInteraction={opts.mouseInteraction}
              lightMode={opts.lightMode}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./radar-preview.html">
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
          <Color label="磷光色" value={opts.color} onChange={(color) => set({ color })} />
          <ControlRow label="扫描模式">
            <div className="view-tabs">
              {[["sweep", "扫描"], ["pulse", "脉冲"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.mode === id ? "active" : ""} onClick={() => set({ mode: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="速度" value={opts.speed} min={0} max={3} step={0.1} format={(v) => `${v.toFixed(1)}×`} onChange={(speed) => set({ speed })} />
          <Slider label="余辉" value={opts.trail} min={0.05} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(trail) => set({ trail })} />
          <Slider label="尺寸" value={opts.scale} min={0.4} max={1.6} step={0.05} format={(v) => v.toFixed(2)} onChange={(scale) => set({ scale })} />
          <Slider label="环数" value={opts.ringCount} min={1} max={16} step={1} format={(v) => String(v)} onChange={(ringCount) => set({ ringCount })} />
          <Slider label="辐条" value={opts.spokeCount} min={0} max={36} step={1} format={(v) => String(v)} onChange={(spokeCount) => set({ spokeCount })} />
          <Slider label="目标数" value={opts.targets} min={0} max={16} step={1} format={(v) => String(v)} onChange={(targets) => set({ targets })} />
          <Slider label="杂波" value={opts.clutter} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(clutter) => set({ clutter })} />
          <Slider label="辉光" value={opts.glow} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(glow) => set({ glow })} />
          <Slider label="网格亮度" value={opts.gridOpacity} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(gridOpacity) => set({ gridOpacity })} />
          <Slider label="线宽" value={opts.lineWidth} min={0.5} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(lineWidth) => set({ lineWidth })} />
          <Slider label="俯角" value={opts.tilt} min={0} max={60} step={1} format={(v) => `${v}°`} onChange={(tilt) => set({ tilt })} />
          <ControlRow label="刻度">
            <Switch checked={opts.ticks} onChange={(ticks) => set({ ticks })} label="刻度" />
          </ControlRow>
          <ControlRow label="鼠标交互">
            <Switch checked={opts.mouseInteraction} onChange={(mouseInteraction) => set({ mouseInteraction })} label="鼠标交互" />
          </ControlRow>
          <ControlRow label="浅色模式">
            <Switch checked={opts.lightMode} onChange={(lightMode) => set({ lightMode })} label="浅色模式" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the scope running calmly; the cursor passing over the
   gallery must not leave echoes, so mouse interaction stays off. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 220, position: "relative", background: "#101014" }}>
        <Radar speed={0.8} mouseInteraction={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
