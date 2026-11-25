import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as Particles } from "../../src/components/particles/Particles.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Move the pointer through the cloud for the hover effect, click for a
   shock wave, and switch on connections for the constellation look. */

const DEFAULTS = {
  color: "#ffffff",
  particleCount: 200,
  particleSpread: 10,
  speed: 0.1,
  particleBaseSize: 100,
  sizeRandomness: 1,
  cameraDistance: 20,
  shape: "circle",
  glow: 0.5,
  twinkle: 0.3,
  depthOfField: 0,
  connections: false,
  connectionDistance: 110,
  hoverEffect: "parallax",
  hoverRadius: 140,
  drift: "none",
  driftSpeed: 1,
  variation: 0,
  clickBurst: true,
  alphaParticles: false,
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

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", maxWidth: 760, height: 320 }}>
            <Particles
              particleCount={opts.particleCount}
              particleSpread={opts.particleSpread}
              speed={opts.speed}
              particleColors={[opts.color]}
              particleBaseSize={opts.particleBaseSize}
              sizeRandomness={opts.sizeRandomness}
              cameraDistance={opts.cameraDistance}
              shape={opts.shape}
              glow={opts.glow}
              twinkle={opts.twinkle}
              depthOfField={opts.depthOfField}
              connections={opts.connections}
              connectionDistance={opts.connectionDistance}
              hoverEffect={opts.hoverEffect}
              hoverRadius={opts.hoverRadius}
              clickBurst={opts.clickBurst}
              drift={opts.drift}
              driftSpeed={opts.driftSpeed}
              variation={opts.variation}
              alphaParticles={opts.alphaParticles}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./particles-preview.html">
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
          <Color label="粒子色" value={opts.color} onChange={(color) => set({ color })} />
          <Slider label="数量" value={opts.particleCount} min={20} max={4000} step={20} format={(v) => String(v)} onChange={(particleCount) => set({ particleCount })} />
          <Slider label="散布" value={opts.particleSpread} min={2} max={30} step={1} format={(v) => String(v)} onChange={(particleSpread) => set({ particleSpread })} />
          <Slider label="速度" value={opts.speed} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(speed) => set({ speed })} />
          <Slider label="尺寸" value={opts.particleBaseSize} min={20} max={300} step={10} format={(v) => String(v)} onChange={(particleBaseSize) => set({ particleBaseSize })} />
          <Slider label="大小随机" value={opts.sizeRandomness} min={0} max={2} step={0.1} format={(v) => v.toFixed(1)} onChange={(sizeRandomness) => set({ sizeRandomness })} />
          <Slider label="相机距离" value={opts.cameraDistance} min={6} max={60} step={1} format={(v) => String(v)} onChange={(cameraDistance) => set({ cameraDistance })} />
          <Slider label="柔光" value={opts.glow} min={0} max={2} step={0.1} format={(v) => v.toFixed(1)} onChange={(glow) => set({ glow })} />
          <Slider label="闪烁" value={opts.twinkle} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(twinkle) => set({ twinkle })} />
          <Slider label="景深" value={opts.depthOfField} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(depthOfField) => set({ depthOfField })} />
          <Slider label="连线距离" value={opts.connectionDistance} min={40} max={220} step={10} format={(v) => `${v}px`} onChange={(connectionDistance) => set({ connectionDistance })} />
          <Slider label="交互半径" value={opts.hoverRadius} min={40} max={320} step={10} format={(v) => `${v}px`} onChange={(hoverRadius) => set({ hoverRadius })} />
          <Slider label="漂移速度" value={opts.driftSpeed} min={0} max={4} step={0.1} format={(v) => v.toFixed(1)} onChange={(driftSpeed) => set({ driftSpeed })} />
          <Slider label="布局种子" value={opts.variation} min={0} max={20} step={1} format={(v) => String(v)} onChange={(variation) => set({ variation })} />
          <ControlRow label="形状">
            <div className="view-tabs">
              {[["circle", "圆"], ["square", "方"], ["ring", "环"], ["sparkle", "星"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.shape === id ? "active" : ""} onClick={() => set({ shape: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="指针效果">
            <div className="view-tabs">
              {[["parallax", "视差"], ["repel", "排斥"], ["attract", "吸引"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.hoverEffect === id ? "active" : ""} onClick={() => set({ hoverEffect: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="漂移">
            <div className="view-tabs">
              {[["none", "静止"], ["up", "上升"], ["down", "下沉"], ["forward", "向前"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.drift === id ? "active" : ""} onClick={() => set({ drift: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="星座连线">
            <Switch checked={opts.connections} onChange={(connections) => set({ connections })} label="星座连线" />
          </ControlRow>
          <ControlRow label="点击冲击波">
            <Switch checked={opts.clickBurst} onChange={(clickBurst) => set({ clickBurst })} label="点击冲击波" />
          </ControlRow>
          <ControlRow label="柔边粒子">
            <Switch checked={opts.alphaParticles} onChange={(alphaParticles) => set({ alphaParticles })} label="柔边粒子" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the default star dust on the dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 170, background: "#101014" }}>
        <Particles />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
