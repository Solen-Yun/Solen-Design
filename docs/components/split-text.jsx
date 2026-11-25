/* Component metadata only — the live demo and gallery preview live in
   split-text-demo.jsx, the framework source texts and the prompt in
   split-text-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with split-text-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "text", type: "string", default: "—", description: "要拆分入场的文字（必填）" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "delay", type: "number", default: "50", description: "相邻碎片的错峰间隔（ms）" },
  { name: "duration", type: "number", default: "1.25", description: "单片补间时长（秒）" },
  { name: "ease", type: "string", default: "—", description: "缓动名；覆盖预设缓动（自定义 from/to 默认 power3.out）" },
  { name: "splitType", type: '"chars" | "words" | "lines"', default: '"chars"', description: "拆分单位" },
  { name: "from", type: "object", default: "—", description: "自定义补间起始变量，替换预设的 from" },
  { name: "to", type: "object", default: "—", description: "自定义补间结束变量，替换预设的 to" },
  { name: "threshold", type: "number", default: "0.1", description: "0–1；触发线在元素顶部超过视口底部的比例" },
  { name: "rootMargin", type: "string", default: '"-100px"', description: "触发线的外扩边距，如 -100px、10%" },
  { name: "textAlign", type: "string", default: '"center"', description: "文本对齐" },
  { name: "tag", type: "string", default: '"p"', description: "渲染的元素标签" },
  { name: "staggerFrom", type: "string | number", default: '"start"', description: "错峰从哪端开始（distribute 取值）" },
  { name: "mask", type: "boolean", default: "false", description: "每个碎片套自己的裁切遮罩，从遮罩后升起" },
  { name: "effect", type: '"rise" | "fade" | "blur" | "flip" | "pop" | "skew" | "wave"', default: '"rise"', description: "入场预设" },
  { name: "trigger", type: '"view" | "load" | "hover" | "click"', default: '"view"', description: "view/load 入场一次；hover/click 入场后可交互重播" },
  { name: "loop", type: "boolean", default: "false", description: "首次入场后无限折返重播" },
  { name: "loopDelay", type: "number", default: "1.5", description: "循环两轮之间的停顿（秒）" },
  { name: "hoverEffect", type: '"none" | "lift" | "wave"', default: '"none"', description: "入场完成后的指针效果" },
  { name: "color", type: "string", default: "—", description: "文字颜色" },
  { name: "accentColor", type: "string", default: "—", description: "强调色；入场时从强调色洗回文字色，折返时洗回强调色" },
  { name: "onLetterAnimationComplete", type: "() => void", default: "—", description: "单轮入场完成时回调" },
];

export default {
  id: "split-text",
  name: "逐字拆分入场",
  href: "split-text.html",
  title: "逐字拆分入场",
  description:
    "把一段文字拆成字符 / 词 / 行，按升起、淡入、模糊、翻转、弹出、斜切、波浪七种预设错峰入场，也可用自定义 from/to 变量完全接管；进入视口 / 加载触发，悬停与点击可重播完整折返，循环模式定时重演，强调色在字母上洗入洗出，入场完成后指针可抬升字母或推送一圈波浪。",
  tags: ["React", "GSAP", "文字"],

  cardDescription: "标题逐字拆分，按升起、模糊、翻转等预设依次入场，可循环与悬停抬升。",

  demoHint: "切换入场预设与触发方式看不同落字；开循环看折返重播；开遮罩看字母从裁切后升起；文字落下后划过指针看抬升与波浪。",

  api: API,
};
