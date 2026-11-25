/* Component metadata only — the live demo and gallery preview live in
   particle-network-demo.jsx, the framework source texts and the prompt in
   particle-network-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "particle-network",
  name: "光标星座网格",
  href: "particle-network.html",
  title: "光标星座网格",
  description: "340×330 深空粒子：漂移的圆点在彼此靠近时连出淡线织成星座网；光标也是一个节点，连向邻近的点并轻微吸引它们。",

  cardDescription: "粒子近距连线织网，光标入网。",

  demoHint: "移动光标看连线与吸引。",



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
