import { useEffect, useRef, useState } from "react";
import { DemoFit } from "../demo-fit";
import GlareHover from "../../src/components/glare-hover/GlareHover.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Enter the panel from different sides: the streak always starts where
   the cursor came from and exits the other way. */

const DEFAULTS = {
  glareColor: "#ffffff",
  glareOpacity: 0.5,
  glareAngle: -45,
  glareSize: 30,
  softness: 0.6,
  variant: "streak",
  blendMode: "screen",
  rimGlint: true,
  mode: "hover",
  transitionDuration: 650,
  interval: 3,
  playOnce: false,
  intro: false,
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
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 260, color: "#e4e4e7" }}>
            <GlareHover
              width={320}
              height={200}
              background="linear-gradient(135deg, #1e1b4b 0%, #4c1d95 45%, #831843 100%)"
              borderRadius="16px"
              glareColor={opts.glareColor}
              glareOpacity={opts.glareOpacity}
              glareAngle={opts.glareAngle}
              glareSize={opts.glareSize}
              softness={opts.softness}
              variant={opts.variant}
              blendMode={opts.blendMode}
              rimGlint={opts.rimGlint}
              mode={opts.mode}
              transitionDuration={opts.transitionDuration}
              interval={opts.interval}
              playOnce={opts.playOnce}
              intro={opts.intro}
            >
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, textAlign: "center", padding: 20 }}>
                <span style={{ fontSize: 40, lineHeight: 1 }} aria-hidden="true">✦</span>
                <strong style={{ fontSize: 19, letterSpacing: "-0.01em" }}>扫光悬停</strong>
                <span style={{ fontSize: 13, color: "rgba(228,228,231,0.7)" }}>从不同侧进入，光带顺着来向扫过整块面板</span>
              </div>
            </GlareHover>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./glare-hover-preview.html">
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
          <Color label="光带色" value={opts.glareColor} onChange={(glareColor) => set({ glareColor })} />
          <ControlRow label="轮廓">
            <div className="view-tabs">
              {[["streak", "单光"], ["twin", "双光"], ["sheen", "柔光幕"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.variant === id ? "active" : ""} onClick={() => set({ variant: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="触发方式">
            <div className="view-tabs">
              {[["hover", "悬停"], ["follow", "跟随"], ["click", "点击"], ["loop", "循环"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.mode === id ? "active" : ""} onClick={() => set({ mode: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="混合模式">
            <div className="view-tabs">
              {[["screen", "screen"], ["overlay", "overlay"], ["soft-light", "柔光"], ["normal", "正常"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.blendMode === id ? "active" : ""} onClick={() => set({ blendMode: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="峰值透明度" value={opts.glareOpacity} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(glareOpacity) => set({ glareOpacity })} />
          <Slider label="行进角度" value={opts.glareAngle} min={-90} max={90} step={5} format={(v) => `${v}°`} onChange={(glareAngle) => set({ glareAngle })} />
          <Slider label="光带厚度" value={opts.glareSize} min={5} max={80} step={1} format={(v) => `${v}%`} onChange={(glareSize) => set({ glareSize })} />
          <Slider label="柔和度" value={opts.softness} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(softness) => set({ softness })} />
          <Slider label="扫光时长" value={opts.transitionDuration} min={150} max={1500} step={50} format={(v) => `${v}ms`} onChange={(transitionDuration) => set({ transitionDuration })} />
          <Slider label="循环间隔" value={opts.interval} min={0.5} max={8} step={0.5} format={(v) => `${v}s`} onChange={(interval) => set({ interval })} />
          <ControlRow label="边框滑光">
            <Switch checked={opts.rimGlint} onChange={(rimGlint) => set({ rimGlint })} label="边框滑光" />
          </ControlRow>
          <ControlRow label="只扫一次">
            <Switch checked={opts.playOnce} onChange={(playOnce) => set({ playOnce })} label="只扫一次" />
          </ControlRow>
          <ControlRow label="入场扫光">
            <Switch checked={opts.intro} onChange={(intro) => set({ intro })} label="入场扫光" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — a synthetic pointerenter from the left catches the
   streak mid-flight across a gradient tile. */
function CardPreview() {
  const tileRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const tile = tileRef.current;
      if (!tile || typeof PointerEvent === "undefined") return;
      const rect = tile.getBoundingClientRect();
      const y = rect.top + rect.height / 2;
      tile.dispatchEvent(new PointerEvent("pointerenter", { bubbles: true, clientX: rect.left + rect.width * 0.2, clientY: y }));
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="comp-zoom">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 170, background: "#101014" }}>
        <GlareHover
          width={250}
          height={140}
          background="linear-gradient(135deg, #0e7490 0%, #155e75 50%, #312e81 100%)"
          borderRadius="14px"
          glareColor="#ffffff"
          glareOpacity={0.65}
          glareAngle={-45}
          glareSize={34}
          variant="streak"
          blendMode="screen"
        >
          <div ref={tileRef} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", color: "#e4e4e7", fontSize: 13, gap: 6 }}>
            <span style={{ fontSize: 28 }} aria-hidden="true">❄</span>
            <span>悬停扫过一道光</span>
          </div>
        </GlareHover>
      </div>
    </div>
  );
}

export { Demo, CardPreview };
