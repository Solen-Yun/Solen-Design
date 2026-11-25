import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as MagicBento } from "../../src/components/magic-bento/MagicBento.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Glide the pointer along the grid edge for the border light; click a card
   for the wave + artwork replay. */

const DEFAULTS = {
  theme: "dark",
  glowColor: "#c4b5fd",
  columns: 4,
  rowHeight: 200,
  gap: 12,
  radius: 20,
  spotlightRadius: 300,
  enableSpotlight: true,
  enableBorderGlow: true,
  enableStars: false,
  particleCount: 24,
  enableTilt: false,
  enableMagnetism: false,
  clickEffect: true,
  textAutoHide: true,
  intro: true,
  disableAnimations: false,
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
          <div style={{ width: "100%", height: 460 }}>
            <MagicBento
              theme={opts.theme}
              glowColor={opts.glowColor}
              columns={opts.columns}
              rowHeight={opts.rowHeight}
              gap={opts.gap}
              radius={opts.radius}
              spotlightRadius={opts.spotlightRadius}
              enableSpotlight={opts.enableSpotlight}
              enableBorderGlow={opts.enableBorderGlow}
              enableStars={opts.enableStars}
              particleCount={opts.particleCount}
              enableTilt={opts.enableTilt}
              enableMagnetism={opts.enableMagnetism}
              clickEffect={opts.clickEffect}
              textAutoHide={opts.textAutoHide}
              intro={opts.intro}
              disableAnimations={opts.disableAnimations}
              onItemClick={(item, index) => console.log(index, item.title)}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./magic-bento-preview.html">
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
          <Color label="强调色" value={opts.glowColor} onChange={(glowColor) => set({ glowColor })} />
          <ControlRow label="浅色主题">
            <Switch checked={opts.theme === "light"} onChange={(light) => set({ theme: light ? "light" : "dark" })} label="浅色主题" />
          </ControlRow>
          <ControlRow label="列数">
            <div className="view-tabs">
              {[2, 3, 4].map((count) => (
                <button key={count} type="button" className={opts.columns === count ? "active" : ""} onClick={() => set({ columns: count })}>
                  {count}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="行高" value={opts.rowHeight} min={140} max={280} step={10} format={(v) => `${v}px`} onChange={(rowHeight) => set({ rowHeight })} />
          <Slider label="间距" value={opts.gap} min={0} max={32} step={2} format={(v) => `${v}px`} onChange={(gap) => set({ gap })} />
          <Slider label="圆角" value={opts.radius} min={0} max={36} step={2} format={(v) => `${v}px`} onChange={(radius) => set({ radius })} />
          <Slider label="聚光半径" value={opts.spotlightRadius} min={80} max={600} step={20} format={(v) => `${v}px`} onChange={(spotlightRadius) => set({ spotlightRadius })} />
          <Slider label="星尘数" value={opts.particleCount} min={0} max={120} step={4} format={(v) => String(v)} onChange={(particleCount) => set({ particleCount })} />
          <ControlRow label="卡内聚光">
            <Switch checked={opts.enableSpotlight} onChange={(enableSpotlight) => set({ enableSpotlight })} label="卡内聚光" />
          </ControlRow>
          <ControlRow label="边框流光">
            <Switch checked={opts.enableBorderGlow} onChange={(enableBorderGlow) => set({ enableBorderGlow })} label="边框流光" />
          </ControlRow>
          <ControlRow label="星尘">
            <Switch checked={opts.enableStars} onChange={(enableStars) => set({ enableStars })} label="星尘" />
          </ControlRow>
          <ControlRow label="倾斜">
            <Switch checked={opts.enableTilt} onChange={(enableTilt) => set({ enableTilt })} label="倾斜" />
          </ControlRow>
          <ControlRow label="磁吸">
            <Switch checked={opts.enableMagnetism} onChange={(enableMagnetism) => set({ enableMagnetism })} label="磁吸" />
          </ControlRow>
          <ControlRow label="点击光波">
            <Switch checked={opts.clickEffect} onChange={(clickEffect) => set({ clickEffect })} label="点击光波" />
          </ControlRow>
          <ControlRow label="文字截断">
            <Switch checked={opts.textAutoHide} onChange={(textAutoHide) => set({ textAutoHide })} label="文字截断" />
          </ControlRow>
          <ControlRow label="入场动画">
            <Switch checked={opts.intro} onChange={(intro) => set({ intro })} label="入场动画" />
          </ControlRow>
          <ControlRow label="关闭动效">
            <Switch checked={opts.disableAnimations} onChange={(disableAnimations) => set({ disableAnimations })} label="关闭动效" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the seeded dark grid resting on the dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 340, background: "#101014", overflow: "hidden", padding: 12 }}>
        <MagicBento columns={4} rowHeight={150} gap={10} intro={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
