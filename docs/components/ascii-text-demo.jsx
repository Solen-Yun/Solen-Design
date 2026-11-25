import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as ASCIIText } from "../../src/components/ascii-text/ASCIIText.jsx";

/* The demo mounts the renderer on a sized dark panel — the component fills
   its parent, so the panel IS the canvas. Moving the pointer tilts the plane,
   hovering scrambles nearby cells, clicking drops a ripple ring. */

const PRESETS = ["Hey!", "WAVES", "Solen"];

const DEFAULTS = {
  text: "Hey!",
  theme: "dark",
  textColor: "#fdf9f3",
  asciiFontSize: 8,
  textScale: 1,
  blocks: 0.9,
  waves: 1,
  waveSpeed: 1,
  chroma: 1,
  tilt: 1,
  hueShift: 1,
  scramble: 0.6,
  interactive: true,
  clickRipple: true,
  idle: true,
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
  const dark = opts.theme === "dark";

  return (
    <>
      <div className="demo-stage" style={{ background: dark ? "#101014" : "#f4f4f5", colorScheme: dark ? "dark" : "light" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "min(720px, 92vw)", height: 320 }}>
            <ASCIIText
              text={opts.text}
              theme={opts.theme}
              textColor={opts.textColor}
              asciiFontSize={opts.asciiFontSize}
              textScale={opts.textScale}
              blocks={opts.blocks}
              waves={opts.waves}
              waveSpeed={opts.waveSpeed}
              chroma={opts.chroma}
              tilt={opts.tilt}
              hueShift={opts.hueShift}
              scramble={opts.scramble}
              interactive={opts.interactive}
              clickRipple={opts.clickRipple}
              idle={opts.idle}
              intro={opts.intro}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./ascii-text-preview.html">
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
              {PRESETS.map((label) => (
                <button key={label} type="button" className={opts.text === label ? "active" : ""} onClick={() => set({ text: label })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Color label="文字颜色" value={opts.textColor} onChange={(textColor) => set({ textColor })} />
          <ControlRow label="浅色主题">
            <Switch checked={!dark} onChange={(light) => set({ theme: light ? "light" : "dark" })} label="浅色主题" />
          </ControlRow>
          <Slider label="字符格" value={opts.asciiFontSize} min={3} max={16} step={1} format={(v) => `${v}px`} onChange={(asciiFontSize) => set({ asciiFontSize })} />
          <Slider label="文字缩放" value={opts.textScale} min={0.1} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(textScale) => set({ textScale })} />
          <Slider label="底图" value={opts.blocks} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(blocks) => set({ blocks })} />
          <Slider label="波浪" value={opts.waves} min={0} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(waves) => set({ waves })} />
          <Slider label="波速" value={opts.waveSpeed} min={0} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(waveSpeed) => set({ waveSpeed })} />
          <Slider label="色散" value={opts.chroma} min={0} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(chroma) => set({ chroma })} />
          <Slider label="倾斜" value={opts.tilt} min={0} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(tilt) => set({ tilt })} />
          <Slider label="色相偏移" value={opts.hueShift} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(hueShift) => set({ hueShift })} />
          <Slider label="打散强度" value={opts.scramble} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(scramble) => set({ scramble })} />
          <ControlRow label="指针交互">
            <Switch checked={opts.interactive} onChange={(interactive) => set({ interactive })} label="指针交互" />
          </ControlRow>
          <ControlRow label="点击波纹">
            <Switch checked={opts.clickRipple} onChange={(clickRipple) => set({ clickRipple })} label="点击波纹" />
          </ControlRow>
          <ControlRow label="静止摆动">
            <Switch checked={opts.idle} onChange={(idle) => set({ idle })} label="静止摆动" />
          </ControlRow>
          <ControlRow label="解码入场">
            <Switch checked={opts.intro} onChange={(intro) => set({ intro })} label="解码入场" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the default palette on the dark stage, intro off so the
   card stays settled. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 170, background: "#101014" }}>
        <ASCIIText text="Solen" intro={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
