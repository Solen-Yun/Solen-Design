/* Component metadata only — the live demo and gallery preview live in
   population-pyramid-demo.jsx, the framework source texts and the prompt in
   population-pyramid-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "population-pyramid",
  name: "人口金字塔逐年",
  href: "population-pyramid.html",
  title: "人口金字塔逐年",
  description: "300×480 人口金字塔：五岁年龄组条形男女左右堆叠，1970-2070 逐年滚动，底部宽三角形逐渐变成顶部宽倒三角；中位年龄与 65+ 占比联动。",

  cardDescription: "金字塔逐年滚动老龄化。",

  demoHint: "拖年份看金字塔形变与指标。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "480",
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
