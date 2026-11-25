/* Component metadata only — the live demo and gallery preview live in
   coupon-tear-demo.jsx, the framework source texts and the prompt in
   coupon-tear-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "coupon-tear",
  name: "撕联折扣券",
  href: "coupon-tear.html",
  title: "撕联折扣券",
  description: "340×340 票券形折扣券：按右侧 Get stub，票根沿齿孔倾斜撕离，露出券码 HELLO15 与复制按钮；剩余时间倒计时持续。",

  cardDescription: "票根沿齿孔撕离露券码。",

  demoHint: "点 Get stub 看撕离与券码，复制。",



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
