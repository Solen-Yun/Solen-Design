/* Component metadata only — the live demo and gallery preview live in
   shader-flood-demo.jsx, the framework source texts and the prompt in
   shader-flood-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "shader-flood",
  name: "液体注入卡片",
  href: "shader-flood.html",
  title: "液体注入卡片",
  description:
    "WebGL 程序化液体大理石纹理从指针入点注满卡片、从离开点排空，每卡独立三色色板与形态种子、细褶皱随时间持续流动，文字与图标是画布上方的真实 DOM，无 WebGL 回退 canvas2d 渐变褶皱。",

  cardDescription: "液体从入点注满卡片、从出点排空，三色大理石纹理实时流动。",

  demoHint: "悬停从指针处注入、移出向离开点排空；点击固定，Esc 或点击外部收起；Tab 从中心展开，方向键导航。",



  api: [
    { name: "items", type: "{ title; description; icon?; colors? }[]", default: "默认六项", description: "卡片数据；icon 未知值回退 layers，colors（三色）省略时按索引循环内置五组色板" },
    { name: "seed", type: "number", default: "0", description: "液体形态种子，每卡实际种子 = seed + 索引×7.31；只改形态，不改色板与文案" },
    { name: "speed", type: "number", default: "1", description: "纹理流动速度，clamp 0–3；0 冻结纹理但保留注入/排空" },
    { name: "theme", type: '"light" | "dark"', default: '"light"', description: "深浅主题" },
    { name: "background", type: "string", default: "主题默认", description: "场景背景十六进制色" },
    { name: "height", type: "number", default: "720", description: "场景最小高度，逻辑像素" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "遮罩立即就位、纹理时间固定为 0，全部操作保留" },
  ],
};
