import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as LineSidebar } from "../../src/components/line-sidebar/LineSidebar.jsx";

/* This component is a plain React + CSS pair — no motion engine, no shadow
   root, and no framework variants. The demo runs on a dark stage with the
   colours the source defaults were designed for. */
const SHORT_ITEMS = ["Overview", "Components", "Animations", "Backgrounds", "Showcase"];

const FALLOFFS = ["linear", "smooth", "sharp"];

const DEFAULTS = {
  showIndex: true,
  showMarker: true,
  scaleTick: true,
  proximityRadius: 100,
  maxShift: 30,
  falloff: "smooth",
  markerLength: 60,
  markerGap: 0,
  tickScale: 0.5,
  itemGap: 20,
  fontSize: 1.1,
  smoothing: 100,
  defaultActive: 0,
};

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
  const [picked, setPicked] = useState({});
  const [shortList, setShortList] = useState(true);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => {
    setOpts(DEFAULTS);
    setPicked({});
  };
  const colors = {
    accentColor: picked.accentColor ?? "#a855f7",
    textColor: picked.textColor ?? "#c4c4c4",
    markerColor: picked.markerColor ?? "#6c6c6c",
  };
  const items = shortList ? SHORT_ITEMS : undefined;
  const maxActive = (items ?? []).length - 1;

  return (
    <>
      <div className="demo-stage" style={{ background: "#0b0b0f", colorScheme: "dark" }}>
        <DemoFit>

          {/* defaultActive only applies on mount, so changing it remounts
              the list through the key. */}
          <LineSidebar
            key={`${shortList}-${opts.defaultActive}`}
            items={items}
            {...colors}
            {...opts}
            defaultActive={Math.min(opts.defaultActive, maxActive)}
          />
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./line-sidebar-preview.html">
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
          <Color label="强调色" value={colors.accentColor} onChange={(accentColor) => setPicked((prev) => ({ ...prev, accentColor }))} />
          <Color label="文字颜色" value={colors.textColor} onChange={(textColor) => setPicked((prev) => ({ ...prev, textColor }))} />
          <Color label="标记线颜色" value={colors.markerColor} onChange={(markerColor) => setPicked((prev) => ({ ...prev, markerColor }))} />
          <Slider label="响应半径" value={opts.proximityRadius} min={20} max={300} step={5} format={(v) => `${v}px`} onChange={(proximityRadius) => set({ proximityRadius })} />
          <Slider label="最大右移" value={opts.maxShift} min={0} max={80} step={1} format={(v) => `${v}px`} onChange={(maxShift) => set({ maxShift })} />
          <Slider label="接近曲线" value={FALLOFFS.indexOf(opts.falloff)} min={0} max={2} step={1} format={(v) => ["线性", "平滑", "陡峭"][v]} onChange={(v) => set({ falloff: FALLOFFS[v] })} />
          <Slider label="标记线长度" value={opts.markerLength} min={0} max={140} step={2} format={(v) => `${v}px`} onChange={(markerLength) => set({ markerLength })} />
          <Slider label="标记线间距" value={opts.markerGap} min={0} max={40} step={1} format={(v) => `${v}px`} onChange={(markerGap) => set({ markerGap })} />
          <Slider label="刻度线比例" value={opts.tickScale} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(tickScale) => set({ tickScale })} />
          <Slider label="条目间距" value={opts.itemGap} min={4} max={60} step={1} format={(v) => `${v}px`} onChange={(itemGap) => set({ itemGap })} />
          <Slider label="字号" value={opts.fontSize} min={0.7} max={2} step={0.05} format={(v) => `${v.toFixed(2)}rem`} onChange={(fontSize) => set({ fontSize })} />
          <Slider label="平滑时长" value={opts.smoothing} min={0} max={500} step={10} format={(v) => `${v}ms`} onChange={(smoothing) => set({ smoothing })} />
          <Slider
            label="初始选中项"
            value={Math.min(opts.defaultActive, maxActive)}
            min={-1}
            max={maxActive}
            step={1}
            format={(v) => (v < 0 ? "无" : `第 ${v + 1} 项`)}
            onChange={(defaultActive) => set({ defaultActive })}
          />
          <ControlRow label="显示序号">
            <Switch checked={opts.showIndex} onChange={(showIndex) => set({ showIndex })} label="显示序号" />
          </ControlRow>
          <ControlRow label="显示标记线">
            <Switch checked={opts.showMarker} onChange={(showMarker) => set({ showMarker })} label="显示标记线" />
          </ControlRow>
          <ControlRow label="刻度线生长">
            <Switch checked={opts.scaleTick} onChange={(scaleTick) => set({ scaleTick })} label="刻度线生长" />
          </ControlRow>
          <ControlRow label="精简列表">
            <Switch checked={shortList} onChange={setShortList} label="精简列表" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the sidebar at its default sizing. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <LineSidebar
        items={SHORT_ITEMS}
        accentColor="var(--sd-accent)"
        textColor="var(--sd-ink)"
        markerColor="var(--sd-ink-muted)"
        defaultActive={0}
      />
    </div>
  );
}

export { Demo, CardPreview };
