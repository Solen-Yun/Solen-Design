/* Component metadata only — the live demo and gallery preview live in
   gradient-blinds-demo.jsx, the framework source texts and the prompt in
   gradient-blinds-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with gradient-blinds-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "gradientColors", type: "string[]", default: '["#FF9FFC", "#5227FF"]', description: "每片百叶横向渐变的十六进制色标，最多 8 个" },
  { name: "angle", type: "number", default: "0", description: "整面百叶墙的旋转角（度）" },
  { name: "noise", type: "number", default: "0.3", description: "0–2：动态胶片颗粒强度" },
  { name: "blindCount", type: "number", default: "16", description: "叶片数量（≥ 1）" },
  { name: "blindMinWidth", type: "number", default: "60", description: "叶片最小宽度（px），数量会自动收缩以满足它" },
  { name: "mouseDampening", type: "number", default: "0.15", description: "光源弹簧的阻尼尺度（秒）；0 为即时跟随" },
  { name: "mirrorGradient", type: "boolean", default: "false", description: "渐变绕每片叶子中心镜像" },
  { name: "spotlightRadius", type: "number", default: "0.5", description: "聚光灯半径（相对视口）" },
  { name: "spotlightSoftness", type: "number", default: "1", description: "聚光灯边缘衰减指数" },
  { name: "spotlightOpacity", type: "number", default: "1", description: "聚光灯峰值亮度" },
  { name: "distortAmount", type: "number", default: "0", description: "整面墙的交叉正弦扭曲量" },
  { name: "shineDirection", type: '"left" | "right"', default: '"left"', description: "叶片高光条贴在哪一侧边缘" },
  { name: "lightColor", type: "string", default: '"#ffffff"', description: "聚光灯的十六进制颜色" },
  { name: "perspective", type: "number", default: "0", description: "-1–1：叶距的指数式透视扇形" },
  { name: "gradientSpeed", type: "number", default: "0", description: "渐变在叶片间流动的速度" },
  { name: "shine", type: "number", default: "0.4", description: "0–2：边缘高光条强度" },
  { name: "relief", type: "number", default: "0.5", description: "0–1：叶片受光侧的折痕高光" },
  { name: "glow", type: "number", default: "0.4", description: "0–2：聚光灯下渐变冒出的雾光" },
  { name: "sway", type: "number", default: "0.35", description: "0–1：静息时叶片的摇摆幅度" },
  { name: "speed", type: "number", default: "1", description: "0–4：摇摆、漂移与渐变流动的总时钟" },
  { name: "hoverTilt", type: "number", default: "0.6", description: "0–1.5：叶片朝光标灯光倾斜的程度" },
  { name: "clickEffect", type: "string", default: '"ripple"', description: "设为 ripple 启用点击波纹；其他值关闭" },
  { name: "idle", type: '"drift" | "center"', default: '"drift"', description: "指针离开后光源的去处：缓慢游走 / 停在中央" },
  { name: "intro", type: "boolean", default: "true", description: "播放 1.8 秒的叶片立起入场" },
  { name: "mixBlendMode", type: "string", default: '"lighten"', description: "非 lightMode 时容器的混合模式" },
  { name: "lightMode", type: "boolean", default: "false", description: "白纸墨痕渲染；同时移除容器混合模式" },
  { name: "paused", type: "boolean", default: "false", description: "冻结动画时钟但保持渲染" },
  { name: "dpr", type: "number", default: "—", description: "覆盖设备像素比（上限 2）" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "gradient-blinds",
  name: "百叶聚光",
  href: "gradient-blinds.html",
  title: "百叶聚光",
  description:
    "一面竖直渐变百叶墙被跟随光标的聚光灯照亮：叶片朝灯光倾斜、边缘带缎面高光，点击激起横扫叶片的波纹；渐变逐片采样最多 8 个色标，可镜像、流动、扇形透视与扭曲，光源以阻尼弹簧跟随、指针离开后按 idle 缓慢游走或停在中央，另有 24fps 颗粒、白纸墨痕主题与 lighten 混合模式；单片段着色器实现。",
  tags: ["React", "CSS", "WebGL"],

  cardDescription: "聚光灯跟着光标扫过渐变百叶墙，叶片朝光倾斜、点击起波。",

  demoHint: "移动鼠标让灯光与叶片跟随；点击放一道横扫的波纹；调 blindCount、perspective 看疏密与透视。",

  api: API,
};
