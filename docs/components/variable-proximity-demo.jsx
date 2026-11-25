import { useRef, useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as VariableProximity } from "../../src/components/variable-proximity/VariableProximity.jsx";

/* The demo gates the pressure field to the stage box via containerRef, so
   the letters only respond while the pointer is genuinely over the scene.
   Sweep across the line, then enable idleWave and move away. */

const LABELS = ["Proximity", "距离感应字重", "WEIGHT FLOW"];

const DEFAULTS = {
  label: LABELS[0],
  falloff: "linear",
  idleWave: false,
  radius: 50,
  smoothing: 0.2,
  scale: 1,
  lift: 0,
  fontSize: 72,
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

function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => setOpts(DEFAULTS);
  const boxRef = useRef(null);

  return (
    <>
      <div className="demo-stage" style={{ background: "#ffffff", colorScheme: "light" }}>
        <DemoFit>
          <div
            ref={boxRef}
            style={{
              width: "min(680px, 92vw)",
              height: 240,
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#18181b",
            }}
          >
            <VariableProximity
              label={opts.label}
              containerRef={boxRef}
              falloff={opts.falloff}
              idleWave={opts.idleWave}
              radius={opts.radius}
              smoothing={opts.smoothing}
              scale={opts.scale}
              lift={opts.lift}
              fontSize={opts.fontSize}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./variable-proximity-preview.html">
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
          <ControlRow label="文字">
            <div className="view-tabs">
              {LABELS.map((label) => (
                <button key={label} type="button" className={opts.label === label ? "active" : ""} onClick={() => set({ label })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="衰减曲线">
            <div className="view-tabs">
              {[["linear", "线性"], ["exponential", "指数"], ["gaussian", "高斯"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.falloff === id ? "active" : ""} onClick={() => set({ falloff: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="影响半径" value={opts.radius} min={20} max={200} step={5} format={(v) => `${v}px`} onChange={(radius) => set({ radius })} />
          <Slider label="跟随迟滞" value={opts.smoothing} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(smoothing) => set({ smoothing })} />
          <Slider label="放大" value={opts.scale} min={1} max={1.6} step={0.02} format={(v) => `×${v.toFixed(2)}`} onChange={(scale) => set({ scale })} />
          <Slider label="上浮" value={opts.lift} min={0} max={0.4} step={0.02} format={(v) => `${v.toFixed(2)}em`} onChange={(lift) => set({ lift })} />
          <Slider label="字号" value={opts.fontSize} min={40} max={120} step={4} format={(v) => `${v}px`} onChange={(fontSize) => set({ fontSize })} />
          <ControlRow label="待机波浪">
            <Switch checked={opts.idleWave} onChange={(idleWave) => set({ idleWave })} label="待机波浪" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the swell frozen mid-approach on the light stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: 170,
          background: "#ffffff",
          colorScheme: "light",
          color: "#18181b",
        }}
      >
        <VariableProximity label="Proximity" radius={90} falloff="gaussian" fontSize={56} idleWave />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
