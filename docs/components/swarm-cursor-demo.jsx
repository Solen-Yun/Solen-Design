import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as SwarmCursor } from "../../src/components/swarm-cursor/SwarmCursor.jsx";

/* The demo plus a live customize panel — every control is a real option.
   The children are real buttons so the default targets selector can wrap
   the swarm around them. */

const DEFAULTS = {
  lightMode: false,
  count: 800,
  size: 2.6,
  shape: "dot",
  color: "#ffffff",
  accentColor: "#ffd166",
  spread: 90,
  speed: 1,
  swirl: 0.6,
  tail: 0.5,
  trail: 0.6,
  wander: 0.5,
  depth: 0.7,
  idle: "roam",
  clickEffect: "burst",
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
  const light = opts.lightMode;

  return (
    <>
      <div className="demo-stage" style={{ background: light ? "#f4f4f5" : "#101014", colorScheme: light ? "light" : "dark" }}>
        <DemoFit>
          <div style={{ width: "100%", height: 420 }}>
            <SwarmCursor
              lightMode={opts.lightMode}
              count={opts.count}
              size={opts.size}
              shape={opts.shape}
              color={opts.color}
              accentColor={opts.accentColor}
              spread={opts.spread}
              speed={opts.speed}
              swirl={opts.swirl}
              tail={opts.tail}
              trail={opts.trail}
              wander={opts.wander}
              depth={opts.depth}
              idle={opts.idle}
              clickEffect={opts.clickEffect}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, width: "100%", height: "100%" }}>
                <div className="view-tabs">
                  <button type="button">环绕我</button>
                </div>
                <div className="view-tabs">
                  <button type="button">绕这颗</button>
                </div>
                <div className="view-tabs">
                  <button type="button">还有这颗</button>
                </div>
              </div>
            </SwarmCursor>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./swarm-cursor-preview.html">
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
          <Slider label="粒子数" value={opts.count} min={50} max={2000} step={50} format={(v) => String(v)} onChange={(count) => set({ count })} />
          <Slider label="粒子大小" value={opts.size} min={0.5} max={10} step={0.1} format={(v) => v.toFixed(1)} onChange={(size) => set({ size })} />
          <ControlRow label="形状">
            <div className="view-tabs">
              {[["dot", "圆点"], ["square", "方块"], ["streak", "长条"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.shape === id ? "active" : ""} onClick={() => set({ shape: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Color label="粒子色" value={opts.color} onChange={(color) => set({ color })} />
          <Color label="提亮色" value={opts.accentColor} onChange={(accentColor) => set({ accentColor })} />
          <Slider label="聚拢半径" value={opts.spread} min={20} max={400} step={5} format={(v) => `${v}px`} onChange={(spread) => set({ spread })} />
          <Slider label="节奏" value={opts.speed} min={0} max={4} step={0.1} format={(v) => `${v.toFixed(1)}×`} onChange={(speed) => set({ speed })} />
          <Slider label="涡度" value={opts.swirl} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(swirl) => set({ swirl })} />
          <Slider label="松散度" value={opts.tail} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(tail) => set({ tail })} />
          <Slider label="速度拉伸" value={opts.trail} min={0} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(trail) => set({ trail })} />
          <Slider label="噪声翻搅" value={opts.wander} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(wander) => set({ wander })} />
          <Slider label="景深" value={opts.depth} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(depth) => set({ depth })} />
          <ControlRow label="空闲去处">
            <div className="view-tabs">
              {[["roam", "游走"], ["gather", "聚中心"], ["hide", "淡出"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.idle === id ? "active" : ""} onClick={() => set({ idle: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="点击效果">
            <div className="view-tabs">
              {[["burst", "炸开"], ["pulse", "涟漪"], ["none", "无"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.clickEffect === id ? "active" : ""} onClick={() => set({ clickEffect: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="亮色模式">
            <Switch checked={light} onChange={(on) => set({ lightMode: on })} label="亮色模式" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — a small amber swarm resting on the dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 170, background: "#101014" }}>
        <SwarmCursor count={500} size={2.4} color="#ffd166" accentColor="#ff8a5f" spread={70} depth={0.8}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
            <div className="view-tabs">
              <button type="button">hover me</button>
            </div>
          </div>
        </SwarmCursor>
      </div>
    </div>
  );
}

export { Demo, CardPreview };
