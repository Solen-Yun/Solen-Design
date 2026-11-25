import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as OrbitImages } from "../../src/components/orbit-images/OrbitImages.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Drag the train and let it glide, click an image to glide it to the front. */


const IMAGES = [
  "./assets/demo-photos/photo-01.jpg",
  "./assets/demo-photos/photo-02.jpg",
  "./assets/demo-photos/photo-03.jpg",
  "./assets/demo-photos/photo-04.jpg",
  "./assets/demo-photos/photo-05.jpg",
  "./assets/demo-photos/photo-06.jpg",
  "./assets/demo-photos/photo-07.jpg",
  "./assets/demo-photos/photo-08.jpg",
];

const DEFAULTS = {
  shape: "ellipse",
  rotation: -8,
  duration: 40,
  itemSize: 64,
  radiusX: 700,
  radiusY: 170,
  radius: 300,
  starPoints: 5,
  depth: 0.5,
  itemRadius: 12,
  shadow: 0.3,
  hoverScale: 1.08,
  hoverSpeed: 0.3,
  easing: "linear",
  direction: "normal",
  showPath: false,
  pathWidth: 2,
  pathDash: 0,
  draggable: true,
  clickToFront: true,
  alignToPath: false,
  fill: true,
  intro: true,
  paused: false,
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
          <div style={{ width: "100%", padding: "16px 0" }}>
            <OrbitImages
              images={IMAGES}
              altPrefix="环绕图片"
              shape={opts.shape}
              rotation={opts.rotation}
              duration={opts.duration}
              itemSize={opts.itemSize}
              radiusX={opts.radiusX}
              radiusY={opts.radiusY}
              radius={opts.radius}
              starPoints={opts.starPoints}
              depth={opts.depth}
              itemRadius={opts.itemRadius}
              shadow={opts.shadow}
              hoverScale={opts.hoverScale}
              hoverSpeed={opts.hoverSpeed}
              easing={opts.easing}
              direction={opts.direction}
              showPath={opts.showPath}
              pathWidth={opts.pathWidth}
              pathDash={opts.pathDash}
              draggable={opts.draggable}
              clickToFront={opts.clickToFront}
              alignToPath={opts.alignToPath}
              fill={opts.fill}
              intro={opts.intro}
              paused={opts.paused}
              onItemClick={(index) => console.log(index, IMAGES[index].slice(0, 24))}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./orbit-images-preview.html">
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
          <ControlRow label="轨道形状">
            <div className="view-tabs">
              {[["ellipse", "椭圆"], ["circle", "圆"], ["square", "方"], ["rectangle", "矩形"], ["triangle", "三角"], ["star", "星形"], ["heart", "心形"], ["infinity", "无限"], ["wave", "波浪"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.shape === id ? "active" : undefined} onClick={() => set({ shape: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="横向半径" value={opts.radiusX} min={200} max={700} step={10} format={(v) => String(v)} onChange={(radiusX) => set({ radiusX })} />
          <Slider label="纵向半径" value={opts.radiusY} min={60} max={400} step={10} format={(v) => String(v)} onChange={(radiusY) => set({ radiusY })} />
          <Slider label="半径" value={opts.radius} min={100} max={400} step={10} format={(v) => String(v)} onChange={(radius) => set({ radius })} />
          {opts.shape === "star" && (
            <Slider label="角数" value={opts.starPoints} min={3} max={10} step={1} format={(v) => String(v)} onChange={(starPoints) => set({ starPoints })} />
          )}
          <Slider label="旋转" value={opts.rotation} min={-45} max={45} step={1} format={(v) => `${v}°`} onChange={(rotation) => set({ rotation })} />
          <Slider label="圈时长" value={opts.duration} min={6} max={120} step={2} format={(v) => `${v}s`} onChange={(duration) => set({ duration })} />
          <Slider label="图片尺寸" value={opts.itemSize} min={32} max={140} step={2} format={(v) => String(v)} onChange={(itemSize) => set({ itemSize })} />
          <Slider label="伪 3D" value={opts.depth} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(depth) => set({ depth })} />
          <Slider label="圆角" value={opts.itemRadius} min={0} max={50} step={1} format={(v) => `${v}%`} onChange={(itemRadius) => set({ itemRadius })} />
          <Slider label="投影" value={opts.shadow} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(shadow) => set({ shadow })} />
          <Slider label="悬停放大" value={opts.hoverScale} min={1} max={1.6} step={0.02} format={(v) => v.toFixed(2)} onChange={(hoverScale) => set({ hoverScale })} />
          <Slider label="悬停速度" value={opts.hoverSpeed} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(hoverSpeed) => set({ hoverSpeed })} />
          <ControlRow label="缓动">
            <div className="view-tabs">
              {[["linear", "线性"], ["easeIn", "入"], ["easeOut", "出"], ["easeInOut", "出入"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.easing === id ? "active" : undefined} onClick={() => set({ easing: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="反向">
            <Switch checked={opts.direction === "reverse"} onChange={(reverse) => set({ direction: reverse ? "reverse" : "normal" })} label="反向" />
          </ControlRow>
          <ControlRow label="显示轨道">
            <Switch checked={opts.showPath} onChange={(showPath) => set({ showPath })} label="显示轨道" />
          </ControlRow>
          {opts.showPath && (
            <>
              <Slider label="轨道宽度" value={opts.pathWidth} min={0.5} max={6} step={0.5} format={(v) => `${v}px`} onChange={(pathWidth) => set({ pathWidth })} />
              <Slider label="轨道虚线" value={opts.pathDash} min={0} max={30} step={1} format={(v) => `${v}px`} onChange={(pathDash) => set({ pathDash })} />
            </>
          )}
          <ControlRow label="对齐轨道">
            <Switch checked={opts.alignToPath} onChange={(alignToPath) => set({ alignToPath })} label="对齐轨道" />
          </ControlRow>
          <ControlRow label="均匀布点">
            <Switch checked={opts.fill} onChange={(fill) => set({ fill })} label="均匀布点" />
          </ControlRow>
          <ControlRow label="可拖拽">
            <Switch checked={opts.draggable} onChange={(draggable) => set({ draggable })} label="可拖拽" />
          </ControlRow>
          <ControlRow label="点击到最前">
            <Switch checked={opts.clickToFront} onChange={(clickToFront) => set({ clickToFront })} label="点击到最前" />
          </ControlRow>
          <ControlRow label="开场汇聚">
            <Switch checked={opts.intro} onChange={(intro) => set({ intro })} label="开场汇聚" />
          </ControlRow>
          <ControlRow label="暂停">
            <Switch checked={opts.paused} onChange={(paused) => set({ paused })} label="暂停" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — a tilted ellipse of gradient tiles on a dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", background: "#101014", overflow: "hidden" }}>
        <OrbitImages images={IMAGES} altPrefix="环绕图片" shape="ellipse" itemSize={46} duration={28} intro={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
