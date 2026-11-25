import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as AnimatedList } from "../../src/components/animated-list/AnimatedList.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Icons are inline emoji spans so nothing external is fetched. */

const ICONS = ["📁", "🖼️", "🎬", "📝", "💻", "🎨", "🎵", "📊", "📕", "📽️", "🗜️", "🌇", "📄", "🗄️", "🎞️"];

const ITEMS = Array.from({ length: 15 }, (_, index) => ({
  id: `file-${index}`,
  icon: <span style={{ fontSize: 18, lineHeight: 1 }}>{ICONS[index % ICONS.length]}</span>,
  title: ["Brand assets", "Launch hero.png", "Product tour.mp4", "Pricing notes", "landing-page.tsx", "Onboarding flow", "Ambient loop.wav", "Q3 forecast", "Brand guidelines.pdf", "Investor update", "Icon set.zip", "Moodboard.jpg", "Release notes", "Archive", "Teaser cut.mov"][index],
  description: ["24 files", "2.4 MB", "148 MB", "1,240 words", "12 KB", "38 frames", "9.1 MB", "4 sheets", "6.8 MB", "22 slides", "1.2 MB", "3.6 MB", "Version 2.4", "118 files", "86 MB"][index],
  meta: ["2m", "18m", "1h", "3h", "5h", "8h", "1d", "1d", "2d", "3d", "4d", "5d", "1w", "2w", "3w"][index],
}));

const DEFAULTS = {
  theme: "dark",
  animation: "pop",
  accentColor: "#f4f4f5",
  stagger: 0.05,
  fadeSize: 56,
  gap: 8,
  radius: 14,
  maxHeight: 300,
  frame: true,
  selectOnHover: true,
  enableArrowNavigation: true,
  animateOnce: false,
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
      <div className="demo-stage" style={{ background: opts.theme === "dark" ? "#101014" : "#eef0f4", colorScheme: opts.theme }}>
        <DemoFit>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 360 }}>
            <AnimatedList
              items={ITEMS}
              theme={opts.theme}
              animation={opts.animation}
              accentColor={opts.accentColor}
              stagger={opts.stagger}
              fadeSize={opts.fadeSize}
              gap={opts.gap}
              radius={opts.radius}
              maxHeight={opts.maxHeight}
              frame={opts.frame}
              selectOnHover={opts.selectOnHover}
              enableArrowNavigation={opts.enableArrowNavigation}
              animateOnce={opts.animateOnce}
              onItemSelect={(item, index) => console.log(index, item.title)}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./animated-list-preview.html">
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
          <ControlRow label="主题">
            <div className="view-tabs">
              {[["dark", "深色"], ["light", "浅色"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.theme === id ? "active" : ""} onClick={() => set({ theme: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="入场方式">
            <div className="view-tabs">
              {[["pop", "弹入"], ["slide", "滑入"], ["fade", "淡入"], ["none", "无"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.animation === id ? "active" : ""} onClick={() => set({ animation: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Color label="强调色" value={opts.accentColor} onChange={(accentColor) => set({ accentColor })} />
          <Slider label="级联间隔" value={opts.stagger} min={0} max={0.15} step={0.01} format={(v) => `${v.toFixed(2)}s`} onChange={(stagger) => set({ stagger })} />
          <Slider label="渐隐跨度" value={opts.fadeSize} min={0} max={120} step={4} format={(v) => `${v}px`} onChange={(fadeSize) => set({ fadeSize })} />
          <Slider label="行间距" value={opts.gap} min={2} max={20} step={1} format={(v) => `${v}px`} onChange={(gap) => set({ gap })} />
          <Slider label="行圆角" value={opts.radius} min={4} max={24} step={1} format={(v) => `${v}px`} onChange={(radius) => set({ radius })} />
          <Slider label="视口高度" value={opts.maxHeight} min={200} max={440} step={10} format={(v) => `${v}px`} onChange={(maxHeight) => set({ maxHeight })} />
          <ControlRow label="毛玻璃外框">
            <Switch checked={opts.frame} onChange={(frame) => set({ frame })} label="毛玻璃外框" />
          </ControlRow>
          <ControlRow label="悬停选中">
            <Switch checked={opts.selectOnHover} onChange={(selectOnHover) => set({ selectOnHover })} label="悬停选中" />
          </ControlRow>
          <ControlRow label="方向键导航">
            <Switch checked={opts.enableArrowNavigation} onChange={(enableArrowNavigation) => set({ enableArrowNavigation })} label="方向键导航" />
          </ControlRow>
          <ControlRow label="只揭示一次">
            <Switch checked={opts.animateOnce} onChange={(animateOnce) => set({ animateOnce })} label="只揭示一次" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the framed list resting on a dark stage. */
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
        <AnimatedList items={ITEMS.slice(0, 5)} maxHeight={160} width={330} initialSelectedIndex={0} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
