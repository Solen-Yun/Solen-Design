/* Component metadata only — the live demo and gallery preview live in
   palette-generator-demo.jsx, the framework source texts and the prompt in
   palette-generator-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "palette-generator",
  name: "调色板生成器",
  href: "palette-generator.html",
  title: "调色板生成器",
  description: "340×340 五条色带调色板：点 Shuffle 未锁定的色带逐条换色（色彩过渡），色码同步更新；锁定图标可锁任一条；Space 键等价 Shuffle。",

  cardDescription: "色带逐条换色，可锁定，Space 重摇。",

  demoHint: "点 Shuffle 看逐条换色；锁一条再摇。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "340",
    "description": "场景高度，逻辑像素；窄容器整景按比例缩小"
  },
  {
    "name": "reducedMotion",
    "type": "boolean",
    "default": "跟随系统",
    "description": "覆盖系统的减少动态偏好"
  }
],
};
