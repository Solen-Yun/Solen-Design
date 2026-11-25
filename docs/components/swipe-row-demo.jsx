import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as SwipeRow } from "../../src/components/swipe-row/SwipeRow.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Drag a row sideways: past one action width the primary block rides your
   finger; drag to the commit point and release to fold the row away. */

const DEFAULTS = {
  direction: "left",
  actionColor: "#e5484d",
  drawerColor: "#3f3f46",
  actionWidth: 80,
  height: 64,
  radius: 16,
  commitAt: 0.6,
  snapBounce: 0.2,
  resistance: 0.55,
  fullSwipe: true,
  closeOnAction: true,
  haptic: true,
  disabled: false,
};

const PEOPLE = [
  { id: "ada", name: "阿达 · 陈", note: "刚转发了一份合同", face: "linear-gradient(135deg, #6366f1, #ec4899)" },
  { id: "ben", name: "本 · 王", note: "会议纪要已归档", face: "linear-gradient(135deg, #06b6d4, #1d4ed8)" },
  { id: "cloe", name: "克罗 · 李", note: "周末爬山叫上你", face: "linear-gradient(135deg, #f59e0b, #dc2626)" },
];

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
  const [run, setRun] = useState(0);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => {
    setOpts(DEFAULTS);
    setRun((n) => n + 1);
  };

  const actions = [
    { id: "delete", label: "删除" },
    { id: "pin", label: "置顶", icon: <span aria-hidden="true">📌</span> },
    { id: "mute", label: "静音", icon: <span aria-hidden="true">🔕</span> },
  ];

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ display: "grid", gap: 10, width: "100%", maxWidth: 620, padding: "0 16px" }} key={run}>
            {PEOPLE.map((person) => (
              <SwipeRow
                key={person.id}
                actions={actions}
                direction={opts.direction}
                actionColor={opts.actionColor}
                drawerColor={opts.drawerColor}
                actionWidth={opts.actionWidth}
                height={opts.height}
                radius={opts.radius}
                commitAt={opts.commitAt}
                snapBounce={opts.snapBounce}
                resistance={opts.resistance}
                fullSwipe={opts.fullSwipe}
                closeOnAction={opts.closeOnAction}
                haptic={opts.haptic}
                disabled={opts.disabled}
                label={person.name}
                onAction={(a) => console.log("action", a.id)}
                onCommit={(a) => console.log("commit", a.id)}
              >
                <span
                  aria-hidden="true"
                  style={{ flex: "none", width: 40, height: 40, borderRadius: 999, background: person.face }}
                />
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: "block", fontSize: 14, fontWeight: 600 }}>{person.name}</span>
                  <span style={{ display: "block", fontSize: 12, color: "rgba(245, 245, 245, 0.55)" }}>{person.note}</span>
                </span>
              </SwipeRow>
            ))}
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./swipe-row-preview.html">
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
          <ControlRow label="滑动方向">
            <div className="view-tabs">
              {[["left", "朝左"], ["right", "朝右"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.direction === id ? "active" : ""} onClick={() => set({ direction: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Color label="主操作色" value={opts.actionColor} onChange={(actionColor) => set({ actionColor })} />
          <Color label="抽屉底色" value={opts.drawerColor} onChange={(drawerColor) => set({ drawerColor })} />
          <Slider label="操作格宽" value={opts.actionWidth} min={56} max={120} step={4} format={(v) => `${v}px`} onChange={(actionWidth) => set({ actionWidth })} />
          <Slider label="行高" value={opts.height} min={48} max={96} step={4} format={(v) => `${v}px`} onChange={(height) => set({ height })} />
          <Slider label="圆角" value={opts.radius} min={0} max={28} step={2} format={(v) => `${v}px`} onChange={(radius) => set({ radius })} />
          <Slider label="提交点" value={opts.commitAt} min={0.3} max={0.9} step={0.05} format={(v) => `${Math.round(v * 100)}%`} onChange={(commitAt) => set({ commitAt })} />
          <Slider label="甩动回弹" value={opts.snapBounce} min={0} max={0.6} step={0.05} format={(v) => v.toFixed(2)} onChange={(snapBounce) => set({ snapBounce })} />
          <Slider label="橡皮筋" value={opts.resistance} min={0.1} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(resistance) => set({ resistance })} />
          <ControlRow label="全滑提交">
            <Switch checked={opts.fullSwipe} onChange={(fullSwipe) => set({ fullSwipe })} label="全滑提交" />
          </ControlRow>
          <ControlRow label="执行后收回">
            <Switch checked={opts.closeOnAction} onChange={(closeOnAction) => set({ closeOnAction })} label="执行后收回" />
          </ControlRow>
          <ControlRow label="触感震动">
            <Switch checked={opts.haptic} onChange={(haptic) => set({ haptic })} label="触感震动" />
          </ControlRow>
          <ControlRow label="禁用">
            <Switch checked={opts.disabled} onChange={(disabled) => set({ disabled })} label="禁用" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — one dark row with the drawer half open. */
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
        <div style={{ width: "100%", maxWidth: 380, padding: "0 16px" }}>
          <SwipeRow
            actions={[
              { id: "delete", label: "删除" },
              { id: "pin", label: "置顶", icon: <span aria-hidden="true">📌</span> },
            ]}
            open={true}
          >
            <span
              aria-hidden="true"
              style={{ flex: "none", width: 36, height: 36, borderRadius: 999, background: "linear-gradient(135deg, #6366f1, #ec4899)" }}
            />
            <span style={{ fontSize: 14, fontWeight: 600 }}>阿达 · 陈</span>
          </SwipeRow>
        </div>
      </div>
    </div>
  );
}

export { Demo, CardPreview };
