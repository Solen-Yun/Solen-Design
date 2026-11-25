/* Component metadata only — the live demo and gallery preview live in
   marker-highlight-demo.jsx, the framework source texts and the prompt in
   marker-highlight-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "marker-highlight",
  name: "荧光笔扫句",
  href: "marker-highlight.html",
  title: "荧光笔扫句",
  description: "340×318 文章场景：荧光笔从左到右扫过段落里的关键短语，跨行短语第一行先填满再折行填满；Replay 重划。",

  cardDescription: "荧光笔逐句扫过高亮，跨行也自然。",

  demoHint: "看荧光笔扫过三句；点 Replay 重划。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "318",
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
