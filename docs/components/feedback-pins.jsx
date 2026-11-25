/* Component metadata only — the live demo and gallery preview live in
   feedback-pins-demo.jsx, the framework source texts and the prompt in
   feedback-pins-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "feedback-pins",
  name: "页面反馈图钉",
  href: "feedback-pins.html",
  title: "页面反馈图钉",
  description: "340×340 站点预览批注：开 Comment mode 后光标变十字准星，页面任意处点击落下编号图钉（弹跳入场）并展开评论框；输入保存后图钉保留，点图钉展开气泡。",

  cardDescription: "点哪钉哪，编号图钉带评论。",

  demoHint: "开 Comment mode 点两处落钉写评论。",



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
