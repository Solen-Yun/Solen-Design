import { useEffect, useState } from "react";
import { DemoFit } from "../demo-fit";
import Magnet from "../../src/components/magnet/Magnet.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Move between the buttons and the cards: exclusive mode hands the pull
   to whichever magnet is nearest. */

const DEFAULTS = {
  padding: 100,
  magnetStrength: 2,
  tilt: 0,
  scale: 1,
  stiffness: 170,
  damping: 16,
  axis: "both",
  exclusive: true,
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
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => setOpts(DEFAULTS);
  const shared = {
    padding: opts.padding,
    magnetStrength: opts.magnetStrength,
    tilt: opts.tilt,
    scale: opts.scale,
    axis: opts.axis,
    exclusive: opts.exclusive,
    disabled: opts.disabled,
    spring: { stiffness: opts.stiffness, damping: opts.damping },
  };

  return (
    <>
      <div className="demo-stage" style={{ background: "#ffffff", colorScheme: "light" }}>
        <DemoFit>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 44, width: "100%", height: 320, color: "#18181b" }}>
            <div style={{ display: "flex", gap: 18 }}>
              {["复制", "粘贴", "分享"].map((label) => (
                <Magnet key={label} {...shared}>
                  <button
                    type="button"
                    style={{
                      padding: "11px 26px",
                      borderRadius: 12,
                      border: "1px solid rgba(24,24,27,0.16)",
                      background: "#fafafa",
                      color: "#18181b",
                      fontSize: 14,
                      boxShadow: "0 1px 2px rgba(24,24,27,0.08)",
                    }}
                  >
                    {label}
                  </button>
                </Magnet>
              ))}
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              {[
                ["✦", "星轨"],
                ["◈", "棱镜"],
                ["❋", "霜线"],
              ].map(([icon, label]) => (
                <Magnet key={label} {...shared}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 8,
                      width: 108,
                      padding: "16px 0 14px",
                      borderRadius: 14,
                      background: "#f4f4f5",
                      border: "1px solid rgba(24,24,27,0.1)",
                      fontSize: 13,
                    }}
                  >
                    <span style={{ fontSize: 26 }} aria-hidden="true">{icon}</span>
                    {label}
                  </div>
                </Magnet>
              ))}
            </div>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./magnet-preview.html">
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
          <ControlRow label="轴向">
            <div className="view-tabs">
              {[["both", "双轴"], ["x", "横向"], ["y", "纵向"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.axis === id ? "active" : ""} onClick={() => set({ axis: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="吸引半径" value={opts.padding} min={0} max={200} step={5} format={(v) => `${v}px`} onChange={(padding) => set({ padding })} />
          <Slider label="跟随强度" value={opts.magnetStrength} min={1} max={6} step={0.5} format={(v) => `÷${v.toFixed(1)}`} onChange={(magnetStrength) => set({ magnetStrength })} />
          <Slider label="3D 倾斜" value={opts.tilt} min={0} max={20} step={1} format={(v) => `${v}°`} onChange={(tilt) => set({ tilt })} />
          <Slider label="满拉缩放" value={opts.scale} min={1} max={1.5} step={0.05} format={(v) => `×${v.toFixed(2)}`} onChange={(scale) => set({ scale })} />
          <Slider label="弹簧刚度" value={opts.stiffness} min={50} max={400} step={10} format={(v) => String(v)} onChange={(stiffness) => set({ stiffness })} />
          <Slider label="弹簧阻尼" value={opts.damping} min={4} max={40} step={1} format={(v) => String(v)} onChange={(damping) => set({ damping })} />
          <ControlRow label="只响应最近">
            <Switch checked={opts.exclusive} onChange={(exclusive) => set({ exclusive })} label="只响应最近" />
          </ControlRow>
          <ControlRow label="关闭磁吸">
            <Switch checked={opts.disabled} onChange={(disabled) => set({ disabled })} label="关闭磁吸" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — a synthetic pointer parks next to the middle chip and
   the magnet leans toward it. */
function CardPreview() {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof PointerEvent === "undefined") return;
      const chip = document.querySelector("[data-card-chip='1']");
      if (!chip) return;
      const rect = chip.getBoundingClientRect();
      window.dispatchEvent(
        new PointerEvent("pointermove", { pointerType: "mouse", clientX: rect.right + 14, clientY: rect.top + rect.height / 2 }),
      );
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="comp-zoom">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, width: "100%", height: 170, background: "#101014" }}>
        {["星轨", "棱镜", "霜线"].map((label, index) => (
          <Magnet key={label} padding={110} magnetStrength={1.6} tilt={8} scale={1.12}>
            <div
              data-card-chip={index}
              style={{
                padding: "13px 24px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.07)",
                color: "#e4e4e7",
                fontSize: 13,
              }}
            >
              {label}
            </div>
          </Magnet>
        ))}
      </div>
    </div>
  );
}

export { Demo, CardPreview };
