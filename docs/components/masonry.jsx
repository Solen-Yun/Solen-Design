/* Component metadata only — the live demo and gallery preview live in
   masonry-demo.jsx, the framework source texts and the prompt in
   masonry-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with masonry-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "items", type: "{ id: string | number; img: string; alt?: string; title?: string; description?: string; url?: string; width?: number; height?: number; span?: number }[]", default: "[]", description: "图库条目；给 width/height 免测量，span 让图块横跨多列" },
  { name: "columns", type: 'number | "auto"', default: '"auto"', description: "固定列数，或按 columnWidth 自动算" },
  { name: "columnWidth", type: "number", default: "240", description: "auto 模式的目标列宽（px）" },
  { name: "gap", type: "number", default: "12", description: "图块间距（px）" },
  { name: "radius", type: "number", default: "12", description: "图块圆角（px）" },
  { name: "animateFrom", type: '"bottom" | "top" | "left" | "right" | "center" | "random" | "none"', default: '"bottom"', description: "入场时图块从哪个方向弹入" },
  { name: "stagger", type: "number", default: "0.05", description: "相邻图块入场的间隔（秒）" },
  { name: "duration", type: "number", default: "0.6", description: "弹簧时长（秒），决定劲度" },
  { name: "bounce", type: "number", default: "0.15", description: "回弹幅度 0–0.9，0 临界阻尼无过冲" },
  { name: "blurToFocus", type: "boolean", default: "true", description: "入场从 12px 模糊聚焦到清晰" },
  { name: "revealOnScroll", type: "boolean", default: "true", description: "图块滚入视口才入场" },
  { name: "hoverEffect", type: '"zoom" | "lift" | "tilt" | "none"', default: '"zoom"', description: "悬停效果；tilt 随指针倾斜 ±10°" },
  { name: "focusOnHover", type: "boolean", default: "false", description: "悬停时压暗其余图块" },
  { name: "captions", type: '"hover" | "always" | "none"', default: '"hover"', description: "底部渐变字幕的显示时机" },
  { name: "parallax", type: "number", default: "0", description: "图块内图片的视差强度 0–1" },
  { name: "lightbox", type: "boolean", default: "true", description: "点击打开放大灯箱" },
  { name: "draggable", type: "boolean", default: "true", description: "图块可拖拽换位" },
  { name: "onItemClick", type: "(item, index: number, event) => void", default: "—", description: "点击回调，先于灯箱；preventDefault 可阻止灯箱" },
  { name: "onReorder", type: "(orderedItems) => void", default: "—", description: "拖拽实际换位后回调" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
];

export default {
  id: "masonry",
  name: "弹簧瀑布流",
  href: "masonry.html",
  title: "弹簧瀑布流",
  description:
    "最短列排布的瀑布流图库：图块用阻尼谐振弹簧入位（时长与回弹可调，240Hz 子步积分），重排、换位、窗口变化都弹着走而不是跳变。图片加载后按位置排序错峰入场，滚入视口才触发，带 12px 模糊聚焦；拖拽图块实时换位并触发 onReorder，点击打开 FLIP 灯箱（从图块飞出、方向键翻页、Esc 收回图块）；悬停缩放/抬升/倾斜三选一，字幕三档，内层图片视差，reduced-motion 全部即时定格。",
  tags: ["React", "弹簧动画", "拖拽排序", "Lightbox"],

  cardDescription: "瀑布流图块弹簧入位，可拖拽换位，点击飞出灯箱。",

  demoHint: "拖动任意图块看其余让位，点击图片进灯箱用方向键翻页；调回弹看弹簧性格。",

  api: API,
};
