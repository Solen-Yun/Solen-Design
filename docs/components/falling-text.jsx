/* Component metadata only — the live demo and gallery preview live in
   falling-text-demo.jsx, the framework source texts and the prompt in
   falling-text-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with falling-text-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "text", type: "string", default: '""', description: "要拆散坠落的句子" },
  { name: "highlightWords", type: "string[]", default: "[]", description: "以这些词开头的单词渲染成强调样式" },
  { name: "highlightClass", type: "string", default: '"highlighted"', description: "强调块的附加类名" },
  { name: "trigger", type: '"auto" | "hover" | "click" | "scroll"', default: '"auto"', description: "触发坠落的方式：挂载即落 / 悬停 / 点击 / 滚动到可视三成" },
  { name: "variant", type: '"text" | "tiles"', default: '"text"', description: "裸字形或圆角瓷砖块" },
  { name: "split", type: '"words" | "letters"', default: '"words"', description: "按单词还是按字母拆成刚体" },
  { name: "gravity", type: "number", default: "1", description: "世界重力 −3–4，负值向上飘" },
  { name: "bounciness", type: "number", default: "0.2", description: "刚体弹性 0–1，改动实时生效" },
  { name: "scatter", type: "number", default: "0.5", description: "释放瞬间的初始踢力 0–1" },
  { name: "stagger", type: "number", default: "0.03", description: "相邻刚体释放的间隔（秒）" },
  { name: "order", type: '"random" | "center" | "together" | string', default: '"random"', description: "释放顺序：随机 / 从中心向两边 / 一起落；其他值从左到右" },
  { name: "draggable", type: "boolean", default: "true", description: "坠落后可以抓取和抛掷刚体" },
  { name: "mouseConstraintStiffness", type: "number", default: "0.2", description: "拖拽约束的刚度 0.01–1" },
  { name: "cursorPush", type: "number", default: "0.5", description: "快速划过时指针推开刚体的力度 0–2，0 为关闭" },
  { name: "restoreDelay", type: "number", default: "0", description: "静止多少秒后飞回原位；0 表示保持堆积" },
  { name: "fontSize", type: "string", default: '"1rem"', description: "文本块字号" },
  { name: "accentColor", type: "string", default: '"#5b8cff"', description: "强调色；强调瓷砖的文字自动取对比色" },
  { name: "theme", type: '"dark" | "light"', default: '"dark"', description: "瓷砖配色的明暗主题" },
  { name: "backgroundColor", type: "string", default: '"transparent"', description: "容器背景色" },
  { name: "wireframes", type: "boolean", default: "false", description: "给每个刚体描边，调试物理边界用" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "falling-text",
  name: "坠落堆积文字",
  href: "falling-text.html",
  title: "坠落堆积文字",
  description:
    "坠落堆积文字：句子按词或字母拆成刚体，掉落、翻滚、互相砸落堆成一座字堆，可以抓起来甩出去，快速划过指针会把附近的字推开；静止若干秒后按自下而上的顺序弹回原来的排版位置。matter-js 刚体 120Hz 定步长模拟，支持瓷砖外观、强调词、明暗主题与四种触发方式。",
  tags: ["React", "CSS", "matter-js", "文字"],

  cardDescription: "句子摔成刚体堆成字堆，抓起来甩、划过就散。",

  demoHint: "抓一把字甩出去，快速划过把它们扫飞；换触发方式或 Reset 重看坠落。",

  api: API,
};
