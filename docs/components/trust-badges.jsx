/* Component metadata only — the live demo and gallery preview live in
   trust-badges-demo.jsx, the framework source texts and the prompt in
   trust-badges-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "trust-badges",
  name: "点按验证徽章",
  href: "trust-badges.html",
  title: "点按验证徽章",
  description: "340×340 产品页合规徽章行：徽章不时有一道扫过的光泽；点按徽章翻卡展示该合规项的说明文字，再点翻回。",

  cardDescription: "徽章翻卡看合规说明，光泽扫过。",

  demoHint: "点徽章看翻卡说明。",



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
