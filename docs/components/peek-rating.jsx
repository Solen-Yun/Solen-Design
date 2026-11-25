/* Component metadata only — the live demo and gallery preview live in
   peek-rating-demo.jsx, the framework source texts and the prompt in
   peek-rating-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with peek-rating-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "value", type: "number", default: "—", description: "受控选中值，配合 onChange 使用；传入后内部状态不再生效" },
  { name: "defaultValue", type: "number", default: "0", description: "初始选中值（非受控模式）" },
  { name: "onChange", type: "(value: number) => void", default: "—", description: "指针或键盘确认选值时回调" },
  { name: "onPreview", type: "(value: number | null) => void", default: "—", description: "悬停预览值变化时回调，离开时回调 null" },
  { name: "count", type: "number", default: "5", description: "图标数量" },
  { name: "shape", type: '"star" | "heart" | "bolt"', default: '"star"', description: "内置图形：星、心、闪电" },
  { name: "icon", type: "ReactNode", default: "—", description: "自定义图标节点，覆盖内置图形" },
  { name: "labels", type: "string[]", default: "[]", description: "每颗星的气泡文案；缺省时显示数字" },
  { name: "activeColor", type: "string", default: '"#f5b400"', description: "点亮图标的颜色" },
  { name: "idleColor", type: "string", default: '"#52525b"', description: "未点亮图标的颜色" },
  { name: "tipColor", type: "string", default: '"#27272a"', description: "气泡的背景色" },
  { name: "tipTextColor", type: "string", default: '"#f5f5f5"', description: "气泡的文字色" },
  { name: "size", type: "number", default: "28", description: "图标边长（px），间距与气泡尺寸随之推导" },
  { name: "lift", type: "number", default: "6", description: "波浪升起的距离（px）" },
  { name: "magnify", type: "number", default: "1.15", description: "悬停那颗星的额外放大倍数" },
  { name: "riseDuration", type: "number", default: "320", description: "波浪升落时长（ms）" },
  { name: "popScale", type: "number", default: "1.3", description: "确认时点击图标的峰值放大；大于 1 才启用弹跳" },
  { name: "showTip", type: "boolean", default: "true", description: "跟随悬停的气泡提示" },
  { name: "allowClear", type: "boolean", default: "true", description: "再次选中当前值会清零" },
  { name: "readOnly", type: "boolean", default: "false", description: "只读展示，渲染成 span 与 role=img" },
  { name: "disabled", type: "boolean", default: "false", description: "禁用交互并降透明度" },
  { name: "ariaLabel", type: "string", default: '"Rating"', description: "radiogroup 的无障碍名称" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
];

export default {
  id: "peek-rating",
  name: "浪升星星评分",
  href: "peek-rating.html",
  title: "浪升星星评分",
  description:
    "会迎上指针的评分条：悬停时指针所在及之前的图标依次上浮成一道波浪、被指着的那颗再放大一档，胶囊气泡在上方滑行显示档位文案；点击确认时被点图标弹跳一下并立即定格选中值。悬停全程用 ref 直写 DOM 不触发 React 重渲染，支持触摸按压选择、方向键/Home/End/Delete 键盘操作、RTL 镜像、只读与禁用态。",
  tags: ["React", "CSS", "表单"],

  cardDescription: "悬停时星星成浪升起，点击定格并弹跳确认。",

  demoHint: "在星星上扫一遍看波浪跟随；开允许清零后重选当前值会归零，键盘方向键也能打分。",

  api: API,
};
