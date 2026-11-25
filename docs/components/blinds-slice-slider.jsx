/* Component metadata only — the live demo and gallery preview live in
   blinds-slice-slider-demo.jsx, the framework source texts and the prompt in
   blinds-slice-slider-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "blinds-slice-slider",
  name: "百叶翻页轮播",
  href: "blinds-slice-slider.html",
  title: "百叶翻页轮播",
  description: "340×330 轮播：切下一张时画面切成八条竖条依次翻面，背面是新场景；条纹错峰翻转让切换像百叶帘卷过。",

  cardDescription: "八条竖条依次翻面换景。",

  demoHint: "点 Next 看百叶翻面。",



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
