import { useRef, useState } from "react";
import { DemoFit } from "../demo-fit";
import WarmTooltip, { WarmTooltipGroup } from "../../src/components/warm-tooltip/WarmTooltip.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Hover one button and wait out the fuse, then sweep the rest while warm:
   the same bubble flies and opens instantly. */

const DEFAULTS = {
  delay: 400,
  warmWindow: 300,
  travel: 320,
  lean: 0,
  side: "top",
  size: "md",
  gap: 8,
  radius: 8,
  arrow: true,
  showFuse: true,
  disabled: false,
};

const TOOLS = [
  { label: "加粗", tip: "加粗选中文本", key: "⌘ B" },
  { label: "斜体", tip: "倾斜选中文本", key: "⌘ I" },
  { label: "链接", tip: "插入链接", key: "⌘ K" },
  { label: "引用", tip: "引用一段文字", key: "⌘ ⇧ .", off: true },
  { label: "代码", tip: "插入代码块", key: "⌘ E" },
];

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
  const [warmCount, setWarmCount] = useState(0);
  const group = useRef(null);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => {
    setOpts(DEFAULTS);
    setWarmCount(0);
    group.current?.reset();
  };

  return (
    <>
      <div className="demo-stage" style={{ background: "#ffffff", colorScheme: "light" }}>
        <DemoFit>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 200, color: "#18181b" }}>
            <WarmTooltipGroup
              delay={opts.delay}
              warmWindow={opts.warmWindow}
              travel={opts.travel}
              lean={opts.lean}
              onWarmChange={(warm) => setWarmCount((n) => n + (warm ? 1 : 0))}
              ref={group}
            >
              <div style={{ display: "inline-flex", gap: 6 }}>
                {TOOLS.map((tool) => (
                  <WarmTooltip
                    key={tool.label}
                    content={tool.tip}
                    shortcut={tool.key}
                    side={opts.side}
                    size={opts.size}
                    gap={opts.gap}
                    radius={opts.radius}
                    arrow={opts.arrow}
                    showFuse={opts.showFuse}
                    disabled={opts.disabled || tool.off}
                  >
                    <button
                      type="button"
                      style={{
                        width: 40,
                        height: 36,
                        border: "1px solid #e4e4e7",
                        borderRadius: 8,
                        background: "#fafafa",
                        fontSize: 14,
                        cursor: tool.off ? "not-allowed" : "pointer",
                        opacity: tool.off ? 0.45 : 1,
                      }}
                    >
                      {tool.label}
                    </button>
                  </WarmTooltip>
                ))}
              </div>
            </WarmTooltipGroup>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./warm-tooltip-preview.html">
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
          <Slider label="冷启动延迟" value={opts.delay} min={0} max={1200} step={20} format={(v) => `${v}ms`} onChange={(delay) => set({ delay })} />
          <Slider label="保温窗口" value={opts.warmWindow} min={0} max={1500} step={50} format={(v) => `${v}ms`} onChange={(warmWindow) => set({ warmWindow })} />
          <Slider label="飞行时长" value={opts.travel} min={80} max={700} step={20} format={(v) => `${v}ms`} onChange={(travel) => set({ travel })} />
          <Slider label="飞行倾斜" value={opts.lean} min={0} max={14} step={1} format={(v) => `${v}°`} onChange={(lean) => set({ lean })} />
          <Slider label="间距" value={opts.gap} min={0} max={24} step={1} format={(v) => `${v}px`} onChange={(gap) => set({ gap })} />
          <Slider label="圆角" value={opts.radius} min={2} max={16} step={1} format={(v) => `${v}px`} onChange={(radius) => set({ radius })} />
          <ControlRow label="弹出方向">
            <div className="view-tabs">
              {[["top", "上"], ["bottom", "下"], ["left", "左"], ["right", "右"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.side === id ? "active" : ""} onClick={() => set({ side: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="尺寸">
            <div className="view-tabs">
              {[["sm", "小"], ["md", "中"], ["lg", "大"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.size === id ? "active" : ""} onClick={() => set({ size: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="指向箭头">
            <Switch checked={opts.arrow} onChange={(arrow) => set({ arrow })} label="指向箭头" />
          </ControlRow>
          <ControlRow label="延迟熔丝">
            <Switch checked={opts.showFuse} onChange={(showFuse) => set({ showFuse })} label="延迟熔丝" />
          </ControlRow>
          <ControlRow label="全部禁用">
            <Switch checked={opts.disabled} onChange={(disabled) => set({ disabled })} label="全部禁用" />
          </ControlRow>
          <ControlRow label="温态计数">
            <output className="control-value">{warmCount}</output>
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — a toolbar whose bubbles fly while warm. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ display: "grid", placeItems: "center", width: "100%", height: 170, background: "#101014", color: "#18181b" }}>
        <WarmTooltipGroup delay={200} warmWindow={600} lean={5}>
          <div style={{ display: "inline-flex", gap: 6 }}>
            {["加粗", "斜体", "链接"].map((label) => (
              <WarmTooltip key={label} content={`${label}工具`} side="top">
                <button
                  type="button"
                  style={{
                    width: 40,
                    height: 36,
                    border: "1px solid #3f3f46",
                    borderRadius: 8,
                    background: "#27272a",
                    color: "#d4d4d8",
                    fontSize: 14,
                    cursor: "pointer",
                  }}
                >
                  {label}
                </button>
              </WarmTooltip>
            ))}
          </div>
        </WarmTooltipGroup>
      </div>
    </div>
  );
}

export { Demo, CardPreview };
