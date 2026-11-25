/* Component metadata only — the live demo and gallery preview live in
   detail-side-panel-demo.jsx, the framework source texts and the prompt in
   detail-side-panel-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "detail-side-panel",
  name: "列表详情侧栏",
  href: "detail-side-panel.html",
  title: "列表详情侧栏",
  description: "340×340 CRM 场景：点客户列表行，详情侧板自右滑出且该行保持高亮；Prev/Next 在客户间切换，侧板含资料字段与联系按钮。",

  cardDescription: "行点击滑出详情侧栏，前后切换。",

  demoHint: "点行看侧栏，Prev/Next 切换客户。",



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
