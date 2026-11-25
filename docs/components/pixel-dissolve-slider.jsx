/* Component metadata only — the live demo and gallery preview live in
   pixel-dissolve-slider-demo.jsx, the framework source texts and the prompt in
   pixel-dissolve-slider-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "pixel-dissolve-slider",
  name: "像素溶解轮播",
  href: "pixel-dissolve-slider.html",
  title: "像素溶解轮播",
  description: "340×330 照片轮播：切下一张时画面碎成小网格，每格在各自时刻弹入新图对应块直至铺满；Next/Prev/自动模式与洗牌/波浪/随机三种次序可选。",

  cardDescription: "网格逐块弹入完成换图。",

  demoHint: "切图看网格弹入，换次序模式。",



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
