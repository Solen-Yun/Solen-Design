import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as ShapeGrid } from "../../src/components/shape-grid/ShapeGrid.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Flick the cursor so the spotlight overshoots, click for cascades. */

const DEFAULTS = {
  shape: "square",
  cellSize: 40,
  lineWidth: 1,
  direction: "diagonal",
  speed: 0.5,
  lineColor: "#2a2734",
  hoverColor: "#ffffff",
  fillOpacity: 0.15,
  rainbow: false,
  tiltX: 0,
  tiltY: 0,
  radius: 1.5,
  trail: 0.6,
  glow: 0.35,
  twinkle: 0,
  clickCascade: true,
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
            <ShapeGrid
              shape={opts.shape}
              cellSize={opts.cellSize}
              lineWidth={opts.lineWidth}
              direction={opts.direction}
              speed={opts.speed}
              lineColor={opts.lineColor}
              hoverColor={opts.hoverColor}
              fillOpacity={opts.fillOpacity}
              rainbow={opts.rainbow}
              tiltX={opts.tiltX}
              tiltY={opts.tiltY}
              radius={opts.radius}
              trail={opts.trail}
              glow={opts.glow}
              twinkle={opts.twinkle}
              clickCascade={opts.clickCascade}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./shape-grid-preview.html">
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
          <ControlRow label="形状">
            <div className="view-tabs">
              {[["square", "方格"], ["tile", "圆砖"], ["hexagon", "蜂窝"], ["triangle", "三角"], ["diamond", "菱形"], ["circle", "圆"], ["cross", "十字"], ["dot", "点"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.shape === id ? "active" : ""} onClick={() => set({ shape: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="单元格" value={opts.cellSize} min={16} max={80} step={2} format={(v) => `${v}px`} onChange={(cellSize) => set({ cellSize })} />
          <Slider label="线宽" value={opts.lineWidth} min={0.5} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(lineWidth) => set({ lineWidth })} />
          <ControlRow label="漂移方向">
            <div className="view-tabs">
              {[["right", "右"], ["left", "左"], ["up", "上"], ["down", "下"], ["diagonal", "斜"], ["none", "停"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.direction === id ? "active" : ""} onClick={() => set({ direction: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="漂移速度" value={opts.speed} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(speed) => set({ speed })} />
          <Color label="描线色" value={opts.lineColor} onChange={(lineColor) => set({ lineColor })} />
          <Color label="点亮色" value={opts.hoverColor} onChange={(hoverColor) => set({ hoverColor })} />
          <Slider label="填充浓度" value={opts.fillOpacity} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(fillOpacity) => set({ fillOpacity })} />
          <ControlRow label="彩虹色相">
            <Switch checked={opts.rainbow} onChange={(rainbow) => set({ rainbow })} label="彩虹色相" />
          </ControlRow>
          <Slider label="纵倾角" value={opts.tiltX} min={-60} max={60} step={1} format={(v) => `${v}°`} onChange={(tiltX) => set({ tiltX })} />
          <Slider label="横倾角" value={opts.tiltY} min={-60} max={60} step={1} format={(v) => `${v}°`} onChange={(tiltY) => set({ tiltY })} />
          <Slider label="光斑半径" value={opts.radius} min={0} max={3} step={0.1} format={(v) => `${v.toFixed(1)} 格`} onChange={(radius) => set({ radius })} />
          <Slider label="余辉" value={opts.trail} min={0.1} max={1.5} step={0.05} format={(v) => `${v.toFixed(2)}s`} onChange={(trail) => set({ trail })} />
          <Slider label="辉光" value={opts.glow} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(glow) => set({ glow })} />
          <Slider label="闪烁" value={opts.twinkle} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(twinkle) => set({ twinkle })} />
          <ControlRow label="点击光环">
            <Switch checked={opts.clickCascade} onChange={(clickCascade) => set({ clickCascade })} label="点击光环" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — a calm drifting wall; the cursor passing over the gallery
   must not light it up, so interactivity is dialled down in the card. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 220, position: "relative", background: "#101014" }}>
        <ShapeGrid shape="hexagon" cellSize={34} direction="up" speed={0.35} lineColor="#3a3746" hoverColor="#ffffff" glow={0.4} radius={0} trail={0.4} clickCascade={false} intro={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
