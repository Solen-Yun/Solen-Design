/* Component metadata only — the live demo and gallery preview live in
   album-cover-tunnel-demo.jsx, the framework source texts and the prompt in
   album-cover-tunnel-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "album-cover-tunnel",
  name: "专辑封面隧道",
  href: "album-cover-tunnel.html",
  title: "专辑封面隧道",
  description:
    "十张带倒角与流光覆膜的专辑封面薄盒在 three.js 三维空间排成无尽隧道，悬停抬起、点击飞入镜头中央，滚轮或拖动穿行，空闲五秒自动推进，帧率过低自动降像素比。",

  cardDescription: "悬停抬起、点击飞入中央，滚轮或拖动穿行无尽封面隧道。",

  demoHint: "滚轮或上下拖动穿行；悬停抬起封面；点击让封面飞入中央；方向键切换主封面，空格暂停。",



  api: [
    { name: "images", type: "(string | { src; alt })[]", default: "内嵌十图", description: "整组替换封面，最多 96 张；非正方形图片会被居中裁切" },
    { name: "autoTravel", type: "boolean", default: "true", description: "空闲五秒后自动向前推进隧道" },
    { name: "paused", type: "boolean", default: "false", description: "暂停推进与所有缓动，交互仍然可用" },
    { name: "theme", type: "\"dark\" | \"light\"", default: "\"dark\"", description: "深色或浅色主题；浅色主题收窄舞台并隐藏提示" },
    { name: "active", type: "number", default: "—", description: "指定成为主封面的封面序号" },
    { name: "onSelect", type: "(index) => void", default: "—", description: "选中封面时回报序号" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；所有插值立即到位" },
  ],
};
