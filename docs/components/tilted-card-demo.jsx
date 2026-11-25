import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as TiltedCard, TiltedCardLayer } from "../../src/components/tilted-card/TiltedCard.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Click flips to the back face; drag out of a press to see it cancelled. */

const FACE = "./assets/wallpaper-03.jpg";

const DEFAULTS = {
  rotateAmplitude: 12,
  scaleOnHover: 1.05,
  smoothness: 0.6,
  glare: 0.5,
  glareColor: "#ffffff",
  shadow: 0.5,
  parallax: 1,
  axis: "both",
  showTooltip: true,
  floating: false,
  trackWindow: false,
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
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 380 }}>
            <TiltedCard
              imageSrc={FACE}
              altText="夜景插画"
              captionText="点一下翻面"
              containerWidth={300}
              containerHeight={236}
              imageWidth={300}
              imageHeight={236}
              radius={16}
              rotateAmplitude={opts.rotateAmplitude}
              scaleOnHover={opts.scaleOnHover}
              smoothness={opts.smoothness}
              glare={opts.glare}
              glareColor={opts.glareColor}
              shadow={opts.shadow}
              parallax={opts.parallax}
              axis={opts.axis}
              showTooltip={opts.showTooltip}
              floating={opts.floating}
              trackWindow={opts.trackWindow}
              onClick={() => console.log("card clicked")}
              backContent={
                <div style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", background: "#1c1c22" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 34 }}>🌙</div>
                    <p style={{ margin: "8px 0 0", fontSize: 13, color: "#f4f4f5", opacity: 0.7 }}>背面在这里</p>
                  </div>
                </div>
              }
            >
              <TiltedCardLayer depth={40} style={{ display: "flex", alignItems: "flex-end", padding: 18 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: "#ffffff", textShadow: "0 1px 6px rgba(0,0,0,0.6)" }}>悬浮倾斜展示卡</span>
              </TiltedCardLayer>
            </TiltedCard>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./tilted-card-preview.html">
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
          <Slider label="倾斜幅度" value={opts.rotateAmplitude} min={0} max={30} step={1} format={(v) => `${v}deg`} onChange={(rotateAmplitude) => set({ rotateAmplitude })} />
          <Slider label="悬停放大" value={opts.scaleOnHover} min={1} max={1.3} step={0.01} format={(v) => v.toFixed(2)} onChange={(scaleOnHover) => set({ scaleOnHover })} />
          <Slider label="弹簧柔度" value={opts.smoothness} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(smoothness) => set({ smoothness })} />
          <Slider label="眩光" value={opts.glare} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(glare) => set({ glare })} />
          <Color label="眩光色" value={opts.glareColor} onChange={(glareColor) => set({ glareColor })} />
          <Slider label="投影" value={opts.shadow} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(shadow) => set({ shadow })} />
          <Slider label="视差" value={opts.parallax} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(parallax) => set({ parallax })} />
          <ControlRow label="倾斜轴">
            <div className="view-tabs">
              {[["both", "双向"], ["horizontal", "横向"], ["vertical", "纵向"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.axis === id ? "active" : undefined} onClick={() => set({ axis: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="字幕条">
            <Switch checked={opts.showTooltip} onChange={(showTooltip) => set({ showTooltip })} label="字幕条" />
          </ControlRow>
          <ControlRow label="漂浮">
            <Switch checked={opts.floating} onChange={(floating) => set({ floating })} label="漂浮" />
          </ControlRow>
          <ControlRow label="窗口追踪">
            <Switch checked={opts.trackWindow} onChange={(trackWindow) => set({ trackWindow })} label="窗口追踪" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the card caught mid-tilt over the dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 260, background: "#101014" }}>
        <TiltedCard
          imageSrc={FACE}
          altText="夜景插画"
          captionText="悬浮倾斜展示卡"
          containerWidth={240}
          containerHeight={190}
          imageWidth={240}
          imageHeight={190}
          radius={14}
          rotateAmplitude={12}
        />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
