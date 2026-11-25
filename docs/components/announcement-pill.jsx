/* Component metadata only — the live demo and gallery preview live in
   announcement-pill-demo.jsx, the framework source texts and the prompt in
   announcement-pill-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "announcement-pill",
  name: "闪光公告胶囊",
  href: "announcement-pill.html",
  title: "闪光公告胶囊",
  description: "340×340 hero 顶部公告胶囊：每隔几秒一道光带扫过，消息向上滚动换到下一条新闻；点开展开完整公告列表或跳转。",

  cardDescription: "光带扫过胶囊，消息滚动轮换。",

  demoHint: "看光带与消息轮换；点击胶囊交互。",



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
