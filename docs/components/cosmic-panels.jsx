/* Component metadata only — the live demo and gallery preview live in
   cosmic-panels-demo.jsx, the framework source texts and the prompt in
   cosmic-panels-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "cosmic-panels",
  name: "轨道与点阵动效",
  href: "cosmic-panels.html",
  title: "轨道与点阵动效",
  description:
    "浅灰舞台上的三联 Canvas 卡片：左卡蓝紫渐变里五条轨道线绕双星芒旋转，中卡蓝色点阵按流场与 Bayer 阈值流动、Astronaut 深灰面板带呼吸曲线与行星轨道，右卡半色调地球按内嵌 Natural Earth 大陆数据旋转、七个等轴测服务器浮动；点击卡片暂停/恢复，减少动态与多实例齐全。",

  cardDescription: "轨道线、流场点阵与半色调地球的三联 Canvas 动效。",

  demoHint: "三卡同时自动播放；点击卡片或聚焦后 Enter/Space 暂停/恢复；地球按内嵌大陆数据旋转。",



  api: [
    { name: "height", type: "number", default: "675", description: "场景高度，逻辑像素；窄容器整场景等比缩放" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；保留完整首帧" },
  ],
};
