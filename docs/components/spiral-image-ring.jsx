/* Component metadata only — the live demo and gallery preview live in
   spiral-image-ring-demo.jsx, the framework source texts and the prompt in
   spiral-image-ring-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with spiral-image-ring-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "items", type: "(string | { src, alt?, label?, href?, target?, id? })[]", default: "[]", description: "环带上的图片；字符串视为图片地址，空数组不渲染" },
  { name: "speed", type: "number", default: "0.55", description: "自动滚动速度（张/秒）" },
  { name: "direction", type: '"up" | "down"', default: '"up"', description: "螺旋行进方向" },
  { name: "animationMode", type: `"auto" | "scroll" | "drag" | "all"`, default: '"auto"', description: "动起来方式：自动、随页面滚动、拖拽，或全部" },
  { name: "radius", type: "number", default: "170", description: "圆柱半径（px），窄容器自动收缩" },
  { name: "cardWidth", type: "number", default: "100", description: "卡片宽度（px）" },
  { name: "cardHeight", type: "number", default: "100", description: "卡片高度（px）" },
  { name: "verticalSpacing", type: "number", default: "60", description: "每张卡沿螺旋上升的距离（px）" },
  { name: "perspective", type: "number", default: "1000", description: "CSS perspective（px），决定景深缩放" },
  { name: "cardsPerTurn", type: "number", default: "7", description: "圆柱一整圈排布几张卡" },
  { name: "rotation", type: "number", default: "0", description: "整环的静态角度偏移（deg）" },
  { name: "cardTilt", type: "number", default: "0", description: "每张卡的恒定 rotateZ（deg）" },
  { name: "cardRadius", type: "number", default: "10", description: "卡片圆角（px）" },
  { name: "centerScale", type: "number", default: "1.2", description: "最前处卡片的放大倍率" },
  { name: "edgeFade", type: "number", default: "0.3", description: "半圈末端淡出的比例" },
  { name: "edgeBlur", type: "number", default: "6", description: "远端最大模糊（px）" },
  { name: "pauseOnHover", type: "boolean", default: "true", description: "悬停时暂停自动运动" },
  { name: "imageFit", type: "string", default: '"cover"', description: "图片的 object-fit" },
  { name: "grayscale", type: "number", default: "0", description: "图片去饱和度 0–1" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
];

export default {
  id: "spiral-image-ring",
  name: "螺旋图片环带",
  href: "spiral-image-ring.html",
  title: "螺旋图片环带",
  description:
    "无接缝循环的 3D 螺旋图片环：卡片骑在圆柱上逐张盘旋，最近的最大最清晰，远处缩小、淡出、模糊入景深；运动可来自自动速度、页面滚动、竖向拖拽或三者叠加，悬停平滑暂停；半径、间距、每圈张数、倾斜、自旋偏移、中心放大、边缘淡出/模糊、去饱和全部可调，窄容器自动收缩，尊重系统减动效。",
  tags: ["React", "CSS"],

  cardDescription: "图片沿 3D 螺旋无限盘旋，近大远小，自动或随滚动走。",

  demoHint: "悬停看平滑暂停；换 scroll 模式随页面滚动、drag 模式直接拽；调每圈张数和边缘模糊。",

  api: API,
};
