import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as PaperCrumple } from "../../src/components/paper-crumple/PaperCrumple.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Hold the sheet to crumple it, drag while held, release to see the
   selected release behaviour. The image is one of the site's own wallpapers. */

const IMG = "./assets/wallpaper-05.jpg";

const DEFAULTS = {
  crumpleAmount: 0.85,
  releaseBehavior: "restore",
  foldCount: 6,
  draggable: true,
  shadow: true,
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

function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => setOpts(DEFAULTS);

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 420, color: "#f5f5f5" }}>
            <PaperCrumple
              src={IMG}
              alt="可揉捏的海报"
              width={320}
              height={400}
              sceneHeight={400}
              crumpleAmount={opts.crumpleAmount}
              releaseBehavior={opts.releaseBehavior}
              foldCount={opts.foldCount}
              draggable={opts.draggable}
              shadow={opts.shadow}
              className="paper-crumple-demo"
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./paper-crumple-preview.html">
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
          <ControlRow label="松手行为">
            <div className="view-tabs">
              {[["restore", "弹回"], ["creased", "折痕"], ["stay", "保持"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.releaseBehavior === id ? "active" : undefined} onClick={() => set({ releaseBehavior: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="揉皱深度" value={opts.crumpleAmount} min={0.2} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(crumpleAmount) => set({ crumpleAmount })} />
          <Slider label="折痕线数" value={opts.foldCount} min={3} max={16} step={1} format={(v) => String(v)} onChange={(foldCount) => set({ foldCount })} />
          <ControlRow label="可拖动">
            <Switch checked={opts.draggable} onChange={(draggable) => set({ draggable })} label="可拖动" />
          </ControlRow>
          <ControlRow label="投影">
            <Switch checked={opts.shadow} onChange={(shadow) => set({ shadow })} label="投影" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the sheet mid-crumple on a dark stage. */
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
          color: "#f5f5f5",
        }}
      >
        <PaperCrumple
          src={IMG}
          alt="可揉捏的海报"
          width={260}
          height={330}
          sceneHeight={170}
          crumpleAmount={0.6}
          releaseBehavior="creased"
          draggable={false}
          className="paper-crumple-demo"
        />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
