/* Component metadata only — the live demo and gallery preview live in
   soda-can-demo.jsx, the framework source texts and the prompt in
   soda-can-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "soda-can",
  name: "旋转开罐汽水",
  href: "soda-can.html",
  title: "旋转开罐汽水",
  description: "340×340 圆罐标签：标签沿圆柱面弯曲渲染，边缘收窄变暗体现体积；横向拖动旋转罐身，转到拉环位置可 Pull 打开（拉环翻起、气泡涌出）。",

  cardDescription: "圆柱标签拖转，对位开罐出泡。",

  demoHint: "横向拖罐身旋转，对准拉环点 Pull。",



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
