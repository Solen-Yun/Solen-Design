/* Component metadata only — the live demo and gallery preview live in
   gradient-ring-cards-demo.jsx, the framework source texts and the prompt in
   gradient-ring-cards-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "gradient-ring-cards",
  name: "渐变卡片环形轮播",
  href: "gradient-ring-cards.html",
  title: "渐变卡片环形轮播",
  description:
    "五张柔和渐变竖卡组成的双面网格沿水平环形路径旋转，背面文字自然镜像、边缘纵向外翻并带青紫色散与横向拖影，卡面纹理由双三次插值加噪声实时生成，Three.js 逐顶点弯曲。",

  cardDescription: "五张渐变竖卡沿 3D 环旋转，背面文字镜像，边缘外翻带色散拖影。",

  demoHint: "拖动或点击卡片切换选中；速度调到 0 静止观察边缘畸变与背面镜像。",



  api: [
    { name: "active", type: "number", default: "—", description: "选中的卡片序号；受控更新不触发 onSelect" },
    { name: "autoRotate", type: "boolean", default: "—", description: "空闲时自动沿环旋转" },
    { name: "speed", type: "number", default: "1", description: "旋转速度倍率" },
    { name: "distortion", type: "number", default: "1", description: "边缘纵向外翻与色散的强度倍率" },
    { name: "onSelect", type: "(id) => void", default: "—", description: "点击卡片时回调卡片 id" },
    { name: "height", type: "number", default: "1024", description: "场景高度，逻辑像素；窄容器等比例缩放" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好" },
  ],
};
