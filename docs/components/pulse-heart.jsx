/* Component metadata only — the live demo and gallery preview live in
   pulse-heart-demo.jsx, the framework source texts and the prompt in
   pulse-heart-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with pulse-heart-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "liked", type: "boolean", default: "—", description: "受控点赞状态，配合 onChange 使用；传入后内部状态不再生效" },
  { name: "defaultLiked", type: "boolean", default: "false", description: "初始点赞状态（非受控模式）" },
  { name: "count", type: "number", default: "0", description: "点赞数；外部变化会被采纳并触发数字滚动" },
  { name: "onChange", type: "(liked: boolean, count: number) => void", default: "—", description: "切换时回调，带回新的点赞状态与计数" },
  { name: "showCount", type: "boolean", default: "true", description: "图标旁的格式化计数" },
  { name: "icon", type: '"heart" | "star" | "thumb" | ReactNode', default: '"heart"', description: "内置图形名或自定义节点" },
  { name: "idleOutline", type: "boolean", default: "true", description: "未点赞时显示描边图标；关掉则实心" },
  { name: "size", type: "number", default: "40", description: "图标边长（px），内边距、计数与描边粗细随之推导" },
  { name: "corner", type: "number", default: "32", description: "胶囊圆角（px）" },
  { name: "likedColor", type: "string", default: '"#ff4d6d"', description: "点赞后的图标颜色，也是焦点环的基色" },
  { name: "idleColor", type: "string", default: '"#8b8b93"', description: "未点赞的图标颜色" },
  { name: "pillColor", type: "string", default: '"#232326"', description: "胶囊背景色" },
  { name: "textColor", type: "string", default: '"#f5f5f5"', description: "计数文字颜色" },
  { name: "duration", type: "number", default: "560", description: "收缩-回弹动画总时长（ms）" },
  { name: "dotSize", type: "number", default: "0.3", description: "收缩最深点图标剩余的比例 0–1" },
  { name: "overshoot", type: "number", default: "1.7", description: "回弹阶段的后弯过冲量" },
  { name: "beat", type: "number", default: "3", description: "胶囊呼吸的缩放深度（%）" },
  { name: "rollDuration", type: "number", default: "350", description: "数字滚动时长（ms）" },
  { name: "disabled", type: "boolean", default: "false", description: "禁用按钮" },
  { name: "label", type: "string", default: '"Like"', description: "屏幕阅读器文本的开头" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
];

export default {
  id: "pulse-heart",
  name: "脉冲点赞爱心",
  href: "pulse-heart.html",
  title: "脉冲点赞爱心",
  description:
    "带计数的点赞按钮：点击瞬间图标收缩成一个小点、胶囊随之呼吸，收缩到最深时恰好翻转到实心主色，随后带着过冲脉冲回弹，计数里变化的那一位数字做竖向滚动（格式化跨位时整段交换）。rAF 驱动的 swell 曲线 + 布局效应驱动滚动，动画期间状态刻意滞后、结束时对齐，连点不会重复计数；支持心/星/赞三种内置图形与自定义节点、受控与非受控、键盘即时反馈。",
  tags: ["React", "CSS", "按钮"],

  cardDescription: "点赞时图标缩成点再脉冲回弹，计数数字逐位滚动。",

  demoHint: "连点看收缩-回弹与数字滚动；换图形、调收缩深度和过冲，跨过 999 看整段交换。",

  api: API,
};
