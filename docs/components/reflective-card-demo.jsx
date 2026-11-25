import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as ReflectiveCard } from "../../src/components/reflective-card/ReflectiveCard.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Tilt with the pointer to swing the studio reflection; webcam needs permission. */

const DEFAULTS = {
  theme: "dark",
  tint: "#ffffff",
  metalness: 1,
  roughness: 0.3,
  blurStrength: 6,
  grayscale: 1,
  warp: 0.6,
  shine: 1,
  bevel: 3,
  glare: 0.5,
  tiltStrength: 12,
  enableTilt: true,
  webcam: false,
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
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 460 }}>
            <ReflectiveCard
              theme={opts.theme}
              tint={opts.tint}
              metalness={opts.metalness}
              roughness={opts.roughness}
              blurStrength={opts.blurStrength}
              grayscale={opts.grayscale}
              warp={opts.warp}
              shine={opts.shine}
              bevel={opts.bevel}
              glare={opts.glare}
              tiltStrength={opts.tiltStrength}
              enableTilt={opts.enableTilt}
              webcam={opts.webcam}
              height={440}
              statusColor="#22c55e"
              onWebcamError={(error) => console.log(error.message)}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./reflective-card-preview.html">
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
          <Color label="金属染色" value={opts.tint} onChange={(tint) => set({ tint })} />
          <ControlRow label="浅色主题">
            <Switch checked={opts.theme === "light"} onChange={(light) => set({ theme: light ? "light" : "dark" })} label="浅色主题" />
          </ControlRow>
          <Slider label="金属度" value={opts.metalness} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(metalness) => set({ metalness })} />
          <Slider label="粗糙度" value={opts.roughness} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(roughness) => set({ roughness })} />
          <Slider label="反射模糊" value={opts.blurStrength} min={0} max={24} step={1} format={(v) => String(v)} onChange={(blurStrength) => set({ blurStrength })} />
          <Slider label="去饱和" value={opts.grayscale} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(grayscale) => set({ grayscale })} />
          <Slider label="涟漪" value={opts.warp} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(warp) => set({ warp })} />
          <Slider label="高光" value={opts.shine} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(shine) => set({ shine })} />
          <Slider label="倒角" value={opts.bevel} min={0} max={16} step={1} format={(v) => `${v}px`} onChange={(bevel) => set({ bevel })} />
          <Slider label="眩光" value={opts.glare} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(glare) => set({ glare })} />
          <Slider label="倾斜幅度" value={opts.tiltStrength} min={0} max={30} step={1} format={(v) => `${v}deg`} onChange={(tiltStrength) => set({ tiltStrength })} />
          <ControlRow label="指针倾斜">
            <Switch checked={opts.enableTilt} onChange={(enableTilt) => set({ enableTilt })} label="指针倾斜" />
          </ControlRow>
          <ControlRow label="摄像头">
            <Switch checked={opts.webcam} onChange={(webcam) => set({ webcam })} label="摄像头" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the dark plate resting on the dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 320, background: "#101014" }}>
        <ReflectiveCard height={300} intro={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
