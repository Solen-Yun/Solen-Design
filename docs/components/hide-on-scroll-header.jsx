/* Component metadata only — the live demo and gallery preview live in
   hide-on-scroll-header-demo.jsx, the framework source texts and the prompt in
   hide-on-scroll-header-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "hide-on-scroll-header",
  name: "滚动隐藏页头",
  href: "hide-on-scroll-header.html",
  title: "滚动隐藏页头",
  description: "340×340 博客页面场景：顶部透明页头在页面顶端保持宽松，向下滚动时整体滑出视野，再往上滚哪怕一点就立刻滑回，阅读文章时给内容让位。",

  cardDescription: "下滑页头让位，上滑立即滑回。",

  demoHint: "上下滚动场景看页头滑走又滑回。",



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
