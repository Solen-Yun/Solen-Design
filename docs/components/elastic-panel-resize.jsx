/* Component metadata only — the live demo and gallery preview live in
   elastic-panel-resize-demo.jsx, the framework source texts and the prompt in
   elastic-panel-resize-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "elastic-panel-resize",
  name: "弹性面板缩放",
  href: "elastic-panel-resize.html",
  title: "弹性面板缩放",
  description:
    "浅灰场景右侧的空白面板左缘可拖动调宽，把手是一条随移动方向弯曲的二次贝塞尔曲线，越界只有 15px 橡皮筋位移，role=separator 配方向键与 Home/End 步进。",

  cardDescription: "空白面板边缘的把手会随拖动弯曲，越界时拉成一条长直细线。",

  demoHint: "把鼠标移到面板左边缘唤出把手，拖动试试；越界时把手会变直变细，松手回弹。方向键也能调宽。",



  api: [
    { name: "height", type: "number", default: "1000", description: "场景高度，逻辑像素；窄容器整场景等比缩小，不重置面板宽度" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；位置直接到位，把手保持直胶囊，不播放弯曲或过界回弹" },
  ],
};
