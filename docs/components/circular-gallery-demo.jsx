import { useState } from "react";
import { DemoFit } from "../demo-fit";
import CircularGallery from "../../src/components/circular-gallery/CircularGallery.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Fling the strip hard to see the paper ripple, then click a card open
   and press Escape to fold it back. */


const ITEMS = [
  {
    image: "./assets/demo-photos/photo-01.jpg",
    text: "拂晓",
    description: "暖橙色的天光从山脊后漫上来，前景留一片静水。",
  },
  {
    image: "./assets/demo-photos/photo-02.jpg",
    text: "远洋",
    description: "冷蓝的深水与远处的浮标，风平浪静的下午。",
  },
  {
    image: "./assets/demo-photos/photo-03.jpg",
    text: "暮紫",
    description: "夜幕将落未落的一刻，紫色调压住了所有轮廓。",
  },
  {
    image: "./assets/demo-photos/photo-04.jpg",
    text: "苔原",
    description: "潮湿的绿意铺满画面，只有一颗亮点在呼吸。",
  },
  {
    image: "./assets/demo-photos/photo-05.jpg",
    text: "霞色",
    description: "黄昏把云烧成玫瑰色，暖粉一路染到地平线。",
  },
  {
    image: "./assets/demo-photos/photo-06.jpg",
    text: "麦浪",
    description: "风从左侧来，金色一层压着一层地翻过去。",
  },
  {
    image: "./assets/demo-photos/photo-07.jpg",
    text: "雨前",
    description: "铅灰色的云压得很低，城市提前安静下来。",
  },
  {
    image: "./assets/demo-photos/photo-08.jpg",
    text: "窑火",
    description: "砖窑里最后的火光，把整个画框烘成暖褐。",
  },
];

const DEFAULTS = {
  bend: 3,
  textColor: "#ffffff",
  borderRadius: 0.05,
  scrollSpeed: 2,
  scrollEase: 0.05,
  itemSize: 1,
  itemAspect: 0.78,
  gap: 0.26,
  wave: 1,
  fadeEdges: 0.12,
  shadow: 0.25,
  grayscale: false,
  showTitles: true,
  snap: true,
  autoScroll: 0,
  openOnClick: true,
  intro: true,
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
          <div style={{ width: "100%", height: 420 }}>
            <CircularGallery
              items={ITEMS}
              bend={opts.bend}
              textColor={opts.textColor}
              borderRadius={opts.borderRadius}
              scrollSpeed={opts.scrollSpeed}
              scrollEase={opts.scrollEase}
              itemSize={opts.itemSize}
              itemAspect={opts.itemAspect}
              gap={opts.gap}
              wave={opts.wave}
              fadeEdges={opts.fadeEdges}
              shadow={opts.shadow}
              grayscale={opts.grayscale}
              showTitles={opts.showTitles}
              snap={opts.snap}
              autoScroll={opts.autoScroll}
              openOnClick={opts.openOnClick}
              intro={opts.intro}
              onItemClick={(item, index) => console.log(index, item.text)}
              onActiveChange={(index) => console.log("active", index)}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./circular-gallery-preview.html">
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
          <Slider label="弧度" value={opts.bend} min={-6} max={6} step={0.5} format={(v) => v.toFixed(1)} onChange={(bend) => set({ bend })} />
          <Slider label="卡高" value={opts.itemSize} min={0.4} max={1.6} step={0.05} format={(v) => `×${v.toFixed(2)}`} onChange={(itemSize) => set({ itemSize })} />
          <Slider label="宽高比" value={opts.itemAspect} min={0.4} max={1.6} step={0.05} format={(v) => v.toFixed(2)} onChange={(itemAspect) => set({ itemAspect })} />
          <Slider label="间距" value={opts.gap} min={0.05} max={0.8} step={0.01} format={(v) => v.toFixed(2)} onChange={(gap) => set({ gap })} />
          <Slider label="圆角" value={opts.borderRadius} min={0} max={0.5} step={0.01} format={(v) => v.toFixed(2)} onChange={(borderRadius) => set({ borderRadius })} />
          <Slider label="滚动倍率" value={opts.scrollSpeed} min={0.5} max={5} step={0.1} format={(v) => `×${v.toFixed(1)}`} onChange={(scrollSpeed) => set({ scrollSpeed })} />
          <Slider label="跟随" value={opts.scrollEase} min={0.01} max={0.3} step={0.01} format={(v) => v.toFixed(2)} onChange={(scrollEase) => set({ scrollEase })} />
          <Slider label="涟漪" value={opts.wave} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(wave) => set({ wave })} />
          <Slider label="两端渐隐" value={opts.fadeEdges} min={0} max={0.4} step={0.01} format={(v) => v.toFixed(2)} onChange={(fadeEdges) => set({ fadeEdges })} />
          <Slider label="投影" value={opts.shadow} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(shadow) => set({ shadow })} />
          <Slider label="自动前进" value={opts.autoScroll} min={-2} max={2} step={0.25} format={(v) => `${v.toFixed(2)} 卡/秒`} onChange={(autoScroll) => set({ autoScroll })} />
          <Color label="文字色" value={opts.textColor} onChange={(textColor) => set({ textColor })} />
          <ControlRow label="灰度底态">
            <Switch checked={opts.grayscale} onChange={(grayscale) => set({ grayscale })} label="灰度底态" />
          </ControlRow>
          <ControlRow label="标题">
            <Switch checked={opts.showTitles} onChange={(showTitles) => set({ showTitles })} label="标题" />
          </ControlRow>
          <ControlRow label="吸附">
            <Switch checked={opts.snap} onChange={(snap) => set({ snap })} label="吸附" />
          </ControlRow>
          <ControlRow label="点击展开">
            <Switch checked={opts.openOnClick} onChange={(openOnClick) => set({ openOnClick })} label="点击展开" />
          </ControlRow>
          <ControlRow label="错峰入场">
            <Switch checked={opts.intro} onChange={(intro) => set({ intro })} label="错峰入场" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the bent strip resting mid-scroll on the dark stage. */
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
          <CircularGallery
            items={ITEMS.slice(0, 5)}
            bend={3}
            itemSize={0.62}
            showTitles={true}
            intro={false}
          />
        </div>
      </div>
    </div>
  );
}

export { Demo, CardPreview };
