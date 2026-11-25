/* Component metadata only — the live demo and gallery preview live in
   waves-demo.jsx, the framework source texts and the prompt in
   waves-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with waves-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "lineColor", type: "string", default: '"#ffffff"', description: "线条基色，任意 CSS 颜色字符串" },
  { name: "accentColor", type: "string", default: "—", description: "线条受扰时的发热色；省略回退基色" },
  { name: "backgroundColor", type: "string", default: '"transparent"', description: "根节点内联背景色" },
  { name: "lineStyle", type: '"solid" | "dashed"', default: '"solid"', description: "实心丝带或沿线流动的虚线" },
  { name: "spacing", type: "number", default: "10", description: "线间距（px），下限 2" },
  { name: "lineWidth", type: "number", default: "1", description: "线宽（CSS px），下限 0.25" },
  { name: "rotation", type: "number", default: "0", description: "场旋转角（度）" },
  { name: "amplitude", type: "number", default: "32", description: "线条静息摆动幅度（px）" },
  { name: "scale", type: "number", default: "1", description: "流场缩放，下限 0.05；越大波越密" },
  { name: "twist", type: "number", default: "1", description: "噪声扭转强度，下限 0" },
  { name: "speed", type: "number", default: "1", description: "流动速度，0 冻结漂移" },
  { name: "variation", type: "number", default: "0", description: "流场确定性重织种子" },
  { name: "mouseInteraction", type: "boolean", default: "true", description: "光标使线条弯折让路" },
  { name: "mouseRadius", type: "number", default: "175", description: "光标影响半径（px），下限 20" },
  { name: "mouseStrength", type: "number", default: "1", description: "光标推力强度，下限 0" },
  { name: "bounce", type: "number", default: "0.5", description: "回弹过冲量，0–1" },
  { name: "returnDuration", type: "number", default: "1.4", description: "回弹耗时（秒），下限 0.2" },
  { name: "clickRipple", type: "boolean", default: "true", description: "点击发出扩散冲击波（最多 6 个）" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时线条扫入（2.2s）" },
  { name: "fade", type: "number", default: "0", description: "边缘渐隐，0–1" },
  { name: "opacity", type: "number", default: "1", description: "整体不透明度，0–1" },
  { name: "lightMode", type: "boolean", default: "false", description: "压暗线条，适合浅色背景" },
  { name: "paused", type: "boolean", default: "false", description: "只渲染一帧静止画面" },
  { name: "dpr", type: "number", default: "devicePixelRatio", description: "画布像素比覆盖，clamp 至 2" },
  { name: "className", type: "string", default: '""', description: "根节点附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根节点内联样式（排在 backgroundColor 之后）" },
];

export default {
  id: "waves",
  name: "丝浪回弹",
  href: "waves.html",
  title: "丝浪回弹",
  description:
    "密集的平行流线像丝绸一样摆动：Perlin 扭转流场驱动静息起伏，光标扫过时线条像芦苇一样沿运动方向弯折让路，再以可调的弹性回弹归位；点击发出圆形冲击波沿径向推开线条并沿途提亮至点缀色，支持流动虚线与浅色压暗。12px 弹簧网格位移场 + RG32F 双三次采样，帧循环暂停时自睡。",
  tags: ["React", "WebGL", "CSS", "背景"],

  cardDescription: "流线随光标弯折让路、弹性回弹，点击荡开提亮冲击波。",

  demoHint: "快速划过线条看它们让路再弹回，点击发出冲击波；回弹、影响半径与线距可调。",

  api: API,
};
