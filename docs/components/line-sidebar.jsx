/* Component metadata only — the live demo and gallery preview live in
   line-sidebar-demo.jsx, the framework source texts and the prompt in
   line-sidebar-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "line-sidebar",
  name: "线条侧边栏",
  href: "line-sidebar.html",
  title: "线条侧边栏",
  description:
    "一列带序号的导航条目，指针靠近时文字染上强调色并向右滑出、标记线变长变亮，颜色与位移由每个条目同一个连续 effect 值经帧率无关的指数平滑逐帧驱动，点击选中保持高亮。",

  cardDescription: "指针靠近时文字染色右移，标记线与刻度线同步生长。",

  demoHint: "指针沿列表上下移动感受接近度；点击选中保持高亮；三个颜色和全部几何参数可调。",



  api: [
    { name: "items", type: "string[]", default: "12 项默认列表", description: "侧边栏条目标签" },
    { name: "accentColor", type: "string", default: '"#A855F7"', description: "指针接近时染向的强调色" },
    { name: "textColor", type: "string", default: '"#c4c4c4"', description: "文字静止颜色（默认面向深色背景）" },
    { name: "markerColor", type: "string", default: '"#6c6c6c"', description: "标记线静止颜色" },
    { name: "showIndex", type: "boolean", default: "true", description: "显示两位序号" },
    { name: "showMarker", type: "boolean", default: "true", description: "显示标记线与间隙刻度线" },
    { name: "proximityRadius", type: "number", default: "100", description: "指针影响条目的垂直距离（px）" },
    { name: "maxShift", type: "number", default: "30", description: "满接近度时文字右移的最大像素" },
    { name: "falloff", type: '"linear" | "smooth" | "sharp"', default: '"smooth"', description: "接近度映射曲线" },
    { name: "markerLength", type: "number", default: "60", description: "标记线长度（px）" },
    { name: "markerGap", type: "number", default: "0", description: "标记线与标签间距（px）" },
    { name: "tickScale", type: "number", default: "0.5", description: "刻度线比例" },
    { name: "scaleTick", type: "boolean", default: "true", description: "刻度线随接近度生长" },
    { name: "itemGap", type: "number", default: "20", description: "条目垂直间距（px）" },
    { name: "fontSize", type: "number", default: "1.1", description: "标签字号（rem）" },
    { name: "smoothing", type: "number", default: "100", description: "平滑时长（ms）" },
    { name: "defaultActive", type: "number | null", default: "null", description: "挂载时选中项，仅初始生效" },
    { name: "onItemClick", type: "(index, label) => void", default: "—", description: "点击条目时回调" },
    { name: "className", type: "string", default: '""', description: "根节点附加类名" },
  ],
};
