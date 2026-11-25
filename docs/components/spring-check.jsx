/* Component metadata only — the live demo and gallery preview live in
   spring-check-demo.jsx, the framework source texts and the prompt in
   spring-check-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with spring-check-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "label", type: "string", default: '"Ship the build"', description: "勾选框旁的文案" },
  { name: "checked", type: "boolean", default: "—", description: "受控勾选状态；不传则组件自持状态" },
  { name: "defaultChecked", type: "boolean", default: "false", description: "非受控时的初始状态" },
  { name: "onChange", type: "(checked: boolean) => void", default: "—", description: "切换勾选时回调" },
  { name: "disabled", type: "boolean", default: "false", description: "禁用整行" },
  { name: "color", type: "string", default: '"#ffffff"', description: "墨色：描边圈、文案与删除线" },
  { name: "fillColor", type: "string", default: '"#ffffff"', description: "方框填充色" },
  { name: "checkColor", type: "string", default: '"#0b0b0f"', description: "填充之上的对勾颜色" },
  { name: "boxSize", type: "number", default: "28", description: "方框边长（px）" },
  { name: "boxRadius", type: "number", default: "9", description: "方框圆角（px）" },
  { name: "fontSize", type: "number", default: "18", description: "文案字号（px），删除线粗细随之推导" },
  { name: "bounce", type: "number", default: "0.2", description: "弹簧过冲量 0–1，0 时无胀大" },
  { name: "strikeLag", type: "number", default: "0.12", description: "删除线开始擦拭的进度点 0–1" },
  { name: "doneOpacity", type: "number", default: "0.42", description: "勾选后的文案透明度 0–1" },
  { name: "strike", type: '"left" | "center" | "right" | "none"', default: '"left"', description: "删除线擦拭方向；none 移除删除线" },
  { name: "ariaLabel", type: "string", default: "—", description: "覆盖可见文案的可访问名称" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
];

export default {
  id: "spring-check",
  name: "弹簧勾选行",
  href: "spring-check.html",
  title: "弹簧勾选行",
  description:
    "一根弹簧驱动的复选框行：同一个进度值同时投影成五路动画——方框填充放大、过冲时整体胀大、对勾按 dashoffset 描画、文案按比例变淡、删除线滞后一定进度后横向擦过；取消勾选整段倒放。受控/非受控两种用法，键盘切换走瞬时路径，reduced-motion 下直接跳态。零布局依赖，仅一处 motion 进度值。",
  tags: ["React", "CSS", "Motion", "表单"],

  cardDescription: "一根弹簧同时撑起填充、胀大、画勾与删除线，取消时整段倒放。",

  demoHint: "勾选看填充胀大画勾再划删除线；调 bounce 看过冲、调 strikeLag 看删除线延迟；切 strike 方向。",

  api: API,
};
