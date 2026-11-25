import { useState } from "react";
import { DemoFit } from "../demo-fit";
import Beams from "../../src/components/beams/Beams.jsx";

/* The demo plus a live customize panel — every control is a real option.
   The key light follows the cursor; moving it slides highlights down the beams. */

const DEFAULTS = {
  color: "#ffffff",
  beamWidth: 140,
  rotation: 30,
  speed: 1,
  waveLength: 233,
  depth: 1,
  sharpness: 0.6,
  twist: 0,
  fillLight: 0.3,
  glow: 0.6,
  brightness: 1.6,
  grain: 0.35,
  mouseInteraction: true,
  lightMode: false,
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

  return (
    <>
      <div className="demo-stage" style={{ background: opts.lightMode ? "#eef0ee" : "#0a0a0d", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ width: "100%", height: 320, position: "relative" }}>
            <Beams
              color={opts.color}
              beamWidth={opts.beamWidth}
              rotation={opts.rotation}
              speed={opts.speed}
              waveLength={opts.waveLength}
              depth={opts.depth}
              sharpness={opts.sharpness}
              twist={opts.twist}
              fillLight={opts.fillLight}
              glow={opts.glow}
              brightness={opts.brightness}
              grain={opts.grain}
              mouseInteraction={opts.mouseInteraction}
              lightMode={opts.lightMode}
              paused={opts.paused}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./beams-preview.html">
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
          <Color label="染色" value={opts.color} onChange={(color) => set({ color })} />
          <Slider label="带宽" value={opts.beamWidth} min={20} max={320} step={5} format={(v) => `${v}px`} onChange={(beamWidth) => set({ beamWidth })} />
          <Slider label="旋转" value={opts.rotation} min={0} max={180} step={1} format={(v) => `${v}°`} onChange={(rotation) => set({ rotation })} />
          <Slider label="速度" value={opts.speed} min={0} max={3} step={0.05} format={(v) => `${v.toFixed(2)}×`} onChange={(speed) => set({ speed })} />
          <Slider label="波长" value={opts.waveLength} min={40} max={500} step={5} format={(v) => `${v}px`} onChange={(waveLength) => set({ waveLength })} />
          <Slider label="波深" value={opts.depth} min={0} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(depth) => set({ depth })} />
          <Slider label="锐度" value={opts.sharpness} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(sharpness) => set({ sharpness })} />
          <Slider label="扭转" value={opts.twist} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(twist) => set({ twist })} />
          <Slider label="补光" value={opts.fillLight} min={0} max={1.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(fillLight) => set({ fillLight })} />
          <Slider label="辉光" value={opts.glow} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(glow) => set({ glow })} />
          <Slider label="亮度" value={opts.brightness} min={0.2} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(brightness) => set({ brightness })} />
          <Slider label="颗粒" value={opts.grain} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(grain) => set({ grain })} />
          <ControlRow label="光标跟随">
            <Switch checked={opts.mouseInteraction} onChange={(mouseInteraction) => set({ mouseInteraction })} label="光标跟随" />
          </ControlRow>
          <ControlRow label="亮色模式">
            <Switch checked={opts.lightMode} onChange={(lightMode) => set({ lightMode })} label="亮色模式" />
          </ControlRow>
          <ControlRow label="暂停">
            <Switch checked={opts.paused} onChange={(paused) => set({ paused })} label="暂停" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the beams fill the card on a dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 200, position: "relative", background: "#0a0a0d" }}>
        <Beams />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
