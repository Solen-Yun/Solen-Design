/* Component metadata only — the live demo and gallery preview live in
   counter-demo.jsx, the framework source texts and the prompt in
   counter-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with counter-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "value", type: "number", default: "0", description: "要显示的数字，每次变化数字滚向新值" },
  { name: "locale", type: "string", default: '"en-US"', description: "数字格式化的 locale，非法值回退 en-US" },
  { name: "format", type: "Intl.NumberFormatOptions", default: "—", description: "Intl 格式选项，如货币、百分比、单位或紧凑记法" },
  { name: "decimals", type: "number", default: "—", description: "固定小数位数（clamp 0–20），省略时用 format 默认" },
  { name: "minDigits", type: "number", default: "1", description: "整数部分前导零位数（clamp 1–21，大于 1 才生效）" },
  { name: "prefix", type: "ReactNode", default: "—", description: "数字前缀内容" },
  { name: "suffix", type: "ReactNode", default: "—", description: "数字后缀内容" },
  { name: "direction", type: '"auto" | "up" | "down" | "shortest"', default: '"auto"', description: "滚动方向；auto 随数值增减自动选，shortest 走最短路径" },
  { name: "duration", type: "number", default: "0.7", description: "单次滚动时长（秒），下限 0.05" },
  { name: "bounce", type: "number", default: "0.2", description: "落位前的过冲幅度，0–0.9" },
  { name: "stagger", type: "number", default: "0.04", description: "相邻数字的滚动间隔（秒），变化从最右位向左荡开" },
  { name: "motionBlur", type: "boolean", default: "true", description: "快速滚动时沿运动方向模糊，每档数字一个独立 feGaussianBlur" },
  { name: "intro", type: "boolean", default: "true", description: "首次滚到可视一半时整圈旋入，只触发一次" },
  { name: "fade", type: "number", default: "0.3", description: "数字滚出文本区后渐隐的距离（em），0 为硬裁切" },
  { name: "fontSize", type: "number | string", default: "100", description: "字号，数字按 px，或任意 CSS 尺寸如 inherit" },
  { name: "fontWeight", type: "number | string", default: '"inherit"', description: "数字字重" },
  { name: "textColor", type: "string", default: '"inherit"', description: "数字颜色" },
  { name: "gap", type: "number", default: "0", description: "数字与符号的间距（px）" },
  { name: "padding", type: "number", default: "0", description: "每位数字的额外高度（px），也拉开滚动中的数字" },
  { name: "tabular", type: "boolean", default: "true", description: "所有数字等宽；关闭时宽度随滚动渐变" },
  { name: "digitStyle", type: "CSSProperties", default: "—", description: "每位数字盒的样式，例如瓷砖底、内边距与圆角" },
  { name: "className", type: "string", default: '""', description: "根节点附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根节点内联样式" },
];

export default {
  id: "counter",
  name: "里程表数字",
  href: "counter.html",
  title: "里程表数字",
  description:
    "里程表数字：每位在 0–9 滚轮上滚向新值，弹簧过冲、从右往左依次荡开，分隔符与前后缀原地淡入淡出，快转带运动模糊；Intl.NumberFormat 的千分位、货币与本地数字系统都按槽位滚动。",
  tags: ["React", "CSS", "数字"],

  cardDescription: "里程表数字滚向新值，从右往左荡开。",

  demoHint: "倒计时每秒滴答，秒位瓷砖持续滚动；颜色、时长、过冲与错峰可调。",

  api: API,
};
