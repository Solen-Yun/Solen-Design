/* Component metadata only — the live demo and gallery preview live in
   drag-to-trash-demo.jsx, the framework source texts and the prompt in
   drag-to-trash-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "drag-to-trash",
  name: "拖入垃圾桶",
  href: "drag-to-trash.html",
  title: "拖入垃圾桶",
  description: "340×330 文件场景：拿起文件拖向垃圾桶，越近桶盖抖动开度越大；投入桶内文件缩小旋转消失、计数上涨，Undo 恢复。",

  cardDescription: "桶盖随距离抖开，投入可撤销。",

  demoHint: "拖文件到垃圾桶看盖子与投入，Undo 恢复。",



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
