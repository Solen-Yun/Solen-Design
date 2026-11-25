/* Component metadata only — the live demo and gallery preview live in
   letters-scatter-demo.jsx, the framework source texts and the prompt in
   letters-scatter-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "letters-scatter",
  name: "字母散聚",
  href: "letters-scatter.html",
  title: "字母散聚",
  description: "340×300 标题词：点一下字母四散飞出旋转碰壁，悬停片刻后弹回原位；拖动可抓取字母摆放；Gather/Scatter 按钮控制。",

  cardDescription: "字母四散碰壁再弹回，可抓取。",

  demoHint: "点词看散聚；拖字母摆放。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "300",
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
