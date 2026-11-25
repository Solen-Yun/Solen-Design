import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as FlowingMenu } from "../../src/components/flowing-menu/FlowingMenu.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Sweep between rows to stretch the band, swipe sideways to accelerate the marquee. */
const ITEMS = [
  { text: "设计系统", marquee: "设计系统 Design System", image: "./assets/demo-photos/photo-01.jpg" },
  { text: "动效工坊", marquee: "动效工坊 Motion Lab", image: "./assets/demo-photos/photo-02.jpg" },
  { text: "字体研究", marquee: "字体研究 Type Notes", image: "./assets/demo-photos/photo-03.jpg" },
  { text: "关于我们", marquee: "关于我们 About", meta: "2025" }
];

const DEFAULTS = {
  speed: 60,
  direction: "left",
  followCursor: 0.4,
  duration: 0.5,
  stretch: 0.6,
  magnet: 0.25,
  bandInset: 0,
  bandRadius: 0,
  carryContent: false,
  dividers: true,
  dimInactive: false,
  align: "center",
  showIndex: false,
  showArrow: false,
  imageShape: "pill",
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

function Tabs({ label, options, value, onChange }) {
  return (
    <ControlRow label={label}>
      <div className="view-tabs">
        {options.map(([id, name]) => (
          <button key={id} type="button" className={value === id ? "active" : undefined} onClick={() => onChange(id)}>
            {name}
          </button>
        ))}
      </div>
    </ControlRow>
  );
}

function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => setOpts(DEFAULTS);
  const [picked, setPicked] = useState(null);

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ width: "100%", height: 400, padding: "0 4%" }}>
            <FlowingMenu
              items={ITEMS}
              {...opts}
              activeIndex={opts.showIndex ? 0 : undefined}
              onItemClick={(item, index) => setPicked(item.text)}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./flowing-menu-preview.html">
          <span aria-hidden="true">⧉</span> 打开完整预览
        </a>
      </div>
      {picked && (
        <p style={{ margin: "8px 16px 0", fontSize: 13, opacity: 0.65 }}>已点击：{picked}</p>
      )}

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
          <Tabs label="滚动方向" options={[["left", "向左"], ["right", "向右"], ["alternate", "交替"]]} value={opts.direction} onChange={(direction) => set({ direction })} />
          <Tabs label="图片形状" options={[["pill", "胶囊"], ["rounded", "圆角"], ["circle", "圆形"]]} value={opts.imageShape} onChange={(imageShape) => set({ imageShape })} />
          <Tabs label="对齐" options={[["center", "居中"], ["left", "左对齐"]]} value={opts.align} onChange={(align) => set({ align })} />
          <Slider label="滚动速度" value={opts.speed} min={0} max={200} step={5} format={(v) => `${v}px/s`} onChange={(speed) => set({ speed })} />
          <Slider label="光标推动" value={opts.followCursor} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(followCursor) => set({ followCursor })} />
          <Slider label="弹簧周期" value={opts.duration} min={0.15} max={1.2} step={0.05} format={(v) => `${v.toFixed(2)}s`} onChange={(duration) => set({ duration })} />
          <Slider label="拉伸程度" value={opts.stretch} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(stretch) => set({ stretch })} />
          <Slider label="磁吸" value={opts.magnet} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(magnet) => set({ magnet })} />
          <Slider label="色带留缝" value={opts.bandInset} min={0} max={14} step={1} format={(v) => `${v}px`} onChange={(bandInset) => set({ bandInset })} />
          <Slider label="色带圆角" value={opts.bandRadius} min={0} max={40} step={2} format={(v) => `${v}px`} onChange={(bandRadius) => set({ bandRadius })} />
          <ControlRow label="整块滚动">
            <Switch checked={opts.carryContent} onChange={(carryContent) => set({ carryContent })} label="整块滚动" />
          </ControlRow>
          <ControlRow label="分隔线">
            <Switch checked={opts.dividers} onChange={(dividers) => set({ dividers })} label="分隔线" />
          </ControlRow>
          <ControlRow label="压暗其他行">
            <Switch checked={opts.dimInactive} onChange={(dimInactive) => set({ dimInactive })} label="压暗其他行" />
          </ControlRow>
          <ControlRow label="行号">
            <Switch checked={opts.showIndex} onChange={(showIndex) => set({ showIndex })} label="行号" />
          </ControlRow>
          <ControlRow label="箭头">
            <Switch checked={opts.showArrow} onChange={(showArrow) => set({ showArrow })} label="箭头" />
          </ControlRow>
          <ControlRow label="入场动画">
            <Switch checked={opts.intro} onChange={(intro) => set({ intro })} label="入场动画" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the liquid band mid-sweep on a dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 260, background: "#101014", padding: "0 8%" }}>
        <FlowingMenu items={ITEMS} intro={false} speed={70} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
