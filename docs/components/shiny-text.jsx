/* Component metadata only — the live demo and gallery preview live in
   shiny-text-demo.jsx, the framework source texts and the prompt in
   shiny-text-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with shiny-text-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "text", type: "string", default: "—", description: "流光扫过的文字；未传 children 时生效" },
  { name: "children", type: "ReactNode", default: "—", description: "优先于 text，内容是真实文字节点，可选中、可被读屏" },
  { name: "color", type: "string", default: '"#b5b5b5"', description: "文字底色，任意浏览器可解析的 CSS 颜色" },
  { name: "shineColor", type: "string", default: '"#ffffff"', description: "扫过的高光颜色" },
  { name: "speed", type: "number", default: "2", description: "扫一整趟的秒数，下限 0.1" },
  { name: "delay", type: "number", default: "0", description: "loop 模式两趟之间的间隔秒数" },
  { name: "angle", type: "number", default: "120", description: "渐变角度（°），也是指针跟随的投影轴" },
  { name: "shineWidth", type: "number", default: "40", description: "光带宽度（占元素宽度的 %），限定 2–200" },
  { name: "softness", type: "number", default: "0.8", description: "光带边缘柔度 0–1" },
  { name: "bands", type: "number", default: "1", description: "拖尾光带条数，1–3，每条依次减弱" },
  { name: "glow", type: "number", default: "0", description: "辉光强度 0–1；大于 0 时叠加一层随光带移动的模糊光晕" },
  { name: "direction", type: '"left" | "right"', default: '"left"', description: "光带扫过的方向" },
  { name: "easing", type: '"linear" | "smooth" | "snappy"', default: '"smooth"', description: "每趟扫过的缓动" },
  { name: "trigger", type: '"loop" | "hover" | "view"', default: '"loop"', description: "触发时机：持续循环、指针进入一次、首次进入视口一次" },
  { name: "yoyo", type: "boolean", default: "false", description: "每趟交替往返方向" },
  { name: "followPointer", type: "boolean", default: "false", description: "光带以弹簧跟随指针，移开后滑回最近边缘" },
  { name: "pauseOnHover", type: "boolean", default: "false", description: "悬停时冻结扫动，移开恢复" },
  { name: "disabled", type: "boolean", default: "false", description: "关闭流光，只显示底色" },
  { name: "className", type: "string", default: '""', description: "附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "内联样式" },
];

export default {
  id: "shiny-text",
  name: "流光扫过文字",
  href: "shiny-text.html",
  title: "流光扫过文字",
  description:
    "一层光带周期性扫过文字：背景裁剪渐变实现，文字是真实字形（可选中、可读屏）；光带柔边可调、最多三条减弱的拖尾带，可选模糊辉光随行。支持循环 / 悬停 / 首见三种触发、往返交替、指针弹簧跟随与悬停暂停，颜色解析走 canvas fillStyle（hex/rgb/hsl/命名色），混色在 2.2 gamma 空间进行，rAF 自睡。",
  tags: ["React", "CSS", "文字"],

  cardDescription: "一道柔光周期性扫过文字，可加辉光与拖尾。",

  demoHint: "把光带调宽、加拖尾与辉光试试金属感；开指针跟随让光贴着鼠标走。",

  api: API,
};
