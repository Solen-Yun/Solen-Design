import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as FallingText } from "../../src/components/falling-text/FallingText.jsx";

/* The demo is a physics pit: the sentence collapses on mount, pieces can
   be grabbed, thrown and shoved, and the theme switch swaps the tile
   palette. Switching the trigger re-arms the fall, or hit Reset to replay. */

const DEFAULTS = {
  theme: "dark",
  trigger: "auto",
  variant: "text",
  gravity: 1,
  bounciness: 0.2,
  scatter: 0.5,
  stagger: 0.03,
  cursorPush: 0.5,
  restoreDelay: 0,
  accentColor: "#5b8cff",
  draggable: true,
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

function Tabs({ label, value, options, onChange }) {
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
  const stageBackground = opts.theme === "dark" ? "#101014" : "#ffffff";

  return (
    <>
      <div className="demo-stage" style={{ background: stageBackground, colorScheme: opts.theme }}>
        <DemoFit>
          <div style={{ width: "100%", height: 340 }}>
            <FallingText
              key={`${opts.trigger}-${opts.variant}`}
              text="抓住刚体 随手一甩 堆成一座 字山 Drag Throw Pile"
              highlightWords={["刚体", "字山"]}
              trigger={opts.trigger}
              variant={opts.variant}
              theme={opts.theme}
              accentColor={opts.accentColor}
              gravity={opts.gravity}
              bounciness={opts.bounciness}
              scatter={opts.scatter}
              stagger={opts.stagger}
              cursorPush={opts.cursorPush}
              restoreDelay={opts.restoreDelay}
              draggable={opts.draggable}
              fontSize="1.5rem"
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./falling-text-preview.html">
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
          <ControlRow label="深色主题">
            <Switch checked={opts.theme === "dark"} onChange={(dark) => set({ theme: dark ? "dark" : "light" })} label="深色主题" />
          </ControlRow>
          <Tabs
            label="触发方式"
            value={opts.trigger}
            options={[["auto", "挂载"], ["hover", "悬停"], ["click", "点击"], ["scroll", "滚动"]]}
            onChange={(trigger) => set({ trigger })}
          />
          <Tabs
            label="外观"
            value={opts.variant}
            options={[["text", "裸字"], ["tiles", "瓷砖"]]}
            onChange={(variant) => set({ variant })}
          />
          <Color label="强调色" value={opts.accentColor} onChange={(accentColor) => set({ accentColor })} />
          <Slider label="重力" value={opts.gravity} min={-2} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(gravity) => set({ gravity })} />
          <Slider label="弹性" value={opts.bounciness} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(bounciness) => set({ bounciness })} />
          <Slider label="初始踢力" value={opts.scatter} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(scatter) => set({ scatter })} />
          <Slider label="释放错峰" value={opts.stagger} min={0} max={0.12} step={0.01} format={(v) => `${v.toFixed(2)}s`} onChange={(stagger) => set({ stagger })} />
          <Slider label="指针推力" value={opts.cursorPush} min={0} max={2} step={0.1} format={(v) => v.toFixed(1)} onChange={(cursorPush) => set({ cursorPush })} />
          <Slider label="归位延迟" value={opts.restoreDelay} min={0} max={6} step={0.5} format={(v) => `${v.toFixed(1)}s`} onChange={(restoreDelay) => set({ restoreDelay })} />
          <ControlRow label="可抓取">
            <Switch checked={opts.draggable} onChange={(draggable) => set({ draggable })} label="可抓取" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — dark tiles collapsing once on mount, one accent word. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div
        style={{
          width: "100%",
          height: 170,
          background: "#101014",
          colorScheme: "dark",
          overflow: "hidden",
        }}
      >
        <FallingText
          text="文字也会 摔倒 堆积 Drag"
          highlightWords={["摔倒"]}
          variant="tiles"
          theme="dark"
          trigger="auto"
          fontSize="1.25rem"
          stagger={0.05}
        />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
