import { useState } from "react";
import { DemoFit } from "../demo-fit";
import ColorBends from "../../src/components/color-bends/ColorBends.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Moving the cursor pulls the whole domain; presets swap the palette. */

const DEFAULTS = {
  colors: ["#774aa8", "#c873ea", "#4f77ff"],
  rotation: 90,
  speed: 0.2,
  scale: 1,
  frequency: 1,
  warpStrength: 1,
  mouseInfluence: 1,
  parallax: 0.5,
  noise: 0.15,
  iterations: 1,
  intensity: 1.5,
  bandWidth: 6,
  autoRotate: 0,
  transparent: true,
};

const PALETTES = [
  ["紫藤", ["#774aa8", "#c873ea", "#4f77ff"]],
  ["熔金", ["#3d1f00", "#ffb347", "#ffe28a"]],
  ["深礁", ["#032e4d", "#0fb9b1", "#a3f7bf"]],
  ["分色", []],
];

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

function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => setOpts(DEFAULTS);

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ width: "100%", height: 320, position: "relative" }}>
            <ColorBends
              colors={opts.colors}
              rotation={opts.rotation}
              speed={opts.speed}
              scale={opts.scale}
              frequency={opts.frequency}
              warpStrength={opts.warpStrength}
              mouseInfluence={opts.mouseInfluence}
              parallax={opts.parallax}
              noise={opts.noise}
              iterations={opts.iterations}
              intensity={opts.intensity}
              bandWidth={opts.bandWidth}
              autoRotate={opts.autoRotate}
              transparent={opts.transparent}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./color-bends-preview.html">
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
          <ControlRow label="配色">
            <div className="view-tabs">
              {PALETTES.map(([name, stops]) => (
                <button key={name} type="button" className={JSON.stringify(opts.colors) === JSON.stringify(stops) ? "active" : ""} onClick={() => set({ colors: stops })}>
                  {name}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="旋转" value={opts.rotation} min={0} max={360} step={1} format={(v) => `${v}°`} onChange={(rotation) => set({ rotation })} />
          <Slider label="自动旋转" value={opts.autoRotate} min={-20} max={20} step={0.5} format={(v) => `${v}°/s`} onChange={(autoRotate) => set({ autoRotate })} />
          <Slider label="速度" value={opts.speed} min={0} max={1} step={0.01} format={(v) => `${v.toFixed(2)}×`} onChange={(speed) => set({ speed })} />
          <Slider label="尺度" value={opts.scale} min={0.3} max={3} step={0.05} format={(v) => `${v.toFixed(2)}×`} onChange={(scale) => set({ scale })} />
          <Slider label="频率" value={opts.frequency} min={0.2} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(frequency) => set({ frequency })} />
          <Slider label="扭曲" value={opts.warpStrength} min={0} max={1.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(warpStrength) => set({ warpStrength })} />
          <Slider label="迭代" value={opts.iterations} min={1} max={5} step={1} format={(v) => String(v)} onChange={(iterations) => set({ iterations })} />
          <Slider label="光标拉拽" value={opts.mouseInfluence} min={0} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(mouseInfluence) => set({ mouseInfluence })} />
          <Slider label="视差" value={opts.parallax} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(parallax) => set({ parallax })} />
          <Slider label="色带宽度" value={opts.bandWidth} min={1} max={12} step={0.1} format={(v) => v.toFixed(1)} onChange={(bandWidth) => set({ bandWidth })} />
          <Slider label="强度" value={opts.intensity} min={0.2} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(intensity) => set({ intensity })} />
          <Slider label="颗粒" value={opts.noise} min={0} max={0.5} step={0.01} format={(v) => v.toFixed(2)} onChange={(noise) => set({ noise })} />
          <ControlRow label="透明背景">
            <Switch checked={opts.transparent} onChange={(transparent) => set({ transparent })} label="透明背景" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the bands fill the card at defaults. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 200, position: "relative", background: "#101014" }}>
        <ColorBends />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
