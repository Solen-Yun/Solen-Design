/* Component metadata only — the live demo and gallery preview live in
   silk-demo.jsx, the framework source texts and the prompt in
   silk-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with silk-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "speed", type: "number", default: "5", description: "褶皱流动速度，0 冻结" },
  { name: "scale", type: "number", default: "1", description: "织纹缩放，越大褶皱越密" },
  { name: "color", type: "string", default: '"#7B7481"', description: "缎面基色，任意 CSS 颜色字符串" },
  { name: "sheenColor", type: "string", default: '"#ffffff"', description: "高光颜色" },
  { name: "noiseIntensity", type: "number", default: "1.5", description: "胶片颗粒强度，下限 0" },
  { name: "rotation", type: "number", default: "0", description: "织纹旋转角（弧度）" },
  { name: "sheen", type: "number", default: "0.5", description: "高光强度，下限 0" },
  { name: "depth", type: "number", default: "0.5", description: "褶皱浮雕对比度，clamp 0–1" },
  { name: "glow", type: "number", default: "0.3", description: "亮褶的辉光强度，0 跳过辉光通道" },
  { name: "ripple", type: "number", default: "1", description: "细密二次波纹强度，下限 0" },
  { name: "wave", type: "number", default: "1", description: "横向起伏强度，下限 0" },
  { name: "variation", type: "number", default: "0", description: "确定性重织种子；只换褶皱布局不改质感" },
  { name: "mouseInteraction", type: "boolean", default: "true", description: "光源转向光标，快速移动拖曳织纹" },
  { name: "interactionStrength", type: "number", default: "1", description: "光标触感与拖曳幅度，下限 0" },
  { name: "clickRipple", type: "boolean", default: "true", description: "点击发出扩散扭曲环（最多同时 4 个）" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时褶皱从压缩状态绽放并淡入（2.2s）" },
  { name: "fade", type: "number", default: "0", description: "边缘 smootherstep 渐隐，0–1" },
  { name: "lightMode", type: "boolean", default: "false", description: "浅色模式：缎面印成彩墨，适合浅色页面" },
  { name: "paused", type: "boolean", default: "false", description: "冻结流动但保留交互" },
  { name: "dpr", type: "number", default: "devicePixelRatio", description: "画布像素比覆盖，clamp 至 2" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "silk",
  name: "缎面褶光",
  href: "silk.html",
  title: "缎面褶光",
  description:
    "满幅流动的缎面褶皱：斜向亮脊与暗谷像布料一样漂移，光源随光标转向让高光滑过褶面，快速移动会轻微拖曳织纹，点击发出扭曲褶皱的扩散环。暗底缎面带颗粒与辉光，浅色模式印成彩墨；褶皱由对角正弦叠波生成、法线浮雕着色，帧循环空闲自睡。",
  tags: ["React", "WebGL", "CSS", "背景"],

  cardDescription: "流动缎面上高光滑过，光标转向光源，点击泛起褶皱涟漪。",

  demoHint: "移动光标看高光转向，快速划动看织纹被拖曳，点击发出扩散环；褶皱深度、高光与辉光可调。",

  api: API,
};
