/* Component metadata only — the live demo and gallery preview live in
   stack-demo.jsx, the framework source texts and the prompt in
   stack-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with stack-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "cards", type: "ReactNode[]", default: "内置图片卡", description: "卡片内容，任意节点列表，自底向上渲染" },
  { name: "layout", type: '"fan" | "cascade" | "deck" | "pile"', default: '"fan"', description: "牌堆姿态：扇形、斜叠、层叠、乱堆" },
  { name: "visible", type: "number", default: "4", description: "可见卡片数，其余淡出" },
  { name: "spread", type: "number", default: "0.5", description: "姿态偏移倍率 0–2" },
  { name: "depth", type: "number", default: "0.5", description: "下层卡片的缩小与压暗程度 0–1" },
  { name: "radius", type: "number", default: "16", description: "卡片圆角（含白框）" },
  { name: "frame", type: "number", default: "0", description: "卡片内容外围白框厚度（px）" },
  { name: "frameColor", type: "string", default: '"#ffffff"', description: "白框颜色" },
  { name: "shadow", type: "boolean", default: "true", description: "卡片投影" },
  { name: "tilt", type: "number", default: "30", description: "拖动时卡面 3D 倾斜上限 0–89" },
  { name: "threshold", type: "number", default: "90", description: "甩出阈值拖距（px）" },
  { name: "speed", type: "number", default: "1", description: "全局弹簧速度倍率 0.2–4" },
  { name: "sendToBackOnClick", type: "boolean", default: "false", description: "纯点击也把顶卡甩到底部" },
  { name: "autoplay", type: "boolean", default: "false", description: "定时自动把顶卡甩到底部" },
  { name: "autoplayDelay", type: "number", default: "3000", description: "自动播放间隔（ms，最小 300）" },
  { name: "pauseOnHover", type: "boolean", default: "false", description: "悬停时暂停自动播放" },
  { name: "onChange", type: "(index: number) => void", default: "—", description: "顺序变化后回调新的顶卡序号" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
];

export default {
  id: "stack",
  name: "可甩卡片堆",
  href: "stack.html",
  title: "可甩卡片堆",
  description:
    "一叠能甩的卡片：拖住顶卡时卡面朝拖拽方向 3D 倾斜、其余卡片被越拉越起，松手超过阈值就连速度一起飞出、从牌堆下方塞回去，轻弹回弹；扇形/斜叠/层叠/乱堆四种姿态共用一套弹簧物理，支持自动播放、点击换位与键盘操作，Motion motionValue 驱动、飞卡与回位全程不丢 z。",
  tags: ["React", "Motion", "交互"],

  cardDescription: "顶卡拖着走、甩出去从牌堆底下塞回来，四种堆叠姿态共用弹簧物理。",

  demoHint: "拖住顶卡甩出去看它从底下塞回；切四种姿态、调阈值和倾斜角，开自动播放看连甩。",

  api: API,
};
