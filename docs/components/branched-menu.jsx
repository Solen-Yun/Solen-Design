/* Component metadata only — the live demo and gallery preview live in
   branched-menu-demo.jsx, the framework source texts and the prompt in
   branched-menu-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with branched-menu-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "items", type: "BranchedMenuItem[]", default: "DEFAULT_ITEMS", description: "分组条目：label 加 children（value、label、icon），或不带 children 的叶子项；带 children 的分组可折叠，叶子可选中" },
  { name: "defaultOpen", type: "number | number[]", default: "0", description: "初始展开的分组，-1 为全部收起" },
  { name: "defaultActive", type: "string", default: '""', description: "初始选中的条目 value，留空取首个展开分组的第一项" },
  { name: "onSelect", type: "(value, item) => void", default: "—", description: "点选子项或叶子项时回调" },
  { name: "onToggle", type: "(index, open) => void", default: "—", description: "分组折叠或展开时回调" },
  { name: "color", type: "string", default: '"#f5f5f5"', description: "墨色，闲时文字与其混合线都由它推导" },
  { name: "accentColor", type: "string", default: '"#f5f5f5"', description: "选中项的描线、文字与树干标记" },
  { name: "lineColor", type: "string", default: '"#3f3f46"', description: "树干与枝杈的线色，纯色保证交接处不变深" },
  { name: "width", type: "number", default: "240", description: "菜单最大宽度（px），随内容收缩" },
  { name: "rowHeight", type: "number", default: "36", description: "子项行高（px）" },
  { name: "indent", type: "number", default: "40", description: "子项文字起点（px），枝杈描线在其前一点结束" },
  { name: "trunk", type: "number", default: "14", description: "树干线的 x 位置（px）" },
  { name: "radius", type: "number", default: "10", description: "枝杈拐角的弧度（px）" },
  { name: "lineWidth", type: "number", default: "1.5", description: "线条粗细" },
  { name: "fontSize", type: "number", default: "14", description: "子项文字字号（px），分组标题大 1px" },
  { name: "drawDuration", type: "number", default: "400", description: "选中描线的时长（ms）" },
  { name: "foldDuration", type: "number", default: "300", description: "分组折叠展开的时长（ms）" },
  { name: "className", type: "string", default: '""', description: "根节点附加类名" },
];


export default {
  id: "branched-menu",
  name: "分叉导航菜单",
  href: "branched-menu.html",
  title: "分叉导航菜单",
  description:
    "一棵长出来的导航菜单：左侧一条树干，子项从枝杈上挂下来，点谁哪条枝就描亮，选中标记沿树干滑动；分组折叠展开走 grid 过渡，树干位置、弧度、行高、描线与折叠时长全部可调，行图标由 hugeicons 提供。",
  tags: ["React", "CSS", "导航菜单"],

  cardDescription: "树干枝杈菜单，点谁哪条枝就描亮，标记沿树干滑动。",

  demoHint: "点子项看枝杈描线，收起再展开看折叠过渡；宽度、行高、缩进与时长均可调。",



  api: API,
};
