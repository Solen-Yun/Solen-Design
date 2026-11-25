/* Component metadata only — the live demo and gallery preview live in
   multi-cursor-builder-demo.jsx, the framework source texts and the prompt in
   multi-cursor-builder-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "multi-cursor-builder",
  name: "多光标页面搭建",
  href: "multi-cursor-builder.html",
  title: "多光标页面搭建",
  description:
    "12 个彩色光标协作搭建作品集的开场与滚动调度：六边形标记开场散开，光标拉出白页后依次打字、换衬线字体、画图片框、搬入图片、摆统计卡与标签、铺贡献格；下滚搭建、上滚反向撤回，选框/对齐线/姓名标签由 Canvas 实时绘制，内部原生滚动可暂停重播。",

  cardDescription: "12 个彩色光标边滚动边搭建作品集，可反向撤回。",

  demoHint: "在内层滚动区下滚看光标依次搭建，上滚反向撤回；空格暂停、R 重播、方向键原生滚动；点卡片暂停/恢复。",



  api: [
    { name: "playing", type: "boolean", default: "true", description: "播放/暂停当前时间线" },
    { name: "speed", type: "number", default: "1", description: "播放速度，范围 .25–2" },
    { name: "skipIntro", type: "boolean", default: "false", description: "跳过开场旋转，直接进入搭建（改变会重启时间线）" },
    { name: "showToolbar", type: "boolean", default: "true", description: "显示底部工具条" },
    { name: "onPhaseChange", type: '(phase: "intro"|"burst"|"board"|"build") => void', default: "—", description: "阶段变更回调" },
    { name: "onReplay", type: "() => void", default: "—", description: "用户触发重播时回调" },
    { name: "height", type: "number", default: "760", description: "场景高度，逻辑像素" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "立即显示完整页面，不启动 RAF" },
  ],
};
