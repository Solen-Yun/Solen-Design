/* Component metadata only — the live demo and gallery preview live in
   stagger-reveal-grid-demo.jsx, the framework source texts and the prompt in
   stagger-reveal-grid-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "stagger-reveal-grid",
  name: "错峰滚动入场卡",
  href: "stagger-reveal-grid.html",
  title: "错峰滚动入场卡",
  description: "300×480 特性区场景：滚动进入视口的特性卡从下方错峰升起（左列先起），卡内图标同步完成绘制；结尾 Start 按钮就绪。",

  cardDescription: "特性卡错峰升起，图标同步绘制。",

  demoHint: "滚动看卡片错峰入场。",



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
