/* Component metadata only — the live demo and gallery preview live in
   elastic-slider-demo.jsx, the framework source texts and the prompt in
   elastic-slider-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with elastic-slider-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "value", type: "number", default: "—", description: "受控数值，配合 onChange 使用" },
  { name: "defaultValue", type: "number", default: "50", description: "非受控模式的初始数值" },
  { name: "startingValue", type: "number", default: "0", description: "范围的一端" },
  { name: "maxValue", type: "number", default: "100", description: "范围的另一端" },
  { name: "isStepped", type: "boolean", default: "false", description: "按步长取整" },
  { name: "stepSize", type: "number", default: "1", description: "步长" },
  { name: "onChange", type: "(value: number) => void", default: "—", description: "数值变化时回调" },
  { name: "onChangeEnd", type: "(value: number) => void", default: "—", description: "拖拽/滚轮/键盘交互结束时回调" },
  { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "横向或竖向布局" },
  { name: "leftIcon", type: "ReactNode", default: "小音量图标", description: "范围起点的图标" },
  { name: "rightIcon", type: "ReactNode", default: "大音量图标", description: "范围终点的图标" },
  { name: "iconPlacement", type: '"outside" | "inside"', default: '"outside"', description: "图标放轨道外侧还是轨道两端内侧" },
  { name: "valuePosition", type: '"top" | "bubble" | "inside" | "none"', default: '"top"', description: "数值显示位置：上方 / 气泡 / 填充内 / 不显示" },
  { name: "formatValue", type: "(value: number) => ReactNode", default: "—", description: "自定义数值文案" },
  { name: "ticks", type: "boolean | number[]", default: "false", description: "刻度点；true 按步长自动生成（超过 40 个改 11 等分）" },
  { name: "thumb", type: "boolean", default: "false", description: "圆形把手点" },
  { name: "fillFrom", type: "number", default: "范围起点", description: "填充从哪个值开始生长" },
  { name: "thickness", type: "number", default: "6", description: "静止轨道粗细（px）" },
  { name: "activeThickness", type: "number", default: "12", description: "激活后的轨道粗细（px）" },
  { name: "radius", type: "number", default: "thickness / 2", description: "轨道圆角（px）" },
  { name: "restOpacity", type: "number", default: "0.7", description: "静止时的整体不透明度 0–1" },
  { name: "growOnHover", type: "boolean", default: "true", description: "悬停时轨道变粗" },
  { name: "maxStretch", type: "number", default: "50", description: "橡胶拉伸上限（px）" },
  { name: "bounce", type: "number", default: "0.5", description: "回弹过冲 0–0.95" },
  { name: "jumpToClick", type: "boolean", default: "true", description: "点击直接跳到指针位置" },
  { name: "wheel", type: "boolean", default: "false", description: "启用滚轮调节" },
  { name: "trackColor", type: "string", default: "currentColor 18% 透明", description: "轨道背景色" },
  { name: "rangeColor", type: "string", default: '"currentColor"', description: "填充颜色" },
  { name: "iconColor", type: "string", default: '"currentColor"', description: "图标颜色" },
  { name: "contentColor", type: "string", default: '"currentColor"', description: "轨道内内容的颜色" },
  { name: "fillContentColor", type: 'string | "auto"', default: '"auto"', description: "填充内内容颜色；auto 按填充色亮度自动取" },
  { name: "thumbColor", type: "string", default: '"#ffffff"', description: "把手颜色" },
  { name: "disabled", type: "boolean", default: "false", description: "禁用交互" },
  { name: "ariaLabel", type: "string", default: '"Slider"', description: "无障碍名称" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
];

export default {
  id: "elastic-slider",
  name: "橡胶拉伸滑块",
  href: "elastic-slider.html",
  title: "橡胶拉伸滑块",
  description:
    "会变形的滑块：靠近时轨道变粗、露出轨道内内容，向两端拖过头时像橡皮筋一样拉伸变细、松手带回弹；填充值走弹簧曲线带轻微过冲，到底还想加会顶一下并脉冲图标；支持横竖布局、步长、刻度、把手、四种数值位置与滚轮/键盘操作，填充内文字按亮度自动取对比色。",
  tags: ["React", "CSS", "弹簧动画", "表单"],

  cardDescription: "拖过头的滑块像橡皮筋一样拉伸，松手带回弹，轨道悬停变粗。",

  demoHint: "按住往两端拖过头再松手看回弹；到底后继续按滚轮看拒绝弹跳，打开刻度和把手试试。",

  api: API,
};
