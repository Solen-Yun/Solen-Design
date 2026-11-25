import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as SlicedWaves } from "../../src/components/sliced-waves/SlicedWaves.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Move the cursor left and right across the bars: the depth-of-field
   focus snaps from bar to bar, which is the signature moment. */

const DEFAULTS = {
  color1: "#ffd9a8",
  color2: "#ff5fa2",
  color3: "#5b8cff",
  lightMode: false,
  ribbons: 3,
  spacing: 28,
  barWidth: 0.5,
  ribbonHeight: 0.26,
  spread: 0.1,
  amplitude: 0.1,
  frequency: 1,
  speed: 1,
  perspective: 0.45,
  curve: 0.5,
  blur: 0.6,
  glow: 1,
  brightness: 1.25,
  position: 0.78,
  rotation: 0,
  slices: 0,
  mouseInteraction: true,
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
            <SlicedWaves
              color1={opts.color1}
              color2={opts.color2}
              color3={opts.color3}
              lightMode={opts.lightMode}
              ribbons={opts.ribbons}
              spacing={opts.spacing}
              barWidth={opts.barWidth}
              ribbonHeight={opts.ribbonHeight}
              spread={opts.spread}
              amplitude={opts.amplitude}
              frequency={opts.frequency}
              speed={opts.speed}
              perspective={opts.perspective}
              curve={opts.curve}
              blur={opts.blur}
              glow={opts.glow}
              brightness={opts.brightness}
              position={opts.position}
              rotation={opts.rotation}
              slices={opts.slices}
              mouseInteraction={opts.mouseInteraction}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./sliced-waves-preview.html">
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
          <Color label="暖色" value={opts.color1} onChange={(color1) => set({ color1 })} />
          <Color label="中间色" value={opts.color2} onChange={(color2) => set({ color2 })} />
          <Color label="冷色" value={opts.color3} onChange={(color3) => set({ color3 })} />
          <Slider label="叠层数" value={opts.ribbons} min={1} max={6} step={1} format={(v) => String(v)} onChange={(ribbons) => set({ ribbons })} />
          <Slider label="间距" value={opts.spacing} min={8} max={80} step={1} format={(v) => `${v}px`} onChange={(spacing) => set({ spacing })} />
          <Slider label="带宽" value={opts.barWidth} min={0.1} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(barWidth) => set({ barWidth })} />
          <Slider label="厚度" value={opts.ribbonHeight} min={0.05} max={0.6} step={0.01} format={(v) => v.toFixed(2)} onChange={(ribbonHeight) => set({ ribbonHeight })} />
          <Slider label="振幅" value={opts.amplitude} min={0} max={0.4} step={0.01} format={(v) => v.toFixed(2)} onChange={(amplitude) => set({ amplitude })} />
          <Slider label="波浪速度" value={opts.speed} min={0} max={3} step={0.1} format={(v) => `${v.toFixed(1)}×`} onChange={(speed) => set({ speed })} />
          <Slider label="透视偏航" value={opts.perspective} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(perspective) => set({ perspective })} />
          <Slider label="弯曲" value={opts.curve} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(curve) => set({ curve })} />
          <Slider label="柔化/景深" value={opts.blur} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(blur) => set({ blur })} />
          <Slider label="辉光" value={opts.glow} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(glow) => set({ glow })} />
          <Slider label="曝光" value={opts.brightness} min={0.4} max={2.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(brightness) => set({ brightness })} />
          <Slider label="纵向位置" value={opts.position} min={0.2} max={1} step={0.01} format={(v) => v.toFixed(2)} onChange={(position) => set({ position })} />
          <Slider label="旋转" value={opts.rotation} min={-30} max={30} step={1} format={(v) => `${v}°`} onChange={(rotation) => set({ rotation })} />
          <Slider label="切片" value={opts.slices} min={0} max={10} step={1} format={(v) => (v === 0 ? "关" : String(v))} onChange={(slices) => set({ slices })} />
          <ControlRow label="光标交互">
            <Switch checked={opts.mouseInteraction} onChange={(mouseInteraction) => set({ mouseInteraction })} label="光标交互" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the bar field resting in a small dark stage, cursor
   reactions off so the card stays calm while the cursor passes over the
   gallery. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 220, background: "#101014" }}>
        <SlicedWaves speed={0.7} mouseInteraction={false} intro={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
