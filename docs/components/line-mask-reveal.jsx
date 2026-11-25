/* Component metadata only — the live demo and gallery preview live in
   line-mask-reveal-demo.jsx, the framework source texts and the prompt in
   line-mask-reveal-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "line-mask-reveal",
  name: "逐行揭示标语",
  href: "line-mask-reveal.html",
  title: "逐行揭示标语",
  description: "340×330 营销标语场景：标题行逐行从遮罩下方滑入，最后一行落定后手绘下划线描出；Replay 重播整段。",

  cardDescription: "标语逐行滑入，下划线手绘描出。",

  demoHint: "看逐行滑入与下划线描画；点 Replay 重播。",



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
