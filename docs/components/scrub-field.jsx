/* Component metadata only — the live demo and gallery preview live in
   scrub-field-demo.jsx, the framework source texts and the prompt in
   scrub-field-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with scrub-field-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "label", type: "string", default: '"Radius"', description: "芯片左侧的字段标签" },
  { name: "suffix", type: "string", default: '"px"', description: "数字后的单位后缀；留空不渲染" },
  { name: "value", type: "number", default: "—", description: "受控数值，配合 onChange 使用；传入后内部状态不再生效" },
  { name: "defaultValue", type: "number", default: "24", description: "初始数值（非受控模式）" },
  { name: "min", type: "number", default: "0", description: "允许的最小值" },
  { name: "max", type: "number", default: "100", description: "允许的最大值" },
  { name: "step", type: "number", default: "1", description: "每次微调的步长；其小数位数决定显示精度" },
  { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "芯片高度/字号/圆角/宽度三档" },
  { name: "sensitivity", type: "number", default: "2", description: "指针每移动多少像素算一步" },
  { name: "rubberReach", type: "number", default: "8", description: "越过上下限的橡皮筋行程，占量程的百分比" },
  { name: "returnDuration", type: "number", default: "300", description: "越限松手后弹回的时长（ms）" },
  { name: "coarseMultiplier", type: "number", default: "10", description: "Shift 加速倍数（也是 PageUp/PageDown 步长倍数）" },
  { name: "fineMultiplier", type: "number", default: "0.1", description: "Alt 微调倍数" },
  { name: "showDelta", type: "boolean", default: "true", description: "拖动时显示浮动的增量气泡" },
  { name: "showDirty", type: "boolean", default: "false", description: "数值偏离 defaultValue 时给芯片描边" },
  { name: "showFill", type: "boolean", default: "true", description: "芯片背景里的量程填充条" },
  { name: "accent", type: "string", default: '"#f5f5f5"', description: "填充条/气泡/描边的强调色，气泡文字按亮度自动取反" },
  { name: "chipColor", type: "string", default: '"#27272a"', description: "芯片背景色" },
  { name: "disabled", type: "boolean", default: "false", description: "禁用交互" },
  { name: "onChange", type: "(value: number) => void", default: "—", description: "数值每次变化时回调" },
  { name: "onCommit", type: "(value: number) => void", default: "—", description: "一次拖动或输入结束时回调（值有变化时）" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
];

export default {
  id: "scrub-field",
  name: "拖拽微调数字芯片",
  href: "scrub-field.html",
  title: "拖拽微调数字芯片",
  description:
    "横向拖拽微调的数字芯片：按住左右拖按步长增减、增量气泡跟指针浮起，越过上下限时数值按对数橡皮筋弯曲、芯片朝拖动方向倾斜、松手弹回限位；不拖直接点击进入输入态（Enter 提交、Esc 还原、失焦解析），Shift 加速 / Alt 微调并支持拖动中途换挡不跳变；背景量程填充条随值伸缩，accent 颜色按 YIQ 亮度自动给气泡配对比文字。motion 库驱动，role=spinbutton 无障碍语义齐全。",
  tags: ["React", "CSS", "motion", "表单"],

  cardDescription: "左右拖动微调数字，越限像橡皮筋一样弯曲回弹。",

  demoHint: "按住左右拖，越过上下限感受橡皮筋；按住 Shift/Alt 变步长，松手前点一下可直接输入。",

  api: API,
};
