import { useEffect, useRef, useState } from "react";
import { DemoFit } from "../demo-fit";
import ClickSpark from "../../src/components/click-spark/ClickSpark.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Click anywhere on the stage; sparks spill around the buttons and card. */

const DEFAULTS = {
  shape: "line",
  easing: "ease-out",
  sparkColor: "#ffffff",
  sparkSize: 14,
  sparkRadius: 30,
  sparkCount: 8,
  sparkWidth: 2,
  duration: 500,
  randomness: 0.2,
  gravity: 0,
  glow: 0,
  ring: false,
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

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ width: "100%", height: 300 }}>
            <ClickSpark
              shape={opts.shape}
              easing={opts.easing}
              sparkColor={opts.sparkColor}
              sparkSize={opts.sparkSize}
              sparkRadius={opts.sparkRadius}
              sparkCount={opts.sparkCount}
              sparkWidth={opts.sparkWidth}
              duration={opts.duration}
              randomness={opts.randomness}
              gravity={opts.gravity}
              glow={opts.glow}
              ring={opts.ring}
            >
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, width: "100%", height: "100%", color: "#e4e4e7" }}>
                <div style={{ fontSize: 14, letterSpacing: "0.04em", opacity: 0.7 }}>点击任意处炸开火花</div>
                <div style={{ display: "flex", gap: 14 }}>
                  {["点赞", "收藏", "分享"].map((label) => (
                    <button
                      key={label}
                      type="button"
                      style={{
                        padding: "10px 22px",
                        borderRadius: 999,
                        border: "1px solid rgba(255,255,255,0.22)",
                        background: "rgba(255,255,255,0.06)",
                        color: "#e4e4e7",
                        fontSize: 14,
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <div
                  style={{
                    width: 220,
                    padding: "16px 18px",
                    borderRadius: 14,
                    border: "1px solid rgba(255,255,255,0.14)",
                    background: "rgba(255,255,255,0.05)",
                    fontSize: 13,
                    lineHeight: 1.7,
                  }}
                >
                  火花画在独立 Canvas 上，包围盒按爆点计算，溅出按钮边缘也不会被裁掉。
                </div>
              </div>
            </ClickSpark>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./click-spark-preview.html">
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
          <ControlRow label="形状">
            <div className="view-tabs">
              {[["line", "线段"], ["streak", "彗星"], ["dot", "圆点"], ["star", "星星"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.shape === id ? "active" : ""} onClick={() => set({ shape: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="缓动">
            <div className="view-tabs">
              {[["linear", "线性"], ["ease-in", "加速"], ["ease-out", "减速"], ["ease-in-out", "缓入出"], ["spring", "弹簧"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.easing === id ? "active" : ""} onClick={() => set({ easing: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Color label="火花颜色" value={opts.sparkColor} onChange={(sparkColor) => set({ sparkColor })} />
          <Slider label="尺寸" value={opts.sparkSize} min={4} max={40} step={1} format={(v) => `${v}px`} onChange={(sparkSize) => set({ sparkSize })} />
          <Slider label="飞行半径" value={opts.sparkRadius} min={10} max={90} step={2} format={(v) => `${v}px`} onChange={(sparkRadius) => set({ sparkRadius })} />
          <Slider label="火花数" value={opts.sparkCount} min={1} max={24} step={1} format={(v) => String(v)} onChange={(sparkCount) => set({ sparkCount })} />
          <Slider label="线宽" value={opts.sparkWidth} min={0.5} max={6} step={0.5} format={(v) => `${v}px`} onChange={(sparkWidth) => set({ sparkWidth })} />
          <Slider label="时长" value={opts.duration} min={200} max={1200} step={50} format={(v) => `${v}ms`} onChange={(duration) => set({ duration })} />
          <Slider label="随机" value={opts.randomness} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(randomness) => set({ randomness })} />
          <Slider label="重力" value={opts.gravity} min={0} max={2} step={0.1} format={(v) => v.toFixed(1)} onChange={(gravity) => set({ gravity })} />
          <Slider label="光晕" value={opts.glow} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(glow) => set({ glow })} />
          <ControlRow label="点击圆环">
            <Switch checked={opts.ring} onChange={(ring) => set({ ring })} label="点击圆环" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — a burst fired at the centre on mount, sparks over the buttons. */
function CardPreview() {
  const sparkRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => sparkRef.current?.spark(), 350);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 170, background: "#101014" }}>
        <ClickSpark ref={sparkRef} shape="streak" sparkColor={["#ffffff", "#fbbf24", "#f472b6"]} sparkRadius={34} sparkCount={10} glow={0.5}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
            <button
              type="button"
              style={{
                padding: "10px 24px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.22)",
                background: "rgba(255,255,255,0.06)",
                color: "#e4e4e7",
                fontSize: 14,
              }}
            >
              点我溅射
            </button>
          </div>
        </ClickSpark>
      </div>
    </div>
  );
}

export { Demo, CardPreview };
