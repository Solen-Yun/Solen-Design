/* Component metadata only — the live demo and gallery preview live in
   halftone-reveal-demo.jsx, the framework source texts and the prompt in
   halftone-reveal-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with halftone-reveal-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "src", type: "string", default: "内置风景照", description: "要印成网点半调的图片地址，任意可用 crossOrigin 匿名加载的 URL 或 data URI" },
  { name: "fit", type: '"cover" | "contain"', default: '"cover"', description: "照片在画布中的填充方式" },
  { name: "mode", type: '"mono" | "duotone" | "color"', default: '"mono"', description: "印刷模式：单版 / 墨+强调色双版 / 浅纸 CMYK 四色或深纸加色 RGB" },
  { name: "shape", type: '"dot" | "ellipse" | "square" | "diamond" | "line" | "cross"', default: '"dot"', description: "网点单元形状" },
  { name: "cellSize", type: "number", default: "6", description: "网屏格子尺寸（px）2–80" },
  { name: "angle", type: "number", default: "45", description: "网屏旋转角度（度）" },
  { name: "dotScale", type: "number", default: "1", description: "网点整体大小倍率 0.2–2" },
  { name: "inkColor", type: "string", default: '"#120f17"', description: "主墨色" },
  { name: "accentColor", type: "string", default: '"#ff4f2a"', description: "双色调模式的第二墨色" },
  { name: "paperColor", type: "string", default: '"#ffffff"', description: "纸面颜色；明度低于 0.5 切换深纸印刷路径" },
  { name: "contrast", type: "number", default: "1.1", description: "围绕中灰的对比斜率" },
  { name: "brightness", type: "number", default: "0", description: "对比之后的亮度偏移" },
  { name: "invert", type: "boolean", default: "false", description: "反转色调，暗部印浅" },
  { name: "roughness", type: "number", default: "0", description: "网点的噪声抖动 0–1" },
  { name: "misregistration", type: "number", default: "0", description: "副版套印错位的漂移量 0–1" },
  { name: "revealRadius", type: "number", default: "160", description: "指针显影半径（px）" },
  { name: "softness", type: "number", default: "0.6", description: "笔刷软边占半径比例 0–1" },
  { name: "linger", type: "number", default: "1.2", description: "显影格子织回秒数；0 立即闭合" },
  { name: "reverse", type: "boolean", default: "false", description: "反转显影：光标改为把半调印回照片" },
  { name: "wander", type: "boolean", default: "false", description: "指针离开时显影点自行游走" },
  { name: "clickBurst", type: "boolean", default: "true", description: "点击触发扩张冲击波环" },
  { name: "intro", type: "boolean", default: "true", description: "播放 1.4 秒自中心逐格成长的开场" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
];

export default {
  id: "halftone-reveal",
  name: "半调网点显影",
  href: "halftone-reveal.html",
  title: "半调网点显影",
  description:
    "一张照片被重印成旋转网屏的半调：圆/椭圆/方/菱/线/叉六种网点按色调生长，单版墨、双版墨加强调色，或完整四色工艺——浅纸走 CMYK 牛顿迭代分色、深纸走加色 RGB；套印错位让副版漂移出老印刷的味道。指针划过软边轨迹把网点烧穿露出真实照片并按 linger 秒织回，点击掀起冲击波环，开场网点自中心逐格成长。半分辨率掩膜双缓冲 + 单趟印刷渲染。",
  tags: ["React", "WebGL", "图形"],

  cardDescription: "照片印成半调网点，指针烧穿处显影出真实色彩。",

  demoHint: "划过画面看照片显影；切到四色模式并拉高套印错位看老印刷质感，点按画面掀冲击波。",

  api: API,
};
