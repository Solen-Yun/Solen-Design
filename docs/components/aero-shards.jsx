/* Component metadata only — the live demo and gallery preview live in
   aero-shards-demo.jsx, the framework source texts and the prompt in
   aero-shards-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with aero-shards-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "shardColor", type: "string", default: '"#896ABD"', description: "玻璃碎片的基础体色" },
  { name: "accentColor", type: "string", default: '"#A855F7"', description: "高光、辉光与测点使用的强调色" },
  { name: "backgroundColor", type: "string", default: '"transparent"', description: "场景底色；transparent 保持透明背景" },
  { name: "lightMode", type: "boolean", default: "false", description: "亮色摄影棚观感，替换默认暗色玻璃" },
  { name: "placement", type: '"full" | "left" | "right" | "center"', default: '"full"', description: "丝带布局；切换时以弹簧混合过渡" },
  { name: "material", type: '"glass" | "chrome"', default: '"glass"', description: "碎片材质：折射玻璃/镜面镀铬" },
  { name: "count", type: "number", default: "1300", description: "碎片数量，clamp 100–6000" },
  { name: "shardSize", type: "number", default: "1", description: "碎片尺寸倍率 0.2–4" },
  { name: "spread", type: "number", default: "1", description: "丝带宽度/横向散布 0–3" },
  { name: "twist", type: "number", default: "1", description: "碎片绕路径轴的自转 0–3" },
  { name: "billow", type: "number", default: "1", description: "沿丝带的波浪起伏与摆动 0–3" },
  { name: "speed", type: "number", default: "1", description: "流速倍率 0–4" },
  { name: "scale", type: "number", default: "1", description: "相机焦距倍率 0.4–2.5" },
  { name: "depthOfField", type: "number", default: "0.75", description: "失焦层级的景深模糊 0–1" },
  { name: "glow", type: "number", default: "0.35", description: "辉光强度 0–2" },
  { name: "grain", type: "number", default: "0.06", description: "胶片颗粒 0–0.5" },
  { name: "vignette", type: "number", default: "0.3", description: "边缘暗角 0–1" },
  { name: "intro", type: "boolean", default: "true", description: "播放 3.4 秒分层入场的丝带动画" },
  { name: "mouseInteraction", type: "boolean", default: "true", description: "悬停拨动、相机倾斜与按压效果的总开关" },
  { name: "mouseStrength", type: "number", default: "0.6", description: "悬停拨动力度 0–1" },
  { name: "markers", type: '"plus" | "dots"', default: '"plus"', description: "测标样式；其他值隐藏测标" },
  { name: "pulseOnClick", type: "boolean", default: "true", description: "短按点击发出扩散冲击波环" },
  { name: "holdToGather", type: "boolean", default: "true", description: "长按把附近碎片聚成环绕星团，松手甩出" },
  { name: "parallax", type: "number", default: "0.5", description: "相机跟随指针的倾斜量 0–1" },
  { name: "paused", type: "boolean", default: "false", description: "冻结流动（交互仍会结算）" },
  { name: "dpr", type: "number", default: "2", description: "设备像素比上限，≥ 0.5" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
  { name: "onError", type: "(error: Error) => void", default: "—", description: "WebGPU 不可用或设备出错时回调" },
];

export default {
  id: "aero-shards",
  name: "航标玻璃丝带",
  href: "aero-shards.html",
  title: "航标玻璃丝带",
  description:
    "WebGPU 渲染的五条玻璃丝带：上千片带倒角的棱柱碎片沿五个深度层流动，逐片解析光线求交做玻璃折射（三次内部反弹 + 吸收）或镜面镀铬，景深分层模糊、四级辉光、颗粒与暗角收尾；测标点阵沿丝带漂移、随机闪烁并框出离指针最近的点；悬停拨开碎片，点击发出冲击波环，长把附近碎片聚成环绕星团松手甩出；四种布局以弹簧混合切换，WebGPU 缺失时回调 onError。",
  tags: ["React", "CSS", "WebGPU", "图形"],

  cardDescription: "千片玻璃棱镜沿五条深度丝带流动，边缘折着工作室的光。",

  demoHint: "短按甩出冲击波环，长按聚拢碎片星团再松手甩出；切换四种丝带布局与玻璃/镀铬材质。",

  api: API,
};
