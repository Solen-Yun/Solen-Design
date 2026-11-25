import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as SpecularButton } from "../../src/components/specular-button/SpecularButton.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Two buttons: the solid dark one from the usage example and a clear-glass
   one with backdrop blur, on a dark stage so the rim light reads. */

const DEFAULTS = {
  tint: "#18181b",
  intensity: 1,
  idleIntensity: 0.35,
  shineSize: 10,
  shineFade: 34,
  thickness: 1.2,
  glow: 1,
  followMouse: true,
  autoAnimate: false,
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

  const shared = {
    size: "lg",
    radius: 18,
    intensity: opts.intensity,
    idleIntensity: opts.idleIntensity,
    shineSize: opts.shineSize,
    shineFade: opts.shineFade,
    thickness: opts.thickness,
    glow: opts.glow,
    followMouse: opts.followMouse,
    autoAnimate: opts.autoAnimate,
    onClick: () => console.log("clicked"),
  };

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 28, width: "100%", height: 220 }}>
            <SpecularButton {...shared} tint={opts.tint} tintOpacity={1} textColor="#fafafa" lineColor="#ffffff" baseColor="#3f3f46">
              Get Started
            </SpecularButton>
            <SpecularButton {...shared} tint="#ffffff" tintOpacity={0.04} blur={6} textColor="#f5f5f5" lineColor="#ffffff" baseColor="#525252">
              Learn More
            </SpecularButton>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./specular-button-preview.html">
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
          <Color label="玻璃底色" value={opts.tint} onChange={(tint) => set({ tint })} />
          <Slider label="亮度" value={opts.intensity} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(intensity) => set({ intensity })} />
          <Slider label="常亮" value={opts.idleIntensity} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(idleIntensity) => set({ idleIntensity })} />
          <Slider label="光斑" value={opts.shineSize} min={0} max={60} step={1} format={(v) => `${v}°`} onChange={(shineSize) => set({ shineSize })} />
          <Slider label="渐隐" value={opts.shineFade} min={0} max={120} step={1} format={(v) => `${v}°`} onChange={(shineFade) => set({ shineFade })} />
          <Slider label="描边" value={opts.thickness} min={0.5} max={4} step={0.1} format={(v) => `${v.toFixed(1)}px`} onChange={(thickness) => set({ thickness })} />
          <Slider label="辉光" value={opts.glow} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(glow) => set({ glow })} />
          <ControlRow label="跟随鼠标">
            <Switch checked={opts.followMouse} onChange={(followMouse) => set({ followMouse })} label="跟随鼠标" />
          </ControlRow>
          <ControlRow label="环绕光">
            <Switch checked={opts.autoAnimate} onChange={(autoAnimate) => set({ autoAnimate })} label="环绕光" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the solid dark button resting on a dark stage, the idle
   rim light doing the talking. */
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
        <SpecularButton
          size="md"
          tint="#18181b"
          tintOpacity={1}
          textColor="#fafafa"
          followMouse={false}
        >
          Get Started
        </SpecularButton>
      </div>
    </div>
  );
}

export { Demo, CardPreview };
