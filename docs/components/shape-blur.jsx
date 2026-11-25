/* Component metadata only — the live demo and gallery preview live in
   shape-blur-demo.jsx, the framework source texts and the prompt in
   shape-blur-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with shape-blur-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "shape", type: '"rect" | "circle" | "polygon" | "star"', default: '"rect"', description: "基础形状；图片轮廓加载成功时忽略" },
  { name: "src", type: "string", default: "—", description: "以图片轮廓作为 SDF（透明通道或纯色背景均可）；加载失败回退基础形状" },
  { name: "sides", type: "number", default: "6", description: "多边形/星形的角数 3–12" },
  { name: "size", type: "number", default: "0.8", description: "形状占容器比例 0.05–1" },
  { name: "roundness", type: "number", default: "0.2", description: "角部/顶点圆角 0–1" },
  { name: "thickness", type: "number", default: "2", description: "描边宽度（px）0.5–40" },
  { name: "fill", type: "boolean", default: "false", description: "填充形体，回声描边改为向内" },
  { name: "echoes", type: "number", default: "1", description: "同心描边数量 1–24" },
  { name: "spacing", type: "number", default: "12", description: "回声描边间距（px，最小 1）" },
  { name: "color", type: "string", default: '"#ffffff"', description: "描边颜色，任意 CSS 颜色" },
  { name: "blur", type: "number", default: "16", description: "最大失焦强度（高斯 σ，DPR 前 px）" },
  { name: "lensSize", type: "number", default: "0.3", description: "镜头半径占短边比例 0.02–2" },
  { name: "lensSoftness", type: "number", default: "0.7", description: "镜头边缘柔度 0–1" },
  { name: "focus", type: "boolean", default: "false", description: "true 时镜头内清晰、镜头外失焦" },
  { name: "chroma", type: "number", default: "0.3", description: "失焦的色差分离 0–1" },
  { name: "rotation", type: "number", default: "0", description: "静态旋转角度（度）" },
  { name: "spin", type: "number", default: "0", description: "持续旋转速度（度/秒）" },
  { name: "idle", type: "boolean", default: "true", description: "指针离开时镜头自行游走" },
  { name: "children", type: "ReactNode", default: "—", description: "叠在画布上方的内容层" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
];

export default {
  id: "shape-blur",
  name: "镜头失焦图形",
  href: "shape-blur.html",
  title: "镜头失焦图形",
  description:
    "一只跟着指针走（空闲时自行游走）的柔边镜头扫过描边图形：镜头范围内轮廓实时失焦成发光的弥散，其余保持锐利——失焦是真的，把形状 alpha 渲成 mip 金字塔再跨层做 B 样条双三次采样，色差分裂 RGB 半径。形状可以是矩形/圆/多边形/星形，也可以是任意图片轮廓（精确欧氏距离变换成 SDF），children 内容悬浮在画布上。",
  tags: ["React", "WebGL", "图形"],

  cardDescription: "镜头扫过描边图形，轮廓在焦外晕成光斑又回锐。",

  demoHint: "移动指针看失焦跟随，离开后镜头自己游走；换形状、拉高 blur 与 chroma。",

  api: API,
};
