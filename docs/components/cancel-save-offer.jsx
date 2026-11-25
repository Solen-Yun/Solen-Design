/* Component metadata only — the live demo and gallery preview live in
   cancel-save-offer-demo.jsx, the framework source texts and the prompt in
   cancel-save-offer-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "cancel-save-offer",
  name: "退订挽留对话框",
  href: "cancel-save-offer.html",
  title: "退订挽留对话框",
  description: "340×340 订阅管理场景：Cancel subscription 弹出原因对话框，选理由激活 Next；下一步给出挽留优惠，仍坚持则确认退订并显示剩余可用期说明。",

  cardDescription: "退订原因对话框，挽留优惠后确认。",

  demoHint: "走一遍退订流：选理由 → 挽留 → 确认。",



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
