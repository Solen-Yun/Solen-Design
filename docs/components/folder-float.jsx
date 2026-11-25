/* Component metadata only — the live demo and gallery preview live in
   folder-float-demo.jsx, the framework source texts and the prompt in
   folder-float-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with folder-float-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "items", type: "(string | { label: string; value: string })[]", default: "DEFAULT_ITEMS", description: "便签列表；字符串会转成 { value, label }" },
  { name: "label", type: "string", default: '"Design feedback"', description: "文件夹盖上的标题" },
  { name: "sublabel", type: "string", default: '""', description: "盖上的副标题；留空默认显示「N notes」" },
  { name: "trigger", type: '"hover" | "press"', default: '"hover"', description: "打开方式：悬停进出或按压切换" },
  { name: "defaultOpen", type: "boolean", default: "false", description: "初始是否展开（非受控模式）" },
  { name: "closeOnSelect", type: "boolean", default: "true", description: "选中便签后是否收起文件夹" },
  { name: "physics", type: "boolean", default: "true", description: "弹出落定后是否进入零重力浮动世界" },
  { name: "drift", type: "number", default: "0.5", description: "环境漂移力强度" },
  { name: "onSelect", type: "(value: string, index: number) => void", default: "—", description: "选中某张便签时回调" },
  { name: "onOpenChange", type: "(open: boolean) => void", default: "—", description: "展开 / 收起时回调" },
  { name: "folderColor", type: "string", default: '"#3f3f46"', description: "文件夹背板颜色" },
  { name: "frontColor", type: "string", default: '"#52525b"', description: "文件夹盖颜色" },
  { name: "paperColor", type: "string", default: '"#f5f5f5"', description: "纸页颜色" },
  { name: "itemColor", type: "string", default: '"#f5f5f5"', description: "便签胶囊颜色" },
  { name: "itemTextColor", type: "string", default: '"#18181b"', description: "便签文字颜色" },
  { name: "labelColor", type: "string", default: '"#f5f5f5"', description: "盖面文字颜色" },
  { name: "width", type: "number", default: "200", description: "文件夹宽度（px）" },
  { name: "height", type: "number", default: "148", description: "文件夹高度（px）" },
  { name: "radius", type: "number", default: "14", description: "文件夹圆角（px）" },
  { name: "spread", type: "number", default: "180", description: "浮动区半宽（px）" },
  { name: "lift", type: "number", default: "26", description: "首行便签高出文件夹口的高度（px）" },
  { name: "tilt", type: "number", default: "8", description: "便签随机旋转的最大角度（度）" },
  { name: "flapAngle", type: "number", default: "34", description: "展开时盖子的倾角（度）" },
  { name: "restAngle", type: "number", default: "16", description: "收起时盖子的倾角（度）" },
  { name: "openDuration", type: "number", default: "520", description: "展开动画时长（ms）；收起为其 60%" },
  { name: "stagger", type: "number", default: "45", description: "便签逐个弹出的间隔（ms）" },
  { name: "bounce", type: "number", default: "0.3", description: "弹出缓动的回弹感 0–1" },
  { name: "className", type: "string", default: '""', description: "根节点附加类名" },
];

export default {
  id: "folder-float",
  name: "浮出便签云文件夹",
  href: "folder-float.html",
  title: "浮出便签云文件夹",
  description:
    "一只纸文件夹：悬停或按压时盖子以 3D 转轴翻开，便签按级弹跳从文件夹口浮出，在上方排成松散的便签云；随后物理引擎接管（零重力 + 柔性漂移力），便签互相碰撞、可以抓住拖甩，点选一张即触发选择并收起；Escape 也能关闭。物理关闭时退化为纯 CSS 漂浮；减少动效时只做淡入淡出。",
  tags: ["React", "CSS", "物理引擎"],

  cardDescription: "文件夹打开弹出一云便签，零重力漂浮，可抓取拖甩、点选收回。",

  demoHint: "悬停或点盖子打开；抓住便签甩一甩看碰撞；点一张便签选中并收回。",

  api: API,
};
