/* Component metadata only — the live demo and gallery preview live in
   recent-purchase-toast-demo.jsx, the framework source texts and the prompt in
   recent-purchase-toast-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "recent-purchase-toast",
  name: "最新购买通知",
  href: "recent-purchase-toast.html",
  title: "最新购买通知",
  description: "340×340 商店页左下角社交证明：Kim from Busan just bought a linen shirt 通知带商品图弹出，底部进度条走完自动收起；可关闭并撤销。",

  cardDescription: "购买通知弹出带进度条，可关闭撤销。",

  demoHint: "看通知循环弹出；点关闭再撤销。",



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
