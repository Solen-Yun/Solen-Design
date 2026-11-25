import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as Hyperspeed } from "../../src/components/hyperspeed/Hyperspeed.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Hold the stage to boost: pace multiplies, trails stretch, fov widens. */

const CURVES = [
  ["straight", "直道"],
  ["gentle", "缓弯"],
  ["winding", "蜿蜒"],
  ["hills", "丘陵"],
  ["racing", "竞速"],
  ["deep", "深谷"],
];

const DEFAULTS = {
  theme: "dark",
  curve: "winding",
  speed: 1,
  boost: 3,
  density: 40,
  trailLength: 1,
  lightSize: 1,
  glow: 0.6,
  reflections: 0.5,
  steer: 0.35,
  dust: 100,
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
  const dark = opts.theme === "dark";

  return (
    <>
      <div className="demo-stage" style={{ background: dark ? "#050507" : "#dfe3ea", colorScheme: dark ? "dark" : "light" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", height: 480 }}>
            <Hyperspeed
              theme={opts.theme}
              curve={opts.curve}
              speed={opts.speed}
              boost={opts.boost}
              density={opts.density}
              trailLength={opts.trailLength}
              lightSize={opts.lightSize}
              glow={opts.glow}
              reflections={opts.reflections}
              steer={opts.steer}
              dust={opts.dust}
              onBoostStart={() => console.log("boost start")}
              onBoostEnd={() => console.log("boost end")}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./hyperspeed-preview.html">
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
          <ControlRow label="深色主题">
            <Switch checked={dark} onChange={(value) => set({ theme: value ? "dark" : "light" })} label="深色主题" />
          </ControlRow>
          <ControlRow label="路形">
            <div className="view-tabs">
              {CURVES.map(([id, label]) => (
                <button key={id} type="button" className={opts.curve === id ? "active" : ""} onClick={() => set({ curve: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="车速" value={opts.speed} min={0} max={3} step={0.1} format={(v) => `${v.toFixed(1)}×`} onChange={(speed) => set({ speed })} />
          <Slider label="冲刺倍率" value={opts.boost} min={1} max={6} step={0.5} format={(v) => `${v.toFixed(1)}×`} onChange={(boost) => set({ boost })} />
          <Slider label="车流密度" value={opts.density} min={0} max={160} step={5} format={(v) => String(v)} onChange={(density) => set({ density })} />
          <Slider label="光尾长度" value={opts.trailLength} min={0.1} max={3} step={0.1} format={(v) => `${v.toFixed(1)}×`} onChange={(trailLength) => set({ trailLength })} />
          <Slider label="车灯尺寸" value={opts.lightSize} min={0.2} max={2.5} step={0.1} format={(v) => `${v.toFixed(1)}×`} onChange={(lightSize) => set({ lightSize })} />
          <Slider label="辉光" value={opts.glow} min={0} max={1.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(glow) => set({ glow })} />
          <Slider label="倒影" value={opts.reflections} min={0} max={1.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(reflections) => set({ reflections })} />
          <Slider label="转向" value={opts.steer} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(steer) => set({ steer })} />
          <Slider label="星尘" value={opts.dust} min={0} max={1500} step={50} format={(v) => String(v)} onChange={(dust) => set({ dust })} />
        </div>
      </div>
    </>
  );
}

/* Gallery card — a calm night cruise in a small dark stage; interaction off
   so the card stays still while the cursor passes over the gallery. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 200, background: "#050507" }}>
        <Hyperspeed theme="dark" speed={0.6} density={26} glow={0.5} interactive={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
