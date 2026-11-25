/* Component metadata only — the live demo and gallery preview live in
   ai-tldr-demo.jsx, the framework source texts and the prompt in
   ai-tldr-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "ai-tldr",
  name: "AI 摘要划线折叠",
  href: "ai-tldr.html",
  title: "AI 摘要划线折叠",
  description: "340×340 会议笔记卡：点 Summarize 后一道发光线沿长文下扫，逐句点亮关键句；读完后长文折叠成 3 条要点，Summarize 变为 Show original 可还原。",

  cardDescription: "发光线扫读长文，折叠成要点可还原。",

  demoHint: "点 Summarize 看扫读与折叠；Show original 还原。",



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
