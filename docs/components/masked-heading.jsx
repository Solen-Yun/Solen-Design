/* Component metadata only — the live demo and gallery preview live in
   masked-heading-demo.jsx, the framework source texts and the prompt in
   masked-heading-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with masked-heading-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "text", type: "string", default: '"Designed in the details"', description: "标题文字；按空格拆词做错峰入场" },
  { name: "tag", type: "string", default: '"h2"', description: "渲染的元素标签" },
  { name: "mediaType", type: '"image" | "video"', default: '"image"', description: "填充字形遮罩的媒体类型" },
  { name: "src", type: "string", default: '""', description: "媒体地址；图片可用 SVG data URI" },
  { name: "poster", type: "string", default: '""', description: "视频封面帧" },
  { name: "fillScale", type: "number", default: "1.25", description: "字形内媒体缩放；也是视差的余量" },
  { name: "parallax", type: "number", default: "26", description: "指针视差位移（px），媒体逆指针移动" },
  { name: "drift", type: "number", default: "18", description: "自主漂移幅度（px）" },
  { name: "hoverZoom", type: "number", default: "0", description: "悬停时缓入的额外缩放" },
  { name: "brightness", type: "number", default: "1", description: "媒体亮度滤镜" },
  { name: "saturation", type: "number", default: "1", description: "媒体饱和度滤镜" },
  { name: "grayscale", type: "boolean", default: "false", description: "完全去饱和" },
  { name: "tint", type: "string", default: '""', description: "媒体上的色彩混合层背景；留空关闭" },
  { name: "spotlight", type: "boolean", default: "false", description: "光斑外去饱和并压暗" },
  { name: "spotlightRadius", type: "number", default: "160", description: "光斑半径（px），下限 1" },
  { name: "outline", type: "boolean", default: "false", description: "叠一层字形描边空心轮廓" },
  { name: "outlineColor", type: "string", default: '""', description: "描边颜色；留空用 currentColor" },
  { name: "outlineWidth", type: "number", default: "1", description: "描边粗细（px）" },
  { name: "reveal", type: '"rise" | "scale" | "blur" | "wipe" | "fade" | "none"', default: '"rise"', description: "入场动画" },
  { name: "duration", type: "number", default: "1.1", description: "入场时长（秒）" },
  { name: "stagger", type: "number", default: "0.09", description: "逐词错峰间隔（秒），逐字入场用其 0.35 倍" },
  { name: "trigger", type: '"view" | "mount" | "hover"', default: '"view"', description: "入场时机；hover 每次进入重播" },
  { name: "align", type: "string", default: '"center"', description: "文字对齐" },
  { name: "weight", type: "number", default: "700", description: "字重" },
  { name: "tracking", type: "number", default: "-0.03", description: "字距（em）" },
  { name: "lineHeight", type: "number", default: "1.06", description: "行高" },
  { name: "textScale", type: "number", default: "0.115", description: "字号占块宽的比例，钳制 20–200px" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式，合并在组件样式之后" },
  { name: "...rest", type: "object", default: "—", description: "其余属性透传到根元素" },
];

export default {
  id: "masked-heading",
  name: "色网遮罩标题",
  href: "masked-heading.html",
  title: "色网遮罩标题",
  description:
    "标题字形本身就是遮罩：图片或视频从字形里透出来，媒体自主漂移、逆指针视差、悬停缩放，可叠色调混合层、去饱和，并可用跟随指针（或自动巡游）的光斑把光斑外压暗去饱和，另有一层空心描边轮廓；入场按词升起 / 缩放 / 模糊 / 擦除 / 淡入，字号随块宽流动，字体加载与窗口变化后自动重新对位。",
  tags: ["React", "GSAP", "CSS", "文字"],

  cardDescription: "标题字形当遮罩透出底层图片，媒体视差漂移，逐词入场。",

  demoHint: "切换入场方式与触发；开启聚光灯移动指针看光斑跟随；开描边看空心轮廓；调视差与漂移看媒体游走。",

  api: API,
};
