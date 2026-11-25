/* Component metadata only — the live demo and gallery preview live in
   trending-search-roll-demo.jsx, the framework source texts and the prompt in
   trending-search-roll-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "trending-search-roll",
  name: "滚动热搜榜",
  href: "trending-search-roll.html",
  title: "滚动热搜榜",
  description: "340×340 商店搜索框下：单行每几秒滚动到下一条实时热搜，带 ↑/↓/NEW 标记与排名数字；点某条填入搜索框。",

  cardDescription: "热搜单行滚动，带涨跌标记。",

  demoHint: "看热搜滚动轮换，点击填入。",



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
