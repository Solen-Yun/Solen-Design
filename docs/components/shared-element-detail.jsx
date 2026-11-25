/* Component metadata only — the live demo and gallery preview live in
   shared-element-detail-demo.jsx, the framework source texts and the prompt in
   shared-element-detail-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "shared-element-detail",
  name: "卡片展开详情",
  href: "shared-element-detail.html",
  title: "卡片展开详情",
  description: "300×500 目的地卡片：点卡片原地放大铺满屏幕——照片拉伸成头部、标题移动到大标题位、详情内容淡入；返回时缩回原位。",

  cardDescription: "卡片原地生长成详情页。",

  demoHint: "点卡片展开，返回缩回。",



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
