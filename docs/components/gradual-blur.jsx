/* Component metadata only — the live demo and gallery preview live in
   gradual-blur-demo.jsx, the framework source texts and the prompt in
   gradual-blur-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with gradual-blur-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "position", type: '"top" | "bottom" | "left" | "right"', default: '"bottom"', description: "模糊带贴在哪条边；最大模糊落在最外侧" },
  { name: "target", type: '"parent" | "page"', default: '"parent"', description: "page 时 fixed 覆盖视口，否则绝对定位在父元素内" },
  { name: "height", type: "number | string", default: '"6rem"', description: "上下边的模糊带厚度；左右边的厚度默认值" },
  { name: "width", type: "number | string", default: "—", description: "左右边的模糊带厚度；上下边时为沿边的跨度并自动居中" },
  { name: "strength", type: "number", default: "2", description: "峰值模糊强度，最深层模糊半径为 strength × 12 px" },
  { name: "layers", type: "number", default: "8", description: "叠层片数，收在 1–16" },
  { name: "curve", type: '"linear" | "bezier" | "ease-in" | "ease-out" | "ease-in-out"', default: '"linear"', description: "从内边界到边缘的模糊爬升曲线" },
  { name: "exponential", type: "boolean", default: "true", description: "指数爬升 (2^(4t) − 1)/15，把模糊集中到边缘附近" },
  { name: "opacity", type: "number", default: "1", description: "每层的不透明度" },
  { name: "saturation", type: "number", default: "1", description: "整个叠层的额外饱和度总倍数，1 关闭" },
  { name: "tint", type: "string", default: '"transparent"', description: "沿同一条曲线罩在带上的颜色层" },
  { name: "autoHide", type: "boolean", default: "false", description: "滚动到模糊方向尽头时整条带淡出，滚回即恢复" },
  { name: "container", type: "string | Element | RefObject", default: "—", description: "autoHide 监听的滚动容器；不传则从父元素自动探测" },
  { name: "hoverIntensity", type: "number", default: "1", description: "悬停带体时的模糊倍率；1 关闭监听" },
  { name: "duration", type: "number | string", default: "0.3", description: "滚动/悬停淡入淡出的过渡时长（s）" },
  { name: "easing", type: "string", default: '"ease-out"', description: "上述过渡的缓动" },
  { name: "zIndex", type: "number", default: "1000", description: "根元素的层叠顺序" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
];

export default {
  id: "gradual-blur",
  name: "渐进边缘模糊",
  href: "gradual-blur.html",
  title: "渐进边缘模糊",
  description:
    "给滚动区域的一条边盖上由浅到深的模糊：一组 backdrop-filter 层各负责一段遮罩区间，模糊半径按曲线（线性/贝塞尔/四种 ease，可指数化）从内边界爬升到外缘，视觉上连续却每层都便宜；可选的色彩罩沿同一曲线罩色，saturation 给整层加饱和。autoHide 监听滚动位置，滚到模糊方向的尽头时整条带随一个 CSS 变量淡到零，悬停可用倍率加深或减弱；跟随父元素圆角，page 模式钉在视口上，无自转帧循环。",
  tags: ["React", "CSS", "滚动", "模糊"],

  cardDescription: "边缘渐进模糊罩，滚动到尽头自动淡出。",

  demoHint: "在内容区里滚动看底部模糊带，滚到底它自动隐去；换边、调层数与曲线，悬停带体加深模糊。",

  api: API,
};
