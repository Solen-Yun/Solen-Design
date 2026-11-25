/* Component metadata only — the live demo and gallery preview live in
   pixel-blast-demo.jsx, the framework source texts and the prompt in
   pixel-blast-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with pixel-blast-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "variant", type: '"square" | "circle" | "triangle" | "diamond" | "cross" | "ring"', default: '"square"', description: "像素剪影形状" },
  { name: "pixelSize", type: "number", default: "3", description: "像素基础尺寸倍率（每格 = 8 × 该值），≥ 0.5" },
  { name: "color", type: "string", default: '"#B497CF"', description: "像素基础颜色（hex）" },
  { name: "accentColor", type: "string", default: "—", description: "高密/发热像素的高亮颜色；留空回退 color" },
  { name: "patternScale", type: "number", default: "2", description: "fbm 噪声的空间频率" },
  { name: "patternDensity", type: "number", default: "1", description: "密度偏置，在基础场上 ±0.3" },
  { name: "pixelSizeJitter", type: "number", default: "0", description: "逐像素大小抖动 0–1" },
  { name: "enableRipples", type: "boolean", default: "true", description: "点击/自动涟漪圆环" },
  { name: "rippleIntensityScale", type: "number", default: "1", description: "涟漪亮度倍率" },
  { name: "rippleThickness", type: "number", default: "0.1", description: "涟漪环宽，≥ 0.001" },
  { name: "rippleSpeed", type: "number", default: "0.3", description: "涟漪扩散速度" },
  { name: "autoPauseOffscreen", type: "boolean", default: "true", description: "离屏时彻底停掉帧循环" },
  { name: "speed", type: "number", default: "0.5", description: "图案演化的时间倍率" },
  { name: "transparent", type: "boolean", default: "true", description: "透明画布 + 预乘光雾；false 则合成到黑/白纸面" },
  { name: "edgeFade", type: "number", default: "0.5", description: "四边羽化带 0–1" },
  { name: "noiseAmount", type: "number", default: "0", description: "逐帧亮度颗粒 ≥ 0" },
  { name: "softness", type: "number", default: "0.6", description: "抖动边缘柔度 0–1；0 是硬 Bayer 切割" },
  { name: "smoothing", type: "number", default: "1", description: "密度场双线性平滑 0–1；越低格子感越重" },
  { name: "glow", type: "number", default: "0.4", description: "密集区域外围光雾 0–2" },
  { name: "twinkle", type: "number", default: "0.25", description: "逐像素闪烁深度 0–1" },
  { name: "drift", type: "number", default: "0.2", description: "图案漂移速度 ≥ 0" },
  { name: "driftAngle", type: "number", default: "30", description: "漂移方向（度）" },
  { name: "hoverEffect", type: '"none" | "grow" | "reveal"', default: '"reveal"', description: "指针响应：仅提亮、鼓胀像素或真正画出密度" },
  { name: "hoverRadius", type: "number", default: "140", description: "指针笔刷半径（px），≥ 10" },
  { name: "autoRipple", type: "number", default: "0", description: "自动涟漪间隔秒数（0 关闭）" },
  { name: "tiltX", type: "number", default: "0", description: "绕 x 轴的透视倾角 −70–70°" },
  { name: "tiltY", type: "number", default: "0", description: "绕 y 轴的透视倾角 −70–70°" },
  { name: "intro", type: "boolean", default: "true", description: "1.8 秒角部擦入 + 扩张圆环开场" },
  { name: "variation", type: "number", default: "—", description: "图案时间偏移的种子；不传则随机" },
  { name: "lightMode", type: "boolean", default: "false", description: "白纸渲染，热像素转深色" },
  { name: "dpr", type: "number", default: "—", description: "覆盖画布 DPR（封顶 2）" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "pixel-blast",
  name: "像素星云",
  href: "pixel-blast.html",
  title: "像素星云",
  description:
    "抖动像素组成的星云：5 阶值噪声 fbm 密度场经 8×8 Bayer 有序抖动切成像素（square/circle/triangle/diamond/cross/ring 六种剪影，导数抗锯齿），双 pass RGBA8 乒乓单元纹理以 16 位打包密度并携带平滑与尾迹通道；点击打出指数衰减的扩张涟漪环（10 槽位），指针笔刷点亮像素——reveal 模式真正把密度画进云里再 0.45s 衰减；twinkle 逐像素闪烁、glow 外围光雾、drift 沿角度漂移、tilt 把整场铺上透视斜面并按屏幅 LOD 塌缩远处像素；lightMode 白纸渲染、smoothing 调格子感；静止 1.5 秒自睡，离屏可全停。",
  tags: ["React", "CSS", "WebGL", "像素"],

  cardDescription: "Bayer 抖动的像素星云，点击打涟漪，指针画出云洞。",

  demoHint: "在云里移动指针看它画出并吞掉像素，点击打涟漪环；换 triangle/diamond 形状，tiltX 配透视斜面。",

  api: API,
};
