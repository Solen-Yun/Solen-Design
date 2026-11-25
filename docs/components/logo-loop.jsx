/* Component metadata only — the live demo and gallery preview live in
   logo-loop-demo.jsx, the framework source texts and the prompt in
   logo-loop-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with logo-loop-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "logos", type: '({ src, srcSet?, sizes?, width?, height?, alt?, title?, href?, hoverColor? } | { node: ReactNode; ariaLabel?, title?, href?, hoverColor? })[]', default: "—", description: "跑马灯条目；带 src 渲染图片，带 node 渲染自定义 React，带 href 渲染成新窗口链接" },
  { name: "speed", type: "number", default: "120", description: "巡航速度（px/s）" },
  { name: "direction", type: '"left" | "right" | "up" | "down"', default: '"left"', description: "行进方向；up/down 跑竖向跑马灯" },
  { name: "width", type: "number | string", default: '"100%"', description: "根元素宽度" },
  { name: "logoHeight", type: "number", default: "28", description: "Logo 高度（px），node 字号与标签字号随之缩放" },
  { name: "gap", type: "number", default: "32", description: "条目间距（px）" },
  { name: "pauseOnHover", type: "boolean", default: "—", description: "传 false 时悬停不停；默认悬停暂停" },
  { name: "hoverSpeed", type: "number", default: "—", description: "悬停时按该速度继续巡航，而不是暂停" },
  { name: "fadeOut", type: "boolean", default: "true", description: "两端渐隐遮罩" },
  { name: "fadeOutWidth", type: "number", default: "0.12", description: "每端渐隐占盒子的比例 0–0.5" },
  { name: "scaleOnHover", type: "boolean", default: "false", description: "悬停的 Logo 放大 1.2 倍" },
  { name: "layout", type: '"line" | "wave" | "arc" | "orbit"', default: '"line"', description: "条带路径：直线、正弦波、圆弧或 3D 环" },
  { name: "bend", type: "number", default: "0.5", description: "波动幅度 / 弧度曲率 / 环面倾角，−1–1" },
  { name: "focus", type: "number", default: "0", description: "中心透镜：中部条目放大 0–1" },
  { name: "magnify", type: "number", default: "0", description: "指针透镜：指针附近条目放大 0–1" },
  { name: "tiltX", type: "number", default: "0", description: "条带绕 X 轴旋转角度（度），±60" },
  { name: "tiltY", type: "number", default: "0", description: "条带绕 Y 轴旋转角度（度），±60" },
  { name: "step", type: "boolean", default: "false", description: "逐格步进，一次挪一个 Logo" },
  { name: "muted", type: "number", default: "0", description: "静置灰度化与压暗 0–1，悬停/聚焦恢复彩色" },
  { name: "labels", type: '"none" | "inline" | "below" | "hover"', default: '"none"', description: "条目标题的展示方式：不显示、旁列、下列或悬停提示" },
  { name: "draggable", type: "boolean", default: "true", description: "可拖拽滚动并甩动" },
  { name: "scrollBoost", type: "number", default: "0", description: "页面滚动速度喂给跑马灯的倍率" },
  { name: "intro", type: "boolean", default: "true", description: "首次入场的错峰上浮登场" },
  { name: "renderItem", type: "(item, key) => ReactNode", default: "—", description: "自定义条目渲染，替换默认的图片/节点标记" },
  { name: "ariaLabel", type: "string", default: '"Partner logos"', description: "region 的无障碍标签" },
  { name: "className", type: "string", default: "—", description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
];

export default {
  id: "logo-loop",
  name: "标志跑马灯",
  href: "logo-loop.html",
  title: "标志跑马灯",
  description:
    "无缝循环的标志跑马灯：整条按周期复制并实时测量，永远接缝不见；直线、正弦波、圆弧与 3D 环四种路径，中心聚焦透镜与跟随指针的放大透镜，拖拽甩动、页面滚动加速、悬停暂停或慢速巡航；条目可灰度静置、悬停恢复彩色、逐个换色、悬停出名称提示；支持逐格步进、错峰入场登场与竖向模式。布局引擎每帧只写变化的内联样式，静止自睡、离屏暂停。",
  tags: ["React", "CSS", "动效", "展示"],

  cardDescription: "无缝循环的标志跑马灯，可弯曲成波浪、圆弧与 3D 环。",

  demoHint: "拖一拖条带再松手看甩动；切 wave/arc/orbit 换路径，magnify 开启后透镜跟着指针走。",

  api: API,
};
