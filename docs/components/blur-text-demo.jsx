import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as BlurText } from "../../src/components/blur-text/BlurText.jsx";

/* The demo keeps the paragraph centered on a quiet stage. Trigger "view"
   fires once on mount; switching to hover/click makes the reveal replay on
   interaction, which is the fastest way to compare the five effects. */

const PRESETS = [
  "Blurring the line between noise and words",
  "聚焦 把噪点 收拢成 句子",
  "Soft focus resolves into crisp type",
];

const DEFAULTS = {
  text: PRESETS[0],
  delay: 200,
  stepDuration: 0.35,
  blur: 10,
  distance: 50,
  effect: "blur",
  direction: "top",
  animateBy: "words",
  staggerFrom: "start",
  trigger: "view",
  loop: false,
  loopDelay: 2,
  focusOnHover: false,
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

function Tabs({ label, options, value, onChange }) {
  return (
    <ControlRow label={label}>
      <div className="view-tabs">
        {options.map(([id, text]) => (
          <button key={id} type="button" className={value === id ? "active" : ""} onClick={() => onChange(id)}>
            {text}
          </button>
        ))}
      </div>
    </ControlRow>
  );
}

function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => setOpts(DEFAULTS);

  return (
    <>
      <div className="demo-stage" style={{ background: "#ffffff", colorScheme: "light" }}>
        <DemoFit>
          <div
            style={{
              width: "min(680px, 92vw)",
              margin: "0 auto",
              padding: "64px 0",
              color: "#18181b",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            <BlurText
              key={`${opts.text}-${opts.effect}-${opts.direction}-${opts.animateBy}-${opts.staggerFrom}-${opts.trigger}`}
              text={opts.text}
              delay={opts.delay}
              stepDuration={opts.stepDuration}
              blur={opts.blur}
              distance={opts.distance}
              effect={opts.effect}
              direction={opts.direction}
              animateBy={opts.animateBy}
              staggerFrom={opts.staggerFrom}
              trigger={opts.trigger}
              loop={opts.loop}
              loopDelay={opts.loopDelay}
              focusOnHover={opts.focusOnHover}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./blur-text-preview.html">
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
          <ControlRow label="文字">
            <div className="view-tabs">
              {PRESETS.map((label, i) => (
                <button key={label} type="button" className={opts.text === label ? "active" : ""} onClick={() => set({ text: PRESETS[i] })}>
                  {`文案 ${i + 1}`}
                </button>
              ))}
            </div>
          </ControlRow>
          <Tabs
            label="效果"
            options={[["blur", "模糊"], ["zoom", "缩放"], ["tilt", "翻转"], ["focus", "聚焦"], ["drift", "漂移"]]}
            value={opts.effect}
            onChange={(effect) => set({ effect })}
          />
          <Tabs
            label="方向"
            options={[["top", "上"], ["bottom", "下"], ["left", "左"], ["right", "右"]]}
            value={opts.direction}
            onChange={(direction) => set({ direction })}
          />
          <Tabs label="粒度" options={[["words", "整词"], ["characters", "单字"]]} value={opts.animateBy} onChange={(animateBy) => set({ animateBy })} />
          <Tabs
            label="错峰"
            options={[["start", "起点"], ["end", "终点"], ["center", "中心"], ["random", "随机"]]}
            value={opts.staggerFrom}
            onChange={(staggerFrom) => set({ staggerFrom })}
          />
          <Tabs
            label="触发"
            options={[["view", "入视口"], ["load", "加载"], ["hover", "悬停"], ["click", "点击"]]}
            value={opts.trigger}
            onChange={(trigger) => set({ trigger })}
          />
          <Slider label="错峰间隔" value={opts.delay} min={0} max={1000} step={20} format={(v) => `${v}ms`} onChange={(delay) => set({ delay })} />
          <Slider label="单步时长" value={opts.stepDuration} min={0.1} max={1} step={0.05} format={(v) => `${v.toFixed(2)}s`} onChange={(stepDuration) => set({ stepDuration })} />
          <Slider label="模糊半径" value={opts.blur} min={0} max={20} step={1} format={(v) => `${v}px`} onChange={(blur) => set({ blur })} />
          <Slider label="行进距离" value={opts.distance} min={0} max={120} step={2} format={(v) => `${v}px`} onChange={(distance) => set({ distance })} />
          <Slider label="循环间隔" value={opts.loopDelay} min={0} max={5} step={0.5} format={(v) => `${v.toFixed(1)}s`} onChange={(loopDelay) => set({ loopDelay })} />
          <ControlRow label="循环">
            <Switch checked={opts.loop} onChange={(loop) => set({ loop })} label="循环" />
          </ControlRow>
          <ControlRow label="悬停聚焦">
            <Switch checked={opts.focusOnHover} onChange={(focusOnHover) => set({ focusOnHover })} label="悬停聚焦" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the drift effect mid-reveal on the light stage. */
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
          background: "#ffffff",
          colorScheme: "light",
          color: "#18181b",
        }}
      >
        <BlurText text="Focus pulls noise into words" delay={140} effect="drift" direction="left" blur={8} distance={40} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
