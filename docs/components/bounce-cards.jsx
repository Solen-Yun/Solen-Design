/* Component metadata only — the live demo and gallery preview live in
   bounce-cards-demo.jsx, the framework source texts and the prompt in
   bounce-cards-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with bounce-cards-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "images", type: "(string | { src: string; alt?: string })[]", default: "[]", description: "照片卡；字符串就是地址，对象可带 alt" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
  { name: "containerWidth", type: "number", default: "400", description: "舞台宽度（px）" },
  { name: "containerHeight", type: "number", default: "400", description: "舞台高度（px）" },
  { name: "cardSize", type: "number", default: "200", description: "方形卡边长（px），下限 10" },
  { name: "spread", type: "number", default: "85", description: "相邻卡槽的水平间距（px）" },
  { name: "rotation", type: "number", default: "10", description: "基础倾角幅度（度）；每张卡乘一个固定的交替节奏" },
  { name: "arc", type: "number", default: "0", description: "两端卡的抛物线抬升（px）；正值两端上翘，负值下垂" },
  { name: "animationDelay", type: "number", default: "0.5", description: "第一张卡弹出的延迟（秒）" },
  { name: "animationStagger", type: "number", default: "0.06", description: "每张卡递增的出场间隔（秒）" },
  { name: "bounciness", type: "number", default: "0.6", description: "弹出回弹 0–1；0 落地即停，1 抖个不停" },
  { name: "enableHover", type: "boolean", default: "true", description: "悬停摆正、抬升并推开邻卡" },
  { name: "pushDistance", type: "number", default: "160", description: "悬停时邻卡沿 x 逃开的距离（px）" },
  { name: "hoverScale", type: "number", default: "1.06", description: "悬停卡的缩放，夹取 0.5–2" },
  { name: "borderWidth", type: "number", default: "5", description: "白框厚度（px）" },
  { name: "borderColor", type: "string", default: '"#ffffff"', description: "相框颜色（也是卡片底色）" },
  { name: "radius", type: "number", default: "25", description: "卡片圆角（px）" },
  { name: "shadow", type: "boolean", default: "true", description: "柔和投影，悬停卡加深" },
  { name: "transformStyles", type: "string[]", default: "—", description: "逐卡的 transform 字符串（translate + rotate），覆盖计算出的卡槽" },
  { name: "onCardClick", type: "(index: number) => void", default: "—", description: "点击/Enter/Space 回调；传入后卡片变成可聚焦按钮" },
];

export default {
  id: "bounce-cards",
  name: "弹跳散开照片扇",
  href: "bounce-cards.html",
  title: "弹跳散开照片扇",
  description:
    "一把弹簧驱动的照片扇：卡片按固定倾角节奏散布在容器中央（可加抛物线弧度），挂载后逐张带过冲地弹入；悬停某张卡它被摆平、抬升、放大，邻卡沿弹簧逃开，点击还会给一记压扁脉冲；全部运动来自手写的 240Hz 半隐式欧拉弹簧（位移、倾角、缩放三通道），帧循环稳定后自睡，prop 变化实时重定目标，提供 onCardClick 时卡片是真正的可聚焦按钮。",
  tags: ["React", "CSS", "弹簧物理", "照片墙"],

  cardDescription: "照片扇逐张弹入，悬停哪张哪张摆平抬升，邻卡被弹簧推开。",

  demoHint: "来回扫过卡片看摆正与逃开；把回弹拉满再点一张卡看它被压扁弹回。",

  api: API,
};
