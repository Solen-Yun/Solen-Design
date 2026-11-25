/* Component metadata only — the live demo and gallery preview live in
   text-type-demo.jsx, the framework source texts and the prompt in
   text-type-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with text-type-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "text", type: "string | string[]", default: "—（必填）", description: "要打的句子；传数组时按顺序逐句循环" },
  { name: "as", type: "keyof JSX.IntrinsicElements", default: '"div"', description: "渲染的元素标签" },
  { name: "typingSpeed", type: "number", default: "50", description: "基础打字间隔（ms），也是未设 variableSpeed 时的固定节奏" },
  { name: "initialDelay", type: "number", default: "0", description: "每句首字前的额外等待（ms）" },
  { name: "pauseDuration", type: "number", default: "2000", description: "整句打完后的停留时长（ms），之后开始删除" },
  { name: "deletingSpeed", type: "number", default: "30", description: "删除时每字间隔（ms）" },
  { name: "deleteMode", type: '"backspace" | "select"', default: '"backspace"', description: "删除方式：逐字退格，或先扫过选区高亮再整段清空" },
  { name: "loop", type: "boolean", default: "true", description: "最后一句打完后删除并重来；false 则停在最后一句" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "showCursor", type: "boolean", default: "true", description: "显示悬浮光标" },
  { name: "hideCursorWhileTyping", type: "boolean", default: "false", description: "打字/删除时光标淡出" },
  { name: "cursorStyle", type: '"character" | "bar" | "block" | "underscore"', default: '"character"', description: "光标形态；character 渲染 cursorCharacter 字符" },
  { name: "cursorCharacter", type: "string", default: '"|"', description: "字符光标的内容" },
  { name: "cursorColor", type: "string", default: '"currentColor"', description: "光标颜色" },
  { name: "cursorClassName", type: "string", default: '""', description: "光标附加类名" },
  { name: "cursorBlinkDuration", type: "number", default: "0.5", description: "闪烁周期（秒）" },
  { name: "cursorGlide", type: "boolean", default: "true", description: "光标向插入点平滑滑动而非跳格" },
  { name: "typeEffect", type: '"none" | "fade" | "blur" | "rise"', default: '"none"', description: "每个新出字元的入场动画" },
  { name: "mistakes", type: "number", default: "0", description: "0–1；打错字（敲成相邻键再改）的发生率" },
  { name: "prefix", type: "string", default: '""', description: "打字内容前的固定文案（也计入读屏文本）" },
  { name: "prefixColor", type: "string", default: '"currentColor"', description: "前缀颜色" },
  { name: "textColors", type: "string[]", default: "[]", description: "按句子循环的文字颜色" },
  { name: "variableSpeed", type: "{ min: number; max: number }", default: "—", description: "每次击键的随机间隔范围（ms），模拟真人节奏" },
  { name: "onSentenceComplete", type: "(text: string, index: number) => void", default: "—", description: "某句被完整删除后的回调" },
  { name: "startOnVisible", type: "boolean", default: "false", description: "滚动进入视口后才开始打字" },
  { name: "reverseMode", type: "boolean", default: "false", description: "从句尾向句首倒着打字，光标走在文字前方" },
];

export default {
  id: "text-type",
  name: "打字机文字",
  href: "text-type.html",
  title: "打字机文字",
  description:
    "逐字打出句子的打字机效果：悬浮光标贴着隐形插入点滑动（跨行跳格、缩放重定位），打字时暂停闪烁；可开相邻键打错再纠正的拟人失误、每字淡入/模糊/上浮入场、按句循环的随机击键速度。删除支持逐字退格与选区高亮整段清空两种，倒序模式从句尾往句首推进；图元级分段保证 emoji 整体出字，读屏文本与视觉副本分离，弱动效下瞬时完成。",
  tags: ["React", "CSS", "GSAP", "打字机"],

  cardDescription: "逐字打出句子，光标滑动跟随，还能模拟打错再改。",

  demoHint: "调快打字速度、开失误率看它敲错再改；换光标形态与入场动画。",

  api: API,
};
