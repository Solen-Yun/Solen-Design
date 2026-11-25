/* Component metadata only — the live demo and gallery preview live in
   fuzzy-text-demo.jsx, the framework source texts and the prompt in
   fuzzy-text-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with fuzzy-text-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "children", type: "ReactNode", default: "—", description: "要渲染的文字；子节点会拼成一个字符串" },
  { name: "fontSize", type: "number | string", default: '"clamp(2rem, 8vw, 8rem)"', description: "字号，数字按 px，字符串按 CSS font-size" },
  { name: "fontWeight", type: "number | string", default: "900", description: "字重" },
  { name: "fontFamily", type: "string", default: '"inherit"', description: "字体；inherit 跟随页面字体" },
  { name: "color", type: "string", default: '"currentColor"', description: "文字颜色；currentColor/inherit/空值实时跟随外部 CSS 颜色" },
  { name: "enableHover", type: "boolean", default: "true", description: "悬停字形时把抖动提到 hoverIntensity" },
  { name: "baseIntensity", type: "number", default: "0.18", description: "静止时的抖动强度 0–1" },
  { name: "hoverIntensity", type: "number", default: "0.5", description: "悬停时（或 trigger 为 always 时常驻）的抖动强度" },
  { name: "fuzzRange", type: "number", default: "30", description: "满强度时切片最大位移（px）" },
  { name: "fps", type: "number", default: "60", description: "抖动循环的帧率上限" },
  { name: "direction", type: '"horizontal" | "vertical" | "both"', default: '"horizontal"', description: "切片抖动的轴向" },
  { name: "transitionDuration", type: "number", default: "0", description: "抖动强度在静止与悬停之间过渡的秒数；0 表示立即切换" },
  { name: "clickEffect", type: "boolean", default: "false", description: "点击时抖动冲到满格 150ms（trigger 非 click 时生效）" },
  { name: "glitchMode", type: "boolean", default: "false", description: "按定时节奏把抖动脉冲到满格" },
  { name: "glitchInterval", type: "number", default: "2000", description: "两次故障脉冲的间隔（ms）" },
  { name: "glitchDuration", type: "number", default: "200", description: "每次故障脉冲的时长（ms）" },
  { name: "gradient", type: "string[] | null", default: "null", description: "两个及以上颜色，文字从左到右渐变填充" },
  { name: "letterSpacing", type: "number", default: "0", description: "字距（px）" },
  { name: "sliceSize", type: "number", default: "1", description: "抖动切片的厚度（px）" },
  { name: "trigger", type: '"hover" | "click" | "always"', default: '"hover"', description: "抖动加强的触发方式：悬停字形 / 点击冲击波 / 常驻" },
  { name: "intro", type: "boolean", default: "false", description: "挂载时从剧烈模糊收缩成清晰文字" },
  { name: "introDuration", type: "number", default: "1400", description: "入场收缩时长（ms）" },
  { name: "colorSplit", type: "number", default: "0", description: "RGB 通道色散强度；0 为关闭" },
  { name: "className", type: "string", default: '""', description: "画布附加类名" },
];

export default {
  id: "fuzzy-text",
  name: "毛刺震动文字",
  href: "fuzzy-text.html",
  title: "毛刺震动文字",
  description:
    "毛刺震动文字：文字栅格化到画布上，按行或列切成细条逐帧错位抖动，静止时轻微震颤、悬停时加剧，点击触发一次撕裂冲击波，还能按节奏脉冲故障、把 RGB 三个通道散开重影；填充色实时跟随外部 CSS 颜色，支持左到右渐变与字距，reduced-motion 下渲染成清晰的静态文字。",
  tags: ["React", "Canvas", "文字"],

  cardDescription: "文字切成细条逐帧错位，悬停加剧、点击撕裂。",

  demoHint: "把鼠标挪到字上再点一下看冲击波；打开通道色散和故障脉冲更炸。",

  api: API,
};
