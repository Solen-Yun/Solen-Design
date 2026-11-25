/* Component metadata only — the live demo and gallery preview live in
   prize-wheel-demo.jsx, the framework source texts and the prompt in
   prize-wheel-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "prize-wheel",
  name: "指尖旋转奖轮",
  href: "prize-wheel.html",
  title: "指尖旋转奖轮",
  description: "340×340 八格奖轮：指尖甩动或按 Spin 令其急旋，摩擦渐停，顶部指针逐格叩击并停在奖品上，弹窗显示所得。",

  cardDescription: "甩动或点击旋转，摩擦渐停出奖。",

  demoHint: "甩轮或点 Spin，看停格出奖。",



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
