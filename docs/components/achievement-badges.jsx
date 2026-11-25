/* Component metadata only — the live demo and gallery preview live in
   achievement-badges-demo.jsx, the framework source texts and the prompt in
   achievement-badges-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "achievement-badges",
  name: "解锁成就徽章",
  href: "achievement-badges.html",
  title: "解锁成就徽章",
  description: "340×340 成就墙：六枚徽章中未解锁的为灰盘挂锁与进度条；按 Unlock 下一枚翻面点亮——扫光、弹跳与彩色化，进度条同步前进。",

  cardDescription: "逐枚翻面点亮成就徽章。",

  demoHint: "连按 Unlock 点亮徽章。",



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
