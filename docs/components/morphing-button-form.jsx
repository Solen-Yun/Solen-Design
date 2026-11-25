/* Component metadata only — the live demo and gallery preview live in
   morphing-button-form-demo.jsx, the framework source texts and the prompt in
   morphing-button-form-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "morphing-button-form",
  name: "按钮变形订阅表单",
  href: "morphing-button-form.html",
  title: "按钮变形订阅表单",
  description: "340×260 newsletter 场景：Get the newsletter 按钮横向拉伸变成邮箱输入 + 发送钮；提交后整体收缩成圆形成功勾，再点 Try again 复原。",

  cardDescription: "按钮拉伸成表单，提交缩成成功勾。",

  demoHint: "点按钮变表单，提交看成功勾，Try again 复原。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "260",
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
