/* Component metadata only — the live demo and gallery preview live in
   team-invite-demo.jsx, the framework source texts and the prompt in
   team-invite-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "team-invite",
  name: "团队成员邀请流",
  href: "team-invite.html",
  title: "团队成员邀请流",
  description: "340×340 工作区成员设置：输入邮箱、选角色、点 Invite，成员列表顶部推入新行（Pending 闪烁、时钟图标），接受后转正式成员。",

  cardDescription: "邀请推入 Pending 行，接受转正。",

  demoHint: "邀请一个邮箱看 Pending 行，点勾接受。",



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
