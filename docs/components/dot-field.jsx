/* Component metadata only — the live demo and gallery preview live in
   dot-field-demo.jsx, the framework source texts and the prompt in
   dot-field-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with dot-field-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "dotRadius", type: "number", default: "1.5", description: "圆点半径（px），clamp 0.25–12" },
  { name: "dotSpacing", type: "number", default: "14", description: "圆点边缘间距（px），clamp 1–200" },
  { name: "pattern", type: '"grid" | "hex" | "spiral" | "scatter"', default: '"grid"', description: "点阵排布：方格、六边、黄金角螺旋或抖动散点；未知值回退 grid" },
  { name: "gradientFrom", type: "string", default: '"#5227FF"', description: "渐变起点色；3/6 位 hex 或 rgb()/rgba()" },
  { name: "gradientTo", type: "string", default: '"#FF9FFC"', description: "渐变终点色" },
  { name: "gradientAngle", type: "number", default: "135", description: "渐变方向（度）" },
  { name: "cursorRadius", type: "number", default: "240", description: "透镜半径（px），clamp 20–2000" },
  { name: "bulgeStrength", type: "number", default: "0.6", description: "透镜放大强度；负值向内挤压，clamp −1–1" },
  { name: "twist", type: "number", default: "0", description: "透镜旋涡角度（度），clamp ±360" },
  { name: "glowColor", type: "string", default: '"#ffffff"', description: "透镜下光池的颜色" },
  { name: "glowRadius", type: "number", default: "160", description: "光池半径（px），下限 0" },
  { name: "glowIntensity", type: "number", default: "0.8", description: "光池强度，clamp 0–2" },
  { name: "baseOpacity", type: "number", default: "0.55", description: "光池与闪点之外的圆点不透明度，clamp 0–1" },
  { name: "waveAmplitude", type: "number", default: "0", description: "待机波动的振幅（px），clamp 0–60" },
  { name: "sparkle", type: "boolean", default: "false", description: "圆点闪烁" },
  { name: "speed", type: "number", default: "1", description: "波动与闪烁的时钟倍率，下限 0" },
  { name: "interactive", type: "boolean", default: "true", description: "透镜跟随光标" },
  { name: "holdToZoom", type: "boolean", default: "true", description: "按住指针放大透镜" },
  { name: "intro", type: "boolean", default: "true", description: "挂载后 1.8s 的聚焦入场（由缩到清）" },
  { name: "lightMode", type: "boolean", default: "false", description: "浅色页面配色：高亮度色压回安全亮度并提饱和" },
  { name: "opacity", type: "number", default: "1", description: "整体不透明度，clamp 0–1" },
  { name: "maxDevicePixelRatio", type: "number", default: "2", description: "像素比上限，clamp 0.5–3；另有 900 万总像素预算" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "dot-field",
  name: "透镜点阵场",
  href: "dot-field.html",
  title: "透镜点阵场",
  description:
    "一片带渐变色的圆点场，排布可切方格、六边、黄金角螺旋或散点；一枚透镜跟着光标走，把圆点放大、挤压或旋成涡（平滑弹簧跟随 + 核函数重投影），透镜下亮起光池，按住指针还能把透镜撑大。圆点用实例化绘制、Oklab 渐变保彩插值，场外预留透镜行程的边距，12 万点封顶、900 万像素预算；入场 1.8s 由虚焦聚成清晰，浅色模式自动压亮度保对比。",
  tags: ["React", "CSS", "WebGL", "背景"],

  cardDescription: "透镜跟着光标放大、扭曲一片渐变圆点场，按住还能撑大透镜。",

  demoHint: "划过圆点看透镜放大与光池，按住指针撑大透镜；调负强度变挤压、加旋涡角度变涡旋。",

  api: API,
};
