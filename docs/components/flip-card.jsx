/* Component metadata only — the live demo and gallery preview live in
   flip-card-demo.jsx, the framework source texts and the prompt in
   flip-card-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with flip-card-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "front", type: "ReactNode", default: "null", description: "正面内容" },
  { name: "back", type: "ReactNode", default: "null", description: "背面内容" },
  { name: "flipped", type: "boolean", default: "—", description: "受控翻面状态，配合 onFlipChange 使用" },
  { name: "defaultFlipped", type: "boolean", default: "false", description: "初始面（非受控模式）" },
  { name: "onFlipChange", type: "(flipped: boolean) => void", default: "—", description: "显示面变化时回调" },
  { name: "axis", type: '"y" | "x"', default: '"y"', description: "翻转轴：y 水平翻转，x 垂直翻转" },
  { name: "flipOnClick", type: "boolean", default: "true", description: "单击是否翻卡" },
  { name: "draggable", type: "boolean", default: "true", description: "拖过半程翻面" },
  { name: "dragDistance", type: "number", default: "0", description: "半圈对应的拖动距离（px）；0 用卡片沿轴尺寸" },
  { name: "tilt", type: "boolean", default: "true", description: "悬停时朝指针方向倾斜" },
  { name: "tiltMax", type: "number", default: "12", description: "最大倾斜角度（度）" },
  { name: "glare", type: "boolean", default: "true", description: "跟随指针的径向眩光" },
  { name: "glareOpacity", type: "number", default: "0.22", description: "眩光峰值透明度" },
  { name: "hoverScale", type: "number", default: "1.03", description: "悬停 / 按住时的抬起缩放" },
  { name: "perspective", type: "number", default: "1100", description: "3D 透视距离（px）" },
  { name: "stiffness", type: "number", default: "170", description: "翻转弹簧刚度" },
  { name: "damping", type: "number", default: "20", description: "翻转弹簧阻尼" },
  { name: "width", type: "number", default: "300", description: "卡片宽度（px）" },
  { name: "height", type: "number", default: "400", description: "卡片高度（px）" },
  { name: "radius", type: "number", default: "22", description: "圆角（px）" },
  { name: "background", type: "string", default: '"#27272a"', description: "面背景色" },
  { name: "color", type: "string", default: '"#f5f5f5"', description: "面文字墨色" },
  { name: "shadow", type: "boolean", default: "true", description: "是否显示模糊地面投影" },
  { name: "shadowColor", type: "string", default: '"#000000"', description: "投影颜色" },
  { name: "shadowOpacity", type: "number", default: "0.45", description: "投影透明度" },
  { name: "disabled", type: "boolean", default: "false", description: "禁用指针、键盘与悬停交互" },
  { name: "ariaLabel", type: "string", default: '"Flip card"', description: "按钮的可访问名称" },
  { name: "className", type: "string", default: '""', description: "根节点附加类名" },
];

export default {
  id: "flip-card",
  name: "弹簧翻卡",
  href: "flip-card.html",
  title: "弹簧翻卡",
  description:
    "双面 3D 翻卡：单击或回车沿水平 / 垂直轴弹转 180°，也可以直接拖着转——快甩松手会把卡片抛到另一面；悬停时卡片抬起、朝指针微微倾斜、径向眩光跟着走，转到侧棱时地面投影随之压扁；减少动效时退化为淡入淡出。支持受控 / 非受控两种用法。",
  tags: ["React", "CSS", "Motion", "3D"],

  cardDescription: "单击或快甩让卡片 3D 弹转翻面，悬停带倾斜与眩光。",

  demoHint: "单击翻卡，也可以按住拖转后快甩；切到 x 轴看垂直翻转；倾斜与眩光可调。",

  api: API,
};
