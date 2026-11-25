/* Component metadata only — the live demo and gallery preview live in
   split-curtain-menu-demo.jsx, the framework source texts and the prompt in
   split-curtain-menu-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "split-curtain-menu",
  name: "分帘菜单文字",
  href: "split-curtain-menu.html",
  title: "分帘菜单文字",
  description: "340×330 大字导航：悬停菜单词时文字水平分裂——上半上滑、下半下滑，缝隙中展开一行说明；点击进入对应链接视觉反馈。",

  cardDescription: "菜单词上下分帘露出说明。",

  demoHint: "悬停 WORK/ABOUT/CONTACT 看分帘。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "330",
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
