import { useEffect, useRef, useState } from "react";
import { DemoFit } from "../demo-fit";
import TargetCursor from "../../src/components/target-cursor/TargetCursor.jsx";

/* The demo plus a live customize panel — every control is a real option.
   The reticle is scoped to the stage: brackets spin while roaming and
   snap onto the buttons, links and labelled cards. */

const DEFAULTS = {
  cursorColor: "#ffffff",
  spinDuration: 2,
  hoverDuration: 0.2,
  size: 36,
  cornerSize: 12,
  thickness: 3,
  padding: 6,
  dotSize: 4,
  blendMode: "difference",
  parallaxOn: true,
  hideDefaultCursor: true,
  matchRadius: true,
  showLabel: true,
  clickEffect: true,
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
  const [accentOn, setAccentOn] = useState(false);
  const [accentColor, setAccentColor] = useState("#a5b4fc");
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => {
    setOpts(DEFAULTS);
    setAccentOn(false);
    setAccentColor("#a5b4fc");
  };
  const stageRef = useRef(null);

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div
            ref={stageRef}
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 24,
              width: "100%",
              height: 340,
              color: "#e4e4e7",
            }}
          >
            <div style={{ display: "flex", gap: 14 }}>
              {["部署", "预览", "回滚"].map((label) => (
                <button
                  key={label}
                  type="button"
                  className="cursor-target"
                  data-cursor-label={label}
                  style={{
                    padding: "11px 26px",
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.22)",
                    background: "rgba(255,255,255,0.06)",
                    color: "#e4e4e7",
                    fontSize: 14,
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 20, fontSize: 14 }}>
              {["文档", "更新日志", "状态"].map((label) => (
                <a key={label} href="#" onClick={(event) => event.preventDefault()} className="cursor-target" style={{ color: "#a5b4fc", textDecoration: "none" }}>
                  {label}
                </a>
              ))}
            </div>
            <div
              className="cursor-target"
              data-cursor-label="宽高自适应"
              style={{
                width: 280,
                padding: "14px 18px",
                borderRadius: 16,
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(255,255,255,0.05)",
                fontSize: 13,
                lineHeight: 1.7,
              }}
            >
              角框吸到这张卡片上时圆角会贴合成 16px，宽度也随盒子拉开。
            </div>
            <TargetCursor container={stageRef} cursorColorOnTarget={accentOn ? accentColor : undefined} {...opts} />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./target-cursor-preview.html">
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
          <Color label="准星色" value={opts.cursorColor} onChange={(cursorColor) => set({ cursorColor })} />
          <ControlRow label="锁定换色">
            <Switch checked={accentOn} onChange={setAccentOn} label="锁定换色" />
          </ControlRow>
          {accentOn && <Color label="强调色" value={accentColor} onChange={setAccentColor} />}
          <ControlRow label="混合模式">
            <div className="view-tabs">
              {[["difference", "difference"], ["screen", "screen"], ["normal", "正常"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.blendMode === id ? "active" : ""} onClick={() => set({ blendMode: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="旋转一圈" value={opts.spinDuration} min={0} max={5} step={0.5} format={(v) => (v === 0 ? "关" : `${v.toFixed(1)}s`)} onChange={(spinDuration) => set({ spinDuration })} />
          <Slider label="吸附时长" value={opts.hoverDuration} min={0.05} max={0.6} step={0.05} format={(v) => `${v.toFixed(2)}s`} onChange={(hoverDuration) => set({ hoverDuration })} />
          <Slider label="游荡边长" value={opts.size} min={16} max={64} step={2} format={(v) => `${v}px`} onChange={(size) => set({ size })} />
          <Slider label="臂长" value={opts.cornerSize} min={6} max={24} step={1} format={(v) => `${v}px`} onChange={(cornerSize) => set({ cornerSize })} />
          <Slider label="描边宽" value={opts.thickness} min={1} max={6} step={0.5} format={(v) => `${v}px`} onChange={(thickness) => set({ thickness })} />
          <Slider label="贴合间距" value={opts.padding} min={0} max={20} step={1} format={(v) => `${v}px`} onChange={(padding) => set({ padding })} />
          <Slider label="圆点大小" value={opts.dotSize} min={0} max={10} step={1} format={(v) => (v === 0 ? "关" : `${v}px`)} onChange={(dotSize) => set({ dotSize })} />
          <ControlRow label="视差偏移">
            <Switch checked={opts.parallaxOn} onChange={(parallaxOn) => set({ parallaxOn })} label="视差偏移" />
          </ControlRow>
          <ControlRow label="隐藏原生光标">
            <Switch checked={opts.hideDefaultCursor} onChange={(hideDefaultCursor) => set({ hideDefaultCursor })} label="隐藏原生光标" />
          </ControlRow>
          <ControlRow label="贴合圆角">
            <Switch checked={opts.matchRadius} onChange={(matchRadius) => set({ matchRadius })} label="贴合圆角" />
          </ControlRow>
          <ControlRow label="显示标签">
            <Switch checked={opts.showLabel} onChange={(showLabel) => set({ showLabel })} label="显示标签" />
          </ControlRow>
          <ControlRow label="点击收紧">
            <Switch checked={opts.clickEffect} onChange={(clickEffect) => set({ clickEffect })} label="点击收紧" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — a synthetic pointer parks the reticle on the middle
   chip, brackets locked and the label floating above. */
function CardPreview() {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof PointerEvent === "undefined") return;
      const chip = document.querySelector("[data-card-target='1']");
      if (!chip) return;
      const rect = chip.getBoundingClientRect();
      window.dispatchEvent(
        new PointerEvent("pointermove", { pointerType: "mouse", clientX: rect.right - 6, clientY: rect.bottom - 6 }),
      );
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="comp-zoom">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, width: "100%", height: 170, background: "#e4e4e7" }}>
        {["星轨", "棱镜", "霜线"].map((label, index) => (
          <div
            key={label}
            className="cursor-target"
            data-card-target={index}
            data-cursor-label={label}
            style={{
              padding: "13px 24px",
              borderRadius: 12,
              border: "1px solid rgba(24,24,27,0.2)",
              background: "#ffffff",
              color: "#18181b",
              fontSize: 13,
            }}
          >
            {label}
          </div>
        ))}
        <TargetCursor hideDefaultCursor={false} spinDuration={2.5} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
