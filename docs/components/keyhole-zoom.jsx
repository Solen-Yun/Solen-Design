/* Component metadata only — the live demo and gallery preview live in
   keyhole-zoom-demo.jsx, the framework source texts and the prompt in
   keyhole-zoom-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "keyhole-zoom",
  name: "锁孔穿越",
  href: "keyhole-zoom.html",
  title: "锁孔穿越",
  description: "340×330 门与夜色场景：滚动时门上锁孔不断放大直到穿越进入门后的夜展——门被推远虚化，2026 冬季展信息揭示；Look closer 引导。",

  cardDescription: "锁孔放大穿越进门。",

  demoHint: "滚动看锁孔放大与穿越。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "330",
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
