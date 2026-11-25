import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as Shredder } from "../../src/components/shredder/Shredder.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Drag a row into the slit (or press Delete on a focused row) and the
   snapshot is guillotined into curling canvas strips. */

const DOCS = [
  { id: "contract", emoji: "📄", title: "合同草案", meta: "2.4 MB", bg: "#27272a" },
  { id: "invoice", emoji: "🧾", title: "报销单据", meta: "318 KB", bg: "#303034" },
  { id: "report", emoji: "📊", title: "季度报表", meta: "5.1 MB", bg: "#27272a" },
  { id: "letter", emoji: "💌", title: "情书草稿", meta: "12 KB", bg: "#303034" },
  { id: "minutes", emoji: "🗒️", title: "会议纪要", meta: "96 KB", bg: "#27272a" },
];

const DEFAULTS = {
  fallHeight: 140,
  feedSpeed: 180,
  stripWidth: 10,
  curl: 1,
  bite: 18,
  slitHeight: 4,
  dragTilt: 6,
  autoFeed: true,
  loopAfterDelete: false,
  autoAnimate: false,
  disabled: false,
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
  const [run, setRun] = useState(0);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => {
    setOpts(DEFAULTS);
    setRun((n) => n + 1);
  };

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ display: "flex", justifyContent: "center", width: "100%", padding: "8px 16px" }}>
            <Shredder
              key={run}
              items={DOCS}
              width={340}
              height={460}
              color="#f5f5f5"
              slitColor="#52525b"
              fallHeight={opts.fallHeight}
              feedSpeed={opts.feedSpeed}
              stripWidth={opts.stripWidth}
              curl={opts.curl}
              bite={opts.bite}
              slitHeight={opts.slitHeight}
              dragTilt={opts.dragTilt}
              autoFeed={opts.autoFeed}
              loopAfterDelete={opts.loopAfterDelete}
              autoAnimate={opts.autoAnimate}
              disabled={opts.disabled}
              renderItem={(item, index) => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    height: 56,
                    padding: "0 14px",
                    borderRadius: 12,
                    background: item.bg,
                    color: "#f5f5f5",
                  }}
                >
                  <span style={{ fontSize: 20 }} aria-hidden="true">{item.emoji}</span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: "block", fontSize: 14, fontWeight: 500 }}>{item.title}</span>
                    <span style={{ display: "block", fontSize: 11, color: "rgba(245, 245, 245, 0.55)" }}>
                      文档 #{index + 1} · {item.meta}
                    </span>
                  </span>
                  <span style={{ fontSize: 11, color: "rgba(245, 245, 245, 0.35)" }}>⠿</span>
                </div>
              )}
              onShred={(item) => console.log("shredded", item.id)}
              onReorder={(items) => console.log("order", items.map((d) => d.id))}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./shredder-preview.html">
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
          <Slider label="下落区高" value={opts.fallHeight} min={80} max={240} step={10} format={(v) => `${v}px`} onChange={(fallHeight) => set({ fallHeight })} />
          <Slider label="吞纸速度" value={opts.feedSpeed} min={80} max={400} step={10} format={(v) => `${v}px/s`} onChange={(feedSpeed) => set({ feedSpeed })} />
          <Slider label="纸条宽度" value={opts.stripWidth} min={4} max={40} step={2} format={(v) => `${v}px`} onChange={(stripWidth) => set({ stripWidth })} />
          <Slider label="卷曲" value={opts.curl} min={0} max={2.5} step={0.1} format={(v) => v.toFixed(1)} onChange={(curl) => set({ curl })} />
          <Slider label="下口深度" value={opts.bite} min={6} max={40} step={2} format={(v) => `${v}px`} onChange={(bite) => set({ bite })} />
          <Slider label="刀口高度" value={opts.slitHeight} min={2} max={10} step={1} format={(v) => `${v}px`} onChange={(slitHeight) => set({ slitHeight })} />
          <Slider label="拖动倾斜" value={opts.dragTilt} min={0} max={15} step={1} format={(v) => `${v}°`} onChange={(dragTilt) => set({ dragTilt })} />
          <ControlRow label="拖动中自动咬">
            <Switch checked={opts.autoFeed} onChange={(autoFeed) => set({ autoFeed })} label="拖动中自动咬" />
          </ControlRow>
          <ControlRow label="碎后重生">
            <Switch checked={opts.loopAfterDelete} onChange={(loopAfterDelete) => set({ loopAfterDelete })} label="碎后重生" />
          </ControlRow>
          <ControlRow label="自动演示">
            <Switch checked={opts.autoAnimate} onChange={(autoAnimate) => set({ autoAnimate })} label="自动演示" />
          </ControlRow>
          <ControlRow label="禁用">
            <Switch checked={opts.disabled} onChange={(disabled) => set({ disabled })} label="禁用" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the machine mid-show on the dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: 300,
          background: "#101014",
          overflow: "hidden",
        }}
      >
        <Shredder
          items={DOCS.slice(0, 3)}
          width={300}
          height={360}
          color="#f5f5f5"
          slitColor="#52525b"
          stripWidth={14}
          loopAfterDelete={true}
          autoAnimate={true}
          renderItem={(item) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                height: 52,
                padding: "0 12px",
                borderRadius: 12,
                background: item.bg,
                color: "#f5f5f5",
              }}
            >
              <span style={{ fontSize: 18 }} aria-hidden="true">{item.emoji}</span>
              <span style={{ fontSize: 13, fontWeight: 500 }}>{item.title}</span>
            </div>
          )}
        />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
