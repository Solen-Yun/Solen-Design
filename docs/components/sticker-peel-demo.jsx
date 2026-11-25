import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as StickerPeel } from "../../src/components/sticker-peel/StickerPeel.jsx";

/* The demo plus a live customize panel — every control is a real option.
   The sticker artwork is an inline SVG data URI with real transparency,
   so the die-cut star silhouette peels from its true edges. */

const starPath = (() => {
  const cx = 120;
  const cy = 126;
  const outer = 106;
  const inner = 47;
  let d = "";
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = i * (Math.PI / 5) - Math.PI / 2;
    d += (i ? " L" : "M") + ` ${cx + r * Math.cos(a)} ${cy + r * Math.sin(a)}`;
  }
  return `${d} Z`;
})();

const STICKER_SRC = "./assets/demo-photos/photo-01.jpg";
const DEFAULTS = {
  width: 170,
  rotate: -6,
  peelDirection: 0,
  peelBackHoverPct: 25,
  peelBackActivePct: 40,
  curlRadius: 12,
  finish: "holo",
  backColor: "#d4d4d8",
  lightingIntensity: 0.5,
  shadowIntensity: 0.6,
  followPointer: true,
  draggable: true,
  swing: 1,
  friction: 0.5,
  bounce: 0.35,
  intro: true,
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
          <div style={{ position: "relative", width: "100%", height: 420, overflow: "hidden" }}>
            <StickerPeel
              imageSrc={STICKER_SRC}
              width={opts.width}
              rotate={opts.rotate}
              peelDirection={opts.peelDirection}
              peelBackHoverPct={opts.peelBackHoverPct}
              peelBackActivePct={opts.peelBackActivePct}
              curlRadius={opts.curlRadius}
              finish={opts.finish}
              backColor={opts.backColor}
              lightingIntensity={opts.lightingIntensity}
              shadowIntensity={opts.shadowIntensity}
              followPointer={opts.followPointer}
              draggable={opts.draggable}
              swing={opts.swing}
              friction={opts.friction}
              bounce={opts.bounce}
              intro={opts.intro}
              onDragStart={() => console.log("drag start")}
              onDragEnd={() => console.log("drag end")}
            />
            <p
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                paddingBottom: 14,
                margin: 0,
                pointerEvents: "none",
                color: "#52525b",
                fontSize: 13,
                letterSpacing: 2,
              }}
            >
              悬停边缘撕起，按住甩动抛掷
            </p>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./sticker-peel-preview.html">
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
          <ControlRow label="材质">
            <div className="view-tabs">
              {[["gloss", "亮面"], ["matte", "哑面"], ["holo", "镭射"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.finish === id ? "active" : undefined} onClick={() => set({ finish: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Color label="背面色" value={opts.backColor} onChange={(backColor) => set({ backColor })} />
          <Slider label="宽度" value={opts.width} min={90} max={260} step={5} format={(v) => `${v}px`} onChange={(width) => set({ width })} />
          <Slider label="静置角度" value={opts.rotate} min={-45} max={45} step={1} format={(v) => `${v}°`} onChange={(rotate) => set({ rotate })} />
          <Slider label="撕揭方向" value={opts.peelDirection} min={0} max={360} step={5} format={(v) => `${v}°`} onChange={(peelDirection) => set({ peelDirection })} />
          <Slider label="悬停撕开" value={opts.peelBackHoverPct} min={0} max={80} step={1} format={(v) => `${v}%`} onChange={(peelBackHoverPct) => set({ peelBackHoverPct })} />
          <Slider label="按住撕开" value={opts.peelBackActivePct} min={0} max={90} step={1} format={(v) => `${v}%`} onChange={(peelBackActivePct) => set({ peelBackActivePct })} />
          <Slider label="卷边半径" value={opts.curlRadius} min={2} max={40} step={1} format={(v) => `${v}px`} onChange={(curlRadius) => set({ curlRadius })} />
          <Slider label="高光" value={opts.lightingIntensity} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(lightingIntensity) => set({ lightingIntensity })} />
          <Slider label="阴影" value={opts.shadowIntensity} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(shadowIntensity) => set({ shadowIntensity })} />
          <Slider label="甩动" value={opts.swing} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(swing) => set({ swing })} />
          <Slider label="摩擦" value={opts.friction} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(friction) => set({ friction })} />
          <Slider label="反弹" value={opts.bounce} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(bounce) => set({ bounce })} />
          <ControlRow label="可拖拽">
            <Switch checked={opts.draggable} onChange={(draggable) => set({ draggable })} label="可拖拽" />
          </ControlRow>
          <ControlRow label="跟随指针">
            <Switch checked={opts.followPointer} onChange={(followPointer) => set({ followPointer })} label="跟随指针" />
          </ControlRow>
          <ControlRow label="开场">
            <Switch checked={opts.intro} onChange={(intro) => set({ intro })} label="开场" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — a holographic star resting on a small dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 170, background: "#101014", overflow: "hidden" }}>
        <StickerPeel imageSrc={STICKER_SRC} width={110} rotate={-8} finish="holo" lightingIntensity={0.7} intro={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
