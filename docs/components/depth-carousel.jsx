/* Component metadata only — the live demo and gallery preview live in
   depth-carousel-demo.jsx, the framework source texts and the prompt in
   depth-carousel-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with depth-carousel-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "items", type: "(string | { image: string; alt?: string })[]", default: "DEFAULT_ITEMS", description: "幻灯片；字符串就是图片地址，对象可带 alt；缺省用六张内置占位照片" },
  { name: "cardWidth", type: "number", default: "300", description: "卡片宽度（px），也参与拖拽与滚轮步长的计算" },
  { name: "cardHeight", type: "number", default: "380", description: "卡片高度（px）" },
  { name: "radius", type: "number", default: "18", description: "卡片圆角（px）" },
  { name: "tint", type: "string", default: '"#05060a"', description: "纵深卡片上叠的乘法压暗色" },
  { name: "depth", type: "number", default: "220", description: "每后退一格的 Z 距离（px）" },
  { name: "spread", type: "number", default: "90", description: "每横移一格的 X 距离（px）" },
  { name: "tilt", type: "number", default: "22", description: "后退第一张绕 Y 轴的倾角（度）" },
  { name: "tiltDirection", type: '"left" | "right"', default: '"right"', description: "轨道朝哪边跑、卡片往哪边偏" },
  { name: "perspective", type: "number", default: "1400", description: "舞台透视距离（px）" },
  { name: "visibleCards", type: "number", default: "4", description: "焦点之外每侧保留可见的卡数" },
  { name: "falloff", type: "number", default: "0.2", description: "每退一格变暗的速率（同时驱动压暗叠色）" },
  { name: "blur", type: "number", default: "6", description: "最深处可见卡的最大模糊（px）" },
  { name: "duration", type: "number", default: "700", description: "聚焦补间时长（ms）" },
  { name: "ease", type: "string", default: '"power3.out"', description: "聚焦补间的缓动名" },
  { name: "autoplay", type: "boolean", default: "false", description: "未悬停、未聚焦时按间隔自动前进" },
  { name: "autoplayDelay", type: "number", default: "3200", description: "自动前进间隔（ms），下限 600" },
  { name: "loop", type: "boolean", default: "true", description: "双向无限循环；关闭后首尾钳制" },
  { name: "showControls", type: "boolean", default: "true", description: "显示前后箭头按钮" },
  { name: "showIndicators", type: "boolean", default: "true", description: "显示底部圆点指示器" },
  { name: "onChange", type: "(index: number, item) => void", default: "—", description: "聚焦卡片变化时回调，携带序号与数据" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
];

export default {
  id: "depth-carousel",
  name: "纵深轨道卡片流",
  href: "depth-carousel.html",
  title: "纵深轨道卡片流",
  description:
    "一条 3D 纵深轨道上的照片卡流：焦点卡居中在前，其余沿 Z 后退、沿 X 散开并绕 Y 倾斜，越深越暗、叠色越重、模糊越大，已划过的卡淡出；拖拽甩动带速度投射吸附、滚轮步进 130ms 吸附、方向键、点卡与圆点都能聚焦，自动播放会在悬停或聚焦时暂停；loop 双向无限循环，窄容器整体按比例缩小，聚焦补间走 GSAP 缓动。",
  tags: ["React", "CSS", "GSAP", "3D", "轮播"],

  cardDescription: "卡片沿 3D 轨道退进纵深，越深越暗越糊，拖拽甩动带惯性吸附。",

  demoHint: "拖住甩一下看惯性投射吸附；滚轮步进看逐卡退进；开自动播放并悬停暂停试试。",

  api: API,
};
