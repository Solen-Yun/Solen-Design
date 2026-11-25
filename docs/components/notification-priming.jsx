/* Component metadata only — the live demo and gallery preview live in
   notification-priming-demo.jsx, the framework source texts and the prompt in
   notification-priming-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "notification-priming",
  name: "先问后开通知",
  href: "notification-priming.html",
  title: "先问后开通知",
  description: "340×340 通知授权场景：先弹卡片（摆动的铃铛 + Want a heads-up when someone replies? + Not now / Enable）；Enable 后出现浏览器权限条模拟（Block/Allow），允许后演示一条回复通知入场。",

  cardDescription: "先解释再授权，允许后演示通知。",

  demoHint: "走一遍 Enable → Allow 看演示通知。",



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
