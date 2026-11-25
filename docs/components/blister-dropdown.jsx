/* Component metadata only — the live demo and gallery preview live in
   blister-dropdown-demo.jsx, the framework source texts and the prompt in
   blister-dropdown-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "blister-dropdown",
  name: "胶囊弹出下拉菜单",
  href: "blister-dropdown.html",
  title: "胶囊弹出下拉菜单",
  description:
    "状态筛选器做成银色铝箔药板，点选项时胶囊脱离槽位划弧飞进顶部药槽、原槽留下撕开的金属空洞与碎屑光圈，铝箔质感全由 CSS 绘制，Web Audio 合成音效，键盘与触屏完整可用。",

  cardDescription: "点选状态，胶囊从药槽飞进顶部药槽，槽位留下撕开的空洞。",

  demoHint: "点击选项让胶囊飞行；顶部按钮切换展开，↑/↓、Home/End 移动焦点，Enter/Space 选择，Escape 收起。",



  api: [
    { name: "value", type: '"all" | "open" | "closed"', default: '"all"', description: "初始/更新的选中值；外部更新不触发 onValueChange" },
    { name: "expanded", type: "boolean", default: "true", description: "初始/更新的展开状态" },
    { name: "autoClose", type: "boolean", default: "true", description: "选择后 160ms 自动收起面板" },
    { name: "sound", type: "boolean", default: "true", description: "Web Audio 合成的弹出/滑开/落槽音效（仅用户手势触发）" },
    { name: "counts", type: "Partial<Record<..., number>>", default: "7 / 4 / 3", description: "覆盖三行的计数数字" },
    { name: "onValueChange", type: "(value) => void", default: "—", description: "用户改变选中值时回调一次" },
    { name: "height", type: "number", default: "448", description: "场景高度，逻辑像素" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；开启时直接更新状态" },
  ],
};
