import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as FlexCarousel } from "../../src/components/flex-carousel/FlexCarousel.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Drag or flick the row; cards melt at the lens edges and snap crisp at center. */


const ITEMS = [
  { src: "./assets/demo-photos/photo-01.jpg", alt: "海浪", title: "海浪" },
  { src: "./assets/demo-photos/photo-02.jpg", alt: "星球", title: "星球" },
  { src: "./assets/demo-photos/photo-03.jpg", alt: "秋叶", title: "秋叶" },
  { src: "./assets/demo-photos/photo-04.jpg", alt: "植物", title: "植物" },
  { src: "./assets/demo-photos/photo-05.jpg", alt: "花朵", title: "花朵" },
  { src: "./assets/demo-photos/photo-06.jpg", alt: "山峦", title: "山峦" },
  { src: "./assets/demo-photos/photo-07.jpg", alt: "游鱼", title: "游鱼" },
  { src: "./assets/demo-photos/photo-08.jpg", alt: "夜枭", title: "夜枭" },
];

const DEFAULTS = {
  preset: "liquid",
  intro: "rise",
  cardHeight: 0.5,
  gap: 12,
  radius: 0,
  squeeze: 0.2,
  autoplay: false,
  interval: 4,
  captions: true,
  captureWheel: true,
  focusOnClick: true,
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
          <div style={{ width: "100%", height: 440 }}>
            <FlexCarousel
              items={ITEMS}
              preset={opts.preset}
              intro={opts.intro}
              cardHeight={opts.cardHeight}
              gap={opts.gap}
              radius={opts.radius}
              squeeze={opts.squeeze}
              autoplay={opts.autoplay}
              interval={opts.interval}
              captions={opts.captions}
              captureWheel={opts.captureWheel}
              focusOnClick={opts.focusOnClick}
              onChange={(index, item) => console.log(index, item.title)}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./flex-carousel-preview.html">
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
          <ControlRow label="透镜预设">
            <div className="view-tabs">
              {[["liquid", "液态"], ["ribbon", "缎带"], ["vortex", "涡旋"], ["arch", "拱起"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.preset === id ? "active" : undefined} onClick={() => set({ preset: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="入场动画">
            <div className="view-tabs">
              {[["rise", "升起"], ["bloom", "绽放"], ["spin", "旋入"], ["deal", "发牌"], ["fade", "淡入"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.intro === id ? "active" : undefined} onClick={() => set({ intro: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="卡片高度" value={opts.cardHeight} min={0.3} max={0.8} step={0.05} format={(v) => v.toFixed(2)} onChange={(cardHeight) => set({ cardHeight })} />
          <Slider label="间距" value={opts.gap} min={0} max={60} step={2} format={(v) => `${v}px`} onChange={(gap) => set({ gap })} />
          <Slider label="圆角" value={opts.radius} min={0} max={48} step={2} format={(v) => `${v}px`} onChange={(radius) => set({ radius })} />
          <Slider label="速度压缩" value={opts.squeeze} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(squeeze) => set({ squeeze })} />
          <Slider label="自动间隔" value={opts.interval} min={2} max={10} step={1} format={(v) => `${v}s`} onChange={(interval) => set({ interval })} />
          <ControlRow label="自动播放">
            <Switch checked={opts.autoplay} onChange={(autoplay) => set({ autoplay })} label="自动播放" />
          </ControlRow>
          <ControlRow label="标题计数">
            <Switch checked={opts.captions} onChange={(captions) => set({ captions })} label="标题计数" />
          </ControlRow>
          <ControlRow label="滚轮接管">
            <Switch checked={opts.captureWheel} onChange={(captureWheel) => set({ captureWheel })} label="滚轮接管" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — one quiet preset mid-scroll on the dark canvas. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 260, background: "#101014" }}>
        <FlexCarousel items={ITEMS} preset="ribbon" intro="fade" cardHeight={0.55} gap={16} radius={12} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
