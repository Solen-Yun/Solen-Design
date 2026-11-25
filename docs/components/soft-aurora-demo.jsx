import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as SoftAurora } from "../../src/components/soft-aurora/SoftAurora.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Drag the cursor across the curtain to bend it, click to send a light
   stripe along the band. */

const DEFAULTS = {
  color1: "#f7f7f7",
  color2: "#e100ff",
  lightMode: false,
  speed: 0.6,
  scale: 1.5,
  brightness: 1.0,
  colorSpeed: 1.0,
  noiseFrequency: 2.5,
  noiseAmplitude: 1.0,
  bandHeight: 0.5,
  bandSpread: 1.0,
  octaveDecay: 0.1,
  layerOffset: 0,
  spectrum: 1,
  tilt: 0,
  mouseInfluence: 0.25,
  clickPulse: true,
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
            <SoftAurora
              color1={opts.color1}
              color2={opts.color2}
              lightMode={opts.lightMode}
              speed={opts.speed}
              scale={opts.scale}
              brightness={opts.brightness}
              colorSpeed={opts.colorSpeed}
              noiseFrequency={opts.noiseFrequency}
              noiseAmplitude={opts.noiseAmplitude}
              bandHeight={opts.bandHeight}
              bandSpread={opts.bandSpread}
              octaveDecay={opts.octaveDecay}
              layerOffset={opts.layerOffset}
              spectrum={opts.spectrum}
              tilt={opts.tilt}
              enableMouseInteraction={true}
              mouseInfluence={opts.mouseInfluence}
              clickPulse={opts.clickPulse}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./soft-aurora-preview.html">
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
          <Color label="底层色" value={opts.color1} onChange={(color1) => set({ color1 })} />
          <Color label="上层色" value={opts.color2} onChange={(color2) => set({ color2 })} />
          <Slider label="流动速度" value={opts.speed} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(speed) => set({ speed })} />
          <Slider label="色相速度" value={opts.colorSpeed} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(colorSpeed) => set({ colorSpeed })} />
          <Slider label="噪声密度" value={opts.noiseFrequency} min={0.5} max={6} step={0.1} format={(v) => v.toFixed(1)} onChange={(noiseFrequency) => set({ noiseFrequency })} />
          <Slider label="噪声振幅" value={opts.noiseAmplitude} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(noiseAmplitude) => set({ noiseAmplitude })} />
          <Slider label="幕高" value={opts.bandHeight} min={0} max={1} step={0.02} format={(v) => v.toFixed(2)} onChange={(bandHeight) => set({ bandHeight })} />
          <Slider label="幕柔度" value={opts.bandSpread} min={0.2} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(bandSpread) => set({ bandSpread })} />
          <Slider label="层偏移" value={opts.layerOffset} min={0} max={4} step={0.1} format={(v) => v.toFixed(1)} onChange={(layerOffset) => set({ layerOffset })} />
          <Slider label="显色" value={opts.spectrum} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(spectrum) => set({ spectrum })} />
          <Slider label="亮度" value={opts.brightness} min={0.2} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(brightness) => set({ brightness })} />
          <Slider label="倾斜" value={opts.tilt} min={-90} max={90} step={1} format={(v) => `${v}°`} onChange={(tilt) => set({ tilt })} />
          <Slider label="光标影响" value={opts.mouseInfluence} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(mouseInfluence) => set({ mouseInfluence })} />
          <ControlRow label="点击光带">
            <Switch checked={opts.clickPulse} onChange={(clickPulse) => set({ clickPulse })} label="点击光带" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the curtain resting in a small dark stage, cursor
   reactions off so the card stays calm while the cursor passes over the
   gallery. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 220, background: "#101014" }}>
        <SoftAurora speed={0.4} enableMouseInteraction={false} clickPulse={false} intro={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
