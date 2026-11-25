import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as Scanner } from "../../src/components/scanner/Scanner.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Push the lines around with the cursor lens, click for sonar pings. */

const DEFAULTS = {
  color1: "#5227ff",
  color2: "#ff9ffc",
  color3: "#ffffff",
  speed: 0.5,
  sweepSpeed: 0.25,
  sweepWidth: 1.6,
  trail: 0.5,
  reverse: false,
  scale: 1.5,
  frequency: 2,
  ripple: 0.22,
  bandDensity: 11,
  lineWidth: 1.2,
  glow: 0.6,
  scanDirection: "vertical",
  colorSpread: 0.7,
  brightness: 1,
  vignette: 0.3,
  scanline: true,
  scanlineIntensity: 0.5,
  grain: true,
  grainIntensity: 0.04,
  mouseMode: "repel",
  mouseRadius: 0.5,
  mouseStrength: 0.7,
  clickEffect: "ping",
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

/* A background component: the host owns the size, so the demo hands it a
   100%-wide, fixed-height box exactly like the usage example does. */
function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => setOpts(DEFAULTS);

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ width: "100%", height: 520, position: "relative" }}>
            <Scanner
              color1={opts.color1}
              color2={opts.color2}
              color3={opts.color3}
              speed={opts.speed}
              sweepSpeed={opts.sweepSpeed}
              sweepWidth={opts.sweepWidth}
              trail={opts.trail}
              reverse={opts.reverse}
              scale={opts.scale}
              frequency={opts.frequency}
              ripple={opts.ripple}
              bandDensity={opts.bandDensity}
              lineWidth={opts.lineWidth}
              glow={opts.glow}
              scanDirection={opts.scanDirection}
              colorSpread={opts.colorSpread}
              brightness={opts.brightness}
              vignette={opts.vignette}
              scanline={opts.scanline}
              scanlineIntensity={opts.scanlineIntensity}
              grain={opts.grain}
              grainIntensity={opts.grainIntensity}
              mouseMode={opts.mouseMode}
              mouseRadius={opts.mouseRadius}
              mouseStrength={opts.mouseStrength}
              clickEffect={opts.clickEffect}
              lightMode={opts.lightMode}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./scanner-preview.html">
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
          <Color label="基准色" value={opts.color1} onChange={(color1) => set({ color1 })} />
          <Color label="加热色" value={opts.color2} onChange={(color2) => set({ color2 })} />
          <Color label="白热色" value={opts.color3} onChange={(color3) => set({ color3 })} />
          <ControlRow label="扫描方向">
            <div className="view-tabs">
              {[["vertical", "垂直"], ["horizontal", "水平"], ["diagonal", "对角"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.scanDirection === id ? "active" : ""} onClick={() => set({ scanDirection: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="场速度" value={opts.speed} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(speed) => set({ speed })} />
          <Slider label="扫描速度" value={opts.sweepSpeed} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(sweepSpeed) => set({ sweepSpeed })} />
          <ControlRow label="扫描反向">
            <Switch checked={opts.reverse} onChange={(reverse) => set({ reverse })} label="扫描反向" />
          </ControlRow>
          <Slider label="余辉" value={opts.trail} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(trail) => set({ trail })} />
          <Slider label="缩放" value={opts.scale} min={0.5} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(scale) => set({ scale })} />
          <Slider label="波频" value={opts.frequency} min={0.5} max={5} step={0.1} format={(v) => v.toFixed(1)} onChange={(frequency) => set({ frequency })} />
          <Slider label="波弯曲" value={opts.ripple} min={0} max={0.6} step={0.02} format={(v) => v.toFixed(2)} onChange={(ripple) => set({ ripple })} />
          <Slider label="线密度" value={opts.bandDensity} min={4} max={24} step={1} format={(v) => String(v)} onChange={(bandDensity) => set({ bandDensity })} />
          <Slider label="线宽" value={opts.lineWidth} min={0.5} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(lineWidth) => set({ lineWidth })} />
          <Slider label="光晕" value={opts.glow} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(glow) => set({ glow })} />
          <Slider label="色差分离" value={opts.colorSpread} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(colorSpread) => set({ colorSpread })} />
          <ControlRow label="透镜模式">
            <div className="view-tabs">
              {[["repel", "推开"], ["attract", "吸拢"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.mouseMode === id ? "active" : ""} onClick={() => set({ mouseMode: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="透镜半径" value={opts.mouseRadius} min={0.1} max={1.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(mouseRadius) => set({ mouseRadius })} />
          <Slider label="透镜强度" value={opts.mouseStrength} min={0} max={1.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(mouseStrength) => set({ mouseStrength })} />
          <ControlRow label="声呐环">
            <Switch checked={opts.clickEffect === "ping"} onChange={(on) => set({ clickEffect: on ? "ping" : "none" })} label="声呐环" />
          </ControlRow>
          <ControlRow label="扫描线">
            <Switch checked={opts.scanline} onChange={(scanline) => set({ scanline })} label="扫描线" />
          </ControlRow>
          <ControlRow label="颗粒">
            <Switch checked={opts.grain} onChange={(grain) => set({ grain })} label="颗粒" />
          </ControlRow>
          <Slider label="暗角" value={opts.vignette} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(vignette) => set({ vignette })} />
          <ControlRow label="浅色模式">
            <Switch checked={opts.lightMode} onChange={(lightMode) => set({ lightMode })} label="浅色模式" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the sweep running calmly; the cursor passing over the
   gallery must not bend the lines, so the lens is dialled down. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 220, position: "relative", background: "#101014" }}>
        <Scanner mouseStrength={0} clickEffect="none" />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
