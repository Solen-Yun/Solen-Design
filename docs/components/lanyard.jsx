/* Component metadata only — the live demo and gallery preview live in
   lanyard-demo.jsx, the framework source texts and the prompt in
   lanyard-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with lanyard-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "frontImage", type: "string", default: "—", description: "卡面正面的图片地址，铺在卡色之上" },
  { name: "backImage", type: "string", default: "—", description: "卡背面的图片地址；不传时复用正面图" },
  { name: "imageFit", type: '"cover" | "contain"', default: '"cover"', description: "卡面图片的填充方式" },
  { name: "cardColor", type: "string", default: '"#ffffff"', description: "卡片底色（任意 CSS 颜色），同时决定侧边颜色" },
  { name: "orientation", type: '"portrait" | "landscape"', default: '"portrait"', description: "卡片比例，竖版或横版" },
  { name: "finish", type: '"glossy" | "matte" | "holographic" | "metallic"', default: '"glossy"', description: "卡面材质；holographic 会叠加虹彩烫箔效果" },
  { name: "cornerRadius", type: "number", default: "0.3", description: "卡片圆角程度 0–1" },
  { name: "size", type: "number", default: "0.6", description: "卡片在舞台中的占比 0.15–0.9" },
  { name: "anchor", type: '"left" | "center" | "right"', default: '"center"', description: "吊绳钉在舞台的横向位置" },
  { name: "strapLength", type: "number", default: "0.5", description: "卡片上方吊绳的长度 0–1" },
  { name: "strapImage", type: "string", default: "—", description: "印在织带上的图案（旋转后沿带身铺开）" },
  { name: "strapColor", type: "string", default: '"#111111"', description: "织带底色；无图案时自动配对比色缝线" },
  { name: "strapWidth", type: "number", default: "0.65", description: "织带宽度倍率 0.4–2" },
  { name: "metal", type: '"silver" | "gold" | "graphite"', default: '"silver"', description: "金属环与夹扣的配色" },
  { name: "gravity", type: "number", default: "1", description: "重力倍率 0–3" },
  { name: "damping", type: "number", default: "0.5", description: "整体收敛快慢 0–1" },
  { name: "elasticity", type: "number", default: "0.5", description: "吊绳的弹性 0–1，拉满就是蹦极绳" },
  { name: "breeze", type: "number", default: "0.5", description: "待机时的风力摆动 0–1，0 时循环会完全休眠" },
  { name: "interactive", type: "boolean", default: "true", description: "开启拖拽、甩动与点击翻面" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时从侧面荡入的开场" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "lanyard",
  name: "工牌吊绳",
  href: "lanyard.html",
  title: "工牌吊绳",
  description:
    "一块 3D 工牌用织带挂在舞台顶端：带身是 72 段实时模拟的绳索 Ribbon，配程序生成的编织法线与缝线贴图；卡片是带槽孔、金属环的倒角挤出体，支持四种表面材质与虹彩烫箔。可以拖拽、甩出、点击翻面，绳的弹性、重力、风力全可调，能量静止后渲染循环自动休眠。",
  tags: ["React", "three.js", "WebGL", "物理模拟"],

  cardDescription: "织带吊着的 3D 工牌，能拖能甩，点一下翻面。",

  demoHint: "拖住工牌甩一圈再松手；把 elasticity 拉到 1 体验蹦极绳，点击卡片看 180° 翻面。",

  api: API,
};
