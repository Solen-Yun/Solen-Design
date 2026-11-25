/* Component metadata only — the live demo and gallery preview live in
   chroma-grid-demo.jsx, the framework source texts and the prompt in
   chroma-grid-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with chroma-grid-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "items", type: "{ image: string; title?: string; subtitle?: string; accent?: string; alt?: string; url?: string }[]", default: "DEFAULT_ITEMS", description: "卡片数据：图片、标题、副标题、强调色；带 url 渲染成新开标签页的链接；缺省用六张内置占位照片" },
  { name: "columns", type: "number", default: "3", description: "目标列数；自动填充网格在窄屏会收缩到更少列但不会超过它" },
  { name: "minCardWidth", type: "number", default: "180", description: "卡片最小宽（px），下限 80，小于它就折列" },
  { name: "gap", type: "number", default: "12", description: "网格间距（px）" },
  { name: "radius", type: "number", default: "260", description: "聚光灯半径（px），下限 20" },
  { name: "softness", type: "number", default: "0.6", description: "聚光灯边缘的羽化程度 0–1，0 为硬边圆盘" },
  { name: "damping", type: "number", default: "0.45", description: "聚光灯跟随指针的迟滞时长（秒），越大越拖" },
  { name: "fadeOut", type: "number", default: "0.6", description: "指针离开后聚光灯熄灭的秒数（兼作 card 模式的过渡时长）" },
  { name: "grayscale", type: "number", default: "1", description: "静止照片的灰度 0–1" },
  { name: "dim", type: "number", default: "0.12", description: "静止照片的额外压暗 0–0.9" },
  { name: "glow", type: "number", default: "0.5", description: "聚光灯内强调色光晕的强度 0–1" },
  { name: "borderGlow", type: "number", default: "1", description: "聚光灯内强调色描边的强度 0–1" },
  { name: "reveal", type: '"spotlight" | "card"', default: '"spotlight"', description: "跟随指针的聚光显色，或退化为逐卡悬停显色" },
  { name: "aspectRatio", type: "string", default: '"3 / 2"', description: "照片区的 CSS aspect-ratio" },
  { name: "cardRadius", type: "number", default: "22", description: "卡片圆角（px），照片区用半径减 8" },
  { name: "showInfo", type: "boolean", default: "true", description: "照片下方的标题/副标题栏" },
  { name: "frame", type: "boolean", default: "false", description: "网格外的毛玻璃面板" },
  { name: "theme", type: '"dark" | "light"', default: '"dark"', description: "外框、卡片与文字的明暗主题" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
];

export default {
  id: "chroma-grid",
  name: "聚光显色卡片网格",
  href: "chroma-grid.html",
  title: "聚光显色卡片网格",
  description:
    "一排灰度照片卡组成的自适应网格：一束聚光灯跟着指针在网格上移动，半径内照片恢复彩色、底部升起强调色光晕、卡片描边同步发亮，边缘经 smootherstep 曲线羽化衰减；每张卡相对根部的偏移量被实时测量写进 CSS 变量，一层共享遮罩就能点亮任意位置的卡；纯 CSS mask 实现无 canvas，另有逐卡悬停显色的 card 模式、明暗两主题与毛玻璃外框，帧循环稳定后自睡。",
  tags: ["React", "CSS", "网格"],

  cardDescription: "聚光灯扫过灰度照片墙，扫到哪儿哪儿恢复彩色。",

  demoHint: "在网格上随意划动看显色跟随与边缘羽化；切 card 模式对比逐卡悬停显色；把灰度拉到 0 看全彩底态。",

  api: API,
};
