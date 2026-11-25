/* Component metadata only — the live demo and gallery preview live in
   voice-pill-demo.jsx, the framework source texts and the prompt in
   voice-pill-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with voice-pill-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "accentColor", type: "string", default: '"#f5f5f5"', description: "强调色：录音态图标、计时、波形条与取消提示" },
  { name: "iconColor", type: "string", default: '"#a1a1aa"', description: "待机态麦克风图标颜色" },
  { name: "background", type: "string", default: '"#27272a"', description: "胶囊底色" },
  { name: "size", type: "number", default: "28", description: "麦克风按钮直径（px），图标/停止块/字号随之推导" },
  { name: "shape", type: '"pill" | "rounded"', default: '"pill"', description: "胶囊圆角风格：全圆或圆角矩形" },
  { name: "reach", type: "number", default: "8", description: "录音时胶囊向左多伸出的距离（px）" },
  { name: "showTime", type: "boolean", default: "true", description: "显示 m:ss 计时" },
  { name: "waveform", type: "boolean", default: "true", description: "显示滚动的均衡器画布" },
  { name: "slideToCancel", type: "boolean", default: "true", description: "向左拖动胶囊进入取消" },
  { name: "cancelDistance", type: "number", default: "64", description: "完成取消所需的拖动距离（px）" },
  { name: "attack", type: "number", default: "40", description: "包络起音时间常数（ms）" },
  { name: "release", type: "number", default: "240", description: "包络释放时间常数（ms）" },
  { name: "sensitivity", type: "number", default: "1", description: "原始电平的增益倍数" },
  { name: "floor", type: "number", default: "0.1", description: "波形条最小高度占比 0–1" },
  { name: "openDuration", type: "number", default: "200", description: "胶囊展开时长（ms）" },
  { name: "pressScale", type: "number", default: "0.95", description: "按住时的缩放" },
  { name: "mode", type: '"auto" | "hold" | "tap"', default: '"auto"', description: "自动（轻点开始、再按结束）/按住说话/轻点切换" },
  { name: "holdAfter", type: "number", default: "300", description: "按住多久算按住模式（ms）" },
  { name: "reactive", type: '"simulated" | "mic"', default: '"simulated"', description: "电平来源：内置语音包络或真实麦克风" },
  { name: "disabled", type: "boolean", default: "false", description: "禁用按钮并结束录音" },
  { name: "ariaLabel", type: "string", default: '"Dictate"', description: "按钮的可访问名称" },
  { name: "onStart", type: "(info: { source }) => void", default: "—", description: "开始录音时回调" },
  { name: "onStop", type: "(info: { reason, duration }) => void", default: "—", description: "录音结束时回调，带原因与毫秒时长" },
  { name: "className", type: "string", default: '""', description: "按钮附加类名" },
];

export default {
  id: "voice-pill",
  name: "录音均衡胶囊",
  href: "voice-pill.html",
  title: "录音均衡胶囊",
  description:
    "一颗会涨开的录音按钮：按下后胶囊向左伸长，计时与滚动的均衡器波形从麦克风左侧长出来，麦克风图标模糊化成停止方块；向左拖动整个胶囊跟手滑向 Cancel 提示，拖满距离即取消。电平用起音/释放包络驱动，默认是 4.8 秒循环的音节脉冲模拟，也可切真实麦克风频谱；支持 auto/hold/tap 三种说话模式、Esc/失焦/隐藏自动收尾，onStart/onStop 报告原因与时长。",
  tags: ["React", "CSS", "Web Audio", "按钮"],

  cardDescription: "按下涨成胶囊，均衡器与计时长出来，左滑拖向取消。",

  demoHint: "按下开始录音看波形随语音包络跳动；轻点后再次点击结束；按住向左拖满即取消；切麦克风用真实频谱。",

  api: API,
};
