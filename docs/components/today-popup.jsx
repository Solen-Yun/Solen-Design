/* Component metadata only — the live demo and gallery preview live in
   today-popup-demo.jsx, the framework source texts and the prompt in
   today-popup-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "today-popup",
  name: "今日不再弹窗",
  href: "today-popup.html",
  title: "今日不再弹窗",
  description: "300×480 商店促销弹窗：进入后弹窗弹起，三条横幅每几秒横向滑动轮换，圆点与页码跟随；Don't show today 记住选择当天关闭，Close 关闭。",

  cardDescription: "横幅横向轮换，今日不再可记忆。",

  demoHint: "看横幅轮换；点 Don't show today 关闭。",



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
