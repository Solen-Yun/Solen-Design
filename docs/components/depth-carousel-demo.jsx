import { useState } from "react";
import { DemoFit } from "../demo-fit";
import DepthCarousel from "../../src/components/depth-carousel/DepthCarousel.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Fling the rail to feel the velocity projection, wheel it for stepwise
   recession, then flip tiltDirection and depth for the other posture. */


const ITEMS = [
  { image: "./assets/demo-photos/photo-01.jpg", alt: "拂晓" },
  { image: "./assets/demo-photos/photo-02.jpg", alt: "远洋" },
  { image: "./assets/demo-photos/photo-03.jpg", alt: "暮紫" },
  { image: "./assets/demo-photos/photo-04.jpg", alt: "苔原" },
  { image: "./assets/demo-photos/photo-05.jpg", alt: "霞色" },
  { image: "./assets/demo-photos/photo-06.jpg", alt: "麦浪" },
];

const DEFAULTS = {
  cardWidth: 300,
  cardHeight: 380,
  radius: 18,
  tint: "#05060a",
  depth: 220,
  spread: 90,
  tilt: 22,
  tiltDirection: "right",
  perspective: 1400,
  visibleCards: 4,
  falloff: 0.2,
  blur: 6,
  duration: 700,
  autoplay: false,
  autoplayDelay: 3200,
  loop: true,
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
          <div style={{ width: "100%", height: 480 }}>
            <DepthCarousel
              items={ITEMS}
              cardWidth={opts.cardWidth}
              cardHeight={opts.cardHeight}
              radius={opts.radius}
              tint={opts.tint}
              depth={opts.depth}
              spread={opts.spread}
              tilt={opts.tilt}
              tiltDirection={opts.tiltDirection}
              perspective={opts.perspective}
              visibleCards={opts.visibleCards}
              falloff={opts.falloff}
              blur={opts.blur}
              duration={opts.duration}
              autoplay={opts.autoplay}
              autoplayDelay={opts.autoplayDelay}
              loop={opts.loop}
              showControls={opts.showControls}
              showIndicators={opts.showIndicators}
              onChange={(index, item) => console.log(index, item?.alt)}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./depth-carousel-preview.html">
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
          <ControlRow label="轨道方向">
            <div className="view-tabs">
              {[["right", "向右"], ["left", "向左"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.tiltDirection === id ? "active" : undefined} onClick={() => set({ tiltDirection: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="纵深" value={opts.depth} min={80} max={480} step={10} format={(v) => `${v}px`} onChange={(depth) => set({ depth })} />
          <Slider label="散开" value={opts.spread} min={0} max={220} step={5} format={(v) => `${v}px`} onChange={(spread) => set({ spread })} />
          <Slider label="倾角" value={opts.tilt} min={0} max={45} step={1} format={(v) => `${v}°`} onChange={(tilt) => set({ tilt })} />
          <Slider label="透视" value={opts.perspective} min={700} max={2600} step={50} format={(v) => `${v}px`} onChange={(perspective) => set({ perspective })} />
          <Slider label="可见卡数" value={opts.visibleCards} min={1} max={8} step={1} format={(v) => String(v)} onChange={(visibleCards) => set({ visibleCards })} />
          <Slider label="变暗速率" value={opts.falloff} min={0} max={0.6} step={0.02} format={(v) => v.toFixed(2)} onChange={(falloff) => set({ falloff })} />
          <Slider label="模糊" value={opts.blur} min={0} max={14} step={1} format={(v) => `${v}px`} onChange={(blur) => set({ blur })} />
          <Slider label="卡宽" value={opts.cardWidth} min={200} max={420} step={10} format={(v) => `${v}px`} onChange={(cardWidth) => set({ cardWidth })} />
          <Slider label="卡高" value={opts.cardHeight} min={260} max={520} step={10} format={(v) => `${v}px`} onChange={(cardHeight) => set({ cardHeight })} />
          <Slider label="圆角" value={opts.radius} min={0} max={40} step={1} format={(v) => `${v}px`} onChange={(radius) => set({ radius })} />
          <Slider label="补间时长" value={opts.duration} min={150} max={1400} step={50} format={(v) => `${v}ms`} onChange={(duration) => set({ duration })} />
          <Color label="压暗色" value={opts.tint} onChange={(tint) => set({ tint })} />
          <ControlRow label="自动播放">
            <Switch checked={opts.autoplay} onChange={(autoplay) => set({ autoplay })} label="自动播放" />
          </ControlRow>
          <Slider label="播放间隔" value={opts.autoplayDelay} min={800} max={8000} step={200} format={(v) => `${v}ms`} onChange={(autoplayDelay) => set({ autoplayDelay })} />
          <ControlRow label="循环">
            <Switch checked={opts.loop} onChange={(loop) => set({ loop })} label="循环" />
          </ControlRow>
          <ControlRow label="箭头">
            <Switch checked={opts.showControls} onChange={(showControls) => set({ showControls })} label="箭头" />
          </ControlRow>
          <ControlRow label="圆点">
            <Switch checked={opts.showIndicators} onChange={(showIndicators) => set({ showIndicators })} label="圆点" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the rail settled on the dark stage with depth cues on. */
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
        <div style={{ width: "100%", height: 170 }}>
          <DepthCarousel
            items={ITEMS}
            cardWidth={150}
            cardHeight={190}
            radius={10}
            depth={140}
            spread={44}
            tilt={18}
            visibleCards={3}
            falloff={0.28}
            blur={4}
            showControls={false}
            showIndicators={false}
          />
        </div>
      </div>
    </div>
  );
}

export { Demo, CardPreview };
