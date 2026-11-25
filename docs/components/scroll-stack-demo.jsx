import { useState } from "react";
import { DemoFit } from "../demo-fit";
import ScrollStack, { ScrollStackItem } from "../../src/components/scroll-stack/ScrollStack.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Scroll inside the stage: cards pin one by one and settle into the deck. */

const DEFAULTS = {
  itemDistance: 100,
  itemStackDistance: 24,
  stackPosition: "15%",
  itemScale: 0.05,
  baseScale: 0.8,
  dimAmount: 0.2,
  blurAmount: 0,
  tiltAmount: 0,
  rotationAmount: 0,
  holdDistance: 200,
  snap: false,
  smoothScroll: true,
};

const CARDS = [
  { emoji: "🃏", title: "第一张", hue: "linear-gradient(135deg, #667eea33, #764ba266)" },
  { emoji: "🎴", title: "第二张", hue: "linear-gradient(135deg, #f093fb33, #f5576c4d)" },
  { emoji: "🀄", title: "第三张", hue: "linear-gradient(135deg, #4facfe33, #00f2fe4d)" },
  { emoji: "🪙", title: "第四张", hue: "linear-gradient(135deg, #43e97b33, #38f9d74d)" },
];

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
          <div
            style={{
              width: "100%",
              height: 360,
              borderRadius: 16,
              overflow: "hidden",
              background: "#18181b",
            }}
          >
            <ScrollStack
              itemDistance={opts.itemDistance}
              itemStackDistance={opts.itemStackDistance}
              stackPosition={opts.stackPosition}
              itemScale={opts.itemScale}
              baseScale={opts.baseScale}
              dimAmount={opts.dimAmount}
              blurAmount={opts.blurAmount}
              tiltAmount={opts.tiltAmount}
              rotationAmount={opts.rotationAmount}
              holdDistance={opts.holdDistance}
              snap={opts.snap}
              smoothScroll={opts.smoothScroll}
            >
              {CARDS.map((card) => (
                <ScrollStackItem key={card.title} style={{ backgroundImage: card.hue, backgroundBlendMode: "overlay" }}>
                  <div style={{ fontSize: 40 }}>{card.emoji}</div>
                  <h3 style={{ margin: "12px 0 0", fontSize: 18, fontWeight: 600 }}>{card.title}</h3>
                  <p style={{ margin: "8px 0 0", fontSize: 13, opacity: 0.65 }}>滚上来就钉住，等下一张盖住</p>
                </ScrollStackItem>
              ))}
            </ScrollStack>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./scroll-stack-preview.html">
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
          <Slider label="滚动间距" value={opts.itemDistance} min={40} max={300} step={10} format={(v) => `${v}px`} onChange={(itemDistance) => set({ itemDistance })} />
          <Slider label="露出偏移" value={opts.itemStackDistance} min={0} max={80} step={2} format={(v) => `${v}px`} onChange={(itemStackDistance) => set({ itemStackDistance })} />
          <Slider label="钉住位置" value={parseFloat(opts.stackPosition)} min={0} max={40} step={1} format={(v) => `${v}%`} onChange={(v) => set({ stackPosition: `${v}%` })} />
          <Slider label="每层缩小" value={opts.itemScale} min={0} max={0.15} step={0.01} format={(v) => v.toFixed(2)} onChange={(itemScale) => set({ itemScale })} />
          <Slider label="缩放下限" value={opts.baseScale} min={0.5} max={1} step={0.02} format={(v) => v.toFixed(2)} onChange={(baseScale) => set({ baseScale })} />
          <Slider label="压暗" value={opts.dimAmount} min={0} max={0.8} step={0.05} format={(v) => v.toFixed(2)} onChange={(dimAmount) => set({ dimAmount })} />
          <Slider label="模糊" value={opts.blurAmount} min={0} max={8} step={0.5} format={(v) => `${v}px`} onChange={(blurAmount) => set({ blurAmount })} />
          <Slider label="倾斜" value={opts.tiltAmount} min={0} max={20} step={1} format={(v) => `${v}deg`} onChange={(tiltAmount) => set({ tiltAmount })} />
          <Slider label="旋转" value={opts.rotationAmount} min={0} max={12} step={0.5} format={(v) => `${v}deg`} onChange={(rotationAmount) => set({ rotationAmount })} />
          <Slider label="停留距离" value={opts.holdDistance} min={0} max={600} step={20} format={(v) => `${v}px`} onChange={(holdDistance) => set({ holdDistance })} />
          <ControlRow label="吸附">
            <Switch checked={opts.snap} onChange={(snap) => set({ snap })} label="吸附" />
          </ControlRow>
          <ControlRow label="惯性滑行">
            <Switch checked={opts.smoothScroll} onChange={(smoothScroll) => set({ smoothScroll })} label="惯性滑行" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the deck mid-stack inside a dark frame. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 300, background: "#18181b", overflow: "hidden", borderRadius: 12 }}>
        <ScrollStack itemDistance={90} holdDistance={120}>
          {CARDS.map((card) => (
            <ScrollStackItem key={card.title} style={{ backgroundImage: card.hue, backgroundBlendMode: "overlay", height: "14rem" }}>
              <div style={{ fontSize: 34 }}>{card.emoji}</div>
              <h3 style={{ margin: "10px 0 0", fontSize: 16, fontWeight: 600 }}>{card.title}</h3>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </div>
  );
}

export { Demo, CardPreview };
