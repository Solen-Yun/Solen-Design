/* Component metadata only — the live demo and gallery preview live in
   spoiler-reveal-demo.jsx, the framework source texts and the prompt in
   spoiler-reveal-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "spoiler-reveal",
  name: "剧透刮开",
  href: "spoiler-reveal.html",
  title: "剧透刮开",
  description: "340×330 聊天剧透：剧透短语覆盖着闪光沙粒，点按处沙粒向外散射露出文字；跨行短语从点击点向两侧揭开；Cover again 重盖。",

  cardDescription: "沙粒散射揭剧透，可重盖。",

  demoHint: "点剧透短语看揭开，Cover again 重盖。",



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
