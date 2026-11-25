/* Component metadata only — the live demo and gallery preview live in
   level-up-xp-demo.jsx, the framework source texts and the prompt in
   level-up-xp-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "level-up-xp",
  name: "经验条升级",
  href: "level-up-xp.html",
  title: "经验条升级",
  description: "340×340 游戏化经验条：点活动按钮弹出 +XP 数字飞入经验条，条微光充填；满格时 LEVEL UP! 徽章弹出、条清空进入下一级。",

  cardDescription: "+XP 飞入充填，满格升级。",

  demoHint: "连点活动看升级。",



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
