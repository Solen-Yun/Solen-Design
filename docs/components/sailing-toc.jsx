/* Component metadata only — the live demo and gallery preview live in
   sailing-toc-demo.jsx, the framework source texts and the prompt in
   sailing-toc-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "sailing-toc",
  name: "帆船滚动目录",
  href: "sailing-toc.html",
  title: "帆船滚动目录",
  description:
    "白色长文阅读区左侧固定目录与虚线航线：滚动或点目录时线描帆船沿弯曲航线移动并随滚动方向倾斜转向，停下仍有轻柔起伏与扩散水波；键盘、触屏、aria 标注与减少动态齐全，16 节演示文案内嵌。",

  cardDescription: "线描帆船沿虚线航线追踪当前章节，滚动带倾斜与水波。",

  demoHint: "滚动正文看帆船转向倾斜；点目录远距离跳转可被滚轮中断；方向键、Home/End 换章节，停下仍有起伏与水波。",



  api: [
    { name: "height", type: "number", default: "918", description: "场景高度，逻辑像素；较矮时整景等比缩小以保留完整目录" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；直接跳转、无倾斜与水波，导航保留" },
  ],
};
