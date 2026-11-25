/* Component metadata only — the live demo and gallery preview live in
   gradient-text-demo.jsx, the framework source texts and the prompt in
   gradient-text-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with gradient-text-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "children", type: "ReactNode", default: "—", description: "被渐变裁切的文字或内容" },
  { name: "colors", type: "string[]", default: '["#5227FF", "#FF9FFC", "#B497CF"]', description: "渐变调色板，首尾相接循环；单色会自我复制" },
  { name: "animationSpeed", type: "number", default: "8", description: "一轮动画的时长（秒），下限 0.2" },
  { name: "variant", type: '"linear" | "flow" | "conic"', default: '"linear"', description: "三种活的渐变：滑动扫光、漂移色斑、摆动锥形色轮" },
  { name: "angle", type: "number", default: "90", description: "基础渐变角度（度）" },
  { name: "direction", type: '"horizontal" | "vertical" | "diagonal"', default: "—", description: "方向速记，覆盖 angle 为 90 / 180 / 135" },
  { name: "scale", type: "number", default: "3", description: "图案尺度 1–6，越大颜色铺得越开" },
  { name: "yoyo", type: "boolean", default: "true", description: "往复摆动而不是循环绕回" },
  { name: "glow", type: "number", default: "0", description: "文字背后的柔光晕 0–1" },
  { name: "showBorder", type: "boolean", default: "false", description: "包一层同渐变的胶囊描边" },
  { name: "borderWidth", type: "number", default: "1.5", description: "描边粗细（px）" },
  { name: "pauseOnHover", type: "boolean", default: "false", description: "悬停时冻结动画" },
  { name: "followPointer", type: "boolean", default: "false", description: "色斑 / 色轮中心 / 条纹随指针漂移" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
];

export default {
  id: "gradient-text",
  name: "流动渐变文字",
  href: "gradient-text.html",
  title: "流动渐变文字",
  description:
    "文字内部是活的渐变：linear 沿角度往复滑动扫光，flow 多颗径向色斑按各自轨道漂移并垫一层线性渐变，conic 锥形色轮绕中心摆动；支持指针跟随（弹簧平滑）、悬停暂停、同渐变胶囊描边与文字背后的柔光晕，rAF 循环只写一个 CSS 变量，离屏自睡。",
  tags: ["React", "CSS", "文字"],

  cardDescription: "文字内部是活的渐变：滑动的扫光、漂移的色斑或摆动的锥形色轮。",

  demoHint: "切换三种渐变模式看不同流法；开指针跟随把光斑拖到字上；开启描边与柔光看胶囊发光；调尺度看条纹疏密。",

  api: API,
};
