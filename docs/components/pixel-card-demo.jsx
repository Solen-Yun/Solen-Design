import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as PixelCard } from "../../src/components/pixel-card/PixelCard.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Hover to fill with pixels, click for the shockwave, tab to focus. */

const DEFAULTS = {
  variant: "default",
  gap: 5,
  speed: 35,
  pixelSize: 2,
  shape: "square",
  origin: "center",
  revealDuration: 600,
  spotlight: 0.5,
  glow: 0.5,
  opacity: 1,
  fade: 0,
  trigger: "hover",
  clickPulse: true,
  theme: "dark",
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
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 440 }}>
            <PixelCard
              variant={opts.variant}
              gap={opts.gap}
              speed={opts.speed}
              pixelSize={opts.pixelSize}
              shape={opts.shape}
              origin={opts.origin}
              revealDuration={opts.revealDuration}
              spotlight={opts.spotlight}
              glow={opts.glow}
              opacity={opts.opacity}
              fade={opts.fade}
              trigger={opts.trigger}
              clickPulse={opts.clickPulse}
              theme={opts.theme}
              radius={20}
              style={{ width: 280, height: 380 }}
              intro={false}
            >
              <div style={{ textAlign: "center", color: opts.theme === "light" ? "#18181b" : "#f4f4f5" }}>
                <div style={{ fontSize: 44, lineHeight: 1 }}>✦</div>
                <div style={{ marginTop: 10, fontSize: 14, fontWeight: 600, letterSpacing: "0.08em" }}>PIXEL FIELD</div>
                <div style={{ marginTop: 6, fontSize: 12, opacity: 0.6 }}>hover · click · sparkle</div>
              </div>
            </PixelCard>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./pixel-card-preview.html">
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
          <ControlRow label="预设">
            <div className="view-tabs">
              {[["default", "素白"], ["blue", "天蓝"], ["yellow", "柠黄"], ["pink", "玫红"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.variant === id ? "active" : ""} onClick={() => set({ variant: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="形状">
            <div className="view-tabs">
              {[["square", "方块"], ["circle", "圆点"], ["diamond", "菱形"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.shape === id ? "active" : ""} onClick={() => set({ shape: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="触发">
            <div className="view-tabs">
              {[["hover", "悬停"], ["click", "点击"], ["always", "常亮"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.trigger === id ? "active" : ""} onClick={() => set({ trigger: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="点亮起点">
            <div className="view-tabs">
              {[["center", "中心"], ["pointer", "指针"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.origin === id ? "active" : ""} onClick={() => set({ origin: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="主题">
            <div className="view-tabs">
              {[["dark", "深色"], ["light", "浅色"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.theme === id ? "active" : ""} onClick={() => set({ theme: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="像素间距" value={opts.gap} min={3} max={16} step={1} format={(v) => `${v}px`} onChange={(gap) => set({ gap })} />
          <Slider label="闪烁速度" value={opts.speed} min={0} max={100} step={5} format={(v) => String(v)} onChange={(speed) => set({ speed })} />
          <Slider label="像素尺寸" value={opts.pixelSize} min={1} max={6} step={0.5} format={(v) => v.toFixed(1)} onChange={(pixelSize) => set({ pixelSize })} />
          <Slider label="点亮时长" value={opts.revealDuration} min={150} max={1600} step={50} format={(v) => `${v}ms`} onChange={(revealDuration) => set({ revealDuration })} />
          <Slider label="聚光灯" value={opts.spotlight} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(spotlight) => set({ spotlight })} />
          <Slider label="辉光" value={opts.glow} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(glow) => set({ glow })} />
          <Slider label="不透明度" value={opts.opacity} min={0.2} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(opacity) => set({ opacity })} />
          <Slider label="边缘渐隐" value={opts.fade} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(fade) => set({ fade })} />
          <ControlRow label="点击波纹">
            <Switch checked={opts.clickPulse} onChange={(clickPulse) => set({ clickPulse })} label="点击波纹" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — two variants resting on the dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
          width: "100%",
          height: 260,
          background: "#101014",
        }}
      >
        <PixelCard variant="blue" trigger="always" radius={16} style={{ width: 190, height: 230 }} intro={false}>
          <div style={{ color: "#f4f4f5", fontSize: 13, fontWeight: 600, letterSpacing: "0.06em" }}>DRIFT</div>
        </PixelCard>
        <PixelCard variant="yellow" trigger="always" shape="circle" radius={16} style={{ width: 190, height: 230 }} intro={false}>
          <div style={{ color: "#f4f4f5", fontSize: 13, fontWeight: 600, letterSpacing: "0.06em" }}>GLOW</div>
        </PixelCard>
      </div>
    </div>
  );
}

export { Demo, CardPreview };
