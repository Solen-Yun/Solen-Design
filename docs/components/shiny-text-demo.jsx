import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as ShinyText } from "../../src/components/shiny-text/ShinyText.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Widen the band, stack trailing bands and glow for a chrome look, or
   switch on pointer follow so the sheen sticks to the cursor. */

const EASINGS = [
  { id: "linear", label: "匀速" },
  { id: "smooth", label: "平滑" },
  { id: "snappy", label: "利落" },
];

const TRIGGERS = [
  { id: "loop", label: "循环" },
  { id: "hover", label: "悬停" },
  { id: "view", label: "首见" },
];

const DEFAULTS = {
  color: "#b5b5b5",
  shineColor: "#ffffff",
  speed: 2,
  delay: 0,
  angle: 120,
  shineWidth: 40,
  softness: 0.8,
  bands: 1,
  glow: 0,
  right: false,
  easing: "smooth",
  trigger: "loop",
  yoyo: false,
  followPointer: false,
  pauseOnHover: false,
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: 220,
            }}
          >
            <ShinyText
              text="Shiny Text 流光"
              color={opts.color}
              shineColor={opts.shineColor}
              speed={opts.speed}
              delay={opts.delay}
              angle={opts.angle}
              shineWidth={opts.shineWidth}
              softness={opts.softness}
              bands={opts.bands}
              glow={opts.glow}
              direction={opts.right ? "right" : "left"}
              easing={opts.easing}
              trigger={opts.trigger}
              yoyo={opts.yoyo}
              followPointer={opts.followPointer}
              pauseOnHover={opts.pauseOnHover}
              style={{ fontSize: 56, fontWeight: 800, letterSpacing: "0.04em" }}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./shiny-text-preview.html">
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
          <Color label="底色" value={opts.color} onChange={(color) => set({ color })} />
          <Color label="高光色" value={opts.shineColor} onChange={(shineColor) => set({ shineColor })} />
          <Slider label="速度" value={opts.speed} min={0.5} max={6} step={0.1} format={(v) => `${v.toFixed(1)}s`} onChange={(speed) => set({ speed })} />
          <Slider label="间隔" value={opts.delay} min={0} max={3} step={0.1} format={(v) => `${v.toFixed(1)}s`} onChange={(delay) => set({ delay })} />
          <Slider label="角度" value={opts.angle} min={0} max={360} step={5} format={(v) => `${v}°`} onChange={(angle) => set({ angle })} />
          <Slider label="光带宽度" value={opts.shineWidth} min={10} max={120} step={2} format={(v) => `${v}%`} onChange={(shineWidth) => set({ shineWidth })} />
          <Slider label="柔边" value={opts.softness} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(softness) => set({ softness })} />
          <Slider label="辉光" value={opts.glow} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(glow) => set({ glow })} />
          <ControlRow label="拖尾条数">
            <div className="view-tabs">
              {[1, 2, 3].map((n) => (
                <button key={n} type="button" className={opts.bands === n ? "active" : ""} onClick={() => set({ bands: n })}>
                  {n}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="缓动">
            <div className="view-tabs">
              {EASINGS.map((item) => (
                <button key={item.id} type="button" className={opts.easing === item.id ? "active" : ""} onClick={() => set({ easing: item.id })}>
                  {item.label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="触发">
            <div className="view-tabs">
              {TRIGGERS.map((item) => (
                <button key={item.id} type="button" className={opts.trigger === item.id ? "active" : ""} onClick={() => set({ trigger: item.id })}>
                  {item.label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="向右扫">
            <Switch checked={opts.right} onChange={(right) => set({ right })} label="向右扫" />
          </ControlRow>
          <ControlRow label="往返交替">
            <Switch checked={opts.yoyo} onChange={(yoyo) => set({ yoyo })} label="往返交替" />
          </ControlRow>
          <ControlRow label="指针跟随">
            <Switch checked={opts.followPointer} onChange={(followPointer) => set({ followPointer })} label="指针跟随" />
          </ControlRow>
          <ControlRow label="悬停暂停">
            <Switch checked={opts.pauseOnHover} onChange={(pauseOnHover) => set({ pauseOnHover })} label="悬停暂停" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — a chrome headline with two trailing bands and glow. */
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
          colorScheme: "dark",
        }}
      >
        <ShinyText
          text="CHROME SHEEN"
          color="#8f8fa3"
          shineColor="#ffffff"
          speed={3}
          bands={2}
          glow={0.45}
          style={{ fontSize: 34, fontWeight: 800, letterSpacing: "0.06em" }}
        />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
