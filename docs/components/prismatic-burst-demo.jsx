import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as PrismaticBurst } from "../../src/components/prismatic-burst/PrismaticBurst.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Click a few times in a row: pulses ring outward and the phase kicks. */

const DEFAULTS = {
  intensity: 2,
  speed: 0.5,
  animationType: "rotate3d",
  distort: 0,
  rayCount: 0,
  rayWidth: 1,
  zoom: 1,
  twist: 0,
  flow: 0,
  centerFade: 1,
  grain: 0.8,
  glow: 0,
  mouseStrength: 0.5,
  hoverDampness: 0.25,
  mouseInteraction: true,
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
            <PrismaticBurst
              intensity={opts.intensity}
              speed={opts.speed}
              animationType={opts.animationType}
              distort={opts.distort}
              rayCount={opts.rayCount}
              rayWidth={opts.rayWidth}
              zoom={opts.zoom}
              twist={opts.twist}
              flow={opts.flow}
              centerFade={opts.centerFade}
              grain={opts.grain}
              glow={opts.glow}
              mouseStrength={opts.mouseStrength}
              hoverDampness={opts.hoverDampness}
              mouseInteraction={opts.mouseInteraction}
              clickBurst={opts.clickBurst}
              lightMode={opts.lightMode}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./prismatic-burst-preview.html">
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
          <ControlRow label="动画姿态">
            <div className="view-tabs">
              {[["rotate", "摆旋"], ["rotate3d", "翻滚"], ["hover", "悬停"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.animationType === id ? "active" : ""} onClick={() => set({ animationType: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="亮度" value={opts.intensity} min={0.2} max={4} step={0.1} format={(v) => v.toFixed(1)} onChange={(intensity) => set({ intensity })} />
          <Slider label="速度" value={opts.speed} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(speed) => set({ speed })} />
          <Slider label="光线数" value={opts.rayCount} min={0} max={24} step={1} format={(v) => (v === 0 ? "连续" : String(v))} onChange={(rayCount) => set({ rayCount })} />
          <Slider label="光线粗细" value={opts.rayWidth} min={0.2} max={2.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(rayWidth) => set({ rayWidth })} />
          <Slider label="弯曲" value={opts.distort} min={0} max={10} step={0.1} format={(v) => v.toFixed(1)} onChange={(distort) => set({ distort })} />
          <Slider label="扭度" value={opts.twist} min={-3} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(twist) => set({ twist })} />
          <Slider label="色彩流动" value={opts.flow} min={0} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(flow) => set({ flow })} />
          <Slider label="缩放" value={opts.zoom} min={0.3} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(zoom) => set({ zoom })} />
          <Slider label="中心衰减" value={opts.centerFade} min={0.5} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(centerFade) => set({ centerFade })} />
          <Slider label="噪声" value={opts.grain} min={0.3} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(grain) => set({ grain })} />
          <Slider label="辉光" value={opts.glow} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(glow) => set({ glow })} />
          <Slider label="鼠标强度" value={opts.mouseStrength} min={0} max={1.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(mouseStrength) => set({ mouseStrength })} />
          <Slider label="指针滞后" value={opts.hoverDampness} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(hoverDampness) => set({ hoverDampness })} />
          <ControlRow label="点击光环">
            <Switch checked={opts.clickBurst} onChange={(clickBurst) => set({ clickBurst })} label="点击光环" />
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

/* Gallery card — the burst turning quietly; the cursor passing over the
   gallery must not tilt it, so mouse interaction stays off in the card. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 220, position: "relative", background: "#101014" }}>
        <PrismaticBurst speed={0.35} intensity={1.6} mouseInteraction={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
