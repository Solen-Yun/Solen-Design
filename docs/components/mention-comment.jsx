/* Component metadata only — the live demo and gallery preview live in
   mention-comment-demo.jsx, the framework source texts and the prompt in
   mention-comment-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "mention-comment",
  name: "评论 @ 提及列表",
  href: "mention-comment.html",
  title: "评论 @ 提及列表",
  description: "340×340 评论协作场景：输入 @ 在光标下方弹出队友列表，继续输入按名字过滤（匹配字母加粗），方向键选择、Enter 确认插入提及胶囊；发送后评论带上提及。",

  cardDescription: "@ 弹出队友列表，过滤加粗选择。",

  demoHint: "输入 @ 看列表，@lu 过滤，Enter 插入，发送看评论。",



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
