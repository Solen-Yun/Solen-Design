/* Component metadata only — the live demo and gallery preview live in
   bento-features-demo.jsx, the framework source texts and the prompt in
   bento-features-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "bento-features",
  name: "动态便当功能格",
  href: "bento-features.html",
  title: "动态便当功能格",
  description: "340×340 落地页 bento 功能格：大小交错的瓷砖块拼出功能矩阵，悬停的瓷砖轻微抬起、描边变亮，并展示其动效细节（如三人同时编辑、40 个集成图标环绕等）。",

  cardDescription: "悬停 bento 瓷砖抬起亮边，内容细节动效展开。",

  demoHint: "逐个悬停瓷砖看抬升与内部动效。",



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
