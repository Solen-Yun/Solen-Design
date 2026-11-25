import { useRef, useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as ScrollFloat } from "../../src/components/scroll-float/ScrollFloat.jsx";

/* The demo wires scrollContainerRef to its own scroll box, so the scrub
   works without relying on page scroll: roll the wheel inside the box and
   the heading floats back onto the line as it climbs. */

const EFFECTS = [
  { id: "float", label: "浮层" },
  { id: "wave", label: "波浪" },
  { id: "flip", label: "翻面" },
  { id: "scatter", label: "散落" },
  { id: "blur", label: "模糊" },
];

const ORDERS = [
  { id: "start", label: "从头" },
  { id: "end", label: "从尾" },
  { id: "center", label: "中心" },
  { id: "edges", label: "两侧" },
  { id: "random", label: "随机" },
];

const DEFAULTS = {
  effect: "float",
  splitBy: "chars",
  down: false,
  order: "start",
  stagger: 0.03,
  distance: 120,
  stretch: 2.3,
  animationDuration: 1,
  smoothing: 0,
  colorShift: false,
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
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ width: "100%", padding: "8px 0", color: "#e4e4e7" }}>
            <div
              ref={scrollRef}
              style={{
                width: "100%",
                height: 340,
                overflowY: "auto",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: 14,
                boxSizing: "border-box",
                background: "#16161c",
                color: "#a1a1aa",
                fontSize: 14,
                lineHeight: 2,
                padding: "18px 22px",
              }}
            >
              <p style={{ margin: "0 0 130px", fontWeight: 700, color: "#e4e4e7" }}>在这里滚动滚轮 ↓</p>
              {Array.from({ length: 2 }, (_, i) => (
                <p key={i} style={{ margin: "0 0 130px" }}>
                  第 {i + 1} 段占位文字 — 滚动进度被映射成每个字符的浮层进度，反向滚动会倒放。
                </p>
              ))}
              <div style={{ textAlign: "center" }}>
                <ScrollFloat
                  scrollContainerRef={scrollRef}
                  effect={opts.effect}
                  splitBy={opts.splitBy}
                  direction={opts.down ? "down" : "up"}
                  order={opts.order}
                  fromColor={opts.colorShift ? "#7dd3fc" : "currentColor"}
                  animationDuration={opts.animationDuration}
                  ease="back.inOut(2)"
                  stagger={opts.stagger}
                  distance={opts.distance}
                  stretch={opts.stretch}
                  smoothing={opts.smoothing}
                >
                  浮回原位 FLOAT BACK
                </ScrollFloat>
              </div>
              {Array.from({ length: 3 }, (_, i) => (
                <p key={i} style={{ margin: "120px 0 0" }}>
                  继续滚动把标题推过去，看每个字符落回基线。
                </p>
              ))}
            </div>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./scroll-float-preview.html">
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
          <ControlRow label="浮层方式">
            <div className="view-tabs">
              {EFFECTS.map((item) => (
                <button key={item.id} type="button" className={opts.effect === item.id ? "active" : ""} onClick={() => set({ effect: item.id })}>
                  {item.label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="拆分单元">
            <div className="view-tabs">
              {[
                ["chars", "按字"],
                ["words", "按词"],
              ].map(([id, label]) => (
                <button key={id} type="button" className={opts.splitBy === id ? "active" : ""} onClick={() => set({ splitBy: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="错峰顺序">
            <div className="view-tabs">
              {ORDERS.map((item) => (
                <button key={item.id} type="button" className={opts.order === item.id ? "active" : ""} onClick={() => set({ order: item.id })}>
                  {item.label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="错峰" value={opts.stagger} min={0} max={0.12} step={0.01} format={(v) => `${v.toFixed(2)}s`} onChange={(stagger) => set({ stagger })} />
          <Slider label="距离" value={opts.distance} min={20} max={240} step={10} format={(v) => `${v}px`} onChange={(distance) => set({ distance })} />
          <Slider label="拉伸" value={opts.stretch} min={1} max={4} step={0.1} format={(v) => `${v.toFixed(1)}×`} onChange={(stretch) => set({ stretch })} />
          <Slider label="时长" value={opts.animationDuration} min={0.4} max={2} step={0.1} format={(v) => `${v.toFixed(1)}s`} onChange={(animationDuration) => set({ animationDuration })} />
          <Slider label="平滑追赶" value={opts.smoothing} min={0} max={2} step={0.1} format={(v) => v.toFixed(1)} onChange={(smoothing) => set({ smoothing })} />
          <ControlRow label="从下方来">
            <Switch checked={opts.down} onChange={(down) => set({ down })} label="从下方来" />
          </ControlRow>
          <ControlRow label="起始换色">
            <Switch checked={opts.colorShift} onChange={(colorShift) => set({ colorShift })} label="起始换色" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the float plays as the card scrolls into view. */
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
          padding: "0 20px",
          background: "#101014",
          colorScheme: "dark",
        }}
      >
        <ScrollFloat effect="wave" order="center" distance={90} stagger={0.04} fromColor="#7dd3fc">
          滚动浮层
        </ScrollFloat>
      </div>
    </div>
  );
}

export { Demo, CardPreview };
