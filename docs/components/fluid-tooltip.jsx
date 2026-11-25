/* Component metadata only — the live demo and gallery preview live in
   fluid-tooltip-demo.jsx, the framework source texts and the prompt in
   fluid-tooltip-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "fluid-tooltip",
  name: "流体提示气泡",
  href: "fluid-tooltip.html",
  title: "流体提示气泡",
  description:
    "左侧雪山湖泊厚涂油画、右侧六枚竖排导航图标，悬停或聚焦时一枚黑色胶囊气泡沿入口纵向连续移动并随内容测量宽度，文字由移动的胶囊裁切显现，gsap 驱动。",

  cardDescription: "一个黑色胶囊沿六个导航入口流动，文字由移动胶囊裁切显现。",

  demoHint: "在图标间上下移动指针看胶囊流动与宽度插值；点击选中，方向键循环移焦，Escape 收起提示。",



  api: [
    { name: "active", type: '"today" | "tasks" | "calendar" | "focus" | "settings" | "profile"', default: '"today"', description: "选中项；受控更新不触发 onSelect" },
    { name: "onSelect", type: "(id) => void", default: "—", description: "仅当选中 id 确实变化时回调" },
    { name: "profileLabel", type: "string", default: '"Profile"', description: "头像入口的提示文字" },
    { name: "logoSrc", type: "string", default: "—", description: "替换 Logo 图片；省略或加载失败恢复内嵌矢量" },
    { name: "height", type: "number", default: "1080", description: "场景高度，逻辑像素；舞台按 min(1, height/1080) 二次缩放居中" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；直达最终位置" },
  ],
};
