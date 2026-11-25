/* Component metadata only — the live demo and gallery preview live in
   scroll-expand-demo.jsx, the framework source texts and the prompt in
   scroll-expand-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with scroll-expand-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "src", type: "string", default: '""', description: "媒体地址（图片或视频）" },
  { name: "mediaType", type: '"image" | "video"', default: '"image"', description: "框内的媒体类型" },
  { name: "poster", type: "string", default: '""', description: "视频类型的封面帧" },
  { name: "alt", type: "string", default: '""', description: "图片类型的替代文本" },
  { name: "title", type: "string", default: '""', description: "居中大标题；留空不渲染" },
  { name: "scrollHint", type: "string", default: '""', description: "底部小字提示；留空不渲染" },
  { name: "startWidth", type: "number", default: "42", description: "进度 0 时的框宽（舞台宽度的 %）" },
  { name: "startHeight", type: "number", default: "58", description: "进度 0 时的框高（舞台高度的 %）" },
  { name: "startRadius", type: "number", default: "24", description: "进度 0 时的圆角（px）" },
  { name: "endRadius", type: "number", default: "0", description: "进度 1 时的圆角（px）" },
  { name: "mediaZoom", type: "number", default: "1.35", description: "进度 0 时媒体的放大倍率，随展开松弛回 1" },
  { name: "scrollDistance", type: "number", default: "1.2", description: "展开过程消耗的滚动量（舞台高度倍数）" },
  { name: "holdDistance", type: "number", default: "0.35", description: "全幅展开后保持的额外滚动量（舞台高度倍数）" },
  { name: "smoothing", type: "number", default: "0.1", description: "指数跟随的迟滞；0 直接贴合" },
  { name: "overlayScrim", type: "number", default: "0.45", description: "压暗渐变蒙层的峰值不透明度" },
  { name: "useWindowScroll", type: "boolean", default: "false", description: "绑定页面滚动，而不是用内置隐藏滚动条的内部滚动" },
  { name: "enabled", type: "boolean", default: "true", description: "false 时进度钉在 1，永远全幅" },
  { name: "children", type: "ReactNode", default: "—", description: "全幅展开后浮现的覆盖层内容" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
  { name: "...rest", type: '-', default: "—", description: "其余属性透传到根元素" },
];

export default {
  id: "scroll-expand",
  name: "滚动全幅展开",
  href: "scroll-expand.html",
  title: "滚动全幅展开",
  description:
    "一个圆角媒体框随滚动长成通栏：滚动条隐藏的内部滚动器（或绑定页面滚动）喂出一个进度值，全部画面由帧上的一条 clip-path inset 与媒体的一档 scale 推演——框从居中圆角长到全幅，媒体从 1.35 倍松弛回 1，压暗蒙层同步升起，大标题在中段上浮退场、底部提示在开头消散、覆盖层内容在全幅时浮现；sticky 舞台 + 可调展开段与保持段，指数跟随让进度有迟滞，减少动态直接贴合，resize 重测不残留旧姿态。",
  tags: ["React", "CSS", "滚动", "滚动叙事"],

  cardDescription: "圆角媒体框随滚动展开成通栏，覆盖层在全幅时浮现。",

  demoHint: "在框内滚动看展开全程；调展开段与保持段改变节奏，关掉平滑感受逐帧贴合，禁用后直接全幅。",

  api: API,
};
