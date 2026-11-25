/* Component metadata only — the live demo and gallery preview live in
   liquid-ether-demo.jsx, the framework source texts and the prompt in
   liquid-ether-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with liquid-ether-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "colors", type: "string[]", default: '["#5227FF", "#FF9FFC", "#B497CF"]', description: "流速映射的渐变调色板，由暗到亮；支持 3/6 位 hex 与 rgb()/rgba()，无法解析的项跳过，留空回退白色" },
  { name: "intensity", type: "number", default: "1", description: "整体流速感，越大越快发光、越亮；下限 0" },
  { name: "mouseForce", type: "number", default: "20", description: "指针笔画的注入力度，20 为标定基准；下限 0" },
  { name: "cursorSize", type: "number", default: "100", description: "笔画笔刷半径（px），夹在 4–600" },
  { name: "persistence", type: "number", default: "0.75", description: "运动的残留时长 0–1；0 约 0.35 秒消散，1 可拖尾数秒" },
  { name: "viscosity", type: "number", default: "0", description: "速度场模糊强度 0–1，把细丝揉成柔涡" },
  { name: "resolution", type: "number", default: "0.5", description: "模拟网格比例 0.05–1，越高越锐利越耗性能，总量封顶 14 万格" },
  { name: "bounceEdges", type: "boolean", default: "false", description: "流体在容器边缘反弹而非流出" },
  { name: "clickBurst", type: "boolean", default: "true", description: "点击沿指针运动方向打出一阵急流" },
  { name: "autoDemo", type: "boolean", default: "true", description: "闲置时用一只隐形光标持续搅动液体" },
  { name: "autoSpeed", type: "number", default: "0.5", description: "自动演舞的游走速度；下限 0" },
  { name: "autoIntensity", type: "number", default: "2.2", description: "自动演舞的笔画力度；下限 0" },
  { name: "autoResumeDelay", type: "number", default: "1000", description: "最后一次输入后多少 ms 才交还给自动演舞" },
  { name: "intro", type: "boolean", default: "true", description: "首次挂载播放一次横扫的开场笔画" },
  { name: "lightMode", type: "boolean", default: "false", description: "浅底空心墨水渲染，代替深底发光墨水" },
  { name: "backgroundColor", type: "string", default: '"transparent"', description: "垫在墨水下的背景色；transparent 保持画布透明" },
  { name: "maxDevicePixelRatio", type: "number", default: "2", description: "DPR 上限，夹在 0.5–3，同时受 240 万像素预算约束" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "liquid-ether",
  name: "流光液场",
  href: "liquid-ether.html",
  title: "流光液场",
  description:
    "指针走到哪，发光的液体就搅到哪：把指针运动作为动量笔画注入网格速度场，经压力投影（32 轮 Jacobi）散度归零、BFECC 半拉格朗日平流与持久度衰减，再用 256 级渐变调色板按流速上色——慢涡微光、快流白热；点击沿运动方向打急流，闲置时隐形光标自动演舞，首次挂载有一道横扫开场；WebGL2 半浮点 RTT 管线，240 万像素预算 + 14 万格上限，帧循环静止自睡，明场模式渲染空心墨水。",
  tags: ["React", "CSS", "WebGL", "流体"],

  cardDescription: "发光液体跟着指针搅动，流速越快颜色越白热。",

  demoHint: "快速划过看白热拖尾，点击打急流；停手一秒看它自己舞起来，黏度、残留与调色板可调。",

  api: API,
};
