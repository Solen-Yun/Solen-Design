/* Component metadata only — the live demo and gallery preview live in
   ghost-cursor-demo.jsx, the framework source texts and the prompt in
   ghost-cursor-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with ghost-cursor-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "color", type: "string", default: '"#B497CF"', description: "烟雾颜色，支持 hex 与 rgb()/rgba()" },
  { name: "brightness", type: "number", default: "1", description: "整体发光亮度倍率" },
  { name: "size", type: "number", default: "80", description: "烟头与拖尾注入的尺寸（px）" },
  { name: "trailLength", type: "number", default: "50", description: "烟迹残留时长，1–200，越大烟雾拖得越远" },
  { name: "inertia", type: "number", default: "0.5", description: "幽灵跟随光标的迟滞 0–0.99，越大越飘" },
  { name: "turbulence", type: "number", default: "0.5", description: "卷曲噪声的翻搅强度 0–2" },
  { name: "drift", type: "number", default: "0.3", description: "烟雾上升漂移速度（以 1 为基准，px/s）" },
  { name: "detail", type: "number", default: "1", description: "噪声细节对烟雾的撕扯程度 0–1" },
  { name: "grainIntensity", type: "number", default: "0.05", description: "最终画面的胶片颗粒 0–1" },
  { name: "bloomStrength", type: "number", default: "0.6", description: "泛光强度" },
  { name: "bloomRadius", type: "number", default: "1", description: "泛光扩散范围 0–3" },
  { name: "bloomThreshold", type: "number", default: "0.025", description: "泛光拾取的亮度阈值" },
  { name: "edgeIntensity", type: "number", default: "0", description: "宿主边缘的暗角强度 0–1" },
  { name: "clickPuff", type: "boolean", default: "true", description: "点击时在烟里炸开一团外推的烟团" },
  { name: "intro", type: "boolean", default: "true", description: "首次挂载播放一段自动巡游的开场" },
  { name: "theme", type: '"dark" | "light"', default: '"dark"', description: "dark 渲染发光烟雾，light 渲染墨色烟雾" },
  { name: "mixBlendMode", type: "string", default: "—", description: "画布混合模式；默认 dark 用 screen、light 用 normal" },
  { name: "fadeDelayMs", type: "number", default: "—", description: "指针停住后开始消散的等待时间（默认 1000，触屏 500）" },
  { name: "fadeDurationMs", type: "number", default: "—", description: "消散过渡时长（默认 1500，触屏 1000）" },
  { name: "maxDevicePixelRatio", type: "number", default: "2", description: "画布 DPR 上限 0.25–3" },
  { name: "targetPixels", type: "number", default: "—", description: "着色像素预算（默认桌面 60 万，触屏 30 万）" },
  { name: "zIndex", type: "number", default: "10", description: "覆盖层的 z-index" },
  { name: "className", type: "string", default: '""', description: "根节点附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根节点内联样式" },
];

export default {
  id: "ghost-cursor",
  name: "幽魂烟雾光标",
  href: "ghost-cursor.html",
  title: "幽魂烟雾光标",
  description:
    "一团会呼吸的发光烟雾跟在光标后面：沿指针路径注入密度场，被卷曲噪声撕成絮状、缓缓上飘；停住后烟雾升腾消散，点击在烟里炸出一团外推的烟洞。WebGL2 低分辨率密度场模拟 + fbm 细节着色 + 三级泛光，暗色主题发可见光、亮色主题渲染成墨色，指针停下或离开画面后帧循环自睡。",
  tags: ["React", "CSS", "WebGL", "光标"],

  cardDescription: "发光烟雾跟着光标走，停下后升腾消散，点击炸出烟洞。",

  demoHint: "在区域内划动看烟迹卷曲上飘，停一两秒让烟升散，再点击炸出烟团；颜色、惯性与湍流可调。",

  api: API,
};
