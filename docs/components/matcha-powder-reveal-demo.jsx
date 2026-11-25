import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { MatchaPowderReveal } from "../../src/components/matcha-powder-reveal/MatchaPowderReveal.tsx";

/* The pouch letterboxes itself into whatever frame it sits in — no height
   control here. Drag the upper-right notch left to tear; release near the
   end to trigger the powder. */
const DEFAULTS = {
  speed: 1,
  autoTear: false,
  loop: false,
  reducedMotion: false,
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
      <div className="demo-stage" style={{ background: "#0b0b0f", colorScheme: "dark" }}>
        <DemoFit>

          <MatchaPowderReveal
            options={{
              speed: opts.speed,
              autoTear: opts.autoTear,
              loop: opts.loop,
              reducedMotion: opts.reducedMotion,
            }}
          />
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./matcha-powder-reveal-preview.html">
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
          <Slider label="速度" value={opts.speed} min={0.25} max={2} step={0.05} format={(v) => `${v.toFixed(2)}×`} onChange={(speed) => set({ speed })} />
          <ControlRow label="自动撕开">
            <Switch checked={opts.autoTear} onChange={(autoTear) => set({ autoTear })} label="自动撕开" />
          </ControlRow>
          <ControlRow label="循环">
            <Switch checked={opts.loop} onChange={(loop) => set({ loop })} label="循环" />
          </ControlRow>
          <ControlRow label="减少动态">
            <Switch checked={opts.reducedMotion} onChange={(reducedMotion) => set({ reducedMotion })} label="减少动态" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — auto-tearing loop for a self-running preview. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <MatchaPowderReveal options={{ reducedMotion: true, autoTear: true, loop: true, speed: 1.25 }} />
    </div>
  );
}


export { Demo, CardPreview };
