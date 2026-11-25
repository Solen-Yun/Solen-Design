import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as ElasticSlider } from "../../src/components/elastic-slider/ElasticSlider.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Pull past either end to feel the rubber band, keep wheeling at a bound for the refusal bump. */

const DEFAULTS = {
  defaultValue: 50,
  startingValue: 0,
  maxValue: 100,
  isStepped: false,
  stepSize: 1,
  orientation: "horizontal",
  iconPlacement: "outside",
  valuePosition: "top",
  ticks: false,
  thumb: false,
  thickness: 6,
  activeThickness: 12,
  restOpacity: 0.7,
  maxStretch: 50,
  bounce: 0.5,
  jumpToClick: true,
  wheel: false,
  rangeColor: "#0a84ff",
  thumbColor: "#ffffff",
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
  const [current, setCurrent] = useState(50);

  return (
    <>
      <div className="demo-stage" style={{ background: "radial-gradient(circle at 50% 40%, #2e2b38 0%, #101014 75%)", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 300, color: "#e7e7ec" }}>
            <ElasticSlider
              {...opts}
              onChange={setCurrent}
              ticks={opts.ticks ? [0, 25, 50, 75, 100] : false}
            />
            <output style={{ marginLeft: 28, fontSize: 13, opacity: 0.7, whiteSpace: "nowrap" }}>{current}</output>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./elastic-slider-preview.html">
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
          <Tabs label="方向" options={[["horizontal", "横向"], ["vertical", "竖向"]]} value={opts.orientation} onChange={(orientation) => set({ orientation })} />
          <Tabs label="数值位置" options={[["top", "上方"], ["bubble", "气泡"], ["inside", "填充内"], ["none", "隐藏"]]} value={opts.valuePosition} onChange={(valuePosition) => set({ valuePosition })} />
          <Tabs label="图标位置" options={[["outside", "外侧"], ["inside", "轨道内"]]} value={opts.iconPlacement} onChange={(iconPlacement) => set({ iconPlacement })} />
          <Slider label="起始值" value={opts.startingValue} min={0} max={40} step={5} format={(v) => String(v)} onChange={(startingValue) => set({ startingValue })} />
          <Slider label="最大值" value={opts.maxValue} min={60} max={200} step={10} format={(v) => String(v)} onChange={(maxValue) => set({ maxValue })} />
          <Slider label="静止粗细" value={opts.thickness} min={2} max={16} step={1} format={(v) => `${v}px`} onChange={(thickness) => set({ thickness })} />
          <Slider label="激活粗细" value={opts.activeThickness} min={6} max={24} step={1} format={(v) => `${v}px`} onChange={(activeThickness) => set({ activeThickness })} />
          <Slider label="拉伸上限" value={opts.maxStretch} min={0} max={90} step={2} format={(v) => `${v}px`} onChange={(maxStretch) => set({ maxStretch })} />
          <Slider label="回弹过冲" value={opts.bounce} min={0} max={0.95} step={0.05} format={(v) => v.toFixed(2)} onChange={(bounce) => set({ bounce })} />
          <Slider label="静止透明度" value={opts.restOpacity} min={0.3} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(restOpacity) => set({ restOpacity })} />
          <Color label="填充颜色" value={opts.rangeColor} onChange={(rangeColor) => set({ rangeColor })} />
          <Color label="把手颜色" value={opts.thumbColor} onChange={(thumbColor) => set({ thumbColor })} />
          <ControlRow label="步长模式">
            <Switch checked={opts.isStepped} onChange={(isStepped) => set({ isStepped })} label="步长模式" />
          </ControlRow>
          <Slider label="步长" value={opts.stepSize} min={1} max={25} step={1} format={(v) => String(v)} onChange={(stepSize) => set({ stepSize })} />
          <ControlRow label="刻度点">
            <Switch checked={opts.ticks} onChange={(ticks) => set({ ticks })} label="刻度点" />
          </ControlRow>
          <ControlRow label="显示把手">
            <Switch checked={opts.thumb} onChange={(thumb) => set({ thumb })} label="显示把手" />
          </ControlRow>
          <ControlRow label="点击跳转">
            <Switch checked={opts.jumpToClick} onChange={(jumpToClick) => set({ jumpToClick })} label="点击跳转" />
          </ControlRow>
          <ControlRow label="滚轮调节">
            <Switch checked={opts.wheel} onChange={(wheel) => set({ wheel })} label="滚轮调节" />
          </ControlRow>
          <ControlRow label="禁用">
            <Switch checked={opts.disabled} onChange={(disabled) => set({ disabled })} label="禁用" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — two sliders mid-stretch on a dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ display: "flex", flexDirection: "column", gap: 26, alignItems: "center", justifyContent: "center", width: "100%", height: 220, background: "#101014", color: "#e7e7ec" }}>
        <ElasticSlider defaultValue={72} rangeColor="#f5c453" ticks={true} />
        <ElasticSlider orientation="vertical" defaultValue={35} rangeColor="#7fc8c0" thumb={true} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
