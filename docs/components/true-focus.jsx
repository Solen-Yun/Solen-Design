/* Component metadata only — the live demo and gallery preview live in
   true-focus-demo.jsx, the framework source texts and the prompt in
   true-focus-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with true-focus-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "sentence", type: "string", default: '"True Focus"', description: "逐词对焦的句子" },
  { name: "separator", type: "string", default: '" "', description: "分词分隔符" },
  { name: "manualMode", type: "boolean", default: "false", description: "停掉计时器，悬停哪个词就对焦哪个" },
  { name: "focusStyle", type: '"brackets" | "box" | "underline" | "highlight"', default: '"brackets"', description: "取景框样式：四角括号 / 整框 / 下划线 / 高亮色块" },
  { name: "order", type: '"sequential" | "random"', default: '"sequential"', description: "自动轮换顺序；random 不重复当前词" },
  { name: "easing", type: '"smooth" | "spring"', default: '"smooth"', description: "取景框换词的过渡手感；spring 带一次过冲" },
  { name: "blurAmount", type: "number", default: "5", description: "失焦词的模糊半径（px）" },
  { name: "focusScale", type: "number", default: "1", description: "对焦词的额外放大倍数" },
  { name: "borderColor", type: "string", default: '"green"', description: "取景框颜色，也是高亮色块的混色来源" },
  { name: "highlightColor", type: "string", default: "—", description: "高亮色块颜色；缺省取边框色 30% 混合" },
  { name: "glowColor", type: "string", default: '"transparent"', description: "取景框背后的辉光颜色" },
  { name: "animationDuration", type: "number", default: "0.5", description: "单次对焦过渡时长（秒）" },
  { name: "pauseBetweenAnimations", type: "number", default: "1", description: "每个词的停留时间（秒）" },
  { name: "cornerSize", type: "number", default: "16", description: "括号角块尺寸（px）" },
  { name: "borderWidth", type: "number", default: "3", description: "取景框线宽（px）" },
  { name: "unfocusedOpacity", type: "number", default: "1", description: "失焦词的透明度" },
];

export default {
  id: "true-focus",
  name: "逐词对焦",
  href: "true-focus.html",
  title: "逐词对焦",
  description:
    "取景器式逐词对焦：整句失焦，当前词清晰，四角括号 / 整框 / 下划线 / 高亮色块四种取景框按节奏从一个词滑到下一个，平滑或弹簧两种手感；悬停手动对焦、随机不重复、换行时取景框照样跟住，减动效下瞬间落定。",
  tags: ["React", "Motion", "CSS", "文字"],

  cardDescription: "取景框逐词滑过，模糊的句子只有一个词始终清晰。",

  demoHint: "切到 manual 悬停对焦；换 focusStyle 看四种取景框，开 spring 看过冲手感。",

  api: API,
};
