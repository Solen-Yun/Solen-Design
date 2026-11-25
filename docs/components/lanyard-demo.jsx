import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as Lanyard } from "../../src/components/lanyard/Lanyard.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Drag the badge around and throw it; click it quickly for a 180° flip. */
const DEFAULTS = {
  frontImage: "./assets/demo-photos/photo-01.jpg",
  backImage: "./assets/demo-photos/photo-02.jpg",
  strapImage: "./assets/demo-photos/photo-03.jpg",
  imageFit: "cover",
  cardColor: "#ffffff",
  orientation: "portrait",
  finish: "glossy",
  cornerRadius: 0.3,
  size: 0.6,
  anchor: "center",
  strapLength: 0.5,
  strapColor: "#111111",
  strapWidth: 0.65,
  metal: "silver",
  gravity: 1,
  damping: 0.5,
  elasticity: 0.5,
  breeze: 0.5,
  interactive: true,
  intro: true,
};

const VIEW_TABS = {
  imageFit: [["cover", "铺满"], ["contain", "完整"]],
  orientation: [["portrait", "竖版"], ["landscape", "横版"]],
  anchor: [["left", "左"], ["center", "中"], ["right", "右"]],
  metal: [["silver", "银"], ["gold", "金"], ["graphite", "石墨"]],
  finish: [["glossy", "亮面"], ["matte", "哑光"], ["holographic", "镭射"], ["metallic", "金属"]],
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

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ width: 620, height: 520 }}>
            <Lanyard {...opts} />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./lanyard-preview.html">
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
          <Tabs label="材质" options={VIEW_TABS.finish} value={opts.finish} onChange={(finish) => set({ finish })} />
          <Tabs label="金属件" options={VIEW_TABS.metal} value={opts.metal} onChange={(metal) => set({ metal })} />
          <Tabs label="方向" options={VIEW_TABS.orientation} value={opts.orientation} onChange={(orientation) => set({ orientation })} />
          <Tabs label="图片填充" options={VIEW_TABS.imageFit} value={opts.imageFit} onChange={(imageFit) => set({ imageFit })} />
          <Tabs label="吊点" options={VIEW_TABS.anchor} value={opts.anchor} onChange={(anchor) => set({ anchor })} />
          <Color label="卡面底色" value={opts.cardColor} onChange={(cardColor) => set({ cardColor })} />
          <Color label="织带颜色" value={opts.strapColor} onChange={(strapColor) => set({ strapColor })} />
          <Slider label="卡片占比" value={opts.size} min={0.15} max={0.9} step={0.05} format={(v) => v.toFixed(2)} onChange={(size) => set({ size })} />
          <Slider label="吊绳长度" value={opts.strapLength} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(strapLength) => set({ strapLength })} />
          <Slider label="织带宽度" value={opts.strapWidth} min={0.4} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(strapWidth) => set({ strapWidth })} />
          <Slider label="卡片圆角" value={opts.cornerRadius} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(cornerRadius) => set({ cornerRadius })} />
          <Slider label="重力" value={opts.gravity} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(gravity) => set({ gravity })} />
          <Slider label="收敛" value={opts.damping} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(damping) => set({ damping })} />
          <Slider label="弹性" value={opts.elasticity} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(elasticity) => set({ elasticity })} />
          <Slider label="风力" value={opts.breeze} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(breeze) => set({ breeze })} />
          <ControlRow label="可交互">
            <Switch checked={opts.interactive} onChange={(interactive) => set({ interactive })} label="可交互" />
          </ControlRow>
          <ControlRow label="开场荡入">
            <Switch checked={opts.intro} onChange={(intro) => set({ intro })} label="开场荡入" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the badge mid-swing on a dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 260, background: "#101014" }}>
        <Lanyard
          frontImage={DEFAULTS.frontImage}
          strapImage={DEFAULTS.strapImage}
          finish="holographic"
          metal="gold"
          breeze={0.6}
        />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
