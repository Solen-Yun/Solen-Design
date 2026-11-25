import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as Folder } from "../../src/components/folder/Folder.jsx";

/* The demo plus a live customize panel — every control is a real option.
   The desk stage keeps the dragged pages inside the frame. */

const ITEMS = [
  { title: "Brand guidelines", description: "Colors, type and voice" },
  { title: "Launch plan", description: "Milestones and owners" },
  { title: "Moodboard", image: "" },
];

const DEFAULTS = {
  mode: "flap",
  variant: "solid",
  color: "#3d8bff",
  layout: "spread",
  tabPosition: "right",
  size: 1,
  peek: true,
  draggable: true,
  zoomOnClick: true,
  bounce: 0.4,
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

function Segmented({ label, value, options, onChange }) {
  return (
    <ControlRow label={label}>
      <div className="view-tabs">
        {options.map(([id, text]) => (
          <button key={id} type="button" className={value === id ? "active" : ""} onClick={() => onChange(id)}>
            {text}
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
          <div
            style={{
              position: "relative",
              width: "100%",
              height: 340,
              overflow: "hidden",
              borderRadius: 16,
              background: "linear-gradient(180deg, #16151c 0%, #101014 100%)",
            }}
          >
            <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
              <Folder
                label="Projects"
                items={[
                  { title: "Brand guidelines", description: "Colors, type and voice" },
                  { title: "Launch plan", description: "Milestones and owners" },
                  { title: "Notes", description: "Assorted scribbles" },
                ]}
                mode={opts.mode}
                variant={opts.variant}
                color={opts.color}
                layout={opts.layout}
                tabPosition={opts.tabPosition}
                size={opts.size}
                peek={opts.peek}
                draggable={opts.draggable}
                zoomOnClick={opts.zoomOnClick}
                bounce={opts.bounce}
                intro={false}
                theme="dark"
              />
            </div>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./folder-preview.html">
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
          <Segmented label="形态" value={opts.mode} options={[["flap", "翻盖"], ["book", "书本"]]} onChange={(mode) => set({ mode })} />
          <Segmented label="材质" value={opts.variant} options={[["solid", "实色"], ["glass", "玻璃"], ["matte", "哑光"]]} onChange={(variant) => set({ variant })} />
          <Color label="主色" value={opts.color} onChange={(color) => set({ color })} />
          <Segmented label="页面排布" value={opts.layout} options={[["spread", "摊开"], ["row", "横排"], ["stack", "竖叠"]]} onChange={(layout) => set({ layout })} />
          <Segmented label="标签位" value={opts.tabPosition} options={[["left", "左"], ["center", "中"], ["right", "右"]]} onChange={(tabPosition) => set({ tabPosition })} />
          <Slider label="大小" value={opts.size} min={0.6} max={1.4} step={0.05} format={(v) => `×${v.toFixed(2)}`} onChange={(size) => set({ size })} />
          <Slider label="回弹" value={opts.bounce} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(bounce) => set({ bounce })} />
          <ControlRow label="悬停掀缝">
            <Switch checked={opts.peek} onChange={(peek) => set({ peek })} label="悬停掀缝" />
          </ControlRow>
          <ControlRow label="可拖拽">
            <Switch checked={opts.draggable} onChange={(draggable) => set({ draggable })} label="可拖拽" />
          </ControlRow>
          <ControlRow label="点击放大">
            <Switch checked={opts.zoomOnClick} onChange={(zoomOnClick) => set({ zoomOnClick })} label="点击放大" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the closed folder resting on a dark desk. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 170,
          overflow: "hidden",
          background: "linear-gradient(180deg, #16151c 0%, #101014 100%)",
        }}
      >
        <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
          <Folder label="Projects" size={0.78} intro={false} theme="dark" />
        </div>
      </div>
    </div>
  );
}

export { Demo, CardPreview };
