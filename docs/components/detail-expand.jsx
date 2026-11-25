/* Component metadata only — the live demo and gallery preview live in
   detail-expand-demo.jsx, the framework source texts and the prompt in
   detail-expand-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "detail-expand",
  name: "商品详情展开",
  href: "detail-expand.html",
  title: "商品详情展开",
  description: "300×480 商品页详情：长详情只显示部分并在底部渐隐，Show more 平滑展开全高；Show less 收回。",

  cardDescription: "详情展开收回带渐隐提示。",

  demoHint: "点 Show more 展开，Show less 收回。",



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
