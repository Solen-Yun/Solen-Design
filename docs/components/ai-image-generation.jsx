/* Component metadata only — the live demo and gallery preview live in
   ai-image-generation-demo.jsx, the framework source texts and the prompt in
   ai-image-generation-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "ai-image-generation",
  name: "点阵加载",
  href: "ai-image-generation.html",
  title: "点阵加载",
  description:
    "AI 生图等待动效：420px 圆角卡片里 20×20 点阵固定在网格上，两个焦点按正弦轨迹游走，附近点按距离幂次加亮放大（scale .333→.65、灰度加深），Bayer 式克制呼吸；标题圆点 1.5s 呼吸，离屏暂停、卸载取消 RAF，减少动态保留一帧静态点阵。",

  cardDescription: "20×20 点阵随双焦点游走加亮放大，AI 生图等待动效。",

  demoHint: "看两个看不见的焦点带着点阵呼吸明暗；开启减少动态保留一帧静态点阵。",



  api: [
    { name: "height", type: "number", default: "560", description: "场景高度，逻辑像素；窄容器整场景等比缩放" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；保留一帧静态点阵与标题" },
  ],
};
