import { useState } from "react";
import { DemoFit } from "../demo-fit";
import Carousel from "../../src/components/carousel/Carousel.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Switch the effect and drag/fling in each one: the poses differ most
   mid-track, and a hard fling should step exactly one card. */


const ITEMS = [
  {
    image: "./assets/demo-photos/photo-01.jpg",
    title: "拂晓",
    description: "暖色渐变卡，底部压暗托住文字。",
    icon: "☀️",
  },
  {
    image: "./assets/demo-photos/photo-02.jpg",
    title: "远洋",
    description: "冷色渐变卡，配一枚毛玻璃角标。",
    icon: "🌊",
  },
  {
    image: "./assets/demo-photos/photo-03.jpg",
    title: "暮紫",
    description: "冷调中的亮斑让画面不至于发闷。",
    icon: "🔮",
  },
  {
    image: "./assets/demo-photos/photo-04.jpg",
    title: "苔原",
    description: "照片卡共享同一套文字排版。",
    icon: "🌿",
  },
  {
    image: "./assets/demo-photos/photo-05.jpg",
    title: "霞色",
    description: "任意 React 内容都能塞进卡片。",
    icon: "🌅",
  },
];

const EFFECTS = [
  ["tilt", "倾斜"],
  ["slide", "平移"],
  ["scale", "缩放"],
  ["fade", "淡切"],
  ["cube", "立方"],
];

const INDICATORS = [
  ["dots", "圆点"],
  ["bars", "进度条"],
  ["counter", "页码"],
  ["none", "无"],
];

const DEFAULTS = {
  baseWidth: 300,
  aspectRatio: 1.25,
  peek: 0,
  gap: 16,
  radius: 12,
  frame: true,
  effect: "tilt",
  indicator: "dots",
  arrows: false,
  autoplay: false,
  autoplayDelay: 3000,
  pauseOnHover: false,
  loop: false,
  draggable: true,
  round: false,
  theme: "dark",
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
  const dark = opts.theme === "dark";

  return (
    <>
      <div className="demo-stage" style={{ background: dark ? "#101014" : "#ffffff", colorScheme: dark ? "dark" : "light" }}>
        <DemoFit>
          <div style={{ display: "flex", justifyContent: "center", width: "100%", padding: "24px 0" }}>
            <Carousel
              items={ITEMS}
              baseWidth={opts.baseWidth}
              aspectRatio={opts.aspectRatio}
              peek={opts.peek}
              gap={opts.gap}
              radius={opts.radius}
              frame={opts.frame}
              effect={opts.effect}
              indicator={opts.indicator}
              arrows={opts.arrows}
              autoplay={opts.autoplay}
              autoplayDelay={opts.autoplayDelay}
              pauseOnHover={opts.pauseOnHover}
              loop={opts.loop}
              draggable={opts.draggable}
              round={opts.round}
              theme={opts.theme}
              onChange={(index) => console.log(index)}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./carousel-preview.html">
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
          <ControlRow label="动效">
            <div className="view-tabs">
              {EFFECTS.map(([id, label]) => (
                <button key={id} type="button" className={opts.effect === id ? "active" : undefined} onClick={() => set({ effect: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="指示器">
            <div className="view-tabs">
              {INDICATORS.map(([id, label]) => (
                <button key={id} type="button" className={opts.indicator === id ? "active" : undefined} onClick={() => set({ indicator: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="深色主题">
            <Switch checked={dark} onChange={(value) => set({ theme: value ? "dark" : "light" })} label="深色主题" />
          </ControlRow>
          <Slider label="宽度" value={opts.baseWidth} min={240} max={420} step={10} format={(v) => `${v}px`} onChange={(baseWidth) => set({ baseWidth })} />
          <Slider label="宽高比" value={opts.aspectRatio} min={0.6} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(aspectRatio) => set({ aspectRatio })} />
          <Slider label="露边" value={opts.peek} min={0} max={80} step={2} format={(v) => `${v}px`} onChange={(peek) => set({ peek })} />
          <Slider label="间距" value={opts.gap} min={0} max={48} step={2} format={(v) => `${v}px`} onChange={(gap) => set({ gap })} />
          <Slider label="圆角" value={opts.radius} min={0} max={28} step={1} format={(v) => `${v}px`} onChange={(radius) => set({ radius })} />
          <ControlRow label="箭头">
            <Switch checked={opts.arrows} onChange={(arrows) => set({ arrows })} label="箭头" />
          </ControlRow>
          <ControlRow label="自动播放">
            <Switch checked={opts.autoplay} onChange={(autoplay) => set({ autoplay })} label="自动播放" />
          </ControlRow>
          <Slider label="播放间隔" value={opts.autoplayDelay} min={1000} max={6000} step={250} format={(v) => `${v}ms`} onChange={(autoplayDelay) => set({ autoplayDelay })} />
          <ControlRow label="悬停暂停">
            <Switch checked={opts.pauseOnHover} onChange={(pauseOnHover) => set({ pauseOnHover })} label="悬停暂停" />
          </ControlRow>
          <ControlRow label="循环">
            <Switch checked={opts.loop} onChange={(loop) => set({ loop })} label="循环" />
          </ControlRow>
          <ControlRow label="可拖拽">
            <Switch checked={opts.draggable} onChange={(draggable) => set({ draggable })} label="可拖拽" />
          </ControlRow>
          <ControlRow label="圆形卡片">
            <Switch checked={opts.round} onChange={(round) => set({ round })} label="圆形卡片" />
          </ControlRow>
          <ControlRow label="外框">
            <Switch checked={opts.frame} onChange={(frame) => set({ frame })} label="外框" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the dark framed tilt carousel resting on the dark stage. */
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
        <Carousel
          items={ITEMS}
          baseWidth={220}
          aspectRatio={1.5}
          effect="tilt"
          indicator="none"
          theme="dark"
          onChange={(index) => console.log(index)}
        />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
