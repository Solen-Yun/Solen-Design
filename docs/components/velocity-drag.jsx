/* Component metadata only — the live demo and gallery preview live in
   velocity-drag-demo.jsx, the framework source texts and the prompt in
   velocity-drag-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "velocity-drag",
  name: "日历惯性拖拽",
  href: "velocity-drag.html",
  title: "日历惯性拖拽",
  description:
    "绿色渐变舞台上的白色日历窗口：按住事件卡片变毛玻璃浮动副本，随指针速度倾斜旋转，实时显示目标星期与时间；松开后弹簧追进新格并微回弹落位，虚线占位框全程标位；六张彩色事件卡、落下中断重抓、减少动态与多实例齐全。",

  cardDescription: "日历事件拖拽变毛玻璃浮动卡，弹簧追踪落格微回弹。",

  demoHint: "按住事件卡片拖动看毛玻璃浮动副本的速度倾斜，松开弹簧落进新格微回弹；降落途中再抓可中断。",



  api: [
    { name: "height", type: "number", default: "720", description: "场景高度，逻辑像素；窄容器整场景等比缩放" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；保留拖放与落点更新，关闭倾斜、模糊与回弹" },
  ],
};
