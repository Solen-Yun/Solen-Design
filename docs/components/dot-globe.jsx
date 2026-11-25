/* Component metadata only — the live demo and gallery preview live in
   dot-globe-demo.jsx, the framework source texts and the prompt in
   dot-globe-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "dot-globe",
  name: "点阵地球",
  href: "dot-globe.html",
  title: "点阵地球",
  description: "340×340 实时访客地球：数千点描出大陆轮廓缓慢自转，城市访问信号以涟漪从地表冒出；拖动可旋转地球，松手恢复自转，计数上涨。",

  cardDescription: "点阵大陆自转，访问信号涟漪。",

  demoHint: "拖动旋转地球，看信号涟漪。",



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
