/* Component metadata only — the live demo and gallery preview live in
   pattern-waves-demo.jsx, the framework source texts and the prompt in
   pattern-waves-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with pattern-waves-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "preset", type: '"silk" | "ocean" | "pond" | "lines" | "terminal" | "mesh"', default: '"silk"', description: "整套外观预设；未显式给定的参数继承预设值" },
  { name: "pattern", type: '"dot" | "square" | "plus" | "line" | "glyph"', default: "—", description: "半调记号形状（默认取预设）" },
  { name: "wave", type: '"silk" | "swell" | "ripple"', default: "—", description: "高度场模型（默认取预设）" },
  { name: "spacing", type: "number", default: "—", description: "网格间距（px），夹在 4–120（默认取预设）" },
  { name: "markSize", type: "number", default: "—", description: "记号在格内的缩放 0.05–1（默认取预设）" },
  { name: "depth", type: "number", default: "—", description: "光照/位移强度 0–1.5（默认取预设）" },
  { name: "light", type: "number", default: "—", description: "光源方向相对逆浪向的偏角 −90–90°（默认取预设）" },
  { name: "shine", type: "number", default: "—", description: "高光强度 0–2（默认取预设）" },
  { name: "contrast", type: "number", default: "—", description: "明暗曲线指数 0.3–3（默认取预设）" },
  { name: "speed", type: "number", default: "—", description: "波浪时间倍率（默认取预设）" },
  { name: "scale", type: "number", default: "—", description: "波浪空间尺度 0.2–5（默认取预设）；越小浪越大" },
  { name: "direction", type: "number", default: "—", description: "波浪行进方向（度，默认取预设）" },
  { name: "color", type: "string", default: '"#ffffff"', description: "记号颜色；接受任意 CSS 颜色" },
  { name: "backgroundColor", type: "string", default: '"#000000"', description: "垫在记号下的背景色" },
  { name: "opacity", type: "number", default: "1", description: "画布整体透明度 0–1" },
  { name: "fade", type: '"none" | "edges" | "center" | "bottom" | "top"', default: '"edges"', description: "图案消隐的位置" },
  { name: "fadeSize", type: "number", default: "0.5", description: "消隐带宽度 0.05–1" },
  { name: "characters", type: "string", default: '".:-=+*#%@"', description: "glyph 模式的字符密度阶梯，从稀到密" },
  { name: "interactive", type: "boolean", default: "true", description: "开启指针水波纹模拟" },
  { name: "cursorSize", type: "number", default: "50", description: "水波笔刷半径（px），夹在 8–400" },
  { name: "cursorStrength", type: "number", default: "0.6", description: "水波注入强度 0–1；0 关闭模拟" },
  { name: "intro", type: "boolean", default: "true", description: "2 秒的径向扫入与振幅爬升开场" },
  { name: "paused", type: "boolean", default: "false", description: "冻结波浪与水波模拟" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "pattern-waves",
  name: "绸缎半调纹",
  href: "pattern-waves.html",
  title: "绸缎半调纹",
  description:
    "一片被灯光照亮的半调表面，动起来像披着的绸缎：离屏场通道按每格一像素求值 {明度、alpha、高光权重、抬升}，三套波浪模型（silk 噪声弯折的长褶、swell 定向涌浪、ripple 向外衰减的圆环）驱动方向光漫反射 + 160 次幂镜面高光，记号随浪高垂直位移；dot/square/plus/line/glyph 五种记号，glyph 用字符密度阶梯图集（'.:-=+*#%@' 可换）；指针注入 8px 格的水波纹方程模拟，真实地重新打光并推移记号；明度反差时自动切换墨水/纸面路径；六套预设（silk/ocean/pond/lines/terminal/mesh）单项可覆盖；ogl 做 WebGL2 管线，450 万像素预算，静止与离屏自睡。",
  tags: ["React", "CSS", "WebGL", "ogl"],

  cardDescription: "被灯光扫亮的半调绸缎，记号随浪起伏，指针搅出水波。",

  demoHint: "拖过表面看水波推移记号并重新打光，点击打水花；换 terminal 看 ASCII 阶梯，fade 切消隐方向。",

  api: API,
};
