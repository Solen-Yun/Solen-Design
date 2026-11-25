import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as SplitText } from "../../src/components/split-text/SplitText.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Switch the preset, replay with hover/click, then sweep the pointer through
   the revealed text with lift or wave. */

const DEFAULTS = {
  text: "Type that lands letter by letter",
  splitType: "chars",
  effect: "rise",
  trigger: "view",
  hoverEffect: "none",
  delay: 50,
  duration: 1.25,
  threshold: 0.1,
  loopDelay: 1.5,
  mask: false,
  loop: false,
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
  const [picked, setPicked] = useState({});
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => {
    setOpts(DEFAULTS);
    setPicked({});
  };

  return (
    <>
      <div className="demo-stage" style={{ background: "#ffffff", colorScheme: "light" }}>
        <DemoFit>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: 300,
              padding: "0 32px",
            }}
          >
            <div style={{ fontSize: 44, fontWeight: 800 }}>
              <SplitText
                text={opts.text}
                splitType={opts.splitType}
                effect={opts.effect}
                trigger={opts.trigger}
                hoverEffect={opts.hoverEffect}
                delay={opts.delay}
                duration={opts.duration}
                threshold={opts.threshold}
                loopDelay={opts.loopDelay}
                mask={opts.mask}
                loop={opts.loop}
                color={picked.color ?? "#171717"}
                accentColor={picked.accentColor}
              />
            </div>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./split-text-preview.html">
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
          <ControlRow label="拆分单位">
            <div className="view-tabs">
              {[["chars", "字符"], ["words", "单词"], ["lines", "整行"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.splitType === id ? "active" : ""} onClick={() => set({ splitType: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="入场预设">
            <div className="view-tabs">
              {[["rise", "升起"], ["fade", "淡入"], ["blur", "模糊"], ["flip", "翻转"], ["pop", "弹出"], ["skew", "斜切"], ["wave", "波浪"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.effect === id ? "active" : ""} onClick={() => set({ effect: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="触发">
            <div className="view-tabs">
              {[["load", "加载"], ["view", "视口"], ["hover", "悬停"], ["click", "点击"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.trigger === id ? "active" : ""} onClick={() => set({ trigger: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="指针效果">
            <div className="view-tabs">
              {[["none", "无"], ["lift", "抬升"], ["wave", "波浪"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.hoverEffect === id ? "active" : ""} onClick={() => set({ hoverEffect: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="错峰间隔" value={opts.delay} min={0} max={200} step={5} format={(v) => `${v}ms`} onChange={(delay) => set({ delay })} />
          <Slider label="单片时长" value={opts.duration} min={0.3} max={3} step={0.05} format={(v) => `${v.toFixed(2)}s`} onChange={(duration) => set({ duration })} />
          <Slider label="视口触发线" value={opts.threshold} min={0} max={0.5} step={0.05} format={(v) => `${Math.round((1 - v) * 100)}%`} onChange={(threshold) => set({ threshold })} />
          <Slider label="循环停顿" value={opts.loopDelay} min={0.5} max={4} step={0.1} format={(v) => `${v.toFixed(1)}s`} onChange={(loopDelay) => set({ loopDelay })} />
          <Color label="文字颜色" value={picked.color ?? "#171717"} onChange={(color) => setPicked((prev) => ({ ...prev, color }))} />
          <Color label="强调色" value={picked.accentColor ?? "#ff5a36"} onChange={(accentColor) => setPicked((prev) => ({ ...prev, accentColor }))} />
          <ControlRow label="裁切遮罩">
            <Switch checked={opts.mask} onChange={(mask) => set({ mask })} label="裁切遮罩" />
          </ControlRow>
          <ControlRow label="循环重播">
            <Switch checked={opts.loop} onChange={(loop) => set({ loop })} label="循环重播" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the blurred rise at card scale. */
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
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 800 }}>
          <SplitText text="Lands letter by letter" effect="blur" trigger="load" delay={30} duration={1} color="#f4f4f5" />
        </div>
      </div>
    </div>
  );
}

export { Demo, CardPreview };
