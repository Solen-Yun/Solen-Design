import { useEffect, useState } from "react";
import { DemoFit } from "../demo-fit";
import { TactilePushButton } from "../../src/components/tactile-push-button/TactilePushButton.tsx";

/* The demo plus a live customize panel — every control is a real option. */

/* The option defaults mirror the CSS variable defaults in the engine. */
const DEFAULTS = {
  label: "button",
  fontSize: 48,
  pressScale: 0.93,
  hoverTextScale: 0.975,
  motionSpeed: 1,
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

function TextField({ label, value, onChange }) {
  return (
    <ControlRow label={label}>
      <input
        type="text"
        className="control-input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={label}
      />
    </ControlRow>
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
  const [picked, setPicked] = useState({});
  const themeSurfaceStart = "#ffffff";
  const themeSurfaceEnd = "#cdcdcd";
  const themeTextStart = "#171717";
  const themeTextEnd = "#737373";
  const [reducedMotion, setReducedMotion] = useState(false);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => {
    setOpts(DEFAULTS);
    setPicked({});
    setReducedMotion(false);
  };
  const colors = {
    surfaceStart: picked.surfaceStart ?? themeSurfaceStart,
    surfaceEnd: picked.surfaceEnd ?? themeSurfaceEnd,
    textStart: picked.textStart ?? themeTextStart,
    textEnd: picked.textEnd ?? themeTextEnd,
  };

  return (
    <>
      <div className="demo-stage" style={{ background: "#ffffff", colorScheme: "light" }}>
        <DemoFit>

          <TactilePushButton options={{ ...colors, ...opts, reducedMotion }} />
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./tactile-push-button-preview.html">
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
          <TextField label="按钮文字" value={opts.label} onChange={(label) => set({ label })} />
          <Slider label="字号" value={opts.fontSize} min={24} max={80} step={1} format={(v) => `${v}px`} onChange={(fontSize) => set({ fontSize })} />
          <Slider label="按压缩放" value={opts.pressScale} min={0.85} max={1.02} step={0.005} format={(v) => v.toFixed(3)} onChange={(pressScale) => set({ pressScale })} />
          <Slider label="悬停缩放" value={opts.hoverTextScale} min={0.85} max={1.02} step={0.005} format={(v) => v.toFixed(3)} onChange={(hoverTextScale) => set({ hoverTextScale })} />
          <Slider label="动效速度" value={opts.motionSpeed} min={0.25} max={3} step={0.05} format={(v) => `${v.toFixed(2)}×`} onChange={(motionSpeed) => set({ motionSpeed })} />
          <Color label="表面起色" value={colors.surfaceStart} onChange={(surfaceStart) => setPicked((prev) => ({ ...prev, surfaceStart }))} />
          <Color label="表面止色" value={colors.surfaceEnd} onChange={(surfaceEnd) => setPicked((prev) => ({ ...prev, surfaceEnd }))} />
          <Color label="文字起色" value={colors.textStart} onChange={(textStart) => setPicked((prev) => ({ ...prev, textStart }))} />
          <Color label="文字止色" value={colors.textEnd} onChange={(textEnd) => setPicked((prev) => ({ ...prev, textEnd }))} />
          <ControlRow label="减少动态">
            <Switch checked={reducedMotion} onChange={setReducedMotion} label="减少动态" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — hover and press still work inside the card. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <TactilePushButton options={{ reducedMotion: true }} />
    </div>
  );
}


export { Demo, CardPreview };
