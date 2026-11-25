/* Component metadata only — the live demo and gallery preview live in
   waitlist-position-demo.jsx, the framework source texts and the prompt in
   waitlist-position-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "waitlist-position",
  name: "候位邀请排名",
  href: "waitlist-position.html",
  title: "候位邀请排名",
  description: "340×340 Beta 候位卡：输入邮箱激活 Join，按下后按钮短暂旋转、卡片翻面显示候位 #1,024；每邀一位好友前进 100 位（计数滚动），复制链接可分享。",

  cardDescription: "翻面看候位排名，邀请前进百位。",

  demoHint: "输入邮箱 Join，看排名与邀请前进。",



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
