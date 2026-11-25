/* Component metadata only — the live demo and gallery preview live in
   aurora-mesh-demo.jsx, the framework source texts and the prompt in
   aurora-mesh-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "aurora-mesh",
  name: "跟随光标的极光背景",
  href: "aurora-mesh.html",
  title: "跟随光标的极光背景",
  description: "340×340 深色天空：五团光斑缓慢漂移互相融合成极光；悬停时其中一团拖着光晕跟随光标缓慢流动，标题 Living background 与说明置于其上。",

  cardDescription: "五团光斑融合漂移，一团随光标。",

  demoHint: "移动光标看光斑跟随。",



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
