/* Component metadata only — the live demo and gallery preview live in
   bell-toggle-demo.jsx, the framework source texts and the prompt in
   bell-toggle-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with bell-toggle-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "offLabel", type: "string", default: '"Notify me"', description: "关闭状态的标签文字" },
  { name: "onLabel", type: "string", default: "\"You'll be notified\"", description: "打开状态的标签文字" },
  { name: "icon", type: "ReactNode", default: "—", description: "自定义铃铛图形，替换默认图标" },
  { name: "label", type: "string", default: "—", description: "按钮无障碍标签，缺省用 offLabel" },
  { name: "color", type: "string", default: '"#f5f5f5"', description: "关闭态胶囊的文字颜色" },
  { name: "background", type: "string", default: '"#27272a"', description: "关闭态胶囊的背景色" },
  { name: "onColor", type: "string", default: '"#18181b"', description: "打开态胶囊的文字颜色" },
  { name: "onBackground", type: "string", default: '"#f5f5f5"', description: "打开态胶囊的背景色" },
  { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "高度、字号、图标、内距与间距档位" },
  { name: "radius", type: "number", default: "22", description: "胶囊圆角（px）" },
  { name: "ringAmplitude", type: "number", default: "17", description: "铃铛摆动幅度（deg）" },
  { name: "ringPasses", type: "number", default: "5", description: "每次响铃的衰减摆动次数（也是声波次数）" },
  { name: "ringDecay", type: "number", default: "1", description: "摆动逐次衰减的速度" },
  { name: "ringDuration", type: "number", default: "820", description: "响铃时长（ms）" },
  { name: "ringPivot", type: "number", default: "16", description: "铃铛摆动轴心高度（距顶部百分比）" },
  { name: "crossfadeMs", type: "number", default: "200", description: "标签与颜色交叉淡入时长（ms）" },
  { name: "revealBounce", type: "number", default: "0", description: "胶囊展开的弹簧回弹" },
  { name: "count", type: "number", default: "0", description: "徽标数字；打开状态下增大数字会再响一次铃" },
  { name: "badge", type: "boolean", default: "true", description: "打开且 count > 0 时显示徽标" },
  { name: "badgeColor", type: "string", default: '"#ef4444"', description: "徽标背景色" },
  { name: "badgeTextColor", type: "string", default: '"#ffffff"', description: "徽标数字颜色" },
  { name: "waves", type: "boolean", default: "true", description: "响铃时左右交替展开的声波弧线" },
  { name: "clapper", type: "boolean", default: "false", description: "绘制独立的铃舌圆点，摆动幅度更大" },
  { name: "pressed", type: "boolean", default: "—", description: "受控开合状态，传入后组件不再自持状态" },
  { name: "defaultPressed", type: "boolean", default: "false", description: "初始状态（非受控模式）" },
  { name: "onChange", type: "(on: boolean) => void", default: "—", description: "每次切换时回调下一个状态" },
  { name: "disabled", type: "boolean", default: "false", description: "禁用按钮" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
];

export default {
  id: "bell-toggle",
  name: "铃铛胶囊开关",
  href: "bell-toggle.html",
  title: "铃铛胶囊开关",
  description:
    "胶囊开关：按下时铃铛带衰减回摆地摇响、声波弧线左右交替展开、标签带模糊交叉淡入，胶囊用 clip-path 从旧标签宽度平滑展开到新宽度；徽标数字在打开时弹出、增大时再摇一次铃，Motion 弹簧驱动展开、关键帧物理驱动摆动，支持铃舌模式与三档尺寸。",
  tags: ["React", "Motion", "开关"],

  cardDescription: "一按铃铛就摇响：声波交替展开、标签模糊切换、胶囊平滑展开。",

  demoHint: "点按铃铛看摆动与声波；调幅度、次数与轴心高度，打开铃舌模式，改徽标数字看再响铃。",

  api: API,
};
