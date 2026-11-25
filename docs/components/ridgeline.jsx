/* Component metadata only — the live demo and gallery preview live in
   ridgeline-demo.jsx, the framework source texts and the prompt in
   ridgeline-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "ridgeline",
  name: "年份温度山脊图",
  href: "ridgeline.html",
  title: "年份温度山脊图",
  description: "300×480 山脊图：十二个月每日温度分布堆成重叠山脊，入场自一月起逐月升起；拖动 2005↔2025 年份滑杆，分布整体形变对比气候变迁；悬停月份高亮。",

  cardDescription: "山脊逐月升起，年份滑杆形变。",

  demoHint: "看逐月升起，拖年份看形变，悬停高亮。",



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
