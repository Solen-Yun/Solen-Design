/* Component metadata only — the live demo and gallery preview live in
   fade-content-demo.jsx, the framework source texts and the prompt in
   fade-content-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with fade-content-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "children", type: "ReactNode", default: "—", description: "被淡入揭示的内容" },
  { name: "container", type: "string | HTMLElement", default: "—", description: "滚动触发用的滚动容器，选择器字符串或元素；缺省回退页面滚动器" },
  { name: "effect", type: '"fade" | "focus" | "develop" | "dissolve" | "mist" | "pixel"', default: '"fade"', description: "揭示方式：普通淡入、对焦显影、从灰度显影，或颗粒溶解、雾化、像素块三种噪声遮罩" },
  { name: "blur", type: "boolean | number", default: "false", description: "额外的模糊；true 为 10px，数字为 px，随进度衰减" },
  { name: "duration", type: "number", default: "1", description: "揭示时长（秒）；大于 10 的值按毫秒读" },
  { name: "ease", type: "string", default: '"power2.out"', description: "揭示的缓动名称" },
  { name: "delay", type: "number", default: "0", description: "揭示前的延迟（秒）" },
  { name: "threshold", type: "number", default: "0.1", description: "0–1，触发线与 scrub 区随视口高度偏移的比例" },
  { name: "initialOpacity", type: "number", default: "0", description: "起始透明度；也是噪声遮罩的地板，大于 0 时内容先以褪色态可见" },
  { name: "stagger", type: "number", default: "0", description: "直接子元素的逐个间隔（秒）；0 时整个包装器作为整体动画" },
  { name: "staggerFrom", type: "string | number", default: '"start"', description: "stagger 的起点（序号、start、end、center 等）" },
  { name: "trigger", type: '"scroll" | "mount"', default: '"scroll"', description: "滚动进入视口时播放，或挂载即播" },
  { name: "once", type: "boolean", default: "true", description: "滚动只播一次；关闭时回滚到触发线上方会倒放" },
  { name: "exit", type: "boolean", default: "false", description: "内容离开视口底部时淡出，回来时重播" },
  { name: "scrub", type: "boolean | number", default: "false", description: "揭示进度绑定滚动位置；数字为平滑追随的时长" },
  { name: "disappearAfter", type: "number", default: "0", description: "揭示完成多少秒后自动隐藏；0 关闭" },
  { name: "disappearDuration", type: "number", default: "0.5", description: "隐藏的时长（秒）" },
  { name: "disappearEase", type: "string", default: '"power2.in"', description: "隐藏的缓动名称" },
  { name: "onStart", type: "() => void", default: "—", description: "揭示开始时回调" },
  { name: "onComplete", type: "() => void", default: "—", description: "揭示完成时回调" },
  { name: "onDisappearanceComplete", type: "() => void", default: "—", description: "隐藏完成时回调" },
  { name: "className", type: "string", default: '""', description: "包装器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "包装器内联样式" },
];

export default {
  id: "fade-content",
  name: "滚动淡入包装器",
  href: "fade-content.html",
  title: "滚动淡入包装器",
  description:
    "内容进入视口时才显现的包装器：普通淡入之外还能对焦显影（模糊加缩放）、从灰度显影（去色去雾）、或穿过三种噪声遮罩——颗粒溶解、柔雾扩散、马赛克像素块——由 SVG feTurbulence 逐帧改写 33 级 sigmoid 透表驱动；支持子元素 stagger、离场淡出、滚动 scrub 绑定与定时隐藏，完成后清掉内联滤镜与节点。",
  tags: ["React", "GSAP", "滚动", "动效"],

  cardDescription: "进入视口才显现，可从灰度显影或穿过噪声溶解。",

  demoHint: "点重播看各种揭示；换 dissolve、mist、pixel 看噪声遮罩，调 initialOpacity 看褪色起步。",

  api: API,
};
