import { useState } from "react";
import { DemoFit } from "../demo-fit";
import GridScan from "../../src/components/grid-scan/GridScan.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Webcam tracking is left off here; the room itself is the show. */

const DEFAULTS = {
  cells: 8,
  lineThickness: 1,
  lineStyle: "solid",
  depth: 3,
  depthFade: 0.6,
  parallax: 1,
  points: true,
  reflection: 0.35,
  shading: 0.7,
  scanDirection: "forward",
  scanDuration: 2.4,
  scanDelay: 1.6,
  scanWidth: 1,
  trail: 0.5,
  glow: 0.6,
  autoScan: true,
  interactive: true,
  clickEffect: "ping",
  lightMode: false,
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

function Tabs({ label, value, options, onChange }) {
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
      <div className="demo-stage" style={{ background: opts.lightMode ? "#f4f4f5" : "#08090c", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", height: 340 }}>
            <GridScan {...opts} />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./grid-scan-preview.html">
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
          <Tabs label="线样式" value={opts.lineStyle} options={[["solid", "实线"], ["dashed", "虚线"], ["dotted", "点阵"]]} onChange={(lineStyle) => set({ lineStyle })} />
          <Tabs
            label="扫描方向"
            value={opts.scanDirection}
            options={[["forward", "向里"], ["backward", "向外"], ["pingpong", "往返"]]}
            onChange={(scanDirection) => set({ scanDirection })}
          />
          <Tabs label="点击效果" value={opts.clickEffect} options={[["ping", "声呐环"], ["scan", "立即扫描"], ["none", "无"]]} onChange={(clickEffect) => set({ clickEffect })} />
          <Slider label="格子数" value={opts.cells} min={2} max={40} step={1} format={(v) => String(v)} onChange={(cells) => set({ cells })} />
          <Slider label="线宽" value={opts.lineThickness} min={0.5} max={4} step={0.1} format={(v) => `${v.toFixed(1)}×`} onChange={(lineThickness) => set({ lineThickness })} />
          <Slider label="进深" value={opts.depth} min={0.5} max={12} step={0.5} format={(v) => String(v)} onChange={(depth) => set({ depth })} />
          <Slider label="深处衰减" value={opts.depthFade} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(depthFade) => set({ depthFade })} />
          <Slider label="扫描时长" value={opts.scanDuration} min={0.5} max={8} step={0.1} format={(v) => `${v.toFixed(1)}s`} onChange={(scanDuration) => set({ scanDuration })} />
          <Slider label="扫描间隔" value={opts.scanDelay} min={0} max={10} step={0.2} format={(v) => `${v.toFixed(1)}s`} onChange={(scanDelay) => set({ scanDelay })} />
          <Slider label="拖尾" value={opts.trail} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(trail) => set({ trail })} />
          <Slider label="泛光" value={opts.glow} min={0} max={1.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(glow) => set({ glow })} />
          <Slider label="反射" value={opts.reflection} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(reflection) => set({ reflection })} />
          <Slider label="视差" value={opts.parallax} min={0} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(parallax) => set({ parallax })} />
          <ControlRow label="格子散点">
            <Switch checked={opts.points} onChange={(points) => set({ points })} label="格子散点" />
          </ControlRow>
          <ControlRow label="自动扫描">
            <Switch checked={opts.autoScan} onChange={(autoScan) => set({ autoScan })} label="自动扫描" />
          </ControlRow>
          <ControlRow label="白纸墨痕">
            <Switch checked={opts.lightMode} onChange={(lightMode) => set({ lightMode })} label="白纸墨痕" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the cyan scan mid-sweep through the dark room. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 170, background: "#08090c" }}>
        <GridScan depth={2.5} cells={10} scanDuration={3} autoScan={true} intro={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
