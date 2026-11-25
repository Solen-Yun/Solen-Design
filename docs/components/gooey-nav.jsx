/* Component metadata only — the live demo and gallery preview live in
   gooey-nav-demo.jsx, the framework source texts and the prompt in
   gooey-nav-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with gooey-nav-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "items", type: "{ label: string; href?: string; icon?: ReactNode }[]", default: "DEFAULT_ITEMS", description: "导航条目；带 href 渲染成链接（# 阻止默认跳转），不带渲染成按钮，icon 渲染在文字前" },
  { name: "initialActiveIndex", type: "number", default: "0", description: "初始选中项（非受控模式）" },
  { name: "activeIndex", type: "number", default: "—", description: "受控选中项，配合 onChange 使用；传入后组件不再自持状态" },
  { name: "onChange", type: "(index: number, item) => void", default: "—", description: "选中某项时回调" },
  { name: "theme", type: '"dark" | "light"', default: '"dark"', description: "外框与文字的明暗主题" },
  { name: "color", type: "string", default: "—", description: "激活胶囊的颜色；不设则按主题取高对比默认色" },
  { name: "activeTextColor", type: "string", default: "—", description: "胶囊内文字颜色；不设则按胶囊色自动取对比色" },
  { name: "colors", type: "string[]", default: "[]", description: "液滴的调色板，融合时颜色互混；留空用胶囊色" },
  { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "条目尺寸三档" },
  { name: "frame", type: "boolean", default: "true", description: "条目外的毛玻璃外框" },
  { name: "animationTime", type: "number", default: "600", description: "液滴飞往新条目的基础时长（ms），下限 150" },
  { name: "particleCount", type: "number", default: "15", description: "选中时胶囊碎成的液滴数，总量上限 32" },
  { name: "spread", type: "number", default: "56", description: "液滴飞行途中的散布幅度（px）" },
  { name: "timeVariance", type: "number", default: "300", description: "每颗液滴时长的随机浮动（ms）" },
  { name: "gooeyness", type: "number", default: "0.5", description: "液滴与胶囊的融合倾向 0–1，越大越容易拉丝粘连" },
  { name: "wobble", type: "number", default: "0.5", description: "新胶囊成形时的回弹幅度 0–1" },
  { name: "hoverEffect", type: "boolean", default: "true", description: "悬停项背后的柔和高亮" },
  { name: "className", type: "string", default: '""', description: "导航附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "导航内联样式" },
];

export default {
  id: "gooey-nav",
  name: "果冻导航",
  href: "gooey-nav.html",
  title: "果冻导航",
  description:
    "一团液体做的导航：激活胶囊是一份有质量的液体，切到新条目时碎成液滴飞散、拉丝、在目标处融合回弹（果冻 metaball 场，WebGL2 SDF 渲染，无 WebGL 回退纯胶囊）；毛玻璃外框、悬停幽灵高亮、受控/非受控两种用法，帧循环稳定后自睡。",
  tags: ["React", "CSS", "WebGL", "导航"],

  cardDescription: "激活胶囊碎成液滴飞向新条目，果冻式融合回弹。",

  demoHint: "在条目间快速连点看液滴中途改道；液滴数、散布、融合与回弹可调。",

  api: API,
};
