/* Component metadata only — the live demo and gallery preview live in
   product-hotspots-demo.jsx, the framework source texts and the prompt in
   product-hotspots-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "product-hotspots",
  name: "产品热点标注",
  href: "product-hotspots.html",
  title: "产品热点标注",
  description:
    "340×340 商品展示卡：正面耳机插画由 SVG 部件拼成，悬停图钉时虚线垂直引出注释卡，被标注的部件发光、其余压暗——麦克风热点声波漂移、耳垫热点呼吸提亮、表冠热点竖纹转动。底部五个色点切换耳机配色，SVG 渐变自然混色、颜色名垂直滚动换字，选中色点弹入描线环。减少动态时循环动画关闭、状态直接落位。",

  cardDescription: "悬停耳机图钉虚线引出注释，色点切换配色自然混色。",

  demoHint: "悬停或聚焦四个图钉看注释与部件反馈，再点底部色点换配色；色点上可用方向键循环换色。",



  api: [
    { name: "height", type: "number", default: "340", description: "场景高度，逻辑像素；窄容器整景按比例缩小" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；循环动画关闭，状态直接落位" },
  ],
};
