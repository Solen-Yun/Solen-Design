import { useRef, useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as LaserFlow } from "../../src/components/laser-flow/LaserFlow.jsx";

/* The demo plus a live customize panel — every control is a real option.
   The beam measures the rounded card through surfaceRef, splashes on
   impact, then pours over its corners; hover for sparks. */

const DEFAULTS = {
  beamPosition: 0.6,
  surfaceLevel: 1,
  color: "#3847ff",
  intensity: 1.8,
  beamWidth: 1.5,
  flare: 1.5,
  spread: 1.5,
  spill: 1,
  fog: 0.2,
  dust: 1.6,
  streaks: 1.5,
  dots: 1,
  pulse: 1.5,
  speed: 1.5,
  seed: 3,
  mouseInteraction: true,
  intro: true,
  theme: "dark",
  paused: false,
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
  const surface = useRef(null);

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", height: 340, overflow: "hidden" }}>
            <div
              ref={surface}
              style={{
                position: "absolute",
                inset: "48px 56px",
                borderRadius: 28,
                background: "linear-gradient(135deg, #1b2340 0%, #232b52 55%, #1a2038 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
              }}
            >
              <span style={{ fontSize: 26, fontWeight: 700, letterSpacing: "0.28em", color: "#dfe6ff" }}>SOLEN</span>
              <span style={{ fontSize: 12, letterSpacing: "0.3em", color: "rgba(223,230,255,0.5)" }}>LASER FLOW</span>
            </div>
            <LaserFlow surfaceRef={surface} style={{ position: "absolute", inset: 0 }} {...opts} />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./laser-flow-preview.html">
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
          <Color label="激光颜色" value={opts.color} onChange={(color) => set({ color })} />
          <Slider label="梁位置" value={opts.beamPosition} min={0} max={1} step={0.02} format={(v) => v.toFixed(2)} onChange={(beamPosition) => set({ beamPosition })} />
          <Slider label="亮度" value={opts.intensity} min={0} max={4} step={0.1} format={(v) => v.toFixed(1)} onChange={(intensity) => set({ intensity })} />
          <Slider label="梁宽" value={opts.beamWidth} min={0.2} max={5} step={0.1} format={(v) => v.toFixed(1)} onChange={(beamWidth) => set({ beamWidth })} />
          <Slider label="裙边" value={opts.flare} min={0.2} max={4} step={0.1} format={(v) => v.toFixed(1)} onChange={(flare) => set({ flare })} />
          <Slider label="铺展" value={opts.spread} min={0.1} max={4} step={0.1} format={(v) => v.toFixed(1)} onChange={(spread) => set({ spread })} />
          <Slider label="溢流" value={opts.spill} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(spill) => set({ spill })} />
          <Slider label="雾" value={opts.fog} min={0} max={1.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(fog) => set({ fog })} />
          <Slider label="尘埃" value={opts.dust} min={0} max={4} step={0.1} format={(v) => v.toFixed(1)} onChange={(dust) => set({ dust })} />
          <Slider label="流线" value={opts.streaks} min={0} max={4} step={0.1} format={(v) => v.toFixed(1)} onChange={(streaks) => set({ streaks })} />
          <Slider label="点阵" value={opts.dots} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(dots) => set({ dots })} />
          <Slider label="呼吸" value={opts.pulse} min={0} max={4} step={0.1} format={(v) => v.toFixed(1)} onChange={(pulse) => set({ pulse })} />
          <Slider label="速度" value={opts.speed} min={0} max={4} step={0.1} format={(v) => v.toFixed(1)} onChange={(speed) => set({ speed })} />
          <ControlRow label="指针交互">
            <Switch checked={opts.mouseInteraction} onChange={(mouseInteraction) => set({ mouseInteraction })} label="指针交互" />
          </ControlRow>
          <ControlRow label="浅色主题">
            <Switch checked={opts.theme === "light"} onChange={(light) => set({ theme: light ? "light" : "dark" })} label="浅色主题" />
          </ControlRow>
          <ControlRow label="暂停">
            <Switch checked={opts.paused} onChange={(paused) => set({ paused })} label="暂停" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the beam mid-pour over a small rounded panel. */
function CardPreview() {
  const surface = useRef(null);
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 190, background: "#101014", overflow: "hidden" }}>
        <div
          ref={surface}
          style={{
            position: "absolute",
            inset: "26px 30px",
            borderRadius: 20,
            background: "linear-gradient(135deg, #1b2340 0%, #232b52 55%, #1a2038 100%)",
          }}
        />
        <LaserFlow surfaceRef={surface} beamPosition={0.42} style={{ position: "absolute", inset: 0 }} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
