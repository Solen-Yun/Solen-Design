/* Component metadata only — the live demo and gallery preview live in
   chord-diagram-demo.jsx, the framework source texts and the prompt in
   chord-diagram-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "chord-diagram",
  name: "月度弦图",
  href: "chord-diagram.html",
  title: "月度弦图",
  description: "340×340 弦图：六团队互发消息以弧带与弦呈现——弧沿圆周生长、弦从起点展开到终点；Last/This month 切换重排，悬停弧或弦高亮该团队所有连线。",

  cardDescription: "弦图月度切换重排，悬停高亮。",

  demoHint: "切月份看重排，悬停看高亮。",



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
