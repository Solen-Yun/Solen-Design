import { useState } from "react";
import { DemoFit } from "../demo-fit";
import BounceCards from "../../src/components/bounce-cards/BounceCards.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Sweep across the fan to straighten and push cards, then max the
   bounciness and click one for the squash impulse. */


const IMAGES = [
  "./assets/demo-photos/photo-01.jpg",
  "./assets/demo-photos/photo-02.jpg",
  "./assets/demo-photos/photo-03.jpg",
  "./assets/demo-photos/photo-04.jpg",
  "./assets/demo-photos/photo-05.jpg",
];

const DEFAULTS = {
  containerWidth: 400,
  containerHeight: 400,
  cardSize: 200,
  spread: 85,
  rotation: 10,
  arc: 0,
  animationDelay: 0.5,
  animationStagger: 0.06,
  bounciness: 0.6,
  enableHover: true,
  pushDistance: 160,
  hoverScale: 1.06,
  borderWidth: 5,
  borderColor: "#ffffff",
  radius: 25,
  shadow: true,
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
  const [seed, setSeed] = useState(0);

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, width: "100%", minHeight: 420 }}>
            <button
              type="button"
              onClick={() => setSeed((n) => n + 1)}
              style={{
                padding: "6px 14px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.2)",
                background: "transparent",
                color: "#e4e4e7",
                font: "inherit",
                cursor: "pointer",
              }}
            >
              重播入场
            </button>
            <BounceCards
              key={seed}
              images={IMAGES}
              containerWidth={opts.containerWidth}
              containerHeight={opts.containerHeight}
              cardSize={opts.cardSize}
              spread={opts.spread}
              rotation={opts.rotation}
              arc={opts.arc}
              animationDelay={opts.animationDelay}
              animationStagger={opts.animationStagger}
              bounciness={opts.bounciness}
              enableHover={opts.enableHover}
              pushDistance={opts.pushDistance}
              hoverScale={opts.hoverScale}
              borderWidth={opts.borderWidth}
              borderColor={opts.borderColor}
              radius={opts.radius}
              shadow={opts.shadow}
              onCardClick={(index) => console.log("card", index)}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./bounce-cards-preview.html">
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
          <Slider label="卡边长" value={opts.cardSize} min={100} max={260} step={10} format={(v) => `${v}px`} onChange={(cardSize) => set({ cardSize })} />
          <Slider label="散布" value={opts.spread} min={20} max={160} step={5} format={(v) => `${v}px`} onChange={(spread) => set({ spread })} />
          <Slider label="倾角" value={opts.rotation} min={0} max={30} step={1} format={(v) => `${v}°`} onChange={(rotation) => set({ rotation })} />
          <Slider label="弧度" value={opts.arc} min={-120} max={120} step={5} format={(v) => `${v}px`} onChange={(arc) => set({ arc })} />
          <Slider label="入场延迟" value={opts.animationDelay} min={0} max={2} step={0.1} format={(v) => `${v.toFixed(1)}s`} onChange={(animationDelay) => set({ animationDelay })} />
          <Slider label="逐张间隔" value={opts.animationStagger} min={0} max={0.3} step={0.02} format={(v) => `${v.toFixed(2)}s`} onChange={(animationStagger) => set({ animationStagger })} />
          <Slider label="回弹" value={opts.bounciness} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(bounciness) => set({ bounciness })} />
          <Slider label="逃开距离" value={opts.pushDistance} min={0} max={280} step={10} format={(v) => `${v}px`} onChange={(pushDistance) => set({ pushDistance })} />
          <Slider label="悬停缩放" value={opts.hoverScale} min={0.8} max={1.6} step={0.02} format={(v) => `×${v.toFixed(2)}`} onChange={(hoverScale) => set({ hoverScale })} />
          <Slider label="框厚" value={opts.borderWidth} min={0} max={16} step={1} format={(v) => `${v}px`} onChange={(borderWidth) => set({ borderWidth })} />
          <Slider label="圆角" value={opts.radius} min={0} max={80} step={1} format={(v) => `${v}px`} onChange={(radius) => set({ radius })} />
          <Color label="相框色" value={opts.borderColor} onChange={(borderColor) => set({ borderColor })} />
          <ControlRow label="悬停交互">
            <Switch checked={opts.enableHover} onChange={(enableHover) => set({ enableHover })} label="悬停交互" />
          </ControlRow>
          <ControlRow label="投影">
            <Switch checked={opts.shadow} onChange={(shadow) => set({ shadow })} label="投影" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the fan settled mid-spread on the dark stage. */
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
        <BounceCards
          images={IMAGES}
          containerWidth={360}
          containerHeight={170}
          cardSize={100}
          spread={52}
          rotation={9}
          animationDelay={0.1}
          animationStagger={0.05}
          borderWidth={3}
          radius={14}
        />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
