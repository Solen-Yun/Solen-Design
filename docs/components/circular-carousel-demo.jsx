import { useState } from "react";
import { DemoFit } from "../demo-fit";
import CircularCarousel from "../../src/components/circular-carousel/CircularCarousel.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Drag the ring hard: momentum coasts, then it snaps to the nearest card;
   presets rebuild the ring shape live without remounting. */


const ITEMS = [
  { src: "./assets/demo-photos/photo-01.jpg", alt: "暖色渐变图", title: "拂晓", subtitle: "暖调" },
  { src: "./assets/demo-photos/photo-02.jpg", alt: "冷色渐变图", title: "远洋", subtitle: "冷调" },
  { src: "./assets/demo-photos/photo-03.jpg", alt: "紫色渐变图", title: "暮紫", subtitle: "夜色" },
  { src: "./assets/demo-photos/photo-04.jpg", alt: "绿色渐变图", title: "苔原", subtitle: "植物" },
  { src: "./assets/demo-photos/photo-05.jpg", alt: "红色渐变图", title: "霞色", subtitle: "黄昏" },
  { src: "./assets/demo-photos/photo-06.jpg", alt: "黄色渐变图", title: "麦浪", subtitle: "田野" },
  { src: "./assets/demo-photos/photo-07.jpg", alt: "青色渐变图", title: "浅滩", subtitle: "水域" },
  { src: "./assets/demo-photos/photo-08.jpg", alt: "灰色渐变图", title: "雾岚", subtitle: "灰阶" },
];

const PRESETS = [
  ["cylinder", "圆柱"],
  ["orbit", "环绕"],
  ["wheel", "摩天轮"],
  ["panorama", "全景"],
];

const INTROS = [
  ["assemble", "聚合"],
  ["rise", "坠落"],
  ["spin", "旋转"],
  ["none", "无"],
];

const AUTOPLAYS = [
  ["drift", "漂移"],
  ["step", "定步"],
  ["off", "关闭"],
];

const DEFAULTS = {
  preset: "cylinder",
  intro: "rise",
  cardWidth: 220,
  aspectRatio: 1,
  gap: 25,
  autoplay: "drift",
  speed: 14,
  interval: 3,
  direction: "left",
  draggable: true,
  momentum: 0.6,
  snap: true,
  pauseOnHover: true,
  focusOnClick: true,
  parallax: 0.3,
  stretch: 0.5,
  depthFade: 0.55,
  innerShade: 0.6,
  cornerRadius: 12,
  captions: false,
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
          <div style={{ width: "100%", height: 430, color: "#f4f4f5" }}>
            <CircularCarousel
              items={ITEMS}
              preset={opts.preset}
              intro={opts.intro}
              cardWidth={opts.cardWidth}
              aspectRatio={opts.aspectRatio}
              gap={opts.gap}
              autoplay={opts.autoplay}
              speed={opts.speed}
              interval={opts.interval}
              direction={opts.direction}
              draggable={opts.draggable}
              momentum={opts.momentum}
              snap={opts.snap}
              pauseOnHover={opts.pauseOnHover}
              focusOnClick={opts.focusOnClick}
              parallax={opts.parallax}
              stretch={opts.stretch}
              depthFade={opts.depthFade}
              innerShade={opts.innerShade}
              cornerRadius={opts.cornerRadius}
              captions={opts.captions}
              onChange={(index) => console.log(index)}
              onItemClick={(item, index) => console.log(item.title, index)}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./circular-carousel-preview.html">
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
          <ControlRow label="预设">
            <div className="view-tabs">
              {PRESETS.map(([id, label]) => (
                <button key={id} type="button" className={opts.preset === id ? "active" : undefined} onClick={() => set({ preset: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="入场">
            <div className="view-tabs">
              {INTROS.map(([id, label]) => (
                <button key={id} type="button" className={opts.intro === id ? "active" : undefined} onClick={() => set({ intro: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="自动播放">
            <div className="view-tabs">
              {AUTOPLAYS.map(([id, label]) => (
                <button key={id} type="button" className={opts.autoplay === id ? "active" : undefined} onClick={() => set({ autoplay: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="向右">
            <Switch checked={opts.direction === "right"} onChange={(value) => set({ direction: value ? "right" : "left" })} label="向右" />
          </ControlRow>
          <Slider label="卡片宽" value={opts.cardWidth} min={140} max={300} step={5} format={(v) => `${v}px`} onChange={(cardWidth) => set({ cardWidth })} />
          <Slider label="间隙" value={opts.gap} min={0} max={80} step={1} format={(v) => `${v}px`} onChange={(gap) => set({ gap })} />
          <Slider label="漂移速度" value={opts.speed} min={0} max={40} step={1} format={(v) => `${v}°/s`} onChange={(speed) => set({ speed })} />
          <Slider label="定步间隔" value={opts.interval} min={0.5} max={10} step={0.5} format={(v) => `${v}s`} onChange={(interval) => set({ interval })} />
          <Slider label="惯性" value={opts.momentum} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(momentum) => set({ momentum })} />
          <Slider label="指针视差" value={opts.parallax} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(parallax) => set({ parallax })} />
          <Slider label="转速膨胀" value={opts.stretch} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(stretch) => set({ stretch })} />
          <Slider label="深度淡出" value={opts.depthFade} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(depthFade) => set({ depthFade })} />
          <Slider label="内侧压暗" value={opts.innerShade} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(innerShade) => set({ innerShade })} />
          <Slider label="圆角" value={opts.cornerRadius} min={0} max={24} step={1} format={(v) => `${v}px`} onChange={(cornerRadius) => set({ cornerRadius })} />
          <ControlRow label="可拖拽">
            <Switch checked={opts.draggable} onChange={(draggable) => set({ draggable })} label="可拖拽" />
          </ControlRow>
          <ControlRow label="吸附">
            <Switch checked={opts.snap} onChange={(snap) => set({ snap })} label="吸附" />
          </ControlRow>
          <ControlRow label="悬停暂停">
            <Switch checked={opts.pauseOnHover} onChange={(pauseOnHover) => set({ pauseOnHover })} label="悬停暂停" />
          </ControlRow>
          <ControlRow label="点击聚焦">
            <Switch checked={opts.focusOnClick} onChange={(focusOnClick) => set({ focusOnClick })} label="点击聚焦" />
          </ControlRow>
          <ControlRow label="字幕页码">
            <Switch checked={opts.captions} onChange={(captions) => set({ captions })} label="字幕页码" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the dark cylinder ring drifting slowly on the dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div
        style={{
          display: "flex",
          width: "100%",
          height: 170,
          background: "#101014",
          color: "#f4f4f5",
        }}
      >
        <CircularCarousel
          items={ITEMS}
          preset="cylinder"
          intro="none"
          cardWidth={150}
          gap={16}
          speed={8}
          theme="dark"
          onChange={(index) => console.log(index)}
        />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
