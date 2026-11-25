/* Component metadata only — the live demo and gallery preview live in
   usage-meter-demo.jsx, the framework source texts and the prompt in
   usage-meter-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "usage-meter",
  name: "用量预警仪表",
  href: "usage-meter.html",
  title: "用量预警仪表",
  description: "340×340 计划用量屏：API 调用数实时爬升、进度条充填；过 80% 条转橙并滑出「接近上限」提示条，100% 后提示升级；Forecast 展开月末预测行。",

  cardDescription: "用量实时爬升，过线预警提示。",

  demoHint: "看用量爬升与预警；点 Forecast 看预测。",



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
