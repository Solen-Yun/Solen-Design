/* Component metadata only — the live demo and gallery preview live in
   ripple-grid-demo.jsx, the framework source texts and the prompt in
   ripple-grid-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with ripple-grid-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "color", type: "string", default: '"#ffffff"', description: "网格颜色，任意 CSS 颜色值，解析失败回退白" },
  { name: "variant", type: '"lines" | "dots" | "cross"', default: '"lines"', description: "网格形态：直线 / 圆点 / 十字" },
  { name: "cellSize", type: "number", default: "48", description: "单元格边长（px），最小 8" },
  { name: "lineWidth", type: "number", default: "1", description: "线宽，最小 0.25；低于一像素时以减淡代替变细" },
  { name: "glow", type: "number", default: "0.6", description: "线条向外的光晕，≥0" },
  { name: "rippleStrength", type: "number", default: "1", description: "波对网格的弯曲力度，≥0" },
  { name: "rippleSpeed", type: "number", default: "1", description: "波扩散速度倍率 ≥0.05；同时缩放波的寿命" },
  { name: "rippleSize", type: "number", default: "1", description: "波包长度倍率，≥0.2" },
  { name: "autoRipple", type: '"center" | "random" | "none"', default: '"center"', description: "自动波纹的落点：中心 / 随机 / 关闭" },
  { name: "rippleInterval", type: "number", default: "2.6", description: "自动波纹的间隔秒数，最小 0.3" },
  { name: "tilt", type: "number", default: "0", description: "平面的透视俯角（度）0–80，远端压缩并淡向地平线" },
  { name: "rotation", type: "number", default: "0", description: "网格在平面内的旋转角（度）" },
  { name: "mouseInteraction", type: "boolean", default: "true", description: "鼠标移动沿途撒小波纹，附近格子提亮" },
  { name: "clickRipple", type: "boolean", default: "true", description: "点击在落点炸出强波纹" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时亮幕从中心向外显影（1.6s）" },
  { name: "fade", type: "number", default: "0.5", description: "容器四边柔化遮罩 0–1" },
  { name: "opacity", type: "number", default: "1", description: "整体不透明度 0–1" },
  { name: "lightMode", type: "boolean", default: "false", description: "浅色模式：网格印成墨线，适合浅色页面" },
  { name: "paused", type: "boolean", default: "false", description: "冻结运动但保留最后一帧画面" },
  { name: "dpr", type: "number", default: "—", description: "覆盖画布渲染像素比" },
  { name: "className", type: "string", default: '""', description: "根节点附加类名" },
];

export default {
  id: "ripple-grid",
  name: "涟漪网格",
  href: "ripple-grid.html",
  title: "涟漪网格",
  description:
    "单 pass 片元着色器画出的锐利网格（线/点/十字三种形态，fwidth 抗锯齿），最多 12 个环形波包穿过网格：采样位置被径向推开、波峰处提亮，像水面一样起伏；自动波纹定时从中心或随机点炸开，鼠标沿途撒小波纹、点击炸出强波；可加透视俯角与平面旋转。开场径向显影，帧循环稳定后自睡。",
  tags: ["React", "CSS", "WebGL", "背景"],

  cardDescription: "锐利网格被水波推着起伏发光，鼠标沿途撒涟漪，点击炸波。",

  demoHint: "拖动鼠标看沿途小波纹，点击炸一记强波；tilt 拉出透视地面最出效果。",

  api: API,
};
