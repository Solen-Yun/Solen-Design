import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as GlideSelect } from "../../src/components/glide-select/GlideSelect.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Press and scrub the menu: the highlight glides under your finger. */

const OPTIONS = [
  { value: "linear", label: "Linear", tag: "基线" },
  { value: "sigmoid", label: "Sigmoid" },
  { value: "softmax", label: "Softmax", tag: "推荐" },
  { value: "top-k", label: "Top-K" },
  { value: "beam", label: "Beam" },
];

const DEFAULTS = {
  value: "softmax",
  size: "md",
  placement: "bottom",
  align: "left",
  showTags: true,
  rememberPosition: true,
  disabled: false,
  radius: 10,
  menuWidth: 176,
  popDuration: 180,
  glideDuration: 220,
  accentColor: "#f5f5f5",
  surfaceColor: "#27272a",
  highlightColor: "#3f3f46",
  textColor: "#f5f5f5",
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
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", width: "100%", height: 280, padding: 40, boxSizing: "border-box" }}>
            <GlideSelect
              options={OPTIONS}
              value={opts.value}
              onChange={(value) => set({ value })}
              size={opts.size}
              placement={opts.placement}
              align={opts.align}
              showTags={opts.showTags}
              rememberPosition={opts.rememberPosition}
              disabled={opts.disabled}
              radius={opts.radius}
              menuWidth={opts.menuWidth}
              popDuration={opts.popDuration}
              glideDuration={opts.glideDuration}
              accentColor={opts.accentColor}
              surfaceColor={opts.surfaceColor}
              highlightColor={opts.highlightColor}
              textColor={opts.textColor}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./glide-select-preview.html">
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
          <ControlRow label="弹出侧">
            <div className="view-tabs">
              {[["bottom", "下方"], ["top", "上方"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.placement === id ? "active" : ""} onClick={() => set({ placement: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="对齐边">
            <div className="view-tabs">
              {[["left", "左"], ["right", "右"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.align === id ? "active" : ""} onClick={() => set({ align: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="菜单宽度" value={opts.menuWidth} min={120} max={260} step={4} format={(v) => `${v}px`} onChange={(menuWidth) => set({ menuWidth })} />
          <Slider label="圆角" value={opts.radius} min={4} max={18} step={1} format={(v) => `${v}px`} onChange={(radius) => set({ radius })} />
          <Slider label="弹入时长" value={opts.popDuration} min={80} max={360} step={10} format={(v) => `${v}ms`} onChange={(popDuration) => set({ popDuration })} />
          <Slider label="滑翔时长" value={opts.glideDuration} min={60} max={420} step={10} format={(v) => `${v}ms`} onChange={(glideDuration) => set({ glideDuration })} />
          <Color label="强调色" value={opts.accentColor} onChange={(accentColor) => set({ accentColor })} />
          <Color label="底色" value={opts.surfaceColor} onChange={(surfaceColor) => set({ surfaceColor })} />
          <Color label="高亮色" value={opts.highlightColor} onChange={(highlightColor) => set({ highlightColor })} />
          <Color label="墨色" value={opts.textColor} onChange={(textColor) => set({ textColor })} />
          <ControlRow label="显示 tag">
            <Switch checked={opts.showTags} onChange={(showTags) => set({ showTags })} label="显示 tag" />
          </ControlRow>
          <ControlRow label="记住高亮">
            <Switch checked={opts.rememberPosition} onChange={(rememberPosition) => set({ rememberPosition })} label="记住高亮" />
          </ControlRow>
          <ControlRow label="禁用">
            <Switch checked={opts.disabled} onChange={(disabled) => set({ disabled })} label="禁用" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the chip with its menu open on a dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          width: "100%",
          height: 170,
          padding: 40,
          boxSizing: "border-box",
          background: "#101014",
        }}
      >
        <GlideSelect options={OPTIONS} defaultValue="softmax" />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
