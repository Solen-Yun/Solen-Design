import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as SloshGauge } from "../../src/components/slosh-gauge/SloshGauge.jsx";

/* The demo plus a live customize panel — every control is a real option.
   A quick drag to the ceiling shows the splash bounce; viscosity 0 snaps. */

const DEFAULTS = {
  value: 60,
  interactive: true,
  showValue: true,
  disabled: false,
  liquidColor: "#f5f5f5",
  glassColor: "#27272a",
  width: 88,
  height: 180,
  radius: 20,
  ticks: 4,
  viscosity: 0.15,
  tilt: 0.45,
  splash: 0.42,
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
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark", color: "#f5f5f5" }}>
        <DemoFit>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 40, width: "100%", height: 240, color: "#f5f5f5" }}>
            <SloshGauge
              value={opts.value}
              onChange={(value) => set({ value })}
              interactive={opts.interactive}
              showValue={opts.showValue}
              disabled={opts.disabled}
              liquidColor={opts.liquidColor}
              glassColor={opts.glassColor}
              width={opts.width}
              height={opts.height}
              radius={opts.radius}
              ticks={opts.ticks}
              viscosity={opts.viscosity}
              tilt={opts.tilt}
              splash={opts.splash}
            />
            <SloshGauge
              defaultValue={34}
              showValue={opts.showValue}
              liquidColor={opts.liquidColor}
              glassColor={opts.glassColor}
              width={Math.round(opts.width * 0.8)}
              height={opts.height}
              radius={opts.radius}
              ticks={opts.ticks}
              viscosity={0.6}
              tilt={opts.tilt}
              splash={opts.splash}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./slosh-gauge-preview.html">
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
          <Slider label="液位" value={opts.value} min={0} max={100} step={1} format={(v) => `${v}%`} onChange={(value) => set({ value })} />
          <Slider label="黏度" value={opts.viscosity} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(viscosity) => set({ viscosity })} />
          <Slider label="倾斜" value={opts.tilt} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(tilt) => set({ tilt })} />
          <Slider label="飞溅" value={opts.splash} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(splash) => set({ splash })} />
          <Slider label="罐宽" value={opts.width} min={48} max={140} step={2} format={(v) => `${v}px`} onChange={(width) => set({ width })} />
          <Slider label="罐高" value={opts.height} min={100} max={280} step={4} format={(v) => `${v}px`} onChange={(height) => set({ height })} />
          <Slider label="圆角" value={opts.radius} min={0} max={40} step={1} format={(v) => `${v}px`} onChange={(radius) => set({ radius })} />
          <Slider label="刻度数" value={opts.ticks} min={0} max={10} step={1} format={(v) => String(v)} onChange={(ticks) => set({ ticks })} />
          <Color label="液色" value={opts.liquidColor} onChange={(liquidColor) => set({ liquidColor })} />
          <ControlRow label="可拖拽">
            <Switch checked={opts.interactive} onChange={(interactive) => set({ interactive })} label="可拖拽" />
          </ControlRow>
          <ControlRow label="显示读数">
            <Switch checked={opts.showValue} onChange={(showValue) => set({ showValue })} label="显示读数" />
          </ControlRow>
          <ControlRow label="禁用">
            <Switch checked={opts.disabled} onChange={(disabled) => set({ disabled })} label="禁用" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — two tanks resting on the dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
          width: "100%",
          height: 200,
          background: "#101014",
          color: "#f5f5f5",
        }}
      >
        <SloshGauge defaultValue={72} height={160} />
        <SloshGauge defaultValue={30} height={160} liquidColor="#7dd3fc" viscosity={0.6} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
