import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as GooeyNav } from "../../src/components/gooey-nav/GooeyNav.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Rapid multi-jump clicks retarget in-flight droplets, which is the best
   way to feel the mass system. */

const ITEMS = [
  { label: "首页", href: "#" },
  { label: "组件", href: "#" },
  { label: "风格", href: "#" },
  { label: "文档", href: "#" },
];

const DEFAULTS = {
  theme: "light",
  color: "#27272a",
  size: "md",
  frame: true,
  particleCount: 15,
  spread: 56,
  animationTime: 600,
  timeVariance: 300,
  gooeyness: 0.5,
  wobble: 0.5,
  hoverEffect: true,
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
      <div className="demo-stage" style={{ background: "#ffffff", colorScheme: "light" }}>
        <DemoFit>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 220 }}>
            <GooeyNav
              items={ITEMS}
              initialActiveIndex={0}
              theme={opts.theme}
              color={opts.color}
              size={opts.size}
              frame={opts.frame}
              particleCount={opts.particleCount}
              spread={opts.spread}
              animationTime={opts.animationTime}
              timeVariance={opts.timeVariance}
              gooeyness={opts.gooeyness}
              wobble={opts.wobble}
              hoverEffect={opts.hoverEffect}
              onChange={(index, item) => console.log(index, item.label)}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./gooey-nav-preview.html">
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
          <Color label="胶囊色" value={opts.color} onChange={(color) => set({ color })} />
          <ControlRow label="深色主题">
            <Switch checked={opts.theme === "dark"} onChange={(dark) => set({ theme: dark ? "dark" : "light" })} label="深色主题" />
          </ControlRow>
          <ControlRow label="尺寸">
            <div className="view-tabs">
              {[["sm", "小"], ["md", "中"], ["lg", "大"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.size === id ? "active" : ""} onClick={() => set({ size: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="液滴数" value={opts.particleCount} min={1} max={32} step={1} format={(v) => String(v)} onChange={(particleCount) => set({ particleCount })} />
          <Slider label="飞行时长" value={opts.animationTime} min={200} max={1500} step={50} format={(v) => `${v}ms`} onChange={(animationTime) => set({ animationTime })} />
          <Slider label="散布" value={opts.spread} min={0} max={120} step={2} format={(v) => `${v}px`} onChange={(spread) => set({ spread })} />
          <Slider label="时长随机" value={opts.timeVariance} min={0} max={600} step={10} format={(v) => `${v}ms`} onChange={(timeVariance) => set({ timeVariance })} />
          <Slider label="融合" value={opts.gooeyness} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(gooeyness) => set({ gooeyness })} />
          <Slider label="回弹" value={opts.wobble} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(wobble) => set({ wobble })} />
          <ControlRow label="毛玻璃外框">
            <Switch checked={opts.frame} onChange={(frame) => set({ frame })} label="毛玻璃外框" />
          </ControlRow>
          <ControlRow label="悬停高亮">
            <Switch checked={opts.hoverEffect} onChange={(hoverEffect) => set({ hoverEffect })} label="悬停高亮" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the dark-framed bar resting on a dark stage. */
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
        <GooeyNav items={ITEMS} initialActiveIndex={0} theme="dark" frame={true} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
