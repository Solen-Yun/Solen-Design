import { useState } from "react";
import { DemoFit } from "../demo-fit";
import Noise from "../../src/components/noise/Noise.jsx";

/* The demo plus a live customize panel — every control is a real option.
   The stage is a gradient "photo"; the grain, dust and scratches layer
   right over it, exactly like on a real image. */

const DEFAULTS = {
  opacity: 0.2,
  size: 1,
  fps: 24,
  blendMode: "overlay",
  contrast: 0.6,
  colored: false,
  dust: 0,
  scratches: 0,
  scanlines: 0,
  flicker: 0,
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

function Scene() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        background:
          "radial-gradient(120% 90% at 70% 12%, #ffd9a0 0%, #f4a26b 30%, #c65f4e 55%, #5b3a6e 82%, #2b2340 100%)",
        color: "#fff7ec",
      }}
    >
      <div style={{ fontSize: 44, filter: "drop-shadow(0 6px 18px rgba(43, 20, 10, 0.45))" }} aria-hidden="true">
        🌄
      </div>
      <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: "0.1em", textShadow: "0 2px 10px rgba(43, 20, 10, 0.5)" }}>
        黄昏 · 胶片质感
      </div>
      <div style={{ fontSize: 12, opacity: 0.8, textShadow: "0 1px 6px rgba(43, 20, 10, 0.5)" }}>
        颗粒、灰尘与划痕都画在这层「照片」上方
      </div>
    </div>
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
          <div style={{ position: "relative", width: "100%", height: 320 }}>
            <Scene />
            <Noise
              opacity={opts.opacity}
              size={opts.size}
              fps={opts.fps}
              blendMode={opts.blendMode}
              contrast={opts.contrast}
              colored={opts.colored}
              dust={opts.dust}
              scratches={opts.scratches}
              scanlines={opts.scanlines}
              flicker={opts.flicker}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./noise-preview.html">
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
          <Slider label="不透明度" value={opts.opacity} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(opacity) => set({ opacity })} />
          <Slider label="颗粒缩放" value={opts.size} min={0.5} max={4} step={0.5} format={(v) => `${v}×`} onChange={(size) => set({ size })} />
          <Slider label="刷新率" value={opts.fps} min={0} max={60} step={1} format={(v) => (v === 0 ? "冻结" : `${v}fps`)} onChange={(fps) => set({ fps })} />
          <ControlRow label="混合模式">
            <div className="view-tabs">
              {[["normal", "正常"], ["overlay", "叠加"], ["soft-light", "柔光"], ["multiply", "正片叠底"], ["screen", "滤色"], ["difference", "差值"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.blendMode === id ? "active" : ""} onClick={() => set({ blendMode: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="对比度" value={opts.contrast} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(contrast) => set({ contrast })} />
          <ControlRow label="彩色噪点">
            <Switch checked={opts.colored} onChange={(colored) => set({ colored })} label="彩色噪点" />
          </ControlRow>
          <Slider label="灰尘" value={opts.dust} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(dust) => set({ dust })} />
          <Slider label="划痕" value={opts.scratches} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(scratches) => set({ scratches })} />
          <Slider label="扫描线" value={opts.scanlines} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(scanlines) => set({ scanlines })} />
          <Slider label="闪烁" value={opts.flicker} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(flicker) => set({ flicker })} />
        </div>
      </div>
    </>
  );
}

/* Gallery card — a grainy projector frame with dust and one scratch. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 170, background: "#101014" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(110% 100% at 30% 15%, #9ecadf 0%, #4a7ba6 40%, #23364f 78%, #101820 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 20,
            bottom: 18,
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "0.08em",
            color: "#f2f7fb",
            textShadow: "0 2px 8px rgba(10, 16, 24, 0.6)",
          }}
        >
          35mm 颗粒
        </div>
        <Noise opacity={0.35} dust={0.45} scratches={0.25} flicker={0.15} blendMode="overlay" />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
