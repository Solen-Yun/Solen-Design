/* Component metadata only — the live demo and gallery preview live in
   horizontal-pin-track-demo.jsx, the framework source texts and the prompt in
   horizontal-pin-track-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "horizontal-pin-track",
  name: "竖滚横移画轴",
  href: "horizontal-pin-track.html",
  title: "竖滚横移画轴",
  description: "340×330 叙事场景：纵向滚动时画面钉住，内部一条面板横带随滚动横向流动，大数字与形状带轻微拖尾，末尾出现「You've reached the end」。",

  cardDescription: "纵向滚动钉住画面，面板横向流动。",

  demoHint: "纵向滚动看画面钉住、面板横移。",



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
