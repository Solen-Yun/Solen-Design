/* Component metadata only — the live demo and gallery preview live in
   shredder-demo.jsx, the framework source texts and the prompt in
   shredder-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with shredder-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "items", type: "{ id: string }[]", default: "[]", description: "列表数据，每项必须有唯一 id，顺序与销毁记账都靠它" },
  { name: "renderItem", type: "(item, index) => ReactNode", default: "—", description: "渲染每行内容；行首元素背景色兼作碎条兜底填充色" },
  { name: "onShred", type: "(item) => void", default: "—", description: "一行被吞掉时回调" },
  { name: "onReorder", type: "(items) => void", default: "—", description: "拖拽改变顺序提交后回调，携带排序后的 items" },
  { name: "width", type: "number", default: "340", description: "整机宽度（px），窄容器会自动收缩" },
  { name: "height", type: "number", default: "460", description: "整机总高（px）：列表 + 刀口 + 下落区" },
  { name: "inset", type: "number", default: "14", description: "列表左右内边距（px）" },
  { name: "gap", type: "number", default: "10", description: "行间距（px）" },
  { name: "slitHeight", type: "number", default: "4", description: "刀口条高度（px）" },
  { name: "fallHeight", type: "number", default: "140", description: "底部碎条下落画布高度（px）" },
  { name: "feedSpeed", type: "number", default: "180", description: "基础吞纸速度（px/s）" },
  { name: "bite", type: "number", default: "18", description: "行底越过刀口多少 px 机器才下口" },
  { name: "autoFeed", type: "boolean", default: "true", description: "拖动中行一越过刀口就咬；关掉则要松手才吞" },
  { name: "stripWidth", type: "number", default: "10", description: "目标纸条宽度（px），条数按行宽自适应" },
  { name: "curl", type: "number", default: "1", description: "纸条卷曲与摆动幅度倍率" },
  { name: "autoAnimate", type: "boolean", default: "false", description: "自动演示：机器自己不停喂纸" },
  { name: "loop", type: "boolean", default: "false", description: "全部碎完后整列重生" },
  { name: "loopAfterDelete", type: "boolean", default: "false", description: "每行碎掉后不久在随机位置重生" },
  { name: "dragTilt", type: "number", default: "6", description: "拖动倾斜角上限（度）" },
  { name: "lift", type: "number", default: "1.02", description: "拖动时的放大倍率" },
  { name: "slitColor", type: "string", default: '"#3f3f46"', description: "刀口条颜色" },
  { name: "color", type: "string", default: '"#f5f5f5"', description: "整机墨色；浅色适合深底舞台" },
  { name: "disabled", type: "boolean", default: "false", description: "禁用拖拽与键盘销毁，整机变暗" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
];

export default {
  id: "shredder",
  name: "碎纸机列表",
  href: "shredder.html",
  title: "碎纸机列表",
  description:
    "列表底部装了一台碎纸机：把任意一行拖过刀口再往下顶（或直接松手），整行被拉进去切成纸条——卷曲、摆动、撕窄、飘出画布；拖动中其它行用弹簧腾位，插入点带迟滞。行快照经 SVG foreignObject 光栅化成贴图喂给 Canvas 条带模拟；键盘 Delete 也能销毁选中行；支持自动演示、碎后随机重生与整列循环。",
  tags: ["React", "CSS", "Canvas", "拖拽"],

  cardDescription: "把列表行拖进底部刀口，整行被吞成卷曲飘落的纸条。",

  demoHint: "按住任意一行拖到底部刀口，松手或再往下顶都会被吞掉；Delete 键也能碎掉选中的行；开了自动演示它自己会喂纸。",

  api: API,
};
