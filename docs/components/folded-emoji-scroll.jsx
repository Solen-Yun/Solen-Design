/* Component metadata only — the live demo and gallery preview live in
   folded-emoji-scroll-demo.jsx, the framework source texts and the prompt in
   folded-emoji-scroll-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "folded-emoji-scroll",
  name: "折边滚动表情选择器",
  href: "folded-emoji-scroll.html",
  title: "折边滚动表情选择器",
  description:
    "可搜索、可滚动的九列表情面板滚入上下边缘时沿圆柱曲面向内折叠压扁，真实 DOM 网格保留搜索与全键盘导航，像素由 Worker 光栅化加 WebGL 逐像素采样绘制，点击折边像素按逆投影选回源表情。",

  cardDescription: "九列表情滚入上下边缘沿圆柱面折叠，点击折边像素也能选对表情。",

  demoHint: "滚动看上下边缘的圆柱折叠；点击折边里的表情也能选对；搜索支持字符、分组名和别名；方向键在网格内移动。",



  api: [
    { name: "query", type: "string", default: '""', description: "搜索词；按字符、分组名称与别名大小写无关过滤" },
    { name: "value", type: "string", default: '""', description: "当前选中的表情字符；外部更新不触发 onSelect" },
    { name: "foldSize", type: "number", default: "42", description: "折边宽度 0–72px；减少动态偏好时折边为 0" },
    { name: "onSelect", type: "(emoji) => void", default: "—", description: "用户选择表情时回调；外部受控更新不触发" },
    { name: "height", type: "number", default: "960", description: "场景高度，逻辑像素；窄容器整场景等比缩放" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好" },
  ],
};
