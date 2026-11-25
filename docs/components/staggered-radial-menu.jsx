/* Component metadata only — the live demo and gallery preview live in
   staggered-radial-menu-demo.jsx, the framework source texts and the prompt in
   staggered-radial-menu-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "staggered-radial-menu",
  name: "环形菜单交错展开",
  href: "staggered-radial-menu.html",
  title: "环形菜单交错展开",
  description:
    "纯黑场景中央一枚白色加号圆按钮，点击后六个彩色圆按钮从外围沿各自径向依次浮现、清晰、过冲停稳成环，关闭时反向散开淡出，role=menu 语义配方向键与 Escape。",

  cardDescription: "六个彩色按钮沿径向依次收拢成环，关闭时反向散开。",

  demoHint: "点中央加号展开或收起；展开后方向键顺时针移动，Escape 关闭并把焦点还给中央按钮。",



  api: [
    { name: "height", type: "number", default: "960", description: "场景高度，逻辑像素；窄容器整场景等比缩放" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；六项与旋转同步吸附到目标，输入仍可用" },
  ],
};
