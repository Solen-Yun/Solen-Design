/* Component metadata only — the live demo and gallery preview live in
   soft-action-wheel-demo.jsx, the framework source texts and the prompt in
   soft-action-wheel-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "soft-action-wheel",
  name: "柔光环形菜单展开",
  href: "soft-action-wheel.html",
  title: "柔光环形菜单展开",
  description:
    "浅灰场景中央一枚柔白圆按钮，点加号后六个黑色图标圆按钮从外围顺时针错峰收拢成环并回弹停稳，再点散开淡出，role=menu 语义配方向键与 Escape，动作只发本地事件。",

  cardDescription: "六个图标按钮从外围收拢成环，过冲后停稳；关闭时同时散开淡出。",

  demoHint: "点中央加号展开或收起；展开后方向键顺时针移动，Escape 关闭并把焦点还给中央按钮。",



  api: [
    { name: "height", type: "number", default: "960", description: "场景高度，逻辑像素；窄容器整场景等比缩放" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；六项与旋转同步吸附到目标，输入仍可用" },
  ],
};
