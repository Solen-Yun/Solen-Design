import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as Dock } from "../../src/components/dock/Dock.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Sweep across the tiles, click one to hop it, right-click the ones with menus. */

const ITEMS = [
  { icon: "🌐", label: "浏览器", onClick: () => console.log("浏览器") },
  { icon: "✉️", label: "邮件", badge: 3, onClick: () => console.log("邮件") },
  { icon: "🎵", label: "音乐", onClick: () => console.log("音乐") },
  { icon: "📷", label: "照片", onClick: () => console.log("照片") },
  { separator: true },
  {
    icon: "⚙️",
    label: "设置",
    menu: [
      { label: "通用", shortcut: "⌘," },
      { label: "外观", items: [{ label: "浅色" }, { label: "深色" }, { label: "自动" }] },
      { separator: true },
      { label: "Wi-Fi", checked: true },
      { label: "蓝牙", checked: false },
      { separator: true },
      { label: "锁定屏幕", shortcut: "⌃⌘Q" },
      { label: "关机", disabled: true }
    ],
    onClick: () => console.log("设置")
  },
  { icon: "🗑️", label: "废纸篓", badge: true, onClick: () => console.log("废纸篓") }
];

ITEMS[4].active = true; // 照片假装正在运行

const DEFAULTS = {
  position: "bottom",
  theme: "dark",
  baseItemSize: 50,
  magnification: 70,
  distance: 200,
  panelHeight: 68,
  gap: 10,
  roundness: 0.5,
  bounce: true,
  autoHide: false,
  tiles: true,
  showLabels: true,
  showIndicators: true,
  showBadges: true,
  badgeColor: "#ff453a",
  accentColor: "#0a84ff",
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
            ? "radial-gradient(circle at 50% 30%, #3a3644 0%, #101014 75%)"
            : "radial-gradient(circle at 50% 30%, #ffffff 0%, #d9d9df 80%)",
          colorScheme: dark ? "dark" : "light",
        }}
      >
        <DemoFit>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: 420,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ position: "absolute", fontSize: 13, opacity: 0.55 }}>
              扫过磁贴、点击、右键都试试
            </span>
            <Dock items={ITEMS} {...opts} />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./dock-preview.html">
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
          <Tabs label="停靠边" options={[["bottom", "下"], ["top", "上"], ["left", "左"], ["right", "右"]]} value={opts.position} onChange={(position) => set({ position })} />
          <ControlRow label="浅色主题">
            <Switch checked={!dark} onChange={(light) => set({ theme: light ? "light" : "dark" })} label="浅色主题" />
          </ControlRow>
          <Slider label="静止尺寸" value={opts.baseItemSize} min={24} max={64} step={2} format={(v) => `${v}px`} onChange={(baseItemSize) => set({ baseItemSize })} />
          <Slider label="峰值尺寸" value={opts.magnification} min={40} max={110} step={2} format={(v) => `${v}px`} onChange={(magnification) => set({ magnification })} />
          <Slider label="衰减半径" value={opts.distance} min={60} max={420} step={10} format={(v) => `${v}px`} onChange={(distance) => set({ distance })} />
          <Slider label="面板厚度" value={opts.panelHeight} min={56} max={110} step={2} format={(v) => `${v}px`} onChange={(panelHeight) => set({ panelHeight })} />
          <Slider label="间距" value={opts.gap} min={0} max={24} step={1} format={(v) => `${v}px`} onChange={(gap) => set({ gap })} />
          <Slider label="圆角" value={opts.roundness} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(roundness) => set({ roundness })} />
          <Color label="角标颜色" value={opts.badgeColor} onChange={(badgeColor) => set({ badgeColor })} />
          <Color label="高亮颜色" value={opts.accentColor} onChange={(accentColor) => set({ accentColor })} />
          <ControlRow label="起跳弹跳">
            <Switch checked={opts.bounce} onChange={(bounce) => set({ bounce })} label="起跳弹跳" />
          </ControlRow>
          <ControlRow label="自动隐藏">
            <Switch checked={opts.autoHide} onChange={(autoHide) => set({ autoHide })} label="自动隐藏" />
          </ControlRow>
          <ControlRow label="磁贴底板">
            <Switch checked={opts.tiles} onChange={(tiles) => set({ tiles })} label="磁贴底板" />
          </ControlRow>
          <ControlRow label="名称气泡">
            <Switch checked={opts.showLabels} onChange={(showLabels) => set({ showLabels })} label="名称气泡" />
          </ControlRow>
          <ControlRow label="运行圆点">
            <Switch checked={opts.showIndicators} onChange={(showIndicators) => set({ showIndicators })} label="运行圆点" />
          </ControlRow>
          <ControlRow label="通知角标">
            <Switch checked={opts.showBadges} onChange={(showBadges) => set({ showBadges })} label="通知角标" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the dark dock mid-magnification on a dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 220, background: "#101014" }}>
        <Dock items={ITEMS} theme="dark" />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
