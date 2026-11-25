/* Component metadata only — the live demo and gallery preview live in
   dot-grid-demo.jsx, the framework source texts and the prompt in
   dot-grid-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with dot-grid-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "dotSize", type: "number", default: "5", description: "点的半径（px），下限 0.5" },
  { name: "gap", type: "number", default: "18", description: "点间距（px）" },
  { name: "baseColor", type: "string", default: '"#3a3446"', description: "静息点色（hex）" },
  { name: "activeColor", type: "string", default: '"#ffffff"', description: "被扰动的点色（hex）" },
  { name: "proximity", type: "number", default: "140", description: "指针影响半径（px），下限 1" },
  { name: "strength", type: "number", default: "1", description: "指针驱动力强度" },
  { name: "bounce", type: "number", default: "0.6", description: "回弹弹性 0–1；0 近临界阻尼、1 大幅过冲" },
  { name: "tension", type: "number", default: "0.4", description: "邻居耦合张力（果冻感）" },
  { name: "returnDuration", type: "number", default: "0.8", description: "回归原位的弹簧周期（秒），下限 0.2" },
  { name: "shockRadius", type: "number", default: "320", description: "点击冲击波的传播半径（px）" },
  { name: "shockStrength", type: "number", default: "5", description: "点击冲击波强度" },
  { name: "swell", type: "number", default: "0.8", description: "高能点的膨胀倍率，下限 0" },
  { name: "stretch", type: "number", default: "0.5", description: "高速点的拉长量，下限 0" },
  { name: "glow", type: "number", default: "0.5", description: "高能点的光晕强度，下限 0" },
  { name: "shape", type: '"circle" | "square"', default: '"circle"', description: "点的形状（方点带圆角）" },
  { name: "fade", type: "number", default: "0", description: "画布边缘渐隐 0–1" },
  { name: "opacity", type: "number", default: "1", description: "整体不透明度，clamp 0–1" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时点从中心弹射铺开（约 1.6s）" },
  { name: "mouseInteraction", type: "boolean", default: "true", description: "指针拖拽点阵" },
  { name: "clickShock", type: "boolean", default: "true", description: "点击发出扩散冲击波" },
  { name: "paused", type: "boolean", default: "false", description: "暂停模拟（保留静态渲染）" },
  { name: "dpr", type: "number", default: "devicePixelRatio", description: "画布像素比覆盖，clamp 至 2" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "dot-grid",
  name: "果冻点阵弹簧",
  href: "dot-grid.html",
  title: "果冻点阵弹簧",
  description:
    "一面会果冻般荡漾的点阵：每个点是一个阻尼弹簧并与四邻张力耦合，指针划过就把点拖出一串尾波（高速点拉成胶囊、亮起来并膨胀），点击从落点炸开一圈高斯波前把点浪推出去再回弹；挂载时点从中心弹射铺开。GPU 实例化渲染（每点一个 SDF 圆/圆角方），自适应子步长保证稳定性，全场静止后帧循环自睡。",
  tags: ["React", "WebGL", "物理模拟", "背景"],

  cardDescription: "指针把点阵拖出果冻尾波，点击炸开一圈回弹的冲击波。",

  demoHint: "快速划过看点被拖成发光尾波，点击炸一圈冲击波；张力、弹性与冲击强度可调。",

  api: API,
};
