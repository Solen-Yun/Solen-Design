/* Component metadata only — the live demo and gallery preview live in
   comet-dial-demo.jsx, the framework source texts and the prompt in
   comet-dial-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with comet-dial-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "value", type: "number", default: "—", description: "受控数值；外部变更会以弹簧动画拨过去" },
  { name: "defaultValue", type: "number", default: "62", description: "初始数值（非受控模式）" },
  { name: "min", type: "number", default: "0", description: "最小值" },
  { name: "max", type: "number", default: "100", description: "最大值" },
  { name: "step", type: "number", default: "1", description: "吸附步长；小数位数决定读数格式" },
  { name: "unit", type: "string", default: '"%"', description: "读数后缀与 aria-valuetext 的单位" },
  { name: "label", type: "string", default: '"Level"', description: "滑杆的可访问名称" },
  { name: "accent", type: "string", default: '"#f5f5f5"', description: "亮弧、彗尾与头部圆点的强调色" },
  { name: "ink", type: "string", default: '"#fdfdfd"', description: "轨道颜色与中央读数墨色" },
  { name: "size", type: "number", default: "250", description: "拨盘直径（px）" },
  { name: "sweep", type: "number", default: "320", description: "弧线扫过角度（度），缺口留在正上方" },
  { name: "thickness", type: "number", default: "5", description: "轨道、亮弧与彗尾的基础描边粗细" },
  { name: "speed", type: "number", default: "25", description: "弹簧刚度档位 0–100，越大回弹越快" },
  { name: "tapBounce", type: "number", default: "0.2", description: "轻点 / 小幅移动后的回弹 0–0.9" },
  { name: "flickBounce", type: "number", default: "0.1", description: "猛甩后的回弹，按甩动速度在两者间过渡" },
  { name: "momentum", type: "number", default: "1", description: "松手后惯性滑行距离的倍率" },
  { name: "cometReach", type: "number", default: "180", description: "满速时彗尾总张角（度）" },
  { name: "cometWidth", type: "number", default: "12", description: "满速时彗尾在描边之外增加的最大宽度" },
  { name: "disabled", type: "boolean", default: "false", description: "禁用指针与键盘输入并压暗拨盘" },
  { name: "onChange", type: "(value: number) => void", default: "—", description: "吸附后的目标值变化时回调（拖动中持续触发）" },
  { name: "onChangeEnd", type: "(value: number, detail: { velocity: number, bounce: number }) => void", default: "—", description: "松手与每次离散键控移动时回调" },
  { name: "className", type: "string", default: '""', description: "根节点附加类名" },
];

export default {
  id: "comet-dial",
  name: "彗尾刻度拨盘",
  href: "comet-dial.html",
  title: "彗尾刻度拨盘",
  description:
    "一圈弧形刻度的圆形拨盘：按住环上任意位置拖动，亮弧与头部圆点带一点平滑地跟随手指；松手后按松手速度惯性滑行，再由弹簧吸附到步长上；速度越快，头部后方拖出的彗尾越长越宽，静止后自熄帧循环。中央是大号等宽数字读数；支持键盘方向键 / PageUp / Home 全套，受控与非受控两种用法，减少动效时直接跳位。",
  tags: ["React", "CSS", "SVG", "Motion"],

  cardDescription: "拨动刻度环惯性滑行，彗尾随速度拖出，弹簧吸附步长。",

  demoHint: "在环上拖动或猛甩看彗尾拖长；用键盘方向键微调；动量、彗尾张角与回弹可调。",

  api: API,
};
