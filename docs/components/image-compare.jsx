/* Component metadata only — the live demo and gallery preview live in
   image-compare-demo.jsx, the framework source texts and the prompt in
   image-compare-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "image-compare",
  name: "弹性图片对比",
  href: "image-compare.html",
  title: "弹性图片对比",
  description:
    "同一画面的黑白与彩色左右对比，拖动时对比线像弹簧一样沿同一条二次曲线弯曲，快甩滑到边缘、慢拖停在释放点，方向键 10% 步进，黑白层由彩色图实时生成。",

  cardDescription: "拖动弯曲对比线，快甩滑到边缘，黑白与彩色始终同一条曲线。",

  demoHint: "拖动或点按画面移动对比线，快甩滑到两端；方向键 10%，Home/End 到两端。",



  api: [
    { name: "labels", type: "boolean", default: "true", description: "显示 Before / After 标签，靠近各自边缘时淡出" },
    { name: "corner", type: "number", default: "20", description: "图片框圆角（px），clamp 0–28" },
    { name: "beforeSrc", type: "string", default: "由彩色图生成灰度", description: "替换左层图源；未指定时从彩色图实时生成 grayscale(1) brightness(.77)" },
    { name: "afterSrc", type: "string", default: "内嵌默认图", description: "替换右层彩色图源" },
    { name: "height", type: "number", default: "360", description: "场景高度，逻辑像素" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；开启时立即定位并保持线直" },
  ],
};
