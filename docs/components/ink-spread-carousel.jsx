/* Component metadata only — the live demo and gallery preview live in
   ink-spread-carousel-demo.jsx, the framework source texts and the prompt in
   ink-spread-carousel-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "ink-spread-carousel",
  name: "墨水扩散图片轮播",
  href: "ink-spread-carousel.html",
  title: "墨水扩散图片轮播",
  description:
    "每次点击下一张照片从实际落点以不规则液态墨水边界向外晕开并带薄透镜折射，照片静止不横移，WebGL1 着色器加内嵌图集驱动，快速切换用快照续接，无 WebGL 回退 Canvas2D。",

  cardDescription: "照片从点击处晕开切换，液态墨水边界带薄透镜折射。",

  demoHint: "点击照片从落点晕开下一张；左右按钮循环切换，键盘 ←/→ 与 Home/End。",



  api: [
    { name: "index", type: "number", default: "0", description: "初始/更新的照片序号；外部更新不触发 onIndexChange" },
    { name: "duration", type: "number", default: "900", description: "扩散动画时长（毫秒），clamp 250–2400" },
    { name: "roughness", type: "number", default: "0.6", description: "液态边界粗糙度，clamp 0–1" },
    { name: "images", type: "(string | { src; alt? })[]", default: "内嵌图集", description: "替换图源，2–12 张，全部解码成功后切换；跨域需 CORS" },
    { name: "onIndexChange", type: "(index: number) => void", default: "—", description: "用户触发的切换完成时回调一次" },
    { name: "height", type: "number", default: "876", description: "场景高度，逻辑像素" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；开启时直接切换目标图" },
  ],
};
