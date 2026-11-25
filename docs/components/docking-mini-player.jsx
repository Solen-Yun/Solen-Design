/* Component metadata only — the live demo and gallery preview live in
   docking-mini-player-demo.jsx, the framework source texts and the prompt in
   docking-mini-player-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "docking-mini-player",
  name: "滚动停靠迷你播放器",
  href: "docking-mini-player.html",
  title: "滚动停靠迷你播放器",
  description: "300×480 播客页面场景：顶部大播放器按下播放后声条起舞、进度条推进；向下滚动到大播放器离场时，迷你播放器吸附在底部继续显示进度，点击可回到大播放器。",

  cardDescription: "播放后滚动，迷你播放器吸附底部继续。",

  demoHint: "点播放看声条舞动，再往下滚看迷你播放器吸附。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "480",
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
