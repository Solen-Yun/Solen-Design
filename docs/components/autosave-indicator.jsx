/* Component metadata only — the live demo and gallery preview live in
   autosave-indicator-demo.jsx, the framework source texts and the prompt in
   autosave-indicator-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "autosave-indicator",
  name: "云朵自动保存指示",
  href: "autosave-indicator.html",
  title: "云朵自动保存指示",
  description: "340×340 编辑器场景：输入时云朵内三点跳动表示 Saving；停顿后变勾显示 Saved just now；随时间切换为 Saved a few minutes ago；断网模式显示 Offline working（云变虚线）。",

  cardDescription: "三点跳到勾，断网虚线云。",

  demoHint: "输入看保存点，停顿看勾，试离线模式。",



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
