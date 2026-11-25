/* Component metadata only — the live demo and gallery preview live in
   plan-compare-table-demo.jsx, the framework source texts and the prompt in
   plan-compare-table-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "plan-compare-table",
  name: "差异对比价格表",
  href: "plan-compare-table.html",
  title: "差异对比价格表",
  description: "300×480 三档价格方案对比表：逐行对比功能差异，方案名行在滚动时钉在顶部，悬停单元格高亮所在行列，差异-only 过滤开关只保留有差异的行。",

  cardDescription: "只看差异行，表头钉住，悬停高亮行列。",

  demoHint: "滚动看表头钉住，开 Differences only 过滤，悬停看行列高亮。",



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
