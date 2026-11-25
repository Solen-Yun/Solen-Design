/* Component metadata only — the live demo and gallery preview live in
   wake-slider-demo.jsx, the framework source texts and the prompt in
   wake-slider-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with wake-slider-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "value", type: "number", default: "—", description: "受控值；不传则组件自持状态" },
  { name: "defaultValue", type: "number", default: "50", description: "非受控时的初始值" },
  { name: "onChange", type: "(value: number) => void", default: "—", description: "吸附后的值变化时回调" },
  { name: "min", type: "number", default: "0", description: "范围下限" },
  { name: "max", type: "number", default: "100", description: "范围上限" },
  { name: "step", type: "number", default: "1", description: "吸附步长，也是键盘方向键步幅" },
  { name: "bars", type: "number", default: "32", description: "轨道内竖条数量" },
  { name: "height", type: "number", default: "56", description: "轨道高度（px），也是竖条满高" },
  { name: "restHeight", type: "number", default: "12", description: "竖条静止高度（px），不超过轨道高" },
  { name: "gap", type: "number", default: "4", description: "竖条间距（px）" },
  { name: "fillColor", type: "string", default: '"#f5f5f5"', description: "已填充竖条的颜色" },
  { name: "trackColor", type: "string", default: '"#27272a"', description: "未填充竖条的颜色" },
  { name: "crestColor", type: "string", default: '""', description: "尾流浪尖覆盖色；留空用填充色且不渲染覆盖层" },
  { name: "sensitivity", type: "number", default: "1", description: "拖动速度激起尾流的灵敏度" },
  { name: "reach", type: "number", default: "6", description: "尾流最大半径（条数）" },
  { name: "skew", type: "number", default: "0.6", description: "尾流不对称度：拖动后方拉长、前方收紧" },
  { name: "glide", type: "number", default: "0.3", description: "手柄弹簧的滑顺度；越小越跟手" },
  { name: "smoothing", type: "number", default: "100", description: "速度平滑度；越大尾流越沉稳" },
  { name: "showValue", type: "boolean", default: "false", description: "在轨道旁显示数值读出" },
  { name: "formatValue", type: "(value: number) => string", default: "String", description: "读出与 aria-valuetext 的格式化函数" },
  { name: "disabled", type: "boolean", default: "false", description: "禁用滑块" },
  { name: "ariaLabel", type: "string", default: '"Value"', description: "隐藏手柄的可访问名称" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
];

export default {
  id: "wake-slider",
  name: "尾流条形滑块",
  href: "wake-slider.html",
  title: "尾流条形滑块",
  description:
    "没有滑块头的条形 range：一排细竖条按值填充，拖得越快，虚拟手柄周围的竖条被顶得越高、浪尖越亮——尾流按速度幅度 cos² 成形，拖动后方拉长、前方收紧，速度回落后弹簧复位。手柄位置与速度各走一条 spring，逐帧直写 transform（含静止快速路径），键盘/指针/RTL 全支持，role=slider 隐藏手柄承接无障碍。reduced-motion 下保留填充、抹去尾流。",
  tags: ["React", "CSS", "Motion", "表单"],

  cardDescription: "拖得越快尾流越高，浪尖亮起又随速度回落成静水。",

  demoHint: "快速甩动看尾流抬高与浪尖变亮；慢拖几乎没有波动；用键盘方向键瞬时跳值；调 reach/skew 改尾流形状。",

  api: API,
};
