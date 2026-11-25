/* Component metadata only — the live demo and gallery preview live in
   glide-select-demo.jsx, the framework source texts and the prompt in
   glide-select-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with glide-select-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "options", type: "(string | { value: string; label: string; tag?: string })[]", default: "DEFAULT_OPTIONS", description: "菜单选项；字符串会转成同名的 value 与 label" },
  { name: "value", type: "string", default: "—", description: "受控选中值" },
  { name: "defaultValue", type: "string", default: "—", description: "初始选中值（非受控模式）" },
  { name: "onChange", type: "(value: string, item) => void", default: "—", description: "选中某行时回调" },
  { name: "placeholder", type: "string", default: '"Select…"', description: "未选中时芯片上的占位文字" },
  { name: "showTags", type: "boolean", default: "true", description: "是否渲染选项附带的 tag 文本" },
  { name: "accentColor", type: "string", default: '"#f5f5f5"', description: "选中对勾的强调色" },
  { name: "surfaceColor", type: "string", default: '"#27272a"', description: "芯片与菜单底色" },
  { name: "highlightColor", type: "string", default: '"#3f3f46"', description: "滑翔高亮与悬停色" },
  { name: "textColor", type: "string", default: '"#f5f5f5"', description: "文字墨色" },
  { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "尺寸档位（芯片高 / 行高 / 字号）" },
  { name: "radius", type: "number", default: "10", description: "菜单圆角（px），内部元素用其减 4" },
  { name: "menuWidth", type: "number", default: "176", description: "菜单宽度（px），下限为芯片宽度" },
  { name: "placement", type: '"bottom" | "top"', default: '"bottom"', description: "菜单偏好侧；视口不够时自动翻转" },
  { name: "align", type: '"left" | "right"', default: '"left"', description: "菜单与芯片的对齐边" },
  { name: "popDuration", type: "number", default: "180", description: "菜单弹入时长（ms）；弹出为其 2/3" },
  { name: "glideDuration", type: "number", default: "220", description: "高亮滑翔时长（ms）" },
  { name: "rememberPosition", type: "boolean", default: "true", description: "指针离开时保留高亮在最后悬停行" },
  { name: "disabled", type: "boolean", default: "false", description: "禁用触发器并关闭菜单" },
  { name: "ariaLabel", type: "string", default: '"Select"', description: "触发器与列表的可访问名称" },
  { name: "className", type: "string", default: '""', description: "根节点附加类名" },
];

export default {
  id: "glide-select",
  name: "滑翔高亮选择器",
  href: "glide-select.html",
  title: "滑翔高亮选择器",
  description:
    "一枚下拉选择芯片：菜单从自身角落缩放弹出、贴视口边自动翻面；高亮是一条独立的胶囊——打开时直接落在已选行，悬停时在行间滑翔，按住还能拖着实时划过各行，松手即选中；选完芯片文字带模糊换装动画。combobox / listbox / option 完整接线，支持方向键、Home/End、首字母快选与 Escape，受控 / 非受控两种用法。",
  tags: ["React", "CSS", "表单"],

  cardDescription: "菜单从角落弹出，高亮胶囊在行间滑翔，按住可划选。",

  demoHint: "按住菜单拖一圈看高亮实时划行；用键盘方向键和首字母快选；换 placement / align 看翻面。",

  api: API,
};
