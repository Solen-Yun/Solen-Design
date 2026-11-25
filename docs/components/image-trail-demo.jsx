import { useEffect, useRef, useState } from "react";
import { DemoFit } from "../demo-fit";
import ImageTrail from "../../src/components/image-trail/ImageTrail.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Draw circles and zigzags with the mouse: images drop along the path
   every `threshold` pixels and cycle through the six inline artworks. */


const ARTWORKS = [
  "./assets/demo-photos/photo-01.jpg",
  "./assets/demo-photos/photo-02.jpg",
  "./assets/demo-photos/photo-03.jpg",
  "./assets/demo-photos/photo-04.jpg",
  "./assets/demo-photos/photo-05.jpg",
  "./assets/demo-photos/photo-06.jpg",
];

const DEFAULTS = {
  size: 190,
  threshold: 80,
  lifetime: 0.4,
  appearScale: 1,
  zoom: 1,
  flash: 0,
  exitScale: 0.2,
  drift: 0,
  rotation: 0,
  sizeVariance: 0,
  alignToMotion: false,
  stack: 0,
  tilt: 0,
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
          <div style={{ position: "relative", width: "100%", height: 380, color: "#e4e4e7" }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                pointerEvents: "none",
                textAlign: "center",
              }}
            >
              <span style={{ fontSize: 30 }} aria-hidden="true">🖼</span>
              <strong style={{ fontSize: 16, letterSpacing: "-0.01em" }}>在台上移动鼠标</strong>
              <span style={{ fontSize: 13, color: "rgba(228,228,231,0.6)" }}>每走一段距离就投下一张图，六张内联画作轮播</span>
            </div>
            <ImageTrail items={ARTWORKS} {...opts} />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./image-trail-preview.html">
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
          <Slider label="投放间距" value={opts.threshold} min={20} max={200} step={5} format={(v) => `${v}px`} onChange={(threshold) => set({ threshold })} />
          <Slider label="图框宽" value={opts.size} min={80} max={320} step={10} format={(v) => `${v}px`} onChange={(size) => set({ size })} />
          <Slider label="停留时长" value={opts.lifetime} min={0.2} max={1.2} step={0.05} format={(v) => `${v.toFixed(2)}s`} onChange={(lifetime) => set({ lifetime })} />
          <Slider label="入场缩放" value={opts.appearScale} min={0.6} max={1.4} step={0.05} format={(v) => `×${v.toFixed(2)}`} onChange={(appearScale) => set({ appearScale })} />
          <Slider label="内层放大" value={opts.zoom} min={1} max={1.8} step={0.05} format={(v) => `×${v.toFixed(2)}`} onChange={(zoom) => set({ zoom })} />
          <Slider label="入场提亮" value={opts.flash} min={0} max={0.8} step={0.05} format={(v) => v.toFixed(2)} onChange={(flash) => set({ flash })} />
          <Slider label="淡出缩放" value={opts.exitScale} min={0.05} max={0.6} step={0.05} format={(v) => v.toFixed(2)} onChange={(exitScale) => set({ exitScale })} />
          <Slider label="惯性漂移" value={opts.drift} min={0} max={2} step={0.1} format={(v) => v.toFixed(1)} onChange={(drift) => set({ drift })} />
          <Slider label="随机旋转" value={opts.rotation} min={0} max={45} step={1} format={(v) => `${v}°`} onChange={(rotation) => set({ rotation })} />
          <Slider label="大小浮动" value={opts.sizeVariance} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(sizeVariance) => set({ sizeVariance })} />
          <Slider label="堆叠张数" value={opts.stack} min={0} max={6} step={1} format={(v) => (v === 0 ? "关" : String(v))} onChange={(stack) => set({ stack })} />
          <Slider label="3D 倾斜" value={opts.tilt} min={0} max={20} step={1} format={(v) => `${v}°`} onChange={(tilt) => set({ tilt })} />
          <ControlRow label="对齐运动方向">
            <Switch checked={opts.alignToMotion} onChange={(alignToMotion) => set({ alignToMotion })} label="对齐运动方向" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — three synthetic mousemove seeds drop a short trail of
   artworks across the tile. */
function CardPreview() {
  const hostRef = useRef(null);

  useEffect(() => {
    if (typeof MouseEvent === "undefined") return undefined;
    const timers = [0, 200, 400].map((delay, i) =>
      setTimeout(() => {
        const host = hostRef.current;
        const container = host?.querySelector(".content");
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const x = rect.left + rect.width * (0.16 + i * 0.26);
        const y = rect.top + rect.height * (0.62 - i * 0.16);
        container.dispatchEvent(new MouseEvent("mousemove", { bubbles: true, clientX: x, clientY: y }));
      }, 450 + delay),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="comp-zoom">
      <div ref={hostRef} style={{ position: "relative", width: "100%", height: 170, background: "#101014", overflow: "hidden" }}>
        <ImageTrail items={ARTWORKS} size={140} threshold={60} lifetime={0.9} rotation={8} sizeVariance={0.3} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 10, color: "rgba(228,228,231,0.55)", fontSize: 12, pointerEvents: "none" }}>
          移动鼠标拖出图片
        </div>
      </div>
    </div>
  );
}

export { Demo, CardPreview };
