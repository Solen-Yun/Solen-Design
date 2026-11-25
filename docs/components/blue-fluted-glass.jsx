/* Component metadata only — the live demo and gallery preview live in
   blue-fluted-glass-demo.jsx, the framework source texts and the prompt in
   blue-fluted-glass-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "blue-fluted-glass",
  name: "蓝色棱纹流动背景",
  href: "blue-fluted-glass.html",
  title: "蓝色棱纹流动背景",
  description:
    "一整屏缓慢形变的蓝白流体被 71 根磨砂玻璃棱纹真实折射，中央是固定的白色 Solen 字标，整段动画由单个 WebGL 片元着色器按 28 秒周期驱动，点击可暂停，WebGL 不可用退回静态渐变。",

  cardDescription: "竖向磨砂玻璃棱纹折射着缓慢流动的蓝白流体，中央是固定的 Solen 字标。",

  demoHint: "点画面任意处或按 Enter/Space 暂停与继续；背景没有鼠标跟随，图案只随时间流动。",



  api: [
    { name: "height", type: "number", default: "833", description: "场景高度，逻辑像素；固定比例缩小时内容一起缩放" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；保留静态完整画面，禁止持续 RAF" },
  ],
};
