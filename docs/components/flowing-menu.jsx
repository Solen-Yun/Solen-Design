/* Component metadata only — the live demo and gallery preview live in
   flowing-menu-demo.jsx, the framework source texts and the prompt in
   flowing-menu-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with flowing-menu-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "items", type: "{ text: string; marquee?: string; image?: string; link?: string; meta?: string }[]", default: "[]", description: "菜单行；marquee 覆盖滚动文字，image 是内嵌图片地址，link 渲染成链接，meta 显示在行尾" },
  { name: "speed", type: "number", default: "60", description: "跑马灯滚动速度（px/s）" },
  { name: "direction", type: '"left" | "right" | "alternate"', default: '"left"', description: "滚动方向；alternate 隔行反向" },
  { name: "followCursor", type: "number", default: "0.4", description: "光标横向速度推动跑马灯的程度 0–1" },
  { name: "duration", type: "number", default: "0.5", description: "色带弹簧基础周期（秒），下限 0.1" },
  { name: "stretch", type: "number", default: "0.6", description: "移动时色带的拉长程度 0–1" },
  { name: "magnet", type: "number", default: "0.25", description: "色带向光标纵坐标倾斜的程度 0–1" },
  { name: "bandInset", type: "number", default: "0", description: "色带与行边的垂直留缝（px）" },
  { name: "bandRadius", type: "number", default: "0", description: "色带圆角（px）" },
  { name: "carryContent", type: "boolean", default: "false", description: "用一整块跟随色带的浮动跑马灯替代逐行分段" },
  { name: "textColor", type: "string", default: '"#ffffff"', description: "行文字颜色" },
  { name: "bgColor", type: "string", default: '"#120F17"', description: "菜单背景色" },
  { name: "marqueeBgColor", type: "string", default: '"#ffffff"', description: "色带背景色" },
  { name: "marqueeTextColor", type: "string", default: '"#120F17"', description: "色带内文字颜色" },
  { name: "borderColor", type: "string", default: '"rgba(255, 255, 255, 0.14)"', description: "分隔线颜色" },
  { name: "dividers", type: "boolean", default: "true", description: "行间 1px 分隔线" },
  { name: "dimInactive", type: "boolean", default: "false", description: "色带覆盖时压暗其他行" },
  { name: "align", type: '"center" | "left"', default: '"center"', description: "标签对齐方式" },
  { name: "showIndex", type: "boolean", default: "false", description: "显示补零行号" },
  { name: "showArrow", type: "boolean", default: "false", description: "行尾显示斜向箭头" },
  { name: "imageShape", type: '"pill" | "rounded" | "circle"', default: '"pill"', description: "跑马灯内嵌图片的形状" },
  { name: "intro", type: "boolean", default: "true", description: "一次性入场：文字上滑、分隔线划入、色带自动扫一遍" },
  { name: "activeIndex", type: "number", default: "—", description: "标记当前行（小圆点 + aria-current）" },
  { name: "onItemClick", type: "(item, index: number, event) => void", default: "—", description: "点击行时回调" },
  { name: "ariaLabel", type: "string", default: '"Menu"', description: "nav 的 aria-label" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
];

export default {
  id: "flowing-menu",
  name: "液态横幅菜单",
  href: "flowing-menu.html",
  title: "液态横幅菜单",
  description:
    "整屏高的菜单：悬停处鼓起一条贯穿整列的实色液带，前后两条边用双弹簧追逐、移动时拉长如太妃糖，色带覆盖的行里跑马灯文字与图片横向流动，光标横向甩动能加速它；离开时液带收进进入/离开的那半行。行高由容器查询驱动、字号随行高缩放，支持逐行/整块两种跑马灯形态与一次性入场扫带。",
  tags: ["React", "CSS", "弹簧动画", "导航"],

  cardDescription: "悬停鼓起一条液态色带，覆盖行里跑马灯滚动，光标甩动还能加速。",

  demoHint: "上下快速扫过几行看液带拉长回弹，横向甩一下光标看跑马灯加速；开 carryContent 换整块滚动。",

  api: API,
};
