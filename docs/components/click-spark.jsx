/* Component metadata only — the live demo and gallery preview live in
   click-spark-demo.jsx, the framework source texts and the prompt in
   click-spark-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with click-spark-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "sparkColor", type: "string | string[]", default: '"#fff"', description: "火花颜色，或在一个爆点内循环的调色板" },
  { name: "sparkSize", type: "number", default: "14", description: "线段与星星火花的尺寸（px）" },
  { name: "sparkRadius", type: "number", default: "30", description: "火花飞行的半径（px）" },
  { name: "sparkCount", type: "number", default: "8", description: "每个爆点的火花数，1–64" },
  { name: "sparkWidth", type: "number", default: "2", description: "线宽（px），下限 0.5" },
  { name: "duration", type: "number", default: "500", description: "爆点存活时长（ms），下限 60" },
  { name: "easing", type: '"linear" | "ease-in" | "ease-out" | "ease-in-out" | "spring"', default: '"ease-out"', description: "飞行的缓动；spring 带轻微过冲" },
  { name: "extraScale", type: "number", default: "1", description: "飞行半径的额外倍率" },
  { name: "shape", type: '"line" | "streak" | "dot" | "star"', default: '"line"', description: "火花形状：线段、彗星、圆点或四角星" },
  { name: "randomness", type: "number", default: "0.2", description: "0–1，角度、距离、大小与寿命的随机抖动" },
  { name: "gravity", type: "number", default: "0", description: "下坠力度，等效 500 × 值 px/s²" },
  { name: "spread", type: "number", default: "360", description: "爆点的扇形角度（度）" },
  { name: "direction", type: "number", default: "0", description: "扇形朝向（度），0 指向上" },
  { name: "glow", type: "number", default: "0", description: "0–1，火花底部的柔光晕" },
  { name: "ring", type: "boolean", default: "false", description: "点击点画一圈扩散圆环" },
  { name: "layer", type: '"front" | "back"', default: '"front"', description: "火花画在内容之上还是之下" },
  { name: "disabled", type: "boolean", default: "false", description: "关闭点击生成" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
  { name: "children", type: "ReactNode", default: "—", description: "被火花溅射的内容" },
  { name: "ref", type: "{ spark(x?, y?) }", default: "—", description: "命令式句柄：在根内坐标生成爆点，缺省为中心" },
];

export default {
  id: "click-spark",
  name: "点击火花",
  href: "click-spark.html",
  title: "点击火花",
  description:
    "每次点击从光标炸开一圈火花：线段、彗星、圆点或四角星向外飞行、衰减、下坠，可叠加柔光晕与点击圆环。每个爆点用一张按包围盒裁切的独立 Canvas 绘制，火花能从按钮和卡片边缘溅出而不被裁掉；调色板逐颗循环，减少动态时收缩为短促淡出，并暴露命令式 spark(x, y) 供程序触发。",
  tags: ["React", "Canvas", "交互", "动效"],

  cardDescription: "点哪儿哪儿炸开一圈火花，从按钮边缘溅射而出。",

  demoHint: "在舞台任意处点击看火花，点按钮看溅射；切换形状、调色板与重力下坠。",

  api: API,
};
