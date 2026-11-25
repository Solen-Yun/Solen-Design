import { useState } from "react";
import { DemoFit } from "../demo-fit";
import Antigravity from "../../src/components/antigravity/Antigravity.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Hold the pointer to charge the ring, release to blast the particles. */

const DEFAULTS = {
  count: 1500,
  ringRadius: 7,
  magnetRadius: 9,
  particleSize: 0.9,
  lerpSpeed: 0.05,
  rotationSpeed: 0,
  particleShape: "capsule",
  colorMode: "conic",
  ambient: 0.25,
  fieldStrength: 10,
  interactive: true,
  clickBurst: true,
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
        {options.map(([id, name]) => (
          <button key={id} type="button" className={value === id ? "active" : ""} onClick={() => onChange(id)}>
            {name}
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
          <div style={{ width: "100%", height: 320, position: "relative" }}>
            <Antigravity
              count={opts.count}
              ringRadius={opts.ringRadius}
              magnetRadius={opts.magnetRadius}
              particleSize={opts.particleSize}
              lerpSpeed={opts.lerpSpeed}
              rotationSpeed={opts.rotationSpeed}
              particleShape={opts.particleShape}
              colorMode={opts.colorMode}
              ambient={opts.ambient}
              fieldStrength={opts.fieldStrength}
              interactive={opts.interactive}
              clickBurst={opts.clickBurst}
              lightMode={opts.lightMode}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./antigravity-preview.html">
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
          <Slider label="粒子数" value={opts.count} min={200} max={8000} step={100} format={(v) => String(v)} onChange={(count) => set({ count })} />
          <Slider label="光环半径" value={opts.ringRadius} min={2} max={14} step={0.5} format={(v) => String(v)} onChange={(ringRadius) => set({ ringRadius })} />
          <Slider label="捕获半径" value={opts.magnetRadius} min={2} max={16} step={0.5} format={(v) => String(v)} onChange={(magnetRadius) => set({ magnetRadius })} />
          <Slider label="粒子尺寸" value={opts.particleSize} min={0.2} max={2.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(particleSize) => set({ particleSize })} />
          <Slider label="弹簧速度" value={opts.lerpSpeed} min={0.005} max={0.3} step={0.005} format={(v) => v.toFixed(3)} onChange={(lerpSpeed) => set({ lerpSpeed })} />
          <Slider label="公转" value={opts.rotationSpeed} min={0} max={4} step={0.1} format={(v) => v.toFixed(1)} onChange={(rotationSpeed) => set({ rotationSpeed })} />
          <Slider label="环外亮度" value={opts.ambient} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(ambient) => set({ ambient })} />
          <Slider label="散布紧凑" value={opts.fieldStrength} min={1} max={20} step={0.5} format={(v) => String(v)} onChange={(fieldStrength) => set({ fieldStrength })} />
          <Tabs label="外形" value={opts.particleShape} options={[["capsule", "胶囊"], ["sphere", "球"], ["box", "方盒"], ["tetrahedron", "四面体"]]} onChange={(particleShape) => set({ particleShape })} />
          <Tabs label="取色" value={opts.colorMode} options={[["conic", "环形"], ["radial", "径向"], ["random", "随机"]]} onChange={(colorMode) => set({ colorMode })} />
          <ControlRow label="指针交互">
            <Switch checked={opts.interactive} onChange={(interactive) => set({ interactive })} label="指针交互" />
          </ControlRow>
          <ControlRow label="点击炸开">
            <Switch checked={opts.clickBurst} onChange={(clickBurst) => set({ clickBurst })} label="点击炸开" />
          </ControlRow>
          <ControlRow label="亮色模式">
            <Switch checked={opts.lightMode} onChange={(lightMode) => set({ lightMode })} label="亮色模式" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the ring lifted around the frame centre. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 200, position: "relative", background: "#101014" }}>
        <Antigravity count={1200} interactive={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
