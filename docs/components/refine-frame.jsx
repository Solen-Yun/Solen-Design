/* Component metadata only — the live demo and gallery preview live in
   refine-frame-demo.jsx, the framework source texts and the prompt in
   refine-frame-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with refine-frame-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "status", type: '"queued" | "generating" | "refining" | "complete" | "error"', default: '"generating"', description: "当前生成阶段；驱动媒体处理与马赛克推进目标" },
  { name: "children", type: "ReactNode", default: "—", description: "框内媒体；其中的第一个 <img> 会喂给马赛克金字塔" },
  { name: "aspectRatio", type: "string", default: '"4 / 3"', description: "框的 CSS aspect-ratio" },
  { name: "width", type: "number", default: "320", description: "框宽（px），不超过容器" },
  { name: "radius", type: "number", default: "16", description: "圆角（px）" },
  { name: "background", type: "string", default: '"#27272a"', description: "框背景色，也用于状态胶囊的底色" },
  { name: "color", type: "string", default: '"#f5f5f5"', description: "扫光与文字的墨色" },
  { name: "stageDuration", type: "number", default: "400", description: "媒体过渡与马赛克每级的时长（ms）" },
  { name: "sweep", type: "boolean", default: "true", description: "进行中显示往复的扫光带" },
  { name: "showStatus", type: "boolean", default: "true", description: "显示左下角状态胶囊" },
  { name: "hideAfter", type: "number", default: "1200", description: "complete 后胶囊自动隐藏的延时（ms），0 表示常驻" },
  { name: "labels", type: 'Partial<{ queued, generating, refining, complete, error: string }>', default: "DEFAULT_LABELS", description: "各状态的胶囊与 aria 文案，覆盖默认值" },
  { name: "retryLabel", type: "string", default: '"Retry"', description: "重试按钮文字" },
  { name: "onRetry", type: "() => void", default: "—", description: "提供此回调时，error 状态显示重试按钮" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
];

export default {
  id: "refine-frame",
  name: "生成阶段媒体框",
  href: "refine-frame.html",
  title: "生成阶段媒体框",
  description:
    "把一张图片按生成阶段呈现的媒体框：queued / generating / refining / complete / error 五档分别施加模糊、降饱和、缩放与透明度过渡；推进时画布马赛克金字塔把图片从粗块逐级解算到全清晰度，溶解前沿带 14 条渐隐条与一道白色亮光下行，完成后无缝换回原图，全程零布局位移。状态胶囊随档位切换（转圈/对勾/红色警示）并在 complete 后自动隐藏，error 提供重试按钮；prefers-reduced-motion 下进度直接落位、扫光与呼吸全部停掉。",
  tags: ["React", "CSS", "Canvas"],

  cardDescription: "图片按生成阶段从马赛克逐级解算到清晰，零布局位移。",

  demoHint: "切状态看马赛克推进与回退；complete 后胶囊自动隐藏，error 出现重试。",

  api: API,
};
