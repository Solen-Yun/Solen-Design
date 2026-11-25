/* Component metadata only — the live demo and gallery preview live in
   ascii-text-demo.jsx, the framework source texts and the prompt in
   ascii-text-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with ascii-text-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "text", type: "string", default: '"Hey!"', description: "渲染成字符画的标题文字" },
  { name: "asciiFontSize", type: "number", default: "8", description: "单个字符格的边长（px），下限 3；格宽为高的 0.62 倍" },
  { name: "charset", type: "string", default: "默认 70 字符集", description: "按明暗疏密排序的字形池；不足 2 个字符时回退默认" },
  { name: "fontFamily", type: "string", default: "等宽字体栈", description: "源文字与字形图集共用的字体栈" },
  { name: "fontWeight", type: "number", default: "600", description: "源文字的字重" },
  { name: "textColor", type: "string", default: '"#fdf9f3"', description: "源文字颜色；配色覆盖观感，底图保留该颜色" },
  { name: "colors", type: "string[]", default: '["#ff6188", "#fc9867", "#ffd866"]', description: "径向三段配色——中心、中段、边缘；缺项复用前项" },
  { name: "textScale", type: "number", default: "1", description: "虚拟文字平面的缩放 0.1–3，同时缩放回退字号" },
  { name: "blocks", type: "number", default: "0.9", description: "字符层下方平滑文字底图的透明度 0–1" },
  { name: "waves", type: "number", default: "1", description: "平面正弦扭曲的幅度，≥ 0" },
  { name: "waveSpeed", type: "number", default: "1", description: "波浪相位推进速度，≥ 0" },
  { name: "chroma", type: "number", default: "1", description: "RGB 色散分离强度，≥ 0" },
  { name: "tilt", type: "number", default: "1", description: "平面朝指针倾斜的幅度，≥ 0" },
  { name: "hueShift", type: "number", default: "1", description: "色相随指针角度旋转的强度 0–2" },
  { name: "scramble", type: "number", default: "0.6", description: "悬停打散的强度与半径权重 0–1" },
  { name: "clickRipple", type: "boolean", default: "true", description: "点击生成向外扩散的乱码波纹环" },
  { name: "intro", type: "boolean", default: "true", description: "首次绘制时播放从噪声解码出文字的入场" },
  { name: "idle", type: "boolean", default: "true", description: "指针离开时平面自行摆动" },
  { name: "interactive", type: "boolean", default: "true", description: "开启指针倾斜、色相漂移、悬停打散与波纹" },
  { name: "theme", type: '"dark" | "light"', default: '"dark"', description: "light 模式反转渲染颜色，适配浅色背景" },
  { name: "className", type: "string", default: '""', description: "根节点附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根节点内联样式覆盖" },
];

export default {
  id: "ascii-text",
  name: "字符浪潮文字",
  href: "ascii-text.html",
  title: "字符浪潮文字",
  description:
    "WebGL2 把标题重画成 ASCII 字符格：每格按亮度从字形池里挑字符，文字坐在一块虚拟 3D 平面上，随指针交叉轴倾斜、随正弦波起伏，RGB 三通道色散漂移；悬停打散指针附近的字符，点击发出扩散乱码波纹，首帧还有一段从噪声解码出文字的入场，无 WebGL2 时回退纯文本。",
  tags: ["React", "WebGL", "文字"],

  cardDescription: "标题化成 ASCII 字符格，随指针倾斜、波浪起伏、点击泛起乱码波纹。",

  demoHint: "在文字上移动指针看平面倾斜与悬停打散，点击看波纹扩散；字号、波浪、色散与主题可调。",

  api: API,
};
