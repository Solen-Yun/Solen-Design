/* Component metadata only — the live demo and gallery preview live in
   profile-card-demo.jsx, the framework source texts and the prompt in
   profile-card-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with profile-card-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "avatarUrl", type: "string", default: '""', description: "主照片（底部对齐 cover 裁切）；留空则只渲染箔面叠在底色上" },
  { name: "iconUrl", type: "string", default: "—", description: "全息箔透出的平铺花纹图；深色主题下同时点亮辉光与差值子层" },
  { name: "miniAvatarUrl", type: "string", default: "—", description: "页脚的小圆头像" },
  { name: "name", type: "string", default: '"Javi A. Torres"', description: "照片底部渐变上的姓名行" },
  { name: "title", type: "string", default: '"Software Engineer"', description: "姓名下的职位行" },
  { name: "handle", type: "string", default: '"javicodes"', description: "页脚 @handle，超长省略" },
  { name: "status", type: "string", default: '"Online"', description: "页脚状态文字，前置彩色圆点" },
  { name: "statusColor", type: "string", default: '"#22c55e"', description: "状态圆点颜色" },
  { name: "contactText", type: "string", default: '"Contact"', description: "联系按钮文案；留空隐藏按钮" },
  { name: "showUserInfo", type: "boolean", default: "true", description: "渲染页脚整行" },
  { name: "onContactClick", type: "(event) => void", default: "—", description: "联系按钮点击回调" },
  { name: "theme", type: '"dark" | "light"', default: '"dark"', description: "外框/底板/文字主题及默认箔面色调" },
  { name: "backdropColor", type: "string", default: "—", description: "重涂底板颜色；箔面色调随其明度自动选择" },
  { name: "radius", type: "number", default: "16", description: "底板圆角（px），外框再加 10px" },
  { name: "holo", type: "number", default: "0.8", description: "全息箔强度 0–1" },
  { name: "glare", type: "number", default: "0.5", description: "眩光与阴影强度 0–1" },
  { name: "enableTilt", type: "boolean", default: "true", description: "启用朝指针的 3D 倾斜" },
  { name: "tiltStrength", type: "number", default: "12", description: "最大倾角（度）" },
  { name: "parallax", type: "number", default: "8", description: "照片反向位移深度（px）" },
  { name: "enableMobileTilt", type: "boolean", default: "false", description: "点击授权后用陀螺仪驱动倾斜" },
  { name: "mobileTiltSensitivity", type: "number", default: "5", description: "陀螺仪倾斜增益" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时从倾斜姿态缓摆回正的入场" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
];

export default {
  id: "profile-card",
  name: "全息图案资料卡",
  href: "profile-card.html",
  title: "全息图案资料卡",
  description:
    "一张会朝指针倾身的带框资料卡：外框毛玻璃卡体做 3D 倾斜，卡内照片反向视差浮动，彩虹光谱与 −45° 箔条组成的全息层透过平铺花纹显影（color-dodge/multiply 双主题混合，亮度随悬停渐亮），眩光跟随光源、阴影反向加深；页脚有头像、@handle、状态点和联系按钮。可整体换底色并按明度自动选箔面色调，挂载时自带缓摆入场的 intro，移动端点击授权后可用陀螺仪驱动倾斜，reduced-motion 保留光泽但取消倾斜。",
  tags: ["React", "CSS", "全息效果", "倾斜视差"],

  cardDescription: "卡体随指针倾身，全息箔透过花纹显影、照片反向浮动。",

  demoHint: "移动指针看卡体倾身与箔面流动，换底色看全息变调，开关倾斜对比。",

  api: API,
};
