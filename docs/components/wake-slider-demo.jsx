import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as WakeSlider } from "../../src/components/wake-slider/WakeSlider.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Flick the track fast to raise the wake; keyboard steps commit instantly. */

const DEFAULTS = {
  value: 50,
  min: 0,
  max: 100,
  step: 1,
  bars: 32,
  height: 56,
  restHeight: 12,
  gap: 4,
  fillColor: "#f5f5f5",
  trackColor: "#27272a",
  crestColor: "",
  sensitivity: 1,
  reach: 6,
  skew: 0.6,
  glide: 0.3,
  smoothing: 100,
  showValue: true,
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
          <div style={{ display: "flex", flexDirection: "column", gap: 28, width: "100%", maxWidth: 560, height: 200, justifyContent: "center", margin: "0 auto", color: "#f5f5f5", padding: "0 24px" }}>
            <WakeSlider
              value={opts.value}
              onChange={(value) => set({ value })}
              min={opts.min}
              max={opts.max}
              step={opts.step}
              bars={opts.bars}
              height={opts.height}
              restHeight={opts.restHeight}
              gap={opts.gap}
              fillColor={opts.fillColor}
              trackColor={opts.trackColor}
              crestColor={opts.crestColor}
              sensitivity={opts.sensitivity}
              reach={opts.reach}
              skew={opts.skew}
              glide={opts.glide}
              smoothing={opts.smoothing}
              showValue={opts.showValue}
              disabled={opts.disabled}
            />
            <WakeSlider
              defaultValue={22}
              bars={opts.bars}
              height={Math.max(44, Math.round(opts.height * 0.7))}
              restHeight={opts.restHeight}
              fillColor="#7dd3fc"
              crestColor="#38bdf8"
              sensitivity={opts.sensitivity}
              reach={opts.reach}
              skew={opts.skew}
              glide={opts.glide}
              smoothing={opts.smoothing}
              showValue={opts.showValue}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./wake-slider-preview.html">
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
          <Slider label="数值" value={opts.value} min={0} max={100} step={1} format={(v) => String(v)} onChange={(value) => set({ value })} />
          <Slider label="条数" value={opts.bars} min={12} max={64} step={2} format={(v) => String(v)} onChange={(bars) => set({ bars })} />
          <Slider label="轨道高" value={opts.height} min={32} max={96} step={2} format={(v) => `${v}px`} onChange={(height) => set({ height })} />
          <Slider label="静止高" value={opts.restHeight} min={4} max={40} step={1} format={(v) => `${v}px`} onChange={(restHeight) => set({ restHeight })} />
          <Slider label="灵敏度" value={opts.sensitivity} min={0.2} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(sensitivity) => set({ sensitivity })} />
          <Slider label="尾流半径" value={opts.reach} min={1.5} max={16} step={0.5} format={(v) => v.toFixed(1)} onChange={(reach) => set({ reach })} />
          <Slider label="不对称" value={opts.skew} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(skew) => set({ skew })} />
          <Slider label="滑顺度" value={opts.glide} min={0.1} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(glide) => set({ glide })} />
          <Slider label="速度平滑" value={opts.smoothing} min={20} max={400} step={10} format={(v) => String(v)} onChange={(smoothing) => set({ smoothing })} />
          <Color label="填充色" value={opts.fillColor} onChange={(fillColor) => set({ fillColor })} />
          <ControlRow label="数值读出">
            <Switch checked={opts.showValue} onChange={(showValue) => set({ showValue })} label="数值读出" />
          </ControlRow>
          <ControlRow label="禁用">
            <Switch checked={opts.disabled} onChange={(disabled) => set({ disabled })} label="禁用" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — one slider resting on the dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ display: "grid", placeItems: "center", width: "100%", height: 170, background: "#101014", color: "#f5f5f5", padding: "0 28px" }}>
        <WakeSlider defaultValue={64} showValue={true} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
