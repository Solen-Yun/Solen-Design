/* Component metadata only — the live demo and gallery preview live in
   dot-matrix-trio-demo.jsx, the framework source texts and the prompt in
   dot-matrix-trio-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "dot-matrix-trio",
  name: "点阵波纹与旋涡",
  href: "dot-matrix-trio.html",
  title: "点阵波纹与旋涡",
  description:
    "渐变背景上三张印刷风卡片各带一块实时 Canvas 点阵——同心波、八臂旋涡、扩张圆盘，共享同一累计时间，点击暂停/继续、Home/Escape 重置、方向键按 1/30 秒单步。",

  cardDescription: "三块实时 Canvas 点阵：双色同心波、八臂旋涡、扩张圆盘，共享同一时间轴。",

  demoHint: "点击任一张卡片暂停/继续三块；Home 或 Escape 重置；左右方向键暂停并按 1/30 秒单步。",



  api: [
    { name: "height", type: "number", default: "540", description: "场景高度，逻辑像素；窄容器整场景等比缩放" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；只画静态帧，方向键仍可单步" },
  ],
};
