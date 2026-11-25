/* Component metadata only — the live demo and gallery preview live in
   pixel-swap-demo.jsx, the framework source texts and the prompt in
   pixel-swap-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with pixel-swap-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "firstContent", type: "ReactNode", default: "—", description: "底层内容，挂载时由入场波浪逐格搭建" },
  { name: "secondContent", type: "ReactNode", default: "—", description: "波浪激活时逐格建出的内容" },
  { name: "pattern", type: '"pointer" | "random" | "center" | "edges" | "left-to-right" | "right-to-left" | "top-to-bottom" | "bottom-to-top" | "diagonal" | "spiral"', default: '"pointer"', description: "波浪起点与点亮次序；pointer 从指针进入处扩散" },
  { name: "pixelSize", type: "number", default: "48", description: "格子尺寸（px），下限 8；超过 600 格自动放大" },
  { name: "gap", type: "number", default: "0", description: "格子间隙（px）" },
  { name: "pixelRadius", type: "number", default: "0", description: "格子圆角占尺寸的百分比 0–50，落定后回直" },
  { name: "pixelScale", type: "number", default: "0", description: "格子从该缩放直接出现（0–0.9），而不是从 0 长出" },
  { name: "pixelSpin", type: "number", default: "0", description: "格子落定时的旋转角度（度），±360" },
  { name: "duration", type: "number", default: "400", description: "波浪扫过整面的时长（ms），下限 0" },
  { name: "pixelDuration", type: "number", default: "350", description: "单格弹簧周期（ms），下限 60" },
  { name: "randomness", type: "number", default: "0.2", description: "次序里混入的噪声 0–1" },
  { name: "bounce", type: "number", default: "0.3", description: "弹簧过冲 0–1（阻尼比 = 1 − bounce）" },
  { name: "trigger", type: '"hover" | "click"', default: '"hover"', description: "驱动方式：悬停进出或点击切换" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时把底层内容逐格建出来" },
  { name: "initialActive", type: "boolean", default: "false", description: "初始就显示第二层" },
  { name: "active", type: "boolean", default: "—", description: "受控切换状态" },
  { name: "onActiveChange", type: "(active: boolean) => void", default: "—", description: "请求状态变化时的回调" },
  { name: "onComplete", type: "(active: boolean) => void", default: "—", description: "波浪落定到目标层时的回调" },
  { name: "aspectRatio", type: "string", default: '"16 / 10"', description: "盒子比例，应用为 CSS aspect-ratio" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
];

export default {
  id: "pixel-swap",
  name: "像素波浪换装",
  href: "pixel-swap.html",
  title: "像素波浪换装",
  description:
    "像素弹簧换层：一格格大像素从指针进入处荡开，新内容通过它们的并集逐格建出——每格都是带过冲的阻尼弹簧（240Hz 子步积分），飞行中放大越位保证不漏缝，落定时圆角回直、旋转归位；波次支持指针/随机/中心/边缘/四向扫掠/对角/螺旋十种，格子的尺寸、间隙、圆角、自旋与起始缩放全可调。clip-path path() 逐帧驱动，无 Canvas；入场波浪等首层图片就绪后自动搭台，受控/非受控与 onComplete 齐备，减少动态时直接换层。",
  tags: ["React", "CSS", "动效", "切换"],

  cardDescription: "像素从指针落点荡开，新内容逐格弹簧建出。",

  demoHint: "从卡片不同角落进出看波浪改起点；bounce 拉高看过冲，pixelSpin 加旋转、pixelRadius 加圆角。",

  api: API,
};
