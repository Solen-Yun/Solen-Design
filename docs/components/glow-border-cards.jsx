/* Component metadata only — the live demo and gallery preview live in
   glow-border-cards-demo.jsx, the framework source texts and the prompt in
   glow-border-cards-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "glow-border-cards",
  name: "光标辉光卡边",
  href: "glow-border-cards.html",
  title: "光标辉光卡边",
  description: "340×340 深色页面四张特性卡：光标移动时以光标为中心的柔和辉光沿卡片描边扩散，卡面轻微提亮；光标离开渐隐。",

  cardDescription: "辉光沿卡边随光标扩散，卡面微亮。",

  demoHint: "光标扫过四张卡看辉光沿边移动。",



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
