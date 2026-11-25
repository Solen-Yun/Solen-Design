/* Component metadata only — the live demo and gallery preview live in
   gradient-ascii-demo.jsx, the framework source texts and the prompt in
   gradient-ascii-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with gradient-ascii-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "colors", type: "string[]", default: '["#1e3fd8", "#f6f8ff", "#a5d8ff", "#38bdf8"]', description: "渐变色标（任意 CSS 颜色），在 Lab 空间插值；最多 8 个" },
  { name: "shape", type: '"horizon" | "pinch" | "rise" | "eclipse"', default: '"horizon"', description: "光雾构图：地平线拱顶 / 收束光带 / 升起的光晕 / 日环食" },
  { name: "characters", type: "string", default: '" =+xX0S8#@"', description: "字符集，按疏→密排序；去重后烘焙成字形图集" },
  { name: "cellSize", type: "number", default: "18", description: "字符格高（CSS px），6–64" },
  { name: "density", type: "number", default: "0.8", description: "0–1：有字符的格子比例" },
  { name: "glyphOpacity", type: "number", default: "0.85", description: "0–1：字符整体透明度" },
  { name: "glow", type: "number", default: "0.2", description: "0–2：字符背后模糊光晕的强度" },
  { name: "depthOfField", type: "number", default: "0", description: "0–1：失焦（模糊采样）格子的比例" },
  { name: "flicker", type: "number", default: "0.2", description: "0–1：格子明暗抖动，9Hz 重掷" },
  { name: "softness", type: "number", default: "0.5", description: "0–1：构图边缘的柔化程度" },
  { name: "scale", type: "number", default: "1", description: "渐变场缩放，0.4–2.5" },
  { name: "flow", type: "number", default: "0.5", description: "0–2：噪声流场对构图的扭曲强度" },
  { name: "speed", type: "number", default: "1", description: "动画时钟速度；0 冻结" },
  { name: "gradientOpacity", type: "number", default: "0.9", description: "0–1：字符背后底层渐变的可见度" },
  { name: "grain", type: "number", default: "0.08", description: "0–0.4：动态胶片颗粒" },
  { name: "variation", type: "number", default: "0", description: "≥ 0：种子偏移，多个实例互不相同" },
  { name: "mouseInteraction", type: "boolean", default: "true", description: "开启光标字符乱码拖尾" },
  { name: "scrambleRadius", type: "number", default: "0.1", description: "光标乱码场的半径（长宽比单位），0.02–0.4" },
  { name: "clickEffect", type: '"none" | "wave" | "burst"', default: '"wave"', description: "点击触发：无 / 扩散乱码圆环 / 膨胀圆盘" },
  { name: "intro", type: "boolean", default: "true", description: "播放 2.4 秒的向外显影入场" },
  { name: "lightMode", type: "boolean", default: "false", description: "白纸墨字：字符以深色印在浅色底上" },
  { name: "fontFamily", type: "string", default: '等宽字体栈', description: "烘焙字形图集使用的字体" },
  { name: "dpr", type: "number", default: "—", description: "覆盖设备像素比（上限 2）" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "gradient-ascii",
  name: "渐变字符雾",
  href: "gradient-ascii.html",
  title: "渐变字符雾",
  description:
    "把柔和的渐变光雾（地平线拱顶、收束光带、升起光晕、日环食四种构图）整个用等宽字符画出来：颜色在 Lab 空间插值保证过渡顺滑，字符格按亮度取字、9Hz 闪烁、光标划过时乱码翻滚，点击激起扩散波或膨胀爆点；字符图集运行时按字体烘焙，另有四分之一分辨率的模糊光晕与 24fps 胶片颗粒，支持白纸墨字主题。",
  tags: ["React", "CSS", "WebGL"],

  cardDescription: "渐变光雾全部由闪烁的等宽字符拼成，光标划过即乱码翻滚。",

  demoHint: "在画布上移动鼠标看字符沿轨迹乱码；点击放一圈扩散波；切换四种构图与白纸墨字。",

  api: API,
};
