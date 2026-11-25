/* Component metadata only — the live demo and gallery preview live in
   drum-time-picker-demo.jsx, the framework source texts and the prompt in
   drum-time-picker-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "drum-time-picker",
  name: "滚筒时间选择器",
  href: "drum-time-picker.html",
  title: "滚筒时间选择器",
  description: "340×330 时间选择器：AM/PM、时、分三只滚筒如圆柱滚动，中线对齐者为选中；松手自动吸附到最近刻度，键盘上下可调。",

  cardDescription: "三只滚筒滚动吸附选中。",

  demoHint: "拨动三只滚筒看吸附。",



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
