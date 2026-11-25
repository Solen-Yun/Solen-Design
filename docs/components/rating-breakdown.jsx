/* Component metadata only — the live demo and gallery preview live in
   rating-breakdown-demo.jsx, the framework source texts and the prompt in
   rating-breakdown-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "rating-breakdown",
  name: "星级分布筛选",
  href: "rating-breakdown.html",
  title: "星级分布筛选",
  description: "340×340 商品评价摘要：均分按小数填满星条，5→1 星分布条按占比生长；点任一星级行筛选下方评论列表并高亮该行。",

  cardDescription: "点星级行筛选评论，分布条生长。",

  demoHint: "点 3 星行看筛选与高亮。",



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
