/* Component metadata only — the live demo and gallery preview live in
   holo-card-demo.jsx, the framework source texts and the prompt in
   holo-card-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with holo-card-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "image", type: "string", default: "—", description: "正面卡面图；其原始比例决定卡片长宽比" },
  { name: "backImage", type: "string", default: "—", description: "印刷背面图；提供后卡片可点击翻面" },
  { name: "alt", type: "string", default: '""', description: "卡片的无障碍标签" },
  { name: "preset", type: '"bursts" | "stars" | "shards" | "cosmos" | "rainbow" | "swirl" | "glitter" | "gold"', default: '"bursts"', description: "全息箔纹样八选一" },
  { name: "intensity", type: "number", default: "0.85", description: "箔面强度 0–1" },
  { name: "scale", type: "number", default: "1", description: "纹样缩放倍率 0.25–4" },
  { name: "edgeSparkle", type: "number", default: "0.8", description: "闪片与白闪点强度 0–1" },
  { name: "frame", type: "number", default: "4", description: "无箔边框宽度（卡面百分比，0–20）" },
  { name: "glare", type: "number", default: "0.5", description: "中性塑料眩光强度 0–1" },
  { name: "foilColor", type: "string", default: '"#e2e6ec"', description: "箔面基色；非法值回退银色" },
  { name: "width", type: "number", default: "320", description: "卡片宽度（px）" },
  { name: "radius", type: "number", default: "14", description: "卡片圆角（px）" },
  { name: "tiltMax", type: "number", default: "14", description: "朝指针的最大倾角（度，0–45）" },
  { name: "hoverScale", type: "number", default: "1.04", description: "悬停放大倍率 0.8–1.3" },
  { name: "idle", type: "boolean", default: "true", description: "未被悬停时自发的微倾流光" },
  { name: "shadow", type: "boolean", default: "true", description: "渲染随倾角移动的模糊投影" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
];

export default {
  id: "holo-card",
  name: "全息闪卡",
  href: "holo-card.html",
  title: "全息闪卡",
  description:
    "一张真正的全息收藏卡：WebGL2 着色器把卡面当作倾斜平面，光源随指针扫过时八种箔纹（ burst 星环、星星、碎裂、星轨、彩虹、射线、闪片、鎏金）沿光谱变色，六边形闪片按半程向量闪面、白点在边框内闪烁，外加柔光与塑料眩光。卡片以 240Hz 子步弹簧朝指针倾身、悬停微放大、投影反向漂移，点击可 180° 翻到印刷背面；闲置时自发微倾流光，reduced-motion 下定格。",
  tags: ["React", "WebGL", "着色器", "CSS 3D"],

  cardDescription: "卡面是真实全息箔，倾斜时光谱流过、闪片炸光，可翻面。",

  demoHint: "移动指针看光谱随光扫过，点击卡片翻到背面；换八种箔纹试试。",

  api: API,
};
