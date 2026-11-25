/* Component metadata only — the live demo and gallery preview live in
   crystalized-ball-demo.jsx, the framework source texts and the prompt in
   crystalized-ball-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with crystalized-ball-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "preset", type: "string", default: '"plasma"', description: "预设起点：plasma / aurora / nebula / ember / frost / solar / eclipse / abyss，为其余参数提供默认值" },
  { name: "color", type: "string", default: "预设色", description: "电弧与尘埃的主色；不设则取预设色（plasma 为 #F25BD0）" },
  { name: "theme", type: '"dark" | "light"', default: '"dark"', description: "深色输出发光体，浅色转成纸面墨水笔触并压暗光晕" },
  { name: "size", type: "number", default: "0.7", description: "球半径占短边一半的比例，范围 0.1–1.5" },
  { name: "strands", type: "number", default: "6（随预设）", description: "环绕球缘的放电波纹条数，1–8" },
  { name: "crackle", type: "number", default: "0.85（随预设）", description: "球缘粗糙度：位移幅度、抖动与火舌高度 0–1" },
  { name: "flares", type: "number", default: "0.65（随预设）", description: "每条波纹向外鼓出的火舌大小 0–1" },
  { name: "glow", type: "number", default: "0.9（随预设）", description: "球缘与光晕亮度 0–2，浅色主题下减半" },
  { name: "sparks", type: "number", default: "0.6（随预设）", description: "闪电弧的生成频率 0–1，0 为关闭" },
  { name: "particleCount", type: "number", default: "15000（随预设）", description: "尘埃粒子数，按百取整，上限 40000" },
  { name: "fill", type: "number", default: "0.5（随预设）", description: "球内下部雾团占据的高度 0–1" },
  { name: "motion", type: '"rise" | "fall" | "drift" | "orbit"', default: '"rise"（随预设）', description: "尘埃粒子的基础运动方式：上升 / 下落 / 漂移 / 环绕" },
  { name: "particleShape", type: '"square" | "round"', default: '"square"（随预设）', description: "尘埃粒子形状：方形 / 圆形" },
  { name: "depth", type: "number", default: "0.6（随预设）", description: "云团景深：远处粒子更小更暗 0–1" },
  { name: "sway", type: "number", default: "0.5（随预设）", description: "整团尘埃的缓慢翻滚幅度 0–1" },
  { name: "twinkle", type: "number", default: "0.5（随预设）", description: "粒子闪烁深度 0–1" },
  { name: "haze", type: "number", default: "0.7（随预设）", description: "球内雾团与边缘暗带强度 0–2" },
  { name: "speed", type: "number", default: "1", description: "球缘时间流速，悬停与点击涌动会再加速" },
  { name: "dustSpeed", type: "number", default: "1（随预设）", description: "尘埃时间流速，与球缘相互独立" },
  { name: "interactive", type: "boolean", default: "true", description: "开启悬停加热、视线偏转、尘埃搅动与点击冲击" },
  { name: "hoverStrength", type: "number", default: "0.7", description: "指针加热/搅动强度 0–1" },
  { name: "intro", type: "boolean", default: "true", description: "播放 2.2 秒开场：波纹展开、尘埃自下而上浮现" },
  { name: "paused", type: "boolean", default: "false", description: "冻结时间；尺寸变化与点击仍会触发渲染" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
];

export default {
  id: "crystalized-ball",
  name: "电弧水晶球",
  href: "crystalized-ball.html",
  title: "电弧水晶球",
  description:
    "一只通电的玻璃球：球缘是数条噪声波纹组成的放电带，随机闪过贝塞尔闪电弧，球体内悬浮的发光尘埃随四种运动方式漂移；指针靠近会加热球缘、偏转视线并搅动尘埃，点击施加冲击与双弧。Oklab 调色板随主色自动推导全套色阶，四趟 WebGL2 加法渲染，帧循环稳定后自睡，无 WebGL2 时静默留空。",
  tags: ["React", "WebGL", "图形"],

  cardDescription: "玻璃球缘电弧噼啪作响，球内尘埃随指针卷起旋涡。",

  demoHint: "在球上滑动指针看电弧聚向指针、尘埃被搅动；点按球体触发冲击，预设与粒子数可切换。",

  api: API,
};
