import { useState } from "react";
import { DemoFit } from "../demo-fit";
import Balatro from "../../src/components/balatro/Balatro.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Drag to stir the paint, click to drop a whirlpool. */

const DEFAULTS = {
  color1: "#DE443B",
  color2: "#006BB4",
  color3: "#162325",
  contrast: 3.5,
  lighting: 0.4,
  swirl: 0.25,
  speed: 1,
  rotationSpeed: 0,
  scale: 1,
  detail: 5,
  pixelSize: 1.5,
  crt: 0,
  mouseInteraction: true,
  clickSwirl: true,
  lightMode: false,
};

const PALETTES = [
  ["经典", "#DE443B", "#006BB4", "#162325"],
  ["杏核", "#f2a33c", "#3b6bff", "#171221"],
  ["苔原", "#9fd356", "#2c8c7d", "#101a16"],
];

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
          <div style={{ width: "100%", height: 320, position: "relative" }}>
            <Balatro
              color1={opts.color1}
              color2={opts.color2}
              color3={opts.color3}
              contrast={opts.contrast}
              lighting={opts.lighting}
              swirl={opts.swirl}
              speed={opts.speed}
              rotationSpeed={opts.rotationSpeed}
              scale={opts.scale}
              detail={opts.detail}
              pixelSize={opts.pixelSize}
              crt={opts.crt}
              mouseInteraction={opts.mouseInteraction}
              clickSwirl={opts.clickSwirl}
              lightMode={opts.lightMode}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./balatro-preview.html">
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
          <ControlRow label="配色">
            <div className="view-tabs">
              {PALETTES.map(([name, c1, c2, c3]) => (
                <button
                  key={name}
                  type="button"
                  className={opts.color1 === c1 && opts.color2 === c2 && opts.color3 === c3 ? "active" : ""}
                  onClick={() => set({ color1: c1, color2: c2, color3: c3 })}
                >
                  {name}
                </button>
              ))}
            </div>
          </ControlRow>
          <Color label="色一" value={opts.color1} onChange={(color1) => set({ color1 })} />
          <Color label="色二" value={opts.color2} onChange={(color2) => set({ color2 })} />
          <Color label="间隙" value={opts.color3} onChange={(color3) => set({ color3 })} />
          <Slider label="对比" value={opts.contrast} min={0.5} max={10} step={0.1} format={(v) => v.toFixed(1)} onChange={(contrast) => set({ contrast })} />
          <Slider label="亮泽" value={opts.lighting} min={0} max={1.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(lighting) => set({ lighting })} />
          <Slider label="扭转" value={opts.swirl} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(swirl) => set({ swirl })} />
          <Slider label="速度" value={opts.speed} min={0} max={3} step={0.05} format={(v) => `${v.toFixed(2)}×`} onChange={(speed) => set({ speed })} />
          <Slider label="整体旋转" value={opts.rotationSpeed} min={-10} max={10} step={0.5} format={(v) => String(v)} onChange={(rotationSpeed) => set({ rotationSpeed })} />
          <Slider label="尺度" value={opts.scale} min={0.2} max={5} step={0.05} format={(v) => `${v.toFixed(2)}×`} onChange={(scale) => set({ scale })} />
          <Slider label="迭代" value={opts.detail} min={1} max={8} step={1} format={(v) => String(v)} onChange={(detail) => set({ detail })} />
          <Slider label="像素块" value={opts.pixelSize} min={0} max={8} step={0.5} format={(v) => String(v)} onChange={(pixelSize) => set({ pixelSize })} />
          <Slider label="CRT" value={opts.crt} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(crt) => set({ crt })} />
          <ControlRow label="指针交互">
            <Switch checked={opts.mouseInteraction} onChange={(mouseInteraction) => set({ mouseInteraction })} label="指针交互" />
          </ControlRow>
          <ControlRow label="点击涡眼">
            <Switch checked={opts.clickSwirl} onChange={(clickSwirl) => set({ clickSwirl })} label="点击涡眼" />
          </ControlRow>
          <ControlRow label="亮色模式">
            <Switch checked={opts.lightMode} onChange={(lightMode) => set({ lightMode })} label="亮色模式" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the paint swirl fills the card at defaults. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 200, position: "relative", background: "#101014" }}>
        <Balatro />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
