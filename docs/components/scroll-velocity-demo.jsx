import { useRef, useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as ScrollVelocity } from "../../src/components/scroll-velocity/ScrollVelocity.jsx";

/* The demo wires scrollContainerRef to its own scroll box, so the
   velocity coupling works without relying on page scroll: roll the wheel
   inside the box and the marquee above speeds up or reverses. */

const DEFAULTS = {
  velocity: 100,
  separator: "",
  pauseOnHover: false,
  fadeEdges: false,
  outlineAlternate: false,
  draggable: false,
  skewWithVelocity: 0,
  scaleWithVelocity: 0,
  gap: 0,
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
  const scrollRef = useRef(null);

  return (
    <>
      <div className="demo-stage" style={{ background: "#ffffff", colorScheme: "light" }}>
        <DemoFit>
          <div style={{ width: "100%", padding: "28px 0" }}>
            <ScrollVelocity
              texts={["滚动加速 SCROLL", "逆行掉头 REVERSE"]}
              scrollContainerRef={scrollRef}
              velocity={opts.velocity}
              separator={opts.separator}
              gap={opts.gap}
              pauseOnHover={opts.pauseOnHover}
              fadeEdges={opts.fadeEdges}
              outlineAlternate={opts.outlineAlternate}
              draggable={opts.draggable}
              skewWithVelocity={opts.skewWithVelocity}
              scaleWithVelocity={opts.scaleWithVelocity}
              color="#18181b"
              fontSize={44}
              fontWeight={800}
            />
            <div
              ref={scrollRef}
              style={{
                width: "100%",
                height: 190,
                marginTop: 24,
                overflowY: "auto",
                border: "1px solid rgba(0, 0, 0, 0.08)",
                borderRadius: 14,
                boxSizing: "border-box",
                background: "#fafafa",
                color: "#71717a",
                fontSize: 14,
                lineHeight: 2,
                padding: "16px 20px",
              }}
            >
              <p style={{ margin: "0 0 10px", fontWeight: 700, color: "#18181b" }}>在这里滚动滚轮 ↓</p>
              {Array.from({ length: 8 }, (_, i) => (
                <p key={i} style={{ margin: 0 }}>
                  第 {i + 1} 行 — 滚动速度被弹簧平滑后映射成跑马灯的速度倍率，顺滚加速、逆滚掉头。
                </p>
              ))}
            </div>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./scroll-velocity-preview.html">
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
          <ControlRow label="分隔符">
            <input
              type="text"
              value={opts.separator}
              placeholder="如 ✦"
              onChange={(event) => set({ separator: event.target.value.slice(0, 4) })}
              aria-label="分隔符"
              style={{ width: 96, height: 34, padding: "0 10px", border: "1px solid rgba(0,0,0,0.14)", borderRadius: 8, fontSize: 14 }}
            />
          </ControlRow>
          <Slider label="基础速度" value={opts.velocity} min={10} max={300} step={10} format={(v) => `${v}px/s`} onChange={(velocity) => set({ velocity })} />
          <Slider label="间距" value={opts.gap} min={0} max={80} step={2} format={(v) => `${v}px`} onChange={(gap) => set({ gap })} />
          <Slider label="速度倾斜" value={opts.skewWithVelocity} min={0} max={30} step={1} format={(v) => `${v}°`} onChange={(skewWithVelocity) => set({ skewWithVelocity })} />
          <Slider label="速度拉伸" value={opts.scaleWithVelocity} min={0} max={0.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(scaleWithVelocity) => set({ scaleWithVelocity })} />
          <ControlRow label="悬停暂停">
            <Switch checked={opts.pauseOnHover} onChange={(pauseOnHover) => set({ pauseOnHover })} label="悬停暂停" />
          </ControlRow>
          <ControlRow label="两侧渐隐">
            <Switch checked={opts.fadeEdges} onChange={(fadeEdges) => set({ fadeEdges })} label="两侧渐隐" />
          </ControlRow>
          <ControlRow label="奇数行空心">
            <Switch checked={opts.outlineAlternate} onChange={(outlineAlternate) => set({ outlineAlternate })} label="奇数行空心" />
          </ControlRow>
          <ControlRow label="可拖拽">
            <Switch checked={opts.draggable} onChange={(draggable) => set({ draggable })} label="可拖拽" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — two outline-outline rows crawling on the dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 170, background: "#101014", colorScheme: "dark" }}>
        <ScrollVelocity
          texts={["VELOCITY", "SCROLL"]}
          velocity={60}
          separator="✦"
          outlineAlternate
          color="#e4e4e7"
          fontSize={40}
          fontWeight={800}
        />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
