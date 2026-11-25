/* Component metadata only — the live demo and gallery preview live in
   stroke-text-demo.jsx, the framework source texts and the prompt in
   stroke-text-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with stroke-text-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "text", type: "string", default: '"Draw Attention"', description: "标题文字" },
  { name: "strokeColor", type: "string", default: '"#A78BFA"', description: "描边颜色" },
  { name: "fillColor", type: "string", default: '"currentColor"', description: "描完落下的填充色；默认继承文字色" },
  { name: "strokeWidth", type: "number", default: "1.4", description: "描边粗细（SVG 单位）" },
  { name: "drawDuration", type: "number", default: "1.6", description: "描边画完的时长（秒）" },
  { name: "fillDelay", type: "number", default: "0.2", description: "描完到填充开始的间隔（秒）" },
  { name: "stagger", type: "number", default: "0.05", description: "逐字符错峰间隔（秒）" },
  { name: "ease", type: "string", default: '"power2.out"', description: "描边缓动曲线" },
  { name: "trigger", type: '"mount" | "scroll" | "hover" | "loop"', default: '"mount"', description: "mount 挂载即播；scroll 入视口播一次；hover 悬停重播；loop 往复循环" },
  { name: "fillMode", type: '"wipe" | "fade" | "none"', default: '"wipe"', description: "填充出现方式：擦除、淡入或不填充" },
  { name: "wipeFrom", type: '"left" | "right" | "top" | "bottom"', default: '"left"', description: "擦除生长的起始边" },
  { name: "fontSize", type: "number", default: "128", description: "字号（px）" },
  { name: "fontWeight", type: "number", default: "800", description: "字重" },
  { name: "fontFamily", type: "string", default: '"inherit"', description: "字体；inherit 沿用页面字体" },
  { name: "letterSpacing", type: "number", default: "-4", description: "字距（px）" },
  { name: "reverse", type: "boolean", default: "false", description: "错峰从最后一个字符开始" },
  { name: "strokeStyle", type: '"solid" | "dashed" | "dotted"', default: '"solid"', description: "描边线型；dashed/dotted 走图案遮罩" },
  { name: "dashLength", type: "number", default: "10", description: "虚线/点线图案的基准长度" },
  { name: "marching", type: "boolean", default: "false", description: "虚线沿轮廓跑动的蚂蚁线循环" },
  { name: "hoverRedraw", type: "boolean", default: "false", description: "画完后悬停重描一遍（mount/scroll 触发时生效）" },
  { name: "shadow", type: "boolean", default: "false", description: "填充落下后升起的投影" },
  { name: "shadowColor", type: "string", default: "—", description: "投影颜色；缺省用描边色" },
  { name: "className", type: "string", default: '""', description: "根节点附加类名" },
  { name: "style", type: "CSSProperties", default: "{}", description: "根节点内联样式" },
];

export default {
  id: "stroke-text",
  name: "描边自绘文字",
  href: "stroke-text.html",
  title: "描边自绘文字",
  description:
    "SVG 大标题：空心字形逐字符描边画上去，随后填充从一侧擦入或逐字淡入，投影跟着落下；实线走逐字符描边编排，虚线/点线经腐蚀遮罩只留外圈图案并支持蚂蚁线跑动；mount / scroll / hover / loop 四种触发，量宽自适应容器。",
  tags: ["React", "GSAP", "SVG", "文字"],

  cardDescription: "空心字逐笔画上去，填充再从一侧擦入，落定时投影升起。",

  demoHint: "切换触发方式对比 mount / hover / loop；虚线线型打开蚂蚁线看图案沿轮廓跑动。",

  api: API,
};
