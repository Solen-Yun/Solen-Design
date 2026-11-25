/* Component metadata only — the live demo and gallery preview live in
   glass-tab-menu-demo.jsx, the framework source texts and the prompt in
   glass-tab-menu-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "glass-tab-menu",
  name: "玻璃标签栏展开菜单",
  href: "glass-tab-menu.html",
  title: "玻璃标签栏展开菜单",
  description:
    "浅灰紫柔光场景里的玻璃标签栏：四枚立体灰阶 SVG 图标标签加一枚圆形加号，点标签白色选中块变得通透并弹性滑过去，点加号玻璃壳先收窄再向上展开成 3×2 菜单、按钮转成关闭符；五个弹簧标量驱动同一外壳连续形变，键盘、触屏、aria 语义与减少动态齐全。",

  cardDescription: "玻璃标签栏点加号向上展开成 3×2 创建菜单，选中块通透滑移。",

  demoHint: "点标签看选中块通透滑移；点加号看玻璃壳收窄再向上展开，再点收起；支持方向键、Escape、外部点击与中途反向。",



  api: [
    { name: "height", type: "number", default: "1080", description: "场景高度，逻辑像素；窄容器整场景等比缩放" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；五个状态立即吸附目标，交互保留" },
    { name: "glass-tab-action 事件", type: "CustomEvent", default: "—", description: "选中菜单项时在根元素派发，detail.action 为所选英文名" },
  ],
};
