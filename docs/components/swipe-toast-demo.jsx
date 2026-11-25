import { useState } from "react";
import { DemoFit } from "../demo-fit";
import SwipeToast from "../../src/components/swipe-toast/SwipeToast.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Drag the card down past the threshold or flick it; a short drag springs
   back. Parking the mouse on the card pauses the burning fuse. */

const DEFAULTS = {
  duration: 4000,
  swipeDistance: 40,
  slideMs: 400,
  settleBounce: 0.2,
  fuse: "bottom",
  pauseOnHover: true,
  closeButton: false,
  withAction: true,
  dismissible: true,
  width: 356,
  background: "#27272a",
  fuseColor: "#f5a524",
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
  const reset = () => {
    setOpts(DEFAULTS);
    setOpen(true);
  };
  const [open, setOpen] = useState(true);

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, width: "100%", minHeight: 220 }}>
            <button
              type="button"
              onClick={() => setOpen(true)}
              disabled={open}
              style={{
                padding: "6px 14px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.2)",
                background: "transparent",
                color: "#e4e4e7",
                font: "inherit",
                cursor: open ? "default" : "pointer",
                opacity: open ? 0.4 : 1,
              }}
            >
              重新弹出
            </button>
            <SwipeToast
              inline
              title="文件已归档"
              description="按住这张卡往下滑，拖过阈值或快速一甩就送走它"
              open={open}
              onClose={(why) => {
                setOpen(false);
                console.log("onClose", why);
              }}
              actionLabel={opts.withAction ? "撤销" : ""}
              onAction={() => console.log("action")}
              background={opts.background}
              fuseColor={opts.fuseColor}
              width={opts.width}
              slideMs={opts.slideMs}
              settleBounce={opts.settleBounce}
              swipeDistance={opts.swipeDistance}
              duration={opts.duration}
              fuse={opts.fuse}
              pauseOnHover={opts.pauseOnHover}
              closeButton={opts.closeButton}
              dismissible={opts.dismissible}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./swipe-toast-preview.html">
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
          <Slider label="引信寿命" value={opts.duration} min={0} max={12000} step={250} format={(v) => (v === 0 ? "关闭" : `${v}ms`)} onChange={(duration) => set({ duration, open: true })} />
          <ControlRow label="引信位置">
            <div className="view-tabs">
              {[["top", "顶部"], ["bottom", "底部"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.fuse === id ? "active" : ""} onClick={() => set({ fuse: id, open: true })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="下滑距离" value={opts.swipeDistance} min={16} max={160} step={4} format={(v) => `${v}px`} onChange={(swipeDistance) => set({ swipeDistance })} />
          <Slider label="回弹幅度" value={opts.settleBounce} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(settleBounce) => set({ settleBounce })} />
          <Slider label="入场时长" value={opts.slideMs} min={150} max={900} step={50} format={(v) => `${v}ms`} onChange={(slideMs) => set({ slideMs, open: true })} />
          <Slider label="卡宽" value={opts.width} min={280} max={460} step={4} format={(v) => `${v}px`} onChange={(width) => set({ width, open: true })} />
          <Color label="背景色" value={opts.background} onChange={(background) => set({ background, open: true })} />
          <Color label="引信色" value={opts.fuseColor} onChange={(fuseColor) => set({ fuseColor, open: true })} />
          <ControlRow label="悬停暂停">
            <Switch checked={opts.pauseOnHover} onChange={(pauseOnHover) => set({ pauseOnHover })} label="悬停暂停" />
          </ControlRow>
          <ControlRow label="操作按钮">
            <Switch checked={opts.withAction} onChange={(withAction) => set({ withAction, open: true })} label="操作按钮" />
          </ControlRow>
          <ControlRow label="关闭按钮">
            <Switch checked={opts.closeButton} onChange={(closeButton) => set({ closeButton, open: true })} label="关闭按钮" />
          </ControlRow>
          <ControlRow label="可下滑关闭">
            <Switch checked={opts.dismissible} onChange={(dismissible) => set({ dismissible })} label="可下滑关闭" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the toast resting on the dark stage, fuse just lit. */
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
        <SwipeToast
          inline
          title="文件已归档"
          description="拖住往下甩就能送走"
          actionLabel="撤销"
          duration={60000}
          width={300}
        />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
