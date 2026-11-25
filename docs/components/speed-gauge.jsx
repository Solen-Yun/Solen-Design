/* Component metadata only — the live demo and gallery preview live in
   speed-gauge-demo.jsx, the framework source texts and the prompt in
   speed-gauge-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "speed-gauge",
  name: "抖动指针测速",
  href: "speed-gauge.html",
  title: "抖动指针测速",
  description: "340×340 测速场景：按 Start 后 Ping 数字闪烁测定，指针抖动着扫上 Download 弧并充填颜色、数字滚动到结果；Upload 相继进行；再测可重置。",

  cardDescription: "指针抖动扫弧，分项数字滚动。",

  demoHint: "点 Start 看三段测速流程。",



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
