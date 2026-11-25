/* Component metadata only — the live demo and gallery preview live in
   swipe-toast-demo.jsx, the framework source texts and the prompt in
   swipe-toast-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with swipe-toast-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "title", type: "string", default: '"File archived"', description: "吐司的主文案" },
  { name: "description", type: "string", default: '""', description: "主文案下的次级行；为空不渲染" },
  { name: "icon", type: "ReactNode", default: "—", description: "标题前的前置图标，18px，对读屏隐藏" },
  { name: "actionLabel", type: "string", default: '""', description: "尾部操作按钮的文案；为空不渲染按钮" },
  { name: "onAction", type: "() => void", default: "—", description: "点击操作按钮时回调，随后吐司关闭" },
  { name: "open", type: "boolean", default: "true", description: "受控显隐；false 关闭，true 让同一实例重新弹出" },
  { name: "onClose", type: '(why: string) => void', default: "—", description: "关闭完成时回调；why 为 timeout / swipe / action / close / escape / programmatic" },
  { name: "background", type: "string", default: '"#27272a"', description: "卡片背景色" },
  { name: "color", type: "string", default: '"#f5f5f5"', description: "标题、图标与按钮的墨色" },
  { name: "fuseColor", type: "string", default: '"#f5a524"', description: "引信条的燃烧色" },
  { name: "width", type: "number", default: "356", description: "卡片宽度（px），受视口钳制" },
  { name: "radius", type: "number", default: "12", description: "卡片圆角（px）" },
  { name: "slideMs", type: "number", default: "400", description: "入场上滑的基础时长（ms）；关闭用时 0.7×" },
  { name: "settleBounce", type: "number", default: "0.2", description: "回弹不成立时弹回的弹簧幅度 0–1" },
  { name: "swipeDistance", type: "number", default: "40", description: "无甩动时触发下滑关闭的位移（px）" },
  { name: "duration", type: "number", default: "4000", description: "引信寿命（ms）；0 关闭引信与自动消失" },
  { name: "fuse", type: '"top" | "bottom"', default: '"bottom"', description: "引信条贴哪条边" },
  { name: "pauseOnHover", type: "boolean", default: "true", description: "鼠标悬停时暂停引信" },
  { name: "closeButton", type: "boolean", default: "false", description: "显示尾部关闭按钮" },
  { name: "inline", type: "boolean", default: "false", description: "文档流内渲染（grid 折叠），而非固定在视口角落" },
  { name: "dismissible", type: "boolean", default: "true", description: "允许下滑与 Escape 关闭" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
];

export default {
  id: "swipe-toast",
  name: "下滑消失吐司",
  href: "swipe-toast.html",
  title: "下滑消失吐司",
  description:
    "一张会烧引信的通知卡：从底部滑入后，一条 2px 渐变引信按剩余寿命线性烧尽，悬停、聚焦、拖动或切走标签页都会暂停引信；按住卡片往下滑，超过阈值或快速甩动就带着初速度滑出淡出，不够则带回弹弹簧弹回；Escape、操作按钮、关闭按钮同样关闭且键盘触发即时消失；@starting-style 入场、inline 模式用 grid 行折叠，受控 open 可反复唤醒同一实例。",
  tags: ["React", "CSS", "Motion", "通知"],

  cardDescription: "通知卡拖着一条会暂停的燃烧引信，下滑甩出去就消失，不够远就弹回来。",

  demoHint: "按住卡片往下滑：拖过阈值或快速一甩看它飞出，拖一半松手看它弹回；鼠标停在卡上引信会停。",

  api: API,
};
