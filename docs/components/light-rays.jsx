/* Component metadata only — the live demo and gallery preview live in
   light-rays-demo.jsx, the framework source texts and the prompt in
   light-rays-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with light-rays-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "raysOrigin", type: 'RaysOrigin', default: '"top-center"', description: "光源位置八向之一：top-left / top-center / top-right / left / right / bottom-left / bottom-center / bottom-right，未知值回退 top-center" },
  { name: "raysColor", type: "string", default: '"#ffffff"', description: "光色，3/6 位 hex 或 rgb()/rgba()，解析失败回退白" },
  { name: "raysSpeed", type: "number", default: "1", description: "光柱流动速度，0 冻结流动但保留交互" },
  { name: "lightSpread", type: "number", default: "0.5", description: "光束张角，小值收成聚光灯" },
  { name: "rayLength", type: "number", default: "3", description: "光柱延伸距离，以容器宽度计" },
  { name: "rayDensity", type: "number", default: "1", description: "光柱密度，clamp 0.1–6" },
  { name: "tilt", type: "number", default: "0", description: "整束光的偏转角（度），clamp ±90" },
  { name: "raySharpness", type: "number", default: "0.35", description: "光柱边缘锐度，0–1" },
  { name: "glow", type: "number", default: "0.6", description: "光源处辉光强度" },
  { name: "haze", type: "number", default: "0.25", description: "漂移雾霭强度，0–1" },
  { name: "atmosphere", type: "number", default: "1", description: "远离光源偏冷的空气感，0–1" },
  { name: "intensity", type: "number", default: "1", description: "整体亮度" },
  { name: "pulsating", type: "boolean", default: "false", description: "光柱缓慢呼吸明暗" },
  { name: "fadeDistance", type: "number", default: "1", description: "开始变暗的距离，以容器宽度计" },
  { name: "saturation", type: "number", default: "1", description: "光色饱和度" },
  { name: "followMouse", type: "boolean", default: "true", description: "光束转向鼠标" },
  { name: "mouseInfluence", type: "number", default: "0.1", description: "转向幅度，0–1" },
  { name: "cursorShadow", type: "boolean", default: "true", description: "光标挡光并沿光柱投下软阴影" },
  { name: "clickPulse", type: "boolean", default: "true", description: "点击发出沿光束传播的亮波，最多同时 4 条" },
  { name: "noiseAmount", type: "number", default: "0", description: "胶片颗粒，0–1" },
  { name: "distortion", type: "number", default: "0", description: "热浪式扭曲幅度" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时光束从光源向外长出（挂载时读取，后续变更不重播）" },
  { name: "lightMode", type: "boolean", default: "false", description: "浅色模式：光印成软彩墨，适合浅色页面" },
  { name: "opacity", type: "number", default: "1", description: "整体不透明度，0–1" },
  { name: "maxDevicePixelRatio", type: "number", default: "2", description: "画布渲染像素比上限，clamp 0.5–3" },
  { name: "className", type: "string", default: '""', description: "根节点附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根节点内联样式" },
];

export default {
  id: "light-rays",
  name: "体积光束",
  href: "light-rays.html",
  title: "体积光束",
  description:
    "一束体积光从容器边缘的锚点射入，光柱亮暗起伏随时间流动，漂移雾霭把柱身打碎；光束带惯性转向鼠标，光标在光束上挡出软阴影，点击发出沿光束传播的亮波。WebGL2 单程序全屏三角渲染，像素预算与 DPR 自适应，帧循环空闲自睡；暗底辉光与浅色彩墨两种输出。",
  tags: ["React", "CSS", "WebGL", "背景"],

  cardDescription: "边缘射入的体积光柱随鼠标偏转，点击泛起光波。",

  demoHint: "移动鼠标看光束偏转与光标软阴影，点击发出光波；速度、张角、辉光与雾霭可调。",

  api: API,
};
