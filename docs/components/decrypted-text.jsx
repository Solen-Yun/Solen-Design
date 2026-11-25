/* Component metadata only — the live demo and gallery preview live in
   decrypted-text-demo.jsx, the framework source texts and the prompt in
   decrypted-text-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with decrypted-text-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "text", type: "string", default: "—", description: "要解密的文字" },
  { name: "speed", type: "number", default: "50", description: "引擎每拍间隔（ms），下限 16" },
  { name: "maxIterations", type: "number", default: "10", description: "噪声持续拍数；也驱动淡入坡度与热度衰减" },
  { name: "sequential", type: "boolean", default: "false", description: "逐字符按顺序揭示，而不是整段同时锁定" },
  { name: "revealDirection", type: '"start" | "end" | "center" | "random"', default: '"start"', description: "顺序揭示的方向" },
  { name: "useOriginalCharsOnly", type: "boolean", default: "false", description: "乱码只用原文里出现过的字母" },
  { name: "characters", type: "string", default: "'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+'", description: "乱码字符池" },
  { name: "className", type: "string", default: '""', description: "已揭示字符的类名" },
  { name: "parentClassName", type: "string", default: '""', description: "包裹层类名" },
  { name: "encryptedClassName", type: "string", default: '""', description: "未解密字符的类名" },
  { name: "animateOn", type: '"hover" | "view" | "click" | "inViewHover"', default: '"hover"', description: "触发方式：悬停、入视口、点击、入视口+悬停" },
  { name: "clickMode", type: '"once" | "toggle"', default: '"once"', description: "点击触发时：只解密一次，或反复切换明文密文" },
  { name: "effect", type: '"scramble" | "fade" | "flip"', default: '"scramble"', description: "换字的表现：直接替换、透明度渐变、3D 翻面" },
  { name: "scrambleColor", type: "string", default: '""', description: "加密字符的着色；留空不着色" },
  { name: "loop", type: "boolean", default: "false", description: "循环：解密、停留、加密、再解密" },
  { name: "loopDelay", type: "number", default: "2000", description: "循环两步之间的间隔（ms）" },
  { name: "hoverRadius", type: "number", default: "0", description: "指针热区半径（px）；大于 0 时只有指针附近的字符闪烁" },
  { name: "...props", type: "span props", default: "—", description: "透传给包裹层 span 的其余属性" },
];

export default {
  id: "decrypted-text",
  name: "解密文字",
  href: "decrypted-text.html",
  title: "解密文字",
  description:
    "字符从乱码池里逐拍翻滚直到锁定成明文的解密效果：隐藏字符用不可见占位保住宽度、乱码按字宽横向压缩，所以布局全程不抖；支持悬停 / 入视口 / 点击 / 悬停+入视口四种触发、四方向逐字揭示、透明度与 3D 翻面两种变体、加密着色过渡、指针热区局部闪烁，以及解密—加密的无限循环。",
  tags: ["React", "motion", "文字"],

  cardDescription: "乱码逐拍翻滚锁定成明文，占位保宽布局不抖。",

  demoHint: "悬停文字看重新打散再解密；切 flip/fade 变体、开热区用指针局部烤热字符，开循环看无限解密。",

  api: API,
};
