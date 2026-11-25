import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as LightTunnel } from "../../src/components/light-tunnel/LightTunnel.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Click inside the stage to send a surge ring through the tunnel. */

const DEFAULTS = {
  lightMode: false,
  flowDirection: "inward",
  cableColor: "#8892b0",
  pulseColor: "#8be9fd",
  cableCount: 56,
  thickness: 0.35,
  pulseSpeed: 2,
  pulseLength: 0.28,
  pulseDensity: 0.5,
  pulseWidth: 1,
  glow: 1,
  bend: 0.4,
  sway: 0.5,
  mouseStrength: 0.1,
  clickSurge: true,
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
  const dark = !opts.lightMode;

  return (
    <>
      <div className="demo-stage" style={{ background: dark ? "#07070b" : "#e6e6ea", colorScheme: dark ? "dark" : "light" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", height: 440 }}>
            <LightTunnel
              lightMode={opts.lightMode}
              flowDirection={opts.flowDirection}
              cableColor={opts.cableColor}
              pulseColor={opts.pulseColor}
              cableCount={opts.cableCount}
              thickness={opts.thickness}
              pulseSpeed={opts.pulseSpeed}
              pulseLength={opts.pulseLength}
              pulseDensity={opts.pulseDensity}
              pulseWidth={opts.pulseWidth}
              glow={opts.glow}
              bend={opts.bend}
              sway={opts.sway}
              mouseStrength={opts.mouseStrength}
              clickSurge={opts.clickSurge}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./light-tunnel-preview.html">
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
          <ControlRow label="彗星方向">
            <div className="view-tabs">
              {[["inward", "向内"], ["outward", "向外"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.flowDirection === id ? "active" : ""} onClick={() => set({ flowDirection: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Color label="缆线色" value={opts.cableColor} onChange={(cableColor) => set({ cableColor })} />
          <Color label="彗星色" value={opts.pulseColor} onChange={(pulseColor) => set({ pulseColor })} />
          <Slider label="缆线数" value={opts.cableCount} min={8} max={160} step={2} format={(v) => String(v)} onChange={(cableCount) => set({ cableCount })} />
          <Slider label="线宽" value={opts.thickness} min={0.05} max={1.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(thickness) => set({ thickness })} />
          <Slider label="彗星速度" value={opts.pulseSpeed} min={0} max={6} step={0.1} format={(v) => v.toFixed(1)} onChange={(pulseSpeed) => set({ pulseSpeed })} />
          <Slider label="尾长" value={opts.pulseLength} min={0.05} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(pulseLength) => set({ pulseLength })} />
          <Slider label="密度" value={opts.pulseDensity} min={0.05} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(pulseDensity) => set({ pulseDensity })} />
          <Slider label="彗星宽度" value={opts.pulseWidth} min={0.2} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(pulseWidth) => set({ pulseWidth })} />
          <Slider label="光晕" value={opts.glow} min={0} max={2.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(glow) => set({ glow })} />
          <Slider label="弯曲" value={opts.bend} min={0} max={1.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(bend) => set({ bend })} />
          <Slider label="摆动" value={opts.sway} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(sway) => set({ sway })} />
          <ControlRow label="点击涌动">
            <Switch checked={opts.clickSurge} onChange={(clickSurge) => set({ clickSurge })} label="点击涌动" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the tunnel resting in a small dark stage; pointer effects
   off so the card stays calm while the cursor passes over the gallery. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 200, background: "#07070b" }}>
        <LightTunnel mouseInteraction={false} clickSurge={false} intro={false} cableColor="#8892b0" pulseColor="#8be9fd" />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
