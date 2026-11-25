import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as LatticeLoader } from "../../src/components/lattice-loader/LatticeLoader.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Flipping status mid-wave freezes the lattice into its done/error mark. */

const PATTERNS = {
  3: ["orbit", "arrow", "dots", "ripple", "spiral", "snake"],
  4: ["sweep", "orbit", "snake", "spin", "rain", "pulse"],
};

const DEFAULTS = {
  status: "working",
  pattern: "orbit",
  grid: 3,
  color: "#f5f5f5",
  cellSize: 6,
  step: 90,
  glow: true,
  showTimer: true,
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
  const patterns = PATTERNS[opts.grid === 4 ? 4 : 3];

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 180, color: "#f5f5f5" }}>
            <LatticeLoader
              status={opts.status}
              pattern={opts.pattern}
              grid={opts.grid}
              color={opts.color}
              cellSize={opts.cellSize}
              step={opts.step}
              glow={opts.glow}
              showTimer={opts.showTimer}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./lattice-loader-preview.html">
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
          <ControlRow label="状态">
            <div className="view-tabs">
              {[["working", "工作"], ["done", "完成"], ["error", "失败"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.status === id ? "active" : ""} onClick={() => set({ status: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="网格">
            <div className="view-tabs">
              {[["3", "3×3"], ["4", "4×4"]].map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  className={String(opts.grid) === id ? "active" : ""}
                  onClick={() => set({ grid: Number(id), pattern: PATTERNS[Number(id)][0] })}
                >
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="图案">
            <div className="view-tabs">
              {patterns.map((name) => (
                <button key={name} type="button" className={opts.pattern === name ? "active" : ""} onClick={() => set({ pattern: name })}>
                  {name}
                </button>
              ))}
            </div>
          </ControlRow>
          <Color label="格子色" value={opts.color} onChange={(color) => set({ color })} />
          <Slider label="格子边长" value={opts.cellSize} min={4} max={10} step={1} format={(v) => `${v}px`} onChange={(cellSize) => set({ cellSize })} />
          <Slider label="步进节奏" value={opts.step} min={40} max={200} step={10} format={(v) => `${v}ms`} onChange={(step) => set({ step })} />
          <ControlRow label="柔光">
            <Switch checked={opts.glow} onChange={(glow) => set({ glow })} label="柔光" />
          </ControlRow>
          <ControlRow label="秒表">
            <Switch checked={opts.showTimer} onChange={(showTimer) => set({ showTimer })} label="秒表" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the glowing wave row resting on a dark stage. */
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
          color: "#f5f5f5",
        }}
      >
        <LatticeLoader status="working" pattern="orbit" grid={3} color="#f5f5f5" glow />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
