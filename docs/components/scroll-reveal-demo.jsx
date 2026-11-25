import { useRef, useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as ScrollReveal } from "../../src/components/scroll-reveal/ScrollReveal.jsx";

/* The demo wires scrollContainerRef to its own scroll box, so the scrub
   works without relying on page scroll: roll the wheel inside the box and
   the heading below unblurs, rises and straightens as it climbs. */

const EFFECTS = [
  { id: "fade", label: "淡入" },
  { id: "rise", label: "上浮" },
  { id: "flip", label: "翻转" },
  { id: "scale", label: "缩放" },
];

const SPLITS = [
  { id: "words", label: "按词" },
  { id: "chars", label: "按字" },
  { id: "lines", label: "按行" },
];

const DEFAULTS = {
  effect: "rise",
  splitBy: "chars",
  mode: "scrub",
  stagger: 0.05,
  baseOpacity: 0.1,
  blurStrength: 4,
  enableBlur: true,
  baseRotation: 3,
  baseOffset: 0,
  smoothing: 0,
  duration: 0.8,
  highlight: false,
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
                height: 320,
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
              <p style={{ margin: "0 0 14px", fontWeight: 700, color: "#e4e4e7" }}>在这里滚动滚轮 ↓</p>
              {Array.from({ length: 3 }, (_, i) => (
                <p key={i} style={{ margin: "0 0 120px" }}>
                  第 {i + 1} 段占位文字 — 滚动进度被映射成每一段文字的显影进度，反向滚动会倒放。
                </p>
              ))}
              <ScrollReveal
                scrollContainerRef={scrollRef}
                effect={opts.effect}
                splitBy={opts.splitBy}
                mode={opts.mode}
                stagger={opts.stagger}
                baseOpacity={opts.baseOpacity}
                blurStrength={opts.blurStrength}
                enableBlur={opts.enableBlur}
                baseRotation={opts.baseRotation}
                baseOffset={opts.baseOffset}
                smoothing={opts.smoothing}
                duration={opts.duration}
                highlightColor={opts.highlight ? "#ffb03d" : ""}
              >
                文字从模糊中显影 words settle into focus
              </ScrollReveal>
              {Array.from({ length: 3 }, (_, i) => (
                <p key={i} style={{ margin: "110px 0 0" }}>
                  继续滚动把标题推过去，再看它回正、上色、落定。
                </p>
              ))}
            </div>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./scroll-reveal-preview.html">
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
          <ControlRow label="入场方式">
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
              {SPLITS.map((item) => (
                <button key={item.id} type="button" className={opts.splitBy === item.id ? "active" : ""} onClick={() => set({ splitBy: item.id })}>
                  {item.label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="驱动方式">
            <div className="view-tabs">
              {[
                ["scrub", "洗刷"],
                ["enter", "进入播放"],
              ].map(([id, label]) => (
                <button key={id} type="button" className={opts.mode === id ? "active" : ""} onClick={() => set({ mode: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="错峰间隔" value={opts.stagger} min={0} max={0.15} step={0.01} format={(v) => v.toFixed(2)} onChange={(stagger) => set({ stagger })} />
          <Slider label="起始透明度" value={opts.baseOpacity} min={0} max={0.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(baseOpacity) => set({ baseOpacity })} />
          <Slider label="模糊强度" value={opts.blurStrength} min={0} max={12} step={1} format={(v) => `${v}px`} onChange={(blurStrength) => set({ blurStrength })} />
          <Slider label="起始旋转" value={opts.baseRotation} min={0} max={10} step={1} format={(v) => `${v}°`} onChange={(baseRotation) => set({ baseRotation })} />
          <Slider label="起始下移" value={opts.baseOffset} min={0} max={40} step={2} format={(v) => `${v}px`} onChange={(baseOffset) => set({ baseOffset })} />
          <Slider label="平滑追赶" value={opts.smoothing} min={0} max={2} step={0.1} format={(v) => v.toFixed(1)} onChange={(smoothing) => set({ smoothing })} />
          <Slider label="时长（enter）" value={opts.duration} min={0.3} max={2} step={0.1} format={(v) => `${v.toFixed(1)}s`} onChange={(duration) => set({ duration })} />
          <ControlRow label="启用模糊">
            <Switch checked={opts.enableBlur} onChange={(enableBlur) => set({ enableBlur })} label="启用模糊" />
          </ControlRow>
          <ControlRow label="中途高光">
            <Switch checked={opts.highlight} onChange={(highlight) => set({ highlight })} label="中途高光" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the reveal plays once as the card scrolls into view. */
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
        <ScrollReveal effect="rise" splitBy="chars" mode="enter" duration={0.5} stagger={0.06} baseRotation={0} highlightColor="#7dd3fc">
          滚动显影
        </ScrollReveal>
      </div>
    </div>
  );
}

export { Demo, CardPreview };
