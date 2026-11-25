/* Component metadata only — the live demo and gallery preview live in
   text-cursor-demo.jsx, the framework source texts and the prompt in
   text-cursor-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with text-cursor-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "text", type: "string", default: '"Hello"', description: "拖尾的文字或 emoji" },
  { name: "mode", type: '"stamp" | "chain" | "ribbon"', default: '"stamp"', description: "拖尾形态：沿路盖章 / 定长链条 / 字符丝带" },
  { name: "spacing", type: "number", default: "88", description: "盖章间距（px，丝带里是字距），实际下限 4" },
  { name: "maxPoints", type: "number", default: "7", description: "stamp 模式的存活上限；chain 模式的链节数" },
  { name: "followMouseDirection", type: "boolean", default: "true", description: "拖尾随路径方向旋转" },
  { name: "randomFloat", type: "boolean", default: "true", description: "拖尾正弦漂浮与轻摆" },
  { name: "exitDuration", type: "number", default: "0.5", description: "单个元素消散时长（秒）" },
  { name: "removalInterval", type: "number", default: "30", description: "停留时橡皮擦速度：每秒擦掉多少毫秒的尾迹" },
  { name: "shrink", type: "number", default: "0.5", description: "尾端按排名收缩的比例 0–1" },
  { name: "fade", type: "number", default: "0.6", description: "尾端按排名淡出的比例 0–1" },
  { name: "smoothing", type: "number", default: "0.3", description: "头部跟随迟滞 0–1，越大越黏" },
  { name: "popIn", type: "boolean", default: "true", description: "新元素带回弹地弹入" },
  { name: "keepUpright", type: "boolean", default: "true", description: "转角超过 ±90° 时翻回，文字不倒立" },
  { name: "hideCursor", type: "boolean", default: "false", description: "隐藏原生光标" },
  { name: "color", type: "string", default: '"currentColor"', description: "拖尾文字颜色" },
  { name: "fontSize", type: "number", default: "28", description: "拖尾字号（px）" },
  { name: "fontWeight", type: "number", default: "600", description: "拖尾字重" },
  { name: "fontFamily", type: "string", default: '"inherit"', description: "拖尾字体；inherit 沿用页面字体" },
  { name: "className", type: "string", default: '""', description: "根节点附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根节点内联样式" },
];

export default {
  id: "text-cursor",
  name: "光标拖尾印章",
  href: "text-cursor.html",
  title: "光标拖尾印章",
  description:
    "跟着指针落章的文字拖尾：stamp 沿路径按间距盖下文案副本并限制存活数，chain 是定长链节跟行，ribbon 把字符串成沿路径弯折的丝带（按字形切分，emoji 也能串）；尾巴按排名收缩淡出、元素回弹入场、橡皮擦在指针停留时从尾部吃掉尾迹，元素全部走对象池回收。",
  tags: ["React", "CSS", "文字"],

  cardDescription: "文字沿光标轨迹盖章成串，停下后被橡皮擦从尾部擦光。",

  demoHint: "三种模式都试一遍：stamp 快甩看存活上限，ribbon 慢转看丝带弯折，停下看橡皮擦收尾。",

  api: API,
};
