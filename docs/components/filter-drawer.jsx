/* Component metadata only — the live demo and gallery preview live in
   filter-drawer-demo.jsx, the framework source texts and the prompt in
   filter-drawer-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "filter-drawer",
  name: "筛选抽屉实时计数",
  href: "filter-drawer.html",
  title: "筛选抽屉实时计数",
  description: "300×480 移动商品列表：Filter 弹出底部抽屉设置价格区间、颜色、尺码，任意改动 Show N items 计数实时变化；Apply 后列表按筛选更新。",

  cardDescription: "抽屉筛选实时计数，应用更新列表。",

  demoHint: "调价格颜色尺码看计数，Apply 看列表。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "480",
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
