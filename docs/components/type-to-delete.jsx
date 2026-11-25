/* Component metadata only — the live demo and gallery preview live in
   type-to-delete-demo.jsx, the framework source texts and the prompt in
   type-to-delete-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "type-to-delete",
  name: "输入名删确认",
  href: "type-to-delete.html",
  title: "输入名删确认",
  description: "340×340 项目危险区场景：Delete 弹出警告对话框，必须准确输入项目名 my-landing 才激活永久删除；确认后显示空工作台与撤销条。",

  cardDescription: "输入项目名解锁永久删除，可撤销。",

  demoHint: "点 Delete，输入 my-landing 确认删除，再撤销。",



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
