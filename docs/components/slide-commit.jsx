/* Component metadata only — the live demo and gallery preview live in
   slide-commit-demo.jsx, the framework source texts and the prompt in
   slide-commit-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with slide-commit-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "label", type: "string", default: '"Slide to pay"', description: "轨道上的提示文字，也是滑块 aria-label 的基础" },
  { name: "doneLabel", type: "string", default: '"Paid"', description: "成功后胶囊内展开的文字" },
  { name: "errorLabel", type: "string", default: '"Payment failed"', description: "失败时轨道上换入的文字" },
  { name: "onConfirm", type: "() => void | Promise", default: "—", description: "拖到底时调用；返回 Promise 走 pending 阶段，抛错走失败" },
  { name: "onDone", type: "() => void", default: "—", description: "动作成功时回调" },
  { name: "onError", type: "(reason) => void", default: "—", description: "失败时回调，带回抛出的值或拒绝原因" },
  { name: "trackColor", type: "string", default: '"#262626"', description: "轨道背景色" },
  { name: "handleColor", type: "string", default: '"#f5f5f5"', description: "把手胶囊颜色" },
  { name: "successColor", type: "string", default: '"#22c55e"', description: "成功态胶囊颜色" },
  { name: "dangerColor", type: "string", default: '"#e5484d"', description: "失败文字与胶囊颜色" },
  { name: "width", type: "number", default: "280", description: "轨道宽度（px）" },
  { name: "height", type: "number", default: "56", description: "轨道高度（px）" },
  { name: "radius", type: "number", default: "28", description: "圆角（px），钳制到高度一半" },
  { name: "speed", type: "number", default: "50", description: "弹簧刚度的 0–100 档位（k = 260 + 档位% × 640）" },
  { name: "returnBounce", type: "number", default: "0.38", description: "松手弹回的回弹量 0–0.5" },
  { name: "landingDip", type: "number", default: "0.026", description: "成功落位时轨道的缩沉幅度；0 关闭" },
  { name: "holdMs", type: "number", default: "1500", description: "完成胶囊停留多久后复位（ms）" },
  { name: "disabled", type: "boolean", default: "false", description: "禁用控件" },
  { name: "icon", type: "ReactNode", default: "—", description: "自定义图形，替换默认右箭头" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
];

export default {
  id: "slide-commit",
  name: "滑动确认把手",
  href: "slide-commit.html",
  title: "滑动确认把手",
  description:
    "滑动确认按钮：把亮色把手拖到轨道尽头即确认——胶囊翻绿、箭头淡出、对勾与完成文案展开、轨道轻轻缩沉一下，停留 holdMs 后自动复位；onConfirm 返回 Promise 时箭头变成旋转的加载环（最短展示 300ms），抛错或拒绝则轨道抖动、文案模糊淡入红色错误提示、胶囊翻红弹回。向左拖会把胶囊纵向压扁像压紧的弹簧；role=slider 支持方向键与 End 一键确认并播报百分比。",
  tags: ["React", "CSS", "motion", "按钮"],

  cardDescription: "拖到底才确认：翻绿展开完成胶囊，失败时抖动报错。",

  demoHint: "拖到底看翻绿展开与缩沉；半途松手弹回；切错误回调看抖动与红色文案。",

  api: API,
};
