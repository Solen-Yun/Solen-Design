/* Component metadata only — the live demo and gallery preview live in
   shimmer-gradient-text-demo.jsx, the framework source texts and the prompt in
   shimmer-gradient-text-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "shimmer-gradient-text",
  name: "流光渐变标题",
  href: "shimmer-gradient-text.html",
  title: "流光渐变标题",
  description: "340×340 AI 功能区：标题的重点词上流动彩色渐变；下方 AI 回答气泡里亮泽反复扫过表示生成中，点 Ask me 重演。",

  cardDescription: "渐变流过重点词，AI 气泡光泽扫动。",

  demoHint: "看标题渐变流动与气泡光泽；点 Ask me 重演。",



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
