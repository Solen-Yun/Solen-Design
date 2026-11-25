/* Component metadata only — the live demo and gallery preview live in
   long-press-peek-demo.jsx, the framework source texts and the prompt in
   long-press-peek-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "long-press-peek",
  name: "长按消息预览",
  href: "long-press-peek.html",
  title: "长按消息预览",
  description: "300×500 消息列表：长按会话行该行微沉，背后模糊、预览卡自该点弹出（消息气泡与快捷回复）；松手/Escape 收回。",

  cardDescription: "长按弹出预览卡背景模糊。",

  demoHint: "长按会话行看预览弹出。",



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
