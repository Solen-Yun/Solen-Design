/* Component metadata only — the live demo and gallery preview live in
   category-chip-scrollspy-demo.jsx, the framework source texts and the prompt in
   category-chip-scrollspy-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "category-chip-scrollspy",
  name: "跟滚分类胶囊条",
  href: "category-chip-scrollspy.html",
  title: "跟滚分类胶囊条",
  description: "300×480 外卖菜单场景：分类胶囊条钉在顶部，滚动菜单时下划线滑到当前区块对应的胶囊，点胶囊平滑滚到该区块。",

  cardDescription: "胶囊条吸顶，滚动高亮当前分类。",

  demoHint: "滚动菜单看胶囊高亮跟随，点击胶囊跳转。",



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
