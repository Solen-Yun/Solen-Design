/* Component metadata only — the live demo and gallery preview live in
   star-border-demo.jsx, the framework source texts and the prompt in
   star-border-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with star-border-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "as", type: "ElementType", default: '"button"', description: "渲染成的元素标签（a、div 等）；按钮语义与 type 自动补全" },
  { name: "children", type: "ReactNode", default: "—", description: "框内内容，星头沿其真实轮廓巡航" },
  { name: "color", type: "string", default: "—", description: "星头颜色；不设则按主题取默认（暗色 #ffffff / 亮色 #18181b）" },
  { name: "trailColor", type: "string", default: "—", description: "彗尾颜色；不设则用星头颜色" },
  { name: "duration", type: "number", default: "4", description: "绕轮廓一圈的秒数，下限 0.3" },
  { name: "thickness", type: "number", default: "1", description: "轨道与拖尾线宽（px），下限 0.5" },
  { name: "radius", type: "number", default: "12", description: "星头跟随的圆角半径（px），下限 0" },
  { name: "trailLength", type: "number", default: "0.3", description: "拖尾长度占一圈时间的比例 0–1" },
  { name: "stars", type: "number", default: "1", description: "轮廓上均匀分布的星头数 1–6" },
  { name: "glow", type: "number", default: "0.6", description: "光晕强度 0–1" },
  { name: "sparkle", type: "boolean", default: "false", description: "星头十字星光与飘散星尘" },
  { name: "direction", type: '"clockwise" | "counterclockwise"', default: '"clockwise"', description: "巡航方向" },
  { name: "hover", type: '"lap" | "brighten" | "reveal" | "none"', default: '"lap"', description: "悬停行为：多跑一圈 / 增亮 / 星出现在指针下 / 无" },
  { name: "clickPulse", type: "boolean", default: "true", description: "点击从落点向两侧发出光脉冲并闪一圈光环" },
  { name: "theme", type: '"dark" | "light"', default: '"dark"', description: "底色、文字、轨道与星光的明暗主题" },
  { name: "backgroundColor", type: "string", default: "—", description: "底色覆盖" },
  { name: "textColor", type: "string", default: "—", description: "文字颜色覆盖" },
  { name: "borderColor", type: "string", default: "—", description: "静态轨道环颜色覆盖" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
];

export default {
  id: "star-border",
  name: "流星描边",
  href: "star-border.html",
  title: "流星描边",
  description:
    "描边即流星：一到六颗发光星头沿按钮/卡片的圆角轮廓精确巡航，拖着渐隐彗尾；悬停可加跑一圈、增亮，或让星头隐藏到指针触碰轮廓处才显现，点击从落点向两侧发出光脉冲并闪一圈光环，sparkle 模式追加十字星光与星尘。Canvas 2D 绘制，轮廓按 8 段几何分解（直线 + 圆弧）并支持指针位置反投影，帧循环静止自睡、离屏暂停，暗/亮两套主题。",
  tags: ["React", "Canvas", "动效", "按钮"],

  cardDescription: "星头沿按钮轮廓巡航拖尾，悬停加圈、点击激起双向光脉冲。",

  demoHint: "悬停按钮看加速加圈，点击看双向脉冲；切到 reveal 模式，星星会出现在指针落点。",

  api: API,
};
