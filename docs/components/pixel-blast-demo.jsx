import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as PixelBlast } from "../../src/components/pixel-blast/PixelBlast.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Sweep the pointer to paint/reveal density, click for ripple rings,
   and try the tilt sliders for the perspective floor. */

const DEFAULTS = {
  color: "#B497CF",
  accentColor: "#ffffff",
  variant: "square",
  pixelSize: 3,
  patternScale: 2,
  patternDensity: 1,
  pixelSizeJitter: 0,
  rippleIntensityScale: 1,
  rippleThickness: 0.1,
  rippleSpeed: 0.3,
  speed: 0.5,
  edgeFade: 0.5,
  softness: 0.6,
  smoothing: 1,
  glow: 0.4,
  twinkle: 0.25,
  drift: 0.2,
  driftAngle: 30,
  hoverEffect: "reveal",
  hoverRadius: 140,
  autoRipple: 0,
  tiltX: 0,
  tiltY: 0,
  enableRipples: true,
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
      <div className="demo-stage" style={{ background: opts.lightMode ? "#f4f4f5" : "#101014", colorScheme: opts.lightMode ? "light" : "dark" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", maxWidth: 760, height: 340 }}>
            <PixelBlast
              variant={opts.variant}
              pixelSize={opts.pixelSize}
              color={opts.color}
              accentColor={opts.accentColor}
              patternScale={opts.patternScale}
              patternDensity={opts.patternDensity}
              pixelSizeJitter={opts.pixelSizeJitter}
              enableRipples={opts.enableRipples}
              rippleIntensityScale={opts.rippleIntensityScale}
              rippleThickness={opts.rippleThickness}
              rippleSpeed={opts.rippleSpeed}
              speed={opts.speed}
              edgeFade={opts.edgeFade}
              softness={opts.softness}
              smoothing={opts.smoothing}
              glow={opts.glow}
              twinkle={opts.twinkle}
              drift={opts.drift}
              driftAngle={opts.driftAngle}
              hoverEffect={opts.hoverEffect}
              hoverRadius={opts.hoverRadius}
              autoRipple={opts.autoRipple}
              tiltX={opts.tiltX}
              tiltY={opts.tiltY}
              lightMode={opts.lightMode}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./pixel-blast-preview.html">
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
          <Color label="像素色" value={opts.color} onChange={(color) => set({ color })} />
          <Color label="高亮色" value={opts.accentColor} onChange={(accentColor) => set({ accentColor })} />
          <Slider label="像素尺寸" value={opts.pixelSize} min={1} max={8} step={0.5} format={(v) => `${v}×`} onChange={(pixelSize) => set({ pixelSize })} />
          <Slider label="图案尺度" value={opts.patternScale} min={0.5} max={6} step={0.1} format={(v) => v.toFixed(1)} onChange={(patternScale) => set({ patternScale })} />
          <Slider label="密度" value={opts.patternDensity} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(patternDensity) => set({ patternDensity })} />
          <Slider label="尺寸抖动" value={opts.pixelSizeJitter} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(pixelSizeJitter) => set({ pixelSizeJitter })} />
          <Slider label="涟漪亮度" value={opts.rippleIntensityScale} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(rippleIntensityScale) => set({ rippleIntensityScale })} />
          <Slider label="涟漪环宽" value={opts.rippleThickness} min={0.02} max={0.5} step={0.02} format={(v) => v.toFixed(2)} onChange={(rippleThickness) => set({ rippleThickness })} />
          <Slider label="涟漪速度" value={opts.rippleSpeed} min={0.05} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(rippleSpeed) => set({ rippleSpeed })} />
          <Slider label="演化速度" value={opts.speed} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(speed) => set({ speed })} />
          <Slider label="边缘羽化" value={opts.edgeFade} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(edgeFade) => set({ edgeFade })} />
          <Slider label="柔度" value={opts.softness} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(softness) => set({ softness })} />
          <Slider label="平滑" value={opts.smoothing} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(smoothing) => set({ smoothing })} />
          <Slider label="光雾" value={opts.glow} min={0} max={2} step={0.1} format={(v) => v.toFixed(1)} onChange={(glow) => set({ glow })} />
          <Slider label="闪烁" value={opts.twinkle} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(twinkle) => set({ twinkle })} />
          <Slider label="漂移" value={opts.drift} min={0} max={2} step={0.1} format={(v) => v.toFixed(1)} onChange={(drift) => set({ drift })} />
          <Slider label="漂移角" value={opts.driftAngle} min={0} max={360} step={5} format={(v) => `${v}°`} onChange={(driftAngle) => set({ driftAngle })} />
          <Slider label="笔刷半径" value={opts.hoverRadius} min={40} max={320} step={10} format={(v) => `${v}px`} onChange={(hoverRadius) => set({ hoverRadius })} />
          <Slider label="自动涟漪" value={opts.autoRipple} min={0} max={6} step={0.5} format={(v) => `${v}s`} onChange={(autoRipple) => set({ autoRipple })} />
          <Slider label="倾角 X" value={opts.tiltX} min={-70} max={70} step={1} format={(v) => `${v}°`} onChange={(tiltX) => set({ tiltX })} />
          <Slider label="倾角 Y" value={opts.tiltY} min={-70} max={70} step={1} format={(v) => `${v}°`} onChange={(tiltY) => set({ tiltY })} />
          <ControlRow label="剪影">
            <div className="view-tabs">
              {[["square", "方"], ["circle", "圆"], ["triangle", "三角"], ["diamond", "菱"], ["cross", "十字"], ["ring", "环"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.variant === id ? "active" : ""} onClick={() => set({ variant: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="指针效果">
            <div className="view-tabs">
              {[["none", "无"], ["grow", "鼓胀"], ["reveal", "画云"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.hoverEffect === id ? "active" : ""} onClick={() => set({ hoverEffect: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="涟漪开关">
            <Switch checked={opts.enableRipples} onChange={(enableRipples) => set({ enableRipples })} label="涟漪开关" />
          </ControlRow>
          <ControlRow label="白纸模式">
            <Switch checked={opts.lightMode} onChange={(lightMode) => set({ lightMode })} label="白纸模式" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the default dithered cloud on the dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 170, background: "#101014" }}>
        <PixelBlast />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
