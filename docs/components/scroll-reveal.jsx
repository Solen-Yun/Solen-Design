/* Component metadata only — the live demo and gallery preview live in
   scroll-reveal-demo.jsx, the framework source texts and the prompt in
   scroll-reveal-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with scroll-reveal-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "children", type: "ReactNode", default: "—（必填）", description: "要显影的文字；纯字符串/数字会被拆分，其他内容原样渲染不拆分" },
  { name: "scrollContainerRef", type: "RefObject<HTMLElement>", default: "—", description: "自定义滚动容器的 ref；不传则监听窗口滚动" },
  { name: "enableBlur", type: "boolean", default: "true", description: "允许片段从模糊到清晰" },
  { name: "baseOpacity", type: "number", default: "0.1", description: "片段起始透明度" },
  { name: "baseRotation", type: "number", default: "3", description: "整块文字的起始旋转角（°），随滚动回正；0 关闭" },
  { name: "blurStrength", type: "number", default: "4", description: "起始模糊半径（px）" },
  { name: "baseOffset", type: "number", default: "0", description: "片段初始下移距离（px），随显影归位" },
  { name: "stagger", type: "number", default: "0.05", description: "相邻片段之间的进度间隔" },
  { name: "smoothing", type: "number", default: "0", description: "大于 0 时滚动进度带平滑追赶（数值即平滑量）" },
  { name: "splitBy", type: '"words" | "chars" | "lines"', default: '"words"', description: "动画单元：词、字符或按视觉行分组的词" },
  { name: "effect", type: '"fade" | "rise" | "flip" | "scale"', default: '"fade"', description: "片段入场方式：淡入、遮罩上浮、底部翻转、缩放回弹" },
  { name: "mode", type: '"scrub" | "enter"', default: '"scrub"', description: "scrub 进度绑定滚动条；enter 进入视口后按时间轴播放一次" },
  { name: "duration", type: "number", default: "0.8", description: "enter 模式下每段的时长（秒），下限 0.05" },
  { name: "highlightColor", type: "string", default: '""', description: "显影中途扫过并回落的高光颜色" },
  { name: "containerClassName", type: "string", default: '""', description: "标题元素附加类名" },
  { name: "textClassName", type: "string", default: '""', description: "内层文字 span 附加类名" },
  { name: "rotationEnd", type: "string", default: '"bottom bottom"', description: "scrub 模式旋转动画的 ScrollTrigger 终点" },
  { name: "wordAnimationEnd", type: "string", default: '"bottom bottom"', description: "scrub 模式片段显影的 ScrollTrigger 终点" },
];

export default {
  id: "scroll-reveal",
  name: "滚动显影文字",
  href: "scroll-reveal.html",
  title: "滚动显影文字",
  description:
    "文字随滚动从模糊与低透明度里显影：按词/字/视觉行拆分并错峰推进，进度由 ScrollTrigger 洗刷（可加平滑追赶）或进入视口后按时间轴播放一次；四种入场（淡入、遮罩上浮、底部翻转、缩放回弹），整块文字随滚动从 3° 回正，可叠加中途扫过又回落的高光色。自定义滚动容器可用，弱动效直接静态呈现，卸载清理全部触发器与内联样式。",
  tags: ["React", "CSS", "GSAP", "滚动"],

  cardDescription: "文字随滚动从模糊中显影，逐词错峰浮现。",

  demoHint: "在滚动框里上下滚动看显影洗刷；换入场方式、开高光与旋转。",

  api: API,
};
