/* Component metadata only — the live demo and gallery preview live in
   glitch-text-demo.jsx, the framework source texts and the prompt in
   glitch-text-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with glitch-text-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "children", type: "ReactNode", default: "—", description: "要故障处理的文字；noise 模式需要纯字符串" },
  { name: "speed", type: "number", default: "0.5", description: "效果步进与循环的节奏 0.05–1+" },
  { name: "enableShadows", type: "boolean", default: "true", description: "撕裂切片后面的彩色阴影（也是 RGB 幽灵的染色）" },
  { name: "enableOnHover", type: "boolean", default: "false", description: "便捷开关，等效 trigger 设为 hover" },
  { name: "offset", type: "number", default: "10", description: "满强度时切片位移（px）" },
  { name: "shadowColors", type: "[string, string]", default: '["#ff0000", "#00ffff"]', description: "阴影与 RGB 切片的两个幽灵色" },
  { name: "className", type: "string", default: '""', description: "根节点附加类名" },
  { name: "mode", type: '"slices" | "rgb" | "scan" | "noise"', default: '"slices"', description: "故障图案：切片错位 / RGB 色偏 / 扫描线 / 字符乱码" },
  { name: "intensity", type: "number", default: "0.5", description: "基础事件频率与位移 0–1" },
  { name: "skew", type: "number", default: "0", description: "故障事件期间施加的水平倾斜（度）" },
  { name: "flicker", type: "boolean", default: "false", description: "活动期间随机压暗透明度" },
  { name: "trigger", type: '"always" | "hover" | "click"', default: '"always"', description: "故障何时运行：常驻 / 悬停 / 点击爆发" },
  { name: "burstDuration", type: "number", default: "0.6", description: "每次点击爆发的时长（秒）" },
  { name: "color", type: "string", default: "—", description: "文字颜色" },
  { name: "fontSize", type: "number | string", default: "—", description: "字号，数字按 px" },
  { name: "fontWeight", type: "number | string", default: "—", description: "字重" },
];

export default {
  id: "glitch-text",
  name: "故障色偏文字",
  href: "glitch-text.html",
  title: "故障色偏文字",
  description:
    "故障色偏文字：一层基础文字加两层绝对定位切片副本，切片按扫描带错位、红青阴影拖色，四种图案——切片错位、全幅 RGB 色偏、扫描线掠过、逐字符乱码——由同一个时钟驱动，强度、速度、倾斜与闪烁可调；空闲时所有变量归零、文字干净利落，reduced-motion 下永远静态。",
  tags: ["React", "CSS", "文字"],

  cardDescription: "红青切片撕开文字，扫频、色偏、乱码轮着来。",

  demoHint: "四种图案各玩一下；trigger 换 hover 悬停才炸，换 click 每点一次爆一秒。",

  api: API,
};
