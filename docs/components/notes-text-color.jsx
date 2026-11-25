/* Component metadata only — the live demo and gallery preview live in
   notes-text-color-demo.jsx, the framework source texts and the prompt in
   notes-text-color-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "notes-text-color",
  name: "文字选区调色器",
  href: "notes-text-color.html",
  title: "文字选区调色器",
  description:
    "深色备忘录里拖选真实可选中的 DOM 文字会浮出磨砂调色器，选色即时把选中文字染色并按全局字符偏移持久化，选区手柄可拖调边界，Enter 选整段、方向键换色、Escape 关闭并保留颜色。",

  cardDescription: "在备忘录里拖选文字，浮出磨砂调色器给选区上色。",

  demoHint: "在手机里拖选一段文字试试；调色器浮在选区上方，右边是最近选区，点一行就跳回去。",



  api: [
    { name: "height", type: "number", default: "1080", description: "场景高度，逻辑像素；窄容器整场景等比缩放" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；选择、调色、历史、键盘与触屏仍可用" },
  ],
};
