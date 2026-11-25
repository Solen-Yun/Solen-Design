/* Component metadata only — the live demo and gallery preview live in
   particles-demo.jsx, the framework source texts and the prompt in
   particles-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with particles-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "particleCount", type: "number", default: "200", description: "粒子数量，夹在 1–20000" },
  { name: "particleSpread", type: "number", default: "10", description: "粒子云的球半径（世界单位），≥ 0.1" },
  { name: "speed", type: "number", default: "0.1", description: "浮动、旋转与漂移的时间倍率" },
  { name: "particleColors", type: "string[]", default: '["#ffffff"]', description: "粒子随机取色的调色板；接受任意 CSS 颜色，留空回退白色" },
  { name: "moveParticlesOnHover", type: "boolean", default: "true", description: "开启指针悬停时整片云的视差偏移" },
  { name: "particleHoverFactor", type: "number", default: "1", description: "视差、排斥与吸引的共同强度，≥ 0" },
  { name: "alphaParticles", type: "boolean", default: "false", description: "柔化半透明的粒子边缘，代替实心核心" },
  { name: "particleBaseSize", type: "number", default: "100", description: "基础粒子尺寸，实际按  尺寸÷距离 投影，≥ 0" },
  { name: "sizeRandomness", type: "number", default: "1", description: "每颗粒子的大小随机幅度" },
  { name: "cameraDistance", type: "number", default: "20", description: "相机距离（世界单位），≥ 1" },
  { name: "disableRotation", type: "boolean", default: "false", description: "停掉整片云的缓慢进动与自转" },
  { name: "pixelRatio", type: "number", default: "—", description: "覆盖画布 DPR（封顶 2）" },
  { name: "shape", type: '"circle" | "square" | "ring" | "sparkle"', default: '"circle"', description: "粒子形状：圆、方、圆环或四芒星" },
  { name: "glow", type: "number", default: "0.5", description: "粒子外圈柔光强度，≥ 0；浅色模式下减弱" },
  { name: "twinkle", type: "number", default: "0.3", description: "每颗粒子各自的闪烁深度 0–1" },
  { name: "depthOfField", type: "number", default: "0", description: "离焦粒子的模糊/弥散，≥ 0" },
  { name: "connections", type: "boolean", default: "false", description: "绘制邻近粒子间的星座连线" },
  { name: "connectionDistance", type: "number", default: "110", description: "连线半径（px），≥ 10；最多 9000 条，只连最近的 900 颗" },
  { name: "hoverEffect", type: '"parallax" | "repel" | "attract"', default: '"parallax"', description: "指针交互模式：视差推云、排斥或吸引" },
  { name: "hoverRadius", type: "number", default: "140", description: "排斥/吸引的衰减半径（px），≥ 20" },
  { name: "clickBurst", type: "boolean", default: "true", description: "点击发射扩散冲击波（同时最多 4 道）" },
  { name: "drift", type: '"none" | "up" | "down" | "forward"', default: '"none"', description: "整场持续漂移方向，越界回绕" },
  { name: "driftSpeed", type: "number", default: "1", description: "漂移速度倍率" },
  { name: "variation", type: "number", default: "0", description: "粒子云种子；每个值对应一套确定性的布局" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时 1.8 秒的错峰淡入与后移开场" },
  { name: "opacity", type: "number", default: "1", description: "画布整体透明度 0–1" },
  { name: "lightMode", type: "boolean", default: "false", description: "把颜色压成可读墨色，适配浅色背景" },
  { name: "paused", type: "boolean", default: "false", description: "冻结时间，只渲染一帧定格" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "particles",
  name: "星尘粒子场",
  href: "particles.html",
  title: "星尘粒子场",
  description:
    "一颗缓慢进动的 3D 星尘云：种子化随机（variation 可复现）布点的粒子各自按正弦相位浮动、按自己的频率闪烁、带柔光外圈；指针可整片视差推云、逐颗排斥或吸引，点击打出扩散冲击波并闪光增亮，connections 用空间哈希把邻近粒子连成星座线（深度差越大越淡）；四种形状（圆/方/环/四芒星）、上/下/向前三种回绕漂移、景深模糊与浅色墨水模式；WebGL2 实例化渲染，上限 2 万颗、连线 9000 条，离屏与隐藏页自动停帧。",
  tags: ["React", "CSS", "WebGL", "粒子"],

  cardDescription: "漂浮闪烁的 3D 星尘，可连星座线、随指针排斥吸引。",

  demoHint: "在云里移动指针看排斥/吸引，点击打冲击波；打开连线看星座，换形状与漂移方向试试。",

  api: API,
};
