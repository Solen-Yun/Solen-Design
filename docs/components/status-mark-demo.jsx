import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as StatusMark } from "../../src/components/status-mark/StatusMark.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Advance the state machine to watch dots gather into an arc, spin, then
   settle into a check with the struck-through label. */

const DEFAULTS = {
  size: 20,
  strokeWidth: 2,
  dashes: 8,
  fontSize: 14,
  spinDuration: 1100,
  arcLength: 0.68,
  drawDuration: 240,
  fillOpacity: 0.06,
  strike: true,
  strikeDelay: 60,
  determinate: false,
  label: "Deploying site",
};

const FLOW = ["pending", "running", "done", "failed", "cancelled"];
const FLOW_LABEL = { pending: "待机", running: "进行中", done: "完成", failed: "失败", cancelled: "取消" };

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

function TextField({ label, value, onChange }) {
  return (
    <ControlRow label={label}>
      <input type="text" value={value} onChange={(event) => onChange(event.target.value)} aria-label={label} />
    </ControlRow>
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
  const [status, setStatus] = useState("running");
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => {
    setOpts(DEFAULTS);
    setStatus("running");
  };
  const step = () => {
    const i = FLOW.indexOf(status);
    setStatus(FLOW[(i + 1) % FLOW.length]);
  };

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, width: "100%", height: 220, color: "#f5f5f5" }}>
            <StatusMark
              status={status}
              progress={opts.determinate ? 0.62 : undefined}
              label={opts.label}
              size={opts.size}
              strokeWidth={opts.strokeWidth}
              dashes={opts.dashes}
              fontSize={opts.fontSize}
              spinDuration={opts.spinDuration}
              arcLength={opts.arcLength}
              drawDuration={opts.drawDuration}
              fillOpacity={opts.fillOpacity}
              strike={opts.strike}
              strikeDelay={opts.strikeDelay}
            />
            <div className="view-tabs">
              {FLOW.map((s) => (
                <button key={s} type="button" className={status === s ? "active" : ""} onClick={() => setStatus(s)}>
                  {FLOW_LABEL[s]}
                </button>
              ))}
            </div>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./status-mark-preview.html">
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
          <TextField label="文案" value={opts.label} onChange={(label) => set({ label })} />
          <ControlRow label="确定进度">
            <Switch checked={opts.determinate} onChange={(determinate) => set({ determinate })} label="确定进度" />
          </ControlRow>
          <Slider label="图形边长" value={opts.size} min={16} max={32} step={1} format={(v) => `${v}px`} onChange={(size) => set({ size })} />
          <Slider label="描边宽度" value={opts.strokeWidth} min={1.5} max={3} step={0.5} format={(v) => v.toFixed(1)} onChange={(strokeWidth) => set({ strokeWidth })} />
          <Slider label="刻点数" value={opts.dashes} min={4} max={16} step={1} format={(v) => String(v)} onChange={(dashes) => set({ dashes })} />
          <Slider label="字号" value={opts.fontSize} min={12} max={18} step={1} format={(v) => `${v}px`} onChange={(fontSize) => set({ fontSize })} />
          <Slider label="旋转时长" value={opts.spinDuration} min={400} max={2400} step={100} format={(v) => `${v}ms`} onChange={(spinDuration) => set({ spinDuration })} />
          <Slider label="弧长" value={opts.arcLength} min={0.2} max={0.95} step={0.05} format={(v) => v.toFixed(2)} onChange={(arcLength) => set({ arcLength })} />
          <Slider label="描画时长" value={opts.drawDuration} min={80} max={600} step={20} format={(v) => `${v}ms`} onChange={(drawDuration) => set({ drawDuration })} />
          <Slider label="填充透明度" value={opts.fillOpacity} min={0} max={0.3} step={0.02} format={(v) => v.toFixed(2)} onChange={(fillOpacity) => set({ fillOpacity })} />
          <Slider label="删除线延迟" value={opts.strikeDelay} min={0} max={400} step={20} format={(v) => `${v}ms`} onChange={(strikeDelay) => set({ strikeDelay })} />
          <ControlRow label="删除线">
            <Switch checked={opts.strike} onChange={(strike) => set({ strike })} label="删除线" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — one glyph mid-flight on the dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ display: "grid", placeItems: "center", width: "100%", height: 170, background: "#101014", color: "#f5f5f5" }}>
        <StatusMark status="running" progress={0.6} label="Deploying site" size={22} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
