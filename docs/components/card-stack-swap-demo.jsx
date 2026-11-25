import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as CardSwap } from "../../src/components/card-stack-swap/CardSwap.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Fling the front card and the deck cycles in the direction you threw it. */
const ITEMS = [
  { title: "Golden hour", icon: "🌇", image: "./assets/demo-photos/photo-01.jpg" },
  { title: "Black beach", icon: "🏖️", image: "./assets/demo-photos/photo-02.jpg" },
  { title: "Steel arches", icon: "🌉", image: "./assets/demo-photos/photo-03.jpg" },
  { title: "Pink drift", icon: "☁️", image: "./assets/demo-photos/photo-04.jpg" },
];

const DEFAULTS = {
  theme: "dark",
  cardDistance: 60,
  verticalDistance: 70,
  depth: 90,
  skewAmount: 6,
  visibleCards: 4,
  delay: 4000,
  autoplay: true,
  pauseOnHover: true,
  draggable: true,
  speed: 1,
  bounce: 0.35,
  parallax: 0.5,
  hoverSpread: 0.12,
  dim: 0.5,
  cardRadius: 18,
  intro: true,
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
  const dark = opts.theme === "dark";

  return (
    <>
      <div className="demo-stage" style={{ background: dark ? "#101014" : "#f2f2f5", colorScheme: dark ? "dark" : "light" }}>
        <DemoFit>
          <div style={{ width: 620, height: 480, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CardSwap
              items={ITEMS}
              theme={opts.theme}
              cardDistance={opts.cardDistance}
              verticalDistance={opts.verticalDistance}
              depth={opts.depth}
              skewAmount={opts.skewAmount}
              visibleCards={opts.visibleCards}
              delay={opts.delay}
              autoplay={opts.autoplay}
              pauseOnHover={opts.pauseOnHover}
              draggable={opts.draggable}
              speed={opts.speed}
              bounce={opts.bounce}
              parallax={opts.parallax}
              hoverSpread={opts.hoverSpread}
              dim={opts.dim}
              cardRadius={opts.cardRadius}
              intro={opts.intro}
              onChange={(index) => console.log("front:", index)}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./card-stack-swap-preview.html">
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
          <ControlRow label="浅色主题">
            <Switch checked={!dark} onChange={(light) => set({ theme: light ? "light" : "dark" })} label="浅色主题" />
          </ControlRow>
          <Slider label="层间横距" value={opts.cardDistance} min={0} max={120} step={2} format={(v) => `${v}px`} onChange={(cardDistance) => set({ cardDistance })} />
          <Slider label="层间纵距" value={opts.verticalDistance} min={0} max={140} step={2} format={(v) => `${v}px`} onChange={(verticalDistance) => set({ verticalDistance })} />
          <Slider label="层间深度" value={opts.depth} min={0} max={200} step={5} format={(v) => `${v}px`} onChange={(depth) => set({ depth })} />
          <Slider label="切变角度" value={opts.skewAmount} min={0} max={15} step={0.5} format={(v) => `${v}°`} onChange={(skewAmount) => set({ skewAmount })} />
          <Slider label="可见层数" value={opts.visibleCards} min={1} max={4} step={1} format={(v) => String(v)} onChange={(visibleCards) => set({ visibleCards })} />
          <Slider label="轮换间隔" value={opts.delay} min={400} max={8000} step={100} format={(v) => `${v}ms`} onChange={(delay) => set({ delay })} />
          <Slider label="速度倍率" value={opts.speed} min={0.1} max={4} step={0.1} format={(v) => v.toFixed(1)} onChange={(speed) => set({ speed })} />
          <Slider label="回弹过冲" value={opts.bounce} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(bounce) => set({ bounce })} />
          <Slider label="光标视差" value={opts.parallax} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(parallax) => set({ parallax })} />
          <Slider label="悬停散开" value={opts.hoverSpread} min={0} max={0.5} step={0.01} format={(v) => v.toFixed(2)} onChange={(hoverSpread) => set({ hoverSpread })} />
          <Slider label="深度压暗" value={opts.dim} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(dim) => set({ dim })} />
          <Slider label="卡片圆角" value={opts.cardRadius} min={0} max={36} step={1} format={(v) => `${v}px`} onChange={(cardRadius) => set({ cardRadius })} />
          <ControlRow label="自动轮换">
            <Switch checked={opts.autoplay} onChange={(autoplay) => set({ autoplay })} label="自动轮换" />
          </ControlRow>
          <ControlRow label="悬停暂停">
            <Switch checked={opts.pauseOnHover} onChange={(pauseOnHover) => set({ pauseOnHover })} label="悬停暂停" />
          </ControlRow>
          <ControlRow label="可拖拽">
            <Switch checked={opts.draggable} onChange={(draggable) => set({ draggable })} label="可拖拽" />
          </ControlRow>
          <ControlRow label="开场动画">
            <Switch checked={opts.intro} onChange={(intro) => set({ intro })} label="开场动画" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the dark deck mid-cycle on a dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 220, background: "#101014", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 480, height: 340 }}>
          <CardSwap items={ITEMS} theme="dark" delay={2600} />
        </div>
      </div>
    </div>
  );
}

export { Demo, CardPreview };
