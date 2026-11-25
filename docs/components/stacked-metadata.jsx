/* Component metadata only — the live demo and gallery preview live in
   stacked-metadata-demo.jsx, the framework source texts and the prompt in
   stacked-metadata-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "stacked-metadata",
  name: "标签叠放展开",
  href: "stacked-metadata.html",
  title: "标签叠放展开",
  description:
    "任务行的优先级、日期、负责人三枚标签默认叠放收起，悬停、聚焦或点击时以弹簧动画依次展开铺平，Esc 或移出复位，深浅两套主题。",

  cardDescription: "标签叠起给标题让位，悬停时弹簧展开；点击固定展开该行，Esc 复位。",

  demoHint: "悬停或聚焦一行，标签向左展开；点击固定展开，再点一次或按 Esc 收起。",



  api: [
    { name: "heading", type: "string", default: '"In Progress"', description: "列表顶部的小节标题" },
    { name: "items", type: "{ title; priority; date; assignee; team? }[]", default: "默认演示数据", description: "行数据，最多渲染 12 行；优先级小写后写入 data-priority 供配色" },
    { name: "theme", type: '"light" | "dark"', default: '"dark"', description: "配色主题" },
    { name: "expanded", type: "number", default: "-1", description: "初始固定展开的行索引；-1 表示全部收起" },
    { name: "height", type: "number", default: "600", description: "场景高度，逻辑像素" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；开启时状态直接落位，不播放弹簧动画" },
    { name: "onExpandChange", type: "(index: number) => void", default: "—", description: "展开行变化时回调，参数为行索引，-1 表示无" },
  ],
};
