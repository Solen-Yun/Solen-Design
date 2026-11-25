/* Component metadata only — the live demo and gallery preview live in
   scrollspy-toc-demo.jsx, the framework source texts and the prompt in
   scrollspy-toc-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "scrollspy-toc",
  name: "跟随滚动目录",
  href: "scrollspy-toc.html",
  title: "跟随滚动目录",
  description: "340×330 文档场景：右侧目录随正文滚动加深当前章节，竖向标记条随阅读进度伸缩覆盖章节范围；点目录项跳转。",

  cardDescription: "目录随滚动加深，标记条伸缩。",

  demoHint: "滚动正文看目录高亮与标记条，点击跳转。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "330",
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
