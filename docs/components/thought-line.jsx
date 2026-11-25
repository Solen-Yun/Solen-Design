/* Component metadata only — the live demo and gallery preview live in
   thought-line-demo.jsx, the framework source texts and the prompt in
   thought-line-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with thought-line-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "label", type: "string", default: '"Thinking…"', description: "思考中的文案" },
  { name: "doneLabel", type: "string", default: '""', description: "完成后的文案；留空按计时开关取「Thought for」或「Done thinking」" },
  { name: "renderLabel", type: "(text: string, working: boolean) => ReactNode", default: "—", description: "自定义两段文案的渲染" },
  { name: "glyph", type: '"sparkle" | "dot" | "none" | ReactNode', default: '"sparkle"', description: "行首图形：内置星光/圆点/无，或任意 ReactNode" },
  { name: "steps", type: "string[]", default: "[]", description: "推理步骤列表；最后一步在完成前保持脉冲" },
  { name: "collapsible", type: "boolean", default: "true", description: "允许点击表头折叠/展开步骤" },
  { name: "collapseOnSettle", type: "boolean", default: "true", description: "完成后自动把步骤折叠成一行" },
  { name: "color", type: "string", default: '"currentColor"', description: "文案、图形与计时的颜色" },
  { name: "glyphColor", type: "string", default: '""', description: "图形颜色覆盖；留空同 color" },
  { name: "fontSize", type: "number", default: "16", description: "表头字号（px）" },
  { name: "breathPeriod", type: "number", default: "1.6", description: "图形/文案一次呼吸的周期（秒）" },
  { name: "breathDepth", type: "number", default: "0.45", description: "呼吸深度 0–1；0 时呼吸退化为常亮" },
  { name: "shimmer", type: "boolean", default: "true", description: "思考中的文字流光（开启后由流光代替文案呼吸）" },
  { name: "shimmerDuration", type: "number", default: "1.8", description: "一次流光扫过时长（秒）" },
  { name: "settleDuration", type: "number", default: "350", description: "文案交叉淡化、计时滑动与折叠的时长（ms）" },
  { name: "settleBlur", type: "number", default: "2", description: "文案切换时的模糊半径（px）" },
  { name: "working", type: "boolean", default: "true", description: "是否仍在思考；置 false 进入完成态" },
  { name: "settleAfter", type: "number", default: "0", description: "若干秒后自动完成；0 表示等 working 翻转" },
  { name: "elapsed", type: "number", default: "—", description: "静态展示的已用秒数；不传则跑实时时钟" },
  { name: "showTimer", type: "boolean", default: "true", description: "显示十分秒计时" },
  { name: "onSettle", type: "(elapsed: number) => void", default: "—", description: "完成时回调一次，带已用秒数" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式，覆盖在组件变量之上" },
];

export default {
  id: "thought-line",
  name: "思考折叠行",
  href: "thought-line.html",
  title: "思考折叠行",
  description:
    "AI 推理过程的头部行：思考中图形与文案呼吸、文字流光扫过、十分秒实时计时；完成瞬间工作文案带模糊交叉淡化为完成文案，计时从行尾滑到完成文案旁，步骤列表按 grid-template-rows 0fr→1fr 折叠消失，点表头可再展开。步骤逐条淡入，末步脉冲、完成的打勾变淡；屏幕阅读器拿到完整状态播报（含用时）。受 working/settleAfter 驱动，reduced-motion 全程可读。",
  tags: ["React", "CSS", "Motion", "AI"],

  cardDescription: "思考时呼吸流光计时，完成后文案淡化、计时滑位、步骤折叠成一行。",

  demoHint: "等自动完成看文案淡化、计时滑位与步骤折叠；改 settleAfter 换节奏；关流光换呼吸；点表头展开步骤。",

  api: API,
};
