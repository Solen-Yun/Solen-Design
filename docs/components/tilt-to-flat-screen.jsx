/* Component metadata only — the live demo and gallery preview live in
   tilt-to-flat-screen-demo.jsx, the framework source texts and the prompt in
   tilt-to-flat-screen-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "tilt-to-flat-screen",
  name: "滚动立起产品屏",
  href: "tilt-to-flat-screen.html",
  title: "滚动立起产品屏",
  description: "300×480 落地页场景：hero 下方的产品屏幕初始小而向后倾，随滚动逐渐立起、放大、投影加深，直至水平定格；屏幕内是团队仪表盘（月营收、新注册、回访等数字与客户 logo 行）。",

  cardDescription: "产品屏随滚动立起放大定格。",

  demoHint: "纵向滚动看屏幕从倾斜到立平。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "480",
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
