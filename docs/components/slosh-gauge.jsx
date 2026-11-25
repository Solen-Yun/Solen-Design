/* Component metadata only — the live demo and gallery preview live in
   slosh-gauge-demo.jsx, the framework source texts and the prompt in
   slosh-gauge-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with slosh-gauge-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "value", type: "number", default: "—", description: "受控液位 0–100；不传则组件自持状态" },
  { name: "defaultValue", type: "number", default: "60", description: "非受控时的初始液位" },
  { name: "onChange", type: "(value: number) => void", default: "—", description: "拖动或键盘操作时报告取整后的液位" },
  { name: "interactive", type: "boolean", default: "false", description: "开启后液位计可拖拽、可键盘调节（role=slider）" },
  { name: "showValue", type: "boolean", default: "true", description: "在液体内外各画一份百分比读数" },
  { name: "disabled", type: "boolean", default: "false", description: "置灰且不可交互" },
  { name: "liquidColor", type: "string", default: '"#f5f5f5"', description: "液体颜色；液体内的文字颜色按亮度自动取对比色" },
  { name: "glassColor", type: "string", default: '"#27272a"', description: "玻璃罐背景色" },
  { name: "width", type: "number", default: "88", description: "罐体宽度（px）" },
  { name: "height", type: "number", default: "180", description: "罐体高度（px）" },
  { name: "radius", type: "number", default: "20", description: "圆角（px），上限为短边一半" },
  { name: "ticks", type: "number", default: "4", description: "右缘刻度线数量；0 隐藏刻度" },
  { name: "viscosity", type: "number", default: "0.15", description: "弹簧黏度 0–1：0 立即到位，越大越懒、晃得越久" },
  { name: "tilt", type: "number", default: "0.45", description: "液面随速度倾斜的幅度（0–1）" },
  { name: "splash", type: "number", default: "0.42", description: "撞壁反弹保留的速度比例 0–1" },
  { name: "unit", type: "string", default: '"%"', description: "读数后缀" },
  { name: "ariaLabel", type: "string", default: '"Level"', description: "液位计的可访问名称" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
];

export default {
  id: "slosh-gauge",
  name: "晃动液位计",
  href: "slosh-gauge.html",
  title: "晃动液位计",
  description:
    "一只圆角玻璃罐里的液体液位计：液面用带阻尼的弹簧模拟追赶目标值，运动中按速度倾斜液面（clip-path 顶边倾斜），到顶/到底会带恢复系数反弹飞溅再归于平静，帧循环稳定后自睡；读数在液体内外各画一份，液体内的文字按液色亮度自动取对比色；interactive 时变成立式滑杆，支持拖拽、按住标记微调、Escape 还原与完整键盘操作。零运行时依赖，纯 React + CSS。",
  tags: ["React", "CSS", "表单"],

  cardDescription: "液面弹簧追赶目标值，倾斜、晃动、撞壁飞溅后归于平静。",

  demoHint: "调黏度看液体变懒或立即吸附；快速拖到顶部看撞壁飞溅；开交互后可直接拖罐体或用键盘方向键。",

  api: API,
};
