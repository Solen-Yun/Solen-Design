/* Component metadata only — the live demo and gallery preview live in
   ai-brand-cover-cards-demo.jsx, the framework source texts and the prompt in
   ai-brand-cover-cards-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "ai-brand-cover-cards",
  name: "AI 品牌封面三联卡片",
  href: "ai-brand-cover-cards.html",
  title: "AI 品牌封面三联卡片",
  description:
    "Claude、Codex、Cursor 三张 3:5 竖版封面卡以真实 DOM 图片、内联 SVG 标志与中文正文分层叠加，悬停背景缓放、点击切换选中，键盘方向键循环移焦。",

  cardDescription: "三张 AI 品牌竖版封面，悬停微缩放，品牌标志与中文正文分层叠加。",

  demoHint: "移动指针或用 Tab 聚焦看背景微缩放；点击或 Enter 选中卡片，左右箭头循环移焦，Escape 清空。",



  api: [
    { name: "images", type: "(string | { src, alt?, position? })[]", default: "内嵌三张封面", description: "按顺序替换三张背景图；object-fit:cover 居中裁切" },
    { name: "description", type: "string", default: "各卡默认文案", description: "统一替换三张卡的正文；逐卡定制由 images 之外的调用方自行分层" },
    { name: "logoSrc", type: "string", default: "内嵌字标", description: "替换卡片中央的品牌字标图源" },
    { name: "symbolSrc", type: "string", default: "内嵌小标", description: "替换左上角的 18×18 品牌小标图源" },
    { name: "height", type: "number", default: "675", description: "场景高度，逻辑像素；窄容器整场景等比缩放" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；立即更新并保持图片比例 1" },
  ],
};
