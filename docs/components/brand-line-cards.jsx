/* Component metadata only — the live demo and gallery preview live in
   brand-line-cards-demo.jsx, the framework source texts and the prompt in
   brand-line-cards-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "brand-line-cards",
  name: "鼠标感应线条",
  href: "brand-line-cards.html",
  title: "鼠标感应线条",
  description:
    "Apple / Google / Tesla 三张竖线卡片：品牌 Logo 采样成亮度表，58 根竖线按四档线宽与缓慢下流噪声重建图形；指针划过线条弹簧散开、检测框随位置重选并连线标注，Reveal the source 弹出原生 dialog 可复制 SVG 路径。",

  cardDescription: "竖线重建的品牌 Logo，指针散开线条并驱动检测框连线。",

  demoHint: "移动指针看线条散开与检测框连线变化；点 Reveal the source 查看 SVG 路径并可复制；键盘聚焦同样触发检测框。",



  api: [
    { name: "height", type: "number", default: "720", description: "场景高度，逻辑像素；窄容器整画廊等比适配" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；停噪声与弹簧，仍绘制图形并响应焦点" },
  ],
};
