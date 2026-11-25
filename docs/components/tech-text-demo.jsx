import { useEffect, useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as TechText } from "../../src/components/tech-text/TechText.jsx";

/* This component is a plain React + CSS pair (canvas-based). The demo keeps
   color/accentColor on `currentColor` so the wordmark follows the site
   theme; a switch releases them to two color pickers. */
const DEFAULTS = {
  text: "Solen Design",
  fontFamily: "",
  fontWeight: 600,
  fontSize: 150,
  letterSpacing: -0.05,
  align: "center",
  reach: 200,
  softness: 0.7,
  dashLength: 4,
  dashGap: 2,
  strokeWidth: 1.5,
  lineStyle: "dashed",
  reveal: "letter",
  specks: 15,
  selection: true,
  labels: true,
  draggable: true,
  bounce: 0.4,
  sweep: true,
  speed: 1,
  clickKick: true,
  intro: "none",
  introDuration: 2,
  guides: false,
};

const ALIGNS = ["left", "center", "right"];

const REVEALS = ["area", "letter", "off"];

const INTROS = ["none", "type", "assemble", "metrics"];

const LINE_STYLES = ["dashed", "solid"];

function ControlRow({ label, children }) {
  return (
    <div className="control">
      <span className="control-label">{label}</span>
      {children}
    </div>
  );
}

function TextField({ label, value, onChange }) {
  return (
    <ControlRow label={label}>
      <input type="text" value={value} onChange={(event) => onChange(event.target.value)} aria-label={label} />
    </ControlRow>
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

function Color({ label, value, onChange }) {
  return (
    <ControlRow label={label}>
      <input type="color" value={value} onChange={(event) => onChange(event.target.value)} aria-label={label} />
    </ControlRow>
  );
}

function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const [picked, setPicked] = useState({});
  const themeInk = "#171717";
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => {
    setOpts(DEFAULTS);
    setPicked({});
  };

  return (
    <>
      <div className="demo-stage" style={{ background: "#ffffff", colorScheme: "light" }}>
        <DemoFit>

          <div style={{ width: "100%", height: 420, position: "relative" }}>
            <TechText {...opts} color={picked.color ?? themeInk} accentColor={picked.accentColor ?? themeInk} />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./tech-text-preview.html">
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
          <TextField label="文字" value={opts.text} onChange={(text) => set({ text })} />
          <TextField label="字体族" value={opts.fontFamily} onChange={(fontFamily) => set({ fontFamily })} />
          <Slider label="字重" value={opts.fontWeight} min={300} max={900} step={100} format={(v) => String(v)} onChange={(fontWeight) => set({ fontWeight })} />
          <Slider label="基准字号" value={opts.fontSize} min={60} max={260} step={5} format={(v) => `${v}px`} onChange={(fontSize) => set({ fontSize })} />
          <Slider label="字距" value={opts.letterSpacing} min={-0.2} max={0.3} step={0.01} format={(v) => `${v.toFixed(2)}em`} onChange={(letterSpacing) => set({ letterSpacing })} />
          <Slider label="对齐" value={ALIGNS.indexOf(opts.align)} min={0} max={2} step={1} format={(v) => ["左", "中", "右"][v]} onChange={(v) => set({ align: ALIGNS[v] })} />
          <Color label="文字颜色" value={picked.color ?? themeInk} onChange={(c) => setPicked((prev) => ({ ...prev, color: c }))} />
          <Color label="强调色" value={picked.accentColor ?? themeInk} onChange={(c) => setPicked((prev) => ({ ...prev, accentColor: c }))} />
          <Slider label="揭示方式" value={REVEALS.indexOf(opts.reveal)} min={0} max={2} step={1} format={(v) => ["区域", "单字母", "关闭"][v]} onChange={(v) => set({ reveal: REVEALS[v] })} />
          <Slider label="响应半径" value={opts.reach} min={50} max={400} step={5} format={(v) => `${v}px`} onChange={(reach) => set({ reach })} />
          <Slider label="边缘柔和度" value={opts.softness} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(softness) => set({ softness })} />
          <Slider label="线型" value={LINE_STYLES.indexOf(opts.lineStyle)} min={0} max={1} step={1} format={(v) => ["虚线", "实线"][v]} onChange={(v) => set({ lineStyle: LINE_STYLES[v] })} />
          <Slider label="虚线段长" value={opts.dashLength} min={1} max={12} step={0.5} format={(v) => `${v}px`} onChange={(dashLength) => set({ dashLength })} />
          <Slider label="虚线间隔" value={opts.dashGap} min={0} max={8} step={0.5} format={(v) => `${v}px`} onChange={(dashGap) => set({ dashGap })} />
          <Slider label="描边粗细" value={opts.strokeWidth} min={0.5} max={4} step={0.1} format={(v) => `${v.toFixed(1)}px`} onChange={(strokeWidth) => set({ strokeWidth })} />
          <Slider label="像素碎屑" value={opts.specks} min={0} max={40} step={1} format={(v) => String(v)} onChange={(specks) => set({ specks })} />
          <ControlRow label="选中框">
            <Switch checked={opts.selection} onChange={(selection) => set({ selection })} label="选中框" />
          </ControlRow>
          <ControlRow label="标注信息">
            <Switch checked={opts.labels} onChange={(labels) => set({ labels })} label="标注信息" />
          </ControlRow>
          <ControlRow label="可拖拽">
            <Switch checked={opts.draggable} onChange={(draggable) => set({ draggable })} label="可拖拽" />
          </ControlRow>
          <Slider label="回弹幅度" value={opts.bounce} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(bounce) => set({ bounce })} />
          <ControlRow label="点击弹跳">
            <Switch checked={opts.clickKick} onChange={(clickKick) => set({ clickKick })} label="点击弹跳" />
          </ControlRow>
          <ControlRow label="字体标线">
            <Switch checked={opts.guides} onChange={(guides) => set({ guides })} label="字体标线" />
          </ControlRow>
          <Slider label="入场动画" value={INTROS.indexOf(opts.intro)} min={0} max={3} step={1} format={(v) => ["无", "打字", "汇聚", "度量"][v]} onChange={(v) => set({ intro: INTROS[v] })} />
          <Slider label="入场时长" value={opts.introDuration} min={0.5} max={5} step={0.1} format={(v) => `${v.toFixed(1)}s`} onChange={(introDuration) => set({ introDuration })} />
          <ControlRow label="自动巡游">
            <Switch checked={opts.sweep} onChange={(sweep) => set({ sweep })} label="自动巡游" />
          </ControlRow>
          <Slider label="巡游速度" value={opts.speed} min={0.25} max={3} step={0.05} format={(v) => `${v.toFixed(2)}×`} onChange={(speed) => set({ speed })} />
        </div>
      </div>
    </>
  );
}

/* Gallery card — the wordmark at card scale. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 180, position: "relative" }}>
        <TechText text="Solen" fontSize={90} reveal="letter" specks={12} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
