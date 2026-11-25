import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as CodeSlots } from "../../src/components/code-slots/CodeSlots.jsx";

/* The demo plus a live customize panel — every control is a real option.
   The code is controlled, so every keystroke lands as an animated diff. */

const DEFAULTS = {
  value: "482913",
  length: 6,
  status: "idle",
  mask: false,
  caret: true,
  disabled: false,
  slotSize: 44,
  gap: 8,
  radius: 12,
  bounce: 0.2,
  settle: 0.3,
  cascade: 20,
  accentColor: "#f5f5f5",
  slotColor: "#27272a",
  dangerColor: "#ff3b30",
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
            <CodeSlots
              value={opts.value}
              length={opts.length}
              status={opts.status}
              mask={opts.mask}
              caret={opts.caret}
              disabled={opts.disabled}
              slotSize={opts.slotSize}
              gap={opts.gap}
              radius={opts.radius}
              bounce={opts.bounce}
              settle={opts.settle}
              cascade={opts.cascade}
              accentColor={opts.accentColor}
              slotColor={opts.slotColor}
              dangerColor={opts.dangerColor}
              onChange={(code) => set({ value: code })}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./code-slots-preview.html">
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
              {[["idle", "输入中"], ["success", "成功"], ["error", "报错"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.status === id ? "active" : ""} onClick={() => set({ status: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="位数" value={opts.length} min={4} max={8} step={1} format={(v) => String(v)} onChange={(length) => set({ length })} />
          <Slider label="槽宽" value={opts.slotSize} min={34} max={60} step={2} format={(v) => `${v}px`} onChange={(slotSize) => set({ slotSize })} />
          <Slider label="间距" value={opts.gap} min={4} max={20} step={1} format={(v) => `${v}px`} onChange={(gap) => set({ gap })} />
          <Slider label="圆角" value={opts.radius} min={4} max={22} step={1} format={(v) => `${v}px`} onChange={(radius) => set({ radius })} />
          <Slider label="回弹" value={opts.bounce} min={0} max={0.6} step={0.05} format={(v) => v.toFixed(2)} onChange={(bounce) => set({ bounce })} />
          <Slider label="弹簧时长" value={opts.settle} min={0.15} max={0.6} step={0.05} format={(v) => `${v.toFixed(2)}s`} onChange={(settle) => set({ settle })} />
          <Slider label="级联间隔" value={opts.cascade} min={0} max={60} step={5} format={(v) => `${v}ms`} onChange={(cascade) => set({ cascade })} />
          <Color label="强调色" value={opts.accentColor} onChange={(accentColor) => set({ accentColor })} />
          <Color label="槽位色" value={opts.slotColor} onChange={(slotColor) => set({ slotColor })} />
          <Color label="报错色" value={opts.dangerColor} onChange={(dangerColor) => set({ dangerColor })} />
          <ControlRow label="遮蔽数字">
            <Switch checked={opts.mask} onChange={(mask) => set({ mask })} label="遮蔽数字" />
          </ControlRow>
          <ControlRow label="显示光标">
            <Switch checked={opts.caret} onChange={(caret) => set({ caret })} label="显示光标" />
          </ControlRow>
          <ControlRow label="禁用">
            <Switch checked={opts.disabled} onChange={(disabled) => set({ disabled })} label="禁用" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — a half-typed code resting on a dark stage. */
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
        <CodeSlots defaultValue="48291" length={6} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
