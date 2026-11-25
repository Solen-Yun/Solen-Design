/* Component metadata only — the live demo and gallery preview live in
   collection-layout-morph-demo.jsx, the framework source texts and the prompt in
   collection-layout-morph-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "collection-layout-morph",
  name: "列表卡片堆叠切换",
  href: "collection-layout-morph.html",
  title: "列表卡片堆叠切换",
  description:
    "三枚按钮把同一组图像在列表、并排卡片、叠放三种布局间切换，同一组 DOM 节点的位置、尺寸、圆角与旋转由 GSAP 连续过渡，标签用 tablist 语义配方向键与 Home/End。",

  cardDescription: "三枚按钮把同一组图像在列表、卡片、叠放之间连续变形。",

  demoHint: "点 List view / Card view / Pack view 切换布局；方向键在标签间循环，Home/End 跳到首末。",



  api: [
    { name: "view", type: '"list" | "card" | "pack"', default: '"list"', description: "初始与外部指定的布局；省略时保持组件内部当前布局" },
    { name: "height", type: "number", default: "720", description: "场景高度，逻辑像素；窄容器整场景等比缩放" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；图像、灰条与指示胶囊直接到目标值" },
  ],
};
