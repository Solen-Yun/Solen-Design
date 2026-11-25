/* Component metadata only — the live demo and gallery preview live in
   scroll-draw-route-demo.jsx, the framework source texts and the prompt in
   scroll-draw-route-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "scroll-draw-route",
  name: "滚动画出行程",
  href: "scroll-draw-route.html",
  title: "滚动画出行程",
  description: "300×500 旅行叙事：滚动时蜿蜒路线画到对应进度，小飞机跟随线端朝向航向；到达站点弹出该站日期与见闻标签。",

  cardDescription: "路线随滚动描画，飞机随航向。",

  demoHint: "滚动看路线描画与站点弹出。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "500",
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
