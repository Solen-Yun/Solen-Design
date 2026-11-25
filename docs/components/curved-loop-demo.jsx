import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as CurvedLoop } from "../../src/components/curved-loop/CurvedLoop.jsx";

/* The demo plus a live customize panel — every control is a real option.
   The jacket owns min-height:100vh, so the demo clips it into a 240px band
   the same way a host page would. */

const DEFAULTS = {
  shape: "arc",
  speed: 2,
  curveAmount: 400,
  fontSize: 72,
  edgeFade: 0,
  direction: "left",
  outline: false,
  pauseOnHover: false,
  interactive: true,
};

const SHAPES = [
  { id: "arc", label: "弧线" },
  { id: "wave", label: "波浪" },
  { id: "circle", label: "圆环" },
  { id: "ellipse", label: "椭圆" },
  { id: "line", label: "直线" },
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
          <div
            style={{
              width: "100%",
              height: opts.shape === "circle" || opts.shape === "ellipse" ? 430 : 240,
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <CurvedLoop
              marqueeText="Be ✦ Creative ✦ With ✦ Solen ✦ Design ✦"
              shape={opts.shape}
              speed={opts.speed}
              curveAmount={opts.curveAmount}
              direction={opts.direction}
              fontSize={opts.fontSize}
              fontWeight={700}
              letterSpacing={0}
              separator=""
              outline={opts.outline}
              scrollBoost={2}
              edgeFade={opts.edgeFade}
              interactive={opts.interactive}
              pauseOnHover={opts.pauseOnHover}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./curved-loop-preview.html">
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
          <Slider label="速度" value={opts.speed} min={0} max={8} step={0.1} format={(v) => v.toFixed(1)} onChange={(speed) => set({ speed })} />
          <Slider label="弯曲" value={opts.curveAmount} min={-600} max={600} step={10} format={(v) => String(v)} onChange={(curveAmount) => set({ curveAmount })} />
          <Slider label="字号" value={opts.fontSize} min={32} max={120} step={4} format={(v) => `${v}px`} onChange={(fontSize) => set({ fontSize })} />
          <Slider label="两侧渐隐" value={opts.edgeFade} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(edgeFade) => set({ edgeFade })} />
          <ControlRow label="向右行进">
            <Switch checked={opts.direction === "right"} onChange={(right) => set({ direction: right ? "right" : "left" })} label="向右行进" />
          </ControlRow>
          <ControlRow label="描边空心">
            <Switch checked={opts.outline} onChange={(outline) => set({ outline })} label="描边空心" />
          </ControlRow>
          <ControlRow label="悬停暂停">
            <Switch checked={opts.pauseOnHover} onChange={(pauseOnHover) => set({ pauseOnHover })} label="悬停暂停" />
          </ControlRow>
          <ControlRow label="可拖拽">
            <Switch checked={opts.interactive} onChange={(interactive) => set({ interactive })} label="可拖拽" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — a quiet arc loop, dragging off so the card click stays a
   click. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div
        style={{
          width: "100%",
          height: 150,
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          background: "#ffffff",
          colorScheme: "light",
        }}
      >
        <CurvedLoop
          marqueeText="Be ✦ Creative ✦ With ✦ Solen ✦ Design ✦"
          shape="arc"
          speed={1.2}
          fontSize={64}
          interactive={false}
        />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
