/* Component metadata only — the live demo and gallery preview live in
   crosshair-demo.jsx, the framework source texts and the prompt in
   crosshair-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with crosshair-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "color", type: "string", default: '"#ffffff"', description: "线、角框与坐标标签的墨色，任意 CSS 颜色" },
  { name: "containerRef", type: "React ref (HTMLElement | null)", default: "null", description: "限定准星范围的宿主元素 ref；null 时 fixed 覆盖整窗" },
  { name: "thickness", type: "number", default: "1", description: "线宽（px），0.5–8" },
  { name: "opacity", type: "number", default: "0.85", description: "整体透明度 0–1" },
  { name: "lineStyle", type: '"solid" | "dashed" | "dotted"', default: '"solid"', description: "十字线的虚线样式" },
  { name: "gap", type: "number", default: "0", description: "十字交点处的空心半径（px）" },
  { name: "fade", type: "number", default: "0", description: "0–1，线尾向边缘渐隐的程度" },
  { name: "smoothing", type: "number", default: "0.35", description: "0–1，准星跟随光标的滞后；0 直接贴合" },
  { name: "showCoordinates", type: "boolean", default: "true", description: "上、左边缘跟随光标的实时坐标标签" },
  { name: "targetEffect", type: '"lock" | "glitch" | "none"', default: '"lock"', description: "悬停链接与按钮的行为：锁定测量、撕裂故障或无" },
  { name: "targetSelector", type: "string", default: '"a, button, [data-crosshair-target]"', description: "可锁定目标的选择器" },
  { name: "clickPulse", type: "boolean", default: "true", description: "按下时扩散的圆环脉冲" },
  { name: "hideCursor", type: "boolean", default: "false", description: "隐藏原生光标并画一个墨点" },
  { name: "blendMode", type: "string", default: '"normal"', description: "画布的 mix-blend-mode" },
  { name: "className", type: "string", default: '""', description: "画布附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "画布内联样式" },
];

export default {
  id: "crosshair",
  name: "准星光标",
  href: "crosshair.html",
  title: "准星光标",
  description:
    "Canvas 画的全屏瞄准十字：两条发丝线穿过光标，上、左边缘实时挂出坐标标签，交点处留空心、线尾可渐隐、支持虚线点线；悬停链接与按钮时角框吸附目标并量出宽 × 高，故障模式让线在锁定瞬间撕裂重组，点击激起脉冲圆环，可隐藏原生光标。设备像素对齐，帧循环自睡，减少动态时全部贴合。",
  tags: ["React", "Canvas", "光标", "交互"],

  cardDescription: "瞄准十字跟随光标，悬停按钮即锁定量尺寸。",

  demoHint: "移动光标看坐标标签，悬停按钮与链接看角框锁定和尺寸测量，点击激起脉冲。",

  api: API,
};
