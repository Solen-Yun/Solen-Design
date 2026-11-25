import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as RippleGrid } from "../../src/components/ripple-grid/RippleGrid.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Drag the cursor for a ripple trail, click for a strong burst. */

const DEFAULTS = {
  color: "#ffffff",
  variant: "lines",
  cellSize: 48,
  lineWidth: 1,
  glow: 0.6,
  rippleStrength: 1,
  rippleSpeed: 1,
  rippleSize: 1,
  autoRipple: "center",
  rippleInterval: 2.6,
  tilt: 0,
  rotation: 0,
  mouseInteraction: true,
  clickRipple: true,
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
            <RippleGrid
              color={opts.color}
              variant={opts.variant}
              cellSize={opts.cellSize}
              lineWidth={opts.lineWidth}
              glow={opts.glow}
              rippleStrength={opts.rippleStrength}
              rippleSpeed={opts.rippleSpeed}
              rippleSize={opts.rippleSize}
              autoRipple={opts.autoRipple}
              rippleInterval={opts.rippleInterval}
              tilt={opts.tilt}
              rotation={opts.rotation}
              mouseInteraction={opts.mouseInteraction}
              clickRipple={opts.clickRipple}
              lightMode={opts.lightMode}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./ripple-grid-preview.html">
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
          <Color label="网格色" value={opts.color} onChange={(color) => set({ color })} />
          <ControlRow label="形态">
            <div className="view-tabs">
              {[["lines", "直线"], ["dots", "圆点"], ["cross", "十字"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.variant === id ? "active" : ""} onClick={() => set({ variant: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="单元格" value={opts.cellSize} min={16} max={96} step={2} format={(v) => `${v}px`} onChange={(cellSize) => set({ cellSize })} />
          <Slider label="线宽" value={opts.lineWidth} min={0.5} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(lineWidth) => set({ lineWidth })} />
          <Slider label="光晕" value={opts.glow} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(glow) => set({ glow })} />
          <Slider label="波力" value={opts.rippleStrength} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(rippleStrength) => set({ rippleStrength })} />
          <Slider label="波速" value={opts.rippleSpeed} min={0.2} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(rippleSpeed) => set({ rippleSpeed })} />
          <Slider label="波长" value={opts.rippleSize} min={0.4} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(rippleSize) => set({ rippleSize })} />
          <ControlRow label="自动波纹">
            <div className="view-tabs">
              {[["center", "中心"], ["random", "随机"], ["none", "关闭"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.autoRipple === id ? "active" : ""} onClick={() => set({ autoRipple: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="波纹间隔" value={opts.rippleInterval} min={0.5} max={6} step={0.1} format={(v) => `${v.toFixed(1)}s`} onChange={(rippleInterval) => set({ rippleInterval })} />
          <Slider label="俯角" value={opts.tilt} min={0} max={60} step={1} format={(v) => `${v}°`} onChange={(tilt) => set({ tilt })} />
          <Slider label="旋转" value={opts.rotation} min={0} max={90} step={1} format={(v) => `${v}°`} onChange={(rotation) => set({ rotation })} />
          <ControlRow label="鼠标波纹">
            <Switch checked={opts.mouseInteraction} onChange={(mouseInteraction) => set({ mouseInteraction })} label="鼠标波纹" />
          </ControlRow>
          <ControlRow label="点击炸波">
            <Switch checked={opts.clickRipple} onChange={(clickRipple) => set({ clickRipple })} label="点击炸波" />
          </ControlRow>
          <ControlRow label="浅色模式">
            <Switch checked={opts.lightMode} onChange={(lightMode) => set({ lightMode })} label="浅色模式" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the grid breathing on its own; the cursor passing over
   the gallery must not ripple it, so mouse interaction stays off. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 220, position: "relative", background: "#101014" }}>
        <RippleGrid cellSize={40} autoRipple="center" rippleInterval={3} mouseInteraction={false} clickRipple={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
