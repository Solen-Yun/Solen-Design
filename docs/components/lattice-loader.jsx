/* Component metadata only — the live demo and gallery preview live in
   lattice-loader-demo.jsx, the framework source texts and the prompt in
   lattice-loader-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with lattice-loader-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "label", type: "string", default: '"Thinking"', description: "工作态的文字标签" },
  { name: "doneLabel", type: "string", default: '"Done in"', description: "完成态显示的标签文字" },
  { name: "errorLabel", type: "string", default: '"Failed after"', description: "失败态显示的标签文字" },
  { name: "status", type: '"working" | "done" | "error"', default: '"working"', description: "当前任务状态；驱动波纹、定格标记与标签切换" },
  { name: "pattern", type: 'string | { cells: (number | null)[]; loop?: number; scale?: number; lit?: number }', default: '"orbit"', description: '命名图案（"arrow" / "dots" / "ripple" / "spiral" / "orbit" / "snake" / "sweep" / "spin" / "rain" / "pulse"）或自定义 cells 数组' },
  { name: "grid", type: "3 | 4", default: "3", description: "格子边长；命名图案没有对应尺寸变体时按网格回退到默认图案" },
  { name: "shape", type: "string", default: '"round"', description: '"round" 渲染圆形格子，其余值渲染默认圆角方块' },
  { name: "color", type: "string", default: '"currentColor"', description: "波纹格子的颜色，默认继承文字色" },
  { name: "doneColor", type: "string", default: '"#22c55e"', description: "完成态标记的颜色" },
  { name: "errorColor", type: "string", default: '"#ef4444"', description: "失败态标记的颜色" },
  { name: "cellSize", type: "number", default: "6", description: "单个格子的边长（px）" },
  { name: "gap", type: "number", default: "2", description: "格子间距（px）" },
  { name: "fontSize", type: "number", default: "14", description: "标签字号，也是行间距的基础（px）" },
  { name: "step", type: "number", default: "90", description: "波纹步进的基准延迟（ms），乘以图案的 scale" },
  { name: "idleOpacity", type: "number", default: "0.15", description: "波纹格子的静默透明度" },
  { name: "glow", type: "boolean", default: "false", description: "给点亮的格子加柔光" },
  { name: "glowColor", type: "string", default: '""', description: "柔光颜色；留空时波纹用格子色、标记用标记色" },
  { name: "showTimer", type: "boolean", default: "true", description: "标签右侧的实时秒表" },
  { name: "elapsed", type: "number", default: "—", description: "固定显示的耗时（秒），传入后秒表停在该值" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
];

export default {
  id: "lattice-loader",
  name: "格波加载行",
  href: "lattice-loader.html",
  title: "格波加载行",
  description:
    "一行式任务状态条：n×n 的格子阵列按图案依次点亮成波浪（orbit / snake / sweep / rain 等十种内置序列，也接受自定义 cells 数组），旁边是任务标签和逐百毫秒走字的秒表；状态落到 done / error 时波浪定格、勾形或叉形标记淡入、标签经模糊交叉切换成「Done in / Failed after」并读出耗时。纯 CSS 动画循环在空闲时由动画自身驱动，颜色默认继承 currentColor。",
  tags: ["React", "CSS", "状态"],

  cardDescription: "格点波浪转圈加载，收尾定格成勾或叉并读秒。",

  demoHint: "切状态看波浪定格成勾/叉；换图案、调网格和步进节奏，开柔光更明显。",

  api: API,
};
