/* Component metadata only — the live demo and gallery preview live in
   faulty-terminal-demo.jsx, the framework source texts and the prompt in
   faulty-terminal-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with faulty-terminal-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "scale", type: "number", default: "1", description: "等离子/空间缩放，下限 0.05" },
  { name: "gridMul", type: "[number, number]", default: "[2, 1]", description: "每轴的单元格密度倍率（×15 格）" },
  { name: "digitSize", type: "number", default: "1.5", description: "字形在格内的缩放" },
  { name: "timeScale", type: "number", default: "0.3", description: "等离子演化速度" },
  { name: "pause", type: "boolean", default: "false", description: "冻结等离子时间但保留渲染" },
  { name: "scanlineIntensity", type: "number", default: "0.3", description: "滚动扫描线带强度" },
  { name: "glitchAmount", type: "number", default: "1", description: "横向故障位移倍率" },
  { name: "flickerAmount", type: "number", default: "1", description: "闪烁开关强度" },
  { name: "noiseAmp", type: "number", default: "1", description: "等离子 fbm 幅度" },
  { name: "chromaticAberration", type: "number", default: "0", description: "静态 RGB 分离（UV 单位）" },
  { name: "dither", type: "number | boolean", default: "0", description: "有序颗粒抖动（布尔映射 0/1）" },
  { name: "curvature", type: "number", default: "0.2", description: "桶形扭曲；0 为平面" },
  { name: "tint", type: "string", default: '"#ffffff"', description: "荧光色（hex）" },
  { name: "mouseReact", type: "boolean", default: "true", description: "光标顶出发光斑并带涟漪" },
  { name: "mouseStrength", type: "number", default: "0.2", description: "光标影响强度" },
  { name: "pageLoadAnimation", type: "boolean", default: "true", description: "挂载时逐格点亮 2 秒" },
  { name: "brightness", type: "number", default: "1", description: "输出增益" },
  { name: "glyphs", type: '"blocks" | "dots" | "characters"', default: '"blocks"', description: "单元格字形样式" },
  { name: "glow", type: "number", default: "0.5", description: "亮格辉光，clamp 0–3" },
  { name: "persistence", type: "number", default: "0.5", description: "磷光余辉持久度，clamp 0–1" },
  { name: "scramble", type: "number", default: "0.5", description: "字符样式的重掷速度，clamp 0–1" },
  { name: "mouseGlow", type: "number", default: "0.6", description: "光标附近的热亮增强，clamp 0–1" },
  { name: "vignette", type: "number", default: "0.25", description: "边缘衰减，clamp 0–1" },
  { name: "clickEffect", type: '"none" | "glitch" | "degauss"', default: '"glitch"', description: "点击效果：撕行或扩散消磁波" },
  { name: "variation", type: "number", default: "随机", description: "等离子种子，确定性偏移场" },
  { name: "lightMode", type: "boolean", default: "false", description: "浅色模式：印成墨字，适合浅色页面" },
  { name: "dpr", type: "number", default: "devicePixelRatio", description: "画布像素比覆盖，clamp 至 2" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "faulty-terminal",
  name: "故障终端雨",
  href: "faulty-terminal.html",
  title: "故障终端雨",
  description:
    "闪烁的 CRT 终端字符雨：底层等离子场量化成六级亮度环点亮块状字符，磷光余辉逐格衰减，光标顶出带涟漪的白热光斑，点击撕行或炸开消磁冲击波。三种字形（色块/圆点/5×5 位图字符集带乱码重掷）、桶形弯曲、光束形扫描线、色散、闪烁带、颗粒与暗角一次收尾；双缓冲 MRT 帧缓冲跑余辉模拟，帧循环空闲自睡，浅色页可印成墨字。",
  tags: ["React", "WebGL", "CSS", "背景"],

  cardDescription: "等离子点亮的故障终端字符雨，磷光拖尾，光标白热，点击撕屏。",

  demoHint: "移动光标顶出发光斑，点击撕行或换消磁波；字形样式与荧光色可切换。",

  api: API,
};
