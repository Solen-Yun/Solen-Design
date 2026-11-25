/* Component metadata only — the live demo and gallery preview live in
   integration-orbit-demo.jsx, the framework source texts and the prompt in
   integration-orbit-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "integration-orbit",
  name: "环绕集成轨道",
  href: "integration-orbit.html",
  title: "环绕集成轨道",
  description: "340×340 集成区：中央产品 logo，邮件、日历、支付等工具图标沿内外两圈缓慢环绕；悬停某图标显示名称并整体减速，点击弹简介气泡。",

  cardDescription: "工具图标双轨环绕，悬停减速出简介。",

  demoHint: "悬停图标看名称与减速，点击看简介。",



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
