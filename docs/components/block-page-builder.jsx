/* Component metadata only — the live demo and gallery preview live in
   block-page-builder-demo.jsx, the framework source texts and the prompt in
   block-page-builder-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "block-page-builder",
  name: "堆块页面生成器",
  href: "block-page-builder.html",
  title: "堆块页面生成器",
  description: "340×340 页面生成器：左列块清单（Hero/Features/Pricing/Testimonials/Footer），点按后该块线框在画布上展开堆叠，块可上移下移重排，画布实时重排。",

  cardDescription: "点块堆页，可重排实时刷新。",

  demoHint: "点几个块堆页面，用上下键重排。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "340",
    "description": "场景高度，逻辑像素；窄容器整景按比例缩小"
  },
  {
    "name": "reducedMotion",
    "type": "boolean",
    "default": "跟随系统",
    "description": "覆盖系统的减少动态偏好"
  }
],
};
