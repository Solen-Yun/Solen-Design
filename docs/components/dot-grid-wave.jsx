/* Component metadata only — the live demo and gallery preview live in
   dot-grid-wave-demo.jsx, the framework source texts and the prompt in
   dot-grid-wave-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "dot-grid-wave",
  name: "点阵波纹",
  href: "dot-grid-wave.html",
  title: "点阵波纹",
  description: "340×330 整齐点阵背景：光标经过的每个位置激起一圈圈涟漪，点被顶起、回落并绽放彩色后归位。",

  cardDescription: "光标激起点阵涟漪绽放。",

  demoHint: "移动光标看涟漪扩散。",



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
