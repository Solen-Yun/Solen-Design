import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as Ferrofluid } from "../../src/components/ferrofluid/Ferrofluid.jsx";

/* The demo plus a live customize panel — every control is a real option.
   The cursor crown and a click ring wave are the fastest way to feel
   the fluid; sharpness morphs bumps into needles. */

const DEFAULTS = {
  colorA: "#ffffff",
  colorB: "#cfe8ff",
  spikeHeight: 1,
  sharpness: 2.5,
  turbulence: 1,
  fluidity: 0.5,
  tilt: 48,
  magnetism: 1,
  scale: 1.6,
  speed: 0.5,
  brightness: 1,
  mouseStrength: 1,
  mouseRadius: 0.22,
  mouseDampening: 0.15,
  mouseInteraction: true,
  clickPulse: true,
  lightMode: false,
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
      <div className="demo-stage" style={{ background: opts.lightMode ? "#f4f4f2" : "#101014" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", height: 260 }}>
            <Ferrofluid
              colors={[opts.colorA, opts.colorB]}
              spikeHeight={opts.spikeHeight}
              sharpness={opts.sharpness}
              turbulence={opts.turbulence}
              fluidity={opts.fluidity}
              tilt={opts.tilt}
              magnetism={opts.magnetism}
              scale={opts.scale}
              speed={opts.speed}
              brightness={opts.brightness}
              mouseStrength={opts.mouseStrength}
              mouseRadius={opts.mouseRadius}
              mouseDampening={opts.mouseDampening}
              mouseInteraction={opts.mouseInteraction}
              clickPulse={opts.clickPulse}
              lightMode={opts.lightMode}
              transparent={!opts.lightMode}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./ferrofluid-preview.html">
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
          <Color label="主灯色" value={opts.colorA} onChange={(colorA) => set({ colorA })} />
          <Color label="条灯色" value={opts.colorB} onChange={(colorB) => set({ colorB })} />
          <Slider label="尖峰高度" value={opts.spikeHeight} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(spikeHeight) => set({ spikeHeight })} />
          <Slider label="锐利度" value={opts.sharpness} min={0.6} max={6} step={0.1} format={(v) => v.toFixed(1)} onChange={(sharpness) => set({ sharpness })} />
          <Slider label="扰动" value={opts.turbulence} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(turbulence) => set({ turbulence })} />
          <Slider label="流动性" value={opts.fluidity} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(fluidity) => set({ fluidity })} />
          <Slider label="俯仰角" value={opts.tilt} min={10} max={70} step={1} format={(v) => `${v}°`} onChange={(tilt) => set({ tilt })} />
          <Slider label="磁场强度" value={opts.magnetism} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(magnetism) => set({ magnetism })} />
          <Slider label="视野缩放" value={opts.scale} min={0.4} max={4} step={0.1} format={(v) => v.toFixed(1)} onChange={(scale) => set({ scale })} />
          <Slider label="流速" value={opts.speed} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(speed) => set({ speed })} />
          <Slider label="曝光" value={opts.brightness} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(brightness) => set({ brightness })} />
          <Slider label="光标强度" value={opts.mouseStrength} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(mouseStrength) => set({ mouseStrength })} />
          <Slider label="光标半径" value={opts.mouseRadius} min={0.05} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(mouseRadius) => set({ mouseRadius })} />
          <Slider label="跟随延迟" value={opts.mouseDampening} min={0} max={0.6} step={0.05} format={(v) => `${v.toFixed(2)}s`} onChange={(mouseDampening) => set({ mouseDampening })} />
          <ControlRow label="光标隆起">
            <Switch checked={opts.mouseInteraction} onChange={(mouseInteraction) => set({ mouseInteraction })} label="光标隆起" />
          </ControlRow>
          <ControlRow label="点击环形波">
            <Switch checked={opts.clickPulse} onChange={(clickPulse) => set({ clickPulse })} label="点击环形波" />
          </ControlRow>
          <ControlRow label="浅色模式">
            <Switch checked={opts.lightMode} onChange={(lightMode) => set({ lightMode })} label="浅色模式" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 220, background: "#101014" }}>
        <Ferrofluid mouseInteraction={false} clickPulse={false} intro={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
