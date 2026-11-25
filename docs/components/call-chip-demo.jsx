import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as CallChip } from "../../src/components/call-chip/CallChip.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Retry by clicking the chip itself after a failure. */

const DEFAULTS = {
  status: "running",
  expectedMs: 2500,
  size: 34,
  shake: 6,
  showTimer: true,
  surfaceColor: "#27272a",
  doneColor: "#22c55e",
  errorColor: "#ef4444",
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
            <CallChip
              name="bash"
              argument="npm test"
              status={opts.status}
              expectedMs={opts.expectedMs}
              size={opts.size}
              shake={opts.shake}
              showTimer={opts.showTimer}
              surfaceColor={opts.surfaceColor}
              doneColor={opts.doneColor}
              errorColor={opts.errorColor}
              onRetry={() => set({ status: "running" })}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./call-chip-preview.html">
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
          <ControlRow label="状态">
            <div className="view-tabs">
              {[["idle", "排队"], ["running", "进行中"], ["done", "完成"], ["error", "失败"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.status === id ? "active" : ""} onClick={() => set({ status: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="预期时长" value={opts.expectedMs} min={500} max={8000} step={100} format={(v) => `${v}ms`} onChange={(expectedMs) => set({ expectedMs })} />
          <Slider label="高度" value={opts.size} min={26} max={52} step={1} format={(v) => `${v}px`} onChange={(size) => set({ size })} />
          <Slider label="抖动幅度" value={opts.shake} min={0} max={14} step={1} format={(v) => `${v}px`} onChange={(shake) => set({ shake })} />
          <Color label="底色" value={opts.surfaceColor} onChange={(surfaceColor) => set({ surfaceColor })} />
          <Color label="完成色" value={opts.doneColor} onChange={(doneColor) => set({ doneColor })} />
          <Color label="失败色" value={opts.errorColor} onChange={(errorColor) => set({ errorColor })} />
          <ControlRow label="显示计时">
            <Switch checked={opts.showTimer} onChange={(showTimer) => set({ showTimer })} label="显示计时" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — a finished call resting on a dark stage. */
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
        <CallChip name="bash" argument="npm test" status="done" />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
