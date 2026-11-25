/* Component metadata only — the live demo and gallery preview live in
   galaxy-demo.jsx, the framework source texts and the prompt in
   galaxy-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with galaxy-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "focal", type: "[number, number]", default: "[0.5, 0.5]", description: "消失点（归一化坐标）" },
  { name: "rotation", type: "[number, number]", default: "[1.0, 0.0]", description: "施加到场上的静态 2×2 旋转" },
  { name: "starSpeed", type: "number", default: "0.5", description: "穿越星场的基础飞行速度" },
  { name: "density", type: "number", default: "1", description: "星点密度倍率，下限 0.01" },
  { name: "hueShift", type: "number", default: "140", description: "程序化星色的色相旋转（度）" },
  { name: "disableAnimation", type: "boolean", default: "false", description: "冻结全部运动" },
  { name: "speed", type: "number", default: "1.0", description: "深度滚动的倍率" },
  { name: "mouseInteraction", type: "boolean", default: "true", description: "启用光标缓动与排斥" },
  { name: "glowIntensity", type: "number", default: "0.3", description: "核心辉光与闪辉强度，下限 0" },
  { name: "saturation", type: "number", default: "0", description: "程序化星色的额外饱和度，下限 0" },
  { name: "mouseRepulsion", type: "boolean", default: "true", description: "星点被光标推开" },
  { name: "repulsionStrength", type: "number", default: "2", description: "推斥强度，下限 0" },
  { name: "twinkleIntensity", type: "number", default: "0.3", description: "闪烁混合度，clamp 0–1" },
  { name: "rotationSpeed", type: "number", default: "0.1", description: "场旋转速度（弧度/秒）" },
  { name: "autoCenterRepulsion", type: "number", default: "0", description: "消失点处的恒定推斥；大于 0 时取代光标推斥" },
  { name: "transparent", type: "boolean", default: "true", description: "透明画布；false 时叠在 backgroundColor 上" },
  { name: "lightMode", type: "boolean", default: "false", description: "浅色模式：印成墨点，适合浅色页面" },
  { name: "starColors", type: "string[]", default: "—", description: "最多 4 个显式星色；不传则程序化配色" },
  { name: "starSize", type: "number", default: "1", description: "星点核心大小倍率，下限 0" },
  { name: "flareIntensity", type: "number", default: "1", description: "镜头闪辉强度，下限 0" },
  { name: "layers", type: "number", default: "4", description: "星层数，clamp 2–8" },
  { name: "direction", type: '"forward" | "backward"', default: '"forward"', description: "穿越深度滚动的方向" },
  { name: "clickWarp", type: "boolean", default: "true", description: "点击打出衰减的跃迁冲刺" },
  { name: "intro", type: "boolean", default: "true", description: "入场时从跃迁冲刺中降落（2.2s）" },
  { name: "backgroundColor", type: "string", default: "—", description: "不透明底色，任意 CSS 颜色字符串" },
  { name: "opacity", type: "number", default: "1", description: "输出不透明度，clamp 0–1" },
  { name: "dpr", type: "number", default: "devicePixelRatio", description: "画布像素比覆盖，clamp 至 2" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "galaxy",
  name: "星场跃迁",
  href: "galaxy.html",
  title: "星场跃迁",
  description:
    "无尽星空穿越：多层星片带深度地扑面而来，逐星闪烁、大星带四芒镜头闪辉，光标推开星点（或消失点恒定推斥），点击把整片场压扁成超时空光轨并衰减复原，入场自带一次跃迁冲刺。星色可程序化调相/饱和，也可显式给最多 4 色；8 个着色器变体并行编译按需切换，暗底加法发光、浅色页可印成墨点；帧循环空闲自睡。",
  tags: ["React", "WebGL", "CSS", "背景"],

  cardDescription: "层叠星场扑面而来，光标推开星点，点击冲进跃迁光轨。",

  demoHint: "移动光标推开星点，点击打一记跃迁冲刺；层数、密度与推斥强度可调。",

  api: API,
};
