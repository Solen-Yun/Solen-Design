/* Component metadata only — the live demo and gallery preview live in
   magic-bento-demo.jsx, the framework source texts and the prompt in
   magic-bento-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with magic-bento-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "items", type: "Item[]", default: "DEFAULT_ITEMS", description: "六张内置功能卡（分析、仪表盘、协作、自动化、集成、安全）；每项可带 title/description/label/icon/visual/image/href/colSpan/rowSpan 等" },
  { name: "columns", type: "number", default: "4", description: "网格列数，下限 1；宽度不够时自动坍缩" },
  { name: "rowHeight", type: "number", default: "200", description: "行高（px）" },
  { name: "gap", type: "number", default: "12", description: "网格间距（px）" },
  { name: "radius", type: "number", default: "20", description: "卡片圆角（px），同时推导内层圆角与内边距" },
  { name: "theme", type: '"dark" | "light"', default: '"dark"', description: "卡面铬件与强调色对比的明暗主题" },
  { name: "glowColor", type: "string", default: "—", description: "强调/辉光颜色（hex 或 rgb）；不设用主题墨色" },
  { name: "textAutoHide", type: "boolean", default: "true", description: "标题一行、描述两行自动截断" },
  { name: "enableBorderGlow", type: "boolean", default: "true", description: "跟随指针巡游整块网格的边框流光" },
  { name: "enableSpotlight", type: "boolean", default: "true", description: "卡片内指针聚光" },
  { name: "spotlightRadius", type: "number", default: "300", description: "聚光与边框光的半径（px），下限 40" },
  { name: "enableStars", type: "boolean", default: "false", description: "卡内上升星尘粒子" },
  { name: "particleCount", type: "number", default: "24", description: "每张卡的星尘数量 0–120" },
  { name: "enableTilt", type: "boolean", default: "false", description: "卡片朝指针倾斜（±6deg）" },
  { name: "enableMagnetism", type: "boolean", default: "false", description: "卡片被指针磁吸（±6px）" },
  { name: "clickEffect", type: "boolean", default: "true", description: "点击扩散光波并重播卡内动画" },
  { name: "intro", type: "boolean", default: "true", description: "卡片错峰入场" },
  { name: "disableAnimations", type: "boolean", default: "false", description: "关闭所有动效（系统减动效时同样生效）" },
  { name: "onItemClick", type: "(item, index) => void", default: "—", description: "任意卡片点击回调" },
  { name: "className", type: "string", default: '""', description: "网格附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "网格内联样式" },
];

export default {
  id: "magic-bento",
  name: "边缘流光便当格",
  href: "magic-bento.html",
  title: "边缘流光便当格",
  description:
    "一排会动的便当格功能卡：每张卡内置一段自播的小作品（可刮擦的折线图、生长柱状、协作光标、CI 流水线、集成枢纽、安全开关），指针聚光随光标巡游、边框流光在整个网格上跟随光标位置、点击从落点炸开一圈光波并重播卡内动画；可选倾斜/磁吸、上升星尘、错峰入场与明暗主题，帧循环稳定后自睡。",
  tags: ["React", "CSS", "Canvas"],

  cardDescription: "边框流光跟着指针巡游网格，点击炸开光波、重播卡内动画。",

  demoHint: "指针贴着网格外沿走过看边框流光；点任意卡片看光波和动画重播；开倾斜、磁吸与星尘。",

  api: API,
};
