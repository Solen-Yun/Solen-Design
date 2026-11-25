import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as HoloCard } from "../../src/components/holo-card/HoloCard.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Move the pointer to sweep the foil light, click the card to flip it. */


const FRONT = "./assets/demo-photos/photo-01.jpg";
const BACK = "./assets/demo-photos/photo-02.jpg";

const DEFAULTS = {
  preset: "bursts",
  intensity: 0.85,
  scale: 1,
  edgeSparkle: 0.8,
  frame: 4,
  glare: 0.5,
  foilColor: "#e2e6ec",
  tiltMax: 14,
  hoverScale: 1.04,
  idle: true,
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

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 440 }}>
            <HoloCard
              image={FRONT}
              backImage={BACK}
              alt="全息闪卡"
              preset={opts.preset}
              intensity={opts.intensity}
              scale={opts.scale}
              edgeSparkle={opts.edgeSparkle}
              frame={opts.frame}
              glare={opts.glare}
              foilColor={opts.foilColor}
              width={260}
              tiltMax={opts.tiltMax}
              hoverScale={opts.hoverScale}
              idle={opts.idle}
              shadow={opts.shadow}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./holo-card-preview.html">
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
          <ControlRow label="箔纹">
            <div className="view-tabs">
              {[["bursts", "星环"], ["stars", "星星"], ["shards", "碎裂"], ["cosmos", "星轨"], ["rainbow", "彩虹"], ["swirl", "射线"], ["glitter", "闪片"], ["gold", "鎏金"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.preset === id ? "active" : undefined} onClick={() => set({ preset: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Color label="箔面基色" value={opts.foilColor} onChange={(foilColor) => set({ foilColor })} />
          <Slider label="箔面强度" value={opts.intensity} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(intensity) => set({ intensity })} />
          <Slider label="纹样缩放" value={opts.scale} min={0.25} max={4} step={0.25} format={(v) => v.toFixed(2)} onChange={(scale) => set({ scale })} />
          <Slider label="闪片强度" value={opts.edgeSparkle} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(edgeSparkle) => set({ edgeSparkle })} />
          <Slider label="边框宽度" value={opts.frame} min={0} max={20} step={1} format={(v) => `${v}%`} onChange={(frame) => set({ frame })} />
          <Slider label="眩光" value={opts.glare} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(glare) => set({ glare })} />
          <Slider label="最大倾角" value={opts.tiltMax} min={0} max={45} step={1} format={(v) => `${v}°`} onChange={(tiltMax) => set({ tiltMax })} />
          <Slider label="悬停放大" value={opts.hoverScale} min={0.8} max={1.3} step={0.01} format={(v) => v.toFixed(2)} onChange={(hoverScale) => set({ hoverScale })} />
          <ControlRow label="闲置流光">
            <Switch checked={opts.idle} onChange={(idle) => set({ idle })} label="闲置流光" />
          </ControlRow>
          <ControlRow label="投影">
            <Switch checked={opts.shadow} onChange={(shadow) => set({ shadow })} label="投影" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — two foil presets resting on the dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 36,
          width: "100%",
          height: 240,
          background: "#101014",
        }}
      >
        <HoloCard image={FRONT} backImage={BACK} alt="全息闪卡" preset="cosmos" width={190} />
        <HoloCard image={FRONT} backImage={BACK} alt="全息闪卡" preset="gold" width={190} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
