/* Component metadata only — the live demo and gallery preview live in
   grid-beam-hero-demo.jsx, the framework source texts and the prompt in
   grid-beam-hero-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "grid-beam-hero",
  name: "网格光束背景",
  href: "grid-beam-hero.html",
  title: "网格光束背景",
  description: "340×340 深色 hero 背景：低透明度网格上，水平与垂直光束沿网格线滑行并拖出渐隐尾巴；光标移动时一道聚光跟随照亮附近网格，中央为部署文案与两枚按钮。",

  cardDescription: "光束沿网格滑行，聚光跟随光标。",

  demoHint: "移动光标看聚光跟随，光束持续滑行。",



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
