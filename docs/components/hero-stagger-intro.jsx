/* Component metadata only — the live demo and gallery preview live in
   hero-stagger-intro-demo.jsx, the framework source texts and the prompt in
   hero-stagger-intro-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "hero-stagger-intro",
  name: "首屏逐级入场",
  href: "hero-stagger-intro.html",
  title: "首屏逐级入场",
  description: "340×340 落地页首屏：加载完成后顶部菜单先落位，随后徽章、标题逐词、描述、两枚按钮与产品截图依次入场，右侧伴随本周进行的小卡片，提供重播按钮。",

  cardDescription: "首屏元素依次入场，一键重播。",

  demoHint: "刷新或点重播看完整入场序列。",



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
