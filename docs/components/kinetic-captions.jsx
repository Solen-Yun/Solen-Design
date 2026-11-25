/* Component metadata only — the live demo and gallery preview live in
   kinetic-captions-demo.jsx, the framework source texts and the prompt in
   kinetic-captions-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "kinetic-captions",
  name: "逐词动态字幕",
  href: "kinetic-captions.html",
  title: "逐词动态字幕",
  description: "340×340 视频字幕场景：按 Play 后字幕逐词按语音节拍弹入，关键词先胀大再落回定色；整句结束淡出进入下一句；设计回顾 02 标题固定。",

  cardDescription: "字幕逐词按节拍弹入。",

  demoHint: "点 Play 看逐词字幕。",



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
