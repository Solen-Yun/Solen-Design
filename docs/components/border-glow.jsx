/* Component metadata only — the live demo and gallery preview live in
   border-glow-demo.jsx, the framework source texts and the prompt in
   border-glow-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with border-glow-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "children", type: "ReactNode", default: "—", description: "卡片内容，渲染在内层弹性列里" },
  { name: "className", type: "string", default: '""', description: "卡片附加类名" },
  { name: "edgeSensitivity", type: "number", default: "30", description: "外圈辉光开始出现的指针接近阈值（0–100）" },
  { name: "glowColor", type: "string", default: '"40 80 80"', description: "辉光色，H S L 三元数字符串（如 \"268 90 76\"）；解析失败回退暖金色" },
  { name: "backgroundColor", type: "string", default: '"#120F17"', description: "卡片底色；浅色 hex 会整卡切换浅色变体" },
  { name: "borderRadius", type: "number", default: "28", description: "圆角（px）" },
  { name: "glowRadius", type: "number", default: "40", description: "外圈辉光溢出边框的距离（px）" },
  { name: "glowIntensity", type: "number", default: "1.0", description: "辉光 alpha 阶梯的倍率" },
  { name: "coneSpread", type: "number", default: "25", description: "朝向指针的受光弧宽（占整圆百分比）" },
  { name: "animated", type: "boolean", default: "false", description: "自动播放一圈辉光扫边动画" },
  { name: "colors", type: "string[]", default: '["#c084fc", "#f472b6", "#38bdf8"]', description: "网格渐变的池色，按固定位置映射到 7 个池" },
  { name: "fillOpacity", type: "number", default: "0.5", description: "卡面 soft-light 网格填充的强度" },
];

export default {
  id: "border-glow",
  name: "指向性辉光边框",
  href: "border-glow.html",
  title: "指向性辉光边框",
  description:
    "1px 边框是一圈彩色网格渐变，只有朝向指针的弧段被锥形遮罩点亮：指针贴近边框时，外圈同色辉光沿同一方向溢出、卡面近边处浮起 soft-light 网格填充；居中时全部熄灭。纯 CSS 渐变 + conic 遮罩，指针只写两个 CSS 变量（角度与边缘接近度），可选一圈自动扫边动画，浅色底自动切换浅色变体。",
  tags: ["React", "CSS"],

  cardDescription: "边框网格渐变朝指针方向点亮，越贴近边缘越亮。",

  demoHint: "绕着卡片外圈移动指针看光锥转向；调锥宽、辉光半径，开自动扫边看空手转一圈。",

  api: API,
};
