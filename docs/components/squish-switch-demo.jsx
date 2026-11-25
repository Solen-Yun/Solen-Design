import { useEffect, useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as SquishSwitch } from "../../src/components/squish-switch/SquishSwitch.jsx";

/* This switch carries the library's only runtime dependency (`motion`);
   everything else it does is the component itself. Thumb colours default
   to automatic mixes; the switch below releases them to two pickers. */
const DEFAULTS = {
  label: "Airplane mode",
  disabled: false,
  width: 76,
  height: 38,
  radius: 19,
  speed: 50,
  stretch: 36,
  hoverScale: 1.035,
  colorDuration: 320,
};

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

function Color({ label, value, onChange }) {
  return (
    <ControlRow label={label}>
      <input type="color" value={value} onChange={(event) => onChange(event.target.value)} aria-label={label} />
    </ControlRow>
  );
}

function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const [checked, setChecked] = useState(false);
  const [picked, setPicked] = useState({});
  const themeTrack = "#cdcdcd";
  const themeTrackOn = "#4d7fa8";
  const themeThumb = "#ffffff";
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => {
    setOpts(DEFAULTS);
    setChecked(false);
    setPicked({});
  };
  /* Fixed light-stage colours: the frame pins light mode, so both switch
     states keep the same look regardless of the workbench theme. Picking
     a colour only overrides that one prop until Reset. */
  const colors = {
    trackColor: picked.trackColor ?? themeTrack,
    trackOnColor: picked.trackOnColor ?? themeTrackOn,
    thumbColor: picked.thumbColor ?? themeThumb,
    thumbOnColor: picked.thumbOnColor ?? themeThumb,
  };

  return (
    <>
      <div className="demo-stage" style={{ background: "#ffffff", colorScheme: "light" }}>
        <DemoFit>

          <div style={{ minHeight: 200, display: "grid", placeItems: "center" }}>
            <SquishSwitch
              checked={checked}
              onChange={setChecked}
              {...opts}
              trackColor={colors.trackColor}
              trackOnColor={colors.trackOnColor}
              thumbColor={colors.thumbColor}
              thumbOnColor={colors.thumbOnColor}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./squish-switch-preview.html">
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
          <TextField label="标签" value={opts.label} onChange={(label) => set({ label })} />
          <ControlRow label="选中状态">
            <Switch checked={checked} onChange={setChecked} label="选中状态" />
          </ControlRow>
          <ControlRow label="禁用">
            <Switch checked={opts.disabled} onChange={(disabled) => set({ disabled })} label="禁用" />
          </ControlRow>
          <Color label="关态轨道色" value={colors.trackColor} onChange={(trackColor) => setPicked((prev) => ({ ...prev, trackColor }))} />
          <Color label="开态轨道色" value={colors.trackOnColor} onChange={(trackOnColor) => setPicked((prev) => ({ ...prev, trackOnColor }))} />
          <Color label="滑块关态色" value={colors.thumbColor} onChange={(thumbColor) => setPicked((prev) => ({ ...prev, thumbColor }))} />
          <Color label="滑块开态色" value={colors.thumbOnColor} onChange={(thumbOnColor) => setPicked((prev) => ({ ...prev, thumbOnColor }))} />
          <Slider label="宽度" value={opts.width} min={48} max={120} step={2} format={(v) => `${v}px`} onChange={(width) => set({ width })} />
          <Slider label="高度" value={opts.height} min={24} max={64} step={2} format={(v) => `${v}px`} onChange={(height) => set({ height })} />
          <Slider label="圆角" value={opts.radius} min={0} max={40} step={1} format={(v) => `${v}px`} onChange={(radius) => set({ radius })} />
          <Slider label="落定弹度" value={opts.speed} min={0} max={100} step={1} format={(v) => String(v)} onChange={(speed) => set({ speed })} />
          <Slider label="拉伸量" value={opts.stretch} min={0} max={100} step={1} format={(v) => String(v)} onChange={(stretch) => set({ stretch })} />
          <Slider label="悬停胀大" value={opts.hoverScale} min={1} max={1.2} step={0.005} format={(v) => v.toFixed(3)} onChange={(hoverScale) => set({ hoverScale })} />
          <Slider label="换色时长" value={opts.colorDuration} min={0} max={800} step={10} format={(v) => `${v}ms`} onChange={(colorDuration) => set({ colorDuration })} />
        </div>
      </div>
    </>
  );
}

/* Gallery card — theme-following colors keep both states visible. */
function CardPreview() {
  const [on, setOn] = useState(false);
  return (
    <div className="comp-zoom">
      <div style={{ display: "grid", placeItems: "center", padding: "16px 0" }}>
        <SquishSwitch
          checked={on}
          onChange={setOn}
          label="Airplane mode"
          trackColor="var(--sd-border-strong)"
          trackOnColor="var(--sd-accent)"
          thumbColor="var(--sd-surface)"
          thumbOnColor="var(--sd-surface)"
        />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
