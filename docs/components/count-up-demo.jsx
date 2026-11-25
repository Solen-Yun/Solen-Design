import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as CountUp } from "../../src/components/count-up/CountUp.jsx";

/* The demo is a bare number on a quiet stage: dragging the target slider
   re-runs the count from the currently displayed value, which is the best
   way to feel the roll engine's per-column stagger and motion blur. */

const DEFAULTS = {
  from: 0,
  to: 4096,
  duration: 2,
  delay: 0,
  decimals: 0,
  mode: "count",
  easing: "easeOut",
  format: "standard",
  trigger: "view",
  separator: false,
  replayOnHover: false,
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

function Tabs({ label, options, value, onChange }) {
  return (
    <ControlRow label={label}>
      <div className="view-tabs">
        {options.map(([id, text]) => (
          <button key={id} type="button" className={value === id ? "active" : ""} onClick={() => onChange(id)}>
            {text}
          </button>
        ))}
      </div>
    </ControlRow>
  );
}

function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => setOpts(DEFAULTS);

  return (
    <>
      <div className="demo-stage" style={{ background: "#ffffff", colorScheme: "light" }}>
        <DemoFit>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "72px 0",
              color: "#18181b",
            }}
          >
            <CountUp
              key={`${opts.mode}-${opts.trigger}`}
              to={opts.to}
              from={opts.from}
              duration={opts.duration}
              delay={opts.delay}
              decimals={opts.decimals}
              mode={opts.mode}
              easing={opts.easing}
              format={opts.format}
              trigger={opts.trigger}
              separator={opts.separator ? "," : ""}
              replayOnHover={opts.replayOnHover}
              style={{ fontSize: 64, fontWeight: 700 }}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./count-up-preview.html">
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
          <Slider label="目标值" value={opts.to} min={0} max={9999} step={1} format={(v) => String(v)} onChange={(to) => set({ to })} />
          <Slider label="起始值" value={opts.from} min={0} max={9999} step={1} format={(v) => String(v)} onChange={(from) => set({ from })} />
          <Slider label="时长" value={opts.duration} min={0.2} max={5} step={0.1} format={(v) => `${v.toFixed(1)}s`} onChange={(duration) => set({ duration })} />
          <Slider label="延迟" value={opts.delay} min={0} max={3} step={0.1} format={(v) => `${v.toFixed(1)}s`} onChange={(delay) => set({ delay })} />
          <Slider label="小数位" value={opts.decimals} min={0} max={3} step={1} format={(v) => String(v)} onChange={(decimals) => set({ decimals })} />
          <Tabs label="模式" options={[["count", "计数"], ["roll", "滚轮"]]} value={opts.mode} onChange={(mode) => set({ mode })} />
          <Tabs
            label="缓动"
            options={[["linear", "线性"], ["easeOut", "缓出"], ["expo", "指数"], ["spring", "弹簧"]]}
            value={opts.easing}
            onChange={(easing) => set({ easing })}
          />
          <Tabs label="格式" options={[["standard", "完整"], ["compact", "缩写"]]} value={opts.format} onChange={(format) => set({ format })} />
          <Tabs label="触发" options={[["view", "入视口"], ["load", "加载"]]} value={opts.trigger} onChange={(trigger) => set({ trigger })} />
          <ControlRow label="千分位">
            <Switch checked={opts.separator} onChange={(separator) => set({ separator })} label="千分位" />
          </ControlRow>
          <ControlRow label="悬停重播">
            <Switch checked={opts.replayOnHover} onChange={(replayOnHover) => set({ replayOnHover })} label="悬停重播" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — a roll-mode number mid-run, spring easing for overshoot. */
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
          background: "#ffffff",
          colorScheme: "light",
          color: "#18181b",
        }}
      >
        <CountUp to={2048} from={0} mode="roll" easing="spring" duration={2.4} style={{ fontSize: 56, fontWeight: 700 }} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
