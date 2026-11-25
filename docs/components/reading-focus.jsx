/* Component metadata only — the live demo and gallery preview live in
   reading-focus-demo.jsx, the framework source texts and the prompt in
   reading-focus-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "reading-focus",
  name: "阅读聚焦句",
  href: "reading-focus.html",
  title: "阅读聚焦句",
  description: "340×340 阅读模式：光标下的句子保持清晰、其余变淡；左侧竖向进度条滑到当前句并随句长伸缩；键盘 ↑↓ 或点击换句，Focus off 关闭。",

  cardDescription: "当前句清晰其余变淡，左条跟随。",

  demoHint: "移动光标或点句子换焦点。",



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
