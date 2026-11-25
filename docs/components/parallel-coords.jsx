/* Component metadata only — the live demo and gallery preview live in
   parallel-coords-demo.jsx, the framework source texts and the prompt in
   parallel-coords-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "parallel-coords",
  name: "可刷选平行坐标",
  href: "parallel-coords.html",
  title: "可刷选平行坐标",
  description: "340×340 平行坐标：42 台笔记本在价格/重量/电池/性能/屏幕五轴上连成折线，首次出现自左向右展开；拖轴刷选过滤，线即时重排。",

  cardDescription: "五轴折线可刷选过滤。",

  demoHint: "拖任一轴刷选看线过滤。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "340",
    "description": "场景高度，逻辑像素；窄容器整景按比例缩小"
  },
  {
    "name": "reducedMotion",
    "type": "boolean",
    "default": "跟随系统",
    "description": "覆盖系统的减少动态偏好"
  }
],
};
