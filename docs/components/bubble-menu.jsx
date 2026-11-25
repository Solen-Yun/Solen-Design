/* Component metadata only — the live demo and gallery preview live in
   bubble-menu-demo.jsx, the framework source texts and the prompt in
   bubble-menu-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with bubble-menu-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "logo", type: "string | ReactNode", default: "—", description: "Logo 内容；字符串按图片渲染，节点原样渲染进 Logo 气泡" },
  { name: "onMenuClick", type: "(open: boolean) => void", default: "—", description: "每次开合切换时回调，参数为下一个状态" },
  { name: "className", type: "string", default: "—", description: "导航条附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "导航条内联样式" },
  { name: "menuAriaLabel", type: "string", default: '"Toggle menu"', description: "圆形开关按钮的无障碍标签" },
  { name: "menuBg", type: "string", default: '"#fff"', description: "Logo 气泡、开关气泡与胶囊链接的底色" },
  { name: "menuContentColor", type: "string", default: '"#111"', description: "汉堡线与胶囊静止文字的颜色" },
  { name: "useFixedPosition", type: "boolean", default: "false", description: "导航条与覆盖层是否固定于视口（否则绝对定位）" },
  { name: "items", type: "{ label: string; href: string; ariaLabel?: string; rotation?: number; hoverStyles?: { bgColor: string; textColor: string } }[]", default: "DEFAULT_ITEMS", description: "菜单条目；每颗胶囊有自己的旋转角与悬停配色" },
  { name: "animationEase", type: "string", default: '"back.out(1.5)"', description: "胶囊弹入的 GSAP 缓动" },
  { name: "animationDuration", type: "number", default: "0.5", description: "单颗胶囊弹入时长（秒）" },
  { name: "staggerDelay", type: "number", default: "0.12", description: "相邻胶囊的起始间隔（秒），另有 ±0.05s 抖动" },
];

export default {
  id: "bubble-menu",
  name: "气泡环形展开菜单",
  href: "bubble-menu.html",
  title: "气泡环形展开菜单",
  description:
    "顶部悬浮条：Logo 气泡加圆形双线开关，按下后整屏铺开超大号圆角胶囊链接，逐颗带回弹地 pop 进场、各自带一点旋转和专属悬停配色；GSAP 逐颗错峰编排，汉堡线旋成 X，桌面端三列栅格、4 项时自动居中，移动端单列。",
  tags: ["React", "GSAP", "导航"],

  cardDescription: "整屏胶囊逐颗带回弹 pop 进场，每颗带旋转与专属悬停色。",

  demoHint: "点右上圆钮展开整屏胶囊；改底色与文字色、调时长与错峰间隔，感受 pop 手感。",

  api: API,
};
