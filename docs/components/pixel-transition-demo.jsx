import { useState } from "react";
import { DemoFit } from "../demo-fit";
import PixelTransition from "../../src/components/pixel-transition/PixelTransition.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Hover (or click, per the trigger) the front card to dissolve it. */

const DEFAULTS = {
  gridSize: 10,
  pixelColor: "#ffffff",
  mosaic: 0,
  animationStepDuration: 0.4,
  pattern: "random",
  randomness: 0.3,
  pixelAnimation: "pop",
  pixelShape: "square",
  gap: 0,
  trigger: "hover",
  once: false,
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
      <div style={{ fontSize: 42, filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.35))" }} aria-hidden="true">
        {glyph}
      </div>
      <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "0.06em" }}>{title}</div>
      <div style={{ fontSize: 12, opacity: 0.85 }}>{note}</div>
    </div>
  );
}

function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => setOpts(DEFAULTS);
  const hint = opts.trigger === "hover" ? "悬停切换" : "点击切换";

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 36, width: "100%", height: 340, color: "#a1a1aa" }}>
            <div style={{ textAlign: "center" }}>
              <PixelTransition
                gridSize={opts.gridSize}
                pixelColor={opts.pixelColor}
                mosaic={opts.mosaic}
                animationStepDuration={opts.animationStepDuration}
                pattern={opts.pattern}
                randomness={opts.randomness}
                pixelAnimation={opts.pixelAnimation}
                pixelShape={opts.pixelShape}
                gap={opts.gap}
                trigger={opts.trigger}
                once={opts.once}
                firstContent={<Face glyph="🎬" title="正面" note={hint} tone="linear-gradient(140deg, #6366f1 0%, #a855f7 100%)" />}
                secondContent={<Face glyph="⚡" title="背面" note="像素之下换好内容" tone="linear-gradient(140deg, #0f172a 0%, #155e75 100%)" />}
              />
              <div style={{ marginTop: 10, fontSize: 12 }}>主卡片 · 全参数可调</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <PixelTransition
                gridSize={14}
                pixelColor="#fbbf24"
                mosaic={0.5}
                pattern="ripple"
                pixelAnimation="grow"
                pixelShape="circle"
                gap={2}
                trigger={opts.trigger}
                firstContent={<Face glyph="🌙" title="月面" note={hint} tone="linear-gradient(140deg, #1e293b 0%, #4c1d95 100%)" />}
                secondContent={<Face glyph="☀️" title="日面" note="涟漪式圆形像素" tone="linear-gradient(140deg, #b45309 0%, #f59e0b 100%)" />}
              />
              <div style={{ marginTop: 10, fontSize: 12 }}>涟漪示例 · 固定参数</div>
            </div>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./pixel-transition-preview.html">
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
          <Slider label="网格列数" value={opts.gridSize} min={2} max={40} step={1} format={(v) => String(v)} onChange={(gridSize) => set({ gridSize })} />
          <Color label="像素颜色" value={opts.pixelColor} onChange={(pixelColor) => set({ pixelColor })} />
          <Slider label="马赛克" value={opts.mosaic} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(mosaic) => set({ mosaic })} />
          <Slider label="单程时长" value={opts.animationStepDuration} min={0.1} max={1} step={0.05} format={(v) => `${v.toFixed(2)}s`} onChange={(animationStepDuration) => set({ animationStepDuration })} />
          <ControlRow label="次序">
            <div className="view-tabs">
              {[["random", "随机"], ["dither", "抖纹"], ["ripple", "涟漪"], ["wipe", "擦除"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.pattern === id ? "active" : ""} onClick={() => set({ pattern: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="随机混入" value={opts.randomness} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(randomness) => set({ randomness })} />
          <ControlRow label="入场方式">
            <div className="view-tabs">
              {[["pop", "弹出"], ["grow", "生长"], ["fade", "渐显"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.pixelAnimation === id ? "active" : ""} onClick={() => set({ pixelAnimation: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="格子形状">
            <div className="view-tabs">
              {[["square", "方形"], ["rounded", "圆角"], ["circle", "圆形"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.pixelShape === id ? "active" : ""} onClick={() => set({ pixelShape: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="格子间隙" value={opts.gap} min={0} max={10} step={1} format={(v) => `${v}px`} onChange={(gap) => set({ gap })} />
          <ControlRow label="触发方式">
            <div className="view-tabs">
              {[["hover", "悬停"], ["click", "点击"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.trigger === id ? "active" : ""} onClick={() => set({ trigger: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="只溶一次">
            <Switch checked={opts.once} onChange={(once) => set({ once })} label="只溶一次" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — a ripple dissolve card resting on the dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 170, background: "#101014" }}>
        <div style={{ transform: "scale(0.52)", flexShrink: 0 }}>
        <PixelTransition
          gridSize={12}
          pixelColor="#7dd3fc"
          mosaic={0.4}
          pattern="ripple"
          pixelShape="circle"
          trigger="hover"
          firstContent={<Face glyph="🎛️" title="像素溶解" note="悬停切换" tone="linear-gradient(140deg, #0e7490 0%, #164e63 100%)" />}
          secondContent={<Face glyph="🌀" title="已切换" note="像素之下完成" tone="linear-gradient(140deg, #4338ca 0%, #7e22ce 100%)" />}
        />
        </div>
      </div>
    </div>
  );
}

export { Demo, CardPreview };
