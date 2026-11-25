/* Component metadata only — the live demo and gallery preview live in
   bar-chart-race-demo.jsx, the framework source texts and the prompt in
   bar-chart-race-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "bar-chart-race",
  name: "排名互换条形赛",
  href: "bar-chart-race.html",
  title: "排名互换条形赛",
  description: "340×340 数据动效场景：八年饮品销量条形赛，条增长时向上滑动与上一名换位；拖动时间轴 scrub 八年数据，条形换位带平滑动画。",

  cardDescription: "条形随销量增长互换排名，时间轴可拖。",

  demoHint: "拖时间轴看八年排名互换。",



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
