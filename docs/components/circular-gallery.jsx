/* Component metadata only — the live demo and gallery preview live in
   circular-gallery-demo.jsx, the framework source texts and the prompt in
   circular-gallery-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with circular-gallery-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "items", type: "{ image: string; text?: string; alt?: string; description?: string }[]", default: "DEFAULT_ITEMS", description: "画廊照片：地址 + 卡下标题 + 展开时显示的描述；缺省用十二张内置占位照片" },
  { name: "bend", type: "number", default: "3", description: "弧线弯曲度；正值两端下垂、负值两端上翘、0 为直排" },
  { name: "textColor", type: "string", default: '"#ffffff"', description: "标题、键盘高亮环、占位色与关闭按钮的颜色" },
  { name: "borderRadius", type: "number", default: "0.05", description: "卡片圆角占短边的比例，夹取 0–0.5" },
  { name: "font", type: "string", default: '"bold 30px Figtree"', description: "标题的 CSS font 简写；其中的 px 值决定所有文字的缩放" },
  { name: "fontUrl", type: "string", default: "—", description: "字体样式表或字体文件的地址，注册后重渲染；失败静默回退" },
  { name: "scrollSpeed", type: "number", default: "2", description: "滚轮与拖拽距离的倍率" },
  { name: "scrollEase", type: "number", default: "0.05", description: "0.001–1；条带追赶目标的速度，越大越跟手" },
  { name: "itemSize", type: "number", default: "1", description: "0.2–2；卡片高度相对视口的比例" },
  { name: "itemAspect", type: "number", default: "0.78", description: "卡片宽高比，夹取 0.2–5" },
  { name: "gap", type: "number", default: "0.26", description: "卡间距占卡宽的比例" },
  { name: "wave", type: "number", default: "1", description: "快速滚动时卡片的纸张涟漪幅度，下限 0" },
  { name: "fadeEdges", type: "number", default: "0.12", description: "两端渐隐区域占视口宽的比例，0–0.5" },
  { name: "shadow", type: "number", default: "0.25", description: "卡片下方投影强度 0–1" },
  { name: "grayscale", type: "boolean", default: "false", description: "静止时整条灰度；当前、悬停或键盘聚焦的卡保留彩色" },
  { name: "showTitles", type: "boolean", default: "true", description: "每张卡下方的标题文字" },
  { name: "snap", type: "boolean", default: "true", description: "拖拽与滚轮后吸附到最近的卡" },
  { name: "autoScroll", type: "number", default: "0", description: "闲置 1.8s 后的自动前进速度（卡/秒）；0 关闭，负值反向" },
  { name: "openOnClick", type: "boolean", default: "true", description: "点击卡片居中放大展开；关闭后点击仅作选中" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时播放错峰入场；减少动态时跳过" },
  { name: "onItemClick", type: "(item, index: number) => void", default: "—", description: "无拖动的卡片点击回调" },
  { name: "onActiveChange", type: "(index: number) => void", default: "—", description: "居中卡片变化时回调" },
  { name: "dpr", type: "number", default: "—", description: "覆盖画布的设备像素比，夹取到 2" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
];

export default {
  id: "circular-gallery",
  name: "弧形拖拽画廊",
  href: "circular-gallery.html",
  title: "弧形拖拽画廊",
  description:
    "一条 WebGL2 渲染的无缝环形胶片：圆角照片卡沿可弯曲的弧线排布并无限循环，拖拽、滚轮、方向键三种方式前进，快速滚动时卡片像纸一样起浪再舒展；点击卡片滑到正中放大展示原图、其余压暗退后、描述浮现，再点/空白处/关闭按钮/Escape 收回；标题用 DOM 文本贴着卡片随弧线旋转，两端渐隐；键盘导航有高亮环与隐藏按钮列表，纹理懒加载带占位色、随 items 修剪；弧度、卡尺寸、间距、灰度、投影、自动前进全部可调。",
  tags: ["React", "CSS", "WebGL", "画廊"],

  cardDescription: "无限循环的弧形照片胶片，拖拽滚轮随意滑，点卡片放大看原图。",

  demoHint: "拖住胶片用力一甩看涟漪与惯性吸附；点开一张卡再按 Escape 收回；把 bend 拉到 0 对比直排。",

  api: API,
};
