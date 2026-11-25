import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as DodgeField } from "../../src/components/dodge-field/DodgeField.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Chase the pill past the inner ring to count dodges; after `patience`
   escapes it relents, and a click catches it in inverted colours. */

const DEFAULTS = {
  inkColor: "#f5f5f5",
  reach: 72,
  radius: 120,
  falloff: 2,
  fleeDuration: 130,
  returnDuration: 620,
  returnBounce: 0.1,
  axis: "both",
  wall: "clamp",
  patience: 4,
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
          <div style={{ width: "100%", maxWidth: 720, padding: "0 16px" }}>
            <DodgeField
              fieldHeight={260}
              inkColor={opts.inkColor}
              reach={opts.reach}
              radius={opts.radius}
              falloff={opts.falloff}
              fleeDuration={opts.fleeDuration}
              returnDuration={opts.returnDuration}
              returnBounce={opts.returnBounce}
              axis={opts.axis}
              wall={opts.wall}
              patience={opts.patience}
              disabled={opts.disabled}
              notice="触屏设备上按住胶囊试试"
              onDodge={(n) => console.log("dodge", n)}
              onRelent={() => console.log("relented")}
              onCatch={() => console.log("caught")}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./dodge-field-preview.html">
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
          <Color label="墨色" value={opts.inkColor} onChange={(inkColor) => set({ inkColor })} />
          <Slider label="压退距离" value={opts.reach} min={0} max={160} step={4} format={(v) => `${v}px`} onChange={(reach) => set({ reach })} />
          <Slider label="唤醒半径" value={opts.radius} min={60} max={240} step={10} format={(v) => `${v}px`} onChange={(radius) => set({ radius })} />
          <Slider label="力衰减" value={opts.falloff} min={0.5} max={4} step={0.1} format={(v) => v.toFixed(1)} onChange={(falloff) => set({ falloff })} />
          <Slider label="逃开时长" value={opts.fleeDuration} min={60} max={300} step={10} format={(v) => `${v}ms`} onChange={(fleeDuration) => set({ fleeDuration })} />
          <Slider label="回家时长" value={opts.returnDuration} min={200} max={1200} step={20} format={(v) => `${v}ms`} onChange={(returnDuration) => set({ returnDuration })} />
          <Slider label="回家回弹" value={opts.returnBounce} min={0} max={0.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(returnBounce) => set({ returnBounce })} />
          <Slider label="耐心次数" value={opts.patience} min={1} max={10} step={1} format={(v) => `${v} 次`} onChange={(patience) => set({ patience })} />
          <ControlRow label="逃跑轴">
            <div className="view-tabs">
              {[["both", "双轴"], ["x", "横向"], ["y", "纵向"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.axis === id ? "active" : ""} onClick={() => set({ axis: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="墙模式">
            <div className="view-tabs">
              {[["clamp", "钳制"], ["bounce", "反弹"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.wall === id ? "active" : ""} onClick={() => set({ wall: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="定住不动">
            <Switch checked={opts.disabled} onChange={(disabled) => set({ disabled })} label="定住不动" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the default pill resting on the dark stage. */
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
        <DodgeField fieldHeight={170} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
