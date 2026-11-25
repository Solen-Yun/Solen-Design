/* Component metadata only — the live demo and gallery preview live in
   crumpled-paper-demo.jsx, the framework source texts and the prompt in
   crumpled-paper-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "crumpled-paper",
  name: "揉皱纸张展开",
  href: "crumpled-paper.html",
  title: "揉皱纸张展开",
  description:
    "三张揉皱的米白纸团悬停展开成手写信、蓝色山景照片和印刷信：多尺度折痕高度场、哑光高光、薄纸卷边与真实轮廓软影，同一三角网格连续形变可随时反向；键盘、触屏、aria 语义与减少动态齐全，纸面图案全部内嵌生成、离线可用。",

  cardDescription: "三张纸团悬停展开成信、山景照片与印刷信，折痕与卷边真实。",

  demoHint: "悬停或 Tab 聚焦展开单张纸，移开收回；左右箭头循环、Enter 切换、Escape 收起；展开中途移出可随时反向。",



  api: [
    { name: "height", type: "number", default: "800", description: "场景高度，逻辑像素；窄容器整场景等比缩放" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；直接绘制目标状态，交互保留" },
  ],
};
