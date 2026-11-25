import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as PillNav } from "../../src/components/pill-nav/PillNav.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Hover for the rising fill, click to move the gliding dot. */

const ITEMS = [
  { label: "Home", href: "#" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const DEFAULTS = {
  theme: "light",
  highlightColor: "#18181b",
  surface: "glass",
  itemStyle: "plain",
  hoverEffect: "fill",
  indicator: "dot",
  layout: "split",
  size: "md",
  bounce: 0.3,
  stretch: 0.5,
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

function Segmented({ label, value, options, onChange }) {
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
      <div className="demo-stage" style={{ background: opts.theme === "dark" ? "#101014" : "#eef0f4", colorScheme: opts.theme }}>
        <DemoFit>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 200 }}>
            <PillNav
              logo={<span style={{ fontSize: "0.9em", fontWeight: 700 }}>◐</span>}
              items={ITEMS}
              theme={opts.theme}
              highlightColor={opts.highlightColor}
              surface={opts.surface}
              itemStyle={opts.itemStyle}
              hoverEffect={opts.hoverEffect}
              indicator={opts.indicator}
              layout={opts.layout}
              size={opts.size}
              bounce={opts.bounce}
              stretch={opts.stretch}
              intro={false}
              onItemClick={(item, index) => console.log(index, item.label)}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./pill-nav-preview.html">
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
          <Segmented label="主题" value={opts.theme} options={[["light", "浅色"], ["dark", "深色"]]} onChange={(theme) => set({ theme })} />
          <Color label="高亮色" value={opts.highlightColor} onChange={(highlightColor) => set({ highlightColor })} />
          <Segmented label="表面" value={opts.surface} options={[["glass", "毛玻璃"], ["solid", "实色"], ["none", "无"]]} onChange={(surface) => set({ surface })} />
          <Segmented label="条目样式" value={opts.itemStyle} options={[["plain", "裸"], ["pill", "瓷砖"]]} onChange={(itemStyle) => set({ itemStyle })} />
          <Segmented label="悬停效果" value={opts.hoverEffect} options={[["fill", "填充"], ["glide", "滑行"], ["none", "无"]]} onChange={(hoverEffect) => set({ hoverEffect })} />
          <Segmented label="指示器" value={opts.indicator} options={[["dot", "圆点"], ["pill", "胶囊"], ["none", "无"]]} onChange={(indicator) => set({ indicator })} />
          <Segmented label="布局" value={opts.layout} options={[["split", "分体"], ["joined", "一体"]]} onChange={(layout) => set({ layout })} />
          <Segmented label="尺寸" value={opts.size} options={[["sm", "小"], ["md", "中"], ["lg", "大"]]} onChange={(size) => set({ size })} />
          <Slider label="回弹" value={opts.bounce} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(bounce) => set({ bounce })} />
          <Slider label="拉伸" value={opts.stretch} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(stretch) => set({ stretch })} />
        </div>
      </div>
    </>
  );
}

/* Gallery card — the light bar resting on a dark stage. */
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
        <PillNav
          logo={<span style={{ fontSize: "0.9em", fontWeight: 700 }}>◐</span>}
          items={ITEMS}
          theme="light"
          intro={false}
        />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
