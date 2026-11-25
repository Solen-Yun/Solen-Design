/* Component metadata only — the live demo and gallery preview live in
   fold-text-demo.jsx, the framework source texts and the prompt in
   fold-text-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with fold-text-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "text", type: "string", default: '"Design unfolds"', description: "要折开的文字；\\n 强制换行" },
  { name: "splitBy", type: '"char" | "word" | "line"', default: '"char"', description: "折叠单位；按字符时单词整体不断行" },
  { name: "hinge", type: '"top" | "bottom" | "left" | "right"', default: '"top"', description: "纸片绕哪条边旋转展开" },
  { name: "foldStyle", type: '"paper" | "blinds" | "flip"', default: '"paper"', description: "折法：纸面折叠、百叶两片依次展开、翻面整体翻 180°" },
  { name: "duration", type: "number", default: "0.65", description: "单片展开时长（秒）" },
  { name: "stagger", type: "number", default: "0.045", description: "相邻纸片的错峰间隔（秒）" },
  { name: "staggerFrom", type: "string", default: '"start"', description: "错峰从哪端开始（索引、start、end、center 等）" },
  { name: "foldAngle", type: "number", default: "92", description: "起始折叠角（度），钳制在 0–180" },
  { name: "ease", type: "string", default: '"power3.out"', description: "展开缓动名称" },
  { name: "perspective", type: "number", default: "700", description: "3D 透视距离（px），下限 120" },
  { name: "creaseShading", type: "number", default: "0.55", description: "折痕阴影强度 0–1" },
  { name: "trigger", type: '"mount" | "hover" | "scroll" | "loop"', default: '"mount"', description: "展开时机：挂载、悬停重播、滚动入视口一次、循环展开折回" },
  { name: "loopDelay", type: "number", default: "1.4", description: "循环模式下展开与折回之间的停顿（秒）" },
  { name: "hoverRefold", type: "boolean", default: "false", description: "指针附近的纸片重新折起" },
  { name: "refoldRadius", type: "number", default: "140", description: "指针影响半径（px），下限 1" },
  { name: "refoldAngle", type: "number", default: "45", description: "指针附近附加的折角（度），钳制 0–180" },
  { name: "fontSize", type: "number | string", default: "80", description: "字号；数字按 px，字符串原样使用" },
  { name: "fontWeight", type: "number | string", default: "800", description: "字重" },
  { name: "color", type: "string", default: '"currentColor"', description: "文字颜色" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "{}", description: "根元素内联样式，合并在组件变量之后" },
];

export default {
  id: "fold-text",
  name: "折纸展开文字",
  href: "fold-text.html",
  title: "折纸展开文字",
  description:
    "标题按字符、词或整行拆成小纸片，绕上、下、左、右铰链从折叠角旋转展开到平面，折痕阴影随展开渐隐；纸面、百叶、翻面三种折法，挂载 / 悬停 / 滚动 / 循环四种触发，开启悬停重折后指针附近的纸片会重新折起再弹平。",
  tags: ["React", "GSAP", "CSS", "文字"],

  cardDescription: "标题像折纸一样绕铰链逐片展开，折痕阴影随展开渐隐。",

  demoHint: "切换铰链与折法看不同展开方向；循环模式看展开后再折回；开启悬停重折后移动指针看纸片重新折起。",

  api: API,
};
