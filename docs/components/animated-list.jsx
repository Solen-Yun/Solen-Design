/* Component metadata only — the live demo and gallery preview live in
   animated-list-demo.jsx, the framework source texts and the prompt in
   animated-list-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with animated-list-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "items", type: "{ id?: string; icon?: ReactNode; image?: string; title?: string; description?: string; meta?: string }[]", default: "DEFAULT_ITEMS", description: "行数据；纯字符串按只有标题渲染" },
  { name: "onItemSelect", type: "(item, index) => void", default: "—", description: "点击或键盘选中某行时回调" },
  { name: "renderItem", type: "(item, index, isSelected) => ReactNode", default: "—", description: "完全自定义行内容，替换默认布局" },
  { name: "initialSelectedIndex", type: "number", default: "-1", description: "初始选中行；-1 表示不选" },
  { name: "selectOnHover", type: "boolean", default: "true", description: "悬停时选择环跟随移动" },
  { name: "enableArrowNavigation", type: "boolean", default: "true", description: "方向键/Home/End/Enter 键盘支持" },
  { name: "loop", type: "boolean", default: "false", description: "方向导航到尽头时循环" },
  { name: "animation", type: '"pop" | "slide" | "fade" | "none"', default: '"pop"', description: "行进入视口的方式" },
  { name: "animateOnce", type: "boolean", default: "false", description: "行只揭示一次，不再隐藏" },
  { name: "stagger", type: "number", default: "0.05", description: "入场级联的行间隔（秒）" },
  { name: "showGradients", type: "boolean", default: "true", description: "顶/底滚动渐隐遮罩" },
  { name: "fadeSize", type: "number", default: "56", description: "渐隐跨度（px）" },
  { name: "displayScrollbar", type: "boolean", default: "true", description: "显示主题化细滚动条" },
  { name: "frame", type: "boolean", default: "true", description: "毛玻璃外框加内沿高光" },
  { name: "theme", type: '"dark" | "light"', default: '"dark"', description: "外框、瓷砖、文字与选择环的配色" },
  { name: "accentColor", type: "string", default: "—", description: "选择环与焦点轮廓颜色；缺省取文字色" },
  { name: "radius", type: "number", default: "14", description: "行圆角（px）" },
  { name: "gap", type: "number", default: "8", description: "行间距（px）" },
  { name: "width", type: "number | string", default: "420", description: "列表宽度（px 或任意 CSS 宽度）" },
  { name: "maxHeight", type: "number | string", default: "440", description: "视口最大滚动高度" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "itemClassName", type: "string", default: '""', description: "每行的附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
];

export default {
  id: "animated-list",
  name: "弹入通知列表",
  href: "animated-list.html",
  title: "弹入通知列表",
  description:
    "滚动列表：行进入视口时带轻微回弹地弹入、离开再藏起，选择环沿弹簧在行间滑行——悬停即到、方向键逐行走动并平滑滚入视野；列表框语义完整（listbox/option/aria-activedescendant），滚动位置驱动的顶底渐隐遮罩，毛玻璃外框，pop/slide/fade 三种入场与 animateOnce/loop/stagger 可调。",
  tags: ["React", "CSS", "列表"],

  cardDescription: "行带回弹地弹入视口，选择环沿弹簧在行间滑行。",

  demoHint: "滚动列表看行逐个弹入；用方向键走动看选择环滑行，换 pop/slide/fade 和明暗主题。",

  api: API,
};
