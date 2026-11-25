/* Component metadata only — the live demo and gallery preview live in
   mobile-drill-menu-demo.jsx, the framework source texts and the prompt in
   mobile-drill-menu-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "mobile-drill-menu",
  name: "移动端下钻菜单",
  href: "mobile-drill-menu.html",
  title: "移动端下钻菜单",
  description: "300×480 移动站点菜单：汉堡按钮三线变 X，菜单项逐个升起；带子菜单的项进入后显示子项列表与返回，层级间横向推挤切换。",

  cardDescription: "汉堡变 X，菜单项升起，子菜单推入。",

  demoHint: "开菜单、进入含子菜单的项、返回。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "480",
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
