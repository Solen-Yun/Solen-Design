/* Component metadata only — the live demo and gallery preview live in
   brand-poster-cards-demo.jsx, the framework source texts and the prompt in
   brand-poster-cards-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "brand-poster-cards",
  name: "品牌海报三联卡片",
  href: "brand-poster-cards.html",
  title: "品牌海报三联卡片",
  description:
    "纯白场景里三张竖向海报共享角标、字标与正文，悬停或聚焦时只有背景照片缓放到 1.035，Enter/Space 切换选中、方向键移焦，图片与文字都可替换且无需重新挂载。",

  cardDescription: "三张竖向海报共用一个字标，悬停时只有背景照片轻微放大。",

  demoHint: "悬停或聚焦任一张海报看背景轻微放大；点击或按 Enter/Space 切换选中态，方向键在三张之间移动，Escape 取消。",



  api: [
    { name: "images", type: "(string | { src; alt?; position? })[]", default: "三张内嵌壁纸", description: "三张海报照片；每项可给 alt 与 object-position" },
    { name: "description", type: "string", default: "品牌默认正文", description: "三张卡片共用的底部正文" },
    { name: "logoSrc", type: "string", default: "品牌默认字标", description: "卡片中央的完整字标图片" },
    { name: "symbolSrc", type: "string", default: "品牌默认符号", description: "卡片左上角的小标志图片" },
    { name: "height", type: "number", default: "675", description: "场景高度，逻辑像素；空间不足时整组等比缩小" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；照片立即回到 scale 1，焦点与选中仍可用" },
  ],
};
