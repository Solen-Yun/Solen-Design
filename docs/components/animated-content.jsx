/* Component metadata only — the live demo and gallery preview live in
   animated-content-demo.jsx, the framework source texts and the prompt in
   animated-content-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with animated-content-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "children", type: "ReactNode", default: "—", description: "被入场动画揭示的内容" },
  { name: "container", type: "string | HTMLElement", default: "—", description: "滚动触发用的滚动容器，选择器字符串或元素；缺省回退页面滚动器" },
  { name: "distance", type: "number", default: "100", description: "滑入位移（px）" },
  { name: "direction", type: '"vertical" | "horizontal"', default: '"vertical"', description: "滑入的轴向" },
  { name: "reverse", type: "boolean", default: "false", description: "从相反方向滑入" },
  { name: "duration", type: "number", default: "0.8", description: "入场时长（秒）" },
  { name: "ease", type: "string", default: '"power3.out"', description: "入场的缓动名称" },
  { name: "initialOpacity", type: "number", default: "0", description: "animateOpacity 开启时的起始透明度" },
  { name: "animateOpacity", type: "boolean", default: "true", description: "是否参与透明度动画" },
  { name: "scale", type: "number", default: "1", description: "起始缩放；1 即关闭缩放位移" },
  { name: "blur", type: "number", default: "0", description: "起始模糊（px）；0 即关闭模糊位移" },
  { name: "rotate", type: "number", default: "0", description: "起始 2D 旋转角（度）" },
  { name: "tilt", type: "number", default: "0", description: "起始 3D 倾斜角（度），竖直滑动用 rotationX、水平用 rotationY" },
  { name: "wipe", type: '"none" | "up" | "down" | "left" | "right" | "center"', default: '"none"', description: "柔边渐变遮罩擦亮方向，center 从中心扩散" },
  { name: "threshold", type: "number", default: "0.1", description: "0–1，触发线随视口高度偏移的比例" },
  { name: "delay", type: "number", default: "0", description: "入场前的延迟（秒）" },
  { name: "stagger", type: "number", default: "0", description: "直接子元素的逐个间隔（秒）；0 时整个包装器作为整体动画" },
  { name: "staggerFrom", type: "string | number", default: '"start"', description: "stagger 的起点（序号、start、end、center 等）" },
  { name: "trigger", type: '"scroll" | "mount"', default: '"scroll"', description: "滚动进入视口时播放，或挂载即播" },
  { name: "once", type: "boolean", default: "true", description: "滚动只播一次；关闭时回滚到触发线上方会倒放" },
  { name: "scrub", type: "boolean | number", default: "false", description: "进度绑定滚动位置；数字为平滑追随的滞后" },
  { name: "disappearAfter", type: "number", default: "0", description: "入场完成多少秒后播放退场；0 关闭" },
  { name: "disappearDuration", type: "number", default: "0.5", description: "退场时长（秒）" },
  { name: "disappearEase", type: "string", default: '"power3.in"', description: "退场的缓动名称" },
  { name: "onStart", type: "() => void", default: "—", description: "入场开始时回调" },
  { name: "onComplete", type: "() => void", default: "—", description: "入场完成时回调" },
  { name: "onDisappearanceComplete", type: "() => void", default: "—", description: "退场完成时回调" },
  { name: "className", type: "string", default: '""', description: "包装器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "包装器内联样式" },
];

export default {
  id: "animated-content",
  name: "滚动入场包装器",
  href: "animated-content.html",
  title: "滚动入场包装器",
  description:
    "一个把入场动作合并成一次演出的包装器：轴向滑入叠加模糊、缩放、2D 旋转与 3D 倾斜，柔边渐变遮罩擦亮内容；滚动进入视口、挂载即播或进度直接绑定滚动（可平滑追随），直接子元素可逐个 stagger，完成后清除内联变换，也能在指定秒数后自动退场。GSAP 时间线驱动，减少动态时直接显示。",
  tags: ["React", "GSAP", "滚动", "动效"],

  cardDescription: "滑入、模糊、倾斜、遮罩擦亮一次完成，滚动进入即演。",

  demoHint: "点重播看完整入场；叠加模糊、倾斜与遮罩擦亮，调 stagger 看子元素逐个入场。",

  api: API,
};
