/* Component metadata only — the live demo and gallery preview live in
   regrouping-bubbles-demo.jsx, the framework source texts and the prompt in
   regrouping-bubbles-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "regrouping-bubbles",
  name: "预算气泡重排",
  href: "regrouping-bubbles.html",
  title: "预算气泡重排",
  description:
    "340×340 Canvas 气泡聚类图：36 个按预算定径的项目气泡先挤成一团，切 All / By team / By status 即加随机冲击后按弹簧—阻尼物理散开、聚成新组，组名胶囊与预算总额跟随质心移动；悬停气泡描环并压暗其余，弹出的深色 tooltip 给出团队、状态与预算。帧循环动能归零即休眠，滚出视口自动暂停；减少动态直接落位到最终聚簇。",

  cardDescription: "切 Tab 气泡散开重聚成组，组名与总额随行，悬停看明细。",

  demoHint: "切上方三个 Tab 看气泡重新聚类，再悬停任意气泡看团队、状态与预算；动画结束即休眠不占帧。",



  api: [
    { name: "height", type: "number", default: "340", description: "场景高度，逻辑像素；窄容器整景按比例缩小" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；直接落位到最终聚簇" },
  ],
};
