/* Component metadata only — the live demo and gallery preview live in
   circular-carousel-demo.jsx, the framework source texts and the prompt in
   circular-carousel-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with circular-carousel-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "items", type: "{ src: string; alt?: string; title?: string; subtitle?: string }[]", default: "DEFAULT_ITEMS", description: "环上的照片：地址 + 替代文本 + 标题/副标题；缺省用十张内置占位照片" },
  { name: "preset", type: '"cylinder" | "orbit" | "wheel" | "panorama"', default: '"cylinder"', description: "四种环体布局：圆柱、环绕广告牌、竖向摩天轮、内看全景；非法值回退 cylinder" },
  { name: "intro", type: '"assemble" | "rise" | "spin" | "none"', default: '"rise"', description: "入场动画：聚合、坠落、旋转展开、无；减少动态时强制 none" },
  { name: "cardWidth", type: "number", default: "220", description: "卡片宽度（px），下限 40；高度随宽高比" },
  { name: "aspectRatio", type: "number", default: "1", description: "卡片宽高比，夹取 0.2–5" },
  { name: "gap", type: "number", default: "25", description: "环上相邻卡片的间隙（px）" },
  { name: "curve", type: "number", default: "—", description: "0–1，平面多边形环与完全弯曲圆弧的混合；缺省取预设值" },
  { name: "tilt", type: "number", default: "—", description: "相机俯仰角（度）；缺省取预设值" },
  { name: "perspective", type: "number", default: "—", description: "场景透视距离（px）；缺省取预设值（panorama 用半径）" },
  { name: "autoplay", type: '"drift" | "step" | "off"', default: '"drift"', description: "匀速漂移 / 定步前进 / 关闭；减少动态时强制 off" },
  { name: "speed", type: "number", default: "14", description: "漂移速度（度/秒）" },
  { name: "interval", type: "number", default: "3", description: "定步间隔（秒），下限 0.5" },
  { name: "direction", type: '"left" | "right"', default: '"left"', description: "漂移与定步的前进方向" },
  { name: "draggable", type: "boolean", default: "true", description: "指针拖拽与横向滚轮转动" },
  { name: "momentum", type: "number", default: "0.6", description: "0–1；甩动后惯性滑行的时间常数" },
  { name: "snap", type: "boolean", default: "true", description: "停在最近的卡片而不是中途停住" },
  { name: "pauseOnHover", type: "boolean", default: "true", description: "指针悬停时暂停漂移与定步" },
  { name: "focusOnClick", type: "boolean", default: "true", description: "点击卡片把它转到正前方" },
  { name: "parallax", type: "number", default: "0.3", description: "0–1；相机随指针偏转的幅度" },
  { name: "stretch", type: "number", default: "0.5", description: "0–1；转速越快环体膨胀的幅度" },
  { name: "depthFade", type: "number", default: "0.55", description: "0–1；背面朝向时没入 fadeColor 的深度" },
  { name: "fadeColor", type: "string", default: '"#000000"', description: "远离卡片的遮罩色" },
  { name: "innerShade", type: "number", default: "0.6", description: "0–1；环体内侧/背面的压暗程度" },
  { name: "cornerRadius", type: "number", default: "12", description: "卡片圆角（px），按切片逐段应用" },
  { name: "captions", type: "boolean", default: "false", description: "底部标题 + 滚轮数字页码" },
  { name: "onChange", type: "(index: number) => void", default: "—", description: "正前方卡片变化时回调" },
  { name: "onItemClick", type: "(item, index: number) => void", default: "—", description: "点击卡片或按 Enter/Space 时回调" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
];

export default {
  id: "circular-carousel",
  name: "环形图片转盘",
  href: "circular-carousel.html",
  title: "环形图片转盘",
  description:
    "一排照片卡真立在 3D 圆环轨道上：拖拽带着惯性甩动、松手吸附最近一张、也可匀速漂移或定步轮播；每张卡切成八条可弯曲的瓦片贴着圆弧排布，圆角逐段应用；圆柱、环绕广告牌、竖向摩天轮、内看全景四种预设一键换形，聚合/坠落/旋转三套入场按角度错峰演出；相机随指针微偏、环体随转速膨胀、背面压暗没入底色，环体自动缩放适配容器；等长换图时旧图按角距错峰淡出。纯 DOM + CSS 3D，无 canvas。",
  tags: ["React", "CSS", "3D", "轮播"],

  cardDescription: "照片卡立成 3D 圆环，拖拽甩动带惯性、松手吸附、漂移轮播。",

  demoHint: "切四种预设各拖一圈；快速甩动看惯性吸附；点一张卡看它转到正前方；开 captions 看数字滚轮。",

  api: API,
};
