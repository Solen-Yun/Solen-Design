/* Component metadata only — the live demo and gallery preview live in
   page-transition-curtain-demo.jsx, the framework source texts and the prompt in
   page-transition-curtain-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "page-transition-curtain",
  name: "卷帘页面转场",
  href: "page-transition-curtain.html",
  title: "卷帘页面转场",
  description: "340×340 站点转场：点顶部菜单另一页，色帘自底部升起盖住屏幕、短暂显示目标页名后落下降揭示新页面内容。",

  cardDescription: "色帘升起盖屏换页再落下。",

  demoHint: "点菜单另一页看卷帘转场。",



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
