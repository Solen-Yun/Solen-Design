/* Component metadata only — the live demo and gallery preview live in
   sticky-stack-cards-demo.jsx, the framework source texts and the prompt in
   sticky-stack-cards-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "sticky-stack-cards",
  name: "滚动收缩卡堆",
  href: "sticky-stack-cards.html",
  title: "滚动收缩卡堆",
  description: "300×500 滚动特性叙事：每张卡滚到顶部吸附定位，下一张滑上来时底下那张缩小、变暗、后退，最后一张落定后结束。",

  cardDescription: "滚动吸附卡堆，旧卡缩小变暗后退。",

  demoHint: "纵向滚动场景看卡堆逐张吸附收缩。",



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
