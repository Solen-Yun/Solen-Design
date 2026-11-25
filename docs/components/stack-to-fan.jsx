/* Component metadata only — the live demo and gallery preview live in
   stack-to-fan-demo.jsx, the framework source texts and the prompt in
   stack-to-fan-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "stack-to-fan",
  name: "照片堆展开",
  href: "stack-to-fan.html",
  title: "照片堆展开",
  description: "340×330 拍立得照片堆：悬停轻微扇形展开，点击飞散成整齐网格；点网格中一张，其余收回成堆、该张浮起放大。",

  cardDescription: "照片堆悬停扇开，点击成网格。",

  demoHint: "悬停扇开，点击成网格与放大。",



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
