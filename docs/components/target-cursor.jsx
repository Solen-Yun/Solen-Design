/* Component metadata only — the live demo and gallery preview live in
   target-cursor-demo.jsx, the framework source texts and the prompt in
   target-cursor-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with target-cursor-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "targetSelector", type: "string", default: '".cursor-target"', description: "用 closest 匹配锁定目标的选择器" },
  { name: "cursorColor", type: "string", default: '"#ffffff"', description: "角框、圆点与标签的基础颜色" },
  { name: "cursorColorOnTarget", type: "string", default: "—", description: "锁定时按进度混入的强调色" },
  { name: "spinDuration", type: "number", default: "2", description: "游荡时旋转一圈的秒数；0 关闭旋转" },
  { name: "hoverDuration", type: "number", default: "0.2", description: "角框吸附目标的时长（s），下限 0.05" },
  { name: "parallaxOn", type: "boolean", default: "true", description: "锁定时准星中心向光标偏移最多 8%" },
  { name: "hideDefaultCursor", type: "boolean", default: "true", description: "指针在作用域内时隐藏原生光标" },
  { name: "size", type: "number", default: "36", description: "游荡时的准星边长（px），下限 4" },
  { name: "cornerSize", type: "number", default: "12", description: "每段角框臂长（px），下限 2" },
  { name: "thickness", type: "number", default: "3", description: "角框描边宽度（px），下限 0.5" },
  { name: "padding", type: "number", default: "6", description: "角框与目标盒子之间的间距（px）" },
  { name: "matchRadius", type: "boolean", default: "true", description: "角框圆角贴合目标圆角（加间距，封顶 cornerSize）" },
  { name: "dotSize", type: "number", default: "4", description: "中心圆点直径（px）；0 隐藏圆点" },
  { name: "blendMode", type: "string", default: '"difference"', description: "整个图层的 mix-blend-mode" },
  { name: "showLabel", type: "boolean", default: "true", description: "在角框上方显示目标 data-cursor-label 的文字" },
  { name: "clickEffect", type: "boolean", default: "true", description: "按下时角框收紧、圆点缩小" },
  { name: "container", type: "Element | RefObject", default: "—", description: "作用域元素；不传则覆盖整页" },
];

export default {
  id: "target-cursor",
  name: "锁定准星光标",
  href: "target-cursor.html",
  title: "锁定准星光标",
  description:
    "四段角框组成的光标替身：游荡时贴着光标旋转，落到 .cursor-target 上就吸住目标——角框拉伸到目标盒子加间距、圆角贴合目标圆角、转正吸附到最近的 90°，离开再旋回自由态；中心圆点始终贴住真实指针，data-cursor-label 可浮在角框上方，按下时整体收紧，difference 混合让它在任何底色上都清晰。全部几何由弹簧驱动（吸附时长即弹簧参数），原生光标在作用域内隐藏，触屏设备不渲染，帧循环静止自睡。",
  tags: ["React", "CSS", "光标", "交互"],

  cardDescription: "角框准星光标，悬停目标即吸附并贴合其圆角。",

  demoHint: "在台内移动看角框旋转跟随，悬停按钮和卡片看吸附与圆角贴合，点击看收紧；作用域仅限舞台。",

  api: API,
};
