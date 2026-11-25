/* Component metadata only — the live demo and gallery preview live in
   staggered-menu-demo.jsx, the framework source texts and the prompt in
   staggered-menu-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with staggered-menu-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "position", type: '"left" | "right"', default: '"right"', description: "面板与色层从哪一侧屏幕边缘滑入" },
  { name: "colors", type: "string[]", default: "['#B497CF', '#5227FF']", description: "面板背后的堆叠色层颜色，最多 4 层，3 层以上时去掉中间一层" },
  { name: "items", type: "{ label: string; link?: string; ariaLabel?: string }[]", default: "[]", description: "大号菜单条目，每项渲染成一个链接" },
  { name: "socialItems", type: "{ label: string; link: string }[]", default: "[]", description: "面板底部 Socials 区的链接列表" },
  { name: "displaySocials", type: "boolean", default: "true", description: "是否渲染 Socials 区块" },
  { name: "displayItemNumbering", type: "boolean", default: "true", description: "条目是否带 01 / 02 / … 序号" },
  { name: "className", type: "string", default: "—", description: "根元素附加类名" },
  { name: "logoUrl", type: "string", default: '""', description: "左上角 Logo 图片地址，留空不渲染 Logo" },
  { name: "menuButtonColor", type: "string", default: '"#fff"', description: "关闭状态下按钮文字与图标的颜色" },
  { name: "openMenuButtonColor", type: "string", default: '"#fff"', description: "打开状态下按钮的颜色（需 changeMenuColorOnOpen）" },
  { name: "accentColor", type: "string", default: '"#5227FF"', description: "悬停、序号、Socials 标题与焦点环的强调色" },
  { name: "changeMenuColorOnOpen", type: "boolean", default: "true", description: "打开时按钮颜色是否过渡到 openMenuButtonColor" },
  { name: "isFixed", type: "boolean", default: "false", description: "包裹层是否固定铺满视口（挂到文档层使用）" },
  { name: "closeOnClickAway", type: "boolean", default: "true", description: "在面板与按钮之外按下时关闭菜单" },
  { name: "onMenuOpen", type: "() => void", default: "—", description: "菜单打开时回调" },
  { name: "onMenuClose", type: "() => void", default: "—", description: "菜单关闭时回调" },
];

export default {
  id: "staggered-menu",
  name: "交错滑入菜单",
  href: "staggered-menu.html",
  title: "交错滑入菜单",
  description:
    "全高侧边菜单：打开时多层色板从屏幕边缘依次交错滑入，白色内容面板随后跟上，超大号菜单条目带旋转从裁切行里逐条弹起、序号渐显；按钮是 Menu/Close 文字滚轮加上旋转成 X 的加号图标，GSAP 时间轴编排，支持左右两侧、点击外部关闭与固定挂载。",
  tags: ["React", "GSAP", "导航"],

  cardDescription: "色层交错滑入，大条目带旋转逐条弹起，加号旋转成关闭。",

  demoHint: "打开后快速连点按钮看交错时间轴如何衔接；切到左侧、换强调色、关掉序号再看一遍。",

  api: API,
};
