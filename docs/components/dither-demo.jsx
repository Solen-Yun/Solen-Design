import { useState } from "react";
import { DemoFit } from "../demo-fit";
import Dither from "../../src/components/dither/Dither.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Click the stage to fire shock rings; drag to carve the trail effect. */

const DEFAULTS = {
  ditherMode: "bayer",
  mouseEffect: "erase",
  waveSpeed: 0.05,
  colorNum: 4,
  pixelSize: 3,
  mouseRadius: 1,
  mouseStrength: 1,
  trail: 0.5,
  contrast: 1,
  brightness: 0,
  clickRipple: true,
};

const MODES = [
  ["bayer", "8×8"],
  ["bayer4", "4×4"],
  ["bayer2", "2×2"],
  ["halftone", "半调"],
  ["lines", "横纹"],
  ["crosshatch", "斜纹"],
  ["noise", "噪点"],
  ["none", "无"],
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

function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => setOpts(DEFAULTS);

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", height: 340 }}>
            <Dither
              waveColor={[0.9, 0.9, 0.95]}
              backgroundColor={[0, 0, 0]}
              ditherMode={opts.ditherMode}
              mouseEffect={opts.mouseEffect}
              waveSpeed={opts.waveSpeed}
              colorNum={opts.colorNum}
              pixelSize={opts.pixelSize}
              mouseRadius={opts.mouseRadius}
              mouseStrength={opts.mouseStrength}
              trail={opts.trail}
              contrast={opts.contrast}
              brightness={opts.brightness}
              clickRipple={opts.clickRipple}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./dither-preview.html">
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
          <ControlRow label="阈值图案">
            <div className="view-tabs">
              {MODES.map(([id, label]) => (
                <button key={id} type="button" className={opts.ditherMode === id ? "active" : ""} onClick={() => set({ ditherMode: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="光标效果">
            <div className="view-tabs">
              {[["erase", "擦除"], ["reveal", "显影"], ["ripple", "行波"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.mouseEffect === id ? "active" : ""} onClick={() => set({ mouseEffect: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="波速" value={opts.waveSpeed} min={0} max={0.4} step={0.01} format={(v) => v.toFixed(2)} onChange={(waveSpeed) => set({ waveSpeed })} />
          <Slider label="色阶" value={opts.colorNum} min={2} max={8} step={1} format={(v) => String(v)} onChange={(colorNum) => set({ colorNum })} />
          <Slider label="像素格" value={opts.pixelSize} min={1} max={10} step={1} format={(v) => `${v}px`} onChange={(pixelSize) => set({ pixelSize })} />
          <Slider label="光标半径" value={opts.mouseRadius} min={0.2} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(mouseRadius) => set({ mouseRadius })} />
          <Slider label="光标强度" value={opts.mouseStrength} min={0} max={2} step={0.1} format={(v) => v.toFixed(1)} onChange={(mouseStrength) => set({ mouseStrength })} />
          <Slider label="轨迹余晖" value={opts.trail} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(trail) => set({ trail })} />
          <Slider label="对比度" value={opts.contrast} min={0.2} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(contrast) => set({ contrast })} />
          <Slider label="亮度" value={opts.brightness} min={-0.5} max={0.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(brightness) => set({ brightness })} />
          <ControlRow label="点击涟漪">
            <Switch checked={opts.clickRipple} onChange={(clickRipple) => set({ clickRipple })} label="点击涟漪" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — halftone dots scrolling on black with one bright reveal stroke. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 170, background: "#101014" }}>
        <Dither
          waveColor={[0.85, 0.88, 1]}
          backgroundColor={[0, 0, 0]}
          ditherMode="halftone"
          pixelSize={4}
          colorNum={3}
          waveSpeed={0.06}
        />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
