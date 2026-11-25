/* Component metadata only — the live demo and gallery preview live in
   glow-cursor-demo.jsx, the framework source texts and the prompt in
   glow-cursor-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with glow-cursor-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "color", type: "string", default: '"#5f8bff"', description: "热核光的颜色（任意 CSS 颜色）" },
  { name: "secondaryColor", type: "string", default: "—", description: "冷却尾焰的颜色；不设则把主色色相 +8° 自动生成" },
  { name: "intensity", type: "number", default: "1.3", description: "整体光强倍率" },
  { name: "trailWidth", type: "number", default: "3", description: "光带宽度 0.5–40" },
  { name: "linger", type: "number", default: "1.4", description: "余光消散时长 0.1–10，越大拖得越久" },
  { name: "glow", type: "number", default: "1.2", description: "柔光晕的强度；0 关闭泛光" },
  { name: "hotspot", type: "number", default: "0.8", description: "新注入处的白热核心强度" },
  { name: "followSpeed", type: "number", default: "0.6", description: "发射点追赶指针的松紧 0–1，1 为直接吸附" },
  { name: "grain", type: "number", default: "0", description: "画面上的动态颗粒 0–1" },
  { name: "clickBurst", type: "boolean", default: "true", description: "点击时炸出六道光羽" },
  { name: "quality", type: '"low" | "medium" | "high"', default: '"high"', description: "流体模拟分辨率三档" },
  { name: "theme", type: '"dark" | "light"', default: '"dark"', description: "dark 渲染发光流体，light 渲染浅色底上的墨迹" },
  { name: "blendMode", type: "string", default: "—", description: "画布混合模式；默认 dark 用 screen、light 用 normal" },
  { name: "maxDevicePixelRatio", type: "number", default: "2", description: "画布 DPR 上限" },
  { name: "enabled", type: "boolean", default: "true", description: "false 时停止注入新光，已有流体继续沉降" },
  { name: "children", type: "ReactNode", default: "—", description: "叠在画布上层的宿主内容" },
  { name: "className", type: "string", default: '""', description: "根节点附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根节点内联样式" },
];

export default {
  id: "glow-cursor",
  name: "柔光光标",
  href: "glow-cursor.html",
  title: "柔光光标",
  description:
    "从光标里淌出来的光：指针运动把染料注入一套真实的流体方程（发散度、20 步 Jacobi 压力求解、MacCormack 二阶平流），光带像彗尾一样拖出、翻卷、带着余温慢慢冷却——热核是主色、冷却是色相偏移的副色，五级泛光铺出柔晕，点击炸出六道光羽。暗色主题发可见光，亮色主题渲染成纸面墨迹；余光散尽后帧循环自睡。",
  tags: ["React", "CSS", "WebGL", "光标"],

  cardDescription: "光从光标里流出，翻卷着冷却成副色余晖，点击炸出光羽。",

  demoHint: "在面板里缓慢划动看光带翻卷冷却，快速甩动看拖尾拉长，点击炸开光羽；linger 调大看余温挂得更久。",

  api: API,
};
