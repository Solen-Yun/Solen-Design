import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as LightPillar } from "../../src/components/light-pillar/LightPillar.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Click inside the stage to send a ring of light up the pillar axis. */

const DEFAULTS = {
  lightMode: false,
  topColor: "#5227FF",
  bottomColor: "#FF9FFC",
  intensity: 1,
  rotationSpeed: 0.3,
  glowAmount: 0.002,
  bloom: 0.5,
  pillarWidth: 3,
  pillarRotation: 25,
  twist: 0.4,
  noiseIntensity: 0.5,
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

function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => setOpts(DEFAULTS);
  const dark = !opts.lightMode;

  return (
    <>
      <div className="demo-stage" style={{ background: dark ? "#050507" : "#e6e6ea", colorScheme: dark ? "dark" : "light" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", height: 460 }}>
            <LightPillar
              lightMode={opts.lightMode}
              topColor={opts.topColor}
              bottomColor={opts.bottomColor}
              intensity={opts.intensity}
              rotationSpeed={opts.rotationSpeed}
              glowAmount={opts.glowAmount}
              bloom={opts.bloom}
              pillarWidth={opts.pillarWidth}
              pillarRotation={opts.pillarRotation}
              twist={opts.twist}
              noiseIntensity={opts.noiseIntensity}
              clickPulse={opts.clickPulse}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./light-pillar-preview.html">
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
          <Color label="顶部色" value={opts.topColor} onChange={(topColor) => set({ topColor })} />
          <Color label="底部色" value={opts.bottomColor} onChange={(bottomColor) => set({ bottomColor })} />
          <Slider label="亮度" value={opts.intensity} min={0.2} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(intensity) => set({ intensity })} />
          <Slider label="环绕速度" value={opts.rotationSpeed} min={0} max={1.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(rotationSpeed) => set({ rotationSpeed })} />
          <Slider label="能量" value={opts.glowAmount} min={0.0005} max={0.005} step={0.0001} format={(v) => v.toFixed(4)} onChange={(glowAmount) => set({ glowAmount })} />
          <Slider label="泛光" value={opts.bloom} min={0} max={1.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(bloom) => set({ bloom })} />
          <Slider label="柱宽" value={opts.pillarWidth} min={1} max={6} step={0.1} format={(v) => v.toFixed(1)} onChange={(pillarWidth) => set({ pillarWidth })} />
          <Slider label="倾角" value={opts.pillarRotation} min={-60} max={60} step={1} format={(v) => `${v}°`} onChange={(pillarRotation) => set({ pillarRotation })} />
          <Slider label="扭曲" value={opts.twist} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(twist) => set({ twist })} />
          <Slider label="颗粒" value={opts.noiseIntensity} min={0} max={1.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(noiseIntensity) => set({ noiseIntensity })} />
          <ControlRow label="点击光环">
            <Switch checked={opts.clickPulse} onChange={(clickPulse) => set({ clickPulse })} label="点击光环" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the pillar standing in a small dark stage; interaction off
   so the card stays calm while the cursor passes over the gallery. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 200, background: "#050507" }}>
        <LightPillar interactive={false} clickPulse={false} rotationSpeed={0.2} intro={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
