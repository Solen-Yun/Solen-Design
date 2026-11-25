/* Component metadata only — the live demo and gallery preview live in
   electric-logo-demo.jsx, the framework source texts and the prompt in
   electric-logo-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with electric-logo-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "src", type: "string", default: "内置闪电图形", description: "要通电的标志图片；透明扁平图形描摹效果最好，换图时新旧轮廓平滑变形过渡" },
  { name: "color", type: "string", default: '"#ecc7ff"', description: "波纹线与电弧核心的颜色" },
  { name: "glowColor", type: "string", default: '"#ad6dff"', description: "光晕、护套与体内辉光的颜色" },
  { name: "scale", type: "number", default: "0.7", description: "标志占短边的比例" },
  { name: "intensity", type: "number", default: "1", description: "整体亮度增益" },
  { name: "glow", type: "number", default: "1", description: "光晕与护套强度" },
  { name: "thickness", type: "number", default: "1.5", description: "波纹线与电弧的线宽" },
  { name: "strands", type: "number", default: "4", description: "沿轮廓游动的波纹线数量 1–6，受热临时加到最多" },
  { name: "bend", type: "number", default: "0.6", description: "大尺度缓弯与涟漪幅度" },
  { name: "crackle", type: "number", default: "1.5", description: "高频锯齿抖动强度" },
  { name: "arcs", type: "number", default: "1", description: "随机电弧生成频率倍率，0 关闭" },
  { name: "flicker", type: "number", default: "0.6", description: "整体亮度的呼吸明灭" },
  { name: "fill", type: "number", default: "0", description: "内部辉光量，0 保持纯轮廓" },
  { name: "speed", type: "number", default: "2.5", description: "噪声与电弧时钟速率" },
  { name: "interactive", type: "boolean", default: "true", description: "开启指针加热、指针处生成电弧与点击脉冲" },
  { name: "cursorIntensity", type: "number", default: "0.75", description: "悬停加热强度 0–1" },
  { name: "cursorRadius", type: "number", default: "100", description: "指针加热衰减半径（px）" },
  { name: "theme", type: '"dark" | "light"', default: '"dark"', description: "深色为加法发光；浅色转为纸面减色墨水" },
  { name: "onRender", type: "(canvas) => void", default: "—", description: "每帧渲染后回调，传入 canvas" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
];

export default {
  id: "electric-logo",
  name: "闪电标志",
  href: "electric-logo.html",
  title: "闪电标志",
  description:
    "把任意扁平标志描摹成带符号距离场再通电：最多 6 条梯度噪声波纹沿轮廓游动、弓形锯齿电弧在边缘两点间跳跃、双半径光晕在形状外晕开；悬停加热附近区域，点击打出冲击波脉冲、真实扭曲轮廓并迸出火花，换图时旧轮廓沸腾变形为新轮廓。CPU 侧精确欧氏距离变换 + 紧/宽双光晕纹理，单趟 WebGL2 加法渲染，浅色主题转减色墨水。",
  tags: ["React", "WebGL", "图形"],

  cardDescription: "标志轮廓化作游动的闪电，点击冲击波真实扭曲线条。",

  demoHint: "在标志上滑动看线条聚拢加热；点击打冲击波，调高波纹数与锯齿看轮廓沸腾。",

  api: API,
};
