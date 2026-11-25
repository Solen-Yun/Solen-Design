import { useEffect, useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as ThoughtLine } from "../../src/components/thought-line/ThoughtLine.jsx";

/* The demo plus a live customize panel — every control is a real option.
   The trace runs for settleAfter seconds, then folds itself into one line. */

const DEFAULTS = {
  label: "Thinking…",
  doneLabel: "Thought for",
  glyph: "sparkle",
  collapsible: true,
  collapseOnSettle: true,
  fontSize: 16,
  breathPeriod: 1.6,
  breathDepth: 0.45,
  shimmer: true,
  shimmerDuration: 1.8,
  settleDuration: 350,
  settleBlur: 2,
  settleAfter: 6,
  showTimer: true,
  autoLoop: true,
};

const STEPS = ["解析问题结构", "检索相关组件模式", "权衡动效与可读性", "整理结论"];

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

function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const [round, setRound] = useState(0);
  const [working, setWorking] = useState(true);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));

  useEffect(() => {
    if (!opts.autoLoop) return undefined;
    if (!working) {
      const id = setTimeout(() => setRound((r) => r + 1), 3200);
      return () => clearTimeout(id);
    }
    return undefined;
  }, [working, opts.autoLoop]);
  useEffect(() => {
    setWorking(true);
  }, [round]);

  const reset = () => {
    setOpts(DEFAULTS);
    setRound((r) => r + 1);
    setWorking(true);
  };

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, width: "100%", height: 240, color: "#f5f5f5", padding: "0 32px" }}>
            <ThoughtLine
              key={round}
              label={opts.label}
              doneLabel={opts.doneLabel}
              glyph={opts.glyph}
              steps={STEPS}
              collapsible={opts.collapsible}
              collapseOnSettle={opts.collapseOnSettle}
              fontSize={opts.fontSize}
              breathPeriod={opts.breathPeriod}
              breathDepth={opts.breathDepth}
              shimmer={opts.shimmer}
              shimmerDuration={opts.shimmerDuration}
              settleDuration={opts.settleDuration}
              settleBlur={opts.settleBlur}
              working={working}
              settleAfter={opts.settleAfter}
              showTimer={opts.showTimer}
              onSettle={() => setWorking(false)}
            />
            <div className="view-tabs">
              <button type="button" className={working ? "active" : ""} onClick={() => setWorking(true)}>
                思考中
              </button>
              <button type="button" className={!working ? "active" : ""} onClick={() => { setWorking(false); setRound((r) => r + 1); }}>
                立即完成
              </button>
            </div>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./thought-line-preview.html">
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
          <TextField label="思考文案" value={opts.label} onChange={(label) => set({ label })} />
          <TextField label="完成文案" value={opts.doneLabel} onChange={(doneLabel) => set({ doneLabel })} />
          <ControlRow label="行首图形">
            <div className="view-tabs">
              {[["sparkle", "星光"], ["dot", "圆点"], ["none", "无"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.glyph === id ? "active" : ""} onClick={() => set({ glyph: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="自动完成" value={opts.settleAfter} min={2} max={20} step={1} format={(v) => `${v}s`} onChange={(settleAfter) => set({ settleAfter })} />
          <Slider label="字号" value={opts.fontSize} min={13} max={20} step={1} format={(v) => `${v}px`} onChange={(fontSize) => set({ fontSize })} />
          <Slider label="呼吸周期" value={opts.breathPeriod} min={0.8} max={3} step={0.1} format={(v) => `${v.toFixed(1)}s`} onChange={(breathPeriod) => set({ breathPeriod })} />
          <Slider label="呼吸深度" value={opts.breathDepth} min={0} max={0.8} step={0.05} format={(v) => v.toFixed(2)} onChange={(breathDepth) => set({ breathDepth })} />
          <Slider label="流光时长" value={opts.shimmerDuration} min={0.8} max={4} step={0.2} format={(v) => `${v.toFixed(1)}s`} onChange={(shimmerDuration) => set({ shimmerDuration })} />
          <Slider label="完成时长" value={opts.settleDuration} min={120} max={800} step={10} format={(v) => `${v}ms`} onChange={(settleDuration) => set({ settleDuration })} />
          <Slider label="模糊半径" value={opts.settleBlur} min={0} max={8} step={1} format={(v) => `${v}px`} onChange={(settleBlur) => set({ settleBlur })} />
          <ControlRow label="流光">
            <Switch checked={opts.shimmer} onChange={(shimmer) => set({ shimmer })} label="流光" />
          </ControlRow>
          <ControlRow label="可折叠">
            <Switch checked={opts.collapsible} onChange={(collapsible) => set({ collapsible })} label="可折叠" />
          </ControlRow>
          <ControlRow label="完成即折叠">
            <Switch checked={opts.collapseOnSettle} onChange={(collapseOnSettle) => set({ collapseOnSettle })} label="完成即折叠" />
          </ControlRow>
          <ControlRow label="显示计时">
            <Switch checked={opts.showTimer} onChange={(showTimer) => set({ showTimer })} label="显示计时" />
          </ControlRow>
          <ControlRow label="循环演示">
            <Switch checked={opts.autoLoop} onChange={(autoLoop) => set({ autoLoop })} label="循环演示" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — a settled line on the dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ display: "grid", placeItems: "center", width: "100%", height: 170, background: "#101014", color: "#f5f5f5" }}>
        <ThoughtLine label="Thinking…" glyph="sparkle" steps={["解析问题结构", "检索相关组件模式", "权衡动效与可读性"]} working={true} showTimer={true} collapsible={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
