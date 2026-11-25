/* Component metadata only — the live demo and gallery preview live in
   status-page-demo.jsx, the framework source texts and the prompt in
   status-page-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "status-page",
  name: "服务状态页",
  href: "status-page.html",
  title: "服务状态页",
  description: "340×340 服务状态页：All systems operational 与绿色脉冲并排，API/Dashboard/Payments/Webhooks 各行 90 天 uptime 柱状图，悬停某天柱高亮显示日期与数值。",

  cardDescription: "90 天 uptime 柱状图逐行展示。",

  demoHint: "悬停柱状图看当日数值。",



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
