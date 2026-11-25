import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as TextType } from "../../src/components/text-type/TextType.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Raise the mistake rate to watch it hit a neighbouring key and fix itself;
   swap cursor shapes and entrance effects while it types. */

const TEXTS = {
  single: "你好，世界。",
  multi: ["你好，世界。", "Hello, typewriter!", "打字机效果 ✦ 逐字浮现"],
};

const CURSORS = [
  { id: "character", label: "字符" },
  { id: "bar", label: "竖线" },
  { id: "block", label: "方块" },
  { id: "underscore", label: "下划" },
];

const EFFECTS = [
  { id: "none", label: "无" },
  { id: "fade", label: "淡入" },
  { id: "blur", label: "模糊" },
  { id: "rise", label: "上浮" },
];

const DEFAULTS = {
  textId: "multi",
  typingSpeed: 50,
  deletingSpeed: 30,
  pauseDuration: 2000,
  initialDelay: 0,
  mistakes: 0,
  cursorBlinkDuration: 0.5,
  cursorStyle: "character",
  typeEffect: "none",
  deleteMode: "backspace",
  loop: true,
  hideCursorWhileTyping: false,
  cursorGlide: true,
  reverseMode: false,
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: 220,
              padding: "0 32px",
              color: "#e4e4e7",
            }}
          >
            <TextType
              text={TEXTS[opts.textId]}
              typingSpeed={opts.typingSpeed}
              initialDelay={opts.initialDelay}
              pauseDuration={opts.pauseDuration}
              deletingSpeed={opts.deletingSpeed}
              deleteMode={opts.deleteMode}
              loop={opts.loop}
              showCursor={true}
              hideCursorWhileTyping={opts.hideCursorWhileTyping}
              cursorStyle={opts.cursorStyle}
              cursorColor="currentColor"
              cursorBlinkDuration={opts.cursorBlinkDuration}
              cursorGlide={opts.cursorGlide}
              typeEffect={opts.typeEffect}
              mistakes={opts.mistakes}
              reverseMode={opts.reverseMode}
              onSentenceComplete={(sentence, index) => console.log("done", index, sentence)}
              style={{ fontSize: 30, fontWeight: 600, textAlign: "center" }}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./text-type-preview.html">
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
          <ControlRow label="文本">
            <div className="view-tabs">
              {[
                ["single", "单句"],
                ["multi", "多句循环"],
              ].map(([id, label]) => (
                <button key={id} type="button" className={opts.textId === id ? "active" : ""} onClick={() => set({ textId: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="打字速度" value={opts.typingSpeed} min={10} max={150} step={5} format={(v) => `${v}ms`} onChange={(typingSpeed) => set({ typingSpeed })} />
          <Slider label="删除速度" value={opts.deletingSpeed} min={5} max={100} step={5} format={(v) => `${v}ms`} onChange={(deletingSpeed) => set({ deletingSpeed })} />
          <Slider label="句间停留" value={opts.pauseDuration} min={300} max={4000} step={100} format={(v) => `${v}ms`} onChange={(pauseDuration) => set({ pauseDuration })} />
          <Slider label="首字延迟" value={opts.initialDelay} min={0} max={2000} step={100} format={(v) => `${v}ms`} onChange={(initialDelay) => set({ initialDelay })} />
          <Slider label="失误率" value={opts.mistakes} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(mistakes) => set({ mistakes })} />
          <Slider label="闪烁周期" value={opts.cursorBlinkDuration} min={0.2} max={1.5} step={0.1} format={(v) => `${v.toFixed(1)}s`} onChange={(cursorBlinkDuration) => set({ cursorBlinkDuration })} />
          <ControlRow label="光标形态">
            <div className="view-tabs">
              {CURSORS.map((item) => (
                <button key={item.id} type="button" className={opts.cursorStyle === item.id ? "active" : ""} onClick={() => set({ cursorStyle: item.id })}>
                  {item.label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="入场动画">
            <div className="view-tabs">
              {EFFECTS.map((item) => (
                <button key={item.id} type="button" className={opts.typeEffect === item.id ? "active" : ""} onClick={() => set({ typeEffect: item.id })}>
                  {item.label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="删除方式">
            <div className="view-tabs">
              {[
                ["backspace", "退格"],
                ["select", "选区"],
              ].map(([id, label]) => (
                <button key={id} type="button" className={opts.deleteMode === id ? "active" : ""} onClick={() => set({ deleteMode: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="循环">
            <Switch checked={opts.loop} onChange={(loop) => set({ loop })} label="循环" />
          </ControlRow>
          <ControlRow label="打字时藏光标">
            <Switch checked={opts.hideCursorWhileTyping} onChange={(hideCursorWhileTyping) => set({ hideCursorWhileTyping })} label="打字时藏光标" />
          </ControlRow>
          <ControlRow label="光标滑动">
            <Switch checked={opts.cursorGlide} onChange={(cursorGlide) => set({ cursorGlide })} label="光标滑动" />
          </ControlRow>
          <ControlRow label="倒序打字">
            <Switch checked={opts.reverseMode} onChange={(reverseMode) => set({ reverseMode })} label="倒序打字" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — a multi-sentence loop with the bar cursor and blur-in. */
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
          padding: "0 24px",
          background: "#101014",
          colorScheme: "dark",
        }}
      >
        <TextType
          text={["设计系统里的", "一颗打字机"]}
          typingSpeed={65}
          deletingSpeed={28}
          cursorStyle="bar"
          typeEffect="blur"
          style={{ fontSize: 24, fontWeight: 600, color: "#e4e4e7", textAlign: "center" }}
        />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
