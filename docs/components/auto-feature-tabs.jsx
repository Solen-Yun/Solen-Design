/* Component metadata only — the live demo and gallery preview live in
   auto-feature-tabs-demo.jsx, the framework source texts and the prompt in
   auto-feature-tabs-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "auto-feature-tabs",
  name: "自动轮播功能页签",
  href: "auto-feature-tabs.html",
  title: "自动轮播功能页签",
  description: "340×340 落地页功能页签组：每隔几秒自动切到下一个页签，当前页签下方的进度条充填剩余时间；切换时右侧预览面板内容同步更换；悬停或聚焦时暂停自动轮播。",

  cardDescription: "页签定时自动切换，进度条倒计时，悬停暂停。",

  demoHint: "看页签自动切换与进度条充填；悬停暂停，点击页签手动切换。",



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
