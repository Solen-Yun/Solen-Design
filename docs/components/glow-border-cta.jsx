/* Component metadata only — the live demo and gallery preview live in
   glow-border-cta-demo.jsx, the framework source texts and the prompt in
   glow-border-cta-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "glow-border-cta",
  name: "光边注册号召",
  href: "glow-border-cta.html",
  title: "光边注册号召",
  description: "340×340 落地页结尾的注册号召区：浅网格与一道光束在按钮背后扫过，14 天免费一行字带流动光带，按钮悬停发光，点击进入注册反馈。",

  cardDescription: "网格光束扫过按钮背后，文字光带流动，点击发光反馈。",

  demoHint: "看光束沿网格扫动、文字光带流动；点击按钮看按压反馈。",



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
