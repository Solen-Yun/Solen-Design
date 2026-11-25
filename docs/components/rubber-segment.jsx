/* Component metadata only — the live demo and gallery preview live in
   rubber-segment-demo.jsx, the framework source texts and the prompt in
   rubber-segment-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with rubber-segment-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "items", type: "(string | { value: string; label?: string; icon?: ReactNode })[]", default: "（必填）", description: "分段条目；字符串同时作为 value 与 label" },
  { name: "value", type: "string", default: "—", description: "受控选中值，配合 onChange 使用；传入后内部状态不再生效" },
  { name: "defaultValue", type: "string", default: "—", description: "初始选中值（非受控模式），缺省取第一项" },
  { name: "onChange", type: "(value: string, index: number) => void", default: "—", description: "选中某段时回调" },
  { name: "trackColor", type: "string", default: '"#27272a"', description: "轨道背景色" },
  { name: "thumbColor", type: "string", default: '"#fafafa"', description: "滑块与焦点环颜色" },
  { name: "textColor", type: "string", default: '"#fafafa"', description: "未选中文字颜色" },
  { name: "activeTextColor", type: "string", default: '"#18181b"', description: "滑块覆盖下的文字颜色" },
  { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "高度/字号/内边距/最小宽三档" },
  { name: "radius", type: "number", default: "10", description: "轨道圆角（px），滑块用 radius − inset" },
  { name: "inset", type: "number", default: "3", description: "滑块与轨道边缘的间隙（px）" },
  { name: "equalSlots", type: "boolean", default: "true", description: "每段等宽排列" },
  { name: "stretch", type: "number", default: "100", description: "拉伸阶段滑块跨越空隙的幅度（%）" },
  { name: "squash", type: "number", default: "3", description: "后缘压进新档位的过冲（px）" },
  { name: "speed", type: "number", default: "1", description: "所有动画时长的除数；2 表示快一倍" },
  { name: "glide", type: "number", default: "75", description: "松手惯性滑行距离 0–100" },
  { name: "draggable", type: "boolean", default: "true", description: "允许拖动滑块" },
  { name: "disabled", type: "boolean", default: "false", description: "禁用交互" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "aria-label", type: "string", default: '"Segmented control"', description: "radiogroup 的无障碍名称" },
];

export default {
  id: "rubber-segment",
  name: "橡胶分段控件",
  href: "rubber-segment.html",
  title: "橡胶分段控件",
  description:
    "滑块是一块橡胶的分段控件：点击别的段位时滑块先被拉长、横跨空隙再压进新槽（后缘带 squash 过冲），直接拖滑块则带惯性跟手、越过两端时按橡胶带公式弯曲回阻，松手按速度弹道投影选中最近段位、快速甩动会顺势进一段。滑块用 clip-path 窗口裁切一套复制的激活色标签，文字不动、窗口在动。motion 库驱动弹簧，支持键盘方向键、受控/非受控、三档尺寸。",
  tags: ["React", "CSS", "motion", "导航"],

  cardDescription: "滑块像橡皮筋一样拉过空隙、压进新段位。",

  demoHint: "点远端看拉长-压入，拖住滑块甩一下看惯性选段，拖过两端感受橡胶回阻。",

  api: API,
};
