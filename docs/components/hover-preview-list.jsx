/* Component metadata only — the live demo and gallery preview live in
   hover-preview-list-demo.jsx, the framework source texts and the prompt in
   hover-preview-list-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "hover-preview-list",
  name: "照片跟随作品列表",
  href: "hover-preview-list.html",
  title: "照片跟随作品列表",
  description: "300×480 作品列表场景：大字项目名列表，悬停某行该作品照片浮现在光标侧后方半拍跟随并轻微倾斜，移出消失；键盘 focus 等价固定显示。",

  cardDescription: "照片半拍跟随光标并倾斜。",

  demoHint: "逐行悬停看照片跟随。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "480",
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
