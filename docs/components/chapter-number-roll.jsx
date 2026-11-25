/* Component metadata only — the live demo and gallery preview live in
   chapter-number-roll-demo.jsx, the framework source texts and the prompt in
   chapter-number-roll-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "chapter-number-roll",
  name: "滚动章节号",
  href: "chapter-number-roll.html",
  title: "滚动章节号",
  description: "340×330 文档阅读：滚动正文时左侧大章节号像数字带一样连续滚动指向下一章，环形进度表充填；章节标题同步高亮。",

  cardDescription: "章节号数字带滚动，环形进度充填。",

  demoHint: "滚动看章节号滚到下一章。",



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
