import { useState } from "react";
import { DemoFit } from "../demo-fit";
import GradientBlinds from "../../src/components/gradient-blinds/GradientBlinds.jsx";

/* The demo plus a live customize panel — every control is a real option.
   The spotlight trails the cursor on a damped spring; click for ripples. */

const DEFAULTS = {
  gradientColors: ["#FF9FFC", "#5227FF"],
  lightColor: "#ffffff",
  angle: 0,
  noise: 0.3,
  blindCount: 16,
  blindMinWidth: 60,
  mouseDampening: 0.15,
  mirrorGradient: false,
  spotlightRadius: 0.5,
  spotlightSoftness: 1,
  spotlightOpacity: 1,
  distortAmount: 0,
  shineDirection: "left",
  perspective: 0,
  gradientSpeed: 0,
  shine: 0.4,
  relief: 0.5,
  glow: 0.4,
  sway: 0.35,
  speed: 1,
  hoverTilt: 0.6,
  clickEffect: "ripple",
  idle: "drift",
  intro: true,
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
  const setStop = (index, color) =>
    set({ gradientColors: opts.gradientColors.map((c, i) => (i === index ? color : c)) });

  return (
    <>
      <div className="demo-stage" style={{ background: opts.lightMode ? "#f4f4f5" : "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", height: 340 }}>
            <GradientBlinds {...opts} />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./gradient-blinds-preview.html">
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
          <Color label="渐变起点" value={opts.gradientColors[0]} onChange={(color) => setStop(0, color)} />
          <Color label="渐变终点" value={opts.gradientColors[1]} onChange={(color) => setStop(1, color)} />
          <Color label="灯光颜色" value={opts.lightColor} onChange={(lightColor) => set({ lightColor })} />
          <Slider label="叶片数" value={opts.blindCount} min={2} max={48} step={1} format={(v) => String(v)} onChange={(blindCount) => set({ blindCount })} />
          <Slider label="墙角" value={opts.angle} min={-45} max={45} step={1} format={(v) => `${v}°`} onChange={(angle) => set({ angle })} />
          <Slider label="灯半径" value={opts.spotlightRadius} min={0.1} max={1.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(spotlightRadius) => set({ spotlightRadius })} />
          <Slider label="灯光柔化" value={opts.spotlightSoftness} min={0.2} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(spotlightSoftness) => set({ spotlightSoftness })} />
          <Slider label="高光条" value={opts.shine} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(shine) => set({ shine })} />
          <Slider label="折痕" value={opts.relief} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(relief) => set({ relief })} />
          <Slider label="雾光" value={opts.glow} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(glow) => set({ glow })} />
          <Slider label="摇摆" value={opts.sway} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(sway) => set({ sway })} />
          <Slider label="颗粒" value={opts.noise} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(noise) => set({ noise })} />
          <Slider label="透视" value={opts.perspective} min={-1} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(perspective) => set({ perspective })} />
          <Slider label="渐变流动" value={opts.gradientSpeed} min={0} max={5} step={0.1} format={(v) => v.toFixed(1)} onChange={(gradientSpeed) => set({ gradientSpeed })} />
          <ControlRow label="镜像渐变">
            <Switch checked={opts.mirrorGradient} onChange={(mirrorGradient) => set({ mirrorGradient })} label="镜像渐变" />
          </ControlRow>
          <ControlRow label="白纸墨痕">
            <Switch checked={opts.lightMode} onChange={(lightMode) => set({ lightMode })} label="白纸墨痕" />
          </ControlRow>
          <ControlRow label="暂停">
            <Switch checked={opts.paused} onChange={(paused) => set({ paused })} label="暂停" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — pink-to-violet satin blinds lit from the centre. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 170, background: "#101014" }}>
        <GradientBlinds blindCount={12} sway={0.2} intro={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
