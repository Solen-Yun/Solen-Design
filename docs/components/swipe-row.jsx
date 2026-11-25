/* Component metadata only — the live demo and gallery preview live in
   swipe-row-demo.jsx, the framework source texts and the prompt in
   swipe-row-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with swipe-row-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "children", type: "ReactNode", default: "—", description: "行表面的内容" },
  { name: "actions", type: "{ id, label, icon?, color?, dismiss?, onSelect? }[]", default: '[{ id: "delete", label: "Delete" }]', description: "抽屉操作；第一个是主操作（全滑目标），独占随行的色块" },
  { name: "actionColor", type: "string", default: '"#e5484d"', description: "主操作色块颜色" },
  { name: "drawerColor", type: "string", default: '"#3f3f46"', description: "抽屉轨道底色与次操作默认色" },
  { name: "rowColor", type: "string", default: '"#27272a"', description: "行表面底色" },
  { name: "textColor", type: "string", default: '"#f5f5f5"', description: "行表面文字颜色" },
  { name: "height", type: "number", default: "64", description: "行高（px）" },
  { name: "radius", type: "number", default: "16", description: "圆角（px）" },
  { name: "actionWidth", type: "number", default: "80", description: "单个操作格宽度（px）" },
  { name: "direction", type: '"left" | "right"', default: '"left"', description: "表面朝哪边滑开" },
  { name: "snapBounce", type: "number", default: "0.2", description: "甩动开合的弹簧回弹量" },
  { name: "resistance", type: "number", default: "0.55", description: "越过抽屉/全宽边缘的橡皮筋强度 0.05–1" },
  { name: "collapseMs", type: "number", default: "200", description: "行折叠退场时长（ms）" },
  { name: "commitAt", type: "number", default: "0.6", description: "全滑提交点占行宽的比例" },
  { name: "fullSwipe", type: "boolean", default: "true", description: "启用松手即提交的全滑；关掉最多开到抽屉宽" },
  { name: "disabled", type: "boolean", default: "false", description: "禁用整行（变暗、不可交互）" },
  { name: "open", type: "boolean", default: "—", description: "受控开合状态；不传则组件自持" },
  { name: "onOpenChange", type: "(open: boolean) => void", default: "—", description: "开合状态变化时回调" },
  { name: "onAction", type: "(action) => void", default: "—", description: "任何操作触发时先回调" },
  { name: "onCommit", type: "(action) => void", default: "—", description: "提交类操作折叠完成后回调" },
  { name: "closeOnAction", type: "boolean", default: "true", description: "次操作执行后收回抽屉" },
  { name: "haptic", type: "boolean", default: "true", description: "触屏越过提交点时轻震动 8ms" },
  { name: "label", type: "string", default: '"List item"', description: "行分组的可访问名称" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
];

export default {
  id: "swipe-row",
  name: "滑动行操作",
  href: "swipe-row.html",
  title: "滑动行操作",
  description:
    "手机式侧滑行：往侧面拖开露出操作抽屉，越过一格宽度后主操作色块随指随行，拖到全滑提交点出现「松手执行」，松手整行 leap 到满宽再折叠消失；甩动速度决定开合、慢拖按惯性投影判定，越界是橡皮筋。键盘 Tab 出隐藏开关，方向键/回车/Escape/删除键全程可用，aria-live 播报阶段，motion 驱动三枚运动值。",
  tags: ["React", "CSS", "Motion", "手势"],

  cardDescription: "行往侧边一滑露出操作抽屉，拖到底松手整行折叠删除。",

  demoHint: "左右拖动行露出抽屉；拖过半开，拖到底出现「松手执行」后松手整行消失；Tab 聚焦后方向键与删除键也能操作。",

  api: API,
};
