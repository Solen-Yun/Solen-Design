/* Component metadata only — the live demo and gallery preview live in
   pixel-transition-demo.jsx, the framework source texts and the prompt in
   pixel-transition-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with pixel-transition-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "firstContent", type: "ReactNode", default: "—", description: "初始内容（切换被像素盖住时也显示这层）" },
  { name: "secondContent", type: "ReactNode", default: "—", description: "切换后揭示的内容" },
  { name: "gridSize", type: "number", default: "10", description: "像素网格的列数 2–80" },
  { name: "pixelColor", type: "string", default: '"#ffffff"', description: "像素颜色，任意 CSS 颜色（含主题变量）都会被解析" },
  { name: "mosaic", type: "number", default: "0", description: "0–1，把像素色混出 5 档色调的马赛克" },
  { name: "animationStepDuration", type: "number", default: "0.4", description: "盖住与揭开各占的秒数，下限 0.05" },
  { name: "pattern", type: '"random" | "dither" | "ripple" | "wipe"', default: '"random"', description: "格子点亮的次序：随机、抖纹、从起点涟漪、从边缘擦除" },
  { name: "randomness", type: "number", default: "0.3", description: "有序图案里混入的噪声 0–1" },
  { name: "pixelAnimation", type: '"pop" | "grow" | "fade"', default: '"pop"', description: "格子入场方式：二值弹出、放大生长或透明度渐显" },
  { name: "pixelShape", type: '"square" | "rounded" | "circle"', default: '"square"', description: "格子形状" },
  { name: "gap", type: "number", default: "0", description: "格子间隙（px），盖满时收拢" },
  { name: "fps", type: "number", default: "0", description: "绘制帧率上限 0–120；0 为每帧" },
  { name: "trigger", type: '"hover" | "click"', default: '"hover"', description: "触发方式：悬停进出或点击切换" },
  { name: "active", type: "boolean", default: "—", description: "受控切换状态" },
  { name: "once", type: "boolean", default: "false", description: "只盖住一次，不再翻回" },
  { name: "onActiveChange", type: "(active: boolean) => void", default: "—", description: "请求状态变化时的回调" },
  { name: "aspectRatio", type: "string", default: '"100%"', description: "盒子比例（\"16 / 10\"）或 % 形式的内边距撑高（\"100%\"）" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
];

export default {
  id: "pixel-transition",
  name: "像素溶解切换",
  href: "pixel-transition.html",
  title: "像素溶解切换",
  description:
    "复古像素溶解卡片：格子按随机、Bayer 抖纹、指针涟漪或边缘擦除的次序逐格点亮，盖满的一瞬在像素之下换掉内容，再按序清除揭示新面；pop/grow/fade 三种入场、方/圆角/圆形三种格子、马赛克五档色调，盖满时缝隙收拢成一整块无缝色板。Canvas 2D 按 (色调, 透明度) 合并 Path2D 批量填充，悬停/点击/键盘三路触发，支持受控与 once 锁定，减少动态时整段切换一帧完成。",
  tags: ["React", "Canvas", "动效", "切换"],

  cardDescription: "像素一块块盖满卡片，底下内容被换掉后再逐格揭开。",

  demoHint: "悬停卡片看溶解，换 pattern 对比随机、抖纹、涟漪与擦除的次序；mosaic 拉高出现色调马赛克。",

  api: API,
};
