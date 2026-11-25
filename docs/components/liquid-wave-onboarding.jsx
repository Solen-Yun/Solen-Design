/* Component metadata only — the live demo and gallery preview live in
   liquid-wave-onboarding-demo.jsx, the framework source texts and the prompt in
   liquid-wave-onboarding-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "liquid-wave-onboarding",
  name: "液体波浪引导页",
  href: "liquid-wave-onboarding.html",
  title: "液体波浪引导页",
  description: "300×500 引导页：按 Next 后下一页的颜色以滚动波浪自底上升起盖满屏幕，插画与文字浮起；Skip 跳过；最后一步显示 Get started。",

  cardDescription: "下一页颜色以波浪升起接管。",

  demoHint: "连按 Next 看波浪换页。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "500",
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
