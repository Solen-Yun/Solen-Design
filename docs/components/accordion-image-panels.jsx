/* Component metadata only — the live demo and gallery preview live in
   accordion-image-panels-demo.jsx, the framework source texts and the prompt in
   accordion-image-panels-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "accordion-image-panels",
  name: "侧展照片条",
  href: "accordion-image-panels.html",
  title: "侧展照片条",
  description: "340×320 五条竖版照片条：悬停某条展开变宽、其余收窄；收窄条只显示竖排名称，展开条显示完整照片与文案。",

  cardDescription: "悬停照片条展开其余收窄。",

  demoHint: "逐条悬停看展开。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "320",
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
