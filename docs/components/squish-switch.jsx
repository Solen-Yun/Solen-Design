/* Component metadata only — the live demo and gallery preview live in
   squish-switch-demo.jsx, the framework source texts and the prompt in
   squish-switch-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "squish-switch",
  name: "捏压开关",
  href: "squish-switch.html",
  title: "捏压开关",
  description:
    "一个会变形的开关：滑块随拖动速度沿运动方向拉长、垂直收窄保持面积不变，松手由弹簧送回终点，轻点切换、拖过中线提前提交，受控/非受控两用，键盘与触屏完整支持。",

  cardDescription: "滑块随速度拉长收窄，松手弹回，拖过中线即提交。",

  demoHint: "拖动滑块看拉伸变形，拖过中线提前切换；点按切换；Esc 取消拖动；悬停胀大。",



  api: [
    { name: "checked", type: "boolean", default: "undefined", description: "受控状态；不传则自持" },
    { name: "defaultChecked", type: "boolean", default: "false", description: "非受控初始状态" },
    { name: "onChange", type: "(checked: boolean) => void", default: "—", description: "轻点 / 拖过中线 / 键盘激活时回调" },
    { name: "label", type: "string", default: '""', description: "开关旁标签" },
    { name: "disabled", type: "boolean", default: "false", description: "禁用" },
    { name: "trackColor", type: "string", default: '"#27272a"', description: "关态轨道色" },
    { name: "trackOnColor", type: "string", default: '"#f5f5f5"', description: "开态轨道色" },
    { name: "thumbColor", type: "string", default: '""', description: "关态滑块色；留空自动混色" },
    { name: "thumbOnColor", type: "string", default: '""', description: "开态滑块色；留空用关态轨道色" },
    { name: "width", type: "number", default: "76", description: "轨道宽度（px）" },
    { name: "height", type: "number", default: "38", description: "轨道高度（px）" },
    { name: "radius", type: "number", default: "19", description: "轨道圆角（px）" },
    { name: "speed", type: "number", default: "50", description: "落定弹簧刚度（0–100）" },
    { name: "stretch", type: "number", default: "36", description: "速度拉伸量（0–100）" },
    { name: "hoverScale", type: "number", default: "1.035", description: "悬停胀大倍率" },
    { name: "colorDuration", type: "number", default: "320", description: "换色时长（ms）" },
    { name: "ariaLabel", type: "string", default: "—", description: "无标签时的可访问名称" },
    { name: "className", type: "string", default: '""', description: "根元素附加类名" },
    { name: "id", type: "string", default: "—", description: "开关按钮 id" },
  ],
};
