/* Component metadata only — the live demo and gallery preview live in
   word-fill-paragraph-demo.jsx, the framework source texts and the prompt in
   word-fill-paragraph-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "word-fill-paragraph",
  name: "滚动填色长句",
  href: "word-fill-paragraph.html",
  title: "滚动填色长句",
  description: "340×330 叙事场景：大句浅灰铺底，随滚动从句首逐词填充为实色；关键词填满时以彩色绽放强调；结尾 Next story → 链接出现。",

  cardDescription: "滚动逐词填色，关键词绽放。",

  demoHint: "滚动看逐词填色与关键词强调。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "330",
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
