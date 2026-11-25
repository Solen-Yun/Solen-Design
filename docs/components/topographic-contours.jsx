/* Component metadata only — the live demo and gallery preview live in
   topographic-contours-demo.jsx, the framework source texts and the prompt in
   topographic-contours-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "topographic-contours",
  name: "呼吸等高线",
  href: "topographic-contours.html",
  title: "呼吸等高线",
  description: "340×330 等高线地形：Canvas 缓慢呼吸的地形等高线；悬停光标处隆起一座山、线条绕它成环；按住再隆起一座形成山脊。",

  cardDescription: "等高线呼吸，光标处隆起成山。",

  demoHint: "移动光标看隆起，按住加一座。",



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
