/* Component metadata only — the live demo and gallery preview live in
   count-up-demo.jsx, the framework source texts and the prompt in
   count-up-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with count-up-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "to", type: "number", default: "—", description: "目标数值" },
  { name: "from", type: "number", default: "0", description: "起始数值" },
  { name: "direction", type: '"up" | "down"', default: '"up"', description: "down 把起止对调，数字向下计数" },
  { name: "delay", type: "number", default: "0", description: "开跑前的延迟（秒），只作用于触发的那一次" },
  { name: "duration", type: "number", default: "2", description: "单次动画时长（秒）" },
  { name: "className", type: "string", default: '""', description: "根节点附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根节点内联样式" },
  { name: "startWhen", type: "boolean", default: "true", description: "起跑开关；false 时停在起始值" },
  { name: "separator", type: "string", default: '""', description: "千分位分隔符；留空不分组" },
  { name: "prefix", type: "string", default: '""', description: "数字前缀；随动画淡入淡出" },
  { name: "suffix", type: "string", default: '""', description: "数字后缀（排在缩写单位之后）；随动画淡入淡出" },
  { name: "mode", type: '"count" | "roll"', default: '"count"', description: "roll 模式逐位滚轮，像老虎机一样换数" },
  { name: "easing", type: '"linear" | "easeOut" | "expo" | "spring"', default: '"easeOut"', description: "进度曲线；spring 带轻微过冲回弹" },
  { name: "decimals", type: "number", default: "—", description: "小数位数；缺省取 from/to 里最多的小数位" },
  { name: "format", type: '"standard" | "compact"', default: '"standard"', description: "compact 用 K / M / B / T 缩写" },
  { name: "trigger", type: '"view" | "load"', default: '"view"', description: "view 等元素滚入视口才开跑，load 立即开跑" },
  { name: "replayOnHover", type: "boolean", default: "false", description: "悬停时重播；空闲状态才生效" },
  { name: "onStart", type: "() => void", default: "—", description: "动画开始时回调" },
  { name: "onEnd", type: "() => void", default: "—", description: "动画落定到终值时回调" },
];

export default {
  id: "count-up",
  name: "数字递增",
  href: "count-up.html",
  title: "数字递增",
  description:
    "滚入视口即从起始值跑到目标值的数字计数器：count 模式整段文本走缓动曲线，roll 模式把每一位数字做成竖向滚轮，逐位错峰起跑、速度越快运动模糊越强、位数增减时宽度淡入淡出；支持千分位、小数位、K/M/B/T 缩写、前后缀、spring 过冲与悬停重播，读屏拿到的始终是终值。",
  tags: ["React", "motion", "文字"],

  cardDescription: "数字逐位滚轮递增，快速转动带运动模糊，位数增减平滑伸缩。",

  demoHint: "拖动目标值看数字从当前值续跑；切 roll 模式看逐位错峰与运动模糊，悬停可重播。",

  api: API,
};
