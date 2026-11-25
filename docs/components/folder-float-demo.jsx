import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as FolderFloat } from "../../src/components/folder-float/FolderFloat.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Open on hover, throw notes around, then click one to pick it. */

const DEFAULTS = {
  trigger: "hover",
  physics: true,
  closeOnSelect: true,
  drift: 0.5,
  spread: 180,
  lift: 26,
  tilt: 8,
  flapAngle: 34,
  openDuration: 520,
  stagger: 45,
  bounce: 0.3,
  folderColor: "#3f3f46",
  frontColor: "#52525b",
  itemColor: "#f5f5f5",
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
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", width: "100%", height: 320, padding: 40, boxSizing: "border-box", color: "#f5f5f5" }}>
            <FolderFloat
              trigger={opts.trigger}
              physics={opts.physics}
              closeOnSelect={opts.closeOnSelect}
              drift={opts.drift}
              spread={opts.spread}
              lift={opts.lift}
              tilt={opts.tilt}
              flapAngle={opts.flapAngle}
              openDuration={opts.openDuration}
              stagger={opts.stagger}
              bounce={opts.bounce}
              folderColor={opts.folderColor}
              frontColor={opts.frontColor}
              itemColor={opts.itemColor}
              onSelect={(value, index) => console.log(value, index)}
              onOpenChange={(open) => console.log(open)}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./folder-float-preview.html">
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
          <ControlRow label="触发方式">
            <div className="view-tabs">
              {[["hover", "悬停"], ["press", "按压"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.trigger === id ? "active" : ""} onClick={() => set({ trigger: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="漂移力" value={opts.drift} min={0} max={2} step={0.1} format={(v) => `×${v.toFixed(1)}`} onChange={(drift) => set({ drift })} />
          <Slider label="浮动区半宽" value={opts.spread} min={100} max={280} step={10} format={(v) => `${v}px`} onChange={(spread) => set({ spread })} />
          <Slider label="浮出高度" value={opts.lift} min={0} max={80} step={2} format={(v) => `${v}px`} onChange={(lift) => set({ lift })} />
          <Slider label="便签倾角" value={opts.tilt} min={0} max={20} step={1} format={(v) => `${v}°`} onChange={(tilt) => set({ tilt })} />
          <Slider label="盖子开角" value={opts.flapAngle} min={0} max={60} step={2} format={(v) => `${v}°`} onChange={(flapAngle) => set({ flapAngle })} />
          <Slider label="展开时长" value={opts.openDuration} min={200} max={1000} step={20} format={(v) => `${v}ms`} onChange={(openDuration) => set({ openDuration })} />
          <Slider label="级联间隔" value={opts.stagger} min={0} max={120} step={5} format={(v) => `${v}ms`} onChange={(stagger) => set({ stagger })} />
          <Slider label="回弹感" value={opts.bounce} min={0} max={0.8} step={0.05} format={(v) => v.toFixed(2)} onChange={(bounce) => set({ bounce })} />
          <Color label="背板色" value={opts.folderColor} onChange={(folderColor) => set({ folderColor })} />
          <Color label="盖面色" value={opts.frontColor} onChange={(frontColor) => set({ frontColor })} />
          <Color label="便签色" value={opts.itemColor} onChange={(itemColor) => set({ itemColor })} />
          <ControlRow label="物理世界">
            <Switch checked={opts.physics} onChange={(physics) => set({ physics })} label="物理世界" />
          </ControlRow>
          <ControlRow label="选后收起">
            <Switch checked={opts.closeOnSelect} onChange={(closeOnSelect) => set({ closeOnSelect })} label="选后收起" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the closed folder resting on a dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          width: "100%",
          height: 170,
          padding: 20,
          boxSizing: "border-box",
          background: "#101014",
        }}
      >
        <FolderFloat trigger="press" physics={false} label="Design feedback" />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
