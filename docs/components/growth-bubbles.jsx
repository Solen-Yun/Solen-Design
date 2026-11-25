/* Component metadata only — the live demo and gallery preview live in
   growth-bubbles-demo.jsx, the framework source texts and the prompt in
   growth-bubbles-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "growth-bubbles",
  name: "季度增长气泡",
  href: "growth-bubbles.html",
  title: "季度增长气泡",
  description: "340×340 八款应用气泡图：横轴用户、纵轴留存，气泡大小按营收；每过一个季度各自沿轨迹滑动，拖动时间轴 scrub 八个季度。",

  cardDescription: "气泡按季度沿轨迹滑动。",

  demoHint: "拖时间轴看八个季度滑动。",



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
