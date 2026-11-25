import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as PeekRating } from "../../src/components/peek-rating/PeekRating.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Sweep across the row to feel the wave chase the pointer. */

const DEFAULTS = {
  shape: "star",
  count: 5,
  size: 28,
  activeColor: "#f5b400",
  idleColor: "#52525b",
  lift: 6,
  magnify: 1.15,
  riseDuration: 320,
  popScale: 1.3,
  showTip: true,
  allowClear: true,
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
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 180, color: "#f5f5f5" }}>
            <PeekRating
              defaultValue={3}
              shape={opts.shape}
              count={opts.count}
              size={opts.size}
              activeColor={opts.activeColor}
              idleColor={opts.idleColor}
              lift={opts.lift}
              magnify={opts.magnify}
              riseDuration={opts.riseDuration}
              popScale={opts.popScale}
              showTip={opts.showTip}
              allowClear={opts.allowClear}
              labels={["很糟", "一般", "还行", "不错", "超棒"]}
              onChange={(value) => console.log(value)}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./peek-rating-preview.html">
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
          <ControlRow label="图形">
            <div className="view-tabs">
              {[["star", "星"], ["heart", "心"], ["bolt", "电"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.shape === id ? "active" : ""} onClick={() => set({ shape: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Color label="点亮色" value={opts.activeColor} onChange={(activeColor) => set({ activeColor })} />
          <Color label="未点亮色" value={opts.idleColor} onChange={(idleColor) => set({ idleColor })} />
          <Slider label="图标数量" value={opts.count} min={3} max={10} step={1} format={(v) => String(v)} onChange={(count) => set({ count })} />
          <Slider label="图标大小" value={opts.size} min={20} max={48} step={2} format={(v) => `${v}px`} onChange={(size) => set({ size })} />
          <Slider label="升起距离" value={opts.lift} min={0} max={16} step={1} format={(v) => `${v}px`} onChange={(lift) => set({ lift })} />
          <Slider label="悬停放大" value={opts.magnify} min={1} max={1.4} step={0.05} format={(v) => v.toFixed(2)} onChange={(magnify) => set({ magnify })} />
          <Slider label="升落时长" value={opts.riseDuration} min={120} max={600} step={20} format={(v) => `${v}ms`} onChange={(riseDuration) => set({ riseDuration })} />
          <Slider label="弹跳幅度" value={opts.popScale} min={1} max={1.8} step={0.05} format={(v) => v.toFixed(2)} onChange={(popScale) => set({ popScale })} />
          <ControlRow label="气泡提示">
            <Switch checked={opts.showTip} onChange={(showTip) => set({ showTip })} label="气泡提示" />
          </ControlRow>
          <ControlRow label="允许清零">
            <Switch checked={opts.allowClear} onChange={(allowClear) => set({ allowClear })} label="允许清零" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the wave resting on a dark stage. */
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
          color: "#f5f5f5",
        }}
      >
        <PeekRating defaultValue={4} shape="star" size={30} activeColor="#f5b400" idleColor="#52525b" labels={["很糟", "一般", "还行", "不错", "超棒"]} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
