/* Component metadata only — the live demo and gallery preview live in
   selection-flower-demo.jsx, the framework source texts and the prompt in
   selection-flower-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "selection-flower",
  name: "文字选区开花",
  href: "selection-flower.html",
  title: "文字选区开花",
  description:
    "白底真实排版文章里拖选文字，经过的每个非空白字符都在选区后面种下一株程序花朵，松手时沿原路径反向收回而不是淡出，文字始终可拖选可复制，键盘同样可用。",

  cardDescription: "拖选文字，每个被选中的字符在选区后面长出一株程序花朵。",

  demoHint: "用鼠标横向拖选文字试试：花从选区边缘后面长出来；松手后沿原路径收回。键盘 Enter 取前 36 字，Shift+方向键扩缩选区。",



  api: [
    { name: "height", type: "number", default: "720", description: "场景高度，逻辑像素；窄容器整场景等比缩小，不破坏文字定位" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；花朵即时显示最终形态，选区仍可用" },
  ],
};
