import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as OptionWheel } from "../../src/components/option-wheel/OptionWheel.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Wheel-scroll one notch at a time, then grab and fling the list. */

const ITEMS = [
  "Ambient",
  "House",
  "Techno",
  "Jazz",
  "Lo-Fi",
  "Synthwave",
  "Trance",
  "Funk",
  "Disco",
  "Hip-Hop",
  "Chillwave",
  "Drum & Bass"
];

const DEFAULTS = {
  defaultSelected: 3,
  side: "left",
  fontSize: 3,
  spacing: 1.4,
  curve: 1,
  tilt: 6,
  blur: 2,
  fade: 0.25,
  minOpacity: 0.05,
  smoothing: 200,
  inset: 80,
  loop: false,
  draggable: true,
  textColor: "#a6a6a6",
  activeColor: "#ffffff",
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

function Tabs({ label, options, value, onChange }) {
  return (
    <ControlRow label={label}>
      <div className="view-tabs">
        {options.map(([id, name]) => (
          <button key={id} type="button" className={value === id ? "active" : ""} onClick={() => onChange(id)}>
            {name}
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
  const [current, setCurrent] = useState(ITEMS[DEFAULTS.defaultSelected]);

  return (
    <>
      <div className="demo-stage" style={{ background: "radial-gradient(circle at 30% 50%, #26232e 0%, #101014 75%)", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", height: 420, padding: "0 12%" }}>
            <OptionWheel
              items={ITEMS}
              defaultSelected={opts.defaultSelected}
              side={opts.side}
              fontSize={opts.fontSize}
              spacing={opts.spacing}
              curve={opts.curve}
              tilt={opts.tilt}
              blur={opts.blur}
              fade={opts.fade}
              minOpacity={opts.minOpacity}
              smoothing={opts.smoothing}
              inset={opts.inset}
              loop={opts.loop}
              draggable={opts.draggable}
              textColor={opts.textColor}
              activeColor={opts.activeColor}
              onChange={(_, item) => setCurrent(item)}
            />
            <output style={{ fontSize: 13, opacity: 0.7, whiteSpace: "nowrap" }}>当前：{current}</output>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./option-wheel-preview.html">
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
          <Tabs label="锚定侧" options={[["left", "左侧"], ["right", "右侧"]]} value={opts.side} onChange={(side) => set({ side })} />
          <Slider label="字号" value={opts.fontSize} min={1.2} max={5} step={0.1} format={(v) => `${v.toFixed(1)}rem`} onChange={(fontSize) => set({ fontSize })} />
          <Slider label="行距倍数" value={opts.spacing} min={0.8} max={2.4} step={0.05} format={(v) => v.toFixed(2)} onChange={(spacing) => set({ spacing })} />
          <Slider label="弧线深度" value={opts.curve} min={0} max={2.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(curve) => set({ curve })} />
          <Slider label="卷曲角度" value={opts.tilt} min={0} max={16} step={0.5} format={(v) => `${v}°`} onChange={(tilt) => set({ tilt })} />
          <Slider label="模糊" value={opts.blur} min={0} max={6} step={0.25} format={(v) => `${v}px`} onChange={(blur) => set({ blur })} />
          <Slider label="渐隐" value={opts.fade} min={0} max={0.6} step={0.01} format={(v) => v.toFixed(2)} onChange={(fade) => set({ fade })} />
          <Slider label="透明度下限" value={opts.minOpacity} min={0} max={0.3} step={0.01} format={(v) => v.toFixed(2)} onChange={(minOpacity) => set({ minOpacity })} />
          <Slider label="平滑时间" value={opts.smoothing} min={40} max={600} step={10} format={(v) => `${v}ms`} onChange={(smoothing) => set({ smoothing })} />
          <Slider label="边缘间距" value={opts.inset} min={0} max={200} step={4} format={(v) => `${v}px`} onChange={(inset) => set({ inset })} />
          <Color label="远项颜色" value={opts.textColor} onChange={(textColor) => set({ textColor })} />
          <Color label="居中颜色" value={opts.activeColor} onChange={(activeColor) => set({ activeColor })} />
          <ControlRow label="无限循环">
            <Switch checked={opts.loop} onChange={(loop) => set({ loop })} label="无限循环" />
          </ControlRow>
          <ControlRow label="可拖拽">
            <Switch checked={opts.draggable} onChange={(draggable) => set({ draggable })} label="可拖拽" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the wheel curving away on a dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 240, background: "radial-gradient(circle at 30% 50%, #26232e 0%, #101014 75%)", padding: "20px 10%" }}>
        <OptionWheel items={ITEMS} defaultSelected={5} tilt={8} fontSize={2.2} inset={20} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
