import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as Topography } from "../../src/components/topography/Topography.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Sweep the cursor across the land to raise a hill, click to send a ring
   pulse; switching hoverEffect/clickEffect is the fastest way to feel
   the terrain. */

const DEFAULTS = {
  color: "#4f7cff",
  lightMode: false,
  lineCount: 22,
  lineWidth: 1.2,
  majorLines: true,
  elevation: 1,
  scale: 1,
  detail: 0.35,
  tilt: 32,
  speed: 0.25,
  direction: "forward",
  morph: 0.2,
  glow: 0.6,
  depthOfField: 0.4,
  fog: 0.35,
  brightness: 1,
  hoverEffect: "lift",
  mouseRadius: 1,
  mouseStrength: 0.6,
  trail: 0.3,
  parallax: 0.5,
  clickEffect: "pulse",
  markers: "none",
  glitch: 0,
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

function Segmented({ label, value, options, onChange }) {
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
            <Topography
              color={opts.color}
              lightMode={opts.lightMode}
              lineCount={opts.lineCount}
              lineWidth={opts.lineWidth}
              majorLines={opts.majorLines}
              elevation={opts.elevation}
              scale={opts.scale}
              detail={opts.detail}
              tilt={opts.tilt}
              speed={opts.speed}
              direction={opts.direction}
              morph={opts.morph}
              glow={opts.glow}
              depthOfField={opts.depthOfField}
              fog={opts.fog}
              brightness={opts.brightness}
              hoverEffect={opts.hoverEffect}
              mouseRadius={opts.mouseRadius}
              mouseStrength={opts.mouseStrength}
              trail={opts.trail}
              parallax={opts.parallax}
              clickEffect={opts.clickEffect}
              markers={opts.markers}
              glitch={opts.glitch}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./topography-preview.html">
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
          <Color label="线色" value={opts.color} onChange={(color) => set({ color })} />
          <Segmented label="悬停效果" value={opts.hoverEffect} options={[["lift", "隆起"], ["trace", "描线"], ["light", "悬灯"]]} onChange={(hoverEffect) => set({ hoverEffect })} />
          <Segmented label="点击效果" value={opts.clickEffect} options={[["pulse", "环波"], ["peak", "堆峰"]]} onChange={(clickEffect) => set({ clickEffect })} />
          <Segmented label="标记点" value={opts.markers} options={[["none", "无"], ["plus", "十字"], ["dots", "圆点"]]} onChange={(markers) => set({ markers })} />
          <Slider label="线数" value={opts.lineCount} min={6} max={60} step={1} format={(v) => String(v)} onChange={(lineCount) => set({ lineCount })} />
          <Slider label="线宽" value={opts.lineWidth} min={0.4} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(lineWidth) => set({ lineWidth })} />
          <Slider label="地形高度" value={opts.elevation} min={0.2} max={2.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(elevation) => set({ elevation })} />
          <Slider label="俯仰角" value={opts.tilt} min={12} max={88} step={1} format={(v) => `${v}°`} onChange={(tilt) => set({ tilt })} />
          <Slider label="漫游速度" value={opts.speed} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(speed) => set({ speed })} />
          <Segmented label="方向" value={opts.direction} options={[["forward", "前"], ["backward", "后"], ["left", "左"], ["right", "右"]]} onChange={(direction) => set({ direction })} />
          <Slider label="重塑速率" value={opts.morph} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(morph) => set({ morph })} />
          <Slider label="辉光" value={opts.glow} min={0} max={1.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(glow) => set({ glow })} />
          <Slider label="景深" value={opts.depthOfField} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(depthOfField) => set({ depthOfField })} />
          <Slider label="雾" value={opts.fog} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(fog) => set({ fog })} />
          <Slider label="笔刷半径" value={opts.mouseRadius} min={0.2} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(mouseRadius) => set({ mouseRadius })} />
          <Slider label="笔刷强度" value={opts.mouseStrength} min={0} max={1.2} step={0.05} format={(v) => v.toFixed(2)} onChange={(mouseStrength) => set({ mouseStrength })} />
          <Slider label="痕迹存留" value={opts.trail} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(trail) => set({ trail })} />
          <Slider label="视差" value={opts.parallax} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(parallax) => set({ parallax })} />
          <Slider label="故障" value={opts.glitch} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(glitch) => set({ glitch })} />
        </div>
      </div>
    </>
  );
}

/* Gallery card — the landscape resting in a small dark stage, cursor
   reactions off so the card stays calm while the cursor passes over the
   gallery. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 220, background: "#101014" }}>
        <Topography speed={0.15} mouseInteraction={false} glow={0.5} intro={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
