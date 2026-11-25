/* Component metadata only — the live demo and gallery preview live in
   blur-text-demo.jsx, the framework source texts and the prompt in
   blur-text-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with blur-text-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "text", type: "string", default: '""', description: "要揭示的文字；按空格拆成片段" },
  { name: "delay", type: "number", default: "200", description: "片段之间的错峰间隔（ms）；0 一起出现" },
  { name: "className", type: "string", default: '""', description: "段落附加类名" },
  { name: "animateBy", type: '"words" | "characters"', default: '"words"', description: "拆分粒度：整词或单字" },
  { name: "direction", type: '"top" | "bottom" | "left" | "right"', default: '"top"', description: "片段从哪个方向进场" },
  { name: "threshold", type: "number", default: "0.1", description: "view 触发的可见比例阈值" },
  { name: "rootMargin", type: "string", default: '"0px"', description: "view 触发的根元素外边距" },
  { name: "animationFrom", type: "object", default: "—", description: "自定义入场状态，替换内置 from 状态" },
  { name: "animationTo", type: "object[]", default: "—", description: "自定义关键帧序列，替换内置状态" },
  { name: "easing", type: "string | number[]", default: "—", description: "自定义关键帧的缓动；缺省线性" },
  { name: "onAnimationComplete", type: "() => void", default: "—", description: "揭示落定时回调" },
  { name: "stepDuration", type: "number", default: "0.35", description: "每步动画时长（秒）；总时长由此推出" },
  { name: "blur", type: "number", default: "10", description: "起始模糊半径（px）；同时缩放各效果的模糊量" },
  { name: "distance", type: "number", default: "50", description: "位移部分的行进距离（px）" },
  { name: "effect", type: '"blur" | "zoom" | "tilt" | "focus" | "drift"', default: '"blur"', description: "五种内置效果：模糊、缩放、翻转、聚焦、漂移" },
  { name: "staggerFrom", type: '"start" | "end" | "center" | "random"', default: '"start"', description: "错峰起点；random 按文本确定性洗牌" },
  { name: "trigger", type: '"view" | "load" | "hover" | "click"', default: '"view"', description: "启动方式；hover/click 在落定后交互重播" },
  { name: "loop", type: "boolean", default: "false", description: "循环：模糊退场后再重新聚焦" },
  { name: "loopDelay", type: "number", default: "2", description: "落定后到退场的间隔（秒）" },
  { name: "color", type: "string", default: "—", description: "段落文字颜色" },
  { name: "fromColor", type: "string", default: "—", description: "进出场时片段的着色，落定过渡回继承色" },
  { name: "focusOnHover", type: "boolean", default: "false", description: "悬停某个词时其余词模糊变暗" },
];

export default {
  id: "blur-text",
  name: "模糊聚焦文字",
  href: "blur-text.html",
  title: "模糊聚焦文字",
  description:
    "文字像失焦的镜头一样逐词聚焦：每个片段从模糊、透明、偏移的入场状态弹出，沿错峰顺序依次收敛到清晰，五种内置效果（模糊 / 缩放 / 3D 翻转 / 纯聚焦 / 漂移）各有自己的模糊档位、弹簧过冲与退场姿态；支持入视口、加载、悬停、点击四种触发，可循环退场再聚焦，悬停单词还能让其余词虚化变暗。",
  tags: ["React", "motion", "文字"],

  cardDescription: "词句从失焦到对焦逐个弹出，错峰汇聚成清晰文字。",

  demoHint: "切换五种效果与方向看不同入场姿态；hover/click 触发时移入或点击重播，开循环看退场再聚焦。",

  api: API,
};
