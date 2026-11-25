/* Component metadata only — the live demo and gallery preview live in
   particle-texture-trio-demo.jsx, the framework source texts and the prompt in
   particle-texture-trio-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "particle-texture-trio",
  name: "粒子纹理三联",
  href: "particle-texture-trio.html",
  title: "粒子纹理三联",
  description:
    "三块固定轮廓的点阵场景——流动颗粒、镂空轮廓、边缘辉光由两层连续噪声驱动，3 秒整循环首尾一致，单 Canvas 2D 合批绘制，点击暂停/继续、方向键逐帧查看。",

  cardDescription: "三个点阵轮廓内蓝绿、镂空与橙粉颗粒各自流动，3 秒循环。",

  demoHint: "点击任一图形暂停/继续全部三图；左右方向键逐帧查看，Home/Escape 重置；上下方向键切换图形。",



  api: [
    { name: "speed", type: "number", default: "1", description: "时间流速倍率，0 冻结，0–3" },
    { name: "paused", type: "boolean", default: "false", description: "暂停整个场景；暂停时不自动改变像素" },
    { name: "background", type: '"#000" | "#f4f4f4"', default: '"#000"', description: "场景底色；浅灰预览下白色图改为深灰点保证可见" },
    { name: "height", type: "number", default: "540", description: "场景高度，逻辑像素；容器等比居中适配" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；仍允许单帧前后查看" },
  ],
};
