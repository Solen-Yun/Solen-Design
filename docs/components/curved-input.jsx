/* Component metadata only — the live demo and gallery preview live in
   curved-input-demo.jsx, the framework source texts and the prompt in
   curved-input-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with curved-input-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "value", type: "string", default: "—", description: "受控值，配合 onChange 使用" },
  { name: "defaultValue", type: "string", default: '""', description: "初始值（非受控模式）" },
  { name: "onChange", type: "(value: string) => void", default: "—", description: "每次输入时回调最新值" },
  { name: "onSubmit", type: "(value: string) => void", default: "—", description: "回车或点击提交按钮时回调" },
  { name: "placeholder", type: "string", default: '"Enter your email"', description: "为空时沿弧线显示的占位文字" },
  { name: "buttonText", type: "string", default: '"Get Started"', description: "弧形提交按钮的文案" },
  { name: "type", type: "string", default: '"email"', description: "输入类型；支持 email/text/search/tel/url/password" },
  { name: "name", type: "string", default: "—", description: "隐藏 input 的 name 属性" },
  { name: "ariaLabel", type: "string", default: "—", description: "输入框无障碍标签，缺省用占位文字" },
  { name: "theme", type: '"dark" | "light"', default: '"dark"', description: "整套配色预设" },
  { name: "width", type: "number | string", default: "450", description: "条宽（px 或任意 CSS 宽度）" },
  { name: "bend", type: "number", default: "28", description: "弧的矢高（px）；正数上拱、负数下垂、0 拉直" },
  { name: "height", type: "number", default: "64", description: "条的厚度（px）" },
  { name: "cornerRadius", type: "number", default: "18", description: "弯曲条身的圆角" },
  { name: "borderWidth", type: "number", default: "1.5", description: "条身描边宽度" },
  { name: "fontSize", type: "number", default: "16", description: "文字、占位与按钮文案的字号" },
  { name: "backgroundColor", type: "string", default: "—", description: "条身填充色，缺省取主题" },
  { name: "textColor", type: "string", default: "—", description: "输入文字颜色，缺省取主题" },
  { name: "placeholderColor", type: "string", default: "—", description: "占位文字颜色，缺省取主题" },
  { name: "borderColor", type: "string", default: "—", description: "描边颜色，缺省取主题" },
  { name: "buttonColor", type: "string", default: "—", description: "按钮、图标块与聚焦环的强调色，缺省取主题" },
  { name: "buttonTextColor", type: "string", default: "—", description: "按钮文字颜色，缺省取主题" },
  { name: "iconColor", type: "string", default: "—", description: "图标块填充色，缺省取按钮色" },
  { name: "shadowSize", type: '"sm" | "md" | "lg"', default: '"md"', description: "整条投影的尺寸档位" },
  { name: "shadowColor", type: "string", default: "—", description: "投影颜色，缺省取主题" },
  { name: "showButton", type: "boolean", default: "true", description: "是否渲染弧形提交按钮" },
  { name: "showIcon", type: "boolean", default: "true", description: "是否渲染开头图标块" },
  { name: "icon", type: "ReactNode", default: "—", description: "自定义图标节点，替换内置信封图形" },
  { name: "className", type: "string", default: '""', description: "表单附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "表单内联样式" },
];

export default {
  id: "curved-input",
  name: "弧形输入条",
  href: "curved-input.html",
  title: "弧形输入条",
  description:
    "沿圆弧弯曲的输入条：条身描边、输入文字、闪烁光标、图标块与提交按钮全部贴着曲线走；底层藏着一个原生 input 负责焦点与输入法，点击曲线按弧长落点定位光标，长文本像原生输入框一样沿弧滚动；SVG 弧形几何实时生成，支持正负矢高、明暗主题与逐项配色覆盖。",
  tags: ["React", "SVG", "输入"],

  cardDescription: "文字、光标与按钮全贴着弧线走，点击曲线即落光标。",

  demoHint: "点弧线任意位置落光标、打字看光标贴弧移动；把 bend 调成 0 或负值，换主题和提交文案。",

  api: API,
};
