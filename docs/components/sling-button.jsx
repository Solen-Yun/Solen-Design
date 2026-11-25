/* Component metadata only — the live demo and gallery preview live in
   sling-button-demo.jsx, the framework source texts and the prompt in
   sling-button-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with sling-button-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "children", type: "ReactNode", default: "内置上箭头图标", description: "垫面内的图标内容；不传用内置上箭头轮廓图标" },
  { name: "onSend", type: "() => void", default: "—", description: "拉过蓄力线松手发射或轻点时回调" },
  { name: "padColor", type: "string", default: '"#f5f5f5"', description: "垫面颜色" },
  { name: "iconColor", type: "string", default: '"#18181b"', description: "图标颜色" },
  { name: "accentColor", type: "string", default: '"#f5f5f5"', description: "绷紧的皮筋、蓄力弧、粒子与发射闪光的强调色" },
  { name: "wellColor", type: "string", default: '"#27272a"', description: "垫面背后的凹井颜色" },
  { name: "bandColor", type: "string", default: '"#52525b"', description: "未蓄力时皮筋的底色" },
  { name: "size", type: "number", default: "56", description: "按钮直径（px），图标与粒子尺寸随其推导" },
  { name: "strokeWidth", type: "number", default: "3", description: "皮筋、蓄力弧与凹井描边宽度（px）" },
  { name: "armAt", type: "number", default: "48", description: "蓄力触发距离（px），上限为 maxPull 的 80%" },
  { name: "maxPull", type: "number", default: "160", description: "橡皮筋回弹上限（px），拉不到头越拉越紧" },
  { name: "launchSpeed", type: "number", default: "2600", description: "发射瞬间垫面回弹的初速（px/s）" },
  { name: "recoil", type: "number", default: "0.2", description: "回弹弹簧的回跳量 0–1" },
  { name: "flight", type: "number", default: "120", description: "粒子飞行的基准距离（px）" },
  { name: "particles", type: "number", default: "14", description: "粒子数量，最小 0" },
  { name: "spread", type: "number", default: "60", description: "粒子锥形散开的半角（度）" },
  { name: "axis", type: '"any" | "horizontal" | "vertical"', default: '"any"', description: "拉伸方向：自由二维或锁定单轴（另一轴回弹受限）" },
  { name: "tapSends", type: "boolean", default: "true", description: "不发生位移的按压在松手时也算发送" },
  { name: "disabled", type: "boolean", default: "false", description: "禁用按钮" },
  { name: "ariaLabel", type: "string", default: '"Send"', description: "垫面按钮的可访问名称" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
];

export default {
  id: "sling-button",
  name: "弹弓发送按钮",
  href: "sling-button.html",
  title: "弹弓发送按钮",
  description:
    "把发送按钮当弹弓玩：按住圆形垫面向任意方向拖拽，皮筋从凹井边缘绷到垫面、强调色弧线随拉距蓄力、图标转向瞄准；拉过蓄力线松手即发射——垫面带初速弹回原位，一锥形粒子沿发射方向迸散，凹井闪一下强调色；拉不够则安静弹回。支持橡皮筋上限、单轴锁定、轻点发送、Escape 取消与 reduced-motion 降级（只闪不发粒子）。",
  tags: ["React", "CSS", "Motion", "按钮"],

  cardDescription: "按住拉成弹弓，松手发射，粒子锥形迸散弹回原位。",

  demoHint: "向任意方向拖住垫面拉过蓄力线再松手看发射；拉过头蓄力更强；轻点直接发送；Escape 可取消拖拽。",

  api: API,
};
