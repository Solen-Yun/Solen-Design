import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { GradientRingCards } from "../../src/components/gradient-ring-cards/GradientRingCards.tsx";

/* The ring letterboxes into its frame — no height control here. Speed and
   distortion reshape the orbit; autoRotate keeps it drifting on its own. */
const DEFAULTS = {
  speed: 1,
  distortion: 1,
  autoRotate: true,
};

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

function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => setOpts(DEFAULTS);

  return (
    <>
      <div className="demo-stage" style={{ background: "#f4f4f4", colorScheme: "light" }}>
        <DemoFit>

          <GradientRingCards
            options={{
              speed: opts.speed,
              distortion: opts.distortion,
              autoRotate: opts.autoRotate,
            }}
          />
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./gradient-ring-cards-preview.html">
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
          <Slider label="速度" value={opts.speed} min={0} max={2} step={0.05} format={(v) => (v === 0 ? "静止" : `${v.toFixed(2)}×`)} onChange={(speed) => set({ speed })} />
          <Slider label="边缘畸变" value={opts.distortion} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(distortion) => set({ distortion })} />
          <ControlRow label="自动旋转">
            <Switch checked={opts.autoRotate} onChange={(autoRotate) => set({ autoRotate })} label="自动旋转" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the ring at its natural orbit. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <GradientRingCards options={{ reducedMotion: true, autoRotate: true, speed: 0.8 }} />
    </div>
  );
}


export { Demo, CardPreview };
