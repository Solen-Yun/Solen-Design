/* Component metadata only — the live demo and gallery preview live in
   direction-aware-tiles-demo.jsx, the framework source texts and the prompt in
   direction-aware-tiles-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "direction-aware-tiles",
  name: "入边方向浮层",
  href: "direction-aware-tiles.html",
  title: "入边方向浮层",
  description: "340×340 作品九宫格：光标从哪条边进入瓷砖，说明浮层就从那条边滑入覆盖；从顶部进入自上滑入，以此类推；移出按离开边方向滑出。",

  cardDescription: "浮层按进入边方向滑入。",

  demoHint: "从不同边进入瓷砖看浮层方向。",



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
