/* Component metadata only — the live demo and gallery preview live in
   infinite-feed-demo.jsx, the framework source texts and the prompt in
   infinite-feed-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "infinite-feed",
  name: "无限追加信息流",
  href: "infinite-feed.html",
  title: "无限追加信息流",
  description: "340×350 信息流：滚到底部出现三点跳动加载器，随后新卡逐张自下浮起入列；滚回顶部出现 Back to top 浮标点击回顶。",

  cardDescription: "触底加载新卡逐张浮起。",

  demoHint: "滚到底看加载与新卡，回顶浮标。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "350",
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
