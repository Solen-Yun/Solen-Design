/* Component metadata only — the live demo and gallery preview live in
   floating-lines-demo.jsx, the framework source texts and the prompt in
   floating-lines-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with floating-lines-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "linesGradient", type: "string[]", default: '["#e945f5", "#ffffff"]', description: "线的颜色断点，最多 8 个，沿每组线插值" },
  { name: "enabledWaves", type: '("top" | "middle" | "bottom")[]', default: '["top", "middle", "bottom"]', description: "启用哪些波组" },
  { name: "lineCount", type: "number | number[]", default: "10", description: "每组线数（0–24）；数组按启用的波逐个映射" },
  { name: "lineDistance", type: "number | number[]", default: "6", description: "组内线间距" },
  { name: "topWavePosition", type: "{ x?, y?, rotate? }", default: "—", description: "覆盖上波组的摆放" },
  { name: "middleWavePosition", type: "{ x?, y?, rotate? }", default: "—", description: "覆盖中波组的摆放" },
  { name: "bottomWavePosition", type: "{ x?, y?, rotate? }", default: "—", description: "覆盖下波组的摆放" },
  { name: "animationSpeed", type: "number", default: "1", description: "相位漂移速度，下限 0" },
  { name: "amplitude", type: "number", default: "1", description: "线的摆动幅度，下限 0" },
  { name: "lineWidth", type: "number", default: "1", description: "芯线宽度，下限 0.1" },
  { name: "lineStyle", type: '"solid" | "dashed" | "dotted"', default: '"solid"', description: "把线断成虚线或点线" },
  { name: "glow", type: "number", default: "1", description: "光晕强度，同时扩大光晕范围" },
  { name: "brightness", type: "number", default: "1", description: "色调映射曝光，下限 0" },
  { name: "depthOfField", type: "number", default: "0.5", description: "远组模糊，clamp 0–1" },
  { name: "edgeFade", type: "number", default: "0", description: "左右边缘渐隐，clamp 0–1" },
  { name: "interactive", type: "boolean", default: "true", description: "光标弯折并提亮附近的线" },
  { name: "bendRadius", type: "number", default: "5", description: "弯折衰减半径，下限 0.1" },
  { name: "bendStrength", type: "number", default: "-0.5", description: "弯折量；负值把线推开" },
  { name: "mouseDamping", type: "number", default: "0.05", description: "指针跟随延迟，clamp 0–1" },
  { name: "parallax", type: "boolean", default: "true", description: "波组随指针反向漂移" },
  { name: "parallaxStrength", type: "number", default: "0.2", description: "视差幅度，下限 0" },
  { name: "clickSwirl", type: "boolean", default: "true", description: "点击拧转全场，方向跟随笔画" },
  { name: "intro", type: "boolean", default: "true", description: "1.8s 内淡入并荡开" },
  { name: "mixBlendMode", type: "CSSProperties[\"mixBlendMode\"]", default: '"screen"', description: "容器混合模式；浅色/不透明模式下强制 normal" },
  { name: "backgroundColor", type: "string", default: "—", description: "不透明底色，任意 CSS 颜色字符串" },
  { name: "lightMode", type: "boolean", default: "false", description: "浅色模式：印成墨线，适合浅色页面" },
  { name: "opacity", type: "number", default: "1", description: "输出不透明度，clamp 0–1" },
  { name: "dpr", type: "number", default: "devicePixelRatio", description: "画布像素比覆盖，clamp 至 2" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "floating-lines",
  name: "光纤波带",
  href: "floating-lines.html",
  title: "光纤波带",
  description:
    "三条漂移的发光细线波带：上下中三组细丝像慢速示波器绸带般摆动，最多 8 色渐变沿组内线插值；光标带磁吸弯折并提亮附近的线，波组随指针视差漂移，远组景深虚化，点击按笔画方向拧转全场。虚线/点线断样式、边缘渐隐、HDR 色调映射与辉光，暗底 screen 混合、浅色页印成墨线；帧循环常开但离屏与切页即停。",
  tags: ["React", "WebGL", "CSS", "背景"],

  cardDescription: "三组发光细线波带漂移，光标磁吸弯折，点击拧转全场。",

  demoHint: "移动光标看线被磁吸弯折，快速划过再点击看拧转方向跟随笔画；波组、线数与渐变可调。",

  api: API,
};
