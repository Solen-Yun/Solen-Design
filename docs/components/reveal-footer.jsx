/* Component metadata only — the live demo and gallery preview live in
   reveal-footer-demo.jsx, the framework source texts and the prompt in
   reveal-footer-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "reveal-footer",
  name: "卷帘揭示页脚",
  href: "reveal-footer.html",
  title: "卷帘揭示页脚",
  description: "300×480 页面滚动到底：内容层像卷帘一样上抬，露出固定在底下的深色页脚；页脚随揭示幅度轻微放大，含newsletter订阅表单（提交有成功反馈）。",

  cardDescription: "滚动到底卷帘揭示深色页脚。",

  demoHint: "滚到底看页脚揭示与订阅反馈。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "480",
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
