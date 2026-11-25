/* Component metadata only — the live demo and gallery preview live in
   gradient-waves-demo.jsx, the framework source texts and the prompt in
   gradient-waves-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with gradient-waves-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "horizonColor", type: "string", default: '"#5227FF"', description: "雾气与地平线颜色（任意 CSS 颜色）" },
  { name: "waveColor", type: "string", default: '"#FF9FFC"', description: "波浪缎面的基础色" },
  { name: "crestColor", type: "string", default: '"#FFFFFF"', description: "浪尖与高光混入的颜色" },
  { name: "backgroundColor", type: "string", default: '"transparent"', description: "水面背后的不透明底色；transparent 保持透出页面" },
  { name: "lightMode", type: "boolean", default: "false", description: "白纸墨色：浪影以墨色浓淡印在浅底上" },
  { name: "speed", type: "number", default: "0.4", description: "海浪动画速度；0 冻结海面" },
  { name: "amplitude", type: "number", default: "2.5", description: "浪高，≥ 0" },
  { name: "waveScale", type: "number", default: "0.6", description: "波浪空间频率，≥ 0.01" },
  { name: "waveRatio", type: "number", default: "0.9", description: "横向波频比例，≥ 0.01" },
  { name: "swell", type: "number", default: "35", description: "长波列的弯曲量" },
  { name: "turbulence", type: "number", default: "20", description: "横向碎浪与扭转" },
  { name: "tilt", type: "number", default: "64", description: "相机俯角（度），10–85" },
  { name: "zoom", type: "number", default: "1", description: "变焦（越大视场越窄），≥ 0.05" },
  { name: "height", type: "number", default: "5.5", description: "海面静息高度" },
  { name: "fogDepth", type: "number", default: "15", description: "地平线雾气的距离尺度，≥ 0.5" },
  { name: "relief", type: "number", default: "1", description: "0–1：坡面光照（法线明暗 + 高光）强度" },
  { name: "lightAngle", type: "number", default: "120", description: "太阳方位角（度）；指针会实时牵引它" },
  { name: "sheen", type: "number", default: "0", description: "浪坡上的镜面闪光强度" },
  { name: "brightness", type: "number", default: "1", description: "输出倍率，≥ 0" },
  { name: "opacity", type: "number", default: "1", description: "0–1：画布整体透明度" },
  { name: "grain", type: "number | boolean", default: "0.2", description: "胶片颗粒强度；true 等于 0.05" },
  { name: "quality", type: '"low" | "medium" | "high"', default: '"medium"', description: "光线步进预算：56 / 84 / 120 步" },
  { name: "intro", type: "boolean", default: "true", description: "播放 2.6 秒的浪涛成形入场" },
  { name: "mouseInteraction", type: "boolean", default: "true", description: "开启视差视角与太阳牵引" },
  { name: "parallaxStrength", type: "number", default: "0.5", description: "≥ 0：视线跟随指针的幅度" },
  { name: "mouseStrength", type: "number", default: "0.6", description: "0–1：指针牵引太阳的强度" },
  { name: "swellOnClick", type: "boolean", default: "true", description: "点击处隆起一道向镜头滚来的浪" },
  { name: "paused", type: "boolean", default: "false", description: "冻结海面但保持渲染" },
  { name: "dpr", type: "number", default: "2", description: "画布像素比上限（≥ 0.5，与设备比取小）" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "gradient-waves",
  name: "缎面光浪",
  href: "gradient-waves.html",
  title: "缎面光浪",
  description:
    "单遍 WebGL2 光线步进的海洋：被雾气吞没的地平线外一道道受光缎浪滚向镜头，浪体由 horizon/wave/crest 三色着色、坡面法线打光；指针以视差牵引视线并拖动太阳方位，点击处隆起一道朝镜头滚来的浪（最多 4 道并存）；入场时浪涛从远处平面渐渐成形，另有白纸墨色主题、不透明底色、颗粒与三档步进质量。",
  tags: ["React", "CSS", "WebGL"],

  cardDescription: "雾中地平线外滚来受光的缎面浪，点击处隆起一道扑向镜头的浪。",

  demoHint: "移动鼠标牵引太阳与视线；点击海面放一道滚来的浪；调 tilt/zoom 换机位，lightMode 看墨色版。",

  api: API,
};
