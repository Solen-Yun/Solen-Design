/* Component metadata only — the live demo and gallery preview live in
   spider-music-player-demo.jsx, the framework source texts and the prompt in
   spider-music-player-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "spider-music-player",
  name: "蜘蛛牵引切歌",
  href: "spider-music-player.html",
  title: "蜘蛛牵引切歌",
  description:
    "折叠双屏音乐播放器里切歌时小蜘蛛真的爬出来跨屏搬动专辑封面，同一封面节点连续移动、结网抖动、落位回震，播放、进度、随机、循环、喜欢、搜索与本地加歌全部可用。",

  cardDescription: "切歌时屏幕里的小蜘蛛跨屏拉取封面，结网抖动、落位回震。",

  demoHint: "点下一首/上一首或直接点队列行看蜘蛛跨屏搬运封面；连续快速切换只保留最后目标；播放条、进度、喜欢都可用。",



  api: [
    { name: "track", type: "number", default: "0", description: "初始/更新的曲目索引；受控更新不触发 onTrackChange" },
    { name: "playing", type: "boolean", default: "—", description: "控制计时推进" },
    { name: "onTrackChange", type: "(index) => void", default: "—", description: "仅在实际提交新曲后回调一次索引；初始化不调用" },
    { name: "height", type: "number", default: "1080", description: "场景高度，逻辑像素；设备再按 min(1, height/1080) 缩放居中" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；停止震动、步态与网动画" },
  ],
};
