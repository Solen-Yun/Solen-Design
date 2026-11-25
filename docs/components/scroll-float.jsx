/* Component metadata only — the live demo and gallery preview live in
   scroll-float-demo.jsx, the framework source texts and the prompt in
   scroll-float-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with scroll-float-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "children", type: "ReactNode", default: "—（必填）", description: "要浮层的文字；纯字符串/数字会被拆分，其他内容原样渲染不拆分" },
  { name: "scrollContainerRef", type: "RefObject<HTMLElement>", default: "—", description: "自定义滚动容器的 ref；不传则监听窗口滚动" },
  { name: "containerClassName", type: "string", default: '""', description: "标题元素附加类名" },
  { name: "textClassName", type: "string", default: '""', description: "内层文字 span 附加类名" },
  { name: "effect", type: '"float" | "wave" | "flip" | "scatter" | "blur"', default: '"float"', description: "浮层方式：基线拉伸上浮、波浪摆动、3D 翻面、散落漂移、模糊拉入" },
  { name: "splitBy", type: '"chars" | "words"', default: '"chars"', description: "动画单元：字符或整词" },
  { name: "direction", type: '"up" | "down"', default: '"up"', description: "文字从哪一侧归位" },
  { name: "order", type: '"start" | "end" | "center" | "edges" | "random"', default: '"start"', description: "错峰顺序：从头、从尾、从中心、从两侧、随机（种子稳定）" },
  { name: "fromColor", type: "string", default: '"currentColor"', description: "起始颜色，后半程过渡回自然文字色；currentColor 关闭换色" },
  { name: "animationDuration", type: "number", default: "1", description: "每段补间时长（秒）" },
  { name: "ease", type: "string", default: '"back.inOut(2)"', description: "补间缓动函数名" },
  { name: "scrollStart", type: "string", default: '"center bottom+=50%"', description: "ScrollTrigger 起始位置" },
  { name: "scrollEnd", type: "string", default: '"bottom bottom-=40%"', description: "ScrollTrigger 结束位置" },
  { name: "stagger", type: "number", default: "0.03", description: "相邻片段的错峰基数（秒），随 order 缩放" },
  { name: "distance", type: "number", default: "120", description: "片段离线的距离尺度（px）" },
  { name: "stretch", type: "number", default: "2.3", description: "起始时字符的纵向拉伸倍率（float/wave）" },
  { name: "smoothing", type: "number", default: "0", description: "大于 0 时滚动进度带平滑追赶（数值即平滑量）" },
];

export default {
  id: "scroll-float",
  name: "滚动浮层文字",
  href: "scroll-float.html",
  title: "滚动浮层文字",
  description:
    "文字随滚动从线的下方（或上方）浮回原位：默认效果像拉面一样从基线拉伸归位，另有波浪摆动、3D 翻面、种子稳定的散落漂移与模糊拉入四种；错峰顺序支持头/尾/中心/两侧/随机，可指定起始颜色在后半程过渡回自然色。进度由 ScrollTrigger 洗刷（可加平滑追赶），自定义滚动容器可用，弱动效直接静态呈现。",
  tags: ["React", "CSS", "GSAP", "滚动"],

  cardDescription: "字符从基线下方拉伸浮回原位，随滚动逐个归位。",

  demoHint: "在滚动框里上下滚动看浮层洗刷；换浮层方式与错峰顺序，调距离与拉伸。",

  api: API,
};
