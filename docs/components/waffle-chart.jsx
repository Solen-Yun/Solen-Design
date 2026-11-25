/* Component metadata only — the live demo and gallery preview live in
   waffle-chart-demo.jsx, the framework source texts and the prompt in
   waffle-chart-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "waffle-chart",
  name: "翻格华夫图",
  href: "waffle-chart.html",
  title: "翻格华夫图",
  description: "340×340 华夫图：100 格展示 100 人通勤方式；切换年龄段只翻转变化的格子——沿对角线逐格翻面（旧类背面→新类正面），错峰播放。",

  cardDescription: "华夫格逐格翻转换类。",

  demoHint: "切年龄段看变化格子逐个翻转。",



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
