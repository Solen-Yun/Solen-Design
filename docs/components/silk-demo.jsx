import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as Silk } from "../../src/components/silk/Silk.jsx";

/* The demo plus a live customize panel — every control is a real option.
   The light turns toward the cursor and clicks drop warp rings; both are
   the fastest way to feel the fabric. */

const DEFAULTS = {
  color: "#7B7481",
  sheenColor: "#ffffff",
  lightMode: false,
  speed: 5,
  scale: 1,
  rotation: 0,
  depth: 0.5,
  sheen: 0.5,
  glow: 0.3,
  ripple: 1,
  wave: 1,
  variation: 0,
  mouseInteraction: true,
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
      <div className="demo-stage" style={{ background: opts.lightMode ? "#f4f4f5" : "#101014", colorScheme: opts.lightMode ? "light" : "dark" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", height: 420 }}>
            <Silk
              color={opts.color}
              sheenColor={opts.sheenColor}
              lightMode={opts.lightMode}
              speed={opts.speed}
              scale={opts.scale}
              rotation={opts.rotation}
              depth={opts.depth}
              sheen={opts.sheen}
              glow={opts.glow}
              ripple={opts.ripple}
              wave={opts.wave}
              variation={opts.variation}
              mouseInteraction={opts.mouseInteraction}
              clickRipple={opts.clickRipple}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./silk-preview.html">
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
          <Color label="缎面色" value={opts.color} onChange={(color) => set({ color })} />
          <Color label="高光色" value={opts.sheenColor} onChange={(sheenColor) => set({ sheenColor })} />
          <Slider label="流动速度" value={opts.speed} min={0} max={10} step={0.5} format={(v) => v.toFixed(1)} onChange={(speed) => set({ speed })} />
          <Slider label="织纹密度" value={opts.scale} min={0.5} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(scale) => set({ scale })} />
          <Slider label="旋转" value={opts.rotation} min={0} max={3.14} step={0.01} format={(v) => `${Math.round((v * 180) / Math.PI)}°`} onChange={(rotation) => set({ rotation })} />
          <Slider label="褶皱深度" value={opts.depth} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(depth) => set({ depth })} />
          <Slider label="高光" value={opts.sheen} min={0} max={1.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(sheen) => set({ sheen })} />
          <Slider label="辉光" value={opts.glow} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(glow) => set({ glow })} />
          <Slider label="细波纹" value={opts.ripple} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(ripple) => set({ ripple })} />
          <Slider label="横向起伏" value={opts.wave} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(wave) => set({ wave })} />
          <Slider label="重织种子" value={opts.variation} min={0} max={20} step={1} format={(v) => String(v)} onChange={(variation) => set({ variation })} />
          <ControlRow label="光标交互">
            <Switch checked={opts.mouseInteraction} onChange={(mouseInteraction) => set({ mouseInteraction })} label="光标交互" />
          </ControlRow>
          <ControlRow label="点击涟漪">
            <Switch checked={opts.clickRipple} onChange={(clickRipple) => set({ clickRipple })} label="点击涟漪" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the satin resting in a small dark stage, cursor
   reactions off so the card stays calm while the cursor passes over the
   gallery. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 220, background: "#101014" }}>
        <Silk speed={2} scale={1.2} mouseInteraction={false} clickRipple={false} intro={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
