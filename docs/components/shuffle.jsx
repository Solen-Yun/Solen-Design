/* Component metadata only — the live demo and gallery preview live in
   shuffle-demo.jsx, the framework source texts and the prompt in
   shuffle-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with shuffle-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "text", type: "string", default: "—（必填）", description: "要拆分洗牌的文字" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "object", default: "{}", description: "根元素内联样式" },
  { name: "shuffleDirection", type: '"right" | "left" | "up" | "down"', default: '"right"', description: "字符滚出的方向" },
  { name: "duration", type: "number", default: "0.35", description: "每个字符单次滚动的时长（秒）" },
  { name: "maxDelay", type: "number", default: "0", description: "random 模式起始时间的随机幅度（秒）" },
  { name: "ease", type: "string", default: '"power3.out"', description: "滚动的缓动函数名" },
  { name: "threshold", type: "number", default: "0.1", description: "0–1；触发线在视口底部的位置（top (1−threshold)×100%）" },
  { name: "rootMargin", type: "string", default: '"-100px"', description: "追加到触发线上的偏移，如 -100px、10%" },
  { name: "tag", type: "string", default: '"p"', description: "渲染的元素标签" },
  { name: "textAlign", type: "string", default: '"center"', description: "文字块对齐方式" },
  { name: "onShuffleComplete", type: "() => void", default: "—", description: "洗牌完成（以及每次循环重复）时的回调" },
  { name: "shuffleTimes", type: "number", default: "1", description: "每个字符滚过的乱码位数（至少 1）" },
  { name: "animationMode", type: '"evenodd" | "center" | "sequence" | "random"', default: '"evenodd"', description: "起始时间分布：奇偶交替、从中心、顺序、随机" },
  { name: "loop", type: "boolean", default: "false", description: "无限循环洗牌，每轮重新掷乱码" },
  { name: "loopDelay", type: "number", default: "0", description: "循环两轮之间的间隔（秒）" },
  { name: "stagger", type: "number", default: "0.03", description: "相邻字符之间的错峰（秒）" },
  { name: "scrambleCharset", type: "string", default: '""', description: "滚动途中乱码字符集；留空则重复原字符（老虎机式）" },
  { name: "colorFrom", type: "string", default: "—", description: "滚动起始颜色，随滚动过渡" },
  { name: "colorTo", type: "string", default: "—", description: "落定后的颜色" },
  { name: "triggerOnce", type: "boolean", default: "true", description: "滚动触发只发生一次；false 则每次进入都重放" },
  { name: "respectReducedMotion", type: "boolean", default: "true", description: "弱动效偏好下直接显示文字不播放" },
  { name: "triggerOnHover", type: "boolean", default: "true", description: "悬停重放：整块重放，或配合 hoverRadius 逐字感应" },
  { name: "effect", type: '"slide" | "flip" | "blur"', default: '"slide"', description: "洗牌方式：滑带滚动、翻转轮换、模糊轮换" },
  { name: "hoverRadius", type: "number", default: "0", description: "指针周围逐字感应洗牌的半径（px）" },
  { name: "motionBlur", type: "boolean", default: "false", description: "滑带滚动时按速度叠加方向模糊" },
  { name: "color", type: "string", default: "—", description: "文字块颜色" },
  { name: "accentColor", type: "string", default: "—", description: "滚动途中乱码字符的颜色" },
];

export default {
  id: "shuffle",
  name: "字符洗牌入场",
  href: "shuffle.html",
  title: "字符洗牌入场",
  description:
    "滚动进入视口时文字逐字符老虎机式洗牌落定：滑带（裁切克隆条滚动）、翻转（±180° 逐位翻面带 z 抬升）与模糊（按滚速叠加方向模糊）三种效果，起始分布支持奇偶交替/中心扩散/顺序/随机，乱码可换字符集并单独着色。可无限循环重掷，悬停整块重放或按半径逐字感应洗牌，弱动效直接显示，卸载完整还原 DOM。",
  tags: ["React", "CSS", "GSAP", "文字"],

  cardDescription: "字符像老虎机一样滚乱码后落定成文字。",

  demoHint: "换效果与方向、调乱码位数与字符集；开启悬停半径后用指针扫过字符。",

  api: API,
};
