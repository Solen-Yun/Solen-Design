import { useEffect, useRef, useState } from "react";
import { DemoFit } from "../demo-fit";
import Crosshair from "../../src/components/crosshair/Crosshair.jsx";

/* The demo plus a live customize panel — every control is a real option.
   The crosshair is scoped to the stage; hovering the buttons and links
   locks the brackets and measures their box. */

const DEFAULTS = {
  color: "#ffffff",
  thickness: 1,
  opacity: 0.85,
  lineStyle: "solid",
  gap: 0,
  fade: 0,
  smoothing: 0.35,
  showCoordinates: true,
  targetEffect: "lock",
  clickPulse: true,
  hideCursor: false,
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
  const stageRef = useRef(null);

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div ref={stageRef} style={{ position: "relative", width: "100%", height: 320, color: "#e4e4e7" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 22, width: "100%", height: "100%" }}>
              <div style={{ display: "flex", gap: 14 }}>
                {["部署", "预览", "回滚"].map((label) => (
                  <button
                    key={label}
                    type="button"
                    style={{
                      padding: "10px 24px",
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
              <div style={{ display: "flex", gap: 18, fontSize: 14 }}>
                {["文档", "更新日志", "状态"].map((label) => (
                  <a key={label} href="#" onClick={(event) => event.preventDefault()} style={{ color: "#a5b4fc", textDecoration: "none" }}>
                    {label}
                  </a>
                ))}
              </div>
              <div
                data-crosshair-target
                style={{
                  width: 260,
                  padding: "14px 18px",
                  borderRadius: 14,
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.05)",
                  fontSize: 13,
                  lineHeight: 1.7,
                }}
              >
                带 data-crosshair-target 的卡片也能被角框锁定；lock 模式下标签换成实时宽 × 高。
              </div>
            </div>
            <Crosshair containerRef={stageRef} {...opts} />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./crosshair-preview.html">
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
          <Color label="墨色" value={opts.color} onChange={(color) => set({ color })} />
          <ControlRow label="线型">
            <div className="view-tabs">
              {[["solid", "实线"], ["dashed", "虚线"], ["dotted", "点线"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.lineStyle === id ? "active" : ""} onClick={() => set({ lineStyle: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="目标行为">
            <div className="view-tabs">
              {[["lock", "锁定"], ["glitch", "故障"], ["none", "无"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.targetEffect === id ? "active" : ""} onClick={() => set({ targetEffect: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="线宽" value={opts.thickness} min={0.5} max={4} step={0.5} format={(v) => `${v}px`} onChange={(thickness) => set({ thickness })} />
          <Slider label="透明度" value={opts.opacity} min={0.2} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(opacity) => set({ opacity })} />
          <Slider label="交点空心" value={opts.gap} min={0} max={40} step={1} format={(v) => `${v}px`} onChange={(gap) => set({ gap })} />
          <Slider label="线尾渐隐" value={opts.fade} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(fade) => set({ fade })} />
          <Slider label="跟随滞后" value={opts.smoothing} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(smoothing) => set({ smoothing })} />
          <ControlRow label="坐标标签">
            <Switch checked={opts.showCoordinates} onChange={(showCoordinates) => set({ showCoordinates })} label="坐标标签" />
          </ControlRow>
          <ControlRow label="点击脉冲">
            <Switch checked={opts.clickPulse} onChange={(clickPulse) => set({ clickPulse })} label="点击脉冲" />
          </ControlRow>
          <ControlRow label="隐藏光标">
            <Switch checked={opts.hideCursor} onChange={(hideCursor) => set({ hideCursor })} label="隐藏光标" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — a synthetic pointer parks the crosshair on the button,
   brackets locked and a pulse mid-flight. */
function CardPreview() {
  const hostRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const button = buttonRef.current;
      const host = hostRef.current;
      if (!button || !host || typeof PointerEvent === "undefined") return;
      const rect = button.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      host.dispatchEvent(new PointerEvent("pointermove", { bubbles: true, pointerType: "mouse", clientX: x, clientY: y }));
      host.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, pointerType: "mouse", button: 0, clientX: x, clientY: y }));
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="comp-zoom">
      <div ref={hostRef} style={{ position: "relative", width: "100%", height: 170, background: "#101014" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
          <button
            ref={buttonRef}
            type="button"
            style={{
              padding: "10px 26px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.22)",
              background: "rgba(255,255,255,0.06)",
              color: "#e4e4e7",
              fontSize: 14,
            }}
          >
            部署
          </button>
        </div>
        <Crosshair containerRef={hostRef} showCoordinates={true} clickPulse={true} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
