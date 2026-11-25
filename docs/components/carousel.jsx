/* Component metadata only — the live demo and gallery preview live in
   carousel-demo.jsx, the framework source texts and the prompt in
   carousel-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with carousel-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "items", type: "({ id?, image?, alt?, icon?, title?, description? } | string | ReactNode)[]", default: "DEFAULT_ITEMS", description: "卡片内容：对象可带图片、标题、描述与小图标；字符串当作图片地址；React 元素整体作为自定义卡片渲染" },
  { name: "baseWidth", type: "number", default: "300", description: "设计宽度（px），容器最宽不超过父级 100%" },
  { name: "aspectRatio", type: "number", default: "1.25", description: "卡片宽高比，夹取 0.3–4" },
  { name: "peek", type: "number", default: "0", description: "两侧露出邻卡的留白（px），上限为宽度的 20%；fade/cube 与圆形+外框下恒为 0" },
  { name: "gap", type: "number", default: "16", description: "轨道上相邻卡片的间距（px），负值按 0 处理" },
  { name: "radius", type: "number", default: "12", description: "卡片圆角（px）；圆形模式强制整圆" },
  { name: "frame", type: "boolean", default: "true", description: "舞台外的毛玻璃外框" },
  { name: "effect", type: '"tilt" | "slide" | "scale" | "fade" | "cube"', default: '"tilt"', description: "五式切换动效；非法值回退 tilt" },
  { name: "indicator", type: '"dots" | "bars" | "counter" | "none"', default: '"dots"', description: "进度指示：圆点 / 进度条（兼作自动播放进度）/ 页码 / 无" },
  { name: "arrows", type: "boolean", default: "false", description: "指示器两侧的前后箭头按钮" },
  { name: "autoplay", type: "boolean", default: "false", description: "按间隔自动前进一张" },
  { name: "autoplayDelay", type: "number", default: "3000", description: "自动播放间隔（ms），下限 600" },
  { name: "pauseOnHover", type: "boolean", default: "false", description: "指针悬停时暂停自动播放" },
  { name: "loop", type: "boolean", default: "false", description: "越过两端循环，并始终走最短路径" },
  { name: "draggable", type: "boolean", default: "true", description: "指针拖拽、甩动与横向滚轮滚动" },
  { name: "round", type: "boolean", default: "false", description: "圆形卡片（直径随宽高比与外框变化）" },
  { name: "initialIndex", type: "number", default: "0", description: "初始当前卡片，夹取进范围" },
  { name: "theme", type: '"dark" | "light"', default: '"dark"', description: "外框、卡片与文字的明暗主题" },
  { name: "onChange", type: "(index: number) => void", default: "—", description: "当前卡片索引变化时回调" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "carousel",
  name: "五式滑动卡片轮播",
  href: "carousel.html",
  title: "五式滑动卡片轮播",
  description:
    "一套可滑动的卡片轮播：每张卡沿轨道按姿态摆放，倾斜、平移、缩放、淡切、立方体五种切换动效即改即用；弹簧引擎以 240Hz 子步把每次选中滑到位，拖拽带速度甩动与越界橡皮筋，横向滚轮 120ms 后吸附，方向键/Home/End 可控；圆点、进度条、页码三种指示器与可选箭头，自动播放计时在悬停/聚焦/拖拽/离屏/隐藏页时暂停；毛玻璃外框、明暗两主题、圆形卡片模式，支持照片、文字与任意 React 内容卡片。",
  tags: ["React", "CSS", "轮播"],

  cardDescription: "五式切换动效的卡片轮播，拖拽甩动、滚轮吸附、自动播放计时条。",

  demoHint: "切五种动效各拖一次感受姿态差异；快速甩动看单张步进，开自动播放看进度条填充。",

  api: API,
};
