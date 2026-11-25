/* Component metadata only — the live demo and gallery preview live in
   mega-menu-morph-demo.jsx, the framework source texts and the prompt in
   mega-menu-morph-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "mega-menu-morph",
  name: "形变巨型菜单",
  href: "mega-menu-morph.html",
  title: "形变巨型菜单",
  description: "340×330 顶导航：悬停 Products/Developers/Company 弹出下拉面板，移到另一项时面板不关闭而是滑动到其下方并变形（宽高随内容过渡），离开收起。",

  cardDescription: "面板滑移变形到新项下方。",

  demoHint: "在菜单项间移动看面板滑移变形。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "330",
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
