/* Component metadata only — the live demo and gallery preview live in
   liquid-chrome-demo.jsx, the framework source texts and the prompt in
   liquid-chrome-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with liquid-chrome-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "color", type: "string | number[]", default: '"#ffffff"', description: "铬面染色；3/6 位 hex、rgb() 或 0–1 数组（转线性空间）" },
  { name: "speed", type: "number", default: "0.2", description: "褶皱行进速度，0 冻结" },
  { name: "amplitude", type: "number", default: "0.3", description: "褶皱高度，clamp 0–2" },
  { name: "frequencyX", type: "number", default: "3", description: "沿 y 的褶皱频率，下限 0.1" },
  { name: "frequencyY", type: "number", default: "3", description: "沿 x 的褶皱频率，下限 0.1" },
  { name: "detail", type: "number", default: "4", description: "扭曲层数，clamp 1–8" },
  { name: "thickness", type: "number", default: "1", description: "波峰锐度，clamp 0.25–4（越小越锐）" },
  { name: "depth", type: "number", default: "1", description: "褶皱坡度强度，下限 0" },
  { name: "roughness", type: "number", default: "0.3", description: "棚拍环境模糊，clamp 0–1" },
  { name: "exposure", type: "number", default: "1", description: "色调映射前曝光，下限 0" },
  { name: "interactive", type: "boolean", default: "true", description: "光标划水与倾转" },
  { name: "rippleStrength", type: "number", default: "1", description: "流体波动对反射的扰动强度，下限 0" },
  { name: "rippleSize", type: "number", default: "1", description: "划水波纹尺度，clamp 0.2–4" },
  { name: "tilt", type: "number", default: "1", description: "棚拍灯光随光标偏移的幅度，下限 0" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时 1.8s 褶皱淡入" },
  { name: "lightMode", type: "boolean", default: "false", description: "浅色页面棚拍变体" },
  { name: "maxDevicePixelRatio", type: "number", default: "2", description: "像素比上限，clamp 0.5–3；总像素预算 240 万" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "liquid-chrome",
  name: "液态铬波",
  href: "liquid-chrome.html",
  title: "液态铬波",
  description:
    "暗色水面上流淌的液态铬：程序化正弦场揉出的金属缎带，被一座虚拟棚拍照亮——主灯、侧条、地反、边缘光带在波峰上滑出高光，ACES 调色收尾；表面下是一张真实的波动方程流体，光标划过沿轨迹压出水痕、点击按出深坑，波动以双三次采样回灌着色器扰动反射，整块铬面还随光标带弹簧惯性地倾转，让棚灯在金属上滑动。像素预算约束 DPR，缺半浮点扩展时静默降级为纯程序波纹，空闲后帧循环自睡。",
  tags: ["React", "CSS", "WebGL", "背景"],

  cardDescription: "液态铬缎带流转，光标划水扰动反射，棚灯随动。",

  demoHint: "在铬面上划动压出水痕，点击按出深坑；染色、锐度、曝光与波纹尺度可调。",

  api: API,
};
