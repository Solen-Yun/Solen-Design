/* Component metadata only — the live demo and gallery preview live in
   photo-trail-demo.jsx, the framework source texts and the prompt in
   photo-trail-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "photo-trail",
  name: "照片拖尾",
  href: "photo-trail.html",
  title: "照片拖尾",
  description: "340×340 编辑感场景：光标移动时沿途每隔一段落下一张小幅照片，轻微倾斜堆叠片刻后缩小消失；移动越快撒得越密。",

  cardDescription: "光标沿途撒照片，堆叠后消散。",

  demoHint: "快速移动光标看照片拖尾。",



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
