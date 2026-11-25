/* Component metadata only — the live demo and gallery preview live in
   lightfall-demo.jsx, the framework source texts and the prompt in
   lightfall-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with lightfall-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "colors", type: "string[]", default: '["#ffffff"]', description: "光瀑调色板，最多 8 色循环；任意 CSS 颜色" },
  { name: "backgroundColor", type: "string", default: '"#94a3b8"', description: "暗色模式下顶部光源辉光的染色" },
  { name: "speed", type: "number", default: "0.3", description: "彗星行进速度，0 冻结" },
  { name: "streakCount", type: "number", default: "2", description: "每环光束层数，clamp 1–16" },
  { name: "streakWidth", type: "number", default: "0.8", description: "光束宽度倍率；大于 1 时渲染双列" },
  { name: "streakLength", type: "number", default: "1", description: "尾迹长度倍率，下限 0.05" },
  { name: "glow", type: "number", default: "1", description: "整体亮度，下限 0" },
  { name: "density", type: "number", default: "0.6", description: "环向密度 0–1" },
  { name: "twinkle", type: "number", default: "0.3", description: "光束明暗闪烁幅度，0–1" },
  { name: "zoom", type: "number", default: "3", description: "镜头深入隧道的倍率，下限 0.1" },
  { name: "backgroundGlow", type: "number", default: "0.1", description: "暗色模式顶部光源辉光强度" },
  { name: "headGlow", type: "number", default: "0.6", description: "彗星头部的白热混合（暗色模式），0–1" },
  { name: "depth", type: "number", default: "0.5", description: "距离雾强度，下限 0" },
  { name: "bloom", type: "number", default: "0.35", description: "泛光光晕强度，下限 0" },
  { name: "opacity", type: "number", default: "1", description: "整体不透明度，clamp 0–1" },
  { name: "mouseInteraction", type: "boolean", default: "true", description: "开启透镜弯曲与增亮" },
  { name: "mouseStrength", type: "number", default: "0.4", description: "光标附近增亮强度，下限 0" },
  { name: "mouseRadius", type: "number", default: "0.45", description: "增亮衰减半径，下限 0.01" },
  { name: "mouseDampening", type: "number", default: "0.15", description: "增亮跟随时间常数（秒），0 为即时" },
  { name: "lens", type: "number", default: "0.5", description: "透镜放大弯曲强度，0–1" },
  { name: "holdToWarp", type: "boolean", default: "true", description: "按住把尾迹拉成冲刺光瀑" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时 2.6s 冲入式显影" },
  { name: "fade", type: "number", default: "0", description: "四边渐隐比例，clamp 0–1" },
  { name: "lightMode", type: "boolean", default: "false", description: "浅色页面墨彩输出" },
  { name: "mixBlendMode", type: "string", default: "—", description: "容器的混合模式" },
  { name: "paused", type: "boolean", default: "false", description: "冻结行进；指针缓动仍渲染" },
  { name: "dpr", type: "number", default: "devicePixelRatio", description: "渲染像素比，上限 2" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "lightfall",
  name: "光瀑隧道",
  href: "lightfall.html",
  title: "光瀑隧道",
  description:
    "一道弯管隧道向深处收束，彩色彗星沿管壁向观者扑来又奔向深处，尾迹随闪烁明灭，四层泛光把光晕揉开，顶部可挂一盏柔和光源；鼠标带起一块透镜把光束物理性折弯并局部增亮，按住画面时所有尾迹拉长、行进骤然加速，冲成一场光瀑再缓缓落回。超二次曲面求交 + 雅可比修正保证线条在缩放下不锯齿，半浮点渲染目标链与固定的 8-bit 编码回退；显影、透镜、墨彩模式、颗粒抖动齐备，空闲后帧循环自睡。",
  tags: ["React", "CSS", "WebGL", "背景"],

  cardDescription: "彩色彗星沿弯管隧道扑来，按住拉成冲刺光瀑。",

  demoHint: "移动鼠标看透镜折弯光束，按住画面冲入光瀑；流速、密度、闪烁与泛光可调。",

  api: API,
};
