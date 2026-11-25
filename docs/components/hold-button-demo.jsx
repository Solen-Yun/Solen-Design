import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as HoldButton } from "../../src/components/hold-button/HoldButton.jsx";

/* The demo plus a live customize panel — every control is a real option.
   The done state auto-resets so the fill can be replayed immediately. */

const DEFAULTS = {
  size: "md",
  fillDirection: "right",
  disabled: false,
  holdTime: 2000,
  releaseTime: 200,
  pressScale: 0.97,
  waveAmplitude: 6,
  radius: 14,
  resetAfter: 1200,
  wave: true,
  glow: true,
  backgroundColor: "#27272a",
  fillColor: "#5227FF",
  textColor: "#f5f5f5",
  fillTextColor: "#ffffff",
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
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 180 }}>
            <HoldButton
              doneLabel="Deleted"
              size={opts.size}
              fillDirection={opts.fillDirection}
              disabled={opts.disabled}
              holdTime={opts.holdTime}
              releaseTime={opts.releaseTime}
              pressScale={opts.pressScale}
              waveAmplitude={opts.waveAmplitude}
              radius={opts.radius}
              resetAfter={opts.resetAfter}
              wave={opts.wave}
              glow={opts.glow}
              backgroundColor={opts.backgroundColor}
              fillColor={opts.fillColor}
              textColor={opts.textColor}
              fillTextColor={opts.fillTextColor}
              onHold={() => console.log("hold")}
              onTap={() => console.log("tap")}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./hold-button-preview.html">
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
          <ControlRow label="尺寸">
            <div className="view-tabs">
              {[["sm", "小"], ["md", "中"], ["lg", "大"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.size === id ? "active" : ""} onClick={() => set({ size: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="涨落方向">
            <div className="view-tabs">
              {[["right", "向右"], ["up", "向上"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.fillDirection === id ? "active" : ""} onClick={() => set({ fillDirection: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="蓄力时长" value={opts.holdTime} min={500} max={5000} step={100} format={(v) => `${v}ms`} onChange={(holdTime) => set({ holdTime })} />
          <Slider label="回退时长" value={opts.releaseTime} min={60} max={600} step={20} format={(v) => `${v}ms`} onChange={(releaseTime) => set({ releaseTime })} />
          <Slider label="复位延迟" value={opts.resetAfter} min={0} max={4000} step={100} format={(v) => `${v}ms`} onChange={(resetAfter) => set({ resetAfter })} />
          <Slider label="液浪高度" value={opts.waveAmplitude} min={0} max={14} step={1} format={(v) => `${v}px`} onChange={(waveAmplitude) => set({ waveAmplitude })} />
          <Slider label="按压缩放" value={opts.pressScale} min={0.92} max={1} step={0.01} format={(v) => `×${v.toFixed(2)}`} onChange={(pressScale) => set({ pressScale })} />
          <Slider label="圆角" value={opts.radius} min={4} max={26} step={1} format={(v) => `${v}px`} onChange={(radius) => set({ radius })} />
          <Color label="底色" value={opts.backgroundColor} onChange={(backgroundColor) => set({ backgroundColor })} />
          <Color label="填充色" value={opts.fillColor} onChange={(fillColor) => set({ fillColor })} />
          <Color label="墨色" value={opts.textColor} onChange={(textColor) => set({ textColor })} />
          <Color label="液内墨色" value={opts.fillTextColor} onChange={(fillTextColor) => set({ fillTextColor })} />
          <ControlRow label="液浪前沿">
            <Switch checked={opts.wave} onChange={(wave) => set({ wave })} label="液浪前沿" />
          </ControlRow>
          <ControlRow label="辉光脉冲">
            <Switch checked={opts.glow} onChange={(glow) => set({ glow })} label="辉光脉冲" />
          </ControlRow>
          <ControlRow label="禁用">
            <Switch checked={opts.disabled} onChange={(disabled) => set({ disabled })} label="禁用" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the button resting idle on a dark stage. */
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
        <HoldButton />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
