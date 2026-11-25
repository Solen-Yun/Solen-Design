import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { InfiniteSpiral } from "../../src/components/infinite-spiral/InfiniteSpiral.tsx";

/* The demo feeds the gallery's own wallpapers through options.items. */
const SPIRAL_IMAGES = [
  { src: "./assets/wallpaper-01.jpg", alt: "霓虹雨夜都市" },
  { src: "./assets/wallpaper-02.jpg", alt: "星海孤崖" },
  { src: "./assets/wallpaper-03.jpg", alt: "樱花黄昏神社" },
  { src: "./assets/wallpaper-04.jpg", alt: "深海巨鲸" },
  { src: "./assets/wallpaper-05.jpg", alt: "冰与火之界" },
  { src: "./assets/wallpaper-06.jpg", alt: "天空浮岛" },
  { src: "./assets/wallpaper-07.jpg", alt: "雨夜末班车" },
  { src: "./assets/wallpaper-08.jpg", alt: "极光镜湖" },
  { src: "./assets/wallpaper-09.jpg", alt: "苍绿巨神" },
  { src: "./assets/wallpaper-10.jpg", alt: "焰羽之舞" },
];

/* The workbench feeds the whole option set back through options. */
function ControlRow({ label, children }) {
  return (
    <div className="control">
      <span className="control-label">{label}</span>
      {children}
    </div>
  );
}

function Slider({ label, value, min, max, step = 1, format, onChange }) {
  return (
    <ControlRow label={label}>
      <output className="control-value">{format ? format(value) : value}</output>
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

const MODES = ["auto", "drag", "scroll", "all"];

function Demo() {
  const DEFAULTS = {
    speed: 0.55,
    direction: "up",
    animationMode: "all",
    radius: 170,
    cardWidth: 100,
    cardHeight: 100,
    verticalSpacing: 60,
    perspective: 1000,
    cardRadius: 10,
    centerScale: 1.2,
    edgeBlur: 6,
    cardsPerTurn: 7,
    pauseOnHover: true,
    reducedMotion: false,
  };
  const [options, setOptions] = useState(DEFAULTS);
  const set = (patch) => setOptions((current) => ({ ...current, ...patch }));
  const reset = () => setOptions(DEFAULTS);

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>

          <InfiniteSpiral options={{ items: SPIRAL_IMAGES, ...options }} />
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./infinite-spiral-preview.html">
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
          <ControlRow label="交互模式">
            <select
              value={options.animationMode}
              onChange={(event) => set({ animationMode: event.target.value })}
              aria-label="交互模式"
            >
              {MODES.map((mode) => (
                <option key={mode} value={mode}>{mode}</option>
              ))}
            </select>
          </ControlRow>
          <Slider label="速度" value={options.speed} min={0} max={1.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(speed) => set({ speed })} />
          <ControlRow label="向下行进">
            <Switch checked={options.direction === "down"} onChange={(down) => set({ direction: down ? "down" : "up" })} label="向下行进" />
          </ControlRow>
          <ControlRow label="悬停暂停">
            <Switch checked={options.pauseOnHover} onChange={(pauseOnHover) => set({ pauseOnHover })} label="悬停暂停" />
          </ControlRow>
          <Slider label="螺旋半径" value={options.radius} min={80} max={300} step={10} onChange={(radius) => set({ radius })} />
          <Slider label="卡宽" value={options.cardWidth} min={60} max={200} step={5} onChange={(cardWidth) => set({ cardWidth })} />
          <Slider label="卡高" value={options.cardHeight} min={60} max={200} step={5} onChange={(cardHeight) => set({ cardHeight })} />
          <Slider label="卡间距" value={options.verticalSpacing} min={20} max={140} step={5} onChange={(verticalSpacing) => set({ verticalSpacing })} />
          <Slider label="透视" value={options.perspective} min={400} max={2000} step={50} onChange={(perspective) => set({ perspective })} />
          <Slider label="每圈卡数" value={options.cardsPerTurn} min={3} max={12} step={1} onChange={(cardsPerTurn) => set({ cardsPerTurn })} />
          <Slider label="卡片圆角" value={options.cardRadius} min={0} max={30} step={1} onChange={(cardRadius) => set({ cardRadius })} />
          <Slider label="中心放大" value={options.centerScale} min={1} max={1.8} step={0.05} format={(v) => v.toFixed(2)} onChange={(centerScale) => set({ centerScale })} />
          <Slider label="边缘模糊" value={options.edgeBlur} min={0} max={12} step={1} onChange={(edgeBlur) => set({ edgeBlur })} />
          <ControlRow label="减少动态">
            <Switch checked={options.reducedMotion} onChange={(reducedMotion) => set({ reducedMotion })} label="减少动态" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the 900×480 scene scales down as one unit. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <InfiniteSpiral options={{ reducedMotion: true, items: SPIRAL_IMAGES, animationMode: "auto" }} />
    </div>
  );
}


export { Demo, CardPreview };
