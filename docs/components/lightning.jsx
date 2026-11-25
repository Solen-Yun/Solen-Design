/* Component metadata only — the live demo and gallery preview live in
   lightning-demo.jsx, the framework source texts and the prompt in
   lightning-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with lightning-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "color", type: "string", default: '"#4d6bff"', description: "闪电颜色；3/6 位 hex，解析失败回退淡蓝" },
  { name: "bolts", type: "number", default: "1", description: "平行闪电道数，clamp 1–4" },
  { name: "spread", type: "number", default: "0.6", description: "闪电道之间的横向间距" },
  { name: "branches", type: "number", default: "0.5", description: "分叉密度 0–1，每道最多 6 条" },
  { name: "xOffset", type: "number", default: "0", description: "整组闪电的横向偏移（uv 单位）" },
  { name: "angle", type: "number", default: "0", description: "整体旋转角（度）" },
  { name: "size", type: "number", default: "1", description: "游走噪声尺度，下限 0.05" },
  { name: "thickness", type: "number", default: "1", description: "白热内芯宽度倍率，下限 0" },
  { name: "glow", type: "number", default: "1", description: "光晕宽度倍率，下限 0.01" },
  { name: "intensity", type: "number", default: "1", description: "整体亮度，下限 0" },
  { name: "speed", type: "number", default: "1", description: "放电纹样向上流动的速度，0 冻结" },
  { name: "flicker", type: "number", default: "0.6", description: "频闪强度，clamp 0–1" },
  { name: "mouseInteraction", type: "boolean", default: "true", description: "闪电带惯性倾向光标并附着热度" },
  { name: "mouseStrength", type: "number", default: "1", description: "倾向与热度强度，下限 0" },
  { name: "clickStrike", type: "boolean", default: "true", description: "点击呼唤一道落向该点的闪电，最多同时 4 道" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时 420ms 自下而上显影" },
  { name: "fade", type: "number", default: "0", description: "四边渐隐比例，clamp 0–1" },
  { name: "opacity", type: "number", default: "1", description: "整体不透明度，clamp 0–1" },
  { name: "lightMode", type: "boolean", default: "false", description: "浅色页面墨彩输出" },
  { name: "paused", type: "boolean", default: "false", description: "冻结流动；落雷仍渲染" },
  { name: "dpr", type: "number", default: "devicePixelRatio", description: "渲染像素比，上限 2" },
  { name: "className", type: "string", default: '""', description: "画布附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "画布内联样式" },
];

export default {
  id: "lightning",
  name: "追光闪电",
  href: "lightning.html",
  title: "追光闪电",
  description:
    "一至四道竖立的闪电在画面里噼啪作响：电离通道用域扭曲噪声游走，分叉随频闪窗口明灭，整条放电像频闪灯一样抖动；闪电带惯性倾向光标、热度噪声贴着指针噼啪作响，点击任意处唤下一道落雷——先长出下行先导，接触后回击、复击并照亮整屏，再缓缓熄灭。全部在单张全屏着色器里程序化生成，无贴图无粒子；弹簧物理让倾斜有肉眼可见的动量，空闲后帧循环自睡，减动效下化作安静的一帧。",
  tags: ["React", "CSS", "WebGL", "背景"],

  cardDescription: "闪电倾向光标噼啪作响，点击唤下落雷与全屏闪光。",

  demoHint: "移动鼠标看闪电倾斜与热度，点击任意处唤雷；道数、分叉、频闪与粗细可调。",

  api: API,
};
