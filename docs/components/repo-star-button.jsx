/* Component metadata only — the live demo and gallery preview live in
   repo-star-button-demo.jsx, the framework source texts and the prompt in
   repo-star-button-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "repo-star-button",
  name: "星标历史按钮",
  href: "repo-star-button.html",
  title: "星标历史按钮",
  description: "340×340 开源项目卡：滚入视口时过去一年的星标历史折线从左向右画出，末端呼吸闪烁；Star 按钮点击后计数上涨、折线末端上扬。",

  cardDescription: "星标历史折线画出，Star 点击计数上涨。",

  demoHint: "滚入看折线画出，点 Star 看计数与曲线上扬。",



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
