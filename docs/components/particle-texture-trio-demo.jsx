import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { ParticleTextureTrio } from "../../src/components/particle-texture-trio/ParticleTextureTrio.tsx";

/* Three fixed dot-matrix shapes with flowing particles, all drawn on one
   Canvas 2D. The scene letterboxes itself into whatever frame it sits in,
   so there is no height control here. */
const DEFAULTS = {
  speed: 1,
  paused: false,
  lightBackground: false,
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

          <ParticleTextureTrio
            options={{
              speed: opts.speed,
              paused: opts.paused,
              background: opts.lightBackground ? "#f4f4f4" : "#000",
              reducedMotion: opts.reducedMotion,
            }}
          />
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./particle-texture-trio-preview.html">
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
          <Slider label="速度" value={opts.speed} min={0} max={3} step={0.1} format={(v) => (v === 0 ? "冻结" : `${v.toFixed(1)}×`)} onChange={(speed) => set({ speed })} />
          <ControlRow label="暂停">
            <Switch checked={opts.paused} onChange={(paused) => set({ paused })} label="暂停" />
          </ControlRow>
          <ControlRow label="浅灰背景">
            <Switch checked={opts.lightBackground} onChange={(lightBackground) => set({ lightBackground })} label="浅灰背景" />
          </ControlRow>
          <ControlRow label="减少动态">
            <Switch checked={opts.reducedMotion} onChange={(reducedMotion) => set({ reducedMotion })} label="减少动态" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the component at its natural 960×540 letterbox. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <ParticleTextureTrio options={{ reducedMotion: true, speed: 0.8 }} />
    </div>
  );
}


export { Demo, CardPreview };
