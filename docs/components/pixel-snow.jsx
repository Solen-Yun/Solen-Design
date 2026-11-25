/* Component metadata only — the live demo and gallery preview live in
   pixel-snow-demo.jsx, the framework source texts and the prompt in
   pixel-snow-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with pixel-snow-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "color", type: "string", default: '"#ffffff"', description: "雪花颜色，任意 CSS 颜色值，解析失败回退白" },
  { name: "variant", type: '"square" | "round" | "snowflake"', default: '"snowflake"', description: "像素精灵家族：方糖 / 圆点 / 雪花三套内置像素画" },
  { name: "density", type: "number", default: "0.5", description: "雪花密度 0–1，约等于 宽×高×密度/1100 颗" },
  { name: "speed", type: "number", default: "1", description: "下落速度倍率；0 冻结，负值让雪向上飘" },
  { name: "wind", type: "number", default: "0.25", description: "横向风推，clamp ±2，×46 px/s" },
  { name: "sway", type: "number", default: "0.5", description: "左右摇摆幅度" },
  { name: "flakeSize", type: "number", default: "1", description: "体型分布偏移 0–2，大于 1 偏大雪花，小于 1 偏碎雪" },
  { name: "pixelSize", type: "number", default: "3", description: "一个「大像素」的边长（CSS px），1–12" },
  { name: "depth", type: "number", default: "0.6", description: "景深视差强度 0–1，拉开层与层的速度与亮度差" },
  { name: "brightness", type: "number", default: "1", description: "整体亮度倍率" },
  { name: "glow", type: "number", default: "0.8", description: "雪片周围辉光强度" },
  { name: "twinkle", type: "number", default: "0.35", description: "闪烁频率 0–1" },
  { name: "accumulate", type: "boolean", default: "false", description: "落雪堆积成带抖动明暗与峰顶闪光的雪堆，并缓慢长高" },
  { name: "mouseInteraction", type: "boolean", default: "true", description: "鼠标拨开附近雪花并带动其速度" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时亮幕自上而下扫过逐层显影" },
  { name: "fade", type: "number", default: "0", description: "容器四边柔化遮罩 0–1" },
  { name: "opacity", type: "number", default: "1", description: "整体不透明度 0–1" },
  { name: "lightMode", type: "boolean", default: "false", description: "浅色模式：雪印成软墨，适合浅色页面" },
  { name: "paused", type: "boolean", default: "false", description: "冻结运动但保留最后一帧画面" },
  { name: "dpr", type: "number", default: "—", description: "覆盖画布渲染像素比" },
  { name: "className", type: "string", default: '""', description: "根节点附加类名" },
];

export default {
  id: "pixel-snow",
  name: "像素雪花",
  href: "pixel-snow.html",
  title: "像素雪花",
  description:
    "整场雪都画在 GPU 上：每片雪是内置像素图集里的一枚精灵，以实例化四边形绘制，五层景深以不同速度与亮度飘落，鼠标扫过把雪拨开，可开启积雪让底部堆出带拜耳抖动与峰顶闪光的雪堆，再叠一道柔辉光。像素网格尺寸可调，从 1px 精细到 12px 像素艺术感；亮幕自上而下显影，帧循环稳定后自睡。",
  tags: ["React", "CSS", "WebGL", "背景"],

  cardDescription: "像素精灵雪分层飘落，鼠标拨雪，可积出闪光的雪堆。",

  demoHint: "扫动鼠标看雪花被拨开；开积雪等雪堆长起来，再换形状与像素颗粒感受画风变化。",

  api: API,
};
