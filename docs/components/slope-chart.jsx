/* Component metadata only — the live demo and gallery preview live in
   slope-chart-demo.jsx, the framework source texts and the prompt in
   slope-chart-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "slope-chart",
  name: "部门满意度斜线图",
  href: "slope-chart.html",
  title: "部门满意度斜线图",
  description: "340×340 斜线图：八部门去年与今年满意度在两根立柱间连线，滚入视口后从左到右逐条画出；Score/Rank 切换按分值或名次解读，悬停高亮部门线。",

  cardDescription: "斜线逐条画出，分数名次两读。",

  demoHint: "看逐条画出，切 Score/Rank，悬停高亮。",



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
