import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as MagnetLines } from "../../src/components/magnet-lines/MagnetLines.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Sweep the pointer for rippled swings, click for the full-turn flash
   wave, and try dipole while wiggling the pointer to flip the poles. */

const DEFAULTS = {
  lineColor: "#efefef",
  spacing: 30,
  lineWidth: 2,
  lineHeight: 18,
  baseAngle: -10,
  mode: "orbit",
  shape: "line",
  rainbow: false,
  radius: 200,
  fade: 0.65,
  edgeFade: 0,
  stretch: 0.4,
  reach: 0,
  scatter: 0,
  inertia: 0.35,
  bounce: 0.3,
  ripple: 0.3,
  tiltX: 0,
  clickPulse: true,
  idle: false,
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
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ width: "100%", maxWidth: 720, height: 320 }}>
            <MagnetLines
              lineColor={opts.lineColor}
              spacing={opts.spacing}
              lineWidth={opts.lineWidth}
              lineHeight={opts.lineHeight}
              baseAngle={opts.baseAngle}
              mode={opts.mode}
              shape={opts.shape}
              rainbow={opts.rainbow}
              radius={opts.radius}
              fade={opts.fade}
              edgeFade={opts.edgeFade}
              stretch={opts.stretch}
              reach={opts.reach}
              scatter={opts.scatter}
              inertia={opts.inertia}
              bounce={opts.bounce}
              ripple={opts.ripple}
              tiltX={opts.tiltX}
              clickPulse={opts.clickPulse}
              idle={opts.idle}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./magnet-lines-preview.html">
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
          <Color label="磁针色" value={opts.lineColor} onChange={(lineColor) => set({ lineColor })} />
          <Slider label="间距" value={opts.spacing} min={12} max={80} step={2} format={(v) => `${v}px`} onChange={(spacing) => set({ spacing })} />
          <Slider label="粗细" value={opts.lineWidth} min={0.5} max={6} step={0.5} format={(v) => `${v}px`} onChange={(lineWidth) => set({ lineWidth })} />
          <Slider label="长度" value={opts.lineHeight} min={6} max={40} step={1} format={(v) => `${v}px`} onChange={(lineHeight) => set({ lineHeight })} />
          <Slider label="静止角" value={opts.baseAngle} min={-90} max={90} step={5} format={(v) => `${v}°`} onChange={(baseAngle) => set({ baseAngle })} />
          <Slider label="影响半径" value={opts.radius} min={40} max={500} step={10} format={(v) => `${v}px`} onChange={(radius) => set({ radius })} />
          <Slider label="变暗" value={opts.fade} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(fade) => set({ fade })} />
          <Slider label="边缘羽化" value={opts.edgeFade} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(edgeFade) => set({ edgeFade })} />
          <Slider label="伸长" value={opts.stretch} min={0} max={2} step={0.1} format={(v) => v.toFixed(1)} onChange={(stretch) => set({ stretch })} />
          <Slider label="作用距离" value={opts.reach} min={0} max={600} step={10} format={(v) => `${v}px`} onChange={(reach) => set({ reach })} />
          <Slider label="散布" value={opts.scatter} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(scatter) => set({ scatter })} />
          <Slider label="惰性" value={opts.inertia} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(inertia) => set({ inertia })} />
          <Slider label="过冲" value={opts.bounce} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(bounce) => set({ bounce })} />
          <Slider label="涟漪" value={opts.ripple} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(ripple) => set({ ripple })} />
          <Slider label="倾角 X" value={opts.tiltX} min={-70} max={70} step={1} format={(v) => `${v}°`} onChange={(tiltX) => set({ tiltX })} />
          <ControlRow label="响应场">
            <div className="view-tabs">
              {[["orbit", "环绕"], ["attract", "直指"], ["spiral", "螺旋"], ["dipole", "偶极"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.mode === id ? "active" : ""} onClick={() => set({ mode: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="形状">
            <div className="view-tabs">
              {[["line", "直线"], ["arrow", "箭头"], ["needle", "磁针"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.shape === id ? "active" : ""} onClick={() => set({ shape: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="彩虹">
            <Switch checked={opts.rainbow} onChange={(rainbow) => set({ rainbow })} label="彩虹" />
          </ControlRow>
          <ControlRow label="点击波">
            <Switch checked={opts.clickPulse} onChange={(clickPulse) => set({ clickPulse })} label="点击波" />
          </ControlRow>
          <ControlRow label="幽灵游走">
            <Switch checked={opts.idle} onChange={(idle) => set({ idle })} label="幽灵游走" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the default field resting on the dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 170, background: "#101014" }}>
        <MagnetLines spacing={26} lineHeight={16} idle={true} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
