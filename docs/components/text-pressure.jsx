/* Component metadata only — the live demo and gallery preview live in
   text-pressure-demo.jsx, the framework source texts and the prompt in
   text-pressure-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with text-pressure-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "text", type: "string", default: '"Compressa"', description: "标题文字" },
  { name: "fontFamily", type: "string", default: '"Roboto Flex"', description: "字体族；需为可变字体（含 wdth / wght / ital 轴）" },
  { name: "fontUrl", type: "string", default: "内置 Roboto Flex 可变字体样式表", description: "以 @import 注入的字体样式表；默认 URL 以源码内嵌为准" },
  { name: "width", type: "boolean", default: "true", description: "压力映射到 wdth 轴（5 → 205）" },
  { name: "weight", type: "boolean", default: "true", description: "压力映射到 wght 轴（100 → 1000）" },
  { name: "italic", type: "boolean", default: "true", description: "压力映射到 ital 轴（0 → 1）" },
  { name: "alpha", type: "boolean", default: "false", description: "字符透明度随压力衰减" },
  { name: "flex", type: "boolean", default: "true", description: "字符两端撑满整行宽度" },
  { name: "stroke", type: "boolean", default: "false", description: "每个字符背后描一圈空心投影" },
  { name: "scale", type: "boolean", default: "false", description: "纵向拉伸填满容器高度" },
  { name: "radius", type: "number", default: "0.5", description: "压力作用半径，占标题宽度的比例" },
  { name: "smoothing", type: "number", default: "0.5", description: "指针跟随的迟滞 0–1，越大越黏" },
  { name: "idle", type: '"none" | "wave" | "pulse"', default: '"none"', description: "指针离开时的待机动画：无 / 波浪 / 脉搏" },
  { name: "idleSpeed", type: "number", default: "1", description: "待机动画的时钟倍率" },
  { name: "clickRipple", type: "boolean", default: "true", description: "点击处荡开压力涟漪，最多同时 6 圈" },
  { name: "textColor", type: "string", default: '"currentColor"', description: "字符基色" },
  { name: "pressureColor", type: "string", default: '""', description: "高压时向该色染色；留空不染色" },
  { name: "strokeColor", type: "string", default: '"#FF0000"', description: "描边投影的颜色" },
  { name: "strokeWidth", type: "number", default: "3", description: "描边投影宽度（px）" },
  { name: "className", type: "string", default: '""', description: "标题附加类名" },
  { name: "minFontSize", type: "number", default: "24", description: "计算字号的下限（px）" },
];

export default {
  id: "text-pressure",
  name: "指压变形文字",
  href: "text-pressure.html",
  title: "指压变形文字",
  description:
    "可变字体做的压力场标题：指针附近的字符变宽、变重、变斜，带迟滞地跟手；指针离开后可切换待机波浪或脉搏呼吸，点击荡开最多六圈压力涟漪，字符还可以向高压色染色、背后描空心投影；字号按容器宽度自适应，rAF 空闲自睡。",
  tags: ["React", "可变字体", "文字"],

  cardDescription: "字符在指针压力下变宽变重，点击荡开涟漪，闲置时自己呼吸。",

  demoHint: "在标题上移动指针看字符形变，点击荡涟漪；打开 wave 待机后移开指针看呼吸。",

  api: API,
};
