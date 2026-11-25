/* Component metadata only — the live demo and gallery preview live in
   grid-list-flip-demo.jsx, the framework source texts and the prompt in
   grid-list-flip-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "grid-list-flip",
  name: "网格列表形变",
  href: "grid-list-flip.html",
  title: "网格列表形变",
  description: "340×350 相册视图切换：Grid ↔ List 切换时照片永不消失——每格平移到新位置与尺寸，列表态照片拉长成横条、标题位移到侧边，全程 FLIP 过渡。",

  cardDescription: "网格列表切换照片平移形变。",

  demoHint: "切 Grid/List 看照片平移形变。",



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
