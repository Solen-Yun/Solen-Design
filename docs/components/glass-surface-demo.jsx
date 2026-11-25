import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as GlassSurface } from "../../src/components/glass-surface/GlassSurface.jsx";

/* The demo plus a live customize panel — every control is a real option.
   The stage art behind the panel is inline CSS gradients; drag the sliders
   and watch the rim bend it. */

const DEFAULTS = {
  distortionScale: -180,
  redOffset: 0,
  greenOffset: 10,
  blueOffset: 20,
  blur: 11,
  brightness: 50,
  opacity: 0.93,
  borderWidth: 0.07,
  displace: 0,
  saturation: 1,
  backgroundOpacity: 0,
  mixBlendMode: "difference",
  refraction: true,
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

const BLENDS = ["difference", "screen", "overlay", "normal"];

function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => setOpts(DEFAULTS);

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: 380,
              overflow: "hidden",
              borderRadius: 16,
              background:
                "radial-gradient(circle at 20% 30%, #f97316 0%, transparent 45%), radial-gradient(circle at 80% 20%, #38bdf8 0%, transparent 50%), radial-gradient(circle at 60% 85%, #a855f7 0%, transparent 45%), linear-gradient(120deg, #1e293b, #312e81)",
            }}
          >
            <div style={{ position: "absolute", inset: 0, opacity: 0.5, background: "repeating-linear-gradient(45deg, #ffffff22 0 2px, transparent 2px 26px)" }} aria-hidden="true" />
            <GlassSurface
              width={340}
              height={150}
              borderRadius={28}
              distortionScale={opts.distortionScale}
              redOffset={opts.redOffset}
              greenOffset={opts.greenOffset}
              blueOffset={opts.blueOffset}
              blur={opts.blur}
              brightness={opts.brightness}
              opacity={opts.opacity}
              borderWidth={opts.borderWidth}
              displace={opts.displace}
              saturation={opts.saturation}
              backgroundOpacity={opts.backgroundOpacity}
              mixBlendMode={opts.mixBlendMode}
              refraction={opts.refraction}
            >
              <span style={{ fontSize: 17, fontWeight: 600, color: "#ffffff", textShadow: "0 1px 8px rgba(0,0,0,0.45)" }}>液态玻璃</span>
            </GlassSurface>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./glass-surface-preview.html">
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
          <Slider label="扭曲强度" value={opts.distortionScale} min={-400} max={0} step={10} format={(v) => String(v)} onChange={(distortionScale) => set({ distortionScale })} />
          <Slider label="红通道" value={opts.redOffset} min={-60} max={60} step={2} format={(v) => String(v)} onChange={(redOffset) => set({ redOffset })} />
          <Slider label="绿通道" value={opts.greenOffset} min={-60} max={60} step={2} format={(v) => String(v)} onChange={(greenOffset) => set({ greenOffset })} />
          <Slider label="蓝通道" value={opts.blueOffset} min={-60} max={60} step={2} format={(v) => String(v)} onChange={(blueOffset) => set({ blueOffset })} />
          <Slider label="贴图模糊" value={opts.blur} min={0} max={40} step={1} format={(v) => `${v}px`} onChange={(blur) => set({ blur })} />
          <Slider label="边圈宽度" value={opts.borderWidth} min={0.01} max={0.3} step={0.01} format={(v) => v.toFixed(2)} onChange={(borderWidth) => set({ borderWidth })} />
          <Slider label="内板亮度" value={opts.brightness} min={0} max={100} step={5} format={(v) => String(v)} onChange={(brightness) => set({ brightness })} />
          <Slider label="内板不透明度" value={opts.opacity} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(opacity) => set({ opacity })} />
          <Slider label="结果平滑" value={opts.displace} min={0} max={6} step={0.5} format={(v) => v.toFixed(1)} onChange={(displace) => set({ displace })} />
          <Slider label="饱和度" value={opts.saturation} min={0} max={2} step={0.1} format={(v) => v.toFixed(1)} onChange={(saturation) => set({ saturation })} />
          <Slider label="底色" value={opts.backgroundOpacity} min={0} max={0.6} step={0.05} format={(v) => v.toFixed(2)} onChange={(backgroundOpacity) => set({ backgroundOpacity })} />
          <ControlRow label="贴图混合">
            <div className="view-tabs">
              {BLENDS.map((blend) => (
                <button key={blend} type="button" className={opts.mixBlendMode === blend ? "active" : ""} onClick={() => set({ mixBlendMode: blend })}>
                  {blend}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="折射">
            <Switch checked={opts.refraction} onChange={(refraction) => set({ refraction })} label="折射" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the glass panel over inline gradient art. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: 240,
          overflow: "hidden",
          background:
            "radial-gradient(circle at 25% 35%, #f97316 0%, transparent 50%), radial-gradient(circle at 75% 65%, #38bdf8 0%, transparent 50%), linear-gradient(120deg, #1e293b, #312e81)",
        }}
      >
        <GlassSurface width={240} height={110} borderRadius={24}>
          <span style={{ fontSize: 15, fontWeight: 600, color: "#ffffff", textShadow: "0 1px 8px rgba(0,0,0,0.45)" }}>液态玻璃面板</span>
        </GlassSurface>
      </div>
    </div>
  );
}

export { Demo, CardPreview };
