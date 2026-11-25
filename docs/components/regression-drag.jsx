/* Component metadata only — the live demo and gallery preview live in
   regression-drag-demo.jsx, the framework source texts and the prompt in
   regression-drag-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "regression-drag",
  name: "拖点回归线",
  href: "regression-drag.html",
  title: "拖点回归线",
  description: "340×340 学习时间-成绩散点：回归线与置信带随拖动的点像弹簧一样倾斜重拟，R² 实时更新；Residuals 切换显示残差线，Reset 复位。",

  cardDescription: "拖散点回归线弹簧重拟。",

  demoHint: "拖任一点看线与 R² 变化。",



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
