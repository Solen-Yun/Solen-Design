/* Component metadata only — the live demo and gallery preview live in
   pixel-toggle-demo.jsx, the framework source texts and the prompt in
   pixel-toggle-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "pixel-toggle",
  name: "像素日夜开关",
  group: "开关",
  href: "pixel-toggle.html",
  title: "像素日夜开关",
  description:
    "一枚可拖动的圆角磨砂玻璃滑块，夜间是暖白像素月亮与钴蓝边光、日间是深灰像素太阳与琥珀边光，切换时像素四散重组、光带沿玻璃外沿绕行。",
  tags: ["WebGL2", "Canvas 2D", "无依赖"],

  cardDescription: "拖动开关切换日夜，像素在月亮和太阳之间散开重组，光带绕滑块转动。",

  demoHint: "点击或拖动开关。键盘聚焦后，可用空格或 Enter 切换。",



  api: [
    { name: "checked", type: "boolean", default: "false", description: "受控状态，true 为夜间" },
    { name: "onCheckedChange", type: "(checked: boolean) => void", default: "—", description: "只在用户操作导致变化时触发" },
    { name: "sound", type: "boolean", default: "true", description: "真实点击时播放一声轻响" },
    { name: "fixedBackground", type: "boolean", default: "false", description: "场景底色固定为站点主题，不随切换动画" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好" },
    { name: "height", type: "number", default: "540", description: "场景高度，逻辑像素" },
  ],
};
