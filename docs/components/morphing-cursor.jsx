/* Component metadata only — the live demo and gallery preview live in
   morphing-cursor-demo.jsx, the framework source texts and the prompt in
   morphing-cursor-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "morphing-cursor",
  name: "目标形变光标",
  href: "morphing-cursor.html",
  title: "目标形变光标",
  description: "340×340 文章页：圆形光标以弹簧跟随光标，移到按钮上拉伸包住按钮形状（圆角矩形），移到文字上细化为竖条 I 形；离开复位。",

  cardDescription: "光标弹簧跟随，包住按钮细成竖条。",

  demoHint: "把光标移到按钮和文字上看形变。",



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
