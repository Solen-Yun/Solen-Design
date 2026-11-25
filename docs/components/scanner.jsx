/* Component metadata only — the live demo and gallery preview live in
   scanner-demo.jsx, the framework source texts and the prompt in
   scanner-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with scanner-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "color1", type: "string", default: '"#5227FF"', description: "基准线色（hex）" },
  { name: "color2", type: "string", default: '"#FF9FFC"', description: "被扫亮/透镜加热后的线色" },
  { name: "color3", type: "string", default: '"#FFFFFF"', description: "扫描带头部与声呐核心的白热色" },
  { name: "speed", type: "number", default: "0.5", description: "干涉场的流动速度；0 冻结" },
  { name: "sweepSpeed", type: "number", default: "0.25", description: "扫描束的行进速度；0 驻停" },
  { name: "sweepWidth", type: "number", default: "1.6", description: "扫描束沿轴向的长度，最小 0.05" },
  { name: "trail", type: "number", default: "0.5", description: "扫描束余辉长度 0–1" },
  { name: "reverse", type: "boolean", default: "false", description: "扫描反向" },
  { name: "scale", type: "number", default: "1.5", description: "干涉场的缩放，≥0.05" },
  { name: "frequency", type: "number", default: "2", description: "波场的空间频率" },
  { name: "ripple", type: "number", default: "0.22", description: "波场对直线的弯曲量，≥0" },
  { name: "bandDensity", type: "number", default: "11", description: "线密度，最小 0.5" },
  { name: "lineWidth", type: "number", default: "1.2", description: "线宽，最小 0.2" },
  { name: "glow", type: "number", default: "0.6", description: "亮线周围的光晕，≥0" },
  { name: "scanDirection", type: '"vertical" | "horizontal" | "diagonal"', default: '"vertical"', description: "扫描束的行进方向" },
  { name: "colorSpread", type: "number", default: "0.7", description: "三色分离（色差）程度 0–1" },
  { name: "brightness", type: "number", default: "1", description: "整体亮度倍率" },
  { name: "vignette", type: "number", default: "0.3", description: "四角暗角 0–1" },
  { name: "scanline", type: "boolean", default: "true", description: "CRT 扫描线纹理" },
  { name: "scanlineIntensity", type: "number", default: "0.5", description: "扫描线深浅 0–1" },
  { name: "grain", type: "boolean", default: "true", description: "胶片颗粒" },
  { name: "grainIntensity", type: "number", default: "0.04", description: "颗粒强度，≥0" },
  { name: "opacity", type: "number", default: "1", description: "整体不透明度 0–1" },
  { name: "mouseInteraction", type: "boolean", default: "true", description: "光标透镜弯曲干涉线" },
  { name: "mouseRadius", type: "number", default: "0.5", description: "透镜半径，最小 0.05" },
  { name: "mouseStrength", type: "number", default: "0.7", description: "透镜牵引强度，≥0" },
  { name: "mouseMode", type: '"repel" | "attract"', default: '"repel"', description: "透镜推开或吸拢周围的线" },
  { name: "clickEffect", type: "string", default: '"ping"', description: '"ping" 点击发出外扩声呐环；其他值关闭' },
  { name: "intro", type: "boolean", default: "true", description: "挂载时显影前锋 2s 内扫亮全场" },
  { name: "lightMode", type: "boolean", default: "false", description: "浅色模式：干涉线印成墨线，适合浅色页面" },
  { name: "dpr", type: "number", default: "—", description: "覆盖画布渲染像素比" },
  { name: "className", type: "string", default: '""', description: "根节点附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根节点内联样式" },
];

export default {
  id: "scanner",
  name: "扫描干涉线",
  href: "scanner.html",
  title: "扫描干涉线",
  description:
    "一片被扫描束横扫的发光干涉线场：四组正弦波叠加出有机摆动的线条，亮束带着指数余辉与白热头部沿垂直/水平/对角方向扫过，扫到之处线条发热变色；光标是一枚透镜把线推开或吸拢，点击落下外扩的声呐环；CRT 质感——扫描线纹理、暗角、颗粒、三色分离——一应俱全。显影前锋开场，帧循环安静后自睡。",
  tags: ["React", "CSS", "WebGL", "图形"],

  cardDescription: "扫描束横扫发光干涉线，光标透镜推挤线条，点击落下声呐环。",

  demoHint: "移动鼠标把线推开再切 attract 吸拢；在场上连点几下看声呐环扩散。",

  api: API,
};
