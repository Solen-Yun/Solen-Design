import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as DotGrid } from "../../src/components/dot-grid/DotGrid.jsx";

/* The demo plus a live customize panel — every control is a real option.
   A fast stroke dragging the dots and a click shockwave are the fastest
   way to feel the jelly coupling. */

const DEFAULTS = {
  dotSize: 5,
  gap: 18,
  baseColor: "#3a3446",
  activeColor: "#ffffff",
  proximity: 140,
  strength: 1,
  bounce: 0.6,
  tension: 0.4,
  returnDuration: 0.8,
  shockRadius: 320,
  shockStrength: 5,
  swell: 0.8,
  stretch: 0.5,
  glow: 0.5,
  shape: "circle",
  fade: 0,
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
      <div className="demo-stage" style={{ background: "#161420" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", height: 260 }}>
            <DotGrid
              dotSize={opts.dotSize}
              gap={opts.gap}
              baseColor={opts.baseColor}
              activeColor={opts.activeColor}
              proximity={opts.proximity}
              strength={opts.strength}
              bounce={opts.bounce}
              tension={opts.tension}
              returnDuration={opts.returnDuration}
              shockRadius={opts.shockRadius}
              shockStrength={opts.shockStrength}
              swell={opts.swell}
              stretch={opts.stretch}
              glow={opts.glow}
              shape={opts.shape}
              fade={opts.fade}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./dot-grid-preview.html">
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
          <Slider label="点半径" value={opts.dotSize} min={2} max={12} step={0.5} format={(v) => `${v}px`} onChange={(dotSize) => set({ dotSize })} />
          <Slider label="间距" value={opts.gap} min={8} max={40} step={1} format={(v) => `${v}px`} onChange={(gap) => set({ gap })} />
          <Color label="静息色" value={opts.baseColor} onChange={(baseColor) => set({ baseColor })} />
          <Color label="激发色" value={opts.activeColor} onChange={(activeColor) => set({ activeColor })} />
          <Slider label="影响半径" value={opts.proximity} min={40} max={400} step={10} format={(v) => `${v}px`} onChange={(proximity) => set({ proximity })} />
          <Slider label="驱动力" value={opts.strength} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(strength) => set({ strength })} />
          <Slider label="弹性" value={opts.bounce} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(bounce) => set({ bounce })} />
          <Slider label="张力" value={opts.tension} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(tension) => set({ tension })} />
          <Slider label="回归周期" value={opts.returnDuration} min={0.2} max={2} step={0.1} format={(v) => `${v.toFixed(1)}s`} onChange={(returnDuration) => set({ returnDuration })} />
          <Slider label="冲击半径" value={opts.shockRadius} min={80} max={800} step={20} format={(v) => `${v}px`} onChange={(shockRadius) => set({ shockRadius })} />
          <Slider label="冲击强度" value={opts.shockStrength} min={0} max={12} step={0.5} format={(v) => v.toFixed(1)} onChange={(shockStrength) => set({ shockStrength })} />
          <Slider label="膨胀" value={opts.swell} min={0} max={2} step={0.1} format={(v) => v.toFixed(1)} onChange={(swell) => set({ swell })} />
          <Slider label="拉长" value={opts.stretch} min={0} max={1.5} step={0.1} format={(v) => v.toFixed(1)} onChange={(stretch) => set({ stretch })} />
          <Slider label="光晕" value={opts.glow} min={0} max={2} step={0.1} format={(v) => v.toFixed(1)} onChange={(glow) => set({ glow })} />
          <ControlRow label="形状">
            <div className="view-tabs">
              {[["circle", "圆"], ["square", "方"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.shape === id ? "active" : ""} onClick={() => set({ shape: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="边缘渐隐" value={opts.fade} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(fade) => set({ fade })} />
        </div>
      </div>
    </>
  );
}

function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 220, background: "#161420" }}>
        <DotGrid mouseInteraction={false} clickShock={false} intro={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
