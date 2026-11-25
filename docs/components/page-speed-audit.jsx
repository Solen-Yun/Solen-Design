/* Component metadata only — the live demo and gallery preview live in
   page-speed-audit-demo.jsx, the framework source texts and the prompt in
   page-speed-audit-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "page-speed-audit",
  name: "胶片式测速审计",
  href: "page-speed-audit.html",
  title: "胶片式测速审计",
  description: "340×340 性能审计场景：Run audit 后下方胶片逐帧展示页面从空白到骨架到完成的自绘过程，时间标记推进，指标（LCP 等）数字滚动出现。",

  cardDescription: "胶片逐帧回放页面绘制与指标。",

  demoHint: "点 Run audit 看逐帧绘制与指标。",



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
