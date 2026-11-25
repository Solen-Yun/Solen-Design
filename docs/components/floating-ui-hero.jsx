/* Component metadata only — the live demo and gallery preview live in
   floating-ui-hero-demo.jsx, the framework source texts and the prompt in
   floating-ui-hero-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "floating-ui-hero",
  name: "视差浮动 UI hero",
  href: "floating-ui-hero.html",
  title: "视差浮动 UI hero",
  description: "340×340 落地页 hero：产品屏四周漂浮 UI 小件（待办清单、支付成功通知、营收图、评分卡、协作者光标），光标移动时各件按深度差视差漂移。",

  cardDescription: "UI 小件随光标深度视差漂浮。",

  demoHint: "移动光标看小件视差。",



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
