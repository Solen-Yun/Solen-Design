/* Component metadata only — the live demo and gallery preview live in
   cart-drawer-demo.jsx, the framework source texts and the prompt in
   cart-drawer-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "cart-drawer",
  name: "购物车抽屉",
  href: "cart-drawer.html",
  title: "购物车抽屉",
  description: "300×480 商品页场景：Add to cart 后购物车抽屉自右滑入，新加入商品闪烁高亮；顶部免邮进度条随小计增长充填；数量步进与移除可用，结算按钮就绪。",

  cardDescription: "抽屉滑入新商品闪烁，免邮条充填。",

  demoHint: "点 Add to cart 看抽屉与免邮条；调数量看进度。",



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
