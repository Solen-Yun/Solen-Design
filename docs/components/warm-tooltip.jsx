/* Component metadata only — the live demo and gallery preview live in
   warm-tooltip-demo.jsx, the framework source texts and the prompt in
   warm-tooltip-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with warm-tooltip-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "content", type: "ReactNode", default: "—", description: "气泡内容" },
  { name: "shortcut", type: "string", default: "—", description: "以 kbd 徽片展示的快捷键" },
  { name: "children", type: "ReactElement", default: "—", description: "触发元素；激活时被注入 aria-describedby" },
  { name: "side", type: '"top" | "bottom" | "left" | "right"', default: '"top"', description: "气泡锚定在触发元素的哪一侧" },
  { name: "delay", type: "number", default: "组值（400）", description: "冷启动延迟覆盖（ms）" },
  { name: "warmWindow", type: "number", default: "组值（300）", description: "关闭后保持温态的窗口覆盖（ms）" },
  { name: "surfaceColor", type: "string", default: '"#f5f5f5"', description: "气泡底色（箭头与熔丝同色）" },
  { name: "inkColor", type: "string", default: '"#18181b"', description: "文字颜色" },
  { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "字号与内边距三档" },
  { name: "radius", type: "number", default: "8", description: "气泡圆角（px）" },
  { name: "gap", type: "number", default: "8", description: "气泡距触发元素的间距（px）" },
  { name: "arrow", type: "boolean", default: "true", description: "旋转小方块的指向箭头" },
  { name: "popDuration", type: "number", default: "160", description: "冷启动弹出时长（ms）" },
  { name: "popScale", type: "number", default: "0.94", description: "冷启动的起始缩放 0–1" },
  { name: "popBlur", type: "number", default: "4", description: "冷启动的起始模糊（px）" },
  { name: "showFuse", type: "boolean", default: "false", description: "在触发元素边缘画延迟熔丝条" },
  { name: "longPress", type: "number", default: "500", description: "触屏长按打开的时长（ms）" },
  { name: "disabled", type: "boolean", default: "false", description: "移除全部交互并立即关闭" },
  { name: "className", type: "string", default: '""', description: "触发容器附加类名" },
  { name: "delay（组）", type: "number", default: "400", description: "WarmTooltipGroup：首个气泡的冷启动延迟（ms）" },
  { name: "warmWindow（组）", type: "number", default: "300", description: "WarmTooltipGroup：关闭后保持温态的时长（ms）" },
  { name: "travel（组）", type: "number", default: "320", description: "WarmTooltipGroup：气泡在触发元素间飞行的弹簧时长（ms）" },
  { name: "lean（组）", type: "number", default: "0", description: "WarmTooltipGroup：飞行途中按速度倾斜的最大角度（度）" },
  { name: "onWarmChange（组）", type: "(warm: boolean) => void", default: "—", description: "WarmTooltipGroup：温态切换回调" },
  { name: "ref", type: "{ reset() }", default: "—", description: "命令式句柄：关闭气泡并清空温态" },
];

export default {
  id: "warm-tooltip",
  name: "热态连发提示组",
  href: "warm-tooltip.html",
  title: "热态连发提示组",
  description:
    "会保温的提示组：第一个提示等完冷启动延迟才弹出（带缩放+模糊的 pop 入场），关闭后的暖窗期内移到相邻元素时气泡不再关闭——同一颗 portal 气泡沿弹簧轨迹飞到新锚点，内容层按方向滑动换字，速度越快机身越倾斜（lean）。含指向箭头、kbd 快捷键徽片、可选的延迟熔丝条、触屏长按、键盘焦点即时打开、Escape/失焦/点外关闭、滚动重锚与边缘钳制；温态切换有 onWarmChange 回调。",
  tags: ["React", "CSS", "Motion", "浮层"],

  cardDescription: "首个提示等延迟弹出，暖窗内气泡直接飞到下一个元素秒开。",

  demoHint: "先悬停一个按钮等弹出，再快速扫过相邻按钮看气泡飞行连开；调 warmWindow 拉长保温窗；开 lean 看倾斜。",

  api: API,
};
