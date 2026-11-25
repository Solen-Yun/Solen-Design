/* Component metadata only — the live demo and gallery preview live in
   fuse-button-demo.jsx, the framework source texts and the prompt in
   fuse-button-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with fuse-button-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "label", type: "string", default: '"Archive"', description: "待机面上动作按钮的文字" },
  { name: "undoLabel", type: "string", default: '"Undo"', description: "武装面上撤销按钮的文字" },
  { name: "doneLabel", type: "string", default: '"Archived"', description: "落定面文字与状态播报内容" },
  { name: "icon", type: "ReactNode", default: "—", description: "待机面图标；默认为内置归档图标" },
  { name: "color", type: "string", default: '"#f5f5f5"', description: "文字墨色与焦点描边颜色" },
  { name: "background", type: "string", default: '"#27272a"', description: "按钮底色" },
  { name: "fuseColor", type: "string", default: '"#f5a524"', description: "引信颜色及其辉光" },
  { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "尺寸档位（高度 / 字号 / 图标 / 内边距）" },
  { name: "radius", type: "number", default: "22", description: "圆角（px），也决定外圈引信形状" },
  { name: "undoWindow", type: "number", default: "4000", description: "引信燃烧时长（ms），即可撤销窗口" },
  { name: "fuse", type: '"outline" | "top" | "bottom"', default: '"outline"', description: "引信样式：绕按钮外圈一圈，或顶 / 底边的横线" },
  { name: "fuseThickness", type: "number", default: "1.5", description: "引信描边高度（px）" },
  { name: "crossfadeMs", type: "number", default: "200", description: "面与面之间交叉淡入的时长（ms）" },
  { name: "commitOn", type: '"press" | "fuseEnd"', default: '"press"', description: "onCommit 触发时机：按下时或引信烧尽时" },
  { name: "pauseOnHover", type: "boolean", default: "true", description: "鼠标悬停在武装按钮上时暂停引信" },
  { name: "settle", type: '"reset" | "stay"', default: '"reset"', description: "引信烧尽后回到待机或停在落定态" },
  { name: "disabled", type: "boolean", default: "false", description: "禁用待机动作按钮" },
  { name: "onCommit", type: '(reason: "press" | "fuseEnd") => void', default: "—", description: "动作提交钩子，时机由 commitOn 决定" },
  { name: "onUndo", type: "() => void", default: "—", description: "撤销引信时回调" },
  { name: "onFuseEnd", type: "() => void", default: "—", description: "引信烧尽时回调" },
  { name: "onPhaseChange", type: '(phase: "idle" | "armed" | "settled") => void', default: "—", description: "阶段每次变化时回调" },
  { name: "className", type: "string", default: '""', description: "根节点附加类名" },
  { name: "type", type: '"button" | "submit" | "reset"', default: '"button"', description: "待机动作按钮的 type" },
];

export default {
  id: "fuse-button",
  name: "引信撤销按钮",
  href: "fuse-button.html",
  title: "引信撤销按钮",
  description:
    "完成态带撤销窗口的动作按钮：按下后交叉淡入「撤销」面，一道引信沿按钮外圈（或顶 / 底边横线）在撤销窗口内匀速烧完；点撤销或按 Escape 即刻回退，烧尽则落定成「已归档」；鼠标悬停或隐藏标签页会暂停引信而不缩短窗口；键盘操作即时切换且焦点跟随面变化。三面共用一个网格单元，并带 aria-live 状态播报。",
  tags: ["React", "CSS", "状态"],

  cardDescription: "按下后引信沿外圈燃烧，点撤销回退，烧尽落定。",

  demoHint: "按下后把鼠标悬停住看引信暂停；再试 Escape 撤销；切到顶 / 底边引信样式。",

  api: API,
};
