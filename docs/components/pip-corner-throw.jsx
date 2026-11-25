/* Component metadata only — the live demo and gallery preview live in
   pip-corner-throw-demo.jsx, the framework source texts and the prompt in
   pip-corner-throw-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "pip-corner-throw",
  name: "画中画角抛",
  href: "pip-corner-throw.html",
  title: "画中画角抛",
  description: "300×500 视频页：点最小化后播放器缩成小窗沿弹簧轨迹飞向右下角并吸附，下方列表上滑补位；再点小窗恢复大窗。",

  cardDescription: "播放器弹簧飞向右下角吸附。",

  demoHint: "点最小化看飞入右下，再点恢复。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "500",
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
