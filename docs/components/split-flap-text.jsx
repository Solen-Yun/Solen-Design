/* Component metadata only — the live demo and gallery preview live in
   split-flap-text-demo.jsx, the framework source texts and the prompt in
   split-flap-text-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with split-flap-text-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "words", type: "string[]", default: `["LAUNCH READY", "SYNC ONLINE", "SIGNAL LIVE"]`, description: "翻牌板循环的短语列表；空数组时回退到内置默认" },
  { name: "text", type: "string", default: "—", description: "短语的单字符串写法；传入时覆盖 words" },
  { name: "flipDuration", type: "number", default: "0.12", description: "单次翻牌时长（秒），下限 0.04" },
  { name: "stagger", type: "number", default: "0.06", description: "相邻牌的级联延迟（秒）" },
  { name: "cycleDelay", type: "number", default: "2400", description: "每条短语停留时间（ms），下限 400" },
  { name: "charset", type: '"alpha" | "alphanumeric" | "numeric" | string', default: '"alphanumeric"', description: "翻牌过程中扫过的字符池：预设名或自定义字符串" },
  { name: "flipsPerChar", type: "number", default: "8", description: "每张牌落定前的随机翻面次数" },
  { name: "tileColor", type: "string", default: '"#111827"', description: "牌身颜色" },
  { name: "textColor", type: "string", default: '"#f8fafc"', description: "字符颜色" },
  { name: "tileRadius", type: "number | string", default: "8", description: "牌的圆角（数字按 px）" },
  { name: "gap", type: "number | string", default: "6", description: "牌间距（数字按 px）" },
  { name: "fontSize", type: "number | string", default: "52", description: "字号（数字按 px），牌面随 em 缩放" },
  { name: "loop", type: "boolean", default: "true", description: "循环播放；false 播完最后一条即停" },
  { name: "padTo", type: "number", default: "12", description: "牌板最少张数" },
  { name: "align", type: '"left" | "right" | "center"', default: '"left"', description: "短语在定宽牌板里的对齐与补空格方式" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时先空白，再翻入第一条短语" },
  { name: "glare", type: "number", default: "0", description: "翻面时的镜面高光强度 0–1" },
  { name: "depth", type: "number", default: "0.5", description: "材质厚度 0–1：翻面明暗、铰链、投影" },
  { name: "order", type: '"left" | "right" | "center" | "random"', default: '"left"', description: "翻面级联扫过牌板的方向" },
  { name: "tileStyle", type: '"board" | "minimal"', default: '"board"', description: "board 实体机箱翻牌；minimal 扁平遮罩两半" },
  { name: "className", type: "string", default: '""', description: "根节点附加类名" },
  { name: "style", type: "CSSProperties", default: "{}", description: "根节点内联样式" },
];

export default {
  id: "split-flap-text",
  name: "翻牌航班板",
  href: "split-flap-text.html",
  title: "翻牌航班板",
  description:
    "一块机械翻牌航班板：每个字符是一张从水平铰链对折的牌，换句时只有变化的牌逐张翻面，正面翻落、背面立起，途中扫过随机字符再落定；级联方向、字符池、翻面次数、停留节奏可调，另有一套无 3D 的扁平 minimal 遮罩风格，材质厚度与镜面高光模拟真实机箱的明暗。",
  tags: ["React", "CSS", "文字"],

  cardDescription: "机场航班板翻牌换句：铰链翻面扫过随机字符再落定，级联方向可调。",

  demoHint: "切换级联方向与 minimal 风格对比观感；翻面次数调到 0 可以看直接落定。",

  api: API,
};
