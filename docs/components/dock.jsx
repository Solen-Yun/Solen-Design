/* Component metadata only — the live demo and gallery preview live in
   dock-demo.jsx, the framework source texts and the prompt in
   dock-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with dock-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "items", type: '({ icon: ReactNode; label: string; badge?: number | string | true; active?: boolean; menu?: MenuRow[]; onClick?: () => void; className?: string; disabled?: boolean } | { separator: true })[]', default: "[]", description: "坞条目：图标、名称、角标、运行点、右键菜单与点击回调；separator 项画分隔线" },
  { name: "position", type: '"bottom" | "top" | "left" | "right"', default: '"bottom"', description: "坞停靠的屏幕边缘" },
  { name: "theme", type: '"dark" | "light"', default: '"dark"', description: "面板、磁贴与菜单的明暗主题" },
  { name: "baseItemSize", type: "number", default: "50", description: "静止磁贴尺寸（px），下限 16" },
  { name: "magnification", type: "number", default: "70", description: "指针下的磁贴峰值尺寸（px）" },
  { name: "distance", type: "number", default: "200", description: "放大衰减半径（px）" },
  { name: "panelHeight", type: "number", default: "68", description: "面板厚度（px）" },
  { name: "gap", type: "number", default: "10", description: "条目间距（px）" },
  { name: "roundness", type: "number", default: "0.5", description: "磁贴圆角程度 0–1" },
  { name: "spring", type: '{ mass: number; stiffness: number; damping: number }', default: "{ mass: 0.1, stiffness: 150, damping: 12 }", description: "放大弹簧参数" },
  { name: "bounce", type: "boolean", default: "true", description: "点击时的起跳弹跳" },
  { name: "autoHide", type: "boolean", default: "false", description: "自动隐藏，指针靠近屏幕边缘时滑回" },
  { name: "tiles", type: "boolean", default: "true", description: "磁贴渐变底板；关掉后只显示裸图标" },
  { name: "showLabels", type: "boolean", default: "true", description: "悬停/聚焦时的名称气泡" },
  { name: "showIndicators", type: "boolean", default: "true", description: "运行中条目的小圆点" },
  { name: "showBadges", type: "boolean", default: "true", description: "通知角标" },
  { name: "badgeColor", type: "string", default: '"#ff453a"', description: "角标背景色" },
  { name: "accentColor", type: "string", default: '"#0a84ff"', description: "菜单高亮与焦点描边颜色" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
];

export default {
  id: "dock",
  name: "弹性放大程序坞",
  href: "dock.html",
  title: "弹性放大程序坞",
  description:
    "macOS 风格的程序坞：每枚磁贴跑一条独立弹簧，指针扫过时按余弦衰减放大并推开邻居，点击起跳一次抛物线弹跳；右键 / 长按 / 键盘都能打开带尾巴的毛玻璃上下文菜单，支持勾选、快捷键、多级子菜单与完整键盘导航，四边停靠、窄容器自动缩放、autoHide 滑出屏边。",
  tags: ["React", "CSS", "弹簧动画", "菜单"],

  cardDescription: "磁贴跟着指针弹性放大，点击起跳，右键弹出带尾巴的毛玻璃菜单。",

  demoHint: "扫过磁贴看放大波，点一枚看弹跳；右键带菜单的磁贴，试试勾选和二级子菜单。",

  api: API,
};
