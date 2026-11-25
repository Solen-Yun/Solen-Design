/* Component metadata only — the live demo and gallery preview live in
   dodge-field-demo.jsx, the framework source texts and the prompt in
   dodge-field-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with dodge-field-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "children", type: "ReactNode | (state) => ReactNode", default: "—", description: "自定义滑块内容；传函数时收到 { dodges, gave, caught, fleeing } 实时状态；不传渲染默认挑衅胶囊" },
  { name: "taunts", type: "string[]", default: '["Catch me", "Nope", "Too slow", "Almost", "Okay, okay"]', description: "默认胶囊的标语堆叠，随躲避次数逐条切换" },
  { name: "notice", type: "string", default: '""', description: "粗指针设备（触屏）下显示在场地底部的提示文字" },
  { name: "inkColor", type: "string", default: '"#f5f5f5"', description: "胶囊前景墨色；浅色适合深底舞台" },
  { name: "contrastColor", type: "string", default: '"#18181b"', description: "被抓住反色时的文字颜色" },
  { name: "fieldHeight", type: "number", default: "240", description: "场地高度（px）" },
  { name: "reach", type: "number", default: "72", description: "近身时胶囊最多被压退的距离（px）" },
  { name: "radius", type: "number", default: "120", description: "唤醒逃避力的指针半径（px），以场地中心计" },
  { name: "falloff", type: "number", default: "2", description: "力的衰减指数，越大越贴身才发力、发力越猛" },
  { name: "fleeDuration", type: "number", default: "130", description: "逃开时的弹簧时长（ms）" },
  { name: "returnDuration", type: "number", default: "620", description: "滑回家的弹簧时长（ms）" },
  { name: "returnBounce", type: "number", default: "0.1", description: "回家弹簧的回弹量" },
  { name: "axis", type: '"both" | "x" | "y"', default: '"both"', description: "逃跑方向；单轴时只沿该轴躲" },
  { name: "wall", type: '"clamp" | "bounce"', default: '"clamp"', description: "到墙边的处理；bounce 会把目标镜像反弹" },
  { name: "patience", type: "number", default: "4", description: "躲满几次后认输不再逃；下限 1" },
  { name: "disabled", type: "boolean", default: "false", description: "定住胶囊，不再对指针逃避" },
  { name: "onDodge", type: "(dodges: number) => void", default: "—", description: "每记一次躲避时回调，携带累计次数" },
  { name: "onRelent", type: "() => void", default: "—", description: "耐心耗尽、胶囊认输时回调一次" },
  { name: "onCatch", type: "() => void", default: "—", description: "点击抓住胶囊时回调" },
  { name: "className", type: "string", default: '""', description: "场地附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "场地内联样式" },
];

export default {
  id: "dodge-field",
  name: "躲避指针容器",
  href: "dodge-field.html",
  title: "躲避指针容器",
  description:
    "指针一靠近胶囊就往反方向压退，越近压得越狠，指针离开又弹簧滑回中心；半径 55% 以内记一次躲避、出圈才重新计数，躲满 patience 次就认输罢工，点击则反色抓住它 760ms 再全部复位。motion 驱动两枚 MotionValue，window 级指针监听按 rAF 合帧，zoom 折算兼容被缩放的舞台，reduced-motion 直接定住。",
  tags: ["React", "CSS", "Motion", "指针"],

  cardDescription: "指针一靠近就滑走，躲满次数才认输归位。",

  demoHint: "贴脸追着胶囊跑，看标语逐条换、躲满后认输；点击可抓住它，轴与墙模式可调。",

  api: API,
};
