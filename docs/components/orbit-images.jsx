/* Component metadata only — the live demo and gallery preview live in
   orbit-images-demo.jsx, the framework source texts and the prompt in
   orbit-images-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with orbit-images-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "images", type: "(string | { src: string; alt?: string })[]", default: "[]", description: "环绕的图片，字符串或 { src, alt } 对象" },
  { name: "altPrefix", type: "string", default: '"Orbiting image"', description: "兜底 alt 文案前缀，按序号编号" },
  { name: "shape", type: '"ellipse" | "circle" | "square" | "rectangle" | "triangle" | "star" | "heart" | "infinity" | "wave" | "custom"', default: '"ellipse"', description: "轨道形状" },
  { name: "customPath", type: "string", default: "—", description: "shape 为 custom 时的原始 SVG 路径" },
  { name: "baseWidth", type: "number", default: "1400", description: "路径生成的内部 SVG 画布边长" },
  { name: "radiusX", type: "number", default: "700", description: "ellipse / rectangle / infinity / wave 的横向半径" },
  { name: "radiusY", type: "number", default: "170", description: "ellipse / rectangle / infinity / wave 的纵向半径" },
  { name: "radius", type: "number", default: "300", description: "circle / square / triangle / star / heart 的半径" },
  { name: "starPoints", type: "number", default: "5", description: "星形的角数" },
  { name: "starInnerRatio", type: "number", default: "0.5", description: "星形内半径占外半径的比例" },
  { name: "rotation", type: "number", default: "-8", description: "轨道绕中心的旋转角度（度）" },
  { name: "duration", type: "number", default: "40", description: "绕行一圈的秒数" },
  { name: "itemSize", type: "number", default: "64", description: "图片的基础尺寸（设计单位，随容器缩放）" },
  { name: "direction", type: '"normal" | "reverse"', default: '"normal"', description: "环绕方向" },
  { name: "fill", type: "boolean", default: "true", description: "按圈均匀布点；否则按弧长间距" },
  { name: "width", type: "number | string", default: '"100%"', description: "容器宽度（数字 → px）" },
  { name: "height", type: 'number | string', default: '"auto"', description: '容器高度；"auto" 按轨道纵横比推导' },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "showPath", type: "boolean", default: "false", description: "画出轨道描线" },
  { name: "pathColor", type: "string", default: '"rgba(128,128,128,0.35)"', description: "轨道描线颜色" },
  { name: "pathWidth", type: "number", default: "2", description: "轨道描线宽度（px）" },
  { name: "pathDash", type: "number", default: "0", description: "轨道虚线段长（px）；0 为实线" },
  { name: "easing", type: '"linear" | "easeIn" | "easeOut" | "easeInOut"', default: '"linear"', description: "每圈的进度缓动" },
  { name: "paused", type: "boolean", default: "false", description: "停止自动环绕，拖拽与点击仍可用" },
  { name: "depth", type: "number", default: "0.5", description: "伪 3D 强度 0–1：前后缩放、变暗与层叠差" },
  { name: "itemRadius", type: "number | string", default: "12", description: "图片圆角（数字 → 占图片尺寸的百分比）" },
  { name: "shadow", type: "number", default: "0.3", description: "图片投影强度 0–1" },
  { name: "hoverScale", type: "number", default: "1.08", description: "悬停 / 键盘聚焦时图片放大倍数" },
  { name: "hoverSpeed", type: "number", default: "0.3", description: "悬停时的环绕速度 0–1" },
  { name: "draggable", type: "boolean", default: "true", description: "抓住队列沿轨道拖拽并甩动" },
  { name: "clickToFront", type: "boolean", default: "true", description: "点击的图片先滑到最前再触发回调" },
  { name: "onItemClick", type: "(index: number, src: string) => void", default: "—", description: "让图片变成可交互按钮并响应点击" },
  { name: "alignToPath", type: "boolean", default: "false", description: "图片随轨道局部朝向旋转" },
  { name: "intro", type: "boolean", default: "true", description: "首次可见时图片从最前点汇聚展开" },
  { name: "centerContent", type: "ReactNode", default: "—", description: "渲染在轨道前后层之间的中心内容" },
];

export default {
  id: "orbit-images",
  name: "轨道环绕图片",
  href: "orbit-images.html",
  title: "轨道环绕图片",
  description:
    "图片串成一线沿 SVG 路径环绕：默认是倾斜的椭圆，也可以换成圆、方、矩形、三角、星形、心形、无限环、波浪或任意自定义路径。伪 3D 让前排图片放大层叠、后排缩小变暗，整列可抓住沿轨道拖拽甩动，点击一张滑到最前并回调；中央插槽把 logo 垫在轨道前后层之间，轨道描线可显示并穿心而过。纯 DOM/SVG 变换驱动，帧循环稳定后自睡，适配 prefers-reduced-motion。",
  tags: ["React", "CSS", "SVG", "交互"],

  cardDescription: "图片沿椭圆等 SVG 轨道环绕层叠，可拖拽甩动、点击滑到最前。",

  demoHint: "拖住队列甩一下，点击图片让它滑到最前；切换轨道形状、显示描线并调整伪 3D 强度。",

  api: API,
};
