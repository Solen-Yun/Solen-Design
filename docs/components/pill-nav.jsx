/* Component metadata only — the live demo and gallery preview live in
   pill-nav-demo.jsx, the framework source texts and the prompt in
   pill-nav-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with pill-nav-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "logo", type: "string | ReactNode", default: "—", description: "Logo 标记；字符串按图片渲染，节点原样渲染" },
  { name: "logoAlt", type: "string", default: '"Logo"', description: "Logo 链接的无障碍标签" },
  { name: "logoHref", type: "string", default: '"#"', description: "Logo 链接指向的地址" },
  { name: "items", type: "{ label: string; href?: string; icon?: ReactNode; ariaLabel?: string }[]", default: "DEFAULT_ITEMS", description: "导航条目；不带 href 渲染成按钮" },
  { name: "activeHref", type: "string", default: "—", description: "受控选中项（按 href 匹配），传入后组件不再自选" },
  { name: "defaultActiveIndex", type: "number", default: "0", description: "初始选中项（非受控模式）" },
  { name: "onItemClick", type: "(item, index, event) => void", default: "—", description: "条目点击回调" },
  { name: "linkComponent", type: "component", default: '"a"', description: "自定义链接组件（路由 Link），接收 href" },
  { name: "theme", type: '"dark" | "light"', default: '"dark"', description: "表面与文字的明暗主题" },
  { name: "layout", type: '"split" | "joined"', default: '"split"', description: "Logo 与导航条分体，还是包进同一颗胶囊" },
  { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "高度、内距与字号三档" },
  { name: "surface", type: '"glass" | "solid" | "none"', default: '"glass"', description: "毛玻璃条、实色条，还是无底裸条" },
  { name: "itemStyle", type: '"plain" | "pill"', default: '"plain"', description: "裸链接，还是每项自带渐变瓷砖底" },
  { name: "hoverEffect", type: '"fill" | "glide" | "none"', default: '"fill"', description: "悬停效果：填充从底部升起、滑行胶囊，或无" },
  { name: "indicator", type: '"dot" | "pill" | "none"', default: '"dot"', description: "激活指示：滑行圆点、停在激活项的胶囊，或无" },
  { name: "highlightColor", type: "string", default: "—", description: "激活填充/胶囊/圆点的颜色" },
  { name: "highlightTextColor", type: "string", default: "—", description: "高亮上的文字颜色；不设则按颜色自动取对比色" },
  { name: "barColor", type: "string", default: "—", description: "覆盖导航条表面颜色" },
  { name: "textColor", type: "string", default: "—", description: "覆盖主文字与弱文字颜色" },
  { name: "bounce", type: "number", default: "0.3", description: "滑动部分的弹簧回弹 0–1" },
  { name: "stretch", type: "number", default: "0.5", description: "滑行胶囊移动时的拉伸幅度 0–1" },
  { name: "intro", type: "boolean", default: "true", description: "首次绘制时播放入场弹出/擦入" },
  { name: "collapse", type: '"auto" | "always" | "never"', default: '"auto"', description: "何时折叠成汉堡按钮加面板" },
  { name: "onMenuToggle", type: "(open: boolean) => void", default: "—", description: "折叠面板开合时回调" },
  { name: "ariaLabel", type: "string", default: '"Main"', description: "导航的无障碍标签" },
  { name: "className", type: "string", default: '""', description: "导航附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "导航内联样式" },
];

export default {
  id: "pill-nav",
  name: "上浮填充胶囊导航",
  href: "pill-nav.html",
  title: "上浮填充胶囊导航",
  description:
    "胶囊导航条：悬停时一团颜色从条目底部涨起、文字向上滚进胶囊墨色，激活项的小圆点带速度拉伸地在条目间滑行；弹簧引擎 240Hz 子步积分、帧循环稳定后自睡，父容器放不下时折叠成汉堡按钮并以 clip-path 变形展开菜单面板，支持明暗主题、玻璃/实色表面、分体/一体布局与自定义高亮色。",
  tags: ["React", "CSS", "导航"],

  cardDescription: "悬停填充从底部涨起、文字滚层翻转，激活圆点带拉伸滑行。",

  demoHint: "在条目间扫过看填充涨起；切到 glide 看胶囊拉伸滑行，调 bounce 和 stretch；窄屏会自动折叠成汉堡。",

  api: API,
};
