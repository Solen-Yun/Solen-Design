/* Component metadata only — the live demo and gallery preview live in
   section-color-shift-demo.jsx, the framework source texts and the prompt in
   section-color-shift-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "section-color-shift",
  name: "分段变色滚动",
  href: "section-color-shift.html",
  title: "分段变色滚动",
  description: "300×500 汽水产品页：滚动经过每个口味区，整页背景色融合过渡到该口味色，中央钉住的汽水罐标签同步换色换名。",

  cardDescription: "背景随分区变色，罐标同步。",

  demoHint: "滚动看背景与罐标变色。",



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
