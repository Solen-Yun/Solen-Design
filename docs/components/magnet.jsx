/* Component metadata only — the live demo and gallery preview live in
   magnet-demo.jsx, the framework source texts and the prompt in
   magnet-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with magnet-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "children", type: "ReactNode", default: "—", description: "被吸附的内容" },
  { name: "padding", type: "number", default: "100", description: "元素边缘之外的吸引半径（px）；0 表示只在元素自身上吸附" },
  { name: "disabled", type: "boolean", default: "false", description: "整体关闭磁吸" },
  { name: "magnetStrength", type: "number", default: "2", description: "跟随强度：光标偏移量除以该值，越大越弱" },
  { name: "maxOffset", type: "number", default: "—", description: "吸附偏移的长度上限（px）" },
  { name: "exclusive", type: "boolean", default: "true", description: "只让最近的一个磁体响应；false 时各自范围内的磁体同时响应" },
  { name: "axis", type: '"both" | "x" | "y"', default: '"both"', description: "吸附生效的轴向" },
  { name: "tilt", type: "number", default: "0", description: "朝光标方向的 3D 倾斜（deg）" },
  { name: "scale", type: "number", default: "1", description: "满拉力时的额外缩放（目标 = 1 + (scale − 1) × 拉力）" },
  { name: "spring", type: "{ stiffness?: number; damping?: number; mass?: number }", default: "—", description: "弹簧参数，默认 stiffness 170 / damping 16 / mass 1" },
  { name: "onActiveChange", type: "(active: boolean) => void", default: "—", description: "吸附状态开始或结束时回调" },
  { name: "wrapperClassName", type: "string", default: '""', description: "外层 div 的类名" },
  { name: "innerClassName", type: "string", default: '""', description: "位移层 div 的类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "外层 div 的内联样式" },
  { name: "...rest", type: '-', default: "—", description: "其余属性透传到外层 div" },
];

export default {
  id: "magnet",
  name: "磁吸容器",
  href: "magnet.html",
  title: "磁吸容器",
  description:
    "内容会朝靠近的光标缓移、离开后弹回的磁吸包装器：外层 div 锚定矩形，只有内层 div 位移；全局指针场算出元素边缘之外的吸附距离，拉力曲线在半径内半程满力、外缘归零，偏移除以强度、可限最长距离、可锁单轴，tilt 与 scale 随同一条拉力曲线淡入；手写弹簧积分（默认 170/16/1，120Hz 子步）驱动回弹，静止自睡。多实例共享一个仲裁器，默认只让最近的磁体响应；data-magnet-active 与 onActiveChange 汇报状态，减少动态时完全不动。",
  tags: ["React", "弹簧物理", "光标", "交互"],

  cardDescription: "内容被光标磁吸过去，离开后弹簧回弹。",

  demoHint: "在按钮和卡片之间来回移动看仲裁切换；调大 magnetStrength 感受跟随变弱，加 tilt 与 scale 看拉力淡入。",

  api: API,
};
