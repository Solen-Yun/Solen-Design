/* Component metadata only — the live demo and gallery preview live in
   pixel-card-demo.jsx, the framework source texts and the prompt in
   pixel-card-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with pixel-card-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "variant", type: '"default" | "blue" | "yellow" | "pink"', default: '"default"', description: "像素配色/速度预设；pink 预设默认关闭焦点激活" },
  { name: "colors", type: "string | string[]", default: "预设调色板", description: "覆盖预设的像素调色板，逗号分隔字符串也可以" },
  { name: "gap", type: "number", default: "预设（default 5）", description: "像素间距（px，最小 2）" },
  { name: "speed", type: "number", default: "预设（default 35）", description: "闪烁速度 0–100，0 停止闪烁" },
  { name: "pixelSize", type: "number", default: "2", description: "像素基准尺寸（px，最小 0.5）" },
  { name: "shape", type: '"square" | "circle" | "diamond"', default: '"square"', description: "像素形状" },
  { name: "origin", type: '"center" | "pointer"', default: '"center"', description: "点亮从中心还是指针位置辐射" },
  { name: "revealDuration", type: "number", default: "600", description: "点亮的错峰总时长（ms，最小 50）" },
  { name: "spotlight", type: "number", default: "0.5", description: "指针聚光灯强度 0–1" },
  { name: "glow", type: "number", default: "0.5", description: "背景径向辉光强度 0–1" },
  { name: "glowColor", type: "string", default: "预设按主题", description: "辉光颜色；任意 CSS 颜色，非法值回退白色" },
  { name: "opacity", type: "number", default: "1", description: "像素整体不透明度 0–1" },
  { name: "fade", type: "number", default: "0", description: "边缘渐隐强度 0–1" },
  { name: "trigger", type: '"hover" | "click" | "always"', default: '"hover"', description: "激活方式：悬停 / 点击切换 / 常亮" },
  { name: "clickPulse", type: "boolean", default: "true", description: "点击时发出扩散环形波" },
  { name: "intro", type: "boolean", default: "true", description: "首次滚入视口时来一次点亮演示" },
  { name: "introDelay", type: "number", default: "0", description: "演示点亮前的延迟（ms）" },
  { name: "noFocus", type: "boolean", default: "预设（false；pink true）", description: "移出 Tab 序并禁用焦点激活" },
  { name: "theme", type: '"dark" | "light"', default: '"dark"', description: "卡面、描边与默认调色板的明暗主题" },
  { name: "radius", type: "number", default: "24", description: "卡片圆角（px）" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式（可覆盖默认 300×400 尺寸）" },
  { name: "children", type: "ReactNode", default: "—", description: "渲染在像素画布之上的卡片内容" },
];

export default {
  id: "pixel-card",
  name: "像素闪烁卡片",
  href: "pixel-card.html",
  title: "像素闪烁卡片",
  description:
    "一张激活时从中心或指针位置点亮像素雨的卡片：Canvas 2D 网格像素以回弹缓动逐个蹦出、正弦闪烁、命中处被弹簧聚光灯放大增亮，点击发出扩散环形波把沿途像素顶起，失活时由近及远排空。四套配色预设、三种像素形状、hover/click/always 三种触发、明暗两套卡面主题，辉光渐变随在场比例呼吸，边缘可渐隐；首次滚入视口自带一次点亮演示，reduced-motion 下全部瞬时定格。",
  tags: ["React", "Canvas", "粒子"],

  cardDescription: "悬停卡片，像素雨从指针处蹦出闪烁，点击激起扩散波。",

  demoHint: "悬停看像素从指针点亮，点击激起环形波；切主题和形状试试。",

  api: API,
};
