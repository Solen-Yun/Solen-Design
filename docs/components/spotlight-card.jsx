/* Component metadata only — the live demo and gallery preview live in
   spotlight-card-demo.jsx, the framework source texts and the prompt in
   spotlight-card-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with spotlight-card-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "children", type: "ReactNode", default: "—", description: "卡片内容，画在光层之上" },
  { name: "className", type: "string", default: '""', description: "卡片附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "卡片内联样式" },
  { name: "spotlightColor", type: "string", default: "—", description: "光斑颜色；不设则按主题取默认色（深色白 / 浅色墨黑）" },
  { name: "intensity", type: "number", default: "0.15", description: "主光的峰值亮度 0–1" },
  { name: "spotlightSize", type: "number", default: "240", description: "光池半径（px），下限 20" },
  { name: "softness", type: "number", default: "0.7", description: "光斑边缘的柔散程度 0–1，0 是硬边圆盘" },
  { name: "shape", type: '"circle" | "beam"', default: '"circle"', description: "圆形光池，或从顶边垂下的竖直光束" },
  { name: "borderGlow", type: "number", default: "0.6", description: "1px 边框上轮辋光的亮度 0–1" },
  { name: "proximity", type: "number", default: "80", description: "光伸出卡片边缘的距离（px），0 关闭" },
  { name: "smoothing", type: "number", default: "0.3", description: "指针跟随的迟滞 0–1，0 立即到位" },
  { name: "ambient", type: "boolean", default: "false", description: "指针远离时灯光自动巡游，不熄灭" },
  { name: "flare", type: "boolean", default: "true", description: "按下卡片时光斑放大增亮的爆发" },
  { name: "grain", type: "number", default: "0", description: "叠在光上的胶片颗粒 0–1" },
  { name: "theme", type: '"dark" | "light"', default: '"dark"', description: "卡面、边框、阴影与默认光色的明暗主题" },
];

export default {
  id: "spotlight-card",
  name: "指针聚光卡片",
  href: "spotlight-card.html",
  title: "指针聚光卡片",
  description:
    "被一盏跟随指针的柔光灯照亮的卡片：光池在卡面下蔓延、1px 边框朝光源一侧泛出轮辋光、可选颗粒随光衰减；指针还没进来时按邻近度提前亮起，能照到相邻卡片；键盘聚焦子元素时光斑移过去，按下时爆发增亮。纯 DOM 径向渐变逐帧写入，帧循环稳定后自睡，深浅两套主题。",
  tags: ["React", "CSS"],

  cardDescription: "柔光跟随指针点亮卡面，边缘泛光，邻近即亮。",

  demoHint: "移出卡片再靠近看邻近起光；切 beam 形状、调柔散与颗粒，按下看光斑爆发。",

  api: API,
};
