/* Component metadata only — the live demo and gallery preview live in
   ascii-sharks-demo.jsx, the framework source texts and the prompt in
   ascii-sharks-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "ascii-sharks",
  name: "字符鲨鱼与鱼群",
  href: "ascii-sharks.html",
  title: "字符鲨鱼与鱼群",
  description:
    "ASCII 字符海洋里八种鲨鱼以明暗字符拼成、在细网格上摆尾巡游并追捕会聚集与逃散的小鱼群，指针避让、点击起水波，中央是毛玻璃本地输入框与历史记录。",

  cardDescription: "ASCII 鲨鱼追食鱼群的字符海洋，中央是半透明本地输入框。",

  demoHint: "移动鼠标让鱼群避让，点击惊散；Space 暂停、R 重置、方向键移动虚拟指针；输入框 Enter 提交并保存本地历史。",



  api: [
    { name: "theme", type: '"light" | "dark"', default: '"light"', description: "深浅主题；light 对画布施加 invert(1) 反色" },
    { name: "paused", type: "boolean", default: "false", description: "暂停/继续模拟；画布上空格键也可切换" },
    { name: "speed", type: "number", default: "1", description: "模拟速度，clamp 0.25–2" },
    { name: "seed", type: "number", default: "7", description: "确定性初始种子（mulberry32）；变更后重建海洋" },
    { name: "fishCount", type: "number", default: "自动（85–340）", description: "覆盖小鱼总数，0–340" },
    { name: "sharks", type: "{ kind; size }[]", default: "hammerhead/classic/zebra/thresher", description: "鲨鱼种类与尺寸，1–8 条；kind 支持八种，size clamp 0.35–1.25" },
    { name: "showComposer", type: "boolean", default: "true", description: "是否显示输入层、雾与 History；false 时作为纯背景组件" },
    { name: "onSubmit", type: "(message: { text; attachments: File[] }) => void", default: "—", description: "提交本地消息时回调，不调用任何 AI 或上传" },
    { name: "onVoiceInput", type: "() => void", default: "—", description: "提供时启用麦克风按钮，否则禁用" },
    { name: "height", type: "number", default: "880", description: "场景高度，最小 480，逻辑像素" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好" },
  ],
};
