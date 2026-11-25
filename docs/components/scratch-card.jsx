/* Component metadata only — the live demo and gallery preview live in
   scratch-card-demo.jsx, the framework source texts and the prompt in
   scratch-card-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "scratch-card",
  name: "刮刮乐",
  href: "scratch-card.html",
  title: "刮刮乐",
  description: "340×340 幸运刮刮乐：银色涂层随光标刮擦被擦除（Canvas 擦除层），露出下方奖项；刮过 55% 自动全清并弹出奖品确认；New ticket 重置。",

  cardDescription: "擦除涂层显奖项，过半自动全清。",

  demoHint: "按住刮涂层看露奖，过半自动清空。",



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
