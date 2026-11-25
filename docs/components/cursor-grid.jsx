/* Component metadata only — the live demo and gallery preview live in
   cursor-grid-demo.jsx, the framework source texts and the prompt in
   cursor-grid-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with cursor-grid-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "cellSize", type: "number", default: "60", description: "网格间距（px），下限 8" },
  { name: "color", type: "string", default: "—", description: "点亮单元格的颜色（hex）；缺省用模式的墨色" },
  { name: "gridColor", type: "string", default: "—", description: "网格线的颜色（hex）；缺省用模式的墨色" },
  { name: "radius", type: "number", default: "140", description: "悬停点亮半径（px），下限 1" },
  { name: "falloff", type: '"linear" | "smooth" | "sharp"', default: '"smooth"', description: "亮度向半径边缘的衰减曲线" },
  { name: "highlight", type: '"area" | "cell"', default: '"area"', description: "点亮光标周围的区域还是只点所在格" },
  { name: "holdTime", type: "number", default: "400", description: "点亮后保持的毫秒数" },
  { name: "fadeDuration", type: "number", default: "800", description: "淡出的毫秒数，下限 16" },
  { name: "lineWidth", type: "number", default: "1", description: "网格与点亮线宽（px），下限 0.25" },
  { name: "maxOpacity", type: "number", default: "1", description: "点亮线条/边框的不透明度 0–1" },
  { name: "fillOpacity", type: "number", default: "0.06", description: "点亮单元格填充的不透明度 0–1" },
  { name: "gridOpacity", type: "number", default: "0.08", description: "静置网格的不透明度 0–1" },
  { name: "gridStyle", type: '"lines" | "dashed" | "dots" | "crosses"', default: '"lines"', description: "静置网格的样式" },
  { name: "cellRadius", type: "number", default: "0", description: "点亮圆角瓦片的半径（px）；大于 0 切到瓦片模式" },
  { name: "cellGap", type: "number", default: "0", description: "瓦片间的间隙（px）；大于 0 切到瓦片模式" },
  { name: "spotlight", type: "number", default: "0.6", description: "0–1，光标附近网格线的提亮强度" },
  { name: "clickPulse", type: "boolean", default: "true", description: "点击发出扫过单元格的扩散光波" },
  { name: "pulseSpeed", type: "number", default: "600", description: "光波扩散速度（px/s），下限 1" },
  { name: "ambient", type: "number", default: "0", description: "0–1，每秒随机闪烁的单元格比例" },
  { name: "edgeFade", type: "number", default: "0.2", description: "0–0.5，四边淡出的比例" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时从中心向外扩张的揭示动画" },
  { name: "lightMode", type: "boolean", default: "false", description: "浅色背景用的深墨色（#18181b）" },
  { name: "dpr", type: "number", default: "—", description: "覆盖设备像素比，上限 2" },
  { name: "children", type: "ReactNode", default: "—", description: "叠在网格之上的内容" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
];

export default {
  id: "cursor-grid",
  name: "光标点亮网格",
  href: "cursor-grid.html",
  title: "光标点亮网格",
  description:
    "WebGL2 绘制的背景网格：光标扫过时单元格按衰减曲线点亮、保持后淡出，四种静置样式（实线、虚线、圆点、十字）可选，圆角加间隙切到瓦片模式；光标附近网格线被聚光提亮，点击发出扩散光波扫过全场，可加环境闪烁、四边渐隐与中心向外的开场揭示；内容通过 children 叠在网格上，帧循环稳定后自睡。",
  tags: ["React", "WebGL", "GLSL", "背景"],

  cardDescription: "光标扫过哪里，哪里的格子就亮起来再缓缓熄灭。",

  demoHint: "移动光标点亮格子并点击发波；调圆角间隙切瓦片模式，开环境闪烁看随机星光。",

  api: API,
};
