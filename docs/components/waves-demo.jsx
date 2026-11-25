import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as Waves } from "../../src/components/waves/Waves.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Sweep the cursor fast and watch the lines part and spring back; click
   to launch a shockwave. */

const DEFAULTS = {
  lineColor: "#ffffff",
  accentColor: "#ff5fa2",
  lineStyle: "solid",
  spacing: 10,
  lineWidth: 1,
  rotation: 0,
  amplitude: 32,
  scale: 1,
  twist: 1,
  speed: 1,
  variation: 0,
  mouseInteraction: true,
  mouseRadius: 175,
  mouseStrength: 1,
  bounce: 0.5,
  returnDuration: 1.4,
  clickRipple: true,
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
          <div style={{ position: "relative", width: "100%", height: 420 }}>
            <Waves
              lineColor={opts.lineColor}
              accentColor={opts.accentColor}
              lineStyle={opts.lineStyle}
              spacing={opts.spacing}
              lineWidth={opts.lineWidth}
              rotation={opts.rotation}
              amplitude={opts.amplitude}
              scale={opts.scale}
              twist={opts.twist}
              speed={opts.speed}
              variation={opts.variation}
              mouseInteraction={opts.mouseInteraction}
              mouseRadius={opts.mouseRadius}
              mouseStrength={opts.mouseStrength}
              bounce={opts.bounce}
              returnDuration={opts.returnDuration}
              clickRipple={opts.clickRipple}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./waves-preview.html">
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
          <Color label="线色" value={opts.lineColor} onChange={(lineColor) => set({ lineColor })} />
          <Color label="发热色" value={opts.accentColor} onChange={(accentColor) => set({ accentColor })} />
          <ControlRow label="虚线">
            <Switch checked={opts.lineStyle === "dashed"} onChange={(dashed) => set({ lineStyle: dashed ? "dashed" : "solid" })} label="虚线" />
          </ControlRow>
          <Slider label="线距" value={opts.spacing} min={4} max={30} step={1} format={(v) => `${v}px`} onChange={(spacing) => set({ spacing })} />
          <Slider label="线宽" value={opts.lineWidth} min={0.25} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(lineWidth) => set({ lineWidth })} />
          <Slider label="旋转" value={opts.rotation} min={-90} max={90} step={1} format={(v) => `${v}°`} onChange={(rotation) => set({ rotation })} />
          <Slider label="摆动幅度" value={opts.amplitude} min={0} max={80} step={1} format={(v) => `${v}px`} onChange={(amplitude) => set({ amplitude })} />
          <Slider label="扭转" value={opts.twist} min={0} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(twist) => set({ twist })} />
          <Slider label="流速" value={opts.speed} min={0} max={3} step={0.1} format={(v) => `${v.toFixed(1)}×`} onChange={(speed) => set({ speed })} />
          <Slider label="种子" value={opts.variation} min={0} max={20} step={1} format={(v) => String(v)} onChange={(variation) => set({ variation })} />
          <Slider label="影响半径" value={opts.mouseRadius} min={40} max={400} step={5} format={(v) => `${v}px`} onChange={(mouseRadius) => set({ mouseRadius })} />
          <Slider label="推力" value={opts.mouseStrength} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(mouseStrength) => set({ mouseStrength })} />
          <Slider label="回弹过冲" value={opts.bounce} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(bounce) => set({ bounce })} />
          <Slider label="回弹耗时" value={opts.returnDuration} min={0.2} max={3} step={0.1} format={(v) => `${v.toFixed(1)}s`} onChange={(returnDuration) => set({ returnDuration })} />
          <ControlRow label="点击冲击波">
            <Switch checked={opts.clickRipple} onChange={(clickRipple) => set({ clickRipple })} label="点击冲击波" />
          </ControlRow>
          <ControlRow label="光标交互">
            <Switch checked={opts.mouseInteraction} onChange={(mouseInteraction) => set({ mouseInteraction })} label="光标交互" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the line field resting in a small dark stage, cursor
   reactions off so the card stays calm while the cursor passes over the
   gallery. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 220, background: "#101014" }}>
        <Waves spacing={12} speed={0.6} mouseInteraction={false} clickRipple={false} intro={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
