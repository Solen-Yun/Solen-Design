/* Component metadata only — the live demo and gallery preview live in
   shape-grid-demo.jsx, the framework source texts and the prompt in
   shape-grid-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with shape-grid-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "shape", type: '"square" | "tile" | "hexagon" | "triangle" | "diamond" | "circle" | "cross" | "dot"', default: '"square"', description: "单元格形状八选一，未知值回退方格" },
  { name: "cellSize", type: "number", default: "40", description: "单元格边长（px），最小 8" },
  { name: "lineWidth", type: "number", default: "1", description: "描线宽度，最小 0.25" },
  { name: "direction", type: '"right" | "left" | "up" | "down" | "diagonal" | "none"', default: '"diagonal"', description: "墙面的漂移方向" },
  { name: "speed", type: "number", default: "0.5", description: "漂移速度倍率；0 驻停" },
  { name: "lineColor", type: "string", default: '"#2a2734"', description: "未点亮单元格的描线颜色" },
  { name: "hoverColor", type: "string", default: '"#ffffff"', description: "点亮单元格的描边颜色；rainbow 模式据此取明度" },
  { name: "hoverFillColor", type: "string", default: "取 hoverColor", description: "点亮单元格的填充颜色" },
  { name: "fillOpacity", type: "number", default: "0.15", description: "点亮单元格的填充不透明度 0–1" },
  { name: "rainbow", type: "boolean", default: "false", description: "点亮单元格按旋转色相着色而非 hoverColor" },
  { name: "tiltX", type: "number", default: "0", description: "绕 x 轴的 3D 倾角（度）±70" },
  { name: "tiltY", type: "number", default: "0", description: "绕 y 轴的 3D 倾角（度）±70" },
  { name: "radius", type: "number", default: "1.5", description: "光斑照亮的半径（格数），≥0" },
  { name: "trail", type: "number", default: "0.6", description: "光斑过后余辉的时间常数（s），≥0.05" },
  { name: "glow", type: "number", default: "0.35", description: "点亮单元格的投影模糊强度 0–1" },
  { name: "twinkle", type: "number", default: "0", description: "随机单元格闪烁强度 0–1" },
  { name: "fade", type: "number", default: "1", description: "墙面四边 CSS 渐隐遮罩 0–1（1 为不渐隐）" },
  { name: "clickCascade", type: "boolean", default: "true", description: "点击发出逐格外扩的光环波（最多 6 条）" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时墙面从中心向外绽放" },
  { name: "opacity", type: "number", default: "1", description: "整体不透明度 0–1" },
  { name: "backgroundColor", type: "string", default: '"transparent"', description: "画布后面的背景色" },
  { name: "paused", type: "boolean", default: "false", description: "冻结漂移、光斑与光环" },
  { name: "dpr", type: "number", default: "—", description: "覆盖画布渲染像素比；超大画布自动降采样" },
  { name: "className", type: "string", default: '""', description: "根节点附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根节点内联样式" },
];

export default {
  id: "shape-grid",
  name: "形块漂移墙",
  href: "shape-grid.html",
  title: "形块漂移墙",
  description:
    "Canvas 2D 画出的形状墙：方格 / 圆角砖 / 蜂窝 / 三角 / 菱形 / 圆 / 十字 / 圆点八种形态沿六个方向匀速漂移；一个带弹簧惯性的光斑追着鼠标走，照亮的格子沿余辉渐灭；点击炸出逐格外扩的光环波，rainbow 模式给每个亮格旋转色相；tiltX/tiltY 用 CSS matrix3d 把整面墙压进透视，远处格子淡入雾里。开场从中心绽放，帧循环安静后自睡。",
  tags: ["React", "Canvas", "CSS", "图形"],

  cardDescription: "漂移的形状墙被光斑点亮，点击炸出逐格外扩的光环波。",

  demoHint: "甩一下鼠标看光斑带惯性追过来；点击任意处看光环逐格扩散，开 rainbow 上色。",

  api: API,
};
