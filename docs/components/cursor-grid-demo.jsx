import { useState } from "react";
import { DemoFit } from "../demo-fit";
import CursorGrid from "../../src/components/cursor-grid/CursorGrid.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Sweep the pointer to light cells, click to send a ring through the grid;
   the light-mode switch flips the stage backdrop too. */

const DEFAULTS = {
  cellSize: 60,
  gridStyle: "lines",
  falloff: "smooth",
  highlight: "area",
  radius: 140,
  spotlight: 0.6,
  cellRadius: 0,
  cellGap: 0,
  gridOpacity: 0.08,
  fillOpacity: 0.06,
  holdTime: 400,
  fadeDuration: 800,
  ambient: 0,
  clickPulse: true,
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

function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => setOpts(DEFAULTS);

  return (
    <>
      <div className="demo-stage" style={{ background: opts.lightMode ? "#f4f4f5" : "#101014", colorScheme: opts.lightMode ? "light" : "dark" }}>
        <DemoFit>
          <div style={{ width: "100%", height: 340 }}>
            <CursorGrid
              cellSize={opts.cellSize}
              gridStyle={opts.gridStyle}
              falloff={opts.falloff}
              highlight={opts.highlight}
              radius={opts.radius}
              spotlight={opts.spotlight}
              cellRadius={opts.cellRadius}
              cellGap={opts.cellGap}
              gridOpacity={opts.gridOpacity}
              fillOpacity={opts.fillOpacity}
              holdTime={opts.holdTime}
              fadeDuration={opts.fadeDuration}
              ambient={opts.ambient}
              clickPulse={opts.clickPulse}
              lightMode={opts.lightMode}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./cursor-grid-preview.html">
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
          <ControlRow label="浅色模式">
            <Switch checked={opts.lightMode} onChange={(lightMode) => set({ lightMode })} label="浅色模式" />
          </ControlRow>
          <ControlRow label="网格样式">
            <div className="view-tabs">
              {[["lines", "实线"], ["dashed", "虚线"], ["dots", "圆点"], ["crosses", "十字"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.gridStyle === id ? "active" : ""} onClick={() => set({ gridStyle: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="衰减曲线">
            <div className="view-tabs">
              {[["linear", "线性"], ["smooth", "平滑"], ["sharp", "锐利"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.falloff === id ? "active" : ""} onClick={() => set({ falloff: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="点亮范围">
            <div className="view-tabs">
              {[["area", "区域"], ["cell", "单格"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.highlight === id ? "active" : ""} onClick={() => set({ highlight: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="格子间距" value={opts.cellSize} min={20} max={120} step={2} format={(v) => `${v}px`} onChange={(cellSize) => set({ cellSize })} />
          <Slider label="点亮半径" value={opts.radius} min={40} max={320} step={10} format={(v) => `${v}px`} onChange={(radius) => set({ radius })} />
          <Slider label="聚光" value={opts.spotlight} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(spotlight) => set({ spotlight })} />
          <Slider label="瓦片圆角" value={opts.cellRadius} min={0} max={20} step={1} format={(v) => `${v}px`} onChange={(cellRadius) => set({ cellRadius })} />
          <Slider label="瓦片间隙" value={opts.cellGap} min={0} max={12} step={1} format={(v) => `${v}px`} onChange={(cellGap) => set({ cellGap })} />
          <Slider label="网格透明度" value={opts.gridOpacity} min={0} max={0.5} step={0.01} format={(v) => v.toFixed(2)} onChange={(gridOpacity) => set({ gridOpacity })} />
          <Slider label="填充透明度" value={opts.fillOpacity} min={0} max={0.4} step={0.01} format={(v) => v.toFixed(2)} onChange={(fillOpacity) => set({ fillOpacity })} />
          <Slider label="保持时长" value={opts.holdTime} min={0} max={1500} step={50} format={(v) => `${v}ms`} onChange={(holdTime) => set({ holdTime })} />
          <Slider label="淡出时长" value={opts.fadeDuration} min={100} max={2000} step={50} format={(v) => `${v}ms`} onChange={(fadeDuration) => set({ fadeDuration })} />
          <Slider label="环境闪烁" value={opts.ambient} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(ambient) => set({ ambient })} />
          <ControlRow label="点击光波">
            <Switch checked={opts.clickPulse} onChange={(clickPulse) => set({ clickPulse })} label="点击光波" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the default grid on a dark stage, headline layered above. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 170, background: "#101014" }}>
        <CursorGrid cellSize={48}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", color: "#e4e4e7", fontSize: 15, letterSpacing: "0.08em" }}>
            光标点亮网格
          </div>
        </CursorGrid>
      </div>
    </div>
  );
}

export { Demo, CardPreview };
