/* Component metadata only — the live demo and gallery preview live in
   cited-ai-answer-demo.jsx, the framework source texts and the prompt in
   cited-ai-answer-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "cited-ai-answer",
  name: "可溯源 AI 答案",
  href: "cited-ai-answer.html",
  title: "可溯源 AI 答案",
  description: "340×340 AI 问答卡：答案句末带编号小徽章，悬停编号时该句加下划线并弹出来源预览卡（标题、摘要、域名）；点击编号跳转来源列表高亮。",

  cardDescription: "句末编号徽章悬停出来源预览。",

  demoHint: "悬停句末编号看下划线与来源卡，点击看列表高亮。",



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
