import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as InfiniteMenu } from "../../src/components/infinite-menu/InfiniteMenu.jsx";

/* Plain React + CSS pair — WebGL2 renders the sphere, the CSS file travels
   with the component. Demo photos ride the shared wallpaper set; the three
   items cycle around the sphere automatically. */
const ITEMS = [
  {
    image: "./assets/wallpaper-01.jpg",
    title: "Neon Crossing",
    description: "Neon rain on a night crossing, doubled in the wet pavement.",
  },
  {
    image: "./assets/wallpaper-03.jpg",
    title: "Petals at Dusk",
    description: "A shrine gate and cherry blooms under a sinking sun.",
  },
  {
    image: "./assets/wallpaper-08.jpg",
    title: "Aurora Lake",
    description: "Green light over still water and winter peaks.",
  },
];

const DEFAULTS = {
  count: 160,
  tileSize: 0.63,
  roundness: 0.2,
  zoom: 1.65,
  pullBack: 1,
  stretch: 0.6,
  inertia: 0.6,
  autoplay: 3,
  dim: 0.5,
  grayscale: true,
  intro: true,
  showInfo: true,
  lightTheme: false,
};

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

function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => setOpts(DEFAULTS);
  const theme = opts.lightTheme ? "light" : "dark";

  return (
    <>
      <div className="demo-stage" style={{ background: "#0b0b0f", colorScheme: "dark" }}>
        <DemoFit>

          <div style={{ width: "100%", height: 600, position: "relative" }}>
            <InfiniteMenu
              items={ITEMS}
              count={opts.count}
              tileSize={opts.tileSize}
              roundness={opts.roundness}
              zoom={opts.zoom}
              pullBack={opts.pullBack}
              stretch={opts.stretch}
              inertia={opts.inertia}
              autoplay={opts.autoplay}
              grayscale={opts.grayscale}
              dim={opts.dim}
              intro={opts.intro}
              showInfo={opts.showInfo}
              theme={theme}
              accentColor="#ffffff"
              backgroundColor={opts.lightTheme ? "#f2f2f4" : "#0b0b0f"}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./infinite-menu-preview.html">
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
          <Slider label="瓦片数量" value={opts.count} min={20} max={400} step={10} format={(v) => String(v)} onChange={(count) => set({ count })} />
          <Slider label="瓦片大小" value={opts.tileSize} min={0.2} max={1.2} step={0.01} format={(v) => v.toFixed(2)} onChange={(tileSize) => set({ tileSize })} />
          <Slider label="圆角" value={opts.roundness} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(roundness) => set({ roundness })} />
          <Slider label="相机距离" value={opts.zoom} min={0.6} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(zoom) => set({ zoom })} />
          <Slider label="拖动后撤" value={opts.pullBack} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(pullBack) => set({ pullBack })} />
          <Slider label="运动拉伸" value={opts.stretch} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(stretch) => set({ stretch })} />
          <Slider label="惯性" value={opts.inertia} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(inertia) => set({ inertia })} />
          <Slider label="自动播放" value={opts.autoplay} min={0} max={8} step={0.5} format={(v) => (v === 0 ? "关闭" : `${v}s`)} onChange={(autoplay) => set({ autoplay })} />
          <Slider label="压暗" value={opts.dim} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(dim) => set({ dim })} />
          <ControlRow label="灰阶">
            <Switch checked={opts.grayscale} onChange={(grayscale) => set({ grayscale })} label="灰阶" />
          </ControlRow>
          <ControlRow label="入场旋转">
            <Switch checked={opts.intro} onChange={(intro) => set({ intro })} label="入场旋转" />
          </ControlRow>
          <ControlRow label="显示信息">
            <Switch checked={opts.showInfo} onChange={(showInfo) => set({ showInfo })} label="显示信息" />
          </ControlRow>
          <ControlRow label="浅色主题">
            <Switch checked={opts.lightTheme} onChange={(lightTheme) => set({ lightTheme })} label="浅色主题" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — a smaller, self-running sphere. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ height: 260, position: "relative" }}>
        <InfiniteMenu items={ITEMS} count={100} autoplay={0} backgroundColor="#0b0b0f" />
      </div>
    </div>
  );
}


export { Demo, CardPreview };
