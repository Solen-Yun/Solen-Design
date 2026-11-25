/* Component metadata only — the live demo and gallery preview live in
   delivery-cutoff-demo.jsx, the framework source texts and the prompt in
   delivery-cutoff-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "delivery-cutoff",
  name: "截单倒计时配送承诺",
  href: "delivery-cutoff.html",
  title: "截单倒计时配送承诺",
  description: "340×340 商品页配送提示：Order within 1:23:00 for delivery tomorrow 按秒倒计时，下方剩余时间条收缩；过期后文案切换为标准配送；可重置演示。",

  cardDescription: "截单秒级倒计时，时间条收缩。",

  demoHint: "看倒计时与收缩条。",



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
