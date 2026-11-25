import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as InfiniteSpiral } from "../../src/components/spiral-image-ring/InfiniteSpiral.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Cards carry the site's own wallpapers; hover pauses, drag/scroll modes
   move the ring. */

const PHOTOS = [
  "wallpaper-01.jpg",
  "wallpaper-02.jpg",
  "wallpaper-03.jpg",
  "wallpaper-04.jpg",
  "wallpaper-05.jpg",
  "wallpaper-06.jpg",
  "wallpaper-07.jpg",
  "wallpaper-08.jpg",
];

const ITEMS = PHOTOS.map((file, index) => ({
  src: `./assets/${file}`,
  alt: `主题图 ${index + 1}`,
  id: `photo-${index}`,
}));

const DEFAULTS = {
  speed: 0.55,
  direction: "up",
  animationMode: "auto",
  radius: 170,
  verticalSpacing: 60,
  cardsPerTurn: 7,
  rotation: 0,
  cardTilt: 0,
  cardRadius: 10,
  centerScale: 1.2,
  edgeFade: 0.3,
  edgeBlur: 6,
  grayscale: 0,
  pauseOnHover: true,
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
          <div style={{ width: "100%", height: 400 }}>
            <InfiniteSpiral
              items={ITEMS}
              speed={opts.speed}
              direction={opts.direction}
              animationMode={opts.animationMode}
              radius={opts.radius}
              cardWidth={104}
              cardHeight={104}
              verticalSpacing={opts.verticalSpacing}
              cardsPerTurn={opts.cardsPerTurn}
              rotation={opts.rotation}
              cardTilt={opts.cardTilt}
              cardRadius={opts.cardRadius}
              centerScale={opts.centerScale}
              edgeFade={opts.edgeFade}
              edgeBlur={opts.edgeBlur}
              grayscale={opts.grayscale}
              pauseOnHover={opts.pauseOnHover}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./spiral-image-ring-preview.html">
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
          <ControlRow label="方向">
            <div className="view-tabs">
              {[["up", "向上"], ["down", "向下"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.direction === id ? "active" : undefined} onClick={() => set({ direction: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="运动方式">
            <div className="view-tabs">
              {[["auto", "自动"], ["scroll", "滚动"], ["drag", "拖拽"], ["all", "全部"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.animationMode === id ? "active" : undefined} onClick={() => set({ animationMode: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="速度" value={opts.speed} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(speed) => set({ speed })} />
          <Slider label="半径" value={opts.radius} min={80} max={260} step={10} format={(v) => `${v}px`} onChange={(radius) => set({ radius })} />
          <Slider label="上升间距" value={opts.verticalSpacing} min={20} max={140} step={5} format={(v) => `${v}px`} onChange={(verticalSpacing) => set({ verticalSpacing })} />
          <Slider label="每圈张数" value={opts.cardsPerTurn} min={3} max={12} step={1} format={(v) => String(v)} onChange={(cardsPerTurn) => set({ cardsPerTurn })} />
          <Slider label="角度偏移" value={opts.rotation} min={0} max={360} step={5} format={(v) => `${v}deg`} onChange={(rotation) => set({ rotation })} />
          <Slider label="卡片倾斜" value={opts.cardTilt} min={-30} max={30} step={1} format={(v) => `${v}deg`} onChange={(cardTilt) => set({ cardTilt })} />
          <Slider label="卡片圆角" value={opts.cardRadius} min={0} max={52} step={2} format={(v) => `${v}px`} onChange={(cardRadius) => set({ cardRadius })} />
          <Slider label="中心放大" value={opts.centerScale} min={1} max={1.6} step={0.05} format={(v) => v.toFixed(2)} onChange={(centerScale) => set({ centerScale })} />
          <Slider label="边缘淡出" value={opts.edgeFade} min={0.05} max={0.7} step={0.05} format={(v) => v.toFixed(2)} onChange={(edgeFade) => set({ edgeFade })} />
          <Slider label="边缘模糊" value={opts.edgeBlur} min={0} max={16} step={1} format={(v) => `${v}px`} onChange={(edgeBlur) => set({ edgeBlur })} />
          <Slider label="去饱和" value={opts.grayscale} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(grayscale) => set({ grayscale })} />
          <ControlRow label="悬停暂停">
            <Switch checked={opts.pauseOnHover} onChange={(pauseOnHover) => set({ pauseOnHover })} label="悬停暂停" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the ring mid-turn over the dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 320, background: "#101014", overflow: "hidden" }}>
        <InfiniteSpiral items={ITEMS} cardWidth={92} cardHeight={92} radius={150} edgeBlur={4} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
