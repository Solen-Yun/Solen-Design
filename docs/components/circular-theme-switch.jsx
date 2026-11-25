/* Component metadata only — the live demo and gallery preview live in
   circular-theme-switch-demo.jsx, the framework source texts and the prompt in
   circular-theme-switch-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "circular-theme-switch",
  name: "圆形揭示暗色模式",
  href: "circular-theme-switch.html",
  title: "圆形揭示暗色模式",
  description: "340×340 网站页头场景：点按太阳图标，暗色画面从按钮位置以圆形扩散铺满整页，图标从太阳旋成月亮；再点反向收回。",

  cardDescription: "暗色主题从按钮圆形扩散铺满，图标旋成月亮。",

  demoHint: "点太阳图标看圆形扩散铺满，再点收回。",



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
