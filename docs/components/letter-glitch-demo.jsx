import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as LetterGlitch } from "../../src/components/letter-glitch/LetterGlitch.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Fast cursor movement scatters glyphs; clicks tear or burst across the grid. */

const DEFAULTS = {
  lightMode: false,
  clickEffect: "tear",
  color1: "#ffffff",
  color2: "#61dca3",
  baseColor: "#ffffff",
  fontSize: 14,
  glitchAmount: 0.5,
  density: 0.9,
  baseOpacity: 0.16,
  speed: 1,
  flow: 0.5,
  cursorRadius: 140,
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
  const dark = !opts.lightMode;

  return (
    <>
      <div className="demo-stage" style={{ background: dark ? "#101014" : "#e6e6ea", colorScheme: dark ? "dark" : "light" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", height: 440 }}>
            <LetterGlitch
              lightMode={opts.lightMode}
              clickEffect={opts.clickEffect}
              glitchColors={[opts.color1, opts.color2]}
              baseColor={opts.baseColor}
              fontSize={opts.fontSize}
              glitchAmount={opts.glitchAmount}
              density={opts.density}
              baseOpacity={opts.baseOpacity}
              speed={opts.speed}
              flow={opts.flow}
              cursorRadius={opts.cursorRadius}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./letter-glitch-preview.html">
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
          <ControlRow label="浅色模式">
            <Switch checked={opts.lightMode} onChange={(lightMode) => set({ lightMode })} label="浅色模式" />
          </ControlRow>
          <ControlRow label="点击效果">
            <div className="view-tabs">
              {[["tear", "撕裂"], ["burst", "爆裂"], ["none", "关闭"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.clickEffect === id ? "active" : ""} onClick={() => set({ clickEffect: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Color label="高亮色一" value={opts.color1} onChange={(color1) => set({ color1 })} />
          <Color label="高亮色二" value={opts.color2} onChange={(color2) => set({ color2 })} />
          <Color label="墨色" value={opts.baseColor} onChange={(baseColor) => set({ baseColor })} />
          <Slider label="字号" value={opts.fontSize} min={8} max={48} step={1} format={(v) => `${v}px`} onChange={(fontSize) => set({ fontSize })} />
          <Slider label="闪烁量" value={opts.glitchAmount} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(glitchAmount) => set({ glitchAmount })} />
          <Slider label="密度" value={opts.density} min={0.2} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(density) => set({ density })} />
          <Slider label="墨色浓度" value={opts.baseOpacity} min={0.02} max={0.6} step={0.02} format={(v) => v.toFixed(2)} onChange={(baseOpacity) => set({ baseOpacity })} />
          <Slider label="节奏" value={opts.speed} min={0} max={3} step={0.1} format={(v) => `${v.toFixed(1)}×`} onChange={(speed) => set({ speed })} />
          <Slider label="流速" value={opts.flow} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(flow) => set({ flow })} />
          <Slider label="感应半径" value={opts.cursorRadius} min={40} max={320} step={10} format={(v) => `${v}px`} onChange={(cursorRadius) => set({ cursorRadius })} />
        </div>
      </div>
    </>
  );
}

/* Gallery card — a quiet dark field with a touch of ambient glitch; cursor
   interaction off so the card stays calm while the cursor passes over the gallery. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 200, background: "#101014" }}>
        <LetterGlitch interactive={false} glitchAmount={0.3} baseOpacity={0.14} fontSize={12} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
