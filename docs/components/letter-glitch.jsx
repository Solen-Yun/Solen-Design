/* Component metadata only — the live demo and gallery preview live in
   letter-glitch-demo.jsx, the framework source texts and the prompt in
   letter-glitch-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with letter-glitch-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "glitchColors", type: "string[]", default: '["#ffffff", "#61dca3"]', description: "闪烁与火花的高亮调色板，最多 8 色；浅色模式默认深墨 + 绿" },
  { name: "baseColor", type: "string", default: '"#ffffff"', description: "静息字符墨色；浅色模式默认 #18181b" },
  { name: "characters", type: "string", default: "A–Z 与常用符号数字", description: "字符池，渲染进字形图集" },
  { name: "fontFamily", type: "string", default: "ui-monospace 栈", description: "图集使用的字体" },
  { name: "fontSize", type: "number", default: "14", description: "字符字号（CSS px），clamp 6–96" },
  { name: "spacing", type: "number", default: "0.6", description: "字符间距（字号倍数），clamp 0–2" },
  { name: "density", type: "number", default: "0.9", description: "带静息墨色的字符比例，0–1" },
  { name: "baseOpacity", type: "number", default: "0.16", description: "静息墨色不透明度，0–1" },
  { name: "glitchAmount", type: "number", default: "0.5", description: "自发闪烁频率，0–1" },
  { name: "speed", type: "number", default: "1", description: "全局节奏倍率，0 冻结" },
  { name: "smooth", type: "boolean", default: "true", description: "热度渐起渐落；关闭则瞬时跳变" },
  { name: "interactive", type: "boolean", default: "true", description: "光标提亮、扰动与火花" },
  { name: "cursorRadius", type: "number", default: "140", description: "光标影响半径（CSS px）" },
  { name: "clickEffect", type: '"tear" | "burst" | "none"', default: '"tear"', description: "点击效果：横向撕裂 / 放射爆裂 / 关闭" },
  { name: "flow", type: "number", default: "0.5", description: "漂移明暗噪声强度，0–1" },
  { name: "edgeFade", type: "number", default: "0", description: "四边渐隐比例，clamp 0–0.5" },
  { name: "centerFade", type: "number", default: "0", description: "中央椭圆渐隐强度，clamp 0–1" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时字符从中心向外 1.4s 亮起" },
  { name: "lightMode", type: "boolean", default: "false", description: "浅色页面配色（深墨字符）" },
  { name: "backgroundColor", type: "string", default: "—", description: "字符背后的底色；不设则透明" },
  { name: "dpr", type: "number", default: "devicePixelRatio", description: "渲染像素比，上限 2" },
  { name: "className", type: "string", default: '""', description: "根节点附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根节点内联样式" },
];

export default {
  id: "letter-glitch",
  name: "字符闪烁场",
  href: "letter-glitch.html",
  title: "字符闪烁场",
  description:
    "一面安静的低透明度字符场：等宽字符按网格铺满容器，随时间轻微明暗呼吸，一道漂移的噪声让亮度成湖成河地迁移；自发的小面积闪烁与横向扫描线点燃又冷却，光标靠近时字符被唤醒、快速移动搅起满屏乱码与彩色火花，点击横向撕裂或放射爆裂。字形图集 + 每格四通道状态纹理，全部在 WebGL2 单次绘制里合成；密度、字号、流速、点击方式、边缘与中央渐隐皆可调，空闲后帧循环自睡。",
  tags: ["React", "CSS", "WebGL", "文字"],

  cardDescription: "字符场自发闪烁，光标搅动乱码，点击撕裂。",

  demoHint: "在字面上快速划动看火花与乱码，点击触发撕裂或爆裂；密度、字号与闪烁量可调。",

  api: API,
};
