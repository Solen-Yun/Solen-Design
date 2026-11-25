/* Component metadata only — the live demo and gallery preview live in
   ai-prompt-hero-demo.jsx, the framework source texts and the prompt in
   ai-prompt-hero-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "ai-prompt-hero",
  name: "轮换示例 AI 输入框",
  href: "ai-prompt-hero.html",
  title: "轮换示例 AI 输入框",
  description: "340×340 AI 产品首屏：大输入框的占位示例逐字打出、停顿、删除并轮换下一句；辉光描边沿框缓慢环绕；输入文字后占位让位，New 按钮与键盘提示可交互。",

  cardDescription: "示例提示词自打字轮换，辉光描边环绕。",

  demoHint: "看示例轮换打字；输入文字看状态切换。",



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
