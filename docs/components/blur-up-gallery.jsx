/* Component metadata only — the live demo and gallery preview live in
   blur-up-gallery-demo.jsx, the framework source texts and the prompt in
   blur-up-gallery-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "blur-up-gallery",
  name: "模糊加载相册",
  href: "blur-up-gallery.html",
  title: "模糊加载相册",
  description: "340×340 旅行相册：慢速网络下每格先显示模糊小图与加载条，数据到位后清晰化并揭开；点 Slow connection 重播演示。",

  cardDescription: "模糊小图渐清晰，加载条走完揭开。",

  demoHint: "看加载过程；点 Slow connection 重播。",



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
