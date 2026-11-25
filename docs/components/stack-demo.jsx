import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as Stack } from "../../src/components/stack/Stack.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Card faces are inline gradient tiles with emoji, so nothing is fetched. */

const SUITES = [
  { hue: 262, emoji: "🌙", label: "Moon" },
  { hue: 214, emoji: "🌊", label: "Wave" },
  { hue: 340, emoji: "🍒", label: "Cherry" },
  { hue: 152, emoji: "🌿", label: "Leaf" },
  { hue: 38, emoji: "🍋", label: "Lemon" },
];

const CARDS = SUITES.map(({ hue, emoji, label }, index) => (
  <div
    key={label}
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      width: "100%",
      height: "100%",
      background: `linear-gradient(150deg, hsl(${hue}, 85%, 72%), hsl(${(hue + 30) % 360}, 70%, 42%))`,
      color: "#ffffff",
      fontSize: 44,
    }}
  >
    <span aria-hidden="true">{emoji}</span>
    <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.85 }}>
      {label} · {String(index + 1).padStart(2, "0")}
    </span>
  </div>
));

const DEFAULTS = {
  layout: "fan",
  spread: 0.5,
  depth: 0.5,
  tilt: 30,
  threshold: 90,
  speed: 1,
  autoplay: false,
  sendToBackOnClick: false,
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
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 300 }}>
            <div style={{ width: 230, height: 230 }}>
              <Stack
                cards={CARDS}
                layout={opts.layout}
                spread={opts.spread}
                depth={opts.depth}
                tilt={opts.tilt}
                threshold={opts.threshold}
                speed={opts.speed}
                radius={18}
                autoplay={opts.autoplay}
                autoplayDelay={1600}
                sendToBackOnClick={opts.sendToBackOnClick}
                onChange={(index) => console.log("top", index)}
              />
            </div>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./stack-preview.html">
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
          <ControlRow label="姿态">
            <div className="view-tabs">
              {[["fan", "扇形"], ["cascade", "斜叠"], ["deck", "层叠"], ["pile", "乱堆"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.layout === id ? "active" : ""} onClick={() => set({ layout: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="散布" value={opts.spread} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(spread) => set({ spread })} />
          <Slider label="纵深" value={opts.depth} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(depth) => set({ depth })} />
          <Slider label="倾斜" value={opts.tilt} min={0} max={60} step={1} format={(v) => `${v}°`} onChange={(tilt) => set({ tilt })} />
          <Slider label="甩出阈值" value={opts.threshold} min={20} max={240} step={5} format={(v) => `${v}px`} onChange={(threshold) => set({ threshold })} />
          <Slider label="速度" value={opts.speed} min={0.4} max={2.5} step={0.1} format={(v) => `×${v.toFixed(1)}`} onChange={(speed) => set({ speed })} />
          <ControlRow label="自动播放">
            <Switch checked={opts.autoplay} onChange={(autoplay) => set({ autoplay })} label="自动播放" />
          </ControlRow>
          <ControlRow label="点击换位">
            <Switch checked={opts.sendToBackOnClick} onChange={(sendToBackOnClick) => set({ sendToBackOnClick })} label="点击换位" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the fan resting on a dark stage. */
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
          background: "#101014",
        }}
      >
        <div style={{ width: 150, height: 118 }}>
          <Stack cards={CARDS} layout="fan" spread={0.5} depth={0.5} radius={14} />
        </div>
      </div>
    </div>
  );
}

export { Demo, CardPreview };
