/* Component metadata only — the live demo and gallery preview live in
   code-slots-demo.jsx, the framework source texts and the prompt in
   code-slots-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with code-slots-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "length", type: "number", default: "6", description: "验证码位数 / 槽位数量" },
  { name: "value", type: "string", default: "—", description: "受控验证码；非数字会被剔除，外部变更会以补间呈现" },
  { name: "defaultValue", type: "string", default: '""', description: "初始验证码（非受控模式）" },
  { name: "onChange", type: "(code: string) => void", default: "—", description: "拼接验证码变化时回调" },
  { name: "onComplete", type: "(code: string) => void", default: "—", description: "最后一个空槽被填上时回调一次" },
  { name: "status", type: '"idle" | "success" | "error"', default: '"idle"', description: "结果状态：success 漫洗色抬对勾，error 逐位排空数字" },
  { name: "mask", type: "boolean", default: "false", description: "以圆点遮蔽数字" },
  { name: "caret", type: "boolean", default: "true", description: "是否显示滑翔光标" },
  { name: "disabled", type: "boolean", default: "false", description: "禁用输入并压暗整行" },
  { name: "autoFocus", type: "boolean", default: "false", description: "挂载时聚焦隐藏输入框" },
  { name: "accentColor", type: "string", default: '"#f5f5f5"', description: "填充、成功洗色与光标的强调色" },
  { name: "inkColor", type: "string", default: '"#f5f5f5"', description: "悬停 / 激活槽位背景的墨色" },
  { name: "slotColor", type: "string", default: '"#27272a"', description: "槽位底色" },
  { name: "digitColor", type: "string", default: '"#18181b"', description: "数字与对勾颜色" },
  { name: "dangerColor", type: "string", default: '"#ff3b30"', description: "报错状态的红色" },
  { name: "slotSize", type: "number", default: "44", description: "槽位宽度（px），高度、圆角上限与字号由它推导" },
  { name: "gap", type: "number", default: "8", description: "槽位间距（px）" },
  { name: "radius", type: "number", default: "12", description: "槽位圆角（px），上限为槽宽一半" },
  { name: "bounce", type: "number", default: "0.2", description: "数字弹入的弹簧回弹 0–1" },
  { name: "settle", type: "number", default: "0.3", description: "弹入弹簧时长（秒）" },
  { name: "rise", type: "number", default: "8", description: "数字落槽时从下方升起的距离（px）" },
  { name: "cascade", type: "number", default: "20", description: "粘贴 / 报错 / 外部变更逐位级联的间隔（ms）" },
  { name: "ariaLabel", type: "string", default: '"One-time code"', description: "隐藏输入框的可访问名称" },
  { name: "className", type: "string", default: '""', description: "根节点附加类名" },
];

export default {
  id: "code-slots",
  name: "弹入验证码槽",
  href: "code-slots.html",
  title: "弹入验证码槽",
  description:
    "一次性验证码输入：每个数字带弹簧缩放弹进圆角槽位，闪烁光标在槽间滑翔（会为仍在飞行中的数字让路）；粘贴或短信自动填充按级联依次落位；成功时强调色洗色漫过整行、数字下沉、对勾升起；报错时数字反序排空。隐藏的真输入框托住键盘、剪贴板与 one-time-code 自动填充，支持受控 / 非受控两种用法。",
  tags: ["React", "CSS", "Motion", "表单"],

  cardDescription: "数字弹簧弹进槽位，光标滑翔跟随；成功漫洗色，报错排空。",

  demoHint: "点槽位直接输入或粘贴一串数字；切到 success / error 看洗色收尾与红色排空。",

  api: API,
};
