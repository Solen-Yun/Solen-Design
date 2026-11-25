/* Component metadata only — the live demo and gallery preview live in
   scroll-velocity-demo.jsx, the framework source texts and the prompt in
   scroll-velocity-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with scroll-velocity-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "texts", type: "ReactNode[]", default: "[]", description: "每条一行跑马灯；奇数行反向移动" },
  { name: "velocity", type: "number", default: "100", description: "偶数行的基础速度（px/s）；奇数行取反" },
  { name: "scrollContainerRef", type: "RefObject", default: "—", description: "要监听的滚动容器；不传则监听页面滚动" },
  { name: "className", type: "string", default: '""', description: "每份拷贝的附加类名" },
  { name: "damping", type: "number", default: "50", description: "滚动速度弹簧的阻尼" },
  { name: "stiffness", type: "number", default: "400", description: "滚动速度弹簧的刚度" },
  { name: "numCopies", type: "number", default: "6", description: "每行循环的文本拷贝数" },
  { name: "velocityMapping", type: "{ input: number[]; output: number[] }", default: "{ input: [0, 1000], output: [0, 5] }", description: "滚动速度到速度倍率的映射，不截断" },
  { name: "parallaxClassName", type: "string", default: '"parallax"', description: "每行外层容器的类名" },
  { name: "scrollerClassName", type: "string", default: '"scroller"', description: "每条移动条带的类名" },
  { name: "parallaxStyle", type: "CSSProperties", default: "—", description: "行容器内联样式" },
  { name: "scrollerStyle", type: "CSSProperties", default: "—", description: "移动条带内联样式" },
  { name: "separator", type: "ReactNode", default: '""', description: "重复文本之间插入的分隔节点" },
  { name: "pauseOnHover", type: "boolean", default: "false", description: "悬停时平滑停下" },
  { name: "fadeEdges", type: "boolean", default: "false", description: "两侧外沿 12% 渐隐遮罩" },
  { name: "skewWithVelocity", type: "number", default: "0", description: "满强度涌动时的倾斜角度（度）" },
  { name: "scaleWithVelocity", type: "number", default: "0", description: "满强度涌动时的额外缩放（1 + 系数 × 涌动）" },
  { name: "outlineAlternate", type: "boolean", default: "false", description: "奇数行渲染成描边空心字" },
  { name: "gap", type: "number", default: "0", description: "重复之间的间距（px）；无分隔符时作右内边距，有分隔符时作其左右外边距" },
  { name: "fontSize", type: "number | string", default: "—", description: "字号，数字按 px" },
  { name: "fontWeight", type: "number | string", default: "—", description: "字重" },
  { name: "color", type: "string", default: "—", description: "文字颜色" },
  { name: "draggable", type: "boolean", default: "false", description: "可以抓住条带直接拖拽并甩出" },
];

export default {
  id: "scroll-velocity",
  name: "滚动速度跑马灯",
  href: "scroll-velocity.html",
  title: "滚动速度跑马灯",
  description:
    "滚动速度跑马灯：每行文字无缝循环，速度与方向跟随滚动速度——顺滚越滚越快、逆滚直接掉头，弹簧平滑后的速度经映射表放大；可叠加速度驱动的倾斜与拉伸、悬停平滑暂停、直接抓取拖拽甩出、两侧渐隐与奇数行空心描边，reduced-motion 下整列静止。",
  tags: ["React", "Motion", "CSS", "文字"],

  cardDescription: "跑马灯跟着滚轮加速掉头，还能抓住甩出去。",

  demoHint: "在下方滚动框里滚一滚看条带加速掉头；打开倾斜和拉伸更夸张，还能直接抓住甩。",

  api: API,
};
