/* Component metadata only — the live demo and gallery preview live in
   scrambled-text-demo.jsx, the framework source texts and the prompt in
   scrambled-text-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with scrambled-text-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "children", type: "ReactNode", default: "—", description: "要扰动的文字；字符串变化时重建拆分（必填）" },
  { name: "radius", type: "number", default: "100", description: "指针影响半径（px）" },
  { name: "duration", type: "number", default: "1.2", description: "基础乱码补间时长（秒）" },
  { name: "speed", type: "number", default: "0.5", description: "乱码字符轮换速度 0–1" },
  { name: "scrambleChars", type: "string", default: '".:"', description: "乱码字符池" },
  { name: "scrambleColor", type: "string", default: '""', description: "乱码未落定时字符的颜色；留空用文字色" },
  { name: "effect", type: '"scramble" | "lift" | "blur" | "magnify"', default: '"scramble"', description: "指针模式；后三种是物理扰动场" },
  { name: "strength", type: "number", default: "1", description: "物理扰动幅度倍率（≥ 0）" },
  { name: "trail", type: "number", default: "0.6", description: "扰动在指针身后残留的时间尺度" },
  { name: "clickBurst", type: "boolean", default: "true", description: "点击发出扩散冲击波并重新乱码" },
  { name: "intro", type: "boolean", default: "true", description: "首次进入视口时逐字解码" },
  { name: "fontFamily", type: "string", default: '""', description: "块级字体族；留空用默认等宽字体" },
  { name: "color", type: "string", default: '""', description: "文字颜色；留空继承" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "object", default: "{}", description: "根元素内联样式" },
];

export default {
  id: "scrambled-text",
  name: "随机扰动文字",
  href: "scrambled-text.html",
  title: "随机扰动文字",
  description:
    "指针划过时字母在字符池里乱码滚动再逐个落定：乱码、升起、模糊、放大四种模式，后三种是围绕指针的能量场，字母按能量位移、失焦或被推开放大；点击发出一圈扩散冲击波，波前扫过的字母重新乱码；首次进入视口时整段文字按序解码，排版层与字形层分离使布局不抖动。",
  tags: ["React", "GSAP", "文字"],

  cardDescription: "指针扰动字母乱码滚动再落定，点击发出扩散波，物理模式把字母推升模糊。",

  demoHint: "切换四种扰动模式拖动指针；点击画面看波纹扫过重新乱码；调半径与拖尾看影响范围和残留；开强调色看乱码字符变色。",

  api: API,
};
