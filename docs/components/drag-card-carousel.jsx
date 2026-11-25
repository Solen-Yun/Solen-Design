/* Component metadata only — the live demo and gallery preview live in
   drag-card-carousel-demo.jsx, the framework source texts and the prompt in
   drag-card-carousel-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "drag-card-carousel",
  name: "拖拽吸附卡轮播",
  href: "drag-card-carousel.html",
  title: "拖拽吸附卡轮播",
  description: "340×340 模板轮播：本周热门模板卡横向排列、右缘露出下一张；拖动跟手、松手按速度滑行并吸附到卡片位；点卡反馈。",

  cardDescription: "拖拽跟手松手吸附。",

  demoHint: "横向拖动看吸附。",



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
