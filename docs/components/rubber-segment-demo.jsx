import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as RubberSegment } from "../../src/components/rubber-segment/RubberSegment.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Drag the thumb past the ends to feel the rubber band; flick to skip. */

const DEFAULTS = {
  size: "md",
  trackColor: "#27272a",
  thumbColor: "#fafafa",
  radius: 10,
  inset: 3,
  stretch: 100,
  squash: 3,
  speed: 1,
  glide: 75,
  draggable: true,
  equalSlots: true,
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
  const items = ["日", "周", "月", "年"];

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 180, color: "#f5f5f5" }}>
            <RubberSegment
              items={items}
              defaultValue="月"
              size={opts.size}
              trackColor={opts.trackColor}
              thumbColor={opts.thumbColor}
              radius={opts.radius}
              inset={opts.inset}
              stretch={opts.stretch}
              squash={opts.squash}
              speed={opts.speed}
              glide={opts.glide}
              draggable={opts.draggable}
              equalSlots={opts.equalSlots}
              onChange={(value) => console.log(value)}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./rubber-segment-preview.html">
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
          <ControlRow label="尺寸">
            <div className="view-tabs">
              {[["sm", "小"], ["md", "中"], ["lg", "大"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.size === id ? "active" : ""} onClick={() => set({ size: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Color label="轨道色" value={opts.trackColor} onChange={(trackColor) => set({ trackColor })} />
          <Color label="滑块色" value={opts.thumbColor} onChange={(thumbColor) => set({ thumbColor })} />
          <Slider label="圆角" value={opts.radius} min={0} max={20} step={1} format={(v) => `${v}px`} onChange={(radius) => set({ radius })} />
          <Slider label="内缩" value={opts.inset} min={2} max={8} step={1} format={(v) => `${v}px`} onChange={(inset) => set({ inset })} />
          <Slider label="拉伸" value={opts.stretch} min={0} max={160} step={10} format={(v) => `${v}%`} onChange={(stretch) => set({ stretch })} />
          <Slider label="压入过冲" value={opts.squash} min={0} max={12} step={1} format={(v) => `${v}px`} onChange={(squash) => set({ squash })} />
          <Slider label="速度" value={opts.speed} min={0.5} max={2.5} step={0.1} format={(v) => `×${v.toFixed(1)}`} onChange={(speed) => set({ speed })} />
          <Slider label="惯性滑行" value={opts.glide} min={0} max={100} step={5} format={(v) => String(v)} onChange={(glide) => set({ glide })} />
          <ControlRow label="可拖动">
            <Switch checked={opts.draggable} onChange={(draggable) => set({ draggable })} label="可拖动" />
          </ControlRow>
          <ControlRow label="等宽段位">
            <Switch checked={opts.equalSlots} onChange={(equalSlots) => set({ equalSlots })} label="等宽段位" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the rubber thumb resting on a dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: 170,
          background: "#101014",
        }}
      >
        <RubberSegment items={["日", "周", "月", "年"]} defaultValue="月" size="md" />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
