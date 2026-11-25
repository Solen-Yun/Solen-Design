/* Component metadata only — the live demo and gallery preview live in
   ghost-fibers-demo.jsx, the framework source texts and the prompt in
   ghost-fibers-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with ghost-fibers-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "glowColor", type: "string", default: '"#8b5cf6"', description: "纤维的基础色，接受任意 CSS 颜色字符串" },
  { name: "lineColor", type: "string", default: "—", description: "折叠、闪烁、脉冲等高光颜色；不设则由主色向白色提亮" },
  { name: "secondaryColor", type: "string", default: "—", description: "渐变的第二颜色；不设则取主色的暗版" },
  { name: "gradient", type: '"depth" | "along" | "across"', default: '"depth"', description: "主色与第二颜色的混合轴向：按景深 / 沿纤维 / 横跨丝带" },
  { name: "speed", type: "number", default: "0.5", description: "整体动画速度；0 冻结漂移" },
  { name: "scale", type: "number", default: "1", description: "丝带的世界缩放，0.3–3" },
  { name: "rotation", type: "number", default: "18", description: "相机绕视轴的滚转角（度）" },
  { name: "rollSpeed", type: "number", default: "0.15", description: "滚转持续转动的速度" },
  { name: "layers", type: "number", default: "3", description: "丝带条数，1–3" },
  { name: "waves", type: "number", default: "1", description: "丝带波浪起伏的幅度；0 为直纤维" },
  { name: "twist", type: "number", default: "1.2", description: "沿丝带的扭转量，越大螺旋折叠越密" },
  { name: "threads", type: "number", default: "72", description: "每条丝带的纤维数，6–180" },
  { name: "volume", type: "number", default: "0.7", description: "纤维在层间与丝带截面上的蓬松度，0–2" },
  { name: "spread", type: "number", default: "1", description: "丝带半宽，0.2–3" },
  { name: "density", type: "number", default: "1", description: "每根纤维的珠点数（260 × density），0.2–3" },
  { name: "thickness", type: "number", default: "1", description: "珠点尺寸倍率，0.2–4" },
  { name: "flow", type: "number", default: "0.4", description: "珠点沿纤维爬行的速度" },
  { name: "fiberStyle", type: '"dots" | "dashes" | "lines"', default: '"dots"', description: "珠点形态：圆点 / 短划 / 拉长的线段" },
  { name: "tips", type: "number", default: "0", description: "0–1：纤维末端亮头珠点" },
  { name: "foldGlow", type: "number", default: "1", description: "0–3：丝带侧折（边缘正对视线）时的闪光强度" },
  { name: "perspective", type: "number", default: "0.65", description: "0–1：相机基础俯仰偏航的倾斜量" },
  { name: "depthOfField", type: "number", default: "0.85", description: "0–2：离焦平面的散景模糊强度" },
  { name: "focusDepth", type: "number", default: "0", description: "-1–1：把静息对焦平面拉近（-）或推远（+）" },
  { name: "particles", type: "number", default: "0.5", description: "漂浮尘埃数量（420 × particles），0–2" },
  { name: "sparkle", type: "number", default: "0.5", description: "0–2：纤维与尘埃的闪烁强度" },
  { name: "glow", type: "number", default: "0.8", description: "泛光强度，≥ 0；0 关闭泛光链" },
  { name: "brightness", type: "number", default: "1", description: "曝光倍率，≥ 0" },
  { name: "vignette", type: "number", default: "0.3", description: "0–1：边缘暗角" },
  { name: "grain", type: "number", default: "0.06", description: "动态胶片颗粒强度，≥ 0" },
  { name: "mouseInteraction", type: "boolean", default: "true", description: "开启指针视角、悬停效果与点击脉冲" },
  { name: "hoverEffect", type: '"focus" | "part" | "none"', default: '"focus"', description: "悬停行为：把焦点拉到光标附近的纤维 / 将纤维从光标处推开 / 无效果" },
  { name: "mouseStrength", type: "number", default: "1", description: "悬停影响力与对焦拉力的倍率，≥ 0" },
  { name: "pulseOnClick", type: "boolean", default: "true", description: "点击时在最近的丝带上激起一道奔跑的光脉冲" },
  { name: "intro", type: "boolean", default: "true", description: "播放 2.6 秒的「从雾里长出」入场" },
  { name: "lightMode", type: "boolean", default: "false", description: "白底墨色：纤维变成浅色纸面上的墨痕，关闭泛光" },
  { name: "paused", type: "boolean", default: "false", description: "冻结漂移与入场，但保持渲染" },
  { name: "dpr", type: "number", default: "—", description: "覆盖画布的设备像素比（上限 2）" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "ghost-fibers",
  name: "纤维光雾层",
  href: "ghost-fibers.html",
  title: "纤维光雾层",
  description:
    "三条由上万个发光珠点织成的丝带在浅景深里扭转、折叠、缓缓漂移：WebGL2 实例化渲染每颗珠点（点/划/线三种形态），五级泛光 + 胶片颗粒 + 暗角收尾；指针以弹簧牵引视角，悬停可把焦点拉到光标附近的纤维或将其推开，点击在最近的丝带上激起一道奔跑的光脉冲；支持白底墨色主题、尘埃点缀与纤维末端亮头。",
  tags: ["React", "CSS", "WebGL"],

  cardDescription: "成千上万颗发光纤维珠沿三条丝带扭转漂浮，景深虚化如雾。",

  demoHint: "在画布上移动鼠标看视角轻转、焦点贴上纤维；点击激起沿丝带奔跑的光脉冲；切换点/划/线形态与白底墨色。",

  api: API,
};
