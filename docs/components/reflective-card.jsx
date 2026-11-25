/* Component metadata only — the live demo and gallery preview live in
   reflective-card-demo.jsx, the framework source texts and the prompt in
   reflective-card-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with reflective-card-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "name", type: "string", default: '"Alexander Doe"', description: "默认布局的持卡人姓名" },
  { name: "role", type: "string", default: '"Senior Developer"', description: "姓名下的身份行" },
  { name: "badge", type: "string", default: '"Verified"', description: "左上角带图标徽章的文字" },
  { name: "status", type: "string", default: '"Active"', description: "右上角状态文字" },
  { name: "statusColor", type: "string", default: '"#22c55e"', description: "状态圆点颜色" },
  { name: "idLabel", type: "string", default: '"ID number"', description: "底部编号标签" },
  { name: "idValue", type: "string", default: '"8901 2345 6789"', description: "底部编号，等宽字体" },
  { name: "children", type: "ReactNode", default: "—", description: "替换整张卡的默认内容" },
  { name: "theme", type: '"dark" | "light"', default: '"dark"', description: "卡面排版与金属底色的明暗主题" },
  { name: "videoSrc", type: "string", default: "—", description: "被金属面反射的循环视频地址" },
  { name: "webcam", type: "boolean", default: "false", description: "反射用户摄像头（会请求权限）" },
  { name: "onWebcamError", type: "(error: Error) => void", default: "—", description: "摄像头不可用或被拒绝时回调" },
  { name: "tint", type: "string", default: '"#ffffff"', description: "金属染色（hex / rgb）" },
  { name: "metalness", type: "number", default: "1", description: "铬面与拉丝合金的混合 0–1" },
  { name: "roughness", type: "number", default: "0.3", description: "表面粗糙度 0–1：反射更糊、纹理更重" },
  { name: "blurStrength", type: "number", default: "6", description: "反射模糊强度 0–40" },
  { name: "grayscale", type: "number", default: "1", description: "反射画面的去饱和度 0–1" },
  { name: "warp", type: "number", default: "0.6", description: "表面法线的涟漪扭曲 0–2" },
  { name: "warpScale", type: "number", default: "1", description: "涟漪的尺寸缩放 0.2–4" },
  { name: "shine", type: "number", default: "1", description: "影棚高光强度 0–3" },
  { name: "bevel", type: "number", default: "3", description: "倒角宽度（px），0–16" },
  { name: "glare", type: "number", default: "0.5", description: "指针眩光强度 0–1" },
  { name: "enableTilt", type: "boolean", default: "true", description: "指针驱动的卡片倾斜" },
  { name: "tiltStrength", type: "number", default: "12", description: "最大倾斜角（deg），0–30" },
  { name: "intro", type: "boolean", default: "true", description: "抬升落定的入场动画" },
  { name: "width", type: "number | string", default: "320", description: "卡片宽度" },
  { name: "height", type: "number | string", default: "500", description: "卡片高度" },
  { name: "radius", type: "number", default: "24", description: "圆角（px），同时驱动内边距与指纹砖圆角" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
];

export default {
  id: "reflective-card",
  name: "镜面金属证件卡",
  href: "reflective-card.html",
  title: "镜面金属证件卡",
  description:
    "WebGL2 渲染的金属证件卡：卡面是一块带倒角和拉丝纹理的金属板，实时反射一段循环视频或用户摄像头（都没有时回退程序化影棚反光）；指针倾斜带动反射偏摆，圆形 SDF 抗锯齿圆角、倒角处抓边光，噪点涟漪扭曲镜面；默认排版是证件样式（徽章、状态点、姓名/身份、编号、指纹砖），children 可整体替换，深浅两套主题，入场抬升落定。",
  tags: ["React", "CSS", "WebGL"],

  cardDescription: "金属卡面实时反射视频或摄像头，倾斜时反光跟着摆。",

  demoHint: "在卡面上移动指针看反射偏摆；调粗糙度、倒角与涟漪重塑金属质感；开摄像头看自己出现在卡面上。",

  api: API,
};
