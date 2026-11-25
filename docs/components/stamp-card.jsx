/* Component metadata only — the live demo and gallery preview live in
   stamp-card-demo.jsx, the framework source texts and the prompt in
   stamp-card-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "stamp-card",
  name: "集章咖啡卡",
  href: "stamp-card.html",
  title: "集章咖啡卡",
  description: "340×340 咖啡集章卡：十格卡，按 Stamp 一枚橡皮章自上而下压下再抬起，留下微斜圆章与轻噪点；集满显示免费饮品行。",

  cardDescription: "橡皮章压下留印，集满免费。",

  demoHint: "连按 Stamp 集满十格。",



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
