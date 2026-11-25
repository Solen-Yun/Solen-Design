/* Component metadata only — the live demo and gallery preview live in
   card-stack-swap-demo.jsx, the framework source texts and the prompt in
   card-stack-swap-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with card-stack-swap-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "items", type: "{ title?: string; image?: string; alt?: string; icon?: ReactNode }[]", default: "内置旅行卡片组", description: "卡片内容；渲染为图标 + 标题的头部和一张铺满的封面图，不传 children 时生效" },
  { name: "width", type: "number", default: "460", description: "单张卡片宽度（px），下限 40" },
  { name: "height", type: "number", default: "340", description: "单张卡片高度（px），下限 40" },
  { name: "cardDistance", type: "number", default: "60", description: "每层深度之间的水平错位（px）" },
  { name: "verticalDistance", type: "number", default: "70", description: "每层深度之间的纵向错位（px），卡片向上后退" },
  { name: "depth", type: "number", default: "90", description: "每层深度的 Z 轴偏移，决定透视缩小的幅度" },
  { name: "skewAmount", type: "number", default: "6", description: "整叠卡片沿卡片宽度的切变角度（deg）" },
  { name: "visibleCards", type: "number", default: "4", description: "可见的深度层数，收拢到 1–卡片总数" },
  { name: "delay", type: "number", default: "4000", description: "自动轮换间隔（ms），下限 400" },
  { name: "autoplay", type: "boolean", default: "true", description: "定时把最前面的卡片送回底部" },
  { name: "pauseOnHover", type: "boolean", default: "true", description: "指针悬停在卡片上时暂停自动轮换" },
  { name: "draggable", type: "boolean", default: "true", description: "允许拖拽并把最前面的卡片甩出去换位" },
  { name: "speed", type: "number", default: "1", description: "动效速度倍率 0.1–4，同时缩放弹簧、错峰与连点节奏" },
  { name: "bounce", type: "number", default: "0.35", description: "静止回弹的过冲量 0–1" },
  { name: "parallax", type: "number", default: "0.5", description: "光标驱动的透视摇摆幅度 0–1" },
  { name: "hoverSpread", type: "number", default: "0.12", description: "悬停时整叠卡片的额外散开量（以层距为单位）" },
  { name: "dim", type: "number", default: "0.5", description: "深层卡片的压暗程度 0–1" },
  { name: "cardRadius", type: "number", default: "18", description: "卡片圆角（px）" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时从一点散开并淡入的开场动画" },
  { name: "theme", type: '"dark" | "light"', default: '"dark"', description: "卡面、描边、阴影与文字的明暗主题" },
  { name: "onCardClick", type: "(index: number) => void", default: "—", description: "点击卡片回调（拖拽后不触发）" },
  { name: "onChange", type: "(frontIndex: number) => void", default: "—", description: "每次换位后回调新的最前卡片下标" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "children", type: "ReactNode", default: "—", description: "自定义卡片元素，传入后完全替代 items" },
];

export default {
  id: "card-stack-swap",
  name: "立体卡片轮换堆",
  href: "card-stack-swap.html",
  title: "立体卡片轮换堆",
  description:
    "一叠带透视的 3D 卡片：定时把最前面一张沿出口方向送出、再从叠底滑回，整叠错峰上移完成轮换；弹簧引擎按 240Hz 子步进积分，回弹、悬停散开、光标视差与深度压暗都可调，也支持指针拖拽甩卡、点击连跳、方向键换位，容器变小自动等比缩放。",
  tags: ["React", "CSS", "弹簧动画", "卡片"],

  cardDescription: "3D 卡片堆定时把最前一张甩回叠底，弹簧错峰轮换，可拖可点。",

  demoHint: "拖住最前面一张快速甩出去看飞行换位；调 bounce 看回弹过冲，关掉 autoplay 只玩手动。",

  api: API,
};
