/* Component metadata only — the live demo and gallery preview live in
   a11y-panel-demo.jsx, the framework source texts and the prompt in
   a11y-panel-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "a11y-panel",
  name: "无障碍显示面板",
  href: "a11y-panel.html",
  title: "无障碍显示面板",
  description: "340×340 网站角落无障碍面板：点人形按钮展开显示设置；调大字号背后页面文字平滑放大，开高对比整页配色反转，Reset 复原。",

  cardDescription: "字号与高对比即时生效，可复原。",

  demoHint: "开面板调字号与高对比看页面变化，Reset 复原。",



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
