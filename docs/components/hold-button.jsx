/* Component metadata only — the live demo and gallery preview live in
   hold-button-demo.jsx, the framework source texts and the prompt in
   hold-button-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with hold-button-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "children", type: "ReactNode", default: '"Hold to delete"', description: "待机态标签内容" },
  { name: "doneLabel", type: "string", default: '"Deleted"', description: "确认完成后显示的标签" },
  { name: "icon", type: "ReactNode", default: "null", description: "待机标签前的图标" },
  { name: "doneIcon", type: "ReactNode", default: "null", description: "完成标签前的图标" },
  { name: "backgroundColor", type: "string", default: '"#27272a"', description: "按钮底色" },
  { name: "fillColor", type: "string", default: '"#5227FF"', description: "液体填充颜色" },
  { name: "textColor", type: "string", default: '"#f5f5f5"', description: "基础标签墨色" },
  { name: "fillTextColor", type: "string", default: '"#ffffff"', description: "液体内的标签墨色" },
  { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "尺寸档位（高度 / 内边距 / 字号）" },
  { name: "radius", type: "number", default: "14", description: "圆角（px）" },
  { name: "fillDirection", type: '"right" | "up"', default: '"right"', description: "液体涨落方向：向右或向上" },
  { name: "holdTime", type: "number", default: "2000", description: "确认所需按压时长（ms）" },
  { name: "releaseTime", type: "number", default: "200", description: "松手回退时长（ms）" },
  { name: "pressScale", type: "number", default: "0.97", description: "指针按住时的缩放" },
  { name: "wave", type: "boolean", default: "true", description: "是否启用滚动液浪前沿" },
  { name: "waveAmplitude", type: "number", default: "6", description: "液浪前沿高度（px）" },
  { name: "glow", type: "boolean", default: "true", description: "蓄力时的辉光与完成时的脉冲光环" },
  { name: "resetAfter", type: "number", default: "1200", description: "完成态回到待机的延迟（ms）；0 表示保持完成" },
  { name: "disabled", type: "boolean", default: "false", description: "禁用按钮" },
  { name: "onHold", type: "() => void", default: "—", description: "按压时长蓄满确认时回调" },
  { name: "onTap", type: "() => void", default: "—", description: "短于 250ms 的按压（未漂移）回调" },
  { name: "className", type: "string", default: '""', description: "按钮附加类名" },
];

export default {
  id: "hold-button",
  name: "按压蓄力按钮",
  href: "hold-button.html",
  title: "按压蓄力按钮",
  description:
    "长按确认按钮：按住时一道液态填充匀速涨满按钮（向右或向上），前沿带着滚动液浪、文字在液体内外交叉淡入；蓄满即确认，辉光脉冲一圈、标签换成完成文案，稍后自动复位；提前松手液面以缓出曲线退回；漂出按钮 10px 之外视为取消，短按算轻点。键盘 Space / Enter 长按、Escape 取消；窗口失焦或隐藏绝不误确认。零运行时依赖，纯 React + CSS。",
  tags: ["React", "CSS", "表单"],

  cardDescription: "长按涨起液态填充，蓄满脉冲确认，松手液面退回。",

  demoHint: "按住不放看液浪涨满与完成脉冲；提前松手看回退；快速轻点触发 onTap；切向上涨落。",

  api: API,
};
