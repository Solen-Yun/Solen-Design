/* Component metadata only — the live demo and gallery preview live in
   underline-styles-demo.jsx, the framework source texts and the prompt in
   underline-styles-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "underline-styles",
  name: "五种下划线悬停",
  href: "underline-styles.html",
  title: "五种下划线悬停",
  description: "340×340 菜单链接组：五条链接各带不同的下划线动效——左入右出、中央扩散、字符波浪流过、交错进出、由点生长；点击标记当前项。",

  cardDescription: "五种下划线动效一排对比。",

  demoHint: "逐条悬停看五种下划线。",



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
