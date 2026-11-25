/* Component metadata only — the live demo and gallery preview live in
   collapsing-large-title-demo.jsx, the framework source texts and the prompt in
   collapsing-large-title-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "collapsing-large-title",
  name: "大标题收缩",
  href: "collapsing-large-title.html",
  title: "大标题收缩",
  description: "300×500 邮箱列表场景：上滚列表时大标题 Inbox 上移缩成顶栏中的小标题，搜索框压缩消失；下滚反向恢复。",

  cardDescription: "大标题随滚动缩入顶栏。",

  demoHint: "上下滚动看标题与搜索框变形。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "500",
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
