/* Component metadata only — the live demo and gallery preview live in
   jelly-radio-demo.jsx, the framework source texts and the prompt in
   jelly-radio-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with jelly-radio-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "items", type: "(string | { value: string; label: string; icon?: ReactNode; disabled?: boolean })[]", default: "DEFAULT_ITEMS", description: "单选项；字符串会转成同名的 value 与 label" },
  { name: "value", type: "string", default: "—", description: "受控选中值" },
  { name: "defaultValue", type: "string", default: "—", description: "初始选中值（非受控模式）" },
  { name: "onChange", type: "(value: string, index: number) => void", default: "—", description: "选中某枚芯片时回调" },
  { name: "chipColor", type: "string", default: '"#27272a"', description: "未选中芯片底色" },
  { name: "activeColor", type: "string", default: '"#f5f5f5"', description: "选中芯片底色" },
  { name: "textColor", type: "string", default: '"#f5f5f5"', description: "未选中芯片墨色" },
  { name: "activeTextColor", type: "string", default: '"#18181b"', description: "选中芯片墨色" },
  { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "尺寸档位（芯片高 / 字号 / 内边距）" },
  { name: "gap", type: "number", default: "8", description: "芯片间距（px）" },
  { name: "radius", type: "number", default: "18", description: "芯片圆角（px）" },
  { name: "swell", type: "number", default: "0.2", description: "选中芯片的膨胀量（缩放增量）" },
  { name: "barge", type: "number", default: "6", description: "邻居被额外推开的大小（px）" },
  { name: "shrink", type: "number", default: "0.05", description: "未选中芯片的收缩量（缩放减量）" },
  { name: "jelly", type: "number", default: "1", description: "纵横弹簧失谐强度：0 为刚性，越大越抖" },
  { name: "bounce", type: "number", default: "0.25", description: "基础弹簧回弹 0–1" },
  { name: "stagger", type: "number", default: "22", description: "按距离逐芯片的动画延迟（ms），仅作用于静止芯片" },
  { name: "stiffness", type: "number", default: "580", description: "基础弹簧刚度" },
  { name: "disabled", type: "boolean", default: "false", description: "禁用整组" },
  { name: "ariaLabel", type: "string", default: '"Options"', description: "radiogroup 的可访问名称" },
  { name: "className", type: "string", default: '""', description: "根节点附加类名" },
];

export default {
  id: "jelly-radio",
  name: "果冻单选芯片组",
  href: "jelly-radio.html",
  title: "果冻单选芯片组",
  description:
    "胶囊芯片组成的单选组：选中的一枚像果冻一样膨胀，邻居被它挤开让位，所有芯片各自带轻微失谐的弹簧依次回弹，整排有机地抖一下；未选中的芯片微微收缩。radiogroup + roving tabindex 完整键盘支持（方向键 / Home / End / 空格，自动跳过禁用项），RTL 下推挤方向自动翻转，受控 / 非受控两种用法，减少动效时直接跳位。",
  tags: ["React", "CSS", "Motion"],

  cardDescription: "选中芯片果冻般膨胀挤开邻居，整排弹簧回弹。",

  demoHint: "快速连点不同芯片看中断衔接；拉高 swell 与 jelly 看膨胀与抖动；键盘方向键也能换选。",

  api: API,
};
