import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as SpringCheck } from "../../src/components/spring-check/SpringCheck.jsx";

/* The demo plus a live customize panel — every control is a real option.
   One spring fills the box, draws the tick and strikes the label. */

const DEFAULTS = {
  label: "Ship the build",
  disabled: false,
  color: "#ffffff",
  fillColor: "#ffffff",
  checkColor: "#0b0b0f",
  boxSize: 28,
  boxRadius: 9,
  fontSize: 18,
  bounce: 0.2,
  strikeLag: 0.12,
  doneOpacity: 0.42,
  strike: "left",
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
  const [checked, setChecked] = useState(false);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => {
    setOpts(DEFAULTS);
    setChecked(false);
  };

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ display: "grid", placeItems: "center", width: "100%", height: 200, color: "#f5f5f5" }}>
            <SpringCheck
              label={opts.label}
              checked={checked}
              onChange={setChecked}
              disabled={opts.disabled}
              color={opts.color}
              fillColor={opts.fillColor}
              checkColor={opts.checkColor}
              boxSize={opts.boxSize}
              boxRadius={opts.boxRadius}
              fontSize={opts.fontSize}
              bounce={opts.bounce}
              strikeLag={opts.strikeLag}
              doneOpacity={opts.doneOpacity}
              strike={opts.strike}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./spring-check-preview.html">
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
          <ControlRow label="勾选状态">
            <Switch checked={checked} onChange={setChecked} label="勾选状态" />
          </ControlRow>
          <Slider label="过冲" value={opts.bounce} min={0} max={0.6} step={0.02} format={(v) => v.toFixed(2)} onChange={(bounce) => set({ bounce })} />
          <Slider label="删除线起点" value={opts.strikeLag} min={0} max={0.6} step={0.02} format={(v) => v.toFixed(2)} onChange={(strikeLag) => set({ strikeLag })} />
          <Slider label="勾后文案亮度" value={opts.doneOpacity} min={0.1} max={1} step={0.02} format={(v) => v.toFixed(2)} onChange={(doneOpacity) => set({ doneOpacity })} />
          <Slider label="方框边长" value={opts.boxSize} min={20} max={44} step={2} format={(v) => `${v}px`} onChange={(boxSize) => set({ boxSize })} />
          <Slider label="方框圆角" value={opts.boxRadius} min={0} max={22} step={1} format={(v) => `${v}px`} onChange={(boxRadius) => set({ boxRadius })} />
          <Slider label="字号" value={opts.fontSize} min={13} max={26} step={1} format={(v) => `${v}px`} onChange={(fontSize) => set({ fontSize })} />
          <Color label="墨色" value={opts.color} onChange={(color) => set({ color })} />
          <Color label="填充色" value={opts.fillColor} onChange={(fillColor) => set({ fillColor })} />
          <ControlRow label="删除线方向">
            <div className="view-tabs">
              {[["left", "左"], ["center", "中"], ["right", "右"], ["none", "无"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.strike === id ? "active" : ""} onClick={() => set({ strike: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="禁用">
            <Switch checked={opts.disabled} onChange={(disabled) => set({ disabled })} label="禁用" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the row resting on the dark stage. */
function CardPreview() {
  const [on, setOn] = useState(false);
  return (
    <div className="comp-zoom">
      <div style={{ display: "grid", placeItems: "center", width: "100%", height: 170, background: "#101014", color: "#f5f5f5" }}>
        <SpringCheck label="Ship the build" checked={on} onChange={setOn} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
