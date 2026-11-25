/* Component metadata only — the live demo and gallery preview live in
   word-cloud-demo.jsx, the framework source texts and the prompt in
   word-cloud-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "word-cloud",
  name: "月度词云重排",
  href: "word-cloud.html",
  title: "月度词云重排",
  description: "340×340 咖啡评论词云：词按提及频次定字号聚成云；1 月/4 月/7 月切换时词云打散重排到新位次与新字号，消失词淡出、新词淡入。",

  cardDescription: "切月份词云打散重排。",

  demoHint: "切三个月看词云重排。",



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
