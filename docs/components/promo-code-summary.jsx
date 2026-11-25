/* Component metadata only — the live demo and gallery preview live in
   promo-code-summary-demo.jsx, the framework source texts and the prompt in
   promo-code-summary-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "promo-code-summary",
  name: "优惠码订单摘要",
  href: "promo-code-summary.html",
  title: "优惠码订单摘要",
  description: "300×480 结算订单摘要：点 Have a promo code? 滑出输入行；无效码摇头抖动，有效码（如 SAVE10）打折行滑入并重算合计。",

  cardDescription: "无效码摇头，有效码打折重算。",

  demoHint: "先输个错码看摇头，再输 SAVE10 看折扣与合计变化。",



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
