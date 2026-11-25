/* Component metadata only — the live demo and gallery preview live in
   responsive-preview-demo.jsx, the framework source texts and the prompt in
   responsive-preview-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "responsive-preview",
  name: "拖拽响应式预览",
  href: "responsive-preview.html",
  title: "拖拽响应式预览",
  description: "340×340 站点生成器预览：桌面/平板/手机三档切换或拖右缘手柄，预览框宽度平滑变化、标尺读数跟随，站点内容自适应重排。",

  cardDescription: "拖柄调宽预览，断点内容自适应。",

  demoHint: "拖手柄或点三档看宽度与内容变化。",



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
