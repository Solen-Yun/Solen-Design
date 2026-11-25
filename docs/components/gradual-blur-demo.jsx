import { useRef, useState } from "react";
import { DemoFit } from "../demo-fit";
import GradualBlur from "../../src/components/gradual-blur/GradualBlur.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Scroll the panel: the bottom band fades out exactly at the end of the
   content when autoHide is on, and hovering the band deepens the blur. */

const ROWS = [
  ["❋", "霜线计划", "把边缘雾化成渐隐的出口"],
  ["◈", "雾面卡片", "backdrop-filter 分层叠加"],
  ["✳", "滚动叙事", "尽头处整条带淡到零"],
  ["❍", "色彩罩", "沿同一条曲线罩色"],
  ["✦", "指数爬升", "模糊集中在边缘附近"],
  ["◇", "曲率选项", "线性、贝塞尔与四种 ease"],
  ["✺", "悬停加深", "一个 CSS 变量乘在半径上"],
  ["◐", "四边通用", "上下左右任选一条边"],
  ["▤", "列表收尾", "页脚卡片渐进消失"],
  ["▦", "图集遮幅", "首尾两端的雾化窗口"],
  ["⌘", "圆角跟随", "继承父元素的圆角"],
  ["✧", "零循环", "没有自转的帧循环"],
];

const DEFAULTS = {
  position: "bottom",
  height: "6rem",
  strength: 2,
  layers: 8,
  curve: "linear",
  exponential: true,
  opacity: 1,
  saturation: 1,
  tint: "transparent",
  autoHide: false,
  hoverIntensity: 1,
  duration: 0.3,
  easing: "ease-out",
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
  const [tintColor, setTintColor] = useState("#1e1b4b");
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => {
    setOpts(DEFAULTS);
    setTintColor("#1e1b4b");
  };
  const scrollerRef = useRef(null);
  const heightNum = typeof opts.height === "number" ? opts.height : 96;

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div
            style={{
              position: "relative",
              width: 440,
              height: 320,
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#e4e4e7",
            }}
          >
            <div
              ref={scrollerRef}
              style={{ position: "absolute", inset: 0, overflowY: "auto", background: "#18181b", scrollbarWidth: "none" }}
            >
              <div style={{ padding: "22px 20px 26px", display: "flex", flexDirection: "column", gap: 10 }}>
                {ROWS.map(([icon, title, note]) => (
                  <div
                    key={title}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 14px",
                      borderRadius: 12,
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <span style={{ fontSize: 20 }} aria-hidden="true">{icon}</span>
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <strong style={{ fontSize: 14 }}>{title}</strong>
                      <span style={{ fontSize: 12, color: "rgba(228,228,231,0.6)" }}>{note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <GradualBlur
              position={opts.position}
              target="parent"
              height={opts.height}
              strength={opts.strength}
              layers={opts.layers}
              curve={opts.curve}
              exponential={opts.exponential}
              opacity={opts.opacity}
              saturation={opts.saturation}
              tint={opts.tint}
              autoHide={opts.autoHide}
              container={scrollerRef}
              hoverIntensity={opts.hoverIntensity}
              duration={opts.duration}
              easing={opts.easing}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./gradual-blur-preview.html">
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
          <ControlRow label="贴边">
            <div className="view-tabs">
              {[["top", "上"], ["bottom", "下"], ["left", "左"], ["right", "右"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.position === id ? "active" : ""} onClick={() => set({ position: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="爬升曲线">
            <div className="view-tabs">
              {[["linear", "线性"], ["bezier", "贝塞尔"], ["ease-in", "缓入"], ["ease-out", "缓出"], ["ease-in-out", "缓入出"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.curve === id ? "active" : ""} onClick={() => set({ curve: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="缓动">
            <div className="view-tabs">
              {[["ease-out", "缓出"], ["ease-in", "缓入"], ["ease-in-out", "缓入出"], ["linear", "线性"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.easing === id ? "active" : ""} onClick={() => set({ easing: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="带厚" value={heightNum} min={48} max={200} step={4} format={(v) => `${v}px`} onChange={(height) => set({ height })} />
          <Slider label="峰值强度" value={opts.strength} min={0} max={8} step={0.5} format={(v) => v.toFixed(1)} onChange={(strength) => set({ strength })} />
          <Slider label="层数" value={opts.layers} min={1} max={16} step={1} format={(v) => String(v)} onChange={(layers) => set({ layers })} />
          <Slider label="饱和度" value={opts.saturation} min={0} max={2} step={0.05} format={(v) => `×${v.toFixed(2)}`} onChange={(saturation) => set({ saturation })} />
          <Slider label="不透明度" value={opts.opacity} min={0.2} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(opacity) => set({ opacity })} />
          <Slider label="悬停倍率" value={opts.hoverIntensity} min={0} max={3} step={0.1} format={(v) => `×${v.toFixed(1)}`} onChange={(hoverIntensity) => set({ hoverIntensity })} />
          <Slider label="过渡时长" value={opts.duration} min={0} max={0.8} step={0.05} format={(v) => `${v.toFixed(2)}s`} onChange={(duration) => set({ duration })} />
          <ControlRow label="指数爬升">
            <Switch checked={opts.exponential} onChange={(exponential) => set({ exponential })} label="指数爬升" />
          </ControlRow>
          <ControlRow label="尽头隐去">
            <Switch checked={opts.autoHide} onChange={(autoHide) => set({ autoHide })} label="尽头隐去" />
          </ControlRow>
          <ControlRow label="色彩罩">
            <Switch checked={opts.tint !== "transparent"} onChange={(on) => set({ tint: on ? tintColor : "transparent" })} label="色彩罩" />
          </ControlRow>
          {opts.tint !== "transparent" && (
            <Color label="罩色" value={tintColor} onChange={(c) => { setTintColor(c); set({ tint: c }); }} />
          )}
        </div>
      </div>
    </>
  );
}

/* Gallery card — a static pose: the band melts a gradient tile's top
   edge into the background above it. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 170, background: "#101014" }}>
        <div style={{ position: "relative", width: 250, height: 140, borderRadius: 14, overflow: "hidden", background: "#0c0c10" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(160deg, #f59e0b 0%, #dc2626 55%, #7c2d12 100%)",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              color: "#fff7ed",
              fontSize: 13,
              paddingBottom: 12,
            }}
          >
            顶端化进底色里
          </div>
          <GradualBlur position="top" target="parent" height="3.5rem" strength={3} layers={10} curve="bezier" />
        </div>
      </div>
    </div>
  );
}

export { Demo, CardPreview };
