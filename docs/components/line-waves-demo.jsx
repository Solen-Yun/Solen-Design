import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as LineWaves } from "../../src/components/line-waves/LineWaves.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Click inside the stage to drop an expanding ripple into the field. */

const DEFAULTS = {
  lightMode: false,
  color1: "#7c5cff",
  color2: "#00e0ff",
  color3: "#ff4fd8",
  colorCycleSpeed: 1,
  speed: 0.3,
  lineCount: 72,
  lineWidth: 1.3,
  glow: 0.6,
  highlight: 1,
  highlightWidth: 1,
  warpIntensity: 1,
  rotation: -33,
  mouseInfluence: 2,
  clickRipple: true,
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
      <div className="demo-stage" style={{ background: dark ? "#07070b" : "#e6e6ea", colorScheme: dark ? "dark" : "light" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", height: 440 }}>
            <LineWaves
              lightMode={opts.lightMode}
              color1={opts.color1}
              color2={opts.color2}
              color3={opts.color3}
              colorCycleSpeed={opts.colorCycleSpeed}
              speed={opts.speed}
              lineCount={opts.lineCount}
              lineWidth={opts.lineWidth}
              glow={opts.glow}
              highlight={opts.highlight}
              highlightWidth={opts.highlightWidth}
              warpIntensity={opts.warpIntensity}
              rotation={opts.rotation}
              mouseInfluence={opts.mouseInfluence}
              clickRipple={opts.clickRipple}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./line-waves-preview.html">
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
          <Color label="色一" value={opts.color1} onChange={(color1) => set({ color1 })} />
          <Color label="色二" value={opts.color2} onChange={(color2) => set({ color2 })} />
          <Color label="色三" value={opts.color3} onChange={(color3) => set({ color3 })} />
          <Slider label="循环速度" value={opts.colorCycleSpeed} min={0} max={3} step={0.1} format={(v) => `${v.toFixed(1)}×`} onChange={(colorCycleSpeed) => set({ colorCycleSpeed })} />
          <Slider label="流速" value={opts.speed} min={0} max={1.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(speed) => set({ speed })} />
          <Slider label="线数" value={opts.lineCount} min={8} max={240} step={4} format={(v) => String(v)} onChange={(lineCount) => set({ lineCount })} />
          <Slider label="线宽" value={opts.lineWidth} min={0.3} max={4} step={0.1} format={(v) => `${v.toFixed(1)}px`} onChange={(lineWidth) => set({ lineWidth })} />
          <Slider label="外晕" value={opts.glow} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(glow) => set({ glow })} />
          <Slider label="光带" value={opts.highlight} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(highlight) => set({ highlight })} />
          <Slider label="光带宽度" value={opts.highlightWidth} min={0.2} max={4} step={0.1} format={(v) => v.toFixed(1)} onChange={(highlightWidth) => set({ highlightWidth })} />
          <Slider label="褶皱" value={opts.warpIntensity} min={0} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(warpIntensity) => set({ warpIntensity })} />
          <Slider label="旋转" value={opts.rotation} min={-90} max={90} step={1} format={(v) => `${v}°`} onChange={(rotation) => set({ rotation })} />
          <Slider label="透镜" value={opts.mouseInfluence} min={0} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(mouseInfluence) => set({ mouseInfluence })} />
          <ControlRow label="点击涟漪">
            <Switch checked={opts.clickRipple} onChange={(clickRipple) => set({ clickRipple })} label="点击涟漪" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the wave field resting in a small dark stage; pointer effects
   off so the card stays calm while the cursor passes over the gallery. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 200, background: "#07070b" }}>
        <LineWaves
          color1="#7c5cff"
          color2="#00e0ff"
          color3="#ff4fd8"
          speed={0.2}
          lineCount={64}
          enableMouseInteraction={false}
          clickRipple={false}
          intro={false}
        />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
