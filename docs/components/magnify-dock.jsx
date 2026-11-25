/* Component metadata only — the live demo and gallery preview live in
   magnify-dock-demo.jsx, the framework source texts and the prompt in
   magnify-dock-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "magnify-dock",
  name: "光标放大程序坞",
  href: "magnify-dock.html",
  title: "光标放大程序坞",
  description: "340×340 桌面场景底部一排 macOS 风格应用图标：光标靠近时图标按距离放大并抬升，相邻图标自动让位，点击弹出应用名提示。",

  cardDescription: "Dock 图标随光标距离放大抬升，邻居自动让位。",

  demoHint: "把光标沿 Dock 横向扫过看图标放大让位，点击图标看名称气泡。",



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
