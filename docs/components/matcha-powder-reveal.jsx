/* Component metadata only — the live demo and gallery preview live in
   matcha-powder-reveal-demo.jsx, the framework source texts and the prompt in
   matcha-powder-reveal-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "matcha-powder-reveal",
  name: "包装撕开粒子消散",
  href: "matcha-powder-reveal.html",
  title: "包装撕开粒子消散",
  description:
    "一个可以真的用手撕开的立体金属抹茶包装，封条沿弯折公式逐顶点变形、半途松手保留姿态，撕开处逐点喷出 26000 颗分质量细粉，快拉慢拉力度不同，末尾浮现 it's just matcha 字样。",

  cardDescription: "抓右上撕口向左撕开金属包装，撕到底抹茶粉随腐蚀场喷散。",

  demoHint: "抓住右上撕口向左拖动撕开；半途松手可再抓回继续，快拉慢拉喷散不同；完成后按 R 或重播恢复完整袋体。",



  api: [
    { name: "progress", type: "number", default: "—", description: "0–1，直接查看完整、半撕、消散和完成状态" },
    { name: "playing", type: "boolean", default: "true", description: "控制入场和打开后的推进" },
    { name: "autoTear", type: "boolean", default: "false", description: "仅明确开启才自动撕开" },
    { name: "loop", type: "boolean", default: "false", description: "循环播放；缩略预览可同时开启 autoTear 和 loop" },
    { name: "speed", type: "number", default: "1", description: "时间流速倍率，0.25–2" },
    { name: "height", type: "number", default: "720", description: "场景高度，逻辑像素；窄容器等比例缩放" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；直接显示打开后的完成画面" },
    { name: "onProgress", type: "(progress) => void", default: "—", description: "仅用户拖进度或撕开时回调；受控更新不触发" },
  ],
};
