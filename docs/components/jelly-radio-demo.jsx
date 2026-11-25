import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as JellyRadio } from "../../src/components/jelly-radio/JellyRadio.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Rapid re-picks interrupt the springs mid-flight, which is the fun part. */

const ITEMS = ["Off", "Low", "Medium", "High", "Max"];

const DEFAULTS = {
  size: "md",
  disabled: false,
  gap: 8,
  radius: 18,
  swell: 0.2,
  barge: 6,
  shrink: 0.05,
  jelly: 1,
  bounce: 0.25,
  stagger: 22,
  stiffness: 580,
  chipColor: "#27272a",
  activeColor: "#f5f5f5",
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
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 180 }}>
            <JellyRadio
              items={ITEMS}
              size={opts.size}
              disabled={opts.disabled}
              gap={opts.gap}
              radius={opts.radius}
              swell={opts.swell}
              barge={opts.barge}
              shrink={opts.shrink}
              jelly={opts.jelly}
              bounce={opts.bounce}
              stagger={opts.stagger}
              stiffness={opts.stiffness}
              chipColor={opts.chipColor}
              activeColor={opts.activeColor}
              onChange={(value, index) => console.log(value, index)}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./jelly-radio-preview.html">
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
          <Slider label="膨胀" value={opts.swell} min={0} max={0.45} step={0.05} format={(v) => `+${v.toFixed(2)}`} onChange={(swell) => set({ swell })} />
          <Slider label="推挤" value={opts.barge} min={0} max={20} step={1} format={(v) => `${v}px`} onChange={(barge) => set({ barge })} />
          <Slider label="收缩" value={opts.shrink} min={0} max={0.2} step={0.01} format={(v) => `−${v.toFixed(2)}`} onChange={(shrink) => set({ shrink })} />
          <Slider label="果冻感" value={opts.jelly} min={0} max={3} step={0.1} format={(v) => `×${v.toFixed(1)}`} onChange={(jelly) => set({ jelly })} />
          <Slider label="回弹" value={opts.bounce} min={0} max={0.7} step={0.05} format={(v) => v.toFixed(2)} onChange={(bounce) => set({ bounce })} />
          <Slider label="级联延迟" value={opts.stagger} min={0} max={60} step={2} format={(v) => `${v}ms`} onChange={(stagger) => set({ stagger })} />
          <Slider label="刚度" value={opts.stiffness} min={200} max={1200} step={20} format={(v) => String(v)} onChange={(stiffness) => set({ stiffness })} />
          <Slider label="间距" value={opts.gap} min={0} max={24} step={1} format={(v) => `${v}px`} onChange={(gap) => set({ gap })} />
          <Slider label="圆角" value={opts.radius} min={6} max={22} step={1} format={(v) => `${v}px`} onChange={(radius) => set({ radius })} />
          <Color label="芯片色" value={opts.chipColor} onChange={(chipColor) => set({ chipColor })} />
          <Color label="选中色" value={opts.activeColor} onChange={(activeColor) => set({ activeColor })} />
          <ControlRow label="禁用">
            <Switch checked={opts.disabled} onChange={(disabled) => set({ disabled })} label="禁用" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the chip row resting on a dark stage. */
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
        <JellyRadio items={ITEMS} defaultValue="Medium" />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
