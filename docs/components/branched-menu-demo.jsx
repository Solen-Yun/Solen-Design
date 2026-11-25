import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as BranchedMenu } from "../../src/components/branched-menu/BranchedMenu.jsx";
import {
  CursorPointer01Icon,
  Download04Icon,
  Layers01Icon,
  Notification03Icon,
  PaintBoardIcon,
  Rocket01Icon,
  Settings02Icon,
  TextFontIcon
} from "@hugeicons/core-free-icons";

/* Demo content — same sections the component ships as DEFAULT_ITEMS, in
   the site's language. Icons come straight from the hugeicons free set. */
const DEMO_ITEMS = [
  {
    label: "开始使用",
    children: [
      { value: "install", label: "安装", icon: Download04Icon },
      { value: "quick", label: "快速上手", icon: Rocket01Icon },
      { value: "config", label: "配置", icon: Settings02Icon },
      { value: "theming", label: "主题定制", icon: PaintBoardIcon }
    ]
  },
  {
    label: "组件",
    children: [
      { value: "buttons", label: "按钮", icon: CursorPointer01Icon },
      { value: "typography", label: "文字排版", icon: TextFontIcon },
      { value: "overlays", label: "浮层", icon: Layers01Icon },
      { value: "toasts", label: "通知", icon: Notification03Icon }
    ]
  }
];

const DEFAULTS = {
  width: 240,
  rowHeight: 36,
  indent: 40,
  drawDuration: 400,
  foldDuration: 300,
  collapseAll: false,
};

/* This component is a plain React + CSS pair — no motion engine, no shadow
   root, and no framework variants. defaultOpen / defaultActive are
   mount-time props, so the collapse switch remounts via key. */
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

  return (
    <>
      <div className="demo-stage" style={{ background: "#17181c", colorScheme: "dark" }}>
        <DemoFit>
          <BranchedMenu
            key={opts.collapseAll ? "closed" : "open"}
            items={DEMO_ITEMS}
            defaultOpen={opts.collapseAll ? -1 : [0]}
            defaultActive="quick"
            onSelect={(value) => console.log("select", value)}
            onToggle={(index, open) => console.log("toggle", index, open)}
            width={opts.width}
            rowHeight={opts.rowHeight}
            indent={opts.indent}
            drawDuration={opts.drawDuration}
            foldDuration={opts.foldDuration}
          />
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./branched-menu-preview.html">
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
          <ControlRow label="初始全收起">
            <Switch checked={opts.collapseAll} onChange={(collapseAll) => set({ collapseAll })} label="初始全收起" />
          </ControlRow>
          <Slider label="菜单宽度" value={opts.width} min={180} max={320} step={4} format={(v) => `${v}px`} onChange={(width) => set({ width })} />
          <Slider label="行高" value={opts.rowHeight} min={28} max={48} step={1} format={(v) => `${v}px`} onChange={(rowHeight) => set({ rowHeight })} />
          <Slider label="缩进" value={opts.indent} min={28} max={56} step={1} format={(v) => `${v}px`} onChange={(indent) => set({ indent })} />
          <Slider label="描线时长" value={opts.drawDuration} min={100} max={900} step={20} format={(v) => `${v}ms`} onChange={(drawDuration) => set({ drawDuration })} />
          <Slider label="折叠时长" value={opts.foldDuration} min={100} max={700} step={20} format={(v) => `${v}ms`} onChange={(foldDuration) => set({ foldDuration })} />
        </div>
      </div>
    </>
  );
}

/* Gallery card — the menu resting in a small dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div
        style={{
          padding: "20px 8px",
          background: "#17181c",
          borderRadius: 12,
          height: 170,
          overflow: "hidden",
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <BranchedMenu items={DEMO_ITEMS} defaultOpen={[0]} defaultActive="quick" />
      </div>
    </div>
  );
}


export { Demo, CardPreview };
