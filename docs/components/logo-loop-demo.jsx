import { useState } from "react";
import { DemoFit } from "../demo-fit";
import LogoLoop from "../../src/components/logo-loop/LogoLoop.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Logos are inline wordmarks; drag the strip and release to fling it. */

const BRANDS = [
  ["✦", "星澜", "#7dd3fc"],
  ["◐", "弦月", "#f0abfc"],
  ["⬢", "六角", "#86efac"],
  ["☀", "曜日", "#fcd34d"],
  ["❖", "方寸", "#fda4af"],
  ["≋", "波频", "#5eead4"],
  ["✺", "聚光", "#fdba74"],
];

const LOGOS = BRANDS.map(([glyph, name, color]) => ({
  node: (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3em", fontWeight: 700, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
      <span aria-hidden="true">{glyph}</span>
      {name}
    </span>
  ),
  title: name,
  hoverColor: color,
}));

const DEFAULTS = {
  speed: 120,
  direction: "left",
  layout: "line",
  bend: 0.5,
  focus: 0,
  magnify: 0,
  gap: 32,
  logoHeight: 28,
  muted: 0,
  labels: "none",
  step: false,
  draggable: true,
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
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 320, color: "#e4e4e7" }}>
            <LogoLoop
              logos={LOGOS}
              speed={opts.speed}
              direction={opts.direction}
              logoHeight={opts.logoHeight}
              gap={opts.gap}
              scaleOnHover={true}
              layout={opts.layout}
              bend={opts.bend}
              focus={opts.focus}
              magnify={opts.magnify}
              step={opts.step}
              muted={opts.muted}
              labels={opts.labels}
              draggable={opts.draggable}
              ariaLabel="示例标志跑马灯"
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./logo-loop-preview.html">
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
          <Slider label="速度" value={opts.speed} min={0} max={400} step={10} format={(v) => `${v}px/s`} onChange={(speed) => set({ speed })} />
          <ControlRow label="方向">
            <div className="view-tabs">
              {[["left", "向左"], ["right", "向右"], ["up", "向上"], ["down", "向下"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.direction === id ? "active" : ""} onClick={() => set({ direction: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="路径">
            <div className="view-tabs">
              {[["line", "直线"], ["wave", "波浪"], ["arc", "圆弧"], ["orbit", "环"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.layout === id ? "active" : ""} onClick={() => set({ layout: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="弯曲" value={opts.bend} min={-1} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(bend) => set({ bend })} />
          <Slider label="中心透镜" value={opts.focus} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(focus) => set({ focus })} />
          <Slider label="指针透镜" value={opts.magnify} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(magnify) => set({ magnify })} />
          <Slider label="间距" value={opts.gap} min={8} max={80} step={2} format={(v) => `${v}px`} onChange={(gap) => set({ gap })} />
          <Slider label="Logo 高度" value={opts.logoHeight} min={16} max={48} step={2} format={(v) => `${v}px`} onChange={(logoHeight) => set({ logoHeight })} />
          <Slider label="灰度静置" value={opts.muted} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(muted) => set({ muted })} />
          <ControlRow label="名称标签">
            <div className="view-tabs">
              {[["none", "无"], ["inline", "旁列"], ["below", "下列"], ["hover", "悬停"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.labels === id ? "active" : ""} onClick={() => set({ labels: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="逐格步进">
            <Switch checked={opts.step} onChange={(step) => set({ step })} label="逐格步进" />
          </ControlRow>
          <ControlRow label="可拖拽">
            <Switch checked={opts.draggable} onChange={(draggable) => set({ draggable })} label="可拖拽" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the straight marquee cruising over a dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ display: "flex", alignItems: "center", width: "100%", height: 170, background: "#101014", color: "#e4e4e7" }}>
        <LogoLoop
          logos={LOGOS}
          speed={80}
          logoHeight={26}
          gap={40}
          muted={0.4}
          ariaLabel="示例标志跑马灯"
        />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
