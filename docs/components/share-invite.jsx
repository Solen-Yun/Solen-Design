/* Component metadata only — the live demo and gallery preview live in
   share-invite-demo.jsx, the framework source texts and the prompt in
   share-invite-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "share-invite",
  name: "分享邀请面板",
  href: "share-invite.html",
  title: "分享邀请面板",
  description:
    "Share & Invite 面板与收起胶囊是同一个 DOM 的连续形变：邮箱标签、角色弹层、成员列表、Copy link 与流式发送状态齐全；标题按钮在展开与收起两态间弹簧迁移，标签到头像有落位动画，locale 可切 en/zh，键盘、aria、减少动态与多实例齐全。",

  cardDescription: "分享面板与收起胶囊同一外壳连续形变，邀请流程完整。",

  demoHint: "输入邮箱按 Enter 生成标签，发送后标签飞入成员列表；点 Share 收起/展开看同一按钮的弹簧迁移；Escape 收起。",



  api: [
    { name: "locale", type: '"en" | "zh"', default: '"en"', description: "面板文案语言" },
    { name: "height", type: "number", default: "500", description: "场景最小高度，逻辑像素；375px 下面板按容器宽度收缩" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；保留全部状态，移除长位移" },
  ],
};
