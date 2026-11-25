/* Component metadata only — the live demo and gallery preview live in
   metallic-paint-demo.jsx, the framework source texts and the prompt in
   metallic-paint-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with metallic-paint-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "imageSrc", type: "string", default: "—", description: "浇上金属液的图片地址（支持 SVG 与不透明图自动抠形）；设置 text 时忽略" },
  { name: "text", type: "string", default: "—", description: "替代图片的文字内容，直接绘制成形" },
  { name: "fontFamily", type: "string", default: '"system-ui, sans-serif"', description: "文字字体" },
  { name: "fontWeight", type: "number", default: "800", description: "文字字重" },
  { name: "color", type: "string", default: '"#ffffff"', description: "金属表面的染色光泽" },
  { name: "backgroundColor", type: "string", default: '"transparent"', description: "背景色；不透明值会同时收紧绘制矩形" },
  { name: "density", type: "number", default: "2", description: "对角线上的条纹周期数 0.5–12" },
  { name: "softness", type: "number", default: "0.1", description: "金属条带边缘柔化 0–1" },
  { name: "dispersion", type: "number", default: "0.3", description: "红蓝通道的色散分离 −1–1" },
  { name: "distortion", type: "number", default: "0.07", description: "流场的单纯形噪声扰动 0–1" },
  { name: "edgeBend", type: "number", default: "0.6", description: "流线绕轮廓弯折的强度 0–1" },
  { name: "angle", type: "number", default: "70", description: "对角流向的角度（度）" },
  { name: "speed", type: "number", default: "1", description: "流动时间速率；0 冻结" },
  { name: "scale", type: "number", default: "0.6", description: "形状占容器比例（最小 0.05）" },
  { name: "rotation", type: "number", default: "0", description: "形状旋转角度（度）" },
  { name: "mouseTilt", type: "number", default: "0.5", description: "指针驱动的渐变倾斜 0–1.5" },
  { name: "lightMode", type: "boolean", default: "false", description: "浅色模式：金属变灰、深处带暗边，适合浅色页面" },
  { name: "intro", type: "boolean", default: "true", description: "播放 1.6 秒的沿深度浇注显形" },
  { name: "paused", type: "boolean", default: "false", description: "冻结流动时钟" },
  { name: "dpr", type: "number", default: "min(devicePixelRatio, 2)", description: "基础渲染比率；强制 ≥ 2 并受像素预算约束" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
];

export default {
  id: "metallic-paint",
  name: "液态金属漆",
  href: "metallic-paint.html",
  title: "液态金属漆",
  description:
    "把液态铬浇在标志或文字上：一条对角流动的金属带（细亮条对滚入深色渐变带）在形状的 alpha 蒙版内折射流动，边缘被单纯形噪声与轮廓项弯曲，红蓝条带做色散分离；内部深度场由 CPU 泊松方程分片求解（红黑高斯-赛德尔 40 轮），开场沿深度浇注显形，指针以弹簧驱动渐变倾斜。单趟 WebGL2 渲染 + 分片异步处理，稳定后自睡。",
  tags: ["React", "Canvas", "WebGL", "图形"],

  cardDescription: "液态铬流过文字与标志，边缘折射弯曲，指针拨动流向。",

  demoHint: "拖动指针看金属渐变倾斜回弹；调密度与色散改条纹质感，angle 转流向。",

  api: API,
};
