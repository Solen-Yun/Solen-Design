/* Component metadata only — the live demo and gallery preview live in
   flow-field-demo.jsx, the framework source texts and the prompt in
   flow-field-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "flow-field",
  name: "流场涡旋",
  href: "flow-field.html",
  title: "流场涡旋",
  description: "340×330 生成艺术：无数粒子沿不可见流场漂移留下丝滑尾迹；流场随时间缓慢重塑；悬停粒子绕光标偏转，点击重置画布。",

  cardDescription: "粒子沿流场留尾，悬停偏转。",

  demoHint: "看粒子尾迹，移动光标扰流，点击重置。",



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
