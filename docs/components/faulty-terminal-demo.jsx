import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as FaultyTerminal } from "../../src/components/faulty-terminal/FaultyTerminal.jsx";

/* The demo plus a live customize panel — every control is a real option.
   The cursor glow patch and a click tear are the fastest way to feel
   the terminal; switching glyph styles shows the three renderers. */

const DEFAULTS = {
  tint: "#5dff9e",
  glyphs: "blocks",
  clickEffect: "glitch",
  timeScale: 0.3,
  scanlineIntensity: 0.3,
  glitchAmount: 1,
  flickerAmount: 1,
  glow: 0.5,
  persistence: 0.5,
  mouseStrength: 0.2,
  mouseGlow: 0.6,
  curvature: 0.2,
  chromaticAberration: 0,
  noiseAmp: 1,
  vignette: 0.25,
  brightness: 1,
  scramble: 0.5,
  lightMode: false,
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
      <div className="demo-stage" style={{ background: opts.lightMode ? "#f4f4f2" : "#050507" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", height: 260 }}>
            <FaultyTerminal
              tint={opts.tint}
              glyphs={opts.glyphs}
              clickEffect={opts.clickEffect}
              timeScale={opts.timeScale}
              scanlineIntensity={opts.scanlineIntensity}
              glitchAmount={opts.glitchAmount}
              flickerAmount={opts.flickerAmount}
              glow={opts.glow}
              persistence={opts.persistence}
              mouseStrength={opts.mouseStrength}
              mouseGlow={opts.mouseGlow}
              curvature={opts.curvature}
              chromaticAberration={opts.chromaticAberration}
              noiseAmp={opts.noiseAmp}
              vignette={opts.vignette}
              brightness={opts.brightness}
              scramble={opts.scramble}
              lightMode={opts.lightMode}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./faulty-terminal-preview.html">
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
          <Color label="荧光色" value={opts.tint} onChange={(tint) => set({ tint })} />
          <ControlRow label="字形">
            <div className="view-tabs">
              {[["blocks", "色块"], ["dots", "圆点"], ["characters", "字符"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.glyphs === id ? "active" : ""} onClick={() => set({ glyphs: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="点击效果">
            <div className="view-tabs">
              {[["none", "无"], ["glitch", "撕行"], ["degauss", "消磁"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.clickEffect === id ? "active" : ""} onClick={() => set({ clickEffect: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="演化速度" value={opts.timeScale} min={0} max={1.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(timeScale) => set({ timeScale })} />
          <Slider label="扫描线" value={opts.scanlineIntensity} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(scanlineIntensity) => set({ scanlineIntensity })} />
          <Slider label="故障" value={opts.glitchAmount} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(glitchAmount) => set({ glitchAmount })} />
          <Slider label="闪烁" value={opts.flickerAmount} min={0} max={2} step={0.1} format={(v) => v.toFixed(1)} onChange={(flickerAmount) => set({ flickerAmount })} />
          <Slider label="辉光" value={opts.glow} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(glow) => set({ glow })} />
          <Slider label="余辉" value={opts.persistence} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(persistence) => set({ persistence })} />
          <Slider label="光标强度" value={opts.mouseStrength} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(mouseStrength) => set({ mouseStrength })} />
          <Slider label="热亮" value={opts.mouseGlow} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(mouseGlow) => set({ mouseGlow })} />
          <Slider label="弯曲" value={opts.curvature} min={0} max={0.8} step={0.05} format={(v) => v.toFixed(2)} onChange={(curvature) => set({ curvature })} />
          <Slider label="色散" value={opts.chromaticAberration} min={0} max={0.02} step={0.001} format={(v) => v.toFixed(3)} onChange={(chromaticAberration) => set({ chromaticAberration })} />
          <Slider label="等离子幅度" value={opts.noiseAmp} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(noiseAmp) => set({ noiseAmp })} />
          <Slider label="暗角" value={opts.vignette} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(vignette) => set({ vignette })} />
          <Slider label="亮度" value={opts.brightness} min={0} max={2.5} step={0.1} format={(v) => v.toFixed(1)} onChange={(brightness) => set({ brightness })} />
          <Slider label="乱码速度" value={opts.scramble} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(scramble) => set({ scramble })} />
          <ControlRow label="浅色模式">
            <Switch checked={opts.lightMode} onChange={(lightMode) => set({ lightMode })} label="浅色模式" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 220, background: "#050507" }}>
        <FaultyTerminal tint="#5dff9e" mouseReact={false} pageLoadAnimation={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
