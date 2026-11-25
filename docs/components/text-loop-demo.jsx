import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as TextLoop } from "../../src/components/text-loop/TextLoop.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Grab the text and fling it; circles follow the pointer around the ring. */

const SHAPES = [
  { id: "wave", label: "波浪" },
  { id: "line", label: "直线" },
  { id: "arch", label: "拱桥" },
  { id: "circle", label: "圆环" },
  { id: "infinity", label: "无穷环" },
];

const DEFAULTS = {
  shape: "wave",
  speed: 90,
  reverse: false,
  curviness: 90,
  tilt: 0,
  fontSize: 46,
  ribbon: true,
  ribbonColor: "#5227FF",
  ribbonWidth: 86,
  cross: false,
  crossAngle: 16,
  edgeFade: 0,
  pauseOnHover: true,
  draggable: false,
  scrollBoost: 0,
  outline: false,
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
          <div style={{ width: "100%", padding: "8px 0", color: "#e4e4e7" }}>
            <TextLoop
              text="Solen Design"
              shape={opts.shape}
              speed={opts.speed}
              direction={opts.reverse ? "reverse" : "forward"}
              separator="✦"
              curviness={opts.curviness}
              tilt={opts.tilt}
              fontSize={opts.fontSize}
              fontWeight={800}
              letterSpacing={2}
              ribbon={opts.ribbon}
              ribbonColor={opts.ribbonColor}
              ribbonWidth={opts.ribbonWidth}
              cross={opts.cross}
              crossAngle={opts.crossAngle}
              edgeFade={opts.edgeFade}
              pauseOnHover={opts.pauseOnHover}
              draggable={opts.draggable}
              scrollBoost={opts.scrollBoost}
              outline={opts.outline}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./text-loop-preview.html">
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
          <ControlRow label="路径">
            <div className="view-tabs">
              {SHAPES.map((shape) => (
                <button
                  key={shape.id}
                  type="button"
                  className={opts.shape === shape.id ? "active" : ""}
                  onClick={() => set({ shape: shape.id })}
                >
                  {shape.label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="速度" value={opts.speed} min={0} max={240} step={10} format={(v) => `${v}px/s`} onChange={(speed) => set({ speed })} />
          <Slider label="弯曲" value={opts.curviness} min={0} max={300} step={5} format={(v) => String(v)} onChange={(curviness) => set({ curviness })} />
          <Slider label="倾斜" value={opts.tilt} min={-30} max={30} step={1} format={(v) => `${v}°`} onChange={(tilt) => set({ tilt })} />
          <Slider label="字号" value={opts.fontSize} min={24} max={80} step={2} format={(v) => `${v}px`} onChange={(fontSize) => set({ fontSize })} />
          <Slider label="带宽" value={opts.ribbonWidth} min={30} max={140} step={2} format={(v) => `${v}px`} onChange={(ribbonWidth) => set({ ribbonWidth })} />
          <Slider label="交叉夹角" value={opts.crossAngle} min={4} max={60} step={2} format={(v) => `${v}°`} onChange={(crossAngle) => set({ crossAngle })} />
          <Slider label="两侧渐隐" value={opts.edgeFade} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(edgeFade) => set({ edgeFade })} />
          <Slider label="滚动加速" value={opts.scrollBoost} min={0} max={6} step={0.5} format={(v) => v.toFixed(1)} onChange={(scrollBoost) => set({ scrollBoost })} />
          <Color label="彩带色" value={opts.ribbonColor} onChange={(ribbonColor) => set({ ribbonColor })} />
          <ControlRow label="反向行进">
            <Switch checked={opts.reverse} onChange={(reverse) => set({ reverse })} label="反向行进" />
          </ControlRow>
          <ControlRow label="彩带">
            <Switch checked={opts.ribbon} onChange={(ribbon) => set({ ribbon })} label="彩带" />
          </ControlRow>
          <ControlRow label="交叉带">
            <Switch checked={opts.cross} onChange={(cross) => set({ cross })} label="交叉带" />
          </ControlRow>
          <ControlRow label="描边空心">
            <Switch checked={opts.outline} onChange={(outline) => set({ outline })} label="描边空心" />
          </ControlRow>
          <ControlRow label="悬停暂停">
            <Switch checked={opts.pauseOnHover} onChange={(pauseOnHover) => set({ pauseOnHover })} label="悬停暂停" />
          </ControlRow>
          <ControlRow label="可拖拽">
            <Switch checked={opts.draggable} onChange={(draggable) => set({ draggable })} label="可拖拽" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — a quiet purple ribbon wave on the dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div
        style={{
          width: "100%",
          height: 190,
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          background: "#101014",
          colorScheme: "dark",
        }}
      >
        <TextLoop text="Solen Design" shape="wave" speed={60} fontSize={38} ribbonWidth={64} draggable={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
