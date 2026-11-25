import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { ChromaGrid } from "../../src/components/chroma-grid/ChromaGrid.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Sweep the pointer across the grid: colour, wash and rim only live
   inside the spotlight radius, and card offsets keep it aligned. */


const ITEMS = [
  {
    image: "./assets/demo-photos/photo-01.jpg",
    title: "拂晓",
    subtitle: "暖调",
    accent: "#ff8a4c",
  },
  {
    image: "./assets/demo-photos/photo-02.jpg",
    title: "远洋",
    subtitle: "冷调",
    accent: "#7cc4ff",
  },
  {
    image: "./assets/demo-photos/photo-03.jpg",
    title: "暮紫",
    subtitle: "夜色",
    accent: "#a98bff",
  },
  {
    image: "./assets/demo-photos/photo-04.jpg",
    title: "苔原",
    subtitle: "植物",
    accent: "#6ee7b7",
  },
  {
    image: "./assets/demo-photos/photo-05.jpg",
    title: "霞色",
    subtitle: "黄昏",
    accent: "#ff7eb6",
  },
  {
    image: "./assets/demo-photos/photo-06.jpg",
    title: "麦浪",
    subtitle: "田野",
    accent: "#ffd66e",
  },
];

const DEFAULTS = {
  columns: 3,
  minCardWidth: 180,
  gap: 12,
  radius: 260,
  softness: 0.6,
  damping: 0.45,
  fadeOut: 0.6,
  grayscale: 1,
  dim: 0.12,
  glow: 0.5,
  borderGlow: 1,
  reveal: "spotlight",
  cardRadius: 22,
  showInfo: true,
  frame: false,
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
          <div style={{ width: "100%", maxWidth: 720, padding: "12px 0" }}>
            <ChromaGrid
              items={ITEMS}
              columns={opts.columns}
              minCardWidth={opts.minCardWidth}
              gap={opts.gap}
              radius={opts.radius}
              softness={opts.softness}
              damping={opts.damping}
              fadeOut={opts.fadeOut}
              grayscale={opts.grayscale}
              dim={opts.dim}
              glow={opts.glow}
              borderGlow={opts.borderGlow}
              reveal={opts.reveal}
              cardRadius={opts.cardRadius}
              showInfo={opts.showInfo}
              frame={opts.frame}
              theme={opts.theme}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./chroma-grid-preview.html">
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
          <ControlRow label="显色方式">
            <div className="view-tabs">
              {[["spotlight", "聚光"], ["card", "悬停"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.reveal === id ? "active" : undefined} onClick={() => set({ reveal: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="深色主题">
            <Switch checked={dark} onChange={(value) => set({ theme: value ? "dark" : "light" })} label="深色主题" />
          </ControlRow>
          <Slider label="列数" value={opts.columns} min={1} max={6} step={1} format={(v) => String(v)} onChange={(columns) => set({ columns })} />
          <Slider label="最小卡宽" value={opts.minCardWidth} min={120} max={260} step={10} format={(v) => `${v}px`} onChange={(minCardWidth) => set({ minCardWidth })} />
          <Slider label="间距" value={opts.gap} min={0} max={32} step={2} format={(v) => `${v}px`} onChange={(gap) => set({ gap })} />
          <Slider label="聚光半径" value={opts.radius} min={80} max={420} step={10} format={(v) => `${v}px`} onChange={(radius) => set({ radius })} />
          <Slider label="边缘羽化" value={opts.softness} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(softness) => set({ softness })} />
          <Slider label="跟随迟滞" value={opts.damping} min={0.1} max={1.2} step={0.05} format={(v) => `${v.toFixed(2)}s`} onChange={(damping) => set({ damping })} />
          <Slider label="熄灭时长" value={opts.fadeOut} min={0.1} max={2} step={0.1} format={(v) => `${v.toFixed(1)}s`} onChange={(fadeOut) => set({ fadeOut })} />
          <Slider label="灰度" value={opts.grayscale} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(grayscale) => set({ grayscale })} />
          <Slider label="压暗" value={opts.dim} min={0} max={0.9} step={0.02} format={(v) => v.toFixed(2)} onChange={(dim) => set({ dim })} />
          <Slider label="光晕" value={opts.glow} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(glow) => set({ glow })} />
          <Slider label="描边光" value={opts.borderGlow} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(borderGlow) => set({ borderGlow })} />
          <Slider label="卡片圆角" value={opts.cardRadius} min={0} max={40} step={1} format={(v) => `${v}px`} onChange={(cardRadius) => set({ cardRadius })} />
          <ControlRow label="标题栏">
            <Switch checked={opts.showInfo} onChange={(showInfo) => set({ showInfo })} label="标题栏" />
          </ControlRow>
          <ControlRow label="外框">
            <Switch checked={opts.frame} onChange={(frame) => set({ frame })} label="外框" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the dark photo grid at rest, waiting for a cursor. */
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
        <div style={{ width: 300 }}>
          <ChromaGrid
            items={ITEMS.slice(0, 3)}
            columns={3}
            minCardWidth={88}
            gap={8}
            radius={140}
            softness={0.6}
            cardRadius={14}
            showInfo={false}
            theme="dark"
          />
        </div>
      </div>
    </div>
  );
}

export { Demo, CardPreview };
