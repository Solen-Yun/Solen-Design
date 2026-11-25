/* Component metadata only — the live demo and gallery preview live in
   sliced-waves-demo.jsx, the framework source texts and the prompt in
   sliced-waves-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with sliced-waves-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "color1", type: "string", default: '"#ffd9a8"', description: "三色调色板的暖端色" },
  { name: "color2", type: "string", default: '"#ff5fa2"', description: "三色调色板的中间色" },
  { name: "color3", type: "string", default: '"#5b8cff"', description: "三色调色板的冷端色" },
  { name: "ribbons", type: "number", default: "3", description: "每个格位纵向叠几条光带，clamp 1–6" },
  { name: "spacing", type: "number", default: "28", description: "光带间距（px），clamp 4–200" },
  { name: "barWidth", type: "number", default: "0.5", description: "光带宽度占格距比例，clamp 0.05–1" },
  { name: "ribbonHeight", type: "number", default: "0.26", description: "光带厚度，占半屏高的比例" },
  { name: "spread", type: "number", default: "0.1", description: "叠层之间的纵向散布，占屏高比例" },
  { name: "amplitude", type: "number", default: "0.1", description: "波浪振幅，占屏高比例" },
  { name: "frequency", type: "number", default: "1", description: "波浪沿场的疏密" },
  { name: "speed", type: "number", default: "1", description: "波浪速度，0 冻结" },
  { name: "perspective", type: "number", default: "0.45", description: "光带阵列的偏航倾斜，0–1" },
  { name: "curve", type: "number", default: "0.5", description: "光带弯曲程度，0–1" },
  { name: "blur", type: "number", default: "0.6", description: "基础柔化与景深强度，0–2" },
  { name: "glow", type: "number", default: "1", description: "光带外围辉光强度" },
  { name: "brightness", type: "number", default: "1.25", description: "色调映射前的曝光倍数" },
  { name: "position", type: "number", default: "0.78", description: "光带行的纵向锚点，0 顶 – 1 底" },
  { name: "rotation", type: "number", default: "0", description: "整体旋转角（度）" },
  { name: "slices", type: "number", default: "0", description: "每条光带切成的段数；0 为实心光带" },
  { name: "grain", type: "number", default: "0.08", description: "合成阶段的胶片颗粒，下限 0" },
  { name: "mouseInteraction", type: "boolean", default: "true", description: "光标驱动景深对焦与提亮光晕" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时从左到右生长入场（1.5s）" },
  { name: "fade", type: "number", default: "0", description: "边缘 smootherstep 渐隐，0–1" },
  { name: "opacity", type: "number", default: "1", description: "整体不透明度，0–1" },
  { name: "lightMode", type: "boolean", default: "false", description: "浅色模式：光印成彩墨，适合浅色页面" },
  { name: "paused", type: "boolean", default: "false", description: "冻结波浪但保留对焦" },
  { name: "dpr", type: "number", default: "devicePixelRatio", description: "画布像素比覆盖，clamp 至 2，最长边 ≤ 2560" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "...rest", type: "attributes", default: "—", description: "其余属性透传到容器" },
];

export default {
  id: "sliced-waves",
  name: "切片色浪",
  href: "sliced-waves.html",
  title: "切片色浪",
  description:
    "一排透视纵深里的彩色光带：每条竖向光束沿长度扫过三色渐变，双层正弦让光带起伏，切片参数把光带切成段段发光的短条；光标把景深焦点弹到最近的光带上，其余光带随之失焦变柔，并绕指针提亮一圈光晕。HDR 加法渲染 + 色调映射，浅色模式印成彩墨。",
  tags: ["React", "WebGL", "CSS", "背景"],

  cardDescription: "透视光带涌动三色渐变，光标对焦哪条哪条清晰发亮。",

  demoHint: "左右移动光标看景深焦点在光带间弹跳、光晕提亮；切片数、间距与色板可调。",

  api: API,
};
