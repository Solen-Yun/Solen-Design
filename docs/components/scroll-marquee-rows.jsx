/* Component metadata only — the live demo and gallery preview live in
   scroll-marquee-rows-demo.jsx, the framework source texts and the prompt in
   scroll-marquee-rows-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "scroll-marquee-rows",
  name: "滚动驱动大字带",
  href: "scroll-marquee-rows.html",
  title: "滚动驱动大字带",
  description: "340×330 三行大字带：平时缓慢反向漂移；滚动加速时各行加速并朝运动方向轻微倾斜，滚动向上则反向；提示 Scroll to change speed。",

  cardDescription: "大字带随滚动加速倾斜。",

  demoHint: "滚动看加速与倾斜，反向滚动看反向。",



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
