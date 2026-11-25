/* Component metadata only — the live demo and gallery preview live in
   rotating-text-demo.jsx, the framework source texts and the prompt in
   rotating-text-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with rotating-text-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "texts", type: "string[]", default: "—", description: "轮换的词组列表" },
  { name: "transition", type: "object", default: "—", description: "替换所选预设的单字过渡参数" },
  { name: "initial", type: "object", default: "—", description: "替换单字的入场状态" },
  { name: "animate", type: "object", default: "—", description: "替换单字的静止状态" },
  { name: "exit", type: "object", default: "—", description: "替换单字的离场状态" },
  { name: "effect", type: '"slide" | "flip" | "blur" | "scale" | "drop"', default: '"slide"', description: "单字进出场的预设动效" },
  { name: "direction", type: '"up" | "down"', default: '"up"', description: "单字行进方向" },
  { name: "highlight", type: "boolean", default: "false", description: "渲染成记号笔色块样式，宽度随词组弹性变化" },
  { name: "highlightColor", type: "string", default: '"#a855f7"', description: "记号笔底色；文字自动取对比色" },
  { name: "animatePresenceMode", type: '"sync" | "wait" | "popLayout"', default: '"wait"', description: "离场与入场词组的交接方式" },
  { name: "animatePresenceInitial", type: "boolean", default: "false", description: "首帧词组是否播放入场动画" },
  { name: "rotationInterval", type: "number", default: "2000", description: "每个词组停留的毫秒数" },
  { name: "staggerDuration", type: "number", default: "0", description: "相邻单字的错峰间隔（秒）" },
  { name: "staggerFrom", type: '"first" | "last" | "center" | "random" | number', default: '"first"', description: "错峰从哪端荡开；数字表示锚定在该序号的单字" },
  { name: "loop", type: "boolean", default: "true", description: "到最后一个词组后回到开头" },
  { name: "auto", type: "boolean", default: "true", description: "按 rotationInterval 自动轮换" },
  { name: "pauseOnHover", type: "boolean", default: "false", description: "悬停时暂停轮换" },
  { name: "blur", type: "number", default: "0", description: "叠加在单字三态上的模糊半径（px）" },
  { name: "splitBy", type: '"characters" | "words" | "lines" | string', default: '"characters"', description: "词组拆分方式；其他字符串按字面分隔符拆分" },
  { name: "onNext", type: "(index: number) => void", default: "—", description: "每次切换到新词组时回调新序号" },
  { name: "onMouseEnter", type: "(event) => void", default: "—", description: "根节点额外的 mouseenter 处理" },
  { name: "onMouseLeave", type: "(event) => void", default: "—", description: "根节点额外的 mouseleave 处理" },
  { name: "mainClassName", type: "string", default: "—", description: "根节点附加类名" },
  { name: "splitLevelClassName", type: "string", default: "—", description: "每个词单元的附加类名" },
  { name: "elementLevelClassName", type: "string", default: "—", description: "每个单字的附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根节点内联样式" },
];

export default {
  id: "rotating-text",
  name: "轮换翻转词组",
  href: "rotating-text.html",
  title: "轮换翻转词组",
  description:
    "轮换翻转词组：把词组拆成单字粒度的运动单元，整组用 3D 翻转、滑入、模糊、缩放或坠落五种预设进出，错峰可从首端、尾端、中心、随机或锚定序号荡开；记号笔模式用弹性宽度跟随词组长短并自动取对比色文字，ref 暴露 next/previous/jumpTo/reset 供外部驱动。",
  tags: ["React", "Motion", "CSS", "文字"],

  cardDescription: "词组逐字翻转轮换，记号笔色块弹性跟随长短。",

  demoHint: "切换五种预设和错峰方向；打开记号笔看色块宽度跟词组长短弹性伸缩。",

  api: API,
};
