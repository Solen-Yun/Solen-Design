import { useState } from "react";
import { DemoFit } from "../demo-fit";
import PixelSwap from "../../src/components/pixel-swap/PixelSwap.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Enter the card from different corners to see the wave re-anchor. */

const DEFAULTS = {
  pattern: "pointer",
  pixelSize: 48,
  gap: 0,
  pixelRadius: 0,
  pixelScale: 0,
  pixelSpin: 0,
  duration: 400,
  pixelDuration: 350,
  randomness: 0.2,
  bounce: 0.3,
  trigger: "hover",
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

function Face({ glyph, title, note, tone }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        width: "100%",
        height: "100%",
        background: tone,
        color: "#ffffff",
      }}
    >
      <div style={{ fontSize: 44, filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.35))" }} aria-hidden="true">
        {glyph}
      </div>
      <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: "0.06em" }}>{title}</div>
      <div style={{ fontSize: 12, opacity: 0.85 }}>{note}</div>
    </div>
  );
}

function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => setOpts(DEFAULTS);
  const hint = opts.trigger === "hover" ? "悬停换装" : "点击换装";

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 340, color: "#a1a1aa" }}>
            <div style={{ textAlign: "center", width: "min(100%, 420px)" }}>
              <PixelSwap
                pattern={opts.pattern}
                pixelSize={opts.pixelSize}
                gap={opts.gap}
                pixelRadius={opts.pixelRadius}
                pixelScale={opts.pixelScale}
                pixelSpin={opts.pixelSpin}
                duration={opts.duration}
                pixelDuration={opts.pixelDuration}
                randomness={opts.randomness}
                bounce={opts.bounce}
                trigger={opts.trigger}
                style={{ borderRadius: 16 }}
                firstContent={<Face glyph="🧩" title="像素波浪" note={hint} tone="linear-gradient(140deg, #312e81 0%, #6d28d9 100%)" />}
                secondContent={<Face glyph="🚀" title="换装完成" note="逐格弹簧落定" tone="linear-gradient(140deg, #134e4a 0%, #0f766e 100%)" />}
              />
              <div style={{ marginTop: 10, fontSize: 12 }}>从不同角落进入，波浪起点跟着指针走</div>
            </div>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./pixel-swap-preview.html">
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
          <ControlRow label="波次">
            <div className="view-tabs">
              {[["pointer", "指针"], ["random", "随机"], ["center", "中心"], ["edges", "边缘"], ["left-to-right", "左到右"], ["right-to-left", "右到左"], ["top-to-bottom", "上到下"], ["bottom-to-top", "下到上"], ["diagonal", "对角"], ["spiral", "螺旋"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.pattern === id ? "active" : ""} onClick={() => set({ pattern: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="格子尺寸" value={opts.pixelSize} min={8} max={120} step={2} format={(v) => `${v}px`} onChange={(pixelSize) => set({ pixelSize })} />
          <Slider label="格子间隙" value={opts.gap} min={0} max={16} step={1} format={(v) => `${v}px`} onChange={(gap) => set({ gap })} />
          <Slider label="格子圆角" value={opts.pixelRadius} min={0} max={50} step={1} format={(v) => `${v}%`} onChange={(pixelRadius) => set({ pixelRadius })} />
          <Slider label="起始缩放" value={opts.pixelScale} min={0} max={0.9} step={0.05} format={(v) => v.toFixed(2)} onChange={(pixelScale) => set({ pixelScale })} />
          <Slider label="落定旋转" value={opts.pixelSpin} min={-360} max={360} step={10} format={(v) => `${v}°`} onChange={(pixelSpin) => set({ pixelSpin })} />
          <Slider label="波浪时长" value={opts.duration} min={0} max={1200} step={20} format={(v) => `${v}ms`} onChange={(duration) => set({ duration })} />
          <Slider label="弹簧周期" value={opts.pixelDuration} min={60} max={900} step={10} format={(v) => `${v}ms`} onChange={(pixelDuration) => set({ pixelDuration })} />
          <Slider label="随机混入" value={opts.randomness} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(randomness) => set({ randomness })} />
          <Slider label="过冲" value={opts.bounce} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(bounce) => set({ bounce })} />
          <ControlRow label="触发方式">
            <div className="view-tabs">
              {[["hover", "悬停"], ["click", "点击"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.trigger === id ? "active" : ""} onClick={() => set({ trigger: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the springy pixel wave over a fixed swirl pattern. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 170, background: "#101014" }}>
        <div style={{ width: 300 }}>
          <PixelSwap
            pattern="spiral"
            pixelSize={38}
            pixelRadius={18}
            pixelSpin={90}
            bounce={0.45}
            duration={500}
            trigger="hover"
            style={{ borderRadius: 14 }}
            firstContent={<Face glyph="🌀" title="螺旋波次" note="悬停换装" tone="linear-gradient(140deg, #312e81 0%, #6d28d9 100%)" />}
            secondContent={<Face glyph="✨" title="逐格落定" note="圆角与自旋" tone="linear-gradient(140deg, #9d174d 0%, #be185d 100%)" />}
          />
        </div>
      </div>
    </div>
  );
}

export { Demo, CardPreview };
