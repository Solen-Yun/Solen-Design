/* Component metadata only — the live demo and gallery preview live in
   filter-shuffle-grid-demo.jsx, the framework source texts and the prompt in
   filter-shuffle-grid-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "filter-shuffle-grid",
  name: "筛选重排画廊",
  href: "filter-shuffle-grid.html",
  title: "筛选重排画廊",
  description: "340×350 画廊筛选：选分类后不匹配的瓷砖收缩消失，其余按序滑前补位；取消筛选瓷砖在原位弹回。",

  cardDescription: "筛选收缩消失，恢复原位弹回。",

  demoHint: "切分类看瓷砖消失/弹回。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "350",
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
