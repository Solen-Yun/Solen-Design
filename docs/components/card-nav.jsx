/* Component metadata only — the live demo and gallery preview live in
   card-nav-demo.jsx, the framework source texts and the prompt in
   card-nav-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with card-nav-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "items", type: '{ label: string; description?: string; links?: { label: string; href?: string; ariaLabel?: string; onClick?: (event) => void }[]; bgColor?: string; textColor?: string }[]', default: "内置三卡组", description: "展开后的卡片内容；无 href 的链接渲染成按钮，bgColor/textColor 可给单卡上色" },
  { name: "logo", type: "string | ReactNode", default: "—", description: "顶栏中央的 Logo，传图片地址或自定义节点" },
  { name: "logoAlt", type: "string", default: '"Logo"', description: "Logo 链接的可访问名称" },
  { name: "logoHref", type: "string", default: '"#"', description: "Logo 的跳转地址" },
  { name: "cta", type: '{ label: string; href?: string; onClick?: (event) => void }', default: "—", description: "顶栏右侧的胶囊按钮；窄屏时移入菜单变整宽" },
  { name: "theme", type: '"dark" | "light"', default: '"dark"', description: "面板与卡片的明暗主题" },
  { name: "surface", type: '"glass" | "solid"', default: '"glass"', description: "毛玻璃半透明面板或纯色不透明面板" },
  { name: "openOn", type: '"click" | "hover"', default: '"click"', description: "菜单打开方式；hover 模式忽略触摸" },
  { name: "cardEffect", type: '"rise" | "unfold" | "fade"', default: '"rise"', description: "卡片入场动画：上浮 / 展开翻下 / 模糊淡入" },
  { name: "stagger", type: "number", default: "0.12", description: "卡片之间的错峰间隔（秒），0–0.3" },
  { name: "bounce", type: "number", default: "0.2", description: "展开时的弹簧过冲 0–1" },
  { name: "speed", type: "number", default: "1", description: "弹簧速度倍率 0.2–3" },
  { name: "cardHeight", type: "number", default: "176", description: "卡片最小高度（px）" },
  { name: "maxWidth", type: "number", default: "800", description: "导航条最大宽度（px）" },
  { name: "accentColor", type: "string", default: "—", description: "CTA 按钮的背景色，文字颜色按对比度自动取" },
  { name: "menuLabel", type: "boolean", default: "true", description: "汉堡旁滚动的 Menu/Close 文字" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时导航条从胶囊炸开的一次性开场" },
  { name: "defaultOpen", type: "boolean", default: "false", description: "初始展开（非受控模式）" },
  { name: "open", type: "boolean", default: "—", description: "受控展开状态，配合 onOpenChange 使用" },
  { name: "onOpenChange", type: "(open: boolean) => void", default: "—", description: "菜单开合意图变化时回调" },
  { name: "linkComponent", type: "ElementType", default: '"a"', description: "渲染链接用的组件（可接路由 Link）" },
  { name: "onLinkClick", type: "(link, item, event) => void", default: "—", description: "点击卡片内链接时回调（随后菜单关闭）" },
  { name: "ariaLabel", type: "string", default: '"Main"', description: "nav 面板的 aria-label" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
];

export default {
  id: "card-nav",
  name: "弹簧展开卡片导航",
  href: "card-nav.html",
  title: "弹簧展开卡片导航",
  description:
    "一条圆角导航栏：点开菜单后整条面板按弹簧曲线撑高，卡片逐张错峰入场（上浮 / 翻页展开 / 模糊淡入三种效果）；汉堡与 Menu/Close 文字同步变形，支持 hover 打开、外点/Esc 关闭、受控用法、窄屏堆叠与自定义路由链接，展开与收起共用同一组弹簧参数。",
  tags: ["React", "CSS", "弹簧动画", "导航"],

  cardDescription: "导航条按弹簧撑开成一排链接卡片，汉堡同步变形，错峰入场。",

  demoHint: "把 bounce 拉满看展开过冲，切换 rise/unfold/fade 三种入场，开 hover 模式用悬停开合。",

  api: API,
};
