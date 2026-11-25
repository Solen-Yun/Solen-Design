/* Component metadata only — the live demo and gallery preview live in
   status-mark-demo.jsx, the framework source texts and the prompt in
   status-mark-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with status-mark-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "status", type: '"pending" | "running" | "done" | "failed" | "cancelled"', default: '"pending"', description: "当前任务状态；done/failed 会换色并描画勾叉，cancelled 是暗态叉" },
  { name: "progress", type: "number", default: "—", description: "running 时的 0–1 进度；传了有限值弧长确定，不传则无限旋转" },
  { name: "label", type: "ReactNode", default: "—", description: "图形右侧的文案；传入后图形变为 aria-hidden，由 status 播报状态" },
  { name: "color", type: "string", default: '"currentColor"', description: "待机/进行中/取消态的图形与文字颜色" },
  { name: "doneColor", type: "string", default: '"#22c55e"', description: "完成态的图形颜色" },
  { name: "errorColor", type: "string", default: '"#ef4444"', description: "失败态的图形颜色" },
  { name: "size", type: "number", default: "20", description: "图形边长（px）" },
  { name: "strokeWidth", type: "number", default: "2", description: "圆环与勾叉描边宽度" },
  { name: "dashes", type: "number", default: "8", description: "待机态圆环上的刻点数" },
  { name: "fontSize", type: "number", default: "14", description: "文案字号（px）" },
  { name: "spinDuration", type: "number", default: "1100", description: "不确定进度弧转一整圈的时长（ms）" },
  { name: "arcLength", type: "number", default: "0.68", description: "不确定进度弧占整圈的比例 0–1" },
  { name: "drawDuration", type: "number", default: "240", description: "勾/叉描画时长（ms）" },
  { name: "fillOpacity", type: "number", default: "0.06", description: "完成/失败态圆盘填充透明度 0–1" },
  { name: "strike", type: "boolean", default: "true", description: "完成时给文案划删除线" },
  { name: "strikeDelay", type: "number", default: "60", description: "删除线额外延迟（ms）" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式，覆盖在组件变量之上" },
];

export default {
  id: "status-mark",
  name: "任务状态变形符",
  href: "status-mark.html",
  title: "任务状态变形符",
  description:
    "一枚会变形的任务状态符：待机是呼吸的刻点圆环，进入运行后刻点汇聚成进度弧——传了 progress 就按比例定格弧长，不传则一条弧永续追逐自己；完成时弧收拢成整环、淡色填充并描画出对勾，文字变淡再被删除线划过；失败描叉换红、取消留一道暗叉。三条 motion 值驱动 dasharray 插值，状态迁移可逆、卸载即停；屏幕阅读器收到完整状态播报（含百分比）。",
  tags: ["React", "CSS", "Motion", "状态"],

  cardDescription: "刻点环汇聚成进度弧，完成时收成整环描出对勾并划掉文字。",

  demoHint: "点按钮推进状态机看环形变形全程；调刻点数与弧长看待机到旋转的衔接；开关删除线与播报。",

  api: API,
};
