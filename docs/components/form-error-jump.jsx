/* Component metadata only — the live demo and gallery preview live in
   form-error-jump-demo.jsx, the framework source texts and the prompt in
   form-error-jump-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "form-error-jump",
  name: "报错跳转表单",
  href: "form-error-jump.html",
  title: "报错跳转表单",
  description: "300×480 注册表单：提交后顶部落下「4 fields need attention」摘要条，错误字段红描线摇头，点摘要项或字段自动滚动聚焦到对应输入框。",

  cardDescription: "提交后摘要落下，错误字段摇头并跳转。",

  demoHint: "直接点注册看摘要与错误标记；点摘要项跳转。",



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
