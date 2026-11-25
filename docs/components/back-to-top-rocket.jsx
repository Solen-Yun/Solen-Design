/* Component metadata only — the live demo and gallery preview live in
   back-to-top-rocket-demo.jsx, the framework source texts and the prompt in
   back-to-top-rocket-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "back-to-top-rocket",
  name: "火箭回顶按钮",
  href: "back-to-top-rocket.html",
  title: "火箭回顶按钮",
  description: "340×340 文章页：下滚足够距离后右下浮出圆钮，环随阅读进度充填；点击箭头点火、火箭升空并滚回顶部。",

  cardDescription: "阅读进度环，点火升空回顶。",

  demoHint: "下滚看圆钮与环，点击回顶。",



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
