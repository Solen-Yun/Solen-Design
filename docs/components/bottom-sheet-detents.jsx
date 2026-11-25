/* Component metadata only — the live demo and gallery preview live in
   bottom-sheet-detents-demo.jsx, the framework source texts and the prompt in
   bottom-sheet-detents-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "bottom-sheet-detents",
  name: "三档底部抽屉",
  href: "bottom-sheet-detents.html",
  title: "三档底部抽屉",
  description: "300×500 地图咖啡场景：底部抽屉拖动跟手，松手按速度吸附到收起/半开/全开三档之一（弹簧过渡）；全开显示 8 家咖啡馆列表可搜索。",

  cardDescription: "拖动跟手按速度吸附三档。",

  demoHint: "拖抽屉感受三档吸附，全开搜索。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "500",
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
