/* Component metadata only — the live demo and gallery preview live in
   spring-tuner-demo.jsx, the framework source texts and the prompt in
   spring-tuner-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "spring-tuner",
  name: "弹簧调参台",
  href: "spring-tuner.html",
  title: "弹簧调参台",
  description: "340×350 弹簧调参台：墙上弹簧末端拖动木块松手后按设定的刚度与阻尼弹跳，下方 Canvas 图表实时绘制位置曲线；Stiffness/Damping 滑杆调参。",

  cardDescription: "拖块松手按参数弹跳，曲线实时绘制。",

  demoHint: "拖木块松手看弹跳，调两根滑杆看曲线变化。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "350",
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
