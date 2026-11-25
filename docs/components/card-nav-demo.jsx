import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as CardNav } from "../../src/components/card-nav/CardNav.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Fill bounce to feel the overshoot, or switch to hover mode and just wander in. */

const ITEMS = [
  {
    label: "关于",
    description: "团队、工作室与背后的故事。",
    links: [
      { label: "公司", href: "#" },
      { label: "招聘", href: "#" }
    ]
  },
  {
    label: "作品",
    description: "近几年挑出来的代表项目。",
    links: [
      { label: "精选", href: "#" },
      { label: "案例", href: "#" }
    ]
  },
  {
    label: "联系",
    description: "欢迎来信，每封都会读。",
    links: [
      { label: "邮件", href: "#" },
      { label: "动态", href: "#" },
      { label: "社区", href: "#" }
    ]
  }
];

const LOGO = (
  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M6 14 L12 6 L18 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

const DEFAULTS = {
  theme: "dark",
  surface: "glass",
  openOn: "click",
  cardEffect: "rise",
  stagger: 0.12,
  bounce: 0.2,
  speed: 1,
  cardHeight: 176,
  maxWidth: 800,
  accentColor: "#f5c453",
  menuLabel: true,
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

function Tabs({ label, options, value, onChange }) {
  return (
    <ControlRow label={label}>
      <div className="view-tabs">
        {options.map(([id, name]) => (
          <button key={id} type="button" className={value === id ? "active" : ""} onClick={() => onChange(id)}>
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
  const dark = opts.theme === "dark";

  return (
    <>
      <div
        className="demo-stage"
        style={{
          background: dark
            ? "radial-gradient(circle at 50% 0%, #3a3644 0%, #101014 70%)"
            : "radial-gradient(circle at 50% 0%, #ffffff 0%, #dcdce2 80%)",
          colorScheme: dark ? "dark" : "light",
        }}
      >
        <DemoFit>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", width: "100%", height: 360, paddingTop: 40 }}>
            <CardNav
              logo={LOGO}
              logoAlt="首页"
              items={ITEMS}
              cta={{ label: "开始使用", href: "#" }}
              theme={opts.theme}
              surface={opts.surface}
              openOn={opts.openOn}
              cardEffect={opts.cardEffect}
              stagger={opts.stagger}
              bounce={opts.bounce}
              speed={opts.speed}
              cardHeight={opts.cardHeight}
              maxWidth={opts.maxWidth}
              accentColor={opts.accentColor}
              menuLabel={opts.menuLabel}
              intro={opts.intro}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./card-nav-preview.html">
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
          <ControlRow label="浅色主题">
            <Switch checked={!dark} onChange={(light) => set({ theme: light ? "light" : "dark" })} label="浅色主题" />
          </ControlRow>
          <Tabs label="面板" options={[["glass", "毛玻璃"], ["solid", "纯色"]]} value={opts.surface} onChange={(surface) => set({ surface })} />
          <Tabs label="打开方式" options={[["click", "点击"], ["hover", "悬停"]]} value={opts.openOn} onChange={(openOn) => set({ openOn })} />
          <Tabs label="入场效果" options={[["rise", "上浮"], ["unfold", "展开"], ["fade", "淡入"]]} value={opts.cardEffect} onChange={(cardEffect) => set({ cardEffect })} />
          <Slider label="错峰间隔" value={opts.stagger} min={0} max={0.3} step={0.01} format={(v) => `${(v * 1000).toFixed(0)}ms`} onChange={(stagger) => set({ stagger })} />
          <Slider label="弹簧过冲" value={opts.bounce} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(bounce) => set({ bounce })} />
          <Slider label="弹簧速度" value={opts.speed} min={0.2} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(speed) => set({ speed })} />
          <Slider label="卡片高度" value={opts.cardHeight} min={120} max={260} step={4} format={(v) => `${v}px`} onChange={(cardHeight) => set({ cardHeight })} />
          <Slider label="最大宽度" value={opts.maxWidth} min={320} max={960} step={20} format={(v) => `${v}px`} onChange={(maxWidth) => set({ maxWidth })} />
          <Color label="CTA 颜色" value={opts.accentColor} onChange={(accentColor) => set({ accentColor })} />
          <ControlRow label="Menu 文字">
            <Switch checked={opts.menuLabel} onChange={(menuLabel) => set({ menuLabel })} label="Menu 文字" />
          </ControlRow>
          <ControlRow label="开场动画">
            <Switch checked={opts.intro} onChange={(intro) => set({ intro })} label="开场动画" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the dark glass bar mid-bloom on a dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", width: "100%", height: 260, background: "#101014", paddingTop: 24 }}>
        <CardNav logo={LOGO} logoAlt="首页" items={ITEMS} cta={{ label: "开始使用", href: "#" }} theme="dark" defaultOpen bounce={0.35} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
