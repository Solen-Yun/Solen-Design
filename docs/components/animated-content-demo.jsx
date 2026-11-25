import { useState } from "react";
import { DemoFit } from "../demo-fit";
import AnimatedContent from "../../src/components/animated-content/AnimatedContent.jsx";

/* The demo plus a live customize panel — every control is a real option.
   The wrapper runs on mount here; replay remounts it to watch the entrance. */

const TILES = [
  { label: "设计", background: "linear-gradient(135deg, #6366f1, #8b5cf6)" },
  { label: "动效", background: "linear-gradient(135deg, #0ea5e9, #22d3ee)" },
  { label: "排版", background: "linear-gradient(135deg, #f59e0b, #f97316)" },
  { label: "色彩", background: "linear-gradient(135deg, #10b981, #34d399)" },
  { label: "交互", background: "linear-gradient(135deg, #ec4899, #f43f5e)" },
];

const DEFAULTS = {
  direction: "vertical",
  reverse: false,
  wipe: "none",
  distance: 100,
  duration: 0.8,
  blur: 0,
  rotate: 0,
  tilt: 0,
  scale: 1,
  stagger: 0,
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
  const [run, setRun] = useState(0);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => setOpts(DEFAULTS);

  return (
    <>
      <div className="demo-stage" style={{ background: "#ffffff", colorScheme: "light" }}>
        <DemoFit>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 240 }}>
            <AnimatedContent key={run} trigger="mount" {...opts}>
              {TILES.map((tile) => (
                <div
                  key={tile.label}
                  style={{
                    width: 84,
                    height: 110,
                    borderRadius: 12,
                    background: tile.background,
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    paddingBottom: 10,
                    fontSize: 13,
                    letterSpacing: "0.06em",
                  }}
                >
                  {tile.label}
                </div>
              ))}
            </AnimatedContent>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./animated-content-preview.html">
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
          <ControlRow label="重播">
            <div className="view-tabs">
              <button type="button" onClick={() => setRun((r) => r + 1)}>重播入场</button>
            </div>
          </ControlRow>
          <ControlRow label="方向">
            <div className="view-tabs">
              {[["vertical", "竖直"], ["horizontal", "水平"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.direction === id ? "active" : ""} onClick={() => set({ direction: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="反向">
            <Switch checked={opts.reverse} onChange={(reverse) => set({ reverse })} label="反向" />
          </ControlRow>
          <ControlRow label="擦亮遮罩">
            <div className="view-tabs">
              {[["none", "无"], ["up", "上"], ["down", "下"], ["left", "左"], ["right", "右"], ["center", "中心"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.wipe === id ? "active" : ""} onClick={() => set({ wipe: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="位移" value={opts.distance} min={0} max={300} step={10} format={(v) => `${v}px`} onChange={(distance) => set({ distance })} />
          <Slider label="时长" value={opts.duration} min={0.2} max={2} step={0.05} format={(v) => `${v.toFixed(2)}s`} onChange={(duration) => set({ duration })} />
          <Slider label="模糊" value={opts.blur} min={0} max={20} step={1} format={(v) => `${v}px`} onChange={(blur) => set({ blur })} />
          <Slider label="旋转" value={opts.rotate} min={-90} max={90} step={1} format={(v) => `${v}°`} onChange={(rotate) => set({ rotate })} />
          <Slider label="倾斜" value={opts.tilt} min={0} max={60} step={1} format={(v) => `${v}°`} onChange={(tilt) => set({ tilt })} />
          <Slider label="起始缩放" value={opts.scale} min={0.5} max={1.5} step={0.05} format={(v) => `${v.toFixed(2)}×`} onChange={(scale) => set({ scale })} />
          <Slider label="子项间隔" value={opts.stagger} min={0} max={0.3} step={0.01} format={(v) => `${v.toFixed(2)}s`} onChange={(stagger) => set({ stagger })} />
        </div>
      </div>
    </>
  );
}

/* Gallery card — the tiles caught mid-reveal, staggered on mount. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 170, background: "#ffffff" }}>
        <AnimatedContent trigger="mount" direction="vertical" distance={60} duration={0.9} blur={8} tilt={12} stagger={0.12}>
          {TILES.slice(0, 3).map((tile) => (
            <div
              key={tile.label}
              style={{
                width: 54,
                height: 72,
                borderRadius: 10,
                background: tile.background,
              }}
            />
          ))}
        </AnimatedContent>
      </div>
    </div>
  );
}

export { Demo, CardPreview };
