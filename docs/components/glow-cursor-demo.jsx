import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as GlowCursor } from "../../src/components/glow-cursor/GlowCursor.jsx";

/* The demo plus a live customize panel — every control is a real option.
   The component fills its host box, so the demo hands it a 100%-wide,
   fixed-height stage exactly like the usage example does. */

const DEFAULTS = {
  theme: "dark",
  color: "#5f8bff",
  secondaryColor: "#ff8a5f",
  intensity: 1.3,
  trailWidth: 3,
  linger: 1.4,
  glow: 1.2,
  hotspot: 0.8,
  followSpeed: 0.6,
  grain: 0,
  quality: "high",
  clickBurst: true,
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
  const light = opts.theme === "light";

  return (
    <>
      <div className="demo-stage" style={{ background: light ? "#f4f4f5" : "#101014", colorScheme: light ? "light" : "dark" }}>
        <DemoFit>
          <div style={{ width: "100%", height: 420 }}>
            <GlowCursor
              theme={opts.theme}
              color={opts.color}
              secondaryColor={opts.secondaryColor}
              intensity={opts.intensity}
              trailWidth={opts.trailWidth}
              linger={opts.linger}
              glow={opts.glow}
              hotspot={opts.hotspot}
              followSpeed={opts.followSpeed}
              grain={opts.grain}
              quality={opts.quality}
              clickBurst={opts.clickBurst}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./glow-cursor-preview.html">
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
          <Color label="热核色" value={opts.color} onChange={(color) => set({ color })} />
          <Color label="冷却色" value={opts.secondaryColor} onChange={(secondaryColor) => set({ secondaryColor })} />
          <ControlRow label="亮色主题">
            <Switch checked={light} onChange={(on) => set({ theme: on ? "light" : "dark" })} label="亮色主题" />
          </ControlRow>
          <Slider label="光强" value={opts.intensity} min={0.2} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(intensity) => set({ intensity })} />
          <Slider label="光带宽度" value={opts.trailWidth} min={0.5} max={40} step={0.5} format={(v) => `${v}px`} onChange={(trailWidth) => set({ trailWidth })} />
          <Slider label="余光时长" value={opts.linger} min={0.1} max={10} step={0.1} format={(v) => `${v.toFixed(1)}s`} onChange={(linger) => set({ linger })} />
          <Slider label="柔晕" value={opts.glow} min={0} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(glow) => set({ glow })} />
          <Slider label="白热核心" value={opts.hotspot} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(hotspot) => set({ hotspot })} />
          <Slider label="跟随松紧" value={opts.followSpeed} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(followSpeed) => set({ followSpeed })} />
          <Slider label="颗粒" value={opts.grain} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(grain) => set({ grain })} />
          <ControlRow label="模拟精度">
            <div className="view-tabs">
              {[["low", "低"], ["medium", "中"], ["high", "高"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.quality === id ? "active" : ""} onClick={() => set({ quality: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="点击光羽">
            <Switch checked={opts.clickBurst} onChange={(clickBurst) => set({ clickBurst })} label="点击光羽" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — a warm stream resting on the dark stage, mouse reactions
   off so the card stays calm while the cursor passes over the gallery. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 170, background: "#101014" }}>
        <GlowCursor color="#ffb45f" secondaryColor="#ff5f8a" intensity={1.6} trailWidth={4} linger={2} glow={1.4} clickBurst={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
