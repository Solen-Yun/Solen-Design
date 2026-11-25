import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as MorphSlider } from "../../src/components/morph-slider/MorphSlider.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Drag the stage to scrub the morph; buttons, dots and arrows all work. */


const ITEMS = [
  { image: "./assets/demo-photos/photo-01.jpg", caption: "浪" },
  { image: "./assets/demo-photos/photo-02.jpg", caption: "轨" },
  { image: "./assets/demo-photos/photo-03.jpg", caption: "烬" },
  { image: "./assets/demo-photos/photo-04.jpg", caption: "苔" },
];

const DEFAULTS = {
  transition: "melt",
  duration: 1.1,
  intensity: 0.55,
  scale: 2.4,
  aberration: 0.35,
  drift: 0.4,
  autoplay: false,
  autoplayDelay: 4,
  loop: true,
  radius: 16,
  overlayColor: "#000000",
  showCaptions: true,
  showControls: true,
  showIndicators: true,
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
          <div style={{ width: "100%", height: 400 }}>
            <MorphSlider
              items={ITEMS}
              transition={opts.transition}
              duration={opts.duration}
              intensity={opts.intensity}
              scale={opts.scale}
              aberration={opts.aberration}
              drift={opts.drift}
              autoplay={opts.autoplay}
              autoplayDelay={opts.autoplayDelay}
              loop={opts.loop}
              radius={opts.radius}
              overlayColor={opts.overlayColor}
              showCaptions={opts.showCaptions}
              showControls={opts.showControls}
              showIndicators={opts.showIndicators}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./morph-slider-preview.html">
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
          <ControlRow label="过渡场">
            <div className="view-tabs">
              {[["melt", "熔接"], ["ripple", "涟漪"], ["shear", "错位"], ["swirl", "旋涡"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.transition === id ? "active" : undefined} onClick={() => set({ transition: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="时长" value={opts.duration} min={0.4} max={2.4} step={0.1} format={(v) => `${v.toFixed(1)}s`} onChange={(duration) => set({ duration })} />
          <Slider label="强度" value={opts.intensity} min={0} max={1.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(intensity) => set({ intensity })} />
          <Slider label="噪声频率" value={opts.scale} min={0.5} max={6} step={0.1} format={(v) => v.toFixed(1)} onChange={(scale) => set({ scale })} />
          <Slider label="色散" value={opts.aberration} min={0} max={1.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(aberration) => set({ aberration })} />
          <Slider label="呼吸漂移" value={opts.drift} min={0} max={2} step={0.1} format={(v) => v.toFixed(1)} onChange={(drift) => set({ drift })} />
          <Color label="渐晕色" value={opts.overlayColor} onChange={(overlayColor) => set({ overlayColor })} />
          <Slider label="自动间隔" value={opts.autoplayDelay} min={1} max={10} step={1} format={(v) => `${v}s`} onChange={(autoplayDelay) => set({ autoplayDelay })} />
          <ControlRow label="自动播放">
            <Switch checked={opts.autoplay} onChange={(autoplay) => set({ autoplay })} label="自动播放" />
          </ControlRow>
          <ControlRow label="首尾循环">
            <Switch checked={opts.loop} onChange={(loop) => set({ loop })} label="首尾循环" />
          </ControlRow>
          <ControlRow label="字幕">
            <Switch checked={opts.showCaptions} onChange={(showCaptions) => set({ showCaptions })} label="字幕" />
          </ControlRow>
          <ControlRow label="前后按钮">
            <Switch checked={opts.showControls} onChange={(showControls) => set({ showControls })} label="前后按钮" />
          </ControlRow>
          <ControlRow label="圆点指示">
            <Switch checked={opts.showIndicators} onChange={(showIndicators) => set({ showIndicators })} label="圆点指示" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — one quiet melt transition on the dark canvas. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 250, background: "#101014" }}>
        <MorphSlider items={ITEMS} transition="melt" duration={1.2} radius={0} showControls={false} showIndicators={true} showCaptions={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
