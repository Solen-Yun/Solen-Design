/* Component metadata only — the live demo and gallery preview live in
   sticky-buy-sheet-demo.jsx, the framework source texts and the prompt in
   sticky-buy-sheet-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "sticky-buy-sheet",
  name: "吸底购买横条",
  href: "sticky-buy-sheet.html",
  title: "吸底购买横条",
  description: "300×480 商品页场景：内容里的购买按钮滚出屏幕后，底部升起带价格与购买按钮的吸底横条；点购买弹出尺寸选项底部面板，选择后确认。",

  cardDescription: "内容按钮离场后吸底横条升起，选尺寸确认。",

  demoHint: "向下滚动看横条升起；点购买看尺寸面板。",



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
