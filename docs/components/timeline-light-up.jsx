/* Component metadata only — the live demo and gallery preview live in
   timeline-light-up-demo.jsx, the framework source texts and the prompt in
   timeline-light-up-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "timeline-light-up",
  name: "时间轴点亮",
  href: "timeline-light-up.html",
  title: "时间轴点亮",
  description: "300×500 品牌历程：滚动时中央竖线自顶部充填光亮，光尖到达的年份节点弹起点亮并展开年份卡片。",

  cardDescription: "竖线充填点亮年份节点。",

  demoHint: "滚动看线充填与节点点亮。",



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
