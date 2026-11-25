/* Component metadata only — the live demo and gallery preview live in
   avatar-stack-join-demo.jsx, the framework source texts and the prompt in
   avatar-stack-join-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "avatar-stack-join",
  name: "报名头像堆叠",
  href: "avatar-stack-join.html",
  title: "报名头像堆叠",
  description: "340×340 线上研讨会报名卡：每隔几秒一枚新头像从堆叠前沿弹入并把其余头像挤开，报名计数随之上涨；悬停显示完整名单。星星、徽章与光圈点缀。",

  cardDescription: "新头像定时弹入堆叠，计数上涨，悬停看名单。",

  demoHint: "停留几秒看头像不断弹入、计数上涨；悬停卡片看细节。",



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
