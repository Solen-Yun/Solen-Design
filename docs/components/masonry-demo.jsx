import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as Masonry } from "../../src/components/masonry/Masonry.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Drag tiles to reorder, click one for the lightbox, reflow the width. */


const ITEMS = [
  { id: "a", img: "./assets/demo-photos/photo-01.jpg", alt: "海浪", title: "海浪", width: 800, height: 1000 },
  { id: "b", img: "./assets/demo-photos/photo-02.jpg", alt: "星球", title: "星球", width: 800, height: 560 },
  { id: "c", img: "./assets/demo-photos/photo-03.jpg", alt: "秋叶", title: "秋叶", width: 800, height: 800 },
  { id: "d", img: "./assets/demo-photos/photo-04.jpg", alt: "植物", title: "植物", width: 800, height: 640 },
  { id: "e", img: "./assets/demo-photos/photo-05.jpg", alt: "花朵", title: "花朵", width: 800, height: 1100 },
  { id: "f", img: "./assets/demo-photos/photo-06.jpg", alt: "山峦", title: "山峦", width: 800, height: 520 },
  { id: "g", img: "./assets/demo-photos/photo-07.jpg", alt: "游鱼", title: "游鱼", width: 800, height: 880 },
  { id: "h", img: "./assets/demo-photos/photo-08.jpg", alt: "夜枭", title: "夜枭", width: 800, height: 600 },
  { id: "i", img: "./assets/demo-photos/photo-09.jpg", alt: "地图", title: "地图", span: 2, width: 1600, height: 640 },
  { id: "j", img: "./assets/demo-photos/photo-10.jpg", alt: "篝火", title: "篝火", width: 800, height: 760 },
];

const DEFAULTS = {
  columns: "auto",
  gap: 12,
  radius: 12,
  animateFrom: "bottom",
  stagger: 0.05,
  duration: 0.6,
  bounce: 0.15,
  hoverEffect: "zoom",
  captions: "hover",
  parallax: 0,
  draggable: true,
  lightbox: true,
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

function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => setOpts(DEFAULTS);

  return (
    <>
      <div className="demo-stage" style={{ background: "#f4f4f5", colorScheme: "light" }}>
        <DemoFit>
          <div style={{ width: "100%", height: 480, overflowY: "auto" }}>
            <Masonry
              items={ITEMS}
              columns={opts.columns}
              columnWidth={210}
              gap={opts.gap}
              radius={opts.radius}
              animateFrom={opts.animateFrom}
              stagger={opts.stagger}
              duration={opts.duration}
              bounce={opts.bounce}
              hoverEffect={opts.hoverEffect}
              captions={opts.captions}
              parallax={opts.parallax}
              draggable={opts.draggable}
              lightbox={opts.lightbox}
              focusOnHover={opts.focusOnHover}
              revealOnScroll={false}
              onReorder={(ordered) => console.log("reordered", ordered.map((item) => item.id))}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./masonry-preview.html">
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
          <ControlRow label="列数">
            <div className="view-tabs">
              {[["auto", "自动"], ["2", "2 列"], ["3", "3 列"], ["4", "4 列"]].map(([id, label]) => (
                <button key={id} type="button" className={String(opts.columns) === id ? "active" : undefined} onClick={() => set({ columns: id === "auto" ? "auto" : Number(id) })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="入场方向">
            <div className="view-tabs">
              {[["bottom", "下方"], ["top", "上方"], ["left", "左侧"], ["center", "中心"], ["random", "随机"], ["none", "无"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.animateFrom === id ? "active" : undefined} onClick={() => set({ animateFrom: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="悬停效果">
            <div className="view-tabs">
              {[["zoom", "缩放"], ["lift", "抬升"], ["tilt", "倾斜"], ["none", "无"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.hoverEffect === id ? "active" : undefined} onClick={() => set({ hoverEffect: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="字幕">
            <div className="view-tabs">
              {[["hover", "悬停"], ["always", "常显"], ["none", "无"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.captions === id ? "active" : undefined} onClick={() => set({ captions: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="间距" value={opts.gap} min={0} max={32} step={2} format={(v) => `${v}px`} onChange={(gap) => set({ gap })} />
          <Slider label="圆角" value={opts.radius} min={0} max={32} step={2} format={(v) => `${v}px`} onChange={(radius) => set({ radius })} />
          <Slider label="弹簧时长" value={opts.duration} min={0.2} max={1.4} step={0.05} format={(v) => `${v.toFixed(2)}s`} onChange={(duration) => set({ duration })} />
          <Slider label="回弹" value={opts.bounce} min={0} max={0.9} step={0.05} format={(v) => v.toFixed(2)} onChange={(bounce) => set({ bounce })} />
          <Slider label="入场间隔" value={opts.stagger} min={0} max={0.2} step={0.01} format={(v) => `${v.toFixed(2)}s`} onChange={(stagger) => set({ stagger })} />
          <Slider label="视差" value={opts.parallax} min={0} max={1} step={0.1} format={(v) => v.toFixed(1)} onChange={(parallax) => set({ parallax })} />
          <ControlRow label="可拖拽">
            <Switch checked={opts.draggable} onChange={(draggable) => set({ draggable })} label="可拖拽" />
          </ControlRow>
          <ControlRow label="灯箱">
            <Switch checked={opts.lightbox} onChange={(lightbox) => set({ lightbox })} label="灯箱" />
          </ControlRow>
          <ControlRow label="悬停压暗">
            <Switch checked={opts.focusOnHover} onChange={(focusOnHover) => set({ focusOnHover })} label="悬停压暗" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — a two-column grid mid-reveal on the light stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 280, background: "#f4f4f5", overflowY: "auto" }}>
        <Masonry items={ITEMS} columns={2} columnWidth={190} gap={10} radius={10} stagger={0.04} bounce={0.2} captions="hover" revealOnScroll={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
