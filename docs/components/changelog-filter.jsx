/* Component metadata only — the live demo and gallery preview live in
   changelog-filter-demo.jsx, the framework source texts and the prompt in
   changelog-filter-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "changelog-filter",
  name: "可筛选更新日志",
  href: "changelog-filter.html",
  title: "可筛选更新日志",
  description: "300×480 产品更新日志：版本时间轴纵列（最新条目带闪烁 New 点），New/Improved/Fixed 过滤胶囊筛选条目类型并平滑重排。",

  cardDescription: "时间轴日志按类型筛选重排。",

  demoHint: "切过滤胶囊看条目筛选。",



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
