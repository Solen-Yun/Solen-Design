/* Component metadata only — the live demo and gallery preview live in
   echo-text-demo.jsx, the framework source texts and the prompt in
   echo-text-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with echo-text-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "text", type: "string", default: '"Motion Echo"', description: "残影重复的文字" },
  { name: "echoes", type: "number", default: "12", description: "残影层数 0–24" },
  { name: "lag", type: "number", default: "0.24", description: "越深的残影拖得越远，0.02–0.5" },
  { name: "offset", type: "number", default: "36", description: "拖尾距离（px），0–120" },
  { name: "direction", type: '"right" | "left" | "up" | "down" | "diagonal"', default: '"right"', description: "入场拖影的方向" },
  { name: "fade", type: "number", default: "0.72", description: "每层残影的透明度衰减，0.1–0.95" },
  { name: "blur", type: "number", default: "3", description: "最深残影的模糊半径（px），0–16" },
  { name: "tint", type: "string", default: '"#7dd3fc"', description: "残影色，按深度混入继承的文字色" },
  { name: "echoColors", type: "string[]", default: "—", description: "残影色阶，从首色插值到尾色" },
  { name: "echoStyle", type: '"solid" | "outline"', default: '"solid"', description: "残影实心填充或只描边" },
  { name: "echoScale", type: "number", default: "1", description: "残影随深度的放大倍率，0.25–2.5" },
  { name: "mode", type: '"entrance" | "pointer" | "both"', default: '"both"', description: "只入场 / 只跟随指针 / 两者都要" },
  { name: "trail", type: '"pointer" | "auto" | "scroll"', default: '"pointer"', description: "入场后的拖尾驱动：指针 / 自主漂移 / 滚动" },
  { name: "clickBurst", type: "boolean", default: "true", description: "点击时从点击点炸出一圈扩散残影" },
  { name: "cursorRadius", type: "number", default: "320", description: "指针影响半径（px），40–1200" },
  { name: "duration", type: "number", default: "900", description: "入场收敛时长（ms）" },
  { name: "ease", type: '"linear" | "ease-out" | "ease-in-out" | "snappy"', default: '"ease-out"', description: "入场的缓动曲线" },
  { name: "fontSize", type: "string", default: '"clamp(3rem, 9vw, 7rem)"', description: "字号" },
  { name: "fontWeight", type: "number", default: "800", description: "字重" },
  { name: "color", type: "string", default: '"currentColor"', description: "前景文字颜色；残影把 tint 混入该色" },
  { name: "className", type: "string", default: '""', description: "根节点附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根节点内联样式" },
];

export default {
  id: "echo-text",
  name: "残影回声文字",
  href: "echo-text.html",
  title: "残影回声文字",
  description:
    "残影回声文字：一叠半透明残影从方向性拖影里收敛成一个词，之后跟随指针、自主正弦漂移或逆着滚动剪切，点击还会从落点炸出一圈扩散残影；每层残影按深度拖后、放大、加深模糊与衰减，帧循环在静止时自睡，reduced-motion 下退化为纯文字。",
  tags: ["React", "CSS", "文字"],

  cardDescription: "残影从拖影里收敛成词，指针走过就拖着尾巴。",

  demoHint: "移动指针拖着残影走，点击炸一圈残影；换 auto 漂移看它自己晃。",

  api: API,
};
