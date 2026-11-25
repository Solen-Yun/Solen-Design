/* Component metadata only — the live demo and gallery preview live in
   ai-image-generate-demo.jsx, the framework source texts and the prompt in
   ai-image-generate-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "ai-image-generate",
  name: "噪声生图生成器",
  href: "ai-image-generate.html",
  title: "噪声生图生成器",
  description: "340×340 AI 生图场景：输入提示词点 Generate，四格从粗噪声开始、步数计数上升逐渐去噪，色块浮现、模糊斑块锐化为最终图案；完成后可 Regenerate。",

  cardDescription: "四格噪声逐帧去噪成图。",

  demoHint: "点 Generate 看去噪过程；再点 Regenerate。",



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
