import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as PulseHeart } from "../../src/components/pulse-heart/PulseHeart.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Click fast to feel the swell ignore double-clicks, and push the count
   past 999 to see the whole formatted number swap. */

const DEFAULTS = {
  icon: "heart",
  likedColor: "#ff4d6d",
  idleColor: "#8b8b93",
  size: 40,
  dotSize: 0.3,
  overshoot: 1.7,
  beat: 3,
  duration: 560,
  idleOutline: true,
  showCount: true,
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
            <PulseHeart
              defaultLiked={false}
              count={928}
              icon={opts.icon}
              likedColor={opts.likedColor}
              idleColor={opts.idleColor}
              size={opts.size}
              dotSize={opts.dotSize}
              overshoot={opts.overshoot}
              beat={opts.beat}
              duration={opts.duration}
              idleOutline={opts.idleOutline}
              showCount={opts.showCount}
              onChange={(liked, count) => console.log(liked, count)}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./pulse-heart-preview.html">
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
              {[["heart", "心"], ["star", "星"], ["thumb", "赞"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.icon === id ? "active" : ""} onClick={() => set({ icon: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Color label="点赞色" value={opts.likedColor} onChange={(likedColor) => set({ likedColor })} />
          <Color label="未点赞色" value={opts.idleColor} onChange={(idleColor) => set({ idleColor })} />
          <Slider label="图标大小" value={opts.size} min={28} max={56} step={2} format={(v) => `${v}px`} onChange={(size) => set({ size })} />
          <Slider label="收缩深度" value={opts.dotSize} min={0.1} max={0.6} step={0.05} format={(v) => v.toFixed(2)} onChange={(dotSize) => set({ dotSize })} />
          <Slider label="回弹过冲" value={opts.overshoot} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(overshoot) => set({ overshoot })} />
          <Slider label="呼吸深度" value={opts.beat} min={0} max={8} step={0.5} format={(v) => `${v}%`} onChange={(beat) => set({ beat })} />
          <Slider label="动画时长" value={opts.duration} min={300} max={900} step={20} format={(v) => `${v}ms`} onChange={(duration) => set({ duration })} />
          <ControlRow label="描边图标">
            <Switch checked={opts.idleOutline} onChange={(idleOutline) => set({ idleOutline })} label="描边图标" />
          </ControlRow>
          <ControlRow label="显示计数">
            <Switch checked={opts.showCount} onChange={(showCount) => set({ showCount })} label="显示计数" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the liked pill resting on a dark stage. */
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
        <PulseHeart defaultLiked count={1024} icon="heart" />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
