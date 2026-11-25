import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as Stepper, Step } from "../../src/components/stepper/Stepper.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Jump between steps and watch the tile highlight glide with overshoot. */

const DEFAULTS = {
  theme: "dark",
  accentColor: "#0a84ff",
  indicator: "numbers",
  orientation: "horizontal",
  transition: "slide",
  linear: false,
  disableStepIndicators: false,
  frame: true,
  radius: 24,
  width: 440,
  showFooter: true,
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

function Tabs({ label, options, value, onChange }) {
  return (
    <ControlRow label={label}>
      <div className="view-tabs">
        {options.map(([id, name]) => (
          <button key={id} type="button" className={value === id ? "active" : ""} onClick={() => onChange(id)}>
            {name}
          </button>
        ))}
      </div>
    </ControlRow>
  );
}

function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => setOpts(DEFAULTS);
  const [done, setDone] = useState(false);

  return (
    <>
      <div className="demo-stage" style={{ background: "radial-gradient(circle at 50% 0%, #2e2b38 0%, #101014 70%)", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 420 }}>
            <Stepper
              key={`${opts.orientation}|${opts.indicator}|${done}`}
              initialStep={1}
              onFinalStepCompleted={() => setDone(true)}
              indicator={opts.indicator}
              orientation={opts.orientation}
              transition={opts.transition}
              linear={opts.linear}
              disableStepIndicators={opts.disableStepIndicators}
              showFooter={opts.showFooter}
              theme={opts.theme}
              accentColor={opts.accentColor}
              frame={opts.frame}
              radius={opts.radius}
              width={opts.width}
              completedContent={
                <div style={{ textAlign: "center", padding: "18px 0" }}>
                  <p style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>全部完成 🎉</p>
                  <button
                    type="button"
                    onClick={() => setDone(false)}
                    style={{ marginTop: 12, padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600 }}
                  >
                    再来一遍
                  </button>
                </div>
              }
            >
              <Step title="账户" description="填写基本信息">
                <p style={{ margin: "6px 0 0", fontSize: 14, lineHeight: 1.6 }}>第一步：创建你的账户，设置用户名与密码。</p>
              </Step>
              <Step title="偏好" description="选择使用场景">
                <p style={{ margin: "6px 0 0", fontSize: 14, lineHeight: 1.6 }}>第二步：告诉我们你的使用场景，我们会调整默认配置。</p>
              </Step>
              <Step title="确认" description="检查并完成">
                <p style={{ margin: "6px 0 0", fontSize: 14, lineHeight: 1.6 }}>第三步：确认以上信息无误，点击完成开始使用。</p>
              </Step>
            </Stepper>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./stepper-preview.html">
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
          <ControlRow label="浅色主题">
            <Switch checked={opts.theme === "light"} onChange={(light) => set({ theme: light ? "light" : "dark" })} label="浅色主题" />
          </ControlRow>
          <Tabs label="指示器" options={[["numbers", "数字"], ["dots", "圆点"], ["bars", "进度条"]]} value={opts.indicator} onChange={(indicator) => set({ indicator })} />
          <Tabs label="方向" options={[["horizontal", "横向"], ["vertical", "竖向"]]} value={opts.orientation} onChange={(orientation) => set({ orientation })} />
          <Tabs label="切换动画" options={[["slide", "滑动"], ["fade", "淡入"], ["none", "无"]]} value={opts.transition} onChange={(transition) => set({ transition })} />
          <Color label="强调色" value={opts.accentColor} onChange={(accentColor) => set({ accentColor })} />
          <Slider label="外框圆角" value={opts.radius} min={0} max={40} step={2} format={(v) => `${v}px`} onChange={(radius) => set({ radius })} />
          <Slider label="宽度" value={opts.width} min={320} max={560} step={10} format={(v) => `${v}px`} onChange={(width) => set({ width })} />
          <ControlRow label="线性模式">
            <Switch checked={opts.linear} onChange={(linear) => set({ linear })} label="线性模式" />
          </ControlRow>
          <ControlRow label="禁用跳转">
            <Switch checked={opts.disableStepIndicators} onChange={(disableStepIndicators) => set({ disableStepIndicators })} label="禁用跳转" />
          </ControlRow>
          <ControlRow label="毛玻璃外框">
            <Switch checked={opts.frame} onChange={(frame) => set({ frame })} label="毛玻璃外框" />
          </ControlRow>
          <ControlRow label="显示底栏">
            <Switch checked={opts.showFooter} onChange={(showFooter) => set({ showFooter })} label="显示底栏" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the framed stepper mid-flow on a dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 280, background: "#101014" }}>
        <Stepper initialStep={2} frame theme="dark" width={400}>
          <Step title="账户">
            <p style={{ margin: "6px 0 0", fontSize: 14 }}>创建你的账户。</p>
          </Step>
          <Step title="偏好">
            <p style={{ margin: "6px 0 0", fontSize: 14 }}>选择使用场景。</p>
          </Step>
          <Step title="确认">
            <p style={{ margin: "6px 0 0", fontSize: 14 }}>确认并完成。</p>
          </Step>
        </Stepper>
      </div>
    </div>
  );
}

export { Demo, CardPreview };
