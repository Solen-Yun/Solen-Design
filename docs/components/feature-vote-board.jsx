/* Component metadata only — the live demo and gallery preview live in
   feature-vote-board-demo.jsx, the framework source texts and the prompt in
   feature-vote-board-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "feature-vote-board",
  name: "投票重排需求板",
  href: "feature-vote-board.html",
  title: "投票重排需求板",
  description: "340×340 功能需求板：点条目左侧箭头，票数滚 +1 并漂浮 +1；票数越过上一名时两行平滑换位。底部 Suggest 按钮可新增一行。",

  cardDescription: "投票 +1 浮动，越位行平滑换位。",

  demoHint: "点箭头投票看换位，加一条新需求。",



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
