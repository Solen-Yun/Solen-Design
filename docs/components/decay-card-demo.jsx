import { useState } from "react";
import { DemoFit } from "../demo-fit";
import DecayCard from "../../src/components/decay-card/DecayCard.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Fling the pointer across the page to tear the photo, then hold still
   and watch it heal; switch scope to card for hover-only tracking. */

const IMAGE = "./assets/wallpaper-07.jpg";

const DEFAULTS = {
  intensity: 0.5,
  sensitivity: 0.5,
  hoverDecay: 0.05,
  recovery: 0.6,
  grain: 0.25,
  detail: 5,
  pattern: 4,
  idle: 0.35,
  flow: 0,
  chroma: 0,
  travel: 50,
  tilt: 10,
  scope: "window",
  radius: 0,
  grayscale: false,
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

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", minHeight: 460 }}>
            <DecayCard
              image={IMAGE}
              width={300}
              height={400}
              intensity={opts.intensity}
              sensitivity={opts.sensitivity}
              hoverDecay={opts.hoverDecay}
              recovery={opts.recovery}
              grain={opts.grain}
              detail={opts.detail}
              pattern={opts.pattern}
              idle={opts.idle}
              flow={opts.flow}
              chroma={opts.chroma}
              travel={opts.travel}
              tilt={opts.tilt}
              scope={opts.scope}
              radius={opts.radius}
              grayscale={opts.grayscale}
            >
              <p style={{ margin: 0, font: "600 14px/1.5 inherit", textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}>
                甩动指针把它撕开，停下让它愈合
              </p>
            </DecayCard>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./decay-card-preview.html">
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
          <ControlRow label="跟踪范围">
            <div className="view-tabs">
              {[["window", "整窗"], ["card", "卡片"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.scope === id ? "active" : undefined} onClick={() => set({ scope: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="撕裂强度" value={opts.intensity} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(intensity) => set({ intensity })} />
          <Slider label="灵敏度" value={opts.sensitivity} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(sensitivity) => set({ sensitivity })} />
          <Slider label="悬停保底" value={opts.hoverDecay} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(hoverDecay) => set({ hoverDecay })} />
          <Slider label="愈合速率" value={opts.recovery} min={0.05} max={3} step={0.05} format={(v) => `${v.toFixed(2)}s`} onChange={(recovery) => set({ recovery })} />
          <Slider label="噪声颗粒" value={opts.grain} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(grain) => set({ grain })} />
          <Slider label="倍频数" value={opts.detail} min={1} max={8} step={1} format={(v) => String(v)} onChange={(detail) => set({ detail })} />
          <Slider label="图案种子" value={opts.pattern} min={0} max={40} step={1} format={(v) => String(v)} onChange={(pattern) => set({ pattern })} />
          <Slider label="静止呼吸" value={opts.idle} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(idle) => set({ idle })} />
          <Slider label="流动" value={opts.flow} min={0} max={2} step={0.1} format={(v) => v.toFixed(1)} onChange={(flow) => set({ flow })} />
          <Slider label="色散" value={opts.chroma} min={0} max={2} step={0.1} format={(v) => v.toFixed(1)} onChange={(chroma) => set({ chroma })} />
          <Slider label="视差幅度" value={opts.travel} min={0} max={140} step={5} format={(v) => `${v}px`} onChange={(travel) => set({ travel })} />
          <Slider label="倾斜" value={opts.tilt} min={0} max={45} step={1} format={(v) => `${v}°`} onChange={(tilt) => set({ tilt })} />
          <Slider label="圆角" value={opts.radius} min={0} max={60} step={1} format={(v) => `${v}px`} onChange={(radius) => set({ radius })} />
          <ControlRow label="置灰">
            <Switch checked={opts.grayscale} onChange={(grayscale) => set({ grayscale })} label="置灰" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the photo resting with its rim quietly breathing. */
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
          background: "#101014",
        }}
      >
        <DecayCard image={IMAGE} width={128} height={170} intensity={0.5} idle={0.35} pattern={11} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
