/* Component metadata only — the live demo and gallery preview live in
   scroll-stack-demo.jsx, the framework source texts and the prompt in
   scroll-stack-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with scroll-stack-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "children", type: "ReactNode", default: "—", description: "卡片内容；用 ScrollStackItem 包裹获得内置卡片外观" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "itemDistance", type: "number", default: "100", description: "堆叠前相邻卡片的滚动间距（px）" },
  { name: "itemStackDistance", type: "number", default: "24", description: "钉住后每张卡在下方的露出偏移（px）" },
  { name: "stackPosition", type: 'string | number', default: '"15%"', description: "第一张卡的钉住位置，视口百分比或 px" },
  { name: "itemScale", type: "number", default: "0.05", description: "每层深度缩小的比例" },
  { name: "baseScale", type: "number", default: "0.8", description: "被埋卡片的缩放下限" },
  { name: "dimAmount", type: "number", default: "0.2", description: "被埋卡片的压暗强度 0–1" },
  { name: "blurAmount", type: "number", default: "0", description: "每层深度附加的模糊（px），0 关闭" },
  { name: "tiltAmount", type: "number", default: "0", description: "被埋卡片 rotateX 倾斜上限（deg）" },
  { name: "rotationAmount", type: "number", default: "0", description: "z 轴旋转上限（deg），逐卡交替方向" },
  { name: "holdDistance", type: "number", default: "200", description: "堆完后停留的额外滚动距离（px）" },
  { name: "smoothScroll", type: "boolean", default: "true", description: "拦截滚轮，用惯性滑行接住滚动" },
  { name: "snap", type: "boolean", default: "false", description: "滚动停下后吸附到最近的卡片" },
  { name: "useWindowScroll", type: "boolean", default: "false", description: "用页面滚动驱动，而不是容器内滚动" },
  { name: "onStackComplete", type: "() => void", default: "—", description: "最后一张卡完全盖住牌堆时回调一次" },
];

export default {
  id: "scroll-stack",
  name: "滚动钉住卡片堆",
  href: "scroll-stack.html",
  title: "滚动钉住卡片堆",
  description:
    "滚动驱动的钉住牌堆：每张卡滚到视口上方就 sticky 钉住，下一张滑上来盖住它，牌堆逐渐收拢成一叠压暗、缩小的卡片，再停留一段 hold 距离后释放。全部只写 transform/filter/不透明度，逐卡缓存避免多余 DOM 写入；可选惯性滑行接住原生滚轮、停在最近卡片，支持容器内滚动或整页滚动两种模式。",
  tags: ["React", "CSS"],

  cardDescription: "卡片滚动时逐张钉住叠成一堆，压暗缩小后停留再释放。",

  demoHint: "在舞台上滚轮滑动看逐张钉住；开吸附、加模糊和倾斜，体会不同堆叠质感。",

  api: API,
};
