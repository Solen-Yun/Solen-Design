/* Component metadata only — the live demo and gallery preview live in
   warp-text-demo.jsx, the framework source texts and the prompt in
   warp-text-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with warp-text-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "text", type: "string", default: '"Bend the moment"', description: "显示的文本；\\n 强制换行" },
  { name: "color", type: "string", default: '"currentColor"', description: "文字颜色；currentColor 跟随容器的计算色，容器变色会重新栅格化" },
  { name: "warpStrength", type: "number", default: "0.08", description: "环境噪声漂移的强度" },
  { name: "warpScale", type: "number", default: "1.7", description: "环境噪声场的频率" },
  { name: "speed", type: "number", default: "0.55", description: "噪声漂移与涟漪波的时间流速" },
  { name: "pointerInfluence", type: "number", default: "0.42", description: "透镜半径（UV 单位，占块高的比例）" },
  { name: "pointerStrength", type: "number", default: "0.38", description: "透镜与涟漪弯折文字的力度" },
  { name: "refraction", type: "number", default: "0.018", description: "玻璃折射的采样错切，透镜附近与开场时最强" },
  { name: "chromatic", type: "number", default: "0", description: "七次采样的色散程度 0–1，红蓝边缘分离" },
  { name: "ripple", type: "boolean", default: "true", description: "透镜内向指针外扩散的环形波" },
  { name: "clickRipple", type: "boolean", default: "true", description: "点击激发扩散冲击波，最多 4 个并存" },
  { name: "idleDrift", type: "number", default: "0.2", description: "无悬停时虚拟透镜的游移幅度 0–1，0 则停在中心" },
  { name: "lens", type: '"bulge" | "pinch" | "swirl"', default: '"bulge"', description: "透镜行为：向外推、向内拉或绕指针旋转" },
  { name: "intro", type: "boolean", default: "true", description: "1.6s 从强扭曲折射收敛到稳态的开场" },
  { name: "fontSize", type: "string | number", default: '"clamp(3rem, 10vw, 9rem)"', description: "任意 CSS 字号，数字按 px；超出块面自动缩小适配" },
  { name: "fontWeight", type: "number", default: "800", description: "栅格化的字重" },
  { name: "fontFamily", type: "string", default: '"inherit"', description: "栅格化的字体，默认继承页面字体" },
  { name: "letterSpacing", type: "string | number", default: '"-0.06em"', description: "任意 CSS 字距，数字按 px" },
  { name: "lineHeight", type: "number | string", default: "0.9", description: "多行文本的行高，数字为倍数" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
];

export default {
  id: "warp-text",
  name: "扭曲折射文字",
  href: "warp-text.html",
  title: "扭曲折射文字",
  description:
    "把标题栅格化成 WebGL 纹理再折射回屏幕：指针是一块玻璃透镜，凸起、收缩、漩涡三种模式把字形推拉扭转；环境噪声让文字持续呼吸，点击激发扩散冲击波，七次采样带来折射错切与红蓝色散。开场 1.6s 从强扭曲收敛，深色墨水边缘补偿、无 WebGL 回退纯文本，字体随页面实时栅格化。",
  tags: ["React", "WebGL", "GLSL", "文字"],

  cardDescription: "指针如玻璃透镜弯折折射文字，点击激起冲击波与色散。",

  demoHint: "移动指针穿过文字看透镜弯折，点击激发冲击波；切换三种透镜，调大折射与色散看棱镜效果。",

  api: API,
};
