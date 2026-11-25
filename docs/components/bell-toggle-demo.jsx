import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as BellToggle } from "../../src/components/bell-toggle/BellToggle.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Press to ring; bump the count to re-ring while on. */

const DEFAULTS = {
  color: "#f5f5f5",
  background: "#27272a",
  onColor: "#18181b",
  onBackground: "#f5f5f5",
  size: "md",
  radius: 22,
  ringAmplitude: 17,
  ringPasses: 5,
  ringPivot: 16,
  crossfadeMs: 200,
  count: 3,
  badge: true,
  waves: true,
  clapper: false,
  disabled: false,
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
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 200 }}>
            <BellToggle
              color={opts.color}
              background={opts.background}
              onColor={opts.onColor}
              onBackground={opts.onBackground}
              size={opts.size}
              radius={opts.radius}
              ringAmplitude={opts.ringAmplitude}
              ringPasses={opts.ringPasses}
              ringPivot={opts.ringPivot}
              crossfadeMs={opts.crossfadeMs}
              count={opts.count}
              badge={opts.badge}
              waves={opts.waves}
              clapper={opts.clapper}
              disabled={opts.disabled}
              onChange={(on) => console.log(on)}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./bell-toggle-preview.html">
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
          <Color label="关闭底色" value={opts.background} onChange={(background) => set({ background })} />
          <Color label="打开底色" value={opts.onBackground} onChange={(onBackground) => set({ onBackground })} />
          <ControlRow label="尺寸">
            <div className="view-tabs">
              {[["sm", "小"], ["md", "中"], ["lg", "大"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.size === id ? "active" : ""} onClick={() => set({ size: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="圆角" value={opts.radius} min={6} max={26} step={1} format={(v) => `${v}px`} onChange={(radius) => set({ radius })} />
          <Slider label="摆动幅度" value={opts.ringAmplitude} min={4} max={40} step={1} format={(v) => `${v}°`} onChange={(ringAmplitude) => set({ ringAmplitude })} />
          <Slider label="摆动次数" value={opts.ringPasses} min={1} max={9} step={1} format={(v) => String(v)} onChange={(ringPasses) => set({ ringPasses })} />
          <Slider label="轴心高度" value={opts.ringPivot} min={0} max={50} step={1} format={(v) => `${v}%`} onChange={(ringPivot) => set({ ringPivot })} />
          <Slider label="切换淡入" value={opts.crossfadeMs} min={60} max={500} step={10} format={(v) => `${v}ms`} onChange={(crossfadeMs) => set({ crossfadeMs })} />
          <Slider label="徽标数字" value={opts.count} min={0} max={20} step={1} format={(v) => String(v)} onChange={(count) => set({ count })} />
          <ControlRow label="声波">
            <Switch checked={opts.waves} onChange={(waves) => set({ waves })} label="声波" />
          </ControlRow>
          <ControlRow label="铃舌模式">
            <Switch checked={opts.clapper} onChange={(clapper) => set({ clapper })} label="铃舌模式" />
          </ControlRow>
          <ControlRow label="徽标">
            <Switch checked={opts.badge} onChange={(badge) => set({ badge })} label="徽标" />
          </ControlRow>
          <ControlRow label="禁用">
            <Switch checked={opts.disabled} onChange={(disabled) => set({ disabled })} label="禁用" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the pill resting on a dark stage. */
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
        <BellToggle count={3} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
