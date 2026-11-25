import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as Ribbons } from "../../src/components/ribbons/Ribbons.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Ribbons fills its host box and never blocks pointer events, so the demo
   sizes the stage exactly like the usage example does. */

const DEFAULTS = {
  color0: "#3847ff",
  color1: "#7c84ff",
  color2: "#c7cbff",
  thickness: 30,
  length: 1.4,
  spread: 18,
  stiffness: 0.5,
  bounce: 0.5,
  shape: "lens",
  wave: 0,
  softness: 0,
  fade: false,
  opacity: 1,
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
          <div style={{ width: "100%", height: 420 }}>
            <Ribbons
              colors={[opts.color0, opts.color1, opts.color2]}
              thickness={opts.thickness}
              length={opts.length}
              spread={opts.spread}
              stiffness={opts.stiffness}
              bounce={opts.bounce}
              shape={opts.shape}
              wave={opts.wave}
              softness={opts.softness}
              fade={opts.fade}
              opacity={opts.opacity}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./ribbons-preview.html">
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
          <Color label="丝带一" value={opts.color0} onChange={(color0) => set({ color0 })} />
          <Color label="丝带二" value={opts.color1} onChange={(color1) => set({ color1 })} />
          <Color label="丝带三" value={opts.color2} onChange={(color2) => set({ color2 })} />
          <Slider label="粗细" value={opts.thickness} min={5} max={80} step={1} format={(v) => `${v}px`} onChange={(thickness) => set({ thickness })} />
          <Slider label="长度" value={opts.length} min={0.3} max={5} step={0.1} format={(v) => v.toFixed(1)} onChange={(length) => set({ length })} />
          <Slider label="横向散开" value={opts.spread} min={0} max={60} step={1} format={(v) => `${v}px`} onChange={(spread) => set({ spread })} />
          <Slider label="弹簧刚度" value={opts.stiffness} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(stiffness) => set({ stiffness })} />
          <Slider label="回弹" value={opts.bounce} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(bounce) => set({ bounce })} />
          <ControlRow label="轮廓">
            <div className="view-tabs">
              {[["lens", "透镜"], ["comet", "彗尾"], ["even", "均匀"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.shape === id ? "active" : ""} onClick={() => set({ shape: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="波浪" value={opts.wave} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(wave) => set({ wave })} />
          <Slider label="羽化" value={opts.softness} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(softness) => set({ softness })} />
          <Slider label="不透明度" value={opts.opacity} min={0.2} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(opacity) => set({ opacity })} />
          <ControlRow label="尾部渐隐">
            <Switch checked={opts.fade} onChange={(fade) => set({ fade })} label="尾部渐隐" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — two warm ribbons resting on the dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 170, background: "#101014" }}>
        <Ribbons colors={["#ff8a5f", "#ffd166"]} thickness={22} length={1.8} spread={26} bounce={0.35} wave={0.35} fade={true} opacity={0.95} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
