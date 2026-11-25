/* Component metadata only — the live demo and gallery preview live in
   call-chip-demo.jsx, the framework source texts and the prompt in
   call-chip-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with call-chip-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "icon", type: '"terminal" | "file" | "search" | "edit" | ReactNode', default: '"terminal"', description: "工具图标；字符串选内置图标（命令行 / 文件 / 搜索 / 编辑），也可直接传节点" },
  { name: "name", type: "string", default: '"bash"', description: "工具名文字" },
  { name: "argument", type: "string", default: '"npm test"', description: "参数文字，弱化显示" },
  { name: "status", type: '"idle" | "running" | "done" | "error"', default: '"running"', description: "调用状态：排队 / 进行中（填充扫过 + 计时）/ 完成 / 失败" },
  { name: "expectedMs", type: "number", default: "2500", description: "running 填充扫到 90% 的预期时长（ms），即填充过渡时长" },
  { name: "size", type: "number", default: "34", description: "芯片高度（px），字号与内边距由它推导" },
  { name: "radius", type: "number", default: "10", description: "圆角（px）" },
  { name: "color", type: "string", default: '"currentColor"', description: "文字墨色" },
  { name: "surfaceColor", type: "string", default: '"#27272a"', description: "芯片底色" },
  { name: "progressColor", type: "string", default: '"currentColor"', description: "进行中填充的色调" },
  { name: "progressOpacity", type: "number", default: "0.08", description: "进行中填充的透明度 0–1" },
  { name: "doneColor", type: "string", default: '"#22c55e"', description: "完成洗色与对勾图标的绿色" },
  { name: "errorColor", type: "string", default: '"#ef4444"', description: "失败洗色与重试图标的红色" },
  { name: "washOpacity", type: "number", default: "0.14", description: "完成 / 失败洗色的透明度 0–1" },
  { name: "shake", type: "number", default: "6", description: "失败时水平抖动幅度（px），0 关闭抖动" },
  { name: "showTimer", type: "boolean", default: "true", description: "是否显示实时毫秒计时" },
  { name: "onRetry", type: "() => void", default: "—", description: "重试回调；重试按钮只在 error 状态出现" },
  { name: "className", type: "string", default: '""', description: "芯片附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "芯片内联样式" },
];

export default {
  id: "call-chip",
  name: "工具调用计时芯片",
  href: "call-chip.html",
  title: "工具调用计时芯片",
  description:
    "一条工具调用的状态芯片：进行中时一道进度填充按预期时长横扫芯片、尾部毫秒计时实时跳动；完成时填充收满、绿色洗色自上而下漫过、图标滚成对勾；失败时填充就地冻结、整枚芯片水平抖动、图标滚成重试箭头，点击芯片即重试。纯 React + CSS，屏幕阅读器有完整的状态播报。",
  tags: ["React", "CSS", "状态"],

  cardDescription: "进度填充横扫计时，完成漫绿收对勾，失败抖动变红可重试。",

  demoHint: "切换状态看填充、洗色与抖动；失败后直接点芯片重试；尺寸与预期时长可调。",

  api: API,
};
