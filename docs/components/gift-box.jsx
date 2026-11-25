/* Component metadata only — the live demo and gallery preview live in
   gift-box-demo.jsx, the framework source texts and the prompt in
   gift-box-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "gift-box",
  name: "拆丝带开礼盒",
  href: "gift-box.html",
  title: "拆丝带开礼盒",
  description: "340×340 礼盒场景：点礼盒后蝴蝶结缓缓解开、丝带向两侧滑落，盒盖弹起后翻，光芒放射出 ¥5,000 优惠券；Re-wrap 重置。",

  cardDescription: "蝴蝶结解开丝带滑落，开盖出券。",

  demoHint: "点礼盒看开盒出券，Re-wrap 重置。",



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
