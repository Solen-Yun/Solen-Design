/* Component metadata only — the live demo and gallery preview live in
   story-progress-demo.jsx, the framework source texts and the prompt in
   story-progress-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "story-progress",
  name: "轻点式故事流",
  href: "story-progress.html",
  title: "轻点式故事流",
  description: "300×500 故事流：顶部进度条组随时间充填并自动进入下一场景；点右半屏下一个、左半屏上一个；场景为立方体旋转切换。",

  cardDescription: "进度条自动推进，左右轻点翻页。",

  demoHint: "看自动推进；左右轻点切换。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "500",
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
