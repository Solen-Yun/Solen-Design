import { useState } from "react";
import { DemoFit } from "../demo-fit";
import WarpText from "../../src/components/warp-text/WarpText.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Sweep the pointer through the type like a glass lens; clicks fire
   shockwaves through the warped glyphs. */

const DEFAULTS = {
  color: "#e4e4e7",
  lens: "bulge",
  pointerStrength: 0.38,
  pointerInfluence: 0.42,
  warpStrength: 0.08,
  warpScale: 1.7,
  speed: 0.55,
  refraction: 0.018,
  chromatic: 0,
  idleDrift: 0.2,
  ripple: true,
  clickRipple: true,
  intro: true,
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
          <div style={{ width: "100%", height: 260 }}>
            <WarpText
              text={"Bend the moment"}
              color={opts.color}
              lens={opts.lens}
              pointerStrength={opts.pointerStrength}
              pointerInfluence={opts.pointerInfluence}
              warpStrength={opts.warpStrength}
              warpScale={opts.warpScale}
              speed={opts.speed}
              refraction={opts.refraction}
              chromatic={opts.chromatic}
              idleDrift={opts.idleDrift}
              ripple={opts.ripple}
              clickRipple={opts.clickRipple}
              intro={opts.intro}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./warp-text-preview.html">
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
          <Color label="文字颜色" value={opts.color} onChange={(color) => set({ color })} />
          <ControlRow label="透镜">
            <div className="view-tabs">
              {[["bulge", "凸起"], ["pinch", "收缩"], ["swirl", "漩涡"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.lens === id ? "active" : ""} onClick={() => set({ lens: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="指针力度" value={opts.pointerStrength} min={0} max={1} step={0.02} format={(v) => v.toFixed(2)} onChange={(pointerStrength) => set({ pointerStrength })} />
          <Slider label="指针半径" value={opts.pointerInfluence} min={0.05} max={1} step={0.01} format={(v) => v.toFixed(2)} onChange={(pointerInfluence) => set({ pointerInfluence })} />
          <Slider label="环境扭曲" value={opts.warpStrength} min={0} max={0.3} step={0.01} format={(v) => v.toFixed(2)} onChange={(warpStrength) => set({ warpStrength })} />
          <Slider label="噪声尺度" value={opts.warpScale} min={0.5} max={4} step={0.1} format={(v) => v.toFixed(1)} onChange={(warpScale) => set({ warpScale })} />
          <Slider label="流速" value={opts.speed} min={0} max={2} step={0.05} format={(v) => `${v.toFixed(2)}×`} onChange={(speed) => set({ speed })} />
          <Slider label="折射" value={opts.refraction} min={0} max={0.06} step={0.002} format={(v) => v.toFixed(3)} onChange={(refraction) => set({ refraction })} />
          <Slider label="色散" value={opts.chromatic} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(chromatic) => set({ chromatic })} />
          <Slider label="漂移" value={opts.idleDrift} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(idleDrift) => set({ idleDrift })} />
          <ControlRow label="涟漪波纹">
            <Switch checked={opts.ripple} onChange={(ripple) => set({ ripple })} label="涟漪波纹" />
          </ControlRow>
          <ControlRow label="点击冲击波">
            <Switch checked={opts.clickRipple} onChange={(clickRipple) => set({ clickRipple })} label="点击冲击波" />
          </ControlRow>
          <ControlRow label="开场动画">
            <Switch checked={opts.intro} onChange={(intro) => set({ intro })} label="开场动画" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the warped headline on a dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 170, background: "#101014" }}>
        <WarpText text={"Bend the moment"} color="#e4e4e7" />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
