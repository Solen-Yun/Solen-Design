/* Component metadata only — the live demo and gallery preview live in
   circular-text-badge-demo.jsx, the framework source texts and the prompt in
   circular-text-badge-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "circular-text-badge",
  name: "旋转圆形文字徽章",
  href: "circular-text-badge.html",
  title: "旋转圆形文字徽章",
  description: "340×330 徽章：沿圆形路径的文字缓慢旋转（速度 18°/s），悬停加速、离开惯性回落；中心箭头点击弹出随机短语。",

  cardDescription: "环形文字惯性旋转，点击弹短语。",

  demoHint: "悬停加速、离开回落，点击看短语。",



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
