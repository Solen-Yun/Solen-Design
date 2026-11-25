import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as LightRays } from "../../src/components/light-rays/LightRays.jsx";

/* The demo plus a live customize panel — every control is a real option. */

const DEFAULTS = {
  raysColor: "#ffffff",
  raysSpeed: 1,
  lightSpread: 0.5,
  rayLength: 3,
  glow: 0.6,
  haze: 0.25,
  followMouse: true,
  pulsating: false,
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
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ width: "100%", height: 520 }}>
            <LightRays
              raysOrigin="top-center"
              raysColor={opts.raysColor}
              raysSpeed={opts.raysSpeed}
              lightSpread={opts.lightSpread}
              rayLength={opts.rayLength}
              glow={opts.glow}
              haze={opts.haze}
              followMouse={opts.followMouse}
              pulsating={opts.pulsating}
              clickPulse={opts.clickPulse}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./light-rays-preview.html">
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
          <Color label="光色" value={opts.raysColor} onChange={(raysColor) => set({ raysColor })} />
          <Slider label="流动速度" value={opts.raysSpeed} min={0} max={3} step={0.1} format={(v) => `${v.toFixed(1)}×`} onChange={(raysSpeed) => set({ raysSpeed })} />
          <Slider label="张角" value={opts.lightSpread} min={0.1} max={1.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(lightSpread) => set({ lightSpread })} />
          <Slider label="长度" value={opts.rayLength} min={0.5} max={5} step={0.1} format={(v) => `${v.toFixed(1)}×宽`} onChange={(rayLength) => set({ rayLength })} />
          <Slider label="辉光" value={opts.glow} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(glow) => set({ glow })} />
          <Slider label="雾霭" value={opts.haze} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(haze) => set({ haze })} />
          <ControlRow label="跟随鼠标">
            <Switch checked={opts.followMouse} onChange={(followMouse) => set({ followMouse })} label="跟随鼠标" />
          </ControlRow>
          <ControlRow label="呼吸明暗">
            <Switch checked={opts.pulsating} onChange={(pulsating) => set({ pulsating })} label="呼吸明暗" />
          </ControlRow>
          <ControlRow label="点击光波">
            <Switch checked={opts.clickPulse} onChange={(clickPulse) => set({ clickPulse })} label="点击光波" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the beam resting in a small dark stage, mouse reactions
   off so the card stays calm while the cursor passes over the gallery. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 220, background: "#101014" }}>
        <LightRays
          raysOrigin="top-center"
          raysSpeed={0.6}
          lightSpread={0.5}
          glow={0.6}
          haze={0.25}
          followMouse={false}
          cursorShadow={false}
          clickPulse={false}
        />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
