/* Component metadata only — the live demo and gallery preview live in
   holo-mosaic-demo.jsx, the framework source texts and the prompt in
   holo-mosaic-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with holo-mosaic-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "color", type: "string", default: '"#120f17"', description: "瓷砖基色 / 浅色模式的纸色（任意 CSS 颜色）" },
  { name: "metalColor", type: "string", default: '"#e8ebf1"', description: "金属闪点与低色度区域的颜色" },
  { name: "spectrum", type: '"full" | "warm" | "cool" | "pearl"', default: '"full"', description: "光谱色窗口：全谱 / 暖 / 冷 / 珍珠白" },
  { name: "tileSize", type: "number", default: "1", description: "52px 基准的瓷砖尺寸倍率，0.2–6" },
  { name: "gap", type: "number", default: "0.08", description: "0–0.6：瓷砖缝隙" },
  { name: "roundness", type: "number", default: "0.15", description: "0–1：瓷砖圆角" },
  { name: "bevel", type: "number", default: "0.35", description: "0–1：边缘倒角着色" },
  { name: "rotation", type: "number", default: "0", description: "网格旋转角（度）" },
  { name: "scatter", type: "number", default: "0.3", description: "0–1：流动光谱混入逐瓷砖彩虹噪声" },
  { name: "tilt", type: "number", default: "0.35", description: "0–2：逐瓷砖法线抖动" },
  { name: "swirl", type: "number", default: "1", description: "0–5：流动光谱噪声的尺度" },
  { name: "ripple", type: "number", default: "0.6", description: "0–3：同心环调制光谱" },
  { name: "bands", type: "number", default: "1.3", description: "0.3–3：彩虹压缩度（色带数感觉）" },
  { name: "softness", type: "number", default: "0.5", description: "0–1：三束采样光的散布" },
  { name: "intensity", type: "number", default: "1.25", description: "光谱亮度，≥ 0" },
  { name: "saturation", type: "number", default: "0.1", description: "0–1.5：光谱颜色饱和度" },
  { name: "glitter", type: "number", default: "0.85", description: "0–1：闪粉密度与亮度" },
  { name: "sheen", type: "number", default: "0.8", description: "0–2：游走光点周围的光池亮度" },
  { name: "grain", type: "number", default: "0.08", description: "0–1：逐像素动态颗粒" },
  { name: "speed", type: "number", default: "0.5", description: "光漂移、涡流与波纹的总时钟；0 冻结" },
  { name: "variation", type: "number", default: "0", description: "相位/种子偏移，多个实例互不相同" },
  { name: "filter", type: '"none" | "dither" | "ascii"', default: '"none"', description: "整面墙的后处理：无 / 拜耳抖动 / 字符点阵" },
  { name: "filterSize", type: "number", default: "1", description: "滤镜块尺寸倍率，0.5–4" },
  { name: "fade", type: "number", default: "0", description: "0–1：整层边缘羽化" },
  { name: "opacity", type: "number", default: "1", description: "0–1：整体透明度" },
  { name: "intro", type: "boolean", default: "true", description: "播放 2.4 秒从中心翻出的入场" },
  { name: "mouseInteraction", type: "boolean", default: "true", description: "指针牵引光源并弯折附近瓷砖法线" },
  { name: "mouseStrength", type: "number", default: "1", description: "0–3：光标处法线弯折强度" },
  { name: "mouseRadius", type: "number", default: "0.25", description: "0.05–1：光标影响半径" },
  { name: "flipOnClick", type: "boolean", default: "true", description: "点击激起 180° 翻转波" },
  { name: "lightMode", type: "boolean", default: "false", description: "白纸墨印渲染" },
  { name: "paused", type: "boolean", default: "false", description: "冻结时钟但保持渲染" },
  { name: "dpr", type: "number", default: "—", description: "覆盖设备像素比（上限 2，最长边 2400px）" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "holo-mosaic",
  name: "全息砖墙",
  href: "holo-mosaic.html",
  title: "全息砖墙",
  description:
    "一面会分光的瓷砖墙：圆角倒角砖（52px 基准、可旋转留缝）把游走的光点撕成扫动的光谱色（解析光谱函数按三束金角错开的光采样、四种波长窗口），闪粉逐格闪烁；入场时瓷砖从中心翻涌而出，点击激起 180° 翻转波，光标弯折附近法线让光谱绕着自己折射；可切拜耳抖动或 5×5 字符点阵滤镜，白纸墨印主题，上下文丢失自动恢复。",
  tags: ["React", "CSS", "WebGL"],

  cardDescription: "全息瓷砖把游走的光撕成扫动的彩虹，点击整墙翻转、光标处折射。",

  demoHint: "移动光标看光谱绕着你折射；点击放一圈翻转波；spectrum 换暖冷窗口，filter 切字符点阵。",

  api: API,
};
