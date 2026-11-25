/* Component metadata only — the live demo and gallery preview live in
   conditional-contact-demo.jsx, the framework source texts and the prompt in
   conditional-contact-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "conditional-contact",
  name: "自适应联系表单",
  href: "conditional-contact.html",
  title: "自适应联系表单",
  description: "300×480 联系表单：顶部 Sales/Support/Partnership 胶囊滑动切换，下方字段按类型折叠展开（销售要公司名与团队规模、支持要问题位置与截图附件、合作要合作形式），提交出受理回执。",

  cardDescription: "按类型折叠字段，提交出回执。",

  demoHint: "切三个类型看字段变化，提交看回执。",



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
